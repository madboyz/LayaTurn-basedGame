import { PetSkillItem } from "../view/pet/item/PetSkillItem";
import { ToolTipsScaleBg } from "./ToolTipsScaleBg";
import { PetInfo } from "./data/PetInfo";
import { SkillVo } from "../../../db/sheet/vo/SkillVo";
import { HtmlUtils } from "../../utils/HtmlUtils";
import { ChatUtil } from "../view/chat/ChatUtil";
import { Skill } from "../../skill/Skill";
import { SkillUtil } from "../../skill/SkillUtil";

export class ToolTipsPetSkill extends ToolTipsScaleBg {
    public _txtName: Laya.Text;
    public _icon: PetSkillItem;
    public _txtLevel: Laya.Text;
    public _line: Laya.Image;
    public _desc: Laya.HTMLDivElement;
    /**数据*/
    protected _data: SkillVo;
    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._icon = new PetSkillItem();
        this._icon.setItemStyle(80);
        this._icon.x = 27;
        this._icon.y = 32;
        this._icon.isShowToolTip = false;
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
        this._data = value as SkillVo;

        if (this._data == null) {
            return;
        }
        this._icon.info = this._data;
        // 更新背景
        this.setBg();
        this.updateTop();
        this.updateSize();
    }

    protected updateTop(): void {
        this._txtName.text = this._data.name;
        this._txtLevel.text = "类型:" + (this._data.type == 1 ? "主动" : "被动");
        // this._desc.innerHTML = ChatUtil.getReplaceTips(this._data.desc, []); 
        var SkillInfo = new Skill(this._data.no);
        this._desc.innerHTML = SkillUtil.NewDesc(SkillInfo, "#ffffff", 20, "#ffffff");
    }

    protected updateSize(): void {
        this.h += 15;
        super.updateSize();
    }

    public dispose(): void {
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