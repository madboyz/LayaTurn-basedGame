/**
 * 单条跑马灯
 * @export
 * @class MarqueeItem
 * @extends {Laya.Sprite}
 */
export class MarqueeItem extends Laya.Sprite {
    private broadcastText:string="broadcast message";  
    private m_DefaultText_X:number=0; 
    private _hideCall:Function;
    /**广播信息内容显示控件*/  
    private m_BroadCastText:Laya.Text;
    //滚动范围  
    private m_rect:Laya.Rectangle;
    private _data:any;  
    constructor() {
        super();
        this.initComp();
    }

    private initComp():void
    {
        /**广播信息显示控件初始化*/  
        this.m_BroadCastText =new Laya.Text();  
        this.m_BroadCastText.align = "left";
        this.m_BroadCastText.color = "#ff0000";
        this.m_BroadCastText.x=this.m_BroadCastText.y = this.m_DefaultText_X  
        this.m_BroadCastText.wordWrap=false;  
        this.m_BroadCastText.mouseEnabled = true;
        this.m_BroadCastText.text = this.broadcastText; 
        this.m_BroadCastText.height = 30;
        this.m_BroadCastText.y = 4;
        this.fontSize = 25;
        this.addChild(this.m_BroadCastText);
        this.mouseEnabled = true;
        this.width = Laya.stage.width;
          
        this.m_rect = new Laya.Rectangle(0,0,Laya.stage.width,30); 
        this.m_BroadCastText.scrollRect = this.m_rect; 

        // this.on(Laya.Event.MOUSE_OVER,this,this.rollOverHandler);  
        // this.on(Laya.Event.MOUSE_OUT,this,this.rollOutHandler); 
    }

    /**
     * 停留时间到 
     * 
     */
    private onTimeOut():void
    {
        this.m_rect && (this.m_rect.x = -Laya.stage.width);
        this.onOutEnd();
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
        return this.broadcastText;
    }

    /**
     * 滚动 
     * @param py
     * @param roll
     * 
     */
    public moveTo():void
    {
        var _rollTween:Laya.Tween = Laya.Tween.to(this.m_rect,{x:this.m_BroadCastText.textWidth},8000,null,Laya.Handler.create(this,()=>{
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
    public updateData(data:any,hideCall:Function):void
    {
        this.BroadCastText = data.Content;
        this._hideCall = hideCall;
        this._data = data;
        this.m_rect.x = -Laya.stage.width;
        this.m_BroadCastText.scrollRect = this.m_rect; 
    }

    /**设置广播信息内容*/  
    public set BroadCastText(value:string)
    {  
        this.m_BroadCastText.text=value;  
    }  
    
    /**取得广播信息内容*/  
    public get BroadCastText():string  
    {  
        return this.broadcastText;  
    }

    /**字体大小*/  
    public set fontSize(value:number)
    {  
        this.m_BroadCastText.fontSize = value;
        
    }
    public get data():any
    {
        return this._data;
    }

    /**
     * 销毁 
     * 
     */
    public dispose():void
    {
        this.m_BroadCastText.removeSelf();
        this.broadcastText = null;
        this._hideCall = null;
        this.m_rect = null;
        this.removeSelf();
    }
}