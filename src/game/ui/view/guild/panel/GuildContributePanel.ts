import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { Guild_contribute_cfgVo } from "../../../../../db/sheet/vo/Guild_contribute_cfgVo";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { SGuildData } from "../data/SGuildData";

export class GuildContributePanel extends ui.main.GuildContributePanelUI {
    private _showItem1: BaseItem;
    private _showItem2: BaseItem;
    private _getReward: BaseItem;

    constructor() {
        super();
        this.initComp();
        this.requestInfo();
    }

    private initComp(): void {
        this.initEvent();
        this._showItem1 = new BaseItem();
        this._showItem1.setItemStyle(80);
        this.showItem1.addChild(this._showItem1);
        this._showItem2 = new BaseItem();
        this._showItem2.setItemStyle(80);
        this.showItem2.addChild(this._showItem2);
        this._getReward = new BaseItem();
        this._getReward.setItemStyle(80);
        this.getReward.addChild(this._getReward);
        HtmlUtils.setHtml(this.item1Lb.style, 6, 20, "center", "top");
        HtmlUtils.setHtml(this.item2Lb.style, 6, 20, "center", "top");
    }

    private requestInfo(): void {
        SGuildData.instance.protocol.send40037(0);
    }

    public initEvent(): void {
        this.refreshBtn.on(Laya.Event.CLICK, this, this.refreshBtnClick);
        this.contriBtn1.on(Laya.Event.CLICK, this, this.contriBtn1Click);
        this.contriBtn2.on(Laya.Event.CLICK, this, this.contriBtn2Click);

        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.updateData);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.updateData);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.updateData);
    }

    public removeEvent(): void {
        this.refreshBtn.off(Laya.Event.CLICK, this, this.refreshBtnClick);
        this.contriBtn1.off(Laya.Event.CLICK, this, this.contriBtn1Click);
        this.contriBtn2.off(Laya.Event.CLICK, this, this.contriBtn2Click);

        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE, this, this.updateData);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE, this, this.updateData);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD, this, this.updateData);
    }

    public updateData(): void {
        var data = SGuildData.instance.contriData;
        if (!data) {
            return;
        }
        //次数
        var maxTime = ConstVo.get("GUILD_DONATE_TODAY_LIMIT").val;
        this.leftTimeLb.text = "剩余次数：" + (maxTime - data.DonateToday);
        this.leftTimeLb.color = (maxTime - data.DonateToday) > 0 ? "#00b007" : "#ff0000";
        //道具1
        var contriCfg = Guild_contribute_cfgVo.get(data.DonateNo);
        var itemdata = new ItemData(contriCfg.goods_no);
        this._showItem1.itemData = itemdata;
        this._showItem1.toolTipData = itemdata;
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(contriCfg.goods_no);
        var isEnough = (itemNum >= contriCfg.num);
        this.item1Lb.innerHTML = HtmlUtils.addColor(GMath.GetChineseNumber(itemNum) + `/${contriCfg.num}`, isEnough ? "#04a30a" : "#ff0000", 22);

        //道具2
        var goldContri = ConstVo.get("GUILD_DONATE_PAY_REWARD").val;
        var itemdata = new ItemData(goldContri[0]);
        this._showItem2.itemData = itemdata;
        this._showItem2.toolTipData = itemdata;
        var itemNum: number = SRoleData.instance.getMoneyByType(goldContri[0])
        var isEnough = (itemNum >= goldContri[1]);
        this.item2Lb.innerHTML = HtmlUtils.addColor(GMath.GetChineseNumber(itemNum) + `/${goldContri[1]}`, isEnough ? "#04a30a" : "#ff0000", 22);

        this.tipsLb.text = "(" + goldContri[2] + "倍帮贡奖励)";
        //道具3
        var getReward = ConstVo.get("GUILD_DONATE_REWARD").val[0];
        var itemdata = new ItemData(getReward[0]);
        this._getReward.itemData = itemdata;
        this._getReward.toolTipData = itemdata;
        this._getReward.setAmountLabel("" + getReward[1], "#4e17cd");
        //道具4
        var refreshCost = ConstVo.get("GUILD_DONATE_RESET_COST").val;
        var itemdata = new ItemData(refreshCost[0]);
        this.refreshIcon.skin = ResUtils.getItemIcon(itemdata.clientInfo.icon);
        this.goldNumLb.text = "x" + refreshCost[1];
        var itemNum: number = SRoleData.instance.getMoneyByType(refreshCost[0])
        var isEnough = (itemNum >= refreshCost[1]);
        this.goldNumLb.color = isEnough ? "#8e5213" : "#ff0000";
    }

    private refreshBtnClick(): void {
        SGuildData.instance.protocol.send40037(1);
    }

    private contriBtn1Click(): void {
        SGuildData.instance.protocol.send40035(0);
    }

    private contriBtn2Click(): void {
        SGuildData.instance.protocol.send40035(1);
    }

    public destroy(): any {
        this.removeEvent();
        super.destroy();
    }

}
