import { DataManager } from "../../message/manager/DataManager";
import { S57001, S57003, S57007, S57003_2, S57006, S57016, S57017, S57018, S57019, S57019_1, S57019_2, S57021, S57002, S57022 } from "../pt/pt_57";
import { FbVo } from "../../db/sheet/vo/FbVo";
import { ItemData } from "../../game/ui/compent/data/ItemData";
import { MsgManager } from "../../game/ui/manager/MsgManager";
import { S22005, S22001 } from "../pt/pt_22";
import { CommonControl } from "../../game/common/control/CommonControl";
import { SGameData, SGameEvent } from "./SGameData";
import { SRoleData } from "./SRoleData";
import { Chapter_dunVo } from "../../db/sheet/vo/Chapter_dunVo";
import { S49001 } from "../pt/pt_49";
import { RankType } from "../../game/ui/view/rank/panel/RankMainPanel";
import { RedDotManager } from "../../game/redDot/RedDotManager";
import { RedDotType } from "../../game/redDot/RedDotList";
import { STaskData } from "../../game/task/STaskData";
import { SGridSceneData } from "../../game/activity/data/SGridSceneData";
import { SceneManager } from "../../game/battle/scene/SceneManager";
import { S16004, S16000 } from "../pt/pt_16";
import { SNewBattleData } from "./SNewBattleData";
import { AwardUtil } from "../../game/award/AwardUtil";

export class SCopyData extends Laya.EventDispatcher {

    private static _instance: SCopyData;
    private _copyInfoList: Array<S57003_2> = [];
    private _curInfo: FbVo;
    private _curChallengeInfo: S57018;
    private _petCopyLit: Array<S57019> = [];
    private _rankInfo: S22005;
    private _copyType: number;
    private _tttRankInfo: S22001;//通天塔排行榜
    private _petCopyRankInfo: S22001;//宠物秘境排行榜
    private _sanjieCopyRankInfo: S22001;//三界副本排行榜
    private _chuangTianGongRankInfo: S22001;//勇闯天宫排行榜
    private _ttfInfo: S49001;//通天塔的基本信息
    public static get instance(): SCopyData {
        return SCopyData._instance || (SCopyData._instance = new SCopyData());
    }
    constructor() {
        super();
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E22001, this, this.onS22001);//通用排行榜
        DataManager.cancel(PROTOCOL.E22005, this, this.onS22005);//通用排行榜
        DataManager.cancel(PROTOCOL.E57001, this, this.onS57001);//创建并进入副本
        DataManager.cancel(PROTOCOL.E57002, this, this.onS57002);//退出副本
        DataManager.cancel(PROTOCOL.E57003, this, this.onS57003);//查询副本
        DataManager.cancel(PROTOCOL.E57006, this, this.onS57006);//进入副本成功
        DataManager.cancel(PROTOCOL.E57007, this, this.onS57007);//通知副本通关，需要评分的情况用
        DataManager.cancel(PROTOCOL.E57016, this, this.onS57016);//副本结算
        DataManager.cancel(PROTOCOL.E57017, this, this.onS57017);//扫荡副本
        DataManager.cancel(PROTOCOL.E57018, this, this.onS57018);//章节副本当前进度
        DataManager.cancel(PROTOCOL.E57019, this, this.onS57019);//秘境章节副本信息查询
        DataManager.cancel(PROTOCOL.E57021, this, this.onS57021);//领取章节副本奖励
        DataManager.cancel(PROTOCOL.E49001, this, this.onS49001);//通天塔的基本信息
        DataManager.cancel(PROTOCOL.E16004, this, this.onS16004);//三界结算
        DataManager.cancel(PROTOCOL.E16000, this, this.onS16000);//三界进入反馈
        DataManager.cancel(PROTOCOL.E57022, this, this.onS57022);//一键扫荡
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
        this._copyInfoList = [];
        this._curInfo = null;
        this._curChallengeInfo = null;
        this._petCopyLit = [];
        this._copyType = 0;
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E22001, this, this.onS22001);//通用排行榜
        DataManager.listen(PROTOCOL.E22005, this, this.onS22005);//通用排行榜
        DataManager.listen(PROTOCOL.E57001, this, this.onS57001);//创建并进入副本
        DataManager.listen(PROTOCOL.E57002, this, this.onS57002);//退出副本
        DataManager.listen(PROTOCOL.E57003, this, this.onS57003);//查询副本
        DataManager.listen(PROTOCOL.E57006, this, this.onS57006);//进入副本成功
        DataManager.listen(PROTOCOL.E57007, this, this.onS57007);//通知副本通关，需要评分的情况用
        DataManager.listen(PROTOCOL.E57016, this, this.onS57016);//副本结算
        DataManager.listen(PROTOCOL.E57017, this, this.onS57017);//扫荡副本
        DataManager.listen(PROTOCOL.E57018, this, this.onS57018);//章节副本当前进度
        DataManager.listen(PROTOCOL.E57019, this, this.onS57019);//秘境章节副本信息查询
        DataManager.listen(PROTOCOL.E57021, this, this.onS57021);//领取章节副本奖励
        DataManager.listen(PROTOCOL.E49001, this, this.onS49001);//通天塔的基本信息
        DataManager.listen(PROTOCOL.E16004, this, this.onS16004);//三界结算
        DataManager.listen(PROTOCOL.E16000, this, this.onS16000);//三界进入反馈
        DataManager.listen(PROTOCOL.E57022, this, this.onS57022);//一键扫荡
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    private onS22001(data: S22001): void {
        if (data.RankType == RankType.TONGTIANTA) {
            this._tttRankInfo = data;
            this.event(SCopyEvent.COPY_TTTRANKINFO);
        } else if (data.RankType == RankType.DUNGEON_LEVEL) {
            this._petCopyRankInfo = data;
            this.event(SCopyEvent.ANS_PETCOPYRANK_INFO);
        } else if (data.RankType == RankType.SANJIE) {
            this._sanjieCopyRankInfo = data;
            this.event(SCopyEvent.SANJIE_RANK_INFO);
        } else if (data.RankType == RankType.CHUANGTIANGONG) {
            this._chuangTianGongRankInfo = data;
            this.event(SCopyEvent.CHUANGTIANGONG_RANK_INFO);
        }
    }

    private onS22005(data: S22005): void {
        if (data.RankType == 22001) {
            this._rankInfo = data;
        }
    }

    private onS57001(data: S57001): void {
        var count = 0;
        var str = "";
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            if (element.state != 1) {
                switch (element.state) {
                    case 0:
                        {
                            str = "位置错误！";
                            break;
                        }
                    case 2:
                        {
                            str = "等级不足！";
                            break;
                        }
                    case 3:
                        {
                            str = "人数/队伍限制!";
                            break;
                        }
                    case 4:
                        {
                            str = "前置难度没通关！";
                            break;
                        }
                    case 5:
                        {
                            str = "副本冷却中！";
                            break;
                        }
                    case 6:
                        {
                            str = "副本次数用光！";
                            break;
                        }
                    case 7:
                        {
                            str = "没有副本道具消耗！";
                            break;
                        }
                }
                break;
            }
            else
                count++;
        }
        if (count != data.item_1.length) {
            MsgManager.instance.showRollTipsMsg(str);
            return;
        }
        this._curInfo = FbVo.get(data.no);
        this.event(SCopyEvent.COPY_ENTER_BACK);
    }

    private onS57002(data: S57002): void {
        this._curInfo = null;
        SceneManager.instance.ExitSpecialScene();
        this.event(SCopyEvent.COPY_RESULT_BACK);
    }

    private onS16000(data: S16000): void {
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            if (element.RetCode != 0) {
                var str = "";
                switch (element.RetCode) {
                    case 1:
                        {
                            str = "物品不足";
                            break;
                        }
                    case 2:
                        {
                            str = "等级不足";
                            break;
                        }
                    case 3:
                        {
                            str = "进入次数达到上限";
                            break;
                        }
                    case 4:
                        {
                            str = "已经在副本中";
                            break;
                        }
                }
                MsgManager.instance.showRollTipsMsg(`${element.PlayerName} ${str}`);
                break;
            }
        }

    }

    private onS16004(data: S16004): void {
        //this._curInfo = null;
        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            var goodslist = new Array<ItemData>();
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                var goods = new ItemData(element.GoodsNo);
                var quality = element.Quality == 0 ? goods.clientInfo.quality : element.Quality;
                goods.Count = element.GoodsCount;
                goods.serverInfo.Quality = quality;
                goods.serverInfo.BindState = element.BindState;
                if (goods.clientInfo.no != 99 && goods.clientInfo.type != GoodsType.AUTO_GOODS) {
                    //策划让把99ID的道具，临时屏蔽掉
                    goodslist.push(goods);
                }
            }
            UIManager.instance.openUI(UIID.COM_SHOW_REWARD, [
                goodslist,//奖励
                null,//点击确定的方法
                "战胜" + (data.Win) + "波",//一级标题
                "您已累计获得",//二级标题
                "领取",//确定按钮名字
            ]);
        }

        else {
            this.resultTreeDun = data;
        }

    }

    private onS57003(data: S57003): void {
        for (let index = 0; index < data.item_2.length; index++) {
            var element = data.item_2[index];
            this.updateCopyInfo(element);
        }
        this.event(SCopyEvent.COPY_INFO_BACK);
    }

    private onS57006(data: S57006): void {
        this._curInfo = FbVo.get(data.no);
        //SGridSceneData.instance.CheckCreateGridScene();
        this.event(SCopyEvent.COPY_ENTER_BACK);
    }

    private onS57007(data: S57007): void {
        this._curInfo = null;
        this.event(SCopyEvent.COPY_RESULT_BACK);
    }
    private result: S57016;
    public copyRewardList: Array<ItemData>;
    private resultTreeDun: S16004;
    private onS57016(data: S57016): void {
        //一键扫荡结果
        if (this.isOneKeyShaoDang && data.RetCode == 0) {
            var itemdataList = new Array<ItemData>();
            for (let i = 0; i < data.item_1.length; i++) {
                const item = data.item_1[i];
                var goods: ItemData = new ItemData(item.GoodsNo);
                goods.Count = item.GoodsNum;
                goods.serverInfo.Quality = item.Quality;
                goods.serverInfo.BindState = item.BindState;
                if (goods.clientInfo.no != 99 && goods.clientInfo.type != GoodsType.AUTO_GOODS) {
                    //策划让把99ID的道具，临时屏蔽掉
                    itemdataList.push(goods);
                }

            }
            /**一键扫荡不弹出单独的结算结果，其他地方处理 */
            this.oneKeyItemList = this.oneKeyItemList.concat(itemdataList);
            this.event(SCopyEvent.COPY_RESULT_BACK);
            return;
        }
        //正常结果
        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            this._curInfo = null;
            /**三界副本有个独立的结算16004需要过滤到通用的 */
            if (SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.ThreeDungeon ||
                SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.ZuoQiShiLian) return;
            if (data.RetCode == 0) {
                var itemdataList = new Array<ItemData>();
                for (let i = 0; i < data.item_1.length; i++) {
                    const item = data.item_1[i];
                    var goods: ItemData = new ItemData(item.GoodsNo);
                    goods.Count = item.GoodsNum;
                    goods.serverInfo.Quality = item.Quality;
                    goods.serverInfo.BindState = item.BindState;
                    if (goods.clientInfo.no != 99 && goods.clientInfo.type != GoodsType.AUTO_GOODS) {
                        //策划让把99ID的道具，临时屏蔽掉
                        itemdataList.push(goods);
                    }

                }
                this.copyRewardList = itemdataList;
            }
            UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [data.RetCode, itemdataList, true, this.openSys]);
            this.event(SCopyEvent.COPY_RESULT_BACK);
        }
        else {
            if (SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.ThreeDungeon ||
                SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.ZuoQiShiLian) return;
            this.result = data;
        }
    }

    private onS57017(data: S57017): void {
        this._curInfo = null;
        var useDate = this.getCopyInfo(data.no);
        useDate.state = data.state;
        useDate.times = data.times;
        useDate.left_times = data.left_times;//原来自己减，直接改成剩余次数 data.times;
        useDate.time_stamp = data.time_stamp;
        this.event(SCopyEvent.COPY_RESULT_BACK);
    }

    private onS57018(data: S57018): void {
        this._curChallengeInfo = data;
        if (this._curChallengeInfo) {
            for (let index = 0; index < this._curChallengeInfo.ChapterID; index++) {
                CommonControl.instance.send57019(index + 1);
            }
        }
        this.event(SCopyEvent.COPY_INFO_BACK);
    }

    private onS57019(data: S57019): void {
        this.updatePetCopyInfo(data);
        this.event(SCopyEvent.COPY_INFO_BACK);
    }

    private onS57021(data: S57021): void {
        if (this.getPetCopyInfo(data.ChapterID)) {
            if (this.getPetCopyItemStarInfo(data.ChapterID, data.Star)) {
                this.getPetCopyItemStarInfo(data.ChapterID, data.Star).RwdState = 3;
            }
            else {
                var msg: S57019_2 = new S57019_2();
                msg.Star = data.Star;
                msg.RwdState = 3;
                this.getPetCopyInfo(data.ChapterID).item_2.push(msg);
            }
        }
        this.event(SCopyEvent.COPY_INFO_BACK);
    }

    public onS49001(data: S49001): void {
        this._ttfInfo = data;
        this.event(SCopyEvent.COPY_TTTINFO_BACK);
    }

    private onUpdateFightState(): void {
        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            if (this.result) {
                this._curInfo = null;
                if (this.result.RetCode == 0) {
                    var itemdataList = new Array<ItemData>();
                    for (let i = 0; i < this.result.item_1.length; i++) {
                        const item = this.result.item_1[i];
                        var goods: ItemData = new ItemData(item.GoodsNo);
                        goods.Count = item.GoodsNum;
                        goods.serverInfo.Quality = item.Quality;
                        goods.serverInfo.BindState = item.BindState;
                        if (goods.clientInfo.no != 99 && goods.clientInfo.type != GoodsType.AUTO_GOODS) {
                            //策划让把99ID的道具，临时屏蔽掉
                            itemdataList.push(goods);
                        }
                    }
                    this.copyRewardList = itemdataList;
                }
                UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [this.result.RetCode, itemdataList, true, this.openSys]);
                this.event(SCopyEvent.COPY_RESULT_BACK);
                this.result = null;
            }
            else if (this.resultTreeDun) {
                this.onS16004(this.resultTreeDun);
                this.resultTreeDun = null;
            }
        }
    }

    private openSys(): void {
        if (STaskData.instance.mainTaskIsComp) {
            return;
        }
        switch (SCopyData.instance.copyType) {
            case CopyType.PERSON:
                UIManager.instance.openUI(UIID.SYS_COPY_BOSS, null, 0);
                break;
            case CopyType.WORLD:
                UIManager.instance.openUI(UIID.SYS_COPY_BOSS, null, 1);
                break;
            case CopyType.TEAM:
                UIManager.instance.openUI(UIID.SYS_COPY_BOSS, null, 2);
                break;
            case CopyType.PET:
                UIManager.instance.openUI(UIID.SYS_COPY_STUFF, null, 0);
                break;
            case CopyType.MATERIAL:
                UIManager.instance.openUI(UIID.SYS_COPY_STUFF, null, 1);
                break;
            case CopyType.TOWER:
                UIManager.instance.openUI(UIID.SYS_COPY_STUFF, null, 2);
                break;
            case CopyType.SANJIE_COPY:
                UIManager.instance.openUI(UIID.SYS_COPY_STUFF, null, 3);
                break;
            case CopyType.CHUANGTIANGONG:
                UIManager.instance.openUI(UIID.SYS_COPY_STUFF, null, 4);
                break;
            case CopyType.OPEN_ACTIVITY:
                UIManager.instance.openUI(UIID.OPEN_SERVICE_ACTIVITY_PANEL, null);
                break;
            case CopyType.GUILD_BOSS:
                UIManager.instance.openUI(UIID.GUILD_BOSS_PANEL);
                break;
            case CopyType.SUPER_BOSS:
                UIManager.instance.openUI(UIID.SUPER_BOSS_CHAP_PANEL);
                break;
            default:
                break;
        }
    }

    public getPetCopyInfo(no: number): S57019 {
        for (let index = 0; index < this._petCopyLit.length; index++) {
            var element = this._petCopyLit[index];
            if (element.ChapterID == no) {
                return element;
            }
        }
    }

    public getAllStar(): number {
        var star = 0;
        for (let i = 0; i < this._petCopyLit.length; i++) {
            var ele1 = this._petCopyLit[i];
            for (let j = 0; j < ele1.item_1.length; j++) {
                var ele2 = ele1.item_1[j];
                star += ele2.Star;
            }
        }
        return star;
    }

    public set copyType(value: number) {
        this._copyType = value;
    }

    public get copyType(): number {
        return this._copyType;
    }

    public get allStar(): number {
        var num: number = 0;
        if (this._curChallengeInfo) {
            for (let index = 0; index < this._curChallengeInfo.ChapterID; index++) {
                num += this.getPetCopyStarNum(index + 1);
            }
        }
        return num;
    }

    //章节可以扫荡
    public canSweep(no: number): boolean {
        var info: S57019 = this.getPetCopyInfo(no);
        var num: number = this.getPetCopyStarNum(no);
        var needStarNum = Chapter_dunVo.get(no).star_limit;
        if (num >= needStarNum) {
            if (info) {
                for (let index = 0; index < info.item_1.length; index++) {
                    var element = info.item_1[index];
                    if (element.times <= 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    //章节有已通关关卡剩余次数（也就是有红点）
    public canFight(no: number): boolean {
        var info: S57019 = this.getPetCopyInfo(no);
        if (info) {
            for (let index = 0; index < info.item_1.length; index++) {
                var element = info.item_1[index];
                if (element.times <= 0 && element.Star >= 1) {
                    return true;
                }
            }
        }
        return false;
    }

    //有宝箱没有领
    public canGetBox(no: number): boolean {
        var starNum = this.getPetCopyStarNum(no)
        if (starNum >= 6) {
            var starInfo1: S57019_2 = this.getPetCopyItemStarInfo(no, 6);
            if (!starInfo1 || starInfo1.RwdState != 3) {
                return true;
            }
        }
        if (starNum >= 12) {
            var starInfo2: S57019_2 = this.getPetCopyItemStarInfo(no, 12);
            if (!starInfo2 || starInfo2.RwdState != 3) {
                return true;
            }
        }
        if (starNum >= 18) {
            var starInfo3: S57019_2 = this.getPetCopyItemStarInfo(no, 18);
            if (!starInfo3 || starInfo3.RwdState != 3) {
                return true;
            }
        }
        return false;
    }

    public getPetCopyStarNum(no: number): number {
        var info: S57019 = this.getPetCopyInfo(no);
        var num: number = 0;
        if (info) {
            for (let index = 0; index < info.item_1.length; index++) {
                var element = info.item_1[index];
                num += element.Star;
            }
        }
        return num;
    }

    public getPetCopyItemStarInfo(no: number, star: number): S57019_2 {
        var info: S57019 = this.getPetCopyInfo(no);
        if (info) {
            for (let index = 0; index < info.item_2.length; index++) {
                var element = info.item_2[index];
                if (element.Star == star) {
                    return element;
                }
            }
        }
        return null;
    }

    public getPetCopyItemInfo(no: number, pass: number): S57019_1 {
        var info: S57019 = this.getPetCopyInfo(no);
        if (info) {
            for (let index = 0; index < info.item_1.length; index++) {
                var element = info.item_1[index];
                if (element.no == pass) {
                    return element;
                }
            }
        }
        return null;
    }

    private updatePetCopyInfo(info: S57019): void {
        if (this.getPetCopyInfo(info.ChapterID)) {
            this.getPetCopyInfo(info.ChapterID).item_1 = info.item_1;
            this.getPetCopyInfo(info.ChapterID).item_2 = info.item_2;
        }
        else {
            this._petCopyLit.push(info);
        }
    }

    private updateCopyInfo(info: S57003_2): void {
        if (this.getCopyInfo(info.no)) {
            this.getCopyInfo(info.no).state = info.state;
            this.getCopyInfo(info.no).pass = info.pass;
            this.getCopyInfo(info.no).times = info.times;
            this.getCopyInfo(info.no).left_times = info.left_times;//原来自己减，直接改成剩余次数 info.times;
            this.getCopyInfo(info.no).time_stamp = info.time_stamp;
        }
        else {
            this._copyInfoList.push(info);
        }
    }

    public getCopyInfo(no: number): S57003_2 {
        for (let index = 0; index < this._copyInfoList.length; index++) {
            var element = this._copyInfoList[index];
            if (element.no == no) {
                return element;
            }
        }
        return null;
    }

    public get curCopyInfo(): FbVo {
        return this._curInfo;
    }

    public get curChallengeInfo(): S57018 {
        return this._curChallengeInfo;
    }

    //关闭宠物秘境以后，保存下来，用来下次打开的时候，显示用的
    public petCopyCurPage: number = -1;

    // public get rankTypeInfo(): S22005 {
    //     return this._rankInfo;
    // }
    public get chuangTianGongRankInfo(): S22001 {
        return this._chuangTianGongRankInfo;
    }

    public get sanjieCopyRankInfo(): S22001 {
        return this._sanjieCopyRankInfo;
    }

    public get petCopyInfo(): S22001 {
        return this._petCopyRankInfo;
    }

    public get tttRankInfo(): S22001 {
        return this._tttRankInfo;
    }

    public get tttInfo(): S49001 {
        return this._ttfInfo || new S49001;
    }

    /**
     * 是否在副本中
     * @readonly
     * @type {boolean}
     * @memberof SCopyData
     */
    public get isInCopy(): boolean {
        return this._curInfo && this._curInfo.no;
    }

    /**
     * 是否有个人boss可以挑战或者扫荡
     * @readonly
     * @type {boolean}
     * @memberof SCopyData
     */
    public get showBossRed(): boolean {
        var arr: Array<FbVo> = FbVo.getListByType(CopyType.PERSON);
        var info: S57003_2;
        var leftNum: number;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (element.lv_limit <= SRoleData.instance.info.Lv) {
                info = SCopyData.instance.getCopyInfo(element.no);
                if (info) {
                    leftNum = element.cd[1] - info.times;
                    if (leftNum > 0) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 材料副本是否可以挑战或者扫荡
     * @readonly
     * @type {boolean}
     * @memberof SCopyData
     */
    public get showMaterilRed(): boolean {
        var arr: Array<FbVo> = FbVo.getListByType(CopyType.MATERIAL);
        var info: S57003_2;
        var leftNum: number;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (element.lv_limit <= SRoleData.instance.info.Lv) {
                info = SCopyData.instance.getCopyInfo(element.no);
                if (info) {
                    leftNum = element.cd[1] - info.times;
                    if (leftNum > 0) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 宠物秘境是否可以挑战或者扫荡(是否有红点)
     * @readonly
     * @type {boolean}
     * @memberof SCopyData
     */
    public get showPetRed(): boolean {
        if (!this._curChallengeInfo) {
            return false;
        }
        var arr: Array<Chapter_dunVo> = Chapter_dunVo.getAll();
        // var vo: FbVo;
        // var info: S57019_1;
        // var leftNum: number;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (element.no > this._curChallengeInfo.ChapterID) {
                return false;
            }
            if (this.canFight(element.no)) {
                return true;
            }
            if (this.canGetBox(element.no)) {
                return true;
            }
            // if (this.canSweep(element.no)) {
            //     return true;
            // }
            // for (let indx = 0; indx < element.dun_list.length; indx++) {
            //     var ele = element.dun_list[indx];
            //     vo = FbVo.get(ele);
            //     if (vo.lv_limit <= SRoleData.instance.info.Lv) {
            //         info = this.getPetCopyItemInfo(element.no, vo.no);
            //         if (info) {
            //             leftNum = vo.cd[1] - info.times;
            //             if (leftNum > 0) {
            //                 return true;
            //             }
            //         }
            //         else {
            //             return true;
            //         }
            //     }
            // }--以前的判断有没有红点的方法
        }
        return false;
    }

    /**
     * 是否需要显示副本红点
     * @readonly
     * @type {boolean}
     * @memberof SCopyData
     */
    public get showCopyRed(): boolean {
        if (RedDotManager.instance.GetRD(RedDotType.RDFB)._isActiveSave) {
            return true;
        }
        return false;
    }

    //是否是一键扫荡执行中
    public isOneKeyShaoDang: boolean = false;
    public oneKeyItemList: Array<ItemData> = [];
    public oneKeyShaodang(copyType: CopyType): void {
        this.isOneKeyShaoDang = true;
        CommonControl.instance.send57022(copyType);
    }

    public onS57022(data: S57022): void {
        if (data.RetCode == 0) {
            UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [data.RetCode, AwardUtil.combineSameItem(this.oneKeyItemList), true, this.openSys]);
            this.oneKeyItemList = [];
        }
        this.isOneKeyShaoDang = false;
    }

}

export enum SCopyEvent {
    COPY_REQUEST_ENTER = "copy_request_enter",//申请进入副本
    COPY_REQUEST_INFO = "copy_request_info",//申请副本信息
    COPY_REQUEST_EXIT = "copy_request_exit",//申请退出副本
    COPY_REQUEST_SWEEP = "copy_request_sweep",//申请扫荡
    COPY_REQUEST_PETSWEEP = "copy_request_petSweep",//申请宠物副本章节扫荡
    COPY_REQUEST_STARREWARD = "copy_request_starReward",//申请领取星级奖励
    COPY_ENTER_BACK = "copy_enter_back",//进入副本成功
    COPY_INFO_BACK = "copy_info_back",//副本信息返回
    COPY_EXIT_BACK = "copy_exit_back",//副本退出副本
    COPY_RESULT_BACK = "copy_result_back",//副本结算
    COPY_REQUEST_TTTINFO = "copy_request_tttinfo",//请求通天塔信息
    COPY_TTTINFO_BACK = "copy_tttinfo_back",//通天塔信息返回
    COPY_TTT_BUYTIME = "copy_ttt_buyTime",//通天塔购买次数
    COPY_REQUEST_TTTENTERBATTLE = "copy_request_tttEnterBattle",//通天塔进去战斗
    COPY_TTTRANKINFO = "copy_tttRankInfo",//通天塔排行榜数据
    ANS_PETCOPYRANK_INFO = "ans_petCopy_Rank_info",//宠物秘境排行榜数据
    SANJIE_RANK_INFO = "SANJIE_RANK_INFO",//三界副本排行信息
    CHUANGTIANGONG_RANK_INFO = "CHUANGTIANGONG_RANK_INFO",//闯天宫排行信息
}