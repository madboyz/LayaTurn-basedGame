import { SBagData } from '../../../net/data/SBagData';
import { C15049, S15001 } from '../../../net/pt/pt_15';
import { SocketManager } from '../../../net/SocketManager';
import { DisplayUtils } from '../../utils/DisplayUtils';
import { HtmlUtils } from '../../utils/HtmlUtils';
import { ToolTipsManager } from '../manager/ToolTipsManager';
import { BaseItem } from './BaseItem';
import { ItemData } from './data/ItemData';
import { GetWay } from './GetWay';
import { ToolTipsScaleBg } from './ToolTipsScaleBg';
import { CommonControl } from '../../common/control/CommonControl';
import { DataManager } from '../../../message/manager/DataManager';
export class ToolTipsBaseItem extends ToolTipsScaleBg {
    public _txtName: Laya.Text;
    public _icon: BaseItem;
    public _txtLevel: Laya.Text;
    public _line: Laya.Image;
    public _line2: Laya.Image;
    public _baseTxt: Laya.Text;
    public _txtList: Array<Laya.Text> = [];
    public _desc: Laya.HTMLDivElement;
    public _getWay: GetWay;
    /**数据*/
    protected _data: ItemData;

    public _isShowtype: boolean = false;//只是用来展示的类型
    constructor() {
        super();
        this.init();
    }

    protected init(): void {
        this._icon = new BaseItem();
        this._icon.setItemStyle(80);
        this._icon.x = 27;
        this._icon.y = 32;
        this._icon.isShowToolTip = false;
        this.content.addChild(this._icon);

        this._txtName = this.createTxt(111, 35, 200, 25, 24);
        this._txtLevel = this.createTxt(111, 88, 200, 23, 18);

        this._line = new Laya.Image();
        this._line.skin = ResUtils.getCompUIUrl("img_di1");
        this._line.alpha = 0.15;
        this._line.x = 10;
        this._line.y = 120;
        this._line.width = 365;
        this._line.height = 4;
        this.content.addChild(this._line);

        this._line2 = new Laya.Image();
        this._line2.skin = ResUtils.getCompUIUrl("img_di1");
        this._line2.alpha = 0.15;
        this._line2.x = 10;
        this._line2.y = 120;
        this._line2.width = 365;
        this._line2.height = 4;
        this.content.addChild(this._line2);

        this.h = this._line.y + this._line.height + 20;

        this._desc = this.createHtmlTxt(37, this.h, 337, 134, 20, "left", "top");
    }

    protected createTxt(x: number, y: number, w: number, h: number, size: number, align: string = "left", valign: string = "middle", color: string = "#ffffff"): Laya.Text {
        var txt: Laya.Text = new Laya.Text();
        txt.width = w;
        txt.height = h;
        txt.x = x;
        txt.y = y;
        txt.valign = valign;
        txt.align = align;
        txt.color = color;
        txt.fontSize = size;
        txt.wordWrap = true;
        this.content.addChild(txt);
        return txt;
    }

    private createHtmlTxt(x: number, y: number, w: number, h: number, size: number, align: string = "left", valign: string = "middle"): Laya.HTMLDivElement {
        var txt: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        txt.mouseEnabled = false;
        HtmlUtils.setHtml(txt.style, 6, size, align, valign);
        txt.color = "#ffffff";
        txt.width = w;
        txt._height = h;
        txt.x = x;
        txt.y = y;
        this.content.addChild(txt);
        return txt;
    }

    public set toolTipData(value: any) {
        this._data = value as ItemData;

        if (this._data == null) {
            return;
        }
        this._icon.itemData = this._data;
        // 更新背景
        this.setBg();
        this.updateTop();
        this.updateBind();
        this.updateGetWay();
        this.addBtn();
        this.updateSize();
        this.getGoodsInfo();
    }

    protected updateTop(): void {
        this._txtName.text = this._data.clientInfo.name;
        this._txtName.color = HtmlUtils.getTipsColor(this._data.serverInfo ? (this._data.serverInfo.Quality ? this._data.serverInfo.Quality : this._data.clientInfo.quality) : this._data.clientInfo.quality);
        this._txtLevel.color = "#65c800";
        this._txtLevel.text = "拥有：" + SBagData.instance.prop.getItemCountByGoodsNo(this._data.GoodsNo);
        this._desc.innerHTML = this._data.EffectDesc ? HtmlUtils.showReplaceTips(this._data.EffectDesc) : HtmlUtils.showReplaceTips(this._data.clientInfo.intro);
        this.h = this._desc.y + this._desc.contextHeight + 20;

        this._line.y = this.h + this._line.height + 5;

        this.h = this._line.y + this._line.height + 5;
    }

    protected updateBind(): void {
        // if(this._data.serverInfo)
        // {
        //     if(this._data.serverInfo.BindState == 1 && this._data.serverInfo.Quality >= 1 && this._data.serverInfo.Quality <= 5)
        //     {
        //         var box:Laya.Box = new Laya.Box;
        //         box.x = 25;
        //         box.y = 30;
        //         this.content.addChild(box);

        //         var img:Laya.Image = new Laya.Image();
        //         img.skin = ResUtils.getItemBase("img_corner_" + this._data.serverInfo.Quality);
        //         box.addChild(img);
        //         img.x = img.y = 3;

        //         var txt:Laya.Text = new Laya.Text();
        //         box.addChild(txt);
        //         txt.rotation = -45;
        //         txt.x = 0;
        //         txt.y = 26;
        //         txt.text = "绑定";
        //         txt.fontSize = 16;
        //         txt.color = "#ffffff";
        //         txt.width = 40;
        //         txt.height = 16;
        //         txt.valign = "middle";
        //         txt.align = "center";
        //     }
        // }
    }

    protected updateGetWay(): void {
        if (this._data.clientInfo.from_source && this._data.clientInfo.from_source.length > 0) {
            this._getWay = new GetWay();
            this._getWay.initData(this._data.clientInfo.from_source);
            this._getWay.x = 27;
            this._getWay.y = this.h + 5;
            this.content.addChild(this._getWay);
            this.h = this._getWay.y + this._getWay.height + 40;
        }
    }

    public getGoodsInfo(): void {
        if (this._data.serverInfo.GoodsId && this._data.IsBaotu) {
            if (!ToolTipsManager.instance.goodsInfoDic[this._data.serverInfo.GoodsId]) {
                ToolTipsManager.instance.goodsInfoDic[this._data.serverInfo.GoodsId] = true;
                DataManager.listen(PROTOCOL.E15001, this, this.updateBaseProp);
                CommonControl.instance.send15001(this._data.serverInfo.GoodsId);
            }
        }
    }

    private updateBaseProp(data: S15001): void {
        if (data.GoodsId == this._data.serverInfo.GoodsId) {
            //邮件类型的装备，仅展示，不可穿戴
            this._isShowtype = data.Location == BagType.LOC_MAIL ? true : false;
            if (!this._data.AllAttr) {
                this._data.UpdateAttr(data.item_1);
            }
        }
    }

    //按钮使用相关的内容-----------------------------------------------------------------------------------
    private bagBtn1: component.ScaleButton;
    private bagBtn2: component.ScaleButton;

    public addBtn(): void {
        if (this._data.serverInfo && this._data.serverInfo.GoodsId) {
            var funcList = [];
            var canSell = this._data.clientInfo.can_sell == 1;
            canSell && (funcList.push("canSell"));
            var canUse = this._data.clientInfo.can_use == 1;
            canUse && (funcList.push("canUse"));
            // var canBatchUse = this._data.clientInfo.can_batch_use == 1;//批量使用
            var canHecheng = this._data.clientInfo.synthesis_state == 3;//可以合成
            canHecheng && (funcList.push("canHecheng"));
            this.bagBtn1 = new component.ScaleButton();
            this.bagBtn1.skin = ResUtils.getCompUIUrl("btn_common");
            this.bagBtn1.stateNum = 3;
            this.bagBtn1.labelSize = 25;
            this.bagBtn1.labelColors = "#8e5213,#04681c,#8d8071";
            this.bagBtn1.sizeGrid = "14,38,24,36";
            this.bagBtn1.labelPadding = "-3,0,0,0";
            this.content.addChild(this.bagBtn1);
            this.bagBtn1.width = 172;
            this.bagBtn1.height = 57
            this.bagBtn1.anchorX = 0.5;
            this.bagBtn1.anchorY = 0.5;
            this.bagBtn1.x = 193;
            this.bagBtn1.y = this.h + 30;

            if (funcList.length >= 2) {
                this.bagBtn2 = new component.ScaleButton();
                this.bagBtn2.skin = ResUtils.getCompUIUrl("btn_common");
                this.bagBtn2.stateNum = 3;
                this.bagBtn2.labelSize = 25;
                this.bagBtn2.labelColors = "#8e5213,#04681c,#8d8071";
                this.bagBtn2.sizeGrid = "14,38,24,36";
                this.bagBtn2.labelPadding = "-3,0,0,0";
                this.content.addChild(this.bagBtn2);
                this.bagBtn2.width = 140;
                this.bagBtn2.height = 57
                this.bagBtn2.anchorX = 0.5;
                this.bagBtn2.anchorY = 0.5;
                this.bagBtn2.x = 280;
                this.bagBtn2.y = this.h + 30;

                this.bagBtn1.width = 140;
                this.bagBtn1.x = 110;
                this.changeBtnState(this.bagBtn1,funcList[0]);
                this.changeBtnState(this.bagBtn2,funcList[1]);
            } else if (funcList.length == 1) {
                this.changeBtnState(this.bagBtn1,funcList[0]);
            } else {
                this.changeBtnState(this.bagBtn1);
            }
            this.h = this.bagBtn1.y + this.bagBtn1.height;
        }
    }

    private changeBtnState(btn: component.ScaleButton, type: string = null) {
        if (type == "canSell") {
            btn.label = "出售";
            btn.on(Laya.Event.CLICK, this, this.sellItem);
        } else if (type == "canUse") {
            btn.label = "使用";
            btn.on(Laya.Event.CLICK, this, this.useItem);
        } else if (type == "canHecheng") {
            btn.label = "合成";
            btn.on(Laya.Event.CLICK, this, this.hecheng);
        } else {
            btn.label = "确定";
            btn.on(Laya.Event.CLICK, this, this.hideThis);
        }
    }


    public batchUseItem(): void {
        UIManager.instance.openUI(UIID.SYS_GOODS_SELL, [this._data, 2]);
        this.hideThis()
    }

    public useItem(): void {
        SBagData.instance.useItemCheck(this._data, 1);
        this.hideThis();
    }

    public sellItem(): void {
        UIManager.instance.openUI(UIID.SYS_GOODS_SELL, [this._data, 1]);
        this.hideThis();
    }

    public hecheng(): void {
        UIManager.instance.openUI(UIID.GOODS_HECHENG_PANEL, [this._data]);
        this.hideThis();
    }

    //按钮使用相关内容结束---------------------------------------------------------------------
    private hideThis(): void {
        // CommonControl.instance.onGoodsUse(this._data.GoodsId,1);
        ToolTipsManager.instance.hide();
    }

    public dispose(): void {
        this.bagBtn1 && this.bagBtn1.offAll();
        this.bagBtn1 && this.bagBtn1.removeSelf();
        this.bagBtn1 = null;
        this.bagBtn2 && this.bagBtn2.offAll();
        this.bagBtn2 && this.bagBtn2.removeSelf();
        this.bagBtn2 = null;
        this._getWay && this._getWay.removeSelf();
        this._getWay = null;
        this._txtName && this._txtName.removeSelf();
        this._txtName = null;
        this._icon && this._icon.removeSelf();
        this._icon = null;
        this._txtLevel && this._txtLevel.removeSelf();
        this._txtLevel = null;
        this._line && this._line.removeSelf();
        this._line = null;
        this._line2 && this._line2.removeSelf();
        this._line2 = null;
        this._baseTxt && this._baseTxt.removeSelf();
        this._baseTxt = null;
        this._desc && this._desc.removeSelf();
        this._desc = null;
        this._data = null;
        DisplayUtils.clearArrayItems(this._txtList);
        DataManager.cancel(PROTOCOL.E15001, this, this.updateBaseProp);
        this.removeSelf();
    }
}