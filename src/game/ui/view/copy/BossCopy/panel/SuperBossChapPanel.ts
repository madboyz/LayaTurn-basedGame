import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { Super_boss_chap_cfgVo } from "../../../../../../db/sheet/vo/Super_boss_chap_cfgVo";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { SGameData, SGameEvent } from "../../../../../../net/data/SGameData";
import { S57024_2_1 } from "../../../../../../net/pt/pt_57";
import { FightMonsterView } from "../../../../../battle/role/fight/FightMonsterView";
import { CommonControl } from "../../../../../common/control/CommonControl";
import { ItemData } from "../../../../compent/data/ItemData";
import { RewardList } from "../../../../compent/RewardList";
import { GuildBossPanel } from "../../../guild/panel/GuildBossPanel";
import { SBossData, SBossEvent } from "../data/SBossData";
import { MsgManager } from "../../../../manager/MsgManager";

export class SuperBossChapPanel extends ui.main.SuperBossChapPanelUI {
    private normalClose: boolean = true;
    public selectIndex: number = -1;
    private dun_list: Array<number>;
    public chapId: number = 0;

    private _rewarldList: RewardList;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.mResouce = [
            { url: "res/atlas/guild.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        this.sureBtn.on(Laya.Event.CLICK, this, this.sureBtnClick);
        this.closeBtn1.on(Laya.Event.CLICK, this, this.close);
        SBossData.instance.on(SBossEvent.SUPER_BOSS_INFO, this, this.updateData);
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    public removeEvent(): void {
        this.sureBtn.off(Laya.Event.CLICK, this, this.sureBtnClick);
        this.closeBtn1.off(Laya.Event.CLICK, this, this.close);
        SBossData.instance.off(SBossEvent.SUPER_BOSS_INFO, this, this.updateData);
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    private requestInfo(): void {
    }

    public initComp() {
        super.initComp();
        this.bossList.hScrollBarSkin = "";
        this.bossList.itemRender = SuperBossChapItem;

        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.hGap = 28;
        this._rewarldList.rowCount = 4;
        this._rewarldList.maxNum = 4;
        this._rewarldList.itemStyle = 80;
        this.rewardBox.addChild(this._rewarldList);
    }

    public open(...args): void {
        this.initWindow(true, false, "至尊BOSS", 550, 750, 50);
        super.open();
        this.normalClose = true;
        this.chapId = SBossData.instance.superBossShowingChap
        this.dun_list = Super_boss_chap_cfgVo.get(this.chapId).dun_list;
        this.bossList.array = [];
        this.bossList.array = this.dun_list;
        this.requestInfo();
        this.dataBack();
    }

    private showRed(): void {
    }

    public dataBack(): void {
        this.selectIndex = this.getMaxCanFightIndex();
        this.bossList.scrollBar.value = (this.selectIndex >= 1 ? this.selectIndex - 1 : this.selectIndex) * 190;
        this.updateData();
        this.showRed();
    }

    public updateData(): void {
        this.bossList.refresh();
        var dunNo: number = this.dun_list[this.selectIndex];
        var info: S57024_2_1 = SBossData.instance.getSuperBossDunInfo(this.chapId, dunNo);
        var cfg: FbVo = FbVo.get(dunNo);
        var boxRewardId = cfg.box_rewards[0][0];
        //进入条件相关
        var info: S57024_2_1 = SBossData.instance.getSuperBossDunInfo(this.chapId, this.dun_list[this.selectIndex]);
        var isFirst = !info || info.pass != 1;//类型1，表示首通过
        var killed = info && info.state == 6;//类型1，表示首通过
        // //boss挑战次数
        // var bossLeftNum = cfg.cd[1] - data.times;
        // var timeEnough = bossLeftNum > 0;
        // //翻牌次数
        // // var hadGetCard = info && info.draw_times > 0;
        // var canCard = info && info.draw_state == 0;
        // var cardLeftNum = ConstVo.get("GUILD_BOSS_WEEK_DRAW_COUNT").val - SGuildData.instance.getCardTimes();
        // var cardEnough = cardLeftNum > 0;

        this.sureBtn.label = isFirst ? "挑战" : "扫荡";
        if (isFirst) {
            var dunNo: number = this.dun_list[this.selectIndex];
            if (dunNo > SBossData.instance.superBossChapInfo.DunNo) {
                this.sureBtn.gray = true;
            } else {
                this.sureBtn.gray = false;
            }
        } else {
            this.sureBtn.gray = killed;
        }

        // //刷新奖励
        // var itemList = Guild_boss_getCard_cfgVo.get(data.no).reward_show;
        // var itemDatas = [];
        // for (let i = 0; i < 4; i++) {
        //     const element = itemList[i];
        //     if (element) {
        //         var itemdata = new ItemData(element[0]);
        //         itemdata.Count = element[1];
        //         itemDatas.push(itemdata);
        //     }
        // }
        this._rewarldList.updateRewardsByNum(boxRewardId);

    }

    public clickItem(index: number): void {
        this.selectIndex = index;
        this.updateData();
    }


    public close(): void {
        super.close();
        if (this.normalClose) {
            var base = UIManager.instance.getHasOpenUI(UIID.SYS_COPY_BOSS);
            if (!base) {
                UIManager.instance.openUI(UIID.SYS_COPY_BOSS, null, 2);
            }
        }
    }

    private getMaxCanFightIndex(): number {
        if (!SBossData.instance.superBossChapInfo) {
            return 0;
        }
        var canFightMax = this.dun_list.length - 1;
        for (let i = 0; i < this.dun_list.length; i++) {
            var info: S57024_2_1 = SBossData.instance.getSuperBossDunInfo(this.chapId, this.dun_list[i]);
            var killed = info && info.times > 0;//类型1，表示首通过
            if (killed) {
                continue;
            } else {
                canFightMax = i;
                break;
            }
        }
        return canFightMax;
    }

    public sureBtnClick(): void {
        var dunNo: number = this.dun_list[this.selectIndex];
        if (dunNo > SBossData.instance.superBossChapInfo.DunNo) {
            MsgManager.instance.showRollTipsMsg("请先通关前置关卡");
            return;
        }
        var info: S57024_2_1 = SBossData.instance.getSuperBossDunInfo(this.chapId, this.dun_list[this.selectIndex]);
        var isFirst = !info || info.pass != 1;//类型1，表示首通过
        var killed = info && info.state == 6;//类型1，表示首通过
        //进入条件相关info
        if (isFirst) {
            this._clickFight = true;
            SCopyData.instance.copyType = CopyType.SUPER_BOSS;
            CommonControl.instance.EnterCopy(dunNo);
        } else {
            SCopyData.instance.copyType = CopyType.SUPER_BOSS;
            SBossData.instance.protocol.send57025(dunNo);
        }

    }

    private _clickFight: boolean = false;
    private onUpdateFightState(): void {
        if (SGameData.instance.PLAYFIGHTREPORT == true && this._clickFight) {
            this._clickFight = false;
            this.normalClose = false;
            this.close();
            UIManager.instance.closeUI(UIID.SYS_COPY_BOSS);
            UIManager.instance.closeUI(UIID.SYS_MAIN);
        }
    }


}



export class SuperBossChapItem extends ui.main.SuperBossChapItemUI {
    private _rewarldList: RewardList;
    private _role: FightMonsterView;

    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.thisClick);
        this.sureBtn.on(Laya.Event.CLICK, this, this.sureBtnClick);

        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.hGap = 10;
        this._rewarldList.rowCount = 2;
        this._rewarldList.maxNum = 2;
        this._rewarldList.itemStyle = 60;
        this.rewardBox.addChild(this._rewarldList);
        this.initRole();
    }

    private initRole(): void {
        this._role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this._role.changeScale = 0.8;
        this._role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.roleBox.addChild(this._role);
    }

    private _mdata: number;
    public set dataSource(data: number) {
        if (!data) {
            return;
        }
        this.rewardBox.visible = this.killedImg.visible = this.costImg.visible = this.sureBtn.visible = false;
        this.typeLb.text = this.costLb.text = "";
        this._mdata = data;
        var cfg = FbVo.get(data);
        var costCfg = cfg.box_rewards[0];
        var panel = (this.parent.parent.parent as SuperBossChapPanel)
        var index = panel.bossList.array.indexOf(this._mdata);
        var info: S57024_2_1 = SBossData.instance.getSuperBossDunInfo(panel.chapId, data);

        this.selectImg.visible = index == panel.selectIndex;
        //UI显示
        if (this._role) {
            if (this._role.info == null) {
                this._role.info = {};
            }
            this._role.info.ParentObjId = cfg.mon_show_no;
            this._role.info.LookIdx = 1;
            this._role.updateSkin();
        }
        this.titleLb.text = cfg.name;
        var killed = info && info.state == 6;
        var isFirst = !info || info.pass != 1;
        if (killed) {
            this.sureBtn.visible = true;
            if (info.RwdState == 3) {
                this.sureBtn.gray = true;
                this.sureBtn.label = "已领取";
            } else {
                var costItem = new ItemData(costCfg[1]);
                this.sureBtn.gray = false;
                this.costImg.visible = true;
                this.costImg.skin = ResUtils.getItemIcon(costItem.clientInfo.icon);
                this.costLb.text = "x" + costCfg[2];
                this.sureBtn.label = "开启宝箱";
            }
        } else {
            this.rewardBox.visible = true;
            this.typeLb.text = isFirst ? "首通奖励" : "通关奖励";
            // this.typeLb.color = isFirst ? "#ff0000" : "#8a5428";
            this._rewarldList.updateRewardsByNum(isFirst ? cfg.first_reward : cfg.final_reward);
        }

        if (data > SBossData.instance.superBossChapInfo.DunNo) {
            this.bgImg.gray = true;
        } else {
            this.bgImg.gray = false;
        }
    }

    private thisClick(e: Laya.Event): void {
        var panel = (this.parent.parent.parent as GuildBossPanel)
        var index = panel.bossList.array.indexOf(this._mdata);
        panel.clickItem(index);
    }

    private sureBtnClick(): void {
        SBossData.instance.protocol.send57026(this._mdata);
        // var panel = (this.parent.parent.parent as SuperBossChapPanel)
        // var index = panel.bossList.array.indexOf(this._mdata);
        // var info: S57024_2_1 = SBossData.instance.getSuperBossDunInfo(panel.chapId, this._mdata);
        // var killed = info && info.state == 6;
        // var isFirst = !info || info.pass != 1;
    }

    public destroy(): void {
        super.destroy();
    }

}