import { BaseToolTip } from "../compent/BaseToolTip";
import { GameLayer } from "../../../GameLayer";

export class ToolTipsManager extends Laya.Sprite {
    private static _instance: ToolTipsManager;
    private area:IToolTip;
    public toolTipContent:BaseToolTip;
    public goodsInfoDic:object = {};//保存请求过物品详情的列表
    constructor() {
        super();
    }

    public static get instance(): ToolTipsManager {
        return ToolTipsManager._instance || (ToolTipsManager._instance = new ToolTipsManager());
    }

    public init():void
    {
        if(GameLayer.instacne.uiLayer.getChildIndex(this) == -1)
        {
            GameLayer.instacne.uiLayer.addChild(this);
        }
        else
        {
            GameLayer.instacne.uiLayer.setChildIndex(this,GameLayer.instacne.uiLayer.numChildren - 1);
        }
    }

    /**
     * 注册tooltip
     * @param	area 需要显示tooltip的对象
     */
    public register(area:IToolTip):void
    {
        var vTargetArea:IToolTip = area;
        if(vTargetArea.hasListener(Laya.Event.CLICK) == false)
        {
            vTargetArea.on(Laya.Event.CLICK,this,this.targetMouseHandler);
        }
    }

    /**
     * 取消tooltip
     * @param	area 需要取消tooltip的对象
     */
    public unregister(area:IToolTip):void
    {
        if (area)
        {
            area.off(Laya.Event.CLICK,this,this.targetMouseHandler);
        }
    }

    public show(area:any):void 
    {
        this.init();
        this.clearConetnt();
        if(!area)
        return;
        var tpd:any = area.toolTipData;
        if(tpd != null)
        {
            var renderClass:any=area.renderClass
            if(!renderClass)
            return;
            //this.toolTipContent = Pool.getItemByClass("toolTipContent",renderClass);
            this.toolTipContent = new renderClass;
            this.toolTipContent.visible = true;
            this.toolTipContent.toolTipData = tpd;
            this.addChild(this.toolTipContent);
            this.moveToCenter();
        }
    }

    public directShow(renderClass :any , data:any):void{
        this.init();
        this.clearConetnt();
        this.toolTipContent = new renderClass;
        this.toolTipContent.visible = true;
        this.toolTipContent.toolTipData = data;
        this.addChild(this.toolTipContent);
        this.moveToCenter();
    }


    public moveToCenter():void 
    {	
        if(this.toolTipContent)
        {
            if(!this.visible)
            {
                this.visible = true;
            }
        }
    }

    public targetMouseHandler(event:any):void
    {
        var vTarget:IToolTip = event.currentTarget as IToolTip;
        if( this.area != vTarget )
        {
            this.hide();
        }
        this.area = event.currentTarget as IToolTip;
        this.show(this.area);
    }

    public clearConetnt():void			
    {
        if(this.toolTipContent)
        {
            var vToolTipObject:IToolTip = this.toolTipContent;

            vToolTipObject.dispose();

            this.toolTipContent = null;
        }
    }

    public hide():void	
    {
        this.clearConetnt();
        this.visible = false;
    }

}