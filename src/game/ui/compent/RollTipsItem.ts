import { HtmlUtils } from "../../utils/HtmlUtils";

export class RollTipsItem extends Laya.Sprite {
    private _msg:string;
    private _hideCall:Function;
    
    public _textField:Laya.HTMLDivElement;
    public _skin:Laya.Image
    constructor() {
        super();
        this.init();
    }

    private init():void
    {
        this._skin = new Laya.Image();
        this._skin.sizeGrid="0,0,0,0";
        this._skin.height = 34;
        this._skin.y = -7;
        this. _skin.skin = ResUtils.getCompUIUrl("img_di39");
        this.addChild(this._skin);
        
        this._textField = new Laya.HTMLDivElement();
        HtmlUtils.setHtml(this._textField.style,6,20,"center","middle");
        this._textField.width = 300;
        this._textField._height = 24;
        this._textField.color = "#fffc00";
        this._textField.x = 0;
        this._textField.style.wordWrap = false;
        this.addChild(this._textField);
    }

    /**
     * 停留时间到 
     * 
     */
    private onTimeOut():void
    {
        var _outTween:Laya.Tween = Laya.Tween.to(this,{alpha:0},1000,null,Laya.Handler.create(this,()=>{
            this.onOutEnd();
            _outTween.clear();
            _outTween = null;
        }));
    }

    /**
     * 退场完毕 
     * 
     */
    private onOutEnd():void
    {
        if(this._hideCall != null)
        {
            this._hideCall.call(this, this);
        }
    }

    public get msg():string
    {
        return this._msg;
    }

    /**
     * 滚动 
     * @param py
     * @param roll
     * 
     */
    public moveTo(py:number):void
    {
        var time:number = 1000;
        // if(py > this.y)
        // {
        //     time = 1000;
        // }
        var _rollTween:Laya.Tween = Laya.Tween.to(this,{y:py},time,null,Laya.Handler.create(this,()=>{
            _rollTween.clear();
            _rollTween = null;
            this.onTimeOut();
        }));
    }

    /**
     * 显示 
     * @param str
     * @param type
     * 
     */
    public updateData(str:string, hideCall:Function ,color = "#fffc00"):void
    {
        this._msg = str;
        this._hideCall = hideCall;
        
        try {this._textField.innerHTML = str;
        }
        catch (e) { }
        this._textField.alpha = 1;
        
        this._textField.color = color;
        this._skin.width = this._textField.contextWidth + 150;
        this._textField.width = this._skin.width;
        this._textField.x = (this._skin.width - this._textField.width)>>1;

        this.x = (Laya.stage.width - this._skin.width)>>1;
    }

    /**
     * 销毁 
     * 
     */
    public dispose():void
    {
        this._textField.removeSelf();
        this._skin.removeSelf();
        this._hideCall = null;
        this. _msg = null;
        this.removeSelf();
    }
}