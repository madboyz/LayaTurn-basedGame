import { BaseItem } from "../../../compent/BaseItem";
import { NumStep } from "../../../compent/NumStep";
import { MsgManager } from "../../../manager/MsgManager";
import { SGoodsEvent, SBagData } from "../../../../../net/data/SBagData";
import { ItemData } from "../../../compent/data/ItemData";
import { GetWay } from "../../../compent/GetWay";
import { MallVo } from "../../../../../db/sheet/vo/MallVo";
import { SShopData } from "../../../../../net/data/SShopData";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class GetWayPanel extends ui.main.GetWayPanelUI {
    private item: BaseItem;
    private numStep: NumStep;
    private code: number;
    public _getWay: GetWay;
    public vo: MallVo;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.initItem();
        this.initStep();
    }

    private initItem(): void {
        this.item = new BaseItem();
        this.item.setItemStyle(80);
        this.addChild(this.item);
        this.item.x = 188;
        this.item.y = 212;
    }

    private initStep(): void {
        this.numStep = new NumStep();
        this.numStep.x = 82;
        this.numStep.y = 415;
        this.numStep.min = 1;
        this.numStep.max = 999;
        this.numStep.step = 1;
        this.numStep.stepAdd = 10;
        this.numStep.mode = 1;
        this.numStep.currentNum = 1;
        this.addChild(this.numStep);
    }

    public update(): void {

    }

    public open(...args): void {
        this.code = args[0];
        this.initWindow(true, true, "获取途径", 486, 562, 165);
        super.open();
        this.vo = args[1];
        if (args.length == 3) {
            this.numStep.currentNum = args[2];
        }
        else
            this.numStep.currentNum = 1;
        this.item.itemCode = this.code;
        this.item.toolTipData = this.item.itemData;
        this.txt_name.text = this.item.itemData.clientInfo.name;
        this._getWay = new GetWay(false);
        this._getWay.initData(this.item.itemData.clientInfo.from_source);
        this._getWay.x = 100;
        this._getWay.y = 630;
        this.addChild(this._getWay);
        var haveMoney = 0;
        if (this.vo && this.vo.no != null) {
            var costData = new ItemData(this.vo.price_type);
            this.icon.skin = ResUtils.getItemIcon(costData.clientInfo.icon);
            switch (this.vo.price_type) {
                case 3:
                    {
                        haveMoney = SRoleData.instance.info.Yuanbao;
                        break;
                    }
                case 4:
                    {
                        haveMoney = SRoleData.instance.info.BindYuanbao;
                        break;
                    }
                case 31:
                    {
                        haveMoney = SRoleData.instance.info.Love;
                        break;
                    }
                default:
                    {
                        haveMoney = SBagData.instance.prop.getItemCountByGoodsNo(this.vo.price_type);
                        break;
                    }
            }
            var max_num = Math.floor(haveMoney / this.vo.discount_price);
            this.numStep.max = max_num == 0 ? 1 : max_num;
            this.txt_num.text = `x${this.vo.discount_price * this.numStep.currentNum}`;
        }
    }
    public initEvent(): void {
        this.btn_recharge.on(Laya.Event.CLICK, this, this.onRecharge);
        this.btn_buy.on(Laya.Event.CLICK, this, this.onBuy);
        this.numStep.on(Laya.Event.CHANGE, this, this.onChange);
    }
    public removeEvent(): void {
        this.btn_recharge.off(Laya.Event.CLICK, this, this.onRecharge);
        this.btn_buy.off(Laya.Event.CLICK, this, this.onBuy);
        this.numStep.off(Laya.Event.CHANGE, this, this.onChange);
    }

    private onRecharge(): void {
        MsgManager.instance.showRollTipsMsg("敬请期待");
    }

    private onBuy(): void {
        if (!this.vo || (this.vo && this.vo.no == null))
            return;
        this.event(SGoodsEvent.GOODS_BUY, [[this.vo.no, this.numStep.currentNum]]);
    }

    public onChange(): void {
        var isRed = false;
        if (this.vo && this.vo.no != null) {
            var haveMoney = 0;
            var costData = new ItemData(this.vo.price_type);
            this.icon.skin = ResUtils.getItemIcon(costData.clientInfo.icon);
            switch (this.vo.price_type) {
                case 3:
                    {
                        haveMoney = SRoleData.instance.info.Yuanbao;
                        break;
                    }
                case 4:
                    {
                        haveMoney = SRoleData.instance.info.BindYuanbao;
                        break;
                    }
                case 31:
                    {
                        haveMoney = SRoleData.instance.info.Love;
                        break;
                    }
                    default:
                    {
                        haveMoney = SBagData.instance.prop.getItemCountByGoodsNo(this.vo.price_type);
                        break;
                    }
                }
            isRed = haveMoney < this.vo.discount_price * this.numStep.currentNum ? true : false;
            var max_num = Math.floor(haveMoney / this.vo.discount_price);
            this.numStep.max = max_num == 0 ? 1 : max_num;
            if (isRed)
                this.txt_num.color = "#ff0000";
            else
                this.txt_num.color = "#fffc00";
            this.txt_num.text = `x${this.vo.discount_price * this.numStep.currentNum}`;

        }
    }

    public close(): void {
        this.numStep.clear();
        this._getWay && this._getWay.removeSelf();
        this._getWay = null;
        this.code = 0;
        super.close();
    }
}