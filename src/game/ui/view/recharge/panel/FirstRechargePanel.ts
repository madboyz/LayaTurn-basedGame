import { ChargeVo } from "../../../../../db/sheet/vo/ChargeVo";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { SdkManager } from "../../../../../net/SdkManager";
import { AwardUtil } from "../../../../award/AwardUtil";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { SRechargeData, SRechargeEvent } from "../data/SRechargeData";

export class FirstRechargePanel extends ui.main.FirstRechargePanelUI {
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/recharge.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        SRechargeData.instance.on(SRechargeEvent.RECHARGE_STATE_CHANGE, this, this.close);

        this.backBtn.on(Laya.Event.CLICK, this, this.close);
        for (let i = 1; i <= 4; i++) {
            (this["typeBtn" + i] as component.ScaleButton).on(Laya.Event.CLICK, this, this.typeBtnClick, [i]);
        }

    }

    public removeEvent(): void {
        SRechargeData.instance.off(SRechargeEvent.RECHARGE_STATE_CHANGE, this, this.close);

        this.backBtn.off(Laya.Event.CLICK, this, this.close);
        for (let i = 1; i <= 4; i++) {
            (this["typeBtn" + i] as component.ScaleButton).on(Laya.Event.CLICK, this, this.typeBtnClick, [i]);
        }
    }

    public initComp() {
        super.initComp();
        this.rewardList.itemRender = FirstRechargeItem;
        var cfgs: ChargeVo[] = ChargeVo.getFirstRechargeCfg();
        for (let i = 0; i < 4; i++) {
            var btn = (this["typeBtn" + (i + 1)] as component.ScaleButton);
            btn.label = "充值" + cfgs[i].money + "元";
        }
    }

    public open(...args): void {
        this.initWindow(true, false, "首冲", 486, 557, 160);
        super.open();
        this.update();
    }

    public update(): void {
        var awardId = ConstVo.get("FIRST_RECHARGE_REWARD").val;
        var baseList = AwardUtil.GetNormalGoodsList(awardId);
        var goodsList = [];
        for (let i = 0; i < baseList.length; i++) {
            var ele = baseList[i];
            if (!ele.IsEquip || ele.isJobEquip) {
                goodsList.push(ele);
            }
        }
        goodsList = goodsList.slice(0, 6);
        this.rewardList.array = goodsList;
    }

    //点击领取
    private typeBtnClick(index: number): void {
        var cfgs: ChargeVo[] = ChargeVo.getFirstRechargeCfg();
        SdkManager.instance.Pay(cfgs[index - 1].no);
    }

    public close(): void {
        super.close();
    }
}


//道具的奖励ITEM
export class FirstRechargeItem extends Laya.View {
    private item: BaseItem;
    constructor() {
        super();
        this.size(80, 80);
        this.item = new BaseItem();
        this.item.setItemStyle(80);
        this.item.isShowToolTip = true;
        this.addChild(this.item);
    }

    private _mdata: ItemData;
    public set dataSource(data: ItemData) {
        if (!data) {
            return;
        }
        this._mdata = data;
        this.item.itemData = this._mdata;
        this.item.toolTipData = this.item.itemData;
    }

}