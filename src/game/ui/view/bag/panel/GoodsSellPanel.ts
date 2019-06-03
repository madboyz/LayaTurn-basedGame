import { MallVo } from "../../../../../db/sheet/vo/MallVo";
import { BaseItem } from "../../../compent/BaseItem";
import { S52002_1 } from "../../../../../net/pt/pt_52";
import { SShopData } from "../../../../../net/data/SShopData";
import { ItemData } from "../../../compent/data/ItemData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SBagData } from "../../../../../net/data/SBagData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { CommonControl } from "../../../../common/control/CommonControl";
import { MsgManager } from "../../../manager/MsgManager";
import { SocketManager } from "../../../../../net/SocketManager";
import { C15002, C15049 } from "../../../../../net/pt/pt_15";

export class GoodsSellPanel extends ui.main.GoodsSellPanelUI {
    private _itemdata: ItemData;
    private _type: number;//1是出售，2是批量使用

    private _currentNum: number = 1;
    private _item: BaseItem;
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
        this._itemdata = args[0];
        this._type = args[1];
        this._currentNum = this._itemdata.serverInfo.Count;
        super.open();
    }
    public initComp() {
        super.initComp();
        this.initItem();
        this.updateDate();
    }

    public updateDate(): void {
        this.hasNum.text = "拥有:" + this._itemdata.serverInfo.Count;

        this._item.itemData = this._itemdata;
        this.txt_name.text = this._itemdata.clientInfo.name;
        // this._item.toolTipData = this._item.itemData;
        this.txt_name.color = HtmlUtils.getColor(this._item.itemData.clientInfo.quality);
        HtmlUtils.setHtml(this.txt_desc.style, 6, 20, "left", "top");
        this.txt_desc.color = "#ffffff";
        this.txt_desc.innerHTML = this._item.itemData.EffectDesc ? HtmlUtils.showReplaceTips(this._item.itemData.EffectDesc) : HtmlUtils.showReplaceTips(this._item.itemData.clientInfo.intro);
        this.txt_desc.color = "#8e5213";


        this.moneyTitle.visible = this.moneyIcon.visible = this.txt_money.visible = this._type == 1;
        if (this._type == 1) {
            var sellType = this._itemdata.clientInfo.sell_price_type;
            var sellGetItem: ItemData = new ItemData(sellType);
            this.moneyIcon.skin = ResUtils.getItemIcon(sellGetItem.clientInfo.icon);
            this.btn_ok.label = "出售";
        }else if (this._type == 2){
            this.btn_ok.label = "批量使用";
        }
        this.updateTxt();
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

    public update(): void {
        this.updateDate();
    }

    public initEvent(): void {
        this.btn_ok.on(Laya.Event.CLICK, this, this.onBuy);
        this.btn_shut.on(Laya.Event.CLICK, this, this.onShut);
        this.btn_shut.on(Laya.Event.MOUSE_DOWN, this, this.onContinueShut);
        this.btn_shut.on(Laya.Event.MOUSE_UP, this, this.onclearShut);
        this.btn_add.on(Laya.Event.CLICK, this, this.onAdd);
        this.btn_add.on(Laya.Event.MOUSE_DOWN, this, this.onContinueAdd);
        this.btn_add.on(Laya.Event.MOUSE_UP, this, this.onclearAdd);
    }

    public removeEvent(): void {
        this.btn_ok.off(Laya.Event.CLICK, this, this.onBuy);
        this.btn_add.off(Laya.Event.CLICK, this, this.onAdd);
        this.btn_shut.off(Laya.Event.CLICK, this, this.onShut);
        this.btn_shut.off(Laya.Event.MOUSE_DOWN, this, this.onContinueShut);
        this.btn_shut.off(Laya.Event.MOUSE_UP, this, this.onclearShut);
        this.btn_add.off(Laya.Event.MOUSE_DOWN, this, this.onContinueAdd);
        this.btn_add.off(Laya.Event.MOUSE_UP, this, this.onclearAdd);
    }

    private onAdd(): void {
        if (this._currentNum + 1 <= this._itemdata.serverInfo.Count) {
            this.currentNum += 1;
        }
    }

    private onContinueAdd(): void {
        Laya.timer.loop(100, this, this.onAdd);
    }

    private onclearAdd(): void {
        Laya.timer.clear(this, this.onAdd);
    }

    private onContinueShut(): void {
        Laya.timer.loop(100, this, this.onShut);
    }

    private onclearShut(): void {
        Laya.timer.clear(this, this.onShut);
    }

    private onShut(): void {
        if (this._currentNum - 1 >= 1) {
            this.currentNum -= 1;
        }
    }

    public set currentNum(value: number) {
        this._currentNum = value;
        this.updateTxt();
    }

    public get currentNum(): number {
        return this._currentNum;
    }

    private updateTxt(): void {
        if (this._type == 1) {
            var sellNum = this._itemdata.clientInfo.sell_price;
            this.txt_money.text = "x" + this.currentNum * sellNum;
        }


        this.txt_num.text = this._currentNum.toString();
    }

    private onBuy(): void {
        if (this._type == 1) {
            var msg: C15002 = new C15002();
            msg.GoodsId = this._itemdata.serverInfo.GoodsId;
            msg.SellCount = this.currentNum;
            SocketManager.instance.send(msg);
        }else if (this._type == 2){
            SBagData.instance.useItemCheck(this._itemdata , this.currentNum);
        }
        this.close();
    }

    public close(): void {
        super.close();
    }
}