import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { S12002_1 } from "../../../../../net/pt/pt_12";
import { S23001, S23005, S23005_1 } from "../../../../../net/pt/pt_23";
import { AoiInfo } from "../../../../aoi/AoiInfo";
import { PlayerView } from "../../../../battle/role/PlayerView";
import { RoleFactory } from "../../../../battle/role/RoleFactory";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { Alert } from "../../../compent/Alert";
import { ItemData } from "../../../compent/data/ItemData";
import { RewardList } from "../../../compent/RewardList";
import { SJJCData, SJJCEvent } from "../data/SJJCData";
import { Arena_rank_rewardVo } from "../../../../../db/sheet/vo/Arena_rank_rewardVo";
import { GameUtils } from "../../../../utils/GameUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { FightMonsterView } from "../../../../battle/role/fight/FightMonsterView";

export class JJCPanel extends ui.main.JJCPanelUI {
    private jjcInfo: S23001;
    private jjcEnemy: S23005;

    private _rewarldList: RewardList;
    private _enemyList: JJCRoleItem[];
    private _enemyPos = [{ x: 189, y: 437 }, { x: 36, y: 349 }, { x: 340, y: 349 }, { x: 93, y: 147 }, { x: 301, y: 147 }];

    constructor() {
        super();
        this.mResouce = [

        ];
    }

    public initEvent(): void {
        this.rankBtn.on(Laya.Event.CLICK, this, this.rankBtnClick);
        this.shopBtn.on(Laya.Event.CLICK, this, this.shopBtnClick);
        this.close_Btn.on(Laya.Event.CLICK, this, this.backBtnClick);
        this.back_Btn.on(Laya.Event.CLICK, this, this.backBtnClick);
        this.recordBtn.on(Laya.Event.CLICK, this, this.recordBtnClick);
        this.getRewardBtn.on(Laya.Event.CLICK, this, this.getRewardBtnClick);
        this.addTimeBtn.on(Laya.Event.CLICK, this, this.addTimeBtnClick);
    }

    public removeEvent(): void {
        this.rankBtn.off(Laya.Event.CLICK, this, this.rankBtnClick);
        this.shopBtn.off(Laya.Event.CLICK, this, this.shopBtnClick);
        this.close_Btn.off(Laya.Event.CLICK, this, this.backBtnClick);
        this.back_Btn.off(Laya.Event.CLICK, this, this.backBtnClick);
        this.recordBtn.off(Laya.Event.CLICK, this, this.recordBtnClick);
        this.getRewardBtn.off(Laya.Event.CLICK, this, this.getRewardBtnClick);
        this.addTimeBtn.off(Laya.Event.CLICK, this, this.addTimeBtnClick);
    }

    public initComp() {
        super.initComp();
        this.initList();
        if (!this._enemyList) {
            this._enemyList = [];
            for (let i = 4; i >= 0; i--) {
                var ele = new JJCRoleItem;
                this._enemyList.push(ele);
                this.addChild(ele);
                ele.x = this._enemyPos[i].x;
                ele.y = this._enemyPos[i].y;
            }
        }
    }

    private initList(): void {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 3;
        this._rewarldList.maxNum = 3;
        this._rewarldList.itemStyle = 50;
        this._rewarldList.hGap = 3;
        this._rewarldList.x = 247;
        this._rewarldList.y = 730;
        this.addChild(this._rewarldList);
    }



    public open(...args): void {
        this.initWindow(true, false, "天梯赛", 550, 750, 50);
        super.open();
        // this.requestBase();
        // this.requesyEnemy();
    }

    private asked: boolean = false;//不知道为什么，服务端，次数总有问题，先屏蔽了重复发请求
    private requestBase(): void {
        if (this.asked) {
            return;
        }
        this.asked = true;
        this.timer.once(10000, this, () => {
            this.asked = false;
        })
        SJJCData.instance.protocol.send23001();
    }
    // private requesyEnemy(): void {
    //     this.event(SJJCEvent.JJC_ASK_ENEMY_INFO);
    // }


    public update(): void {
        this.jjcInfo = SJJCData.instance.jjcBaseInfo;
        this.jjcEnemy = SJJCData.instance.jjcEnemyInfo;
        if (!this.jjcInfo || !this.jjcEnemy) {
            return;
        }
        this.jjcEnemy.item_1.sort((a: S23005_1, b: S23005_1): any => {
            return a.rank - b.rank;
        });
        //排名文本
        this.rankImg.value = (this.jjcInfo.rank != 0 ? this.jjcInfo.rank + "" : "99999");
        this.textLoop();
        this.timer.loop(1000, this, this.textLoop);
        //对手数据
        for (let i = 0; i < 5; i++) {
            var ele = this.jjcEnemy.item_1[i];
            this._enemyList[i].dataSource = ele;
        }
        //排行奖励
        var rewardId = Arena_rank_rewardVo.getByRank(this.jjcInfo.his_rank).rookie_group;
        this._rewarldList.updateRewardsByNum(rewardId);
        this.getImg.visible = (this.jjcInfo.reward_flag == 2);
        this.getRewardBtn.disabled = (this.jjcInfo.reward_flag == 0 || this.jjcInfo.reward_flag == 2)
    }


    private textLoop(): void {
        this.cishuLb.text = "剩余挑战次数：" + this.jjcInfo.left_times;

        var leftTime = this.jjcInfo.left_times;
        var cfgInitTime = ConstVo.get("OA_INIT_CHALLANGE_TIMES").val;
        if (leftTime >= cfgInitTime) {
            this.cishuLb.y = 772;
            this.timeLb.text = "";
        } else {
            this.cishuLb.y = 765;
            var recoverTime = ConstVo.get("OA_COUNT_RECOVER_INTERVAL").val + (this.jjcInfo.timestamp || GameUtils.TimeStamp);
            var rcLeftTime = recoverTime - GameUtils.TimeStamp;
            if (rcLeftTime < 0) {
                rcLeftTime = 0;
                this.requestBase();
            }
            var hh = TimerUtil.hh(rcLeftTime);
            var mm = TimerUtil.mm(rcLeftTime);
            var ss = TimerUtil.ss(rcLeftTime);
            this.timeLb.text = hh + ":" + mm + ":" + ss;
        }
    }

    private addTimeBtnClick(): void {
        var cfgBuyTime = ConstVo.get("OA_BUY_CHALLANGE_TIME_COST").val;
        for (let i = cfgBuyTime.length - 1; i >= 0; i--) {
            var ele = cfgBuyTime[i];
            if (ele[0] - 1 <= this.jjcInfo.buy_times) {
                var showItem = ele[1][0];
                var newData: ItemData = new ItemData(showItem[0]);

                var str: string = HtmlUtils.addColor("消耗", "#8a5428", 20) +
                    HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", ""), 25, 25) +
                    HtmlUtils.addColor(showItem[1], "#3f8f4f", 20) +
                    HtmlUtils.addColor("购买一次天梯赛挑战次数", "#8a5428", 20);
                break;
            }
        }
        Alert.show(str, this, () => {
            this.event(SJJCEvent.JJC_ASK_BUYTIME);
        }, null, null, null, true, "购买次数");
    }


    //点击领取
    private getRewardBtnClick(): void {
        this.event(SJJCEvent.JJC_ASK_GETREWARD);
    }

    //查看排行
    private rankBtnClick(): void {
        UIManager.instance.openUI(UIID.SYS_RANK);
    }

    //跳转商店
    private shopBtnClick(): void {
        UIManager.instance.openUI(UIID.SYS_SHOP, null, 3);
    }

    //跳转记录面板
    private recordBtnClick(): void {
        UIManager.instance.openUI(UIID.SYS_JJC_RECORD);
    }

    //返回按钮
    private backBtnClick(): void {
        this.close();
    }

    public close(): void {
        this.timer.clear(this, this.textLoop);
        for (let i = 0; i < 5; i++) {
            (this._enemyList[i] as JJCRoleItem).clear();
        }
        super.close();
    }
}


//竞技场对手的item
export class JJCRoleItem extends ui.main.JJCItemUI {
    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.thisClick);
    }

    private role: PlayerView;
    private monster: FightMonsterView;

    private _mdata: S23005_1;
    public set dataSource(data: S23005_1) {
        if (!data) {
            this.visible = false;
            return;
        }
        this.visible = true;
        if (this._mdata != data) {
            this.clear();
        }
        this._mdata = data;
        this.initRole();
    }

    private initRole(): void {
        if (this.role || this.monster) {
            return;
        }
        if (this._mdata.bmonNo > 0) {
            this.monster = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
            this.monster.info = {};
            this.monster.info.ParentObjId = this._mdata.bmonNo;
            this.monster.info.LookIdx = 1;
            this.roleBox.addChild(this.monster);
            this.monster.updateSkin();
            this.monster.x = 40;
            this.monster.y = 100;
        } else {
            //这里是人
            this.role = RoleFactory.CreateAOiPlayer(this._mdata.faction, this._mdata.sex);
            this.role.info = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
            var data = new S12002_1();
            data.Sex = this._mdata.sex;
            data.Faction = this._mdata.faction;
            data.Clothes = this._mdata.clothes;
            data.AerocraftNo = this._mdata.aerocraftNo;
            data.Weapon = FactionVo.get(data.Faction).weapon_anim;
            this.role.info.PlayerInfo = data;
            this.role.scaleX = this.role.scaleY = 0.9;
            this.role.x = 40;
            this.role.y = 100;
            this.roleBox.addChild(this.role);
            this.role.updateSkin();
            // this.titleBox.y = data.AerocraftNo > 0 ? 0 : 30;
        }

        //相关文档
        this.rankImg.value = this._mdata.rank + "";
        this.powerLb.text = "战力" + this._mdata.power;
        this.roleName.text = this._mdata.name;
        var bleachNum: number = 0;
        bleachNum = this._mdata.rank < 100 ? 0 : (this._mdata.rank < 1000 ? 1 : 2);
        this.rankBgLbL.x = 54 - 8 * bleachNum;
        this.rankBgLbR.x = 122 + 8 * bleachNum;
        //秒杀图片
        this.miaoshaImg.visible = this._mdata.rank > SJJCData.instance.jjcBaseInfo.rank;
    }

    public thisClick(): void {
        this.parent.event(SJJCEvent.JJC_ASK_FIGHT, this._mdata);
    }

    public clear(): void {
        this.role && this.role.dispose();
        this.role && this.role.removeSelf();
        this.role = null;
        this.monster && this.monster.dispose();
        this.monster && this.monster.removeSelf();
        this.monster = null;
    }

    public destroy(): void {
        this.clear();
        super.destroy();
    }

}