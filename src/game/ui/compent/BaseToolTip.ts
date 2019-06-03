import { ToolTipsManager } from "../manager/ToolTipsManager";

export class BaseToolTip extends Laya.Sprite implements IToolTip{
    protected paddingTop:number = 5;
    protected paddingBottom:number = 5;
    protected paddingLeft:number = 5;
    protected paddingRight:number = 5;
    
    public _width:number;
    public _height:number;
    private bgMask:Laya.Sprite;
    protected _content:Laya.Sprite;
    constructor() {
        super();
        this._content = new Laya.Sprite();
        this.addMask();
    }

    public addMask():void
    {
        this.bgMask = new Laya.Sprite();
        this.bgMask.graphics.drawRect(0,0,Laya.stage.width,Laya.stage.height,"#000000");
        this.bgMask.alpha = 0.7;
        this.bgMask.width = Laya.stage.width;
        this.bgMask.height = Laya.stage.height;
        this.bgMask.on(Laya.Event.CLICK,this,this.onCloseHandler);
        this.addChildAt(this.bgMask,0);
        this.addChild(this._content);
    }

    public get content():Laya.Sprite
    {
        return this._content;
    }

    public set content(value:Laya.Sprite)
    {
        this._content = value;
    }

    private _renderClass:any;
		
    public set renderClass(value:any)
    {
        this._renderClass = value;
    }

    public get renderClass():any
    {
        if(this._renderClass)
        {
            return this._renderClass;
        }
        return null;
    }

    protected updateSize():void
    {
        this._width = this.width + this.paddingLeft + this.paddingRight;
        this._height = this.height + this.paddingTop + this.paddingBottom;
        this.content.x = (Laya.stage.width - this.width) >> 1;
        this.content.y = (Laya.stage.height - this.height) >> 1;
    }
		
    public set toolTipData(value:any)
    {
        
    }
    
    public get width():number
    {
        return this._width;
    }
    
    public get height():number
    {
        return this._height;
    }

    /**
     * 关闭tips
     */
    public onCloseHandler():void {
        ToolTipsManager.instance.hide();
    }

    public dispose():void
    {
        this.bgMask.off(Laya.Event.CLICK,this,this.onCloseHandler);
        this.bgMask && this.bgMask.removeSelf();
        this.bgMask = null;
        this._content && this._content.removeSelf();
        this._content = null;
        this.removeSelf();
    }
}