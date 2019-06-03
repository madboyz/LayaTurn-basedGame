import { Guild_boss_getCard_cfgVo } from "../../../../../db/sheet/vo/Guild_boss_getCard_cfgVo";
import { S57105, S57105_1 } from "../../../../../net/pt/pt_57";
import { SGuildData, SGuildEvent } from "../data/SGuildData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { ItemData } from "../../../compent/data/ItemData";
import { BaseItem } from "../../../compent/BaseItem";
import { AwardUtil } from "../../../../award/AwardUtil";
import { MsgManager } from "../../../manager/MsgManager";
import { SBagData } from "../../../../../net/data/SBagData";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class GuildBossSelectCardPanel extends ui.main.GuildBossSelectCardPanelUI {
    private cardData: Array<{ sIndex: number, DrawTimes: any, reward: S57105_1, isClick: boolean, isBack: boolean }>;
    private loopTime: number = 31;
    public openCard: number = 0;
    public copyId: number = 0;
    public cfg: Guild_boss_getCard_cfgVo;

    constructor() {
        super();
        this.isCloseByNull = false;
        this.layer = UILEVEL.POP_3;
        this.mResouce = [
            { url: "res/atlas/guild.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        SGuildData.instance.on(SGuildEvent.GUILD_BOSS_CARD_UPDATE, this, this.refreshCard);
    }

    public removeEvent(): void {
        SGuildData.instance.off(SGuildEvent.GUILD_BOSS_CARD_UPDATE, this, this.refreshCard);
    }

    public initComp() {
        super.initComp();
        this.cardList.vScrollBarSkin = "";
        this.cardList.itemRender = GuildBossSelectCardItem;
    }

    public open(...args): void {
        this.initWindow(true, false, "帮派", 550, 750, 50);
        super.open();
        this.copyId = this.arg[0];
        this.cfg = Guild_boss_getCard_cfgVo.get(this.copyId);
        this.cardData = [{ sIndex: -1, DrawTimes: -1, reward: null, isClick: false, isBack: true },
        { sIndex: -1, DrawTimes: -1, reward: null, isClick: false, isBack: true },
        { sIndex: -1, DrawTimes: -1, reward: null, isClick: false, isBack: true },
        { sIndex: -1, DrawTimes: -1, reward: null, isClick: false, isBack: true },
        { sIndex: -1, DrawTimes: -1, reward: null, isClick: false, isBack: true },
        { sIndex: -1, DrawTimes: -1, reward: null, isClick: false, isBack: true }];
        this.loopTime = 31;
        this.openCard = 0;
        this.cardList.array = this.cardData;
        this.startTime();
        this.updateData();
    }

    public refreshCard(data: S57105) {
        this.openCard = data.DrawTimes;
        for (let i = 0; i < this.cardData.length; i++) {
            const element = this.cardData[i];
            if (element.sIndex == data.DrawTimes) {
                element.DrawTimes = data.DrawTimes;
                element.reward = data.item_1[0];
                break;
            }
        }
        this.updateData();
    }

    public updateData(): void {
        this.cardList.refresh();
        var cardLeftNum = ConstVo.get("GUILD_BOSS_WEEK_DRAW_COUNT").val - SGuildData.instance.getCardTimes();
        var cardEnough = cardLeftNum > 0;
        this.timeLb.text = cardLeftNum + "次";
        this.timeLb.color = cardEnough ? "#00b007" : "#ff0000";

    }

    public clickItem(index: number): void {
        if (this.cardData[index].sIndex > 0) {
            return;
        }
        this.cardData[index].sIndex = this.openCard + 1;
        SGuildData.instance.protocol.send57105(this.copyId, this.openCard + 1);
        // var aaa = new S57105;
        // aaa.DrawTimes = this.openCard + 1;
        // this.refreshCard(aaa);
    }

    private startTime(): void {
        this.timeLoop();
        this.timer.loop(1000, this, this.timeLoop);
    }

    private timeLoop(): void {
        this.loopTime--;
        this.leftTimeLb.text = "剩余时间：" + this.loopTime;
        if (this.loopTime <= 0) {
            this.close();
        }
    }

    public close(): void {
        this.timer.clear(this, this.timeLoop);
        this.cardList.array = [];
        var cardLeftNum = ConstVo.get("GUILD_BOSS_WEEK_DRAW_COUNT").val - SGuildData.instance.getCardTimes();
        var cardEnough = cardLeftNum > 0;
        if (cardEnough && this.openCard == 0) {
            SGuildData.instance.protocol.send57105(this.copyId, 1);
        }
        super.close();
    }


}


export class GuildBossSelectCardItem extends ui.main.GuildBossSelectCardItemUI {
    private getItem: BaseItem;

    constructor() {
        super();
        this.initItem();
        this.on(Laya.Event.CLICK, this, this.thisClick);
    }

    private initItem(): void {
        if (!this.getItem) {
            this.getItem = new BaseItem();
            this.getItem.setItemStyle(80);
            this.itemBox.addChild(this.getItem);
        }
    }

    private isShowing: boolean = false;

    private _mdata: { sIndex: number, DrawTimes: any, reward: S57105_1, isClick: boolean, isBack: boolean };
    public set dataSource(data: { sIndex: number, DrawTimes: any, reward: S57105_1, isClick: boolean, isBack: boolean }) {
        if (!data) {
            return;
        }
        this._mdata = data;
        var panel = (this.parent.parent.parent as GuildBossSelectCardPanel)
        var index = panel.cardList.array.indexOf(this._mdata);
        var newIsBack = data.sIndex <= 0;
        if (this._mdata.isBack && !newIsBack && this._mdata.DrawTimes > 0) {
            this.showClickMovie();
        } else {
            this.refresh();
        }
    }

    private showClickMovie(): void {
        if (this.isShowing) {
            return;
        }
        this.isShowing = true;
        Laya.Tween.to(this.cardBox, { scaleX: 0.15 }, 300, null, Laya.Handler.create(this, () => {
            this._mdata.isBack = false;
            this.refresh();
            Laya.Tween.to(this.cardBox, { scaleX: 1 }, 300, null, Laya.Handler.create(this, () => {
                this.isShowing = false;
            }));
        }))
    }

    public refresh(): void {
        var panel = (this.parent.parent.parent as GuildBossSelectCardPanel)
        this.itemBox.visible = this.costBox.visible = this.freeLb.visible = false;
        if (this._mdata.isBack) {
            this.cardBg.skin = "guild/guild_bg_3.png";
            var opened = panel.openCard;
            if (opened <= 0) {
                this.freeLb.visible = !this._mdata.isClick;
            } else {
                this.costBox.visible = true;
                var costcfg = panel.cfg["cost_" + (opened + 1)][0];
                var itemdata = new ItemData(costcfg[0]);
                this.costItem.skin = ResUtils.getItemIcon(itemdata.clientInfo.icon);
                this.costNumLb.text = "x" + costcfg[1];
                var enough = SRoleData.instance.getMoneyByType(costcfg[0]) >= costcfg[1];
                this.costNumLb.color = enough ? "#1e7c13" : "#ff0000";
            }
        } else {
            this.cardBg.skin = "guild/guild_bg_4.png";
            this.itemBox.visible = this._mdata.isClick;
            var rewarditem = new ItemData(this._mdata.reward.GoodsNo);
            rewarditem.Count = this._mdata.reward.GoodsNum;
            rewarditem.serverInfo.Quality = this._mdata.reward.Quality;
            this.getItem.itemData = rewarditem;
            this.getItem.toolTipData = rewarditem;
        }
    }

    private thisClick(e: Laya.Event): void {
        if (this._mdata.isClick) {
            return;
        }
        var cardLeftNum = ConstVo.get("GUILD_BOSS_WEEK_DRAW_COUNT").val - SGuildData.instance.getCardTimes();
        var cardEnough = cardLeftNum > 0;
        if (!cardEnough) {
            MsgManager.instance.showRollTipsMsg("本周的可翻牌次数已经用完");
            return;
        }
        this._mdata.isClick = true;
        var panel = (this.parent.parent.parent as GuildBossSelectCardPanel)
        var index = panel.cardList.array.indexOf(this._mdata);
        panel.clickItem(index);
    }

    public destroy(): void {
        Laya.Tween.clearAll(this.cardBox);
        super.destroy();
    }

}