import { HtmlUtils } from '../../utils/HtmlUtils';
import { ToolTipsManager } from '../manager/ToolTipsManager';
import { MinggeInfo } from '../view/comate/data/MinggeInfo';
import { MinggeItem } from '../view/comate/data/MinggeItem';
import { ToolTipsScaleBg } from './ToolTipsScaleBg';
import { SComateData } from '../view/comate/data/SComateData';
import { PropertyVo } from '../../../db/sheet/vo/PropertyVo';
import { PropertyUtil } from '../../property/PropertyUtil';
export class ToolTipsMinggeItem extends ToolTipsScaleBg {
    public _icon: MinggeItem;
    public _txtName: Laya.Text;
    public _txtLevel: Laya.Text;
    public _txtExp: Laya.Text;
    public _imgCombat: Laya.Image;
    public _combat: component.NumberImage;
    public _line: Laya.Image;
    public _desc: Laya.Text;
    /**数据*/
    protected _data: MinggeInfo;
    constructor() {
        super();
        this.init();
    }

    protected init(): void {
        this._icon = new MinggeItem();
        this._icon.hasLvLb = false;
        this._icon.x = 10;
        this._icon.y = 20;
        this._icon.isShowToolTip = false;
        this.content.addChild(this._icon);

        this._txtName = this.createTxt(100, 30, 200, 25, 24, "left", "middle", "#ffdd00");
        this._txtLevel = this.createTxt(100, 62, 200, 23, 18, "left", "middle", "#0fa30a");
        this._txtExp = this.createTxt(100, 85, 200, 23, 18, "left", "middle", "#0fa30a");

        this._imgCombat = new Laya.Image();
        this._imgCombat.skin = ResUtils.getCompUIUrl("img_combat");
        this._imgCombat.scaleX = this._imgCombat.scaleY = 0.65;
        this.content.addChild(this._imgCombat);
        this._imgCombat.x = 236;
        this._imgCombat.y = 30;

        this._combat = new component.NumberImage();
        this._combat.url = "res/atlas/number/fight.atlas";
        this._combat.x = 270;
        this._combat.y = 30;
        this._combat.scale(0.65, 0.65);
        this.content.addChild(this._combat);

        this._line = new Laya.Image();
        this._line.skin = ResUtils.getCompUIUrl("img_di1");
        this._line.alpha = 0.15;
        this._line.x = 10;
        this._line.y = 120;
        this._line.width = 365;
        this._line.height = 6;
        this.content.addChild(this._line);

        this._desc = this.createTxt(35, 145, 200, 23, 22, "left", "middle", "#add4d7");

        this.h = 230;
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
        this._data = value as MinggeInfo;

        if (this._data == null) {
            return;
        }
        this._icon.dataSource = this._data;
        // 更新背景
        this.setBg();
        this.updateTop();
        this.addBtn();
        this.updateSize();
    }

    protected updateTop(): void {
        this._txtName.text = this._data.cfg.name;
        this._txtLevel.text = "等级:" + this._data.Lv + "/" + this._data.cfg.max_lv;
        var isMax = this._data.cfg.lv_exp[this._data.Lv] == null;
        if(isMax){
            this._txtExp.text = "升级经验:" + this._data.serverInfo.TotalExp + "(已满级)";
        }else{
            this._txtExp.text = "升级经验:" + this._data.serverInfo.TotalExp + "/" + this._data.cfg.lv_exp[this._data.Lv];
        }

        this._combat.text = this._data.battlePower.toString();
        var useAttr = this._data.cfg.attrs_adds[this._data.Lv - 1];
        var vo = PropertyVo.getByInfo(useAttr[0]);
        this._desc.text = vo.name + " + " + PropertyUtil.GetPropertyDec(vo.no , useAttr[1]);
    }


    //按钮使用相关的内容-----------------------------------------------------------------------------------
    private bagBtn1: component.ScaleButton;
    private bagBtn2: component.ScaleButton;
    private bagBtn3: component.ScaleButton;

    public addBtn(): void {
        if (this._data.HoleNo != 0) {
            this.bagBtn1 = this.changeBtnState("tunshi");
            this.bagBtn1.x = 75;
            this.bagBtn1.y = this.h;
            this.bagBtn2 = this.changeBtnState("tihuan");
            this.bagBtn2.x = 195;
            this.bagBtn2.y = this.h;
            this.bagBtn3 = this.changeBtnState("xiexia");
            this.bagBtn3.x = 315;
            this.bagBtn3.y = this.h;
            this.h = this.bagBtn1.y + this.bagBtn1.height;
        }
    }

    private changeBtnState(type: string = null): component.ScaleButton {
        var bagBtn = new component.ScaleButton();
        bagBtn.skin = ResUtils.getCompUIUrl("btn_common");
        bagBtn.stateNum = 3;
        bagBtn.labelSize = 25;
        bagBtn.labelColors = "#8e5213,#04681c,#8d8071";
        bagBtn.sizeGrid = "14,38,24,36";
        bagBtn.labelPadding = "-3,0,0,0";
        this.content.addChild(bagBtn);
        bagBtn.width = 110;
        bagBtn.height = 50;
        bagBtn.anchorX = 0.5;
        bagBtn.anchorY = 0.5;
        if (type == "tunshi") {
            bagBtn.label = "吞噬";
            bagBtn.on(Laya.Event.CLICK, this, this.tunshiClick);
        } else if (type == "tihuan") {
            bagBtn.label = "替换";
            bagBtn.on(Laya.Event.CLICK, this, this.tihuanClick);
        } else if (type == "xiexia") {
            bagBtn.label = "卸下";
            bagBtn.on(Laya.Event.CLICK, this, this.xiexiaClick);
        }
        return bagBtn;
    }


    public tunshiClick(): void {
        UIManager.instance.openUI(UIID.MINGGE_EAT_PANEL, [this._data]);
        this.hideThis()
    }

    public tihuanClick(): void {
        UIManager.instance.openUI(UIID.MINGGE_CHANGE_PANEL, [this._data]);
        this.hideThis();
    }

    public xiexiaClick(): void {
        SComateData.instance.unEquipMingge(this._data);
        this.hideThis();
    }

    //按钮使用相关内容结束---------------------------------------------------------------------
    private hideThis(): void {
        ToolTipsManager.instance.hide();
    }

    public dispose(): void {
        this.bagBtn1 && this.bagBtn1.offAll();
        this.bagBtn1 && this.bagBtn1.removeSelf();
        this.bagBtn1 = null;
        this.bagBtn2 && this.bagBtn2.offAll();
        this.bagBtn2 && this.bagBtn2.removeSelf();
        this.bagBtn2 = null;
        this.bagBtn3 && this.bagBtn3.offAll();
        this.bagBtn3 && this.bagBtn3.removeSelf();
        this.bagBtn3 = null;
        this._icon && this._icon.removeSelf();
        this._icon = null;
        this._txtName && this._txtName.removeSelf();
        this._txtName = null;
        this._txtLevel && this._txtLevel.removeSelf();
        this._txtLevel = null;
        this._txtExp && this._txtExp.removeSelf();
        this._txtExp = null;
        this._desc && this._desc.removeSelf();
        this._desc = null;
        this._imgCombat && this._imgCombat.removeSelf();
        this._imgCombat = null;
        this._combat.dispose();
        this._combat = null;

        this._line && this._line.removeSelf();
        this._line = null;

        this.removeSelf();
    }
}