import { PetSkillItem } from "../view/pet/item/PetSkillItem";
import { ToolTipsScaleBg } from "./ToolTipsScaleBg";
import { PetInfo } from "./data/PetInfo";
import { SkillVo } from "../../../db/sheet/vo/SkillVo";
import { HtmlUtils } from "../../utils/HtmlUtils";
import { ChatUtil } from "../view/chat/ChatUtil";
import { FeishengSkill } from "../view/skill/item/FeishengSkill";
import { SoaringVo } from "../../../db/sheet/vo/SoaringVo";
import { ToolTipsManager } from "../manager/ToolTipsManager";
import { SSkillData } from "../../skill/SSkillData";

export class ToolTipsFeishengSkill extends ToolTipsScaleBg {
    public _txtName: Laya.Text;
    public _bgImg: Laya.Image;
    public _icon: Laya.Image;
    public _txtLevel: Laya.Text;
    public _line: Laya.Image;
    public _desc: Laya.HTMLDivElement;
    /**数据*/
    protected _data: SoaringVo;
    private canLearn: boolean;
    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._bgImg = new Laya.Image;
        this._bgImg.width = this._bgImg.height = 80;
        this._bgImg.x = 27
        this._bgImg.y = 32;
        this._bgImg.skin = "itemBase/skillBg_default.png";
        this.content.addChild(this._bgImg);

        this._icon = new Laya.Image;
        this._icon.width = this._icon.height = 70;
        this._icon.x = 32;
        this._icon.y = 37;
        this.content.addChild(this._icon);

        this._txtName = this.createTxt(120, 40, 148, 25, 24);
        this._txtName.color = "#ffdd00";

        this._txtLevel = this.createTxt(120, 78, 125, 23, 24);
        this._txtLevel.color = "#81ff00";

        this._line = new Laya.Image();
        this._line.skin = ResUtils.getCompUIUrl("img_di1");
        this._line.alpha = 0.15;
        this._line.x = 10;
        this._line.y = 120;
        this._line.width = 365;
        this._line.height = 4;
        this.content.addChild(this._line);
        this.h = this._line.y + this._line.height + 20;

        // this._desc = this.createTxt(10, this.h, 367, 134, 20,"left","top");
        this._desc = HtmlUtils.creatHtml(10, this.h, 367, 20);
        this.content.addChild(this._desc);

        this.h = this._desc.y + 134;//this._desc.contextHeight;
    }

    private createTxt(x: number, y: number, w: number, h: number, size: number, align: string = "left", valign: string = "middle", color: string = "#ffffff"): Laya.Text {
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

    public set toolTipData(value: any) {
        if (value == null) {
            return;
        }
        this._data = value[0];
        this.canLearn = value[1];

        this._icon.skin = ResUtils.getSkillIcon(this._data.icon);
        // 更新背景
        this.setBg();
        this.updateTop();
        this.addBtn();
        this.updateSize();
    }

    protected updateTop(): void {
        this._txtName.text = this._data.name;
        this._txtLevel.text = "类型:被动";
        this._desc.innerHTML = ChatUtil.getReplaceTips(this._data.desc, []);
    }


    //按钮使用相关的内容-----------------------------------------------------------------------------------
    private bagBtn1: component.ScaleButton;

    public addBtn(): void {
        if (this.canLearn) {
            this.bagBtn1 = this.changeBtnState("xuexi");
            this.bagBtn1.x = 190;
            this.bagBtn1.y = this.h;
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
        bagBtn.width = 150;
        bagBtn.height = 50;
        bagBtn.anchorX = 0.5;
        bagBtn.anchorY = 0.5;
        if (type == "xuexi") {
            bagBtn.label = "学习";
            bagBtn.on(Laya.Event.CLICK, this, this.learnBtnClick);
        }
        return bagBtn;
    }


    public learnBtnClick(): void {
        SSkillData.instance.protocol.send13123(this._data.no);
        ToolTipsManager.instance.hide();
    }


    protected updateSize(): void {
        this.h += 15;
        super.updateSize();
    }

    public dispose(): void {
        this.bagBtn1 && this.bagBtn1.offAll();
        this.bagBtn1 && this.bagBtn1.removeSelf();
        this.bagBtn1 = null;
        this._txtName && this._txtName.removeSelf();
        this._txtName = null;
        this._line && this._line.removeSelf();
        this._line = null;
        this._icon.dispose();
        this._icon = null;
        this._txtLevel && this._txtLevel.removeSelf();
        this._txtLevel = null;
        this.removeSelf();
    }
}