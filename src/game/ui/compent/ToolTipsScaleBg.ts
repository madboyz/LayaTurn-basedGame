import { BaseToolTip } from './BaseToolTip';
export class ToolTipsScaleBg extends BaseToolTip {
    public _scaleBg:Laya.Image;
    protected readonly w:number = 390;
    public h:number;
    constructor() {
        super();
        this.mouseEnabled = true;
        this.mouseThrough = false;
    }

    public get width():number
    {
        return this.w;
    }

    public get height():number
    {
        return this.h;
    }

    protected setBg(bgName:String="img_tipsBg2"):void
    {
        if(this._scaleBg != null)
        {
            this._scaleBg.removeSelf();
            this. _scaleBg = null;
        }
        this._scaleBg = new Laya.Image();
        this._scaleBg.sizeGrid = "30,30,30,30";
        this._scaleBg.skin = ResUtils.getCompUIUrl(bgName);
        this._scaleBg.mouseEnabled = true;
        this._scaleBg.mouseThrough = false;
        this.content.addChildAt(this._scaleBg,0);
    }
    
    protected updateSize():void
    {
        if(this._scaleBg != null)
        {
            this._scaleBg.size(this.w,this.h);
        }
        super.updateSize();
    }

    public dispose():void
    {
        this.h = -1;
        this._scaleBg&&this._scaleBg.removeSelf();
        this._scaleBg = null;
        this.removeSelf();
    }
}