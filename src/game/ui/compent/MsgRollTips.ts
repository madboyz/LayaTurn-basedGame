import { GameLayer } from './../../../GameLayer';
import { RollTipsItem } from './RollTipsItem';
import { MsgRollTipsType } from './MsgRollTipsType';
export class MsgRollTips extends Laya.Sprite {
    private _showArr:Array<any>;
    private _showDict:Object;//正在显示的信息池
    private _showMax:number;//最大显示数量
    private _canvas:Laya.Sprite;
    constructor() {
        super();
        this.init();
    }

    private init():void
    {
        this._showArr = [];
        this._showDict = new Object();
        this._showMax = 6;
    }

    /**
     * 子项消失回调 
     * @param item
     * 
     */
    private itemHideCallBack(item:RollTipsItem):void
    {
        if(!this._showArr)
        {
            this._showArr = [];
        }
        if(this._showArr.length == 1)
        {
            this.removeMsgImpl(item);
        }
        else
        {
            this.updateLayOut(item, false);
        }
    }
    
    /**
     * 移除一条 
     * @param item
     * 
     */
    private removeMsgImpl(item:RollTipsItem):void
    {
        if(this._showDict[item.msg])
        {
            delete this._showDict[item.msg];
        }
        item.dispose();
        var index:number = this._showArr.indexOf(item);
        if(index != -1)
        {
            this._showArr.splice(index, 1);
        }
        item = null;
    }
    
    /**
     * 显示一条 
     * @param item
     * 
     */
    private showMsgImpl(item:RollTipsItem):void
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
        else
        {
            this._canvas.setChildIndex(this,this._canvas.numChildren - 1);
        }
        this.updateLayOut(item, true);
    }
    
    /**
     * 更新布局 
     * @param item 引起布局更新的子项
     * @param show 是否显示引起布局更新
     */
    private updateLayOut(item:RollTipsItem, show:Boolean):void
    {
        var flag:number = 0;
        var index:number = 0;
        var updateItem:RollTipsItem;
        if(show)
        {
            if(this._showArr.length >= this._showMax)
            {
                var delItem:RollTipsItem = this._showArr.pop();
                this.removeMsgImpl(delItem);
            }
            this._showArr.unshift(item);
            item.y = this.getPosMaxY();
            this.addChild(item);
            flag = this._showArr.length;
            while(index < flag)
            {
                updateItem =this. _showArr[index];
                updateItem.moveTo(this.getPosY(this._showMax - index - 1));
                index++;
            }
        }
        else
        {
            index = this._showArr.indexOf(item);
            flag = this._showArr.length;
            while(index < flag)
            {
                updateItem = this._showArr[index];
                updateItem.moveTo(this.getPosY(this._showMax - index));
                index++;
            }
            this.removeMsgImpl(item);
        }
    }
    
    /**
     * 返回纵向的坐标位置 
     * @param index 自上而下递增
     * @return 
     * 
     */
    private getPosY(index:number):number
    {
        return index * 37 - 40 - 200;
    }
    
    private getPosMaxY():number
    {
        return this._showMax * 37 - 200;
    }
    
    public get msgLength():number
    {
        return this._showArr.length;
    }
    
    public showMsg(str:string , color = "#fffc00"):void
    {
        var showMsg:RollTipsItem = new RollTipsItem();
        
        this._showDict[str] = showMsg;
        showMsg._skin.visible = true;//tipsType.showBg;
        showMsg.updateData(str, this.itemHideCallBack.bind(this),color);
        
        this.showMsgImpl(showMsg);
    }
    
    public stageResize():void
    {
        if(this.parent)
        {
            this.y = GameConfig.SCREEN_HEIGHT/2 ;
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