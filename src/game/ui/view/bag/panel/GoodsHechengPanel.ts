import { SBagData } from "../../../../../net/data/SBagData";
import { C15002, C15091, C15090 } from "../../../../../net/pt/pt_15";
import { SocketManager } from "../../../../../net/SocketManager";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { NumStep } from "../../../compent/NumStep";
import { Synthesis2Vo } from "../../../../../db/sheet/vo/Synthesis2Vo";
import { MsgManager } from "../../../manager/MsgManager";

export class GoodsHechengPanel extends ui.main.GoodsHechengPanelUI {
    private _itemdata: ItemData;
    private _targetItemVo: Synthesis2Vo;
    private _targetItemData: ItemData;
    private _costItemData: ItemData;

    private _item: BaseItem;
    private _numStep: NumStep;
    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isShowMask = true;
        this.isShowClose = false;
        this.isShowTitle = false;
        this.mResouce = [

        ];
    }

    public open(...args): void {
        this.initWindow(true, true, "购买物品", 488, 483, 161);
        super.open();
        this._itemdata = args[0];

        this._targetItemVo = Synthesis2Vo.getTargetByGoodsNo(this._itemdata.GoodsNo);
        this._targetItemData = new ItemData(this._targetItemVo.no);
        this._item.itemData = this._targetItemData;
        this._item.toolTipData = this._targetItemData;
        //消耗的道具
        this._costItemData = new ItemData(this._targetItemVo.formulas[0][0][1]);
        this.moneyIcon.skin = ResUtils.getItemIcon(this._costItemData.clientInfo.icon);
        //计算最多可以合成多少个
        var haveNum = SBagData.instance.prop.getItemCountByGoodsNo(this._costItemData.GoodsNo);
        var maxNum = Math.floor(haveNum / this._targetItemVo.formulas[0][0][2]);
        this._numStep.max = maxNum;
        this._numStep.currentNum = 1;

        this.updateDate();
    }
    public initComp() {
        super.initComp();
        this.initItem();
    }

    private initItem(): void {
        if (!this._item) {
            this._item = new BaseItem();
            this._item.x = 245;
            this._item.y = 210;
            this._item.setItemStyle(80);
            this.addChild(this._item);
        }
        if (!this._numStep) {
            this._numStep = new NumStep();
            this._numStep.x = 82;
            this._numStep.y = 375;
            this._numStep.min = 1;
            this._numStep.max = 999;
            this._numStep.step = 1;
            this._numStep.stepAdd = 10;
            this._numStep.mode = 1;
            this._numStep.currentNum = 1;
            this.addChild(this._numStep);
        }

    }

    public update(): void {
        this.updateDate();
    }


    public updateDate(): void {
        this.onNumChange();
        // this.txt_name.color = HtmlUtils.getColor(this._item.itemData.clientInfo.quality);
        // HtmlUtils.setHtml(this.txt_desc.style, 6, 20, "left", "top");
        // this.txt_desc.color = "#ffffff";
        // this.txt_desc.innerHTML = this._item.itemData.EffectDesc ? HtmlUtils.showReplaceTips(this._item.itemData.EffectDesc) : HtmlUtils.showReplaceTips(this._item.itemData.clientInfo.intro);
        // this.txt_desc.color = "#8e5213";


        // this.moneyTitle.visible = this.moneyIcon.visible = this.txt_money.visible = this._type == 1;
        // if (this._type == 1) {
        //     var sellType = this._itemdata.clientInfo.sell_price_type;
        //     var sellGetItem: ItemData = new ItemData(sellType);
        //     this.moneyIcon.skin = ResUtils.getItemIcon(sellGetItem.clientInfo.icon);
        //     this.btn_ok.label = "出售";
        // }else if (this._type == 2){
        //     this.btn_ok.label = "批量使用";
        // }
        // this.updateTxt();
    }

    private onNumChange(): void {
        this._item.setAmountLabel("" + this._numStep.currentNum, "#4e17cd", 18);
        var haveNum = SBagData.instance.prop.getItemCountByGoodsNo(this._costItemData.GoodsNo);
        var enough = haveNum >= this._targetItemVo.formulas[0][0][2] * this._numStep.currentNum;
        this.txt_money.text = haveNum + "/" + this._targetItemVo.formulas[0][0][2] * this._numStep.currentNum;
        this.txt_money.color = enough ? "#00b007" : "#ff0000";
    }

    public initEvent(): void {
        this.btn_ok.on(Laya.Event.CLICK, this, this.onHecheng);
        this._numStep.on(Laya.Event.CHANGE, this, this.onNumChange);
    }

    public removeEvent(): void {
        this.btn_ok.off(Laya.Event.CLICK, this, this.onHecheng);
        this._numStep.off(Laya.Event.CHANGE, this, this.onNumChange);
    }

    private onHecheng(): void {
        var haveNum = SBagData.instance.prop.getItemCountByGoodsNo(this._costItemData.GoodsNo);
        var enough = haveNum >= this._targetItemVo.formulas[0][0][2] * this._numStep.currentNum;
        if(!enough){
            MsgManager.instance.showRollTipsMsg("道具不足，无法合成");
            return;
        }
        var msg: C15090 = new C15090();
        msg.GoodsNo = this._targetItemVo.no;
        msg.Count = this._numStep.currentNum;
        msg.Type = 1;
        SocketManager.instance.send(msg);
        this.close();
    }

    public close(): void {
        super.close();
    }
}