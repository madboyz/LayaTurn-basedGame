import { ToolTipsScaleBg } from "./ToolTipsScaleBg";
import { HtmlUtils } from "../../utils/HtmlUtils";

export class CommonDesTips extends ToolTipsScaleBg {
    public _desc:Laya.HTMLDivElement;
    constructor() {
        super();
        this.init();
    }

    private init():void {
        this._desc = new Laya.HTMLDivElement();
        HtmlUtils.setHtml(this._desc.style,6,20,"left","top");
        this._desc.x = this._desc.y = 15;
        this._desc.width = 360;
        this.content.addChild(this._desc);
    }

    public set toolTipData(value:any)
    {
        this.setBg();
        this._desc.innerHTML = HtmlUtils.showReplaceTips(value);
        this.h  = this._desc.y + this._desc.contextHeight + 30;
        this.updateSize();
    }

    public dispose():void
    {
        this._desc.removeSelf();
        this._desc = null;
        this.removeSelf();
        super.dispose();
    }
}