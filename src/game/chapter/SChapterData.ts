import { S59001, S59004, S59201, S59202, S59201_1, S59003 } from "../../net/pt/pt_59";
import { DataManager } from "../../message/manager/DataManager";
import { ChapterProtocol } from "./protocol/ChapterProtocol";
import { Chapter } from "./Chapter";
import { ItemData } from "../ui/compent/data/ItemData";
import { SGameData, SGameEvent } from "../../net/data/SGameData";
import { AccomplishVo } from "../../db/sheet/vo/AccomplishVo";
import { SRoleData } from "../../net/data/SRoleData";
import { GameUtils } from "../utils/GameUtils";
import { SBagData } from "../../net/data/SBagData";
import { SNewBattleData } from "../../net/data/SNewBattleData";
import { ConstVo } from "../../db/sheet/vo/ConstVo";
import { SAoiData, SAoiEvent } from "../aoi/SAoiData";
import { S12011 } from "../../net/pt/pt_12";
import { SCopyData } from "../../net/data/SCopyData";
import { PortalVo } from "../../db/sheet/vo/PortalVo";
export enum AchievementType {
    ROLE = 2,
    PET,
    RIDE,
    COMATE,
    Other,
}

export class SChapterData extends Laya.EventDispatcher {
    private static _instance: SChapterData;
    public chapter: Chapter = new Chapter();
    public Protocol: ChapterProtocol = new ChapterProtocol();
    public Result = null;
    public Achievements = new Laya.Dictionary();
    public showNewChapter: boolean = false;//点开地图面板的时候，是否需要显示手指的特效
    public openAutoChapter = false;
    public isSendAutoBoss = false;
    private needWaitChangeScene = false;
    public static get instance(): SChapterData {
        return SChapterData._instance || (SChapterData._instance = new SChapterData());
    }

    constructor() {
        super();
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E59001, this, this.on59001);
        DataManager.cancel(PROTOCOL.E59004, this, this.on59004);
        DataManager.cancel(PROTOCOL.E59201, this, this.on59201);
        DataManager.cancel(PROTOCOL.E59003, this, this.on59003);
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE, this, this.updateTime);
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
        SAoiData.instance.off(SAoiEvent.AOI_REQUSET_INFO, this ,this.onRequestAoi);
        //挑战BOSS两个
        // SAoiData.instance.on(SAoiEvent.AOI_CHANGE_SCENE, this, this.onRequestAoi);
        this.off(SChapterEvent.CHAPTER_CHALLENGE, this, this.OnChallenge);
        //------
        this.Result = null;
        this.Achievements.clear();
        Laya.timer.clear(this, this.updateTime);
    }

    public registerEvent() {
        this.initAllAchievements();
        DataManager.listen(PROTOCOL.E59001, this, this.on59001);
        DataManager.listen(PROTOCOL.E59004, this, this.on59004);
        DataManager.listen(PROTOCOL.E59201, this, this.on59201);
        DataManager.listen(PROTOCOL.E59003, this, this.on59003);
        SAoiData.instance.on(SAoiEvent.AOI_REQUSET_INFO, this ,this.onRequestAoi);
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
        //挑战BOSS两个
        // SAoiData.instance.on(SAoiEvent.AOI_CHANGE_SCENE, this, this.onRequestAoi);
        this.on(SChapterEvent.CHAPTER_CHALLENGE, this, this.OnChallenge);
        //------
        Laya.timer.loop(5000, this, this.updateTime);
    }

    private onRequestAoi(sceneId: number)
    {
        this.needWaitChangeScene = false;
    }

    public updateTime() {
        var limt_open_lv = ConstVo.get("AUTO_FT").val;
        if (SRoleData.instance.info.Lv < limt_open_lv)
            return;
        if (SRoleData.instance.info.TeamId != 0)
            return;
        if (SGameData.instance.PLAYFIGHTREPORT)
            return;
        if (this.chapter.chapterId == 0)
            return;
        if (this.chapter.IsCanGetAward)
            return;
        if (SCopyData.instance.isInCopy)
            return;
        if (SBagData.instance.equip.itemLength >= SBagData.instance.equip.capacity)
            return;
        if(SRoleData.instance.isWabaoing)
        return;
        var lv = SRoleData.instance.info.Lv;
        if (lv < this.chapter.sheetChapterData.lv_limit)
            return;
        if (!this.openAutoChapter)
            return;
        if (this.isSendAutoBoss)
            return;
        var CoolDownTime = this.chapter.lastPassLevelTime + this.chapter.LevelCoolDown;
        if (GameUtils.TimeStamp >= CoolDownTime) {
            if(this.needWaitChangeScene)return;
            if(SChapterData.instance.chapter.sheetChapterData.scene_no != SRoleData.instance.info.SceneNo)
            {
                var vo:PortalVo = PortalVo.getBySceneNo(SChapterData.instance.chapter.sheetChapterData.scene_no);
                if(vo&&vo.target_xy)
                {
                    var target_xy = vo.target_xy;
                    SAoiData.instance.event(SAoiEvent.AOI_GO_TO_SCENE, [SChapterData.instance.chapter.sheetChapterData.scene_no , target_xy[0] , target_xy[1]]);
                    this.needWaitChangeScene = true;   
                    
                }
                
            }
            else
            {
                this.event(SChapterEvent.CHAPTER_CHALLENGE);
                this.isSendAutoBoss = true;
            }
        }
    }

    public getTotalAchievePoint(): number {
        var total = 0;
        for (let i = 0; i < this.Achievements.values.length; i++) {
            const table = this.Achievements.values[i];
            if (table.info.state == 3) {
                total += table.sheet.contri;
            }
        }
        return total;
    }

    private initAllAchievements() {
        if (this.Achievements.keys.length == 0) {
            var list: Array<AccomplishVo> = AccomplishVo.getAll;
            for (let i = 0; i < list.length; i++) {
                const sheet = list[i];
                var element: S59201_1 = new S59201_1();
                element.no = sheet.no;
                element.cur_num = 0;
                element.state = 1;
                element.time = 0;
                //if(i==2)
                //element.state = 3;
                //if(i==1)
                //element.state = 2;
                var _data = { sheet: sheet, info: element };
                this.Achievements.set(element.no, _data);
            }
        }
    }

    public get AchievementRed(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        var red = false;
        for (let i = 0; i < this.Achievements.values.length; i++) {
            const table = this.Achievements.values[i];
            if (table.info.state == 2) {
                red = true;
                break;
            }
        }
        return red;
    }

    public get RoleAchievementRed(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        var red = false;
        for (let i = 0; i < this.Achievements.values.length; i++) {
            const table = this.Achievements.values[i];
            if (table.sheet.type == 2 && table.info.state == 2) {
                red = true;
                break;
            }
        }
        return red;
    }

    public get PetAchievementRed(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        var red = false;
        for (let i = 0; i < this.Achievements.values.length; i++) {
            const table = this.Achievements.values[i];
            if (table.sheet.type == 3 && table.info.state == 2) {
                red = true;
                break;
            }
        }
        return red;
    }

    public get RideAchievementRed(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        var red = false;
        for (let i = 0; i < this.Achievements.values.length; i++) {
            const table = this.Achievements.values[i];
            if (table.sheet.type == 4 && table.info.state == 2) {
                red = true;
                break;
            }
        }
        return red;
    }

    public get ComateAchievementRed(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        var red = false;
        for (let i = 0; i < this.Achievements.values.length; i++) {
            const table = this.Achievements.values[i];
            if (table.sheet.type == 5 && table.info.state == 2) {
                red = true;
                break;
            }
        }
        return red;
    }

    public get OtherAchievementRed(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        var red = false;
        for (let i = 0; i < this.Achievements.values.length; i++) {
            const table = this.Achievements.values[i];
            if (table.sheet.type == 6 && table.info.state == 2) {
                red = true;
                break;
            }
        }
        return red;
    }


    public getAchievementsByType(type: number): Array<any> {
        var list = [];
        var subtypes = new Laya.Dictionary();
        for (let i = 0; i < this.Achievements.values.length; i++) {
            const table = this.Achievements.values[i];
            if (table.sheet.type == type) {

                var _table = subtypes.get(table.sheet.subType);
                if (!_table) {
                    list.push(table);
                    subtypes.set(table.sheet.subType, table);
                }
                else {
                    if (_table.info.state == 3) {
                        list.push(table);
                        subtypes.set(table.sheet.subType, table);
                    }
                }
            }
        }
        list.sort((a, b): number => {
            if (a.info.state == 2 && b.info.state != 2) {
                return -1;
            }
            else if (a.info.state != 2 && b.info.state == 2) {
                return 1;
            }
            else if (a.info.state == 1 && b.info.state == 1) {
                if (a.info.no < b.info.no) {
                    return -1;
                }
                return 1;
            }
            else {
                if (a.info.state == 3 && b.info.state != 3) {
                    return 1;
                }
                else if (a.info.state != 3 && b.info.state == 3) {
                    return -1;
                }

            }
        });
        return list;
    }

    private onUpdateFightState() {
        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            if (this.Result) {
                UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [SChapterData.instance.Result.RetCode, SChapterData.instance.Result.itemdataList, true]);
                this.Result = null;
            }
            if (!SNewBattleData.instance.LastBattleResult) {
                SChapterData.instance.openAutoChapter = false;
            }
        }
    }
    public RequestAchievements() {
        this.Protocol.send59201();
    }

    public RequestChapter() {
        this.Protocol.send59001();
    }
    /**
     * 直接挑战
     */
    public RequestChallenge() {
        this.Protocol.send59003(this.chapter.chapterId, this.chapter.levelId);
    }

    public RequestGetChapterAward() {
        this.Protocol.send59002();
    }

    private on59201(data: S59201) {
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var _data = this.Achievements.get(element.no);
            if (_data) {
                _data.info = element;
            }
            //else
            //{
            //    var sheet = AccomplishVo.get(element.no);
            //    if(sheet)
            //    {
            //        _data = {sheet:sheet,info:element};
            //    }
            //    this.Achievements.set(element.no , _data);
            //}
        }
        this.event(SChapterEvent.ACHIEVEMENTS_UPDATE);
    }

    private on59001(data: S59001) {
        var isNewChapter = false;
        if (this.chapter.chapterId != 0 && data.Id > this.chapter.chapterId)
            isNewChapter = true;
        this.chapter.chapterId = data.Id;
        this.chapter.levelId = data.PassId;
        this.chapter.lastPassLevelTime = data.PassTime;
        this.chapter.LevelPassCount = data.PassCounter;
        this.chapter.AwardsState.clear();
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            this.chapter.AwardsState.set(element.PassCount, element.RwdState);
        }
        if (isNewChapter) {
            this.showNewChapter = true;
            this.event(SChapterEvent.CHAPTER_NEW);
        }
        else {
            this.event(SChapterEvent.CHAPTER_UPDATE);
        }
    }

    private on59003(data: S59003) {
        this.isSendAutoBoss = false;
    }

    private on59004(data: S59004) {
        var itemdataList = new Array<ItemData>();
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var goods: ItemData = new ItemData(item.GoodsNo);
            goods.Count = item.GoodsNum;
            goods.serverInfo.Quality = item.Quality;
            goods.serverInfo.BindState = item.BindState;
            itemdataList.push(goods);
        }
        this.Result = { RetCode: data.RetCode, itemdataList: itemdataList }
        this.onUpdateFightState();//收到数据之后再打开
    }

    //挑战BOSS相关处理=======================
    // private TargetSceneNo = 0;
    // private TransferPoint: any = null;
    private needFight: boolean = false;
    // private needChange:boolean = false;

    // private onRequestAoi(sceneData: S12011) {
    //     this.TargetSceneNo = sceneData.NewSceneId;
    //     this.needChange = false;
    //     this.fight();
    // }
    /**
     * 跳转boss
     * @param currentMapId 当前场景
     */
    public OnChallenge(isfast:boolean) {
        if(!isfast){
            return;
        }
        this.needFight = true;
        // this.TransferPoint = null;
        // if (this.TargetSceneNo != SChapterData.instance.chapter.sheetChapterData.scene_no) {
        //     this.GetTranferPoint();
        // } else {
            this.fight();
        // }
    }

    // private async GetTranferPoint() {
    //     this.TransferPoint = await MapUtil.GetMapTransferPoint(SChapterData.instance.chapter.sheetChapterData.scene_no);
    //     this.needChange = true;
    //     this.fight();
    // }

    private fight(): void {
        if (!this.needFight) {
            return;
        }
        if (SGameData.instance.PLAYFIGHTREPORT == false ||SNewBattleData.instance.isHangUpBattle) {
            // if (SChapterData.instance.chapter.sheetChapterData.scene_no == this.TargetSceneNo) {
                this.needFight = false;
                SChapterData.instance.RequestChallenge();
            // } else {
            //     if (this.TransferPoint != null && this.needFight && this.needChange) {
            //         SAoiData.instance.event(SAoiEvent.AOI_GO_TO_SCENE, [SChapterData.instance.chapter.sheetChapterData.scene_no, this.TransferPoint.x, this.TransferPoint.y]);
            //     }
            // }

        }
    }

}

export enum SChapterEvent {
    CHAPTER_UPDATE = "chapter_update",//章节更新
    CHAPTER_NEW = "chapter_new",//新地图
    CHAPTER_CHALLENGE = "chapter_challenge",//挑战boss
    ACHIEVEMENTS_UPDATE = "achievements_update",//成就更新
}