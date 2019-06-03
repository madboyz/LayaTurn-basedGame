import { MallVo } from "../../../../../../db/sheet/vo/MallVo";
import { SBagData } from "../../../../../../net/data/SBagData";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { SShopData } from "../../../../../../net/data/SShopData";
import { S52002_1 } from "../../../../../../net/pt/pt_52";
import { CommonControl } from "../../../../../common/control/CommonControl";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { BaseItem } from "../../../../compent/BaseItem";
import { ItemData } from "../../../../compent/data/ItemData";
import { NumStep } from "../../../../compent/NumStep";
import { MsgManager } from "../../../../manager/MsgManager";

export class BuyGoodsPanel extends ui.main.GoodsBuyPanelUI {
    private vo: MallVo;
    private maxLimit:number = 999;
    private _item: BaseItem;
    private numStep: NumStep;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.isShowClose = false;
        this.isShowTitle = false;
        this.mResouce = [

        ];
    }

    public open(...args): void {
        this.initWindow(true, true, "购买物品", 488, 483, 161);
        super.open();
        this.vo = args[0];
        this.maxLimit = 999;
        this.numStep.currentNum = 1;
        this.updateDate();
    }

    private limitVo: S52002_1;
    private bindIcon: Laya.Image;
    public initComp() {
        super.initComp();
        this.initItem();
        this.initStep();
    }

    public updateDate(): void {
        this.limitVo = SShopData.instance.getGoodData(this.vo.goods_no);
        var itemData = new ItemData(this.vo.goods_no);
        itemData.serverInfo.Quality = this.vo.quality;
        this._item.itemData = itemData;
        this.txt_name.text = itemData.clientInfo.name;
        this._item.toolTipData = this._item.itemData;
        // this.txt_name.color = HtmlUtils.getColor(this._item.itemData.clientInfo.quality);
        HtmlUtils.setHtml(this.txt_desc.style, 6, 20, "left", "top");
        this.txt_desc.color = "#ffffff";
        this.txt_desc.innerHTML = this._item.itemData.EffectDesc ? HtmlUtils.showReplaceTips(this._item.itemData.EffectDesc) : HtmlUtils.showReplaceTips(this._item.itemData.clientInfo.intro);
        this.txt_desc.color = "#8e5213";

        if (this.limitVo) {
            var LeftCount:any = this.limitVo.LeftCount;
        } else {
            var LeftCount:any = this.vo.buy_count_limit_time;
        }
        if (this.vo.buy_count_limit_time > 0) {
            this.maxLimit = LeftCount;
        }
        this.numStep.max = this.maxLimit;

        var itemdata: ItemData = new ItemData(this.vo.price_type);
        this.moneyIcon.skin = ResUtils.getItemIcon(itemdata.clientInfo.icon);

    }

    private initItem(): void {
        if (!this._item) {
            this._item = new BaseItem();
            this._item.x = 100;
            this._item.y = 210;
            this._item.setItemStyle(80);
            this.addChild(this._item);
        }
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
        this.updateDate();
    }

    public initEvent(): void {
        this.btn_buy.on(Laya.Event.CLICK, this, this.onBuy);
        this.numStep.on(Laya.Event.CHANGE, this, this.onNumChange);
    }

    public removeEvent(): void {
        this.btn_buy.off(Laya.Event.CLICK, this, this.onBuy);
        this.numStep.off(Laya.Event.CHANGE, this, this.onNumChange);
    }


    public onNumChange(): void {
        var price: number = this.vo.discount_price ? (this.vo.discount_price) : (this.vo.price);
        var value = price * this.numStep.currentNum;
        var num: number = SBagData.instance.prop.getItemCountByGoodsNo(this.vo.price_type);
        if (num == 0) {
            var num: number = SRoleData.instance.getMoneyByType(this.vo.price_type)
        }
        //var max_num = Math.floor(num / this.vo.discount_price);
        var max_num = this.maxLimit;
        this.numStep.max = max_num == 0 ? 1 : max_num;
        if (num < value)
            this.txt_money.color = "#ff0000";
        else
            this.txt_money.color = "#fffc00";
        this.txt_money.text = `x${this.vo.discount_price * this.numStep.currentNum}`;
    }

    private onBuy(): void {
        var price: number = this.vo.discount_price ? (this.vo.discount_price) : (this.vo.price);
        var value = price * this.numStep.currentNum;
        var num: number = SBagData.instance.prop.getItemCountByGoodsNo(this.vo.price_type);
        if (num == 0) {
            var num: number = SRoleData.instance.getMoneyByType(this.vo.price_type)
        }
        if (num >= value) {
            CommonControl.instance.send52001(this.vo.no, this.numStep.currentNum);
            // this.close();//买完东西，不关闭界面
        }
        else {
            MsgManager.instance.showRollTipsMsg("您的货币不足！");
        }
    }

    public close(): void {
        this.numStep.clear();
        this.bindIcon && this.bindIcon.removeSelf();
        this.bindIcon = null;
        super.close();
    }
}