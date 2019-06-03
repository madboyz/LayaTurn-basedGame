import { GameLayer } from './../../../GameLayer';
import { MarqueeItem } from './MarqueeItem';
import { TimerUtil } from '../../utils/TimerUtil';
export class MarqueeRollTips extends Laya.Sprite {
    private _showArr:Array<any>;
    private _canvas:Laya.Sprite;
     /**广播信息背景*/ 
    private m_bg:Laya.Image;
    private isShow:boolean = false;//是否有跑马灯正在显示
    constructor() {
        super();
        this.init();
    }

    private init():void
    {
        this._showArr = [];
        this.m_bg = new Laya.Image();
        this.addChild(this.m_bg);
        this.m_bg.skin = ResUtils.getCompUIUrl("textinput");
        this.m_bg.sizeGrid="5,5,5,5";
        this.m_bg.width = Laya.stage.width;
        this.m_bg.height = 35;
    }

     /**
     * 子项消失回调 
     * @param item
     * 
     */
    private itemHideCallBack(item:MarqueeItem):void
    {
        if(!this._showArr)
        {
            this._showArr = [];
        }
        this._showArr.push(item.data);
        Laya.timer.once(item.data.Interval*1000,this,()=>{
            this.isShow = false;
            this.startShow();
        });
        this.removeMsgImpl(item);
        this.m_bg.visible = false;
    }

    /**
     * 移除一条 
     * @param item
     * 
     */
    private removeMsgImpl(item:MarqueeItem):void
    {
        item.removeSelf();
        item.dispose();
        item = null;
    }
    
    /**
     * 显示一条 
     * @param item
     * 
     */
    private showMsgImpl(item:MarqueeItem):void
    {
        if(!this.parent)
        {
            if(!this._canvas)
            {
                this._canvas = GameLayer.instacne.uiLayer;
            }
            this._canvas.addChild(this);
            this.stageResize();
        }
        this.updateLayOut(item, true);
    }
    
    /**
     * 更新布局 
     * @param item 引起布局更新的子项
     * @param show 是否显示引起布局更新
     */
    private updateLayOut(item:MarqueeItem, show:Boolean):void
    {
        this.isShow = true;
        this.m_bg.visible = true;
        item.moveTo();
        this.addChild(item);
    }

    /**
     * 增加一条运营广播
     * @param {*} data 
     * @memberof MarqueeRollTips
     */
    public addMsg(data:any):void
    {
        if(!this._showArr)
        {
            this._showArr = [];
        }
        if(this.hasMarquee(data.Id) == false)
        {
            this._showArr.push(data);
            if(this._showArr.length > 1)
            {
                this._showArr.sort(this.sortMsg);
            }
        }
        this.startShow();
    }
    private startShow():void
    {
        if(this.isShow == false)
        {
            var data:any = this._showArr.shift();
            if(this.checkNeedShow(data))
            {
                 var showMsg:MarqueeItem = new MarqueeItem();
                 showMsg.updateData(data, this.itemHideCallBack.bind(this));
                 this.showMsgImpl(showMsg);
            }
        }
    }

    private hasMarquee(id:number):boolean
    {
        for (let index = 0; index < this._showArr.length; index++) {
            const element = this._showArr[index];
            if(element.Id == id)
            {
                return true;
            }
        }
        return false;
    }
    private sortMsg(a:any,b:any):number
    {
        if(a.Priority < b.Priority)
        {
            return -1;
        }
        return 1;
    }

    /**
     * 是否需要显示广播
     * @private
     * @param {*} data 
     * @returns {boolean} 
     * @memberof MarqueeRollTips
     */
    private checkNeedShow(data:any):boolean
    {
        if(TimerUtil.insideTime(data.EndTime))
        {
            return true;
        }
        return false;
    }
    
    public stageResize():void
    {
        if(this.parent)
        {
            this.y = 200;
        }
    }
    
    public get canvas():Laya.Sprite
    {
        return this._canvas;
    }
    
    public set canvas(value:Laya.Sprite)
    {
        this._canvas = value;
    }
}