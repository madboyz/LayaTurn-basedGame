import { ChargeVo } from "../../../../../db/sheet/vo/ChargeVo";
import { SdkManager } from "../../../../../net/SdkManager";
import { SRechargeData } from "../data/SRechargeData";

export class RechargePanel extends ui.main.RechargePanelUI {
    public cfgs: ChargeVo[];

    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/recharge.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        this.backBtn.on(Laya.Event.CLICK, this, this.close);
    }

    public removeEvent(): void {
        this.backBtn.off(Laya.Event.CLICK, this, this.close);
    }

    public initComp() {
        super.initComp();
        this.rewardList.itemRender = RechargeItem;
        this.rewardList.vScrollBarSkin = "";
        this.cfgs = ChargeVo.getRechargeCfg();
    }

    public open(...args): void {
        this.initWindow(true, false, "充值", 480, 788, 0);
        super.open();
        this.update();
    }

    public update(): void {
        this.rewardList.array = this.cfgs;
    }

    public close(): void {
        super.close();
    }
}

//道具的奖励ITEM
export class RechargeItem extends ui.main.RechargeItemUI {
    constructor() {
        super();
        this.on(Laya.Event.CLICK,this,this.thisClick)
    }

    private _mdata: ChargeVo;
    public set dataSource(data: ChargeVo) {
        if (!data) {
            return;
        }
        this._mdata = data;
        var index = (this.parent.parent.parent as RechargePanel).cfgs.indexOf(this._mdata);
        this.goldLb.text = this._mdata.yuanbao;
        this.moneyLb.text = this._mdata.money + "元";
        this.goldImg.skin = "recharge/img_gold_" + (index >= 3 ? 4 : (index + 1)) + ".png";
        //有无双倍奖励
        this.doubleBox.visible = !SRechargeData.instance.checkHaveRecharge(this._mdata.no);
    }

    public thisClick():void{
        SdkManager.instance.Pay(this._mdata.no);
    }

}