import { ItemData } from './data/ItemData';
import { BaseItem } from './BaseItem';
export class RewardBaseItem extends Laya.Sprite {
    public _item:BaseItem;
    public _nameTxt:Laya.Text;
    public _nameColor:string = "#ffaa5e";
    public _fontSize:number = 16;
    public showNameNum:Boolean = true;
    private _type:number;
    private _num:number;
    constructor() {
        super();
        this.init();
    }

    public init():void
    {
        this._item = new BaseItem();
        this._item.setItemStyle(80);
        this.addChild(this._item);
        
        this._nameTxt = new Laya.Text();
        this._nameTxt.x = -30;
        this._nameTxt.y = 45;
        this._nameTxt.width = this.width + 60;
        this._nameTxt.height = this._fontSize;
        this._nameTxt.align = "center";
        this._nameTxt.fontSize = this._fontSize;
        this._nameTxt.color = this._nameColor;
        // this._nameTxt.font = "黑体";
        this._nameTxt.visible = false;
        this.addChild(this._nameTxt);
    }

    public setItemStyle(value:number):void
    {
        if(value)
        {
            this._item.setItemStyle(value);
        }
    }
    
    /**
     * 设置名字颜色和大小 
     * @param size
     * @param color
     * 
     */		
    public setItemColor(size:number,color:string):void
    {
        this._fontSize = size;
        this._nameColor = color;
    }

    public set tooltipData(value:any)   //TODO:物品tips
    {
        if(this._item != null)
        {
            this._item.toolTipData = value;
        }
    }

    public get tooltipData():any
    {
        if(this._item != null)
        {
            return this._item.toolTipData;
        }
        return null;
    }

    public get itemData():ItemData
    {
        if( this._item && this._item.itemData )
        {
            return this._item.itemData;
        }
        return null;
    }

    /**
     * 更新 
     * @param data
     * @param num
     * @param name
     * 
     */
    public setData(data:ItemData, num:number):void
    {
        this._num = num;
        if(data instanceof ItemData)
        {
            this._item.itemData = data;
            this.tooltipData = data
			this._item.isShowToolTip = true;  //TODO:物品tips
        }
        // else if(isNaN(data))//暂时不扩展
        // {
        //     this._item.itemCode = data;
        //     this.tooltipData = this._item.itemData;
		// 	this._item.isShowToolTip = true;
        // }
        // else if(data instanceof Laya.Image)
        // {
        //     this._item.setSource(data);
        // }
        // else
        // {
        //     this._item.setSource(data);
        // }
        
        if(this.showNameNum)
        {
            if(!this._nameTxt)
            {
                this._nameTxt = new Laya.Text();
                this._nameTxt.x = -30;
                this._nameTxt.y = 45;
                this._nameTxt.width = this.width + 60;
                this._nameTxt.height = this._fontSize;
                this._nameTxt.align = "center";
                // this._nameTxt.font = "黑体";
                this._nameTxt.visible = false;
                this.addChild(this._nameTxt);
            }
            this._nameTxt.fontSize = this._fontSize;
            this._nameTxt.color = this._nameColor;
            this._nameTxt.visible = true
            this._nameTxt.width = this.width + 60;
            this._nameTxt.y = this._item.height;
            this._nameTxt.text = name + "×" + num;
            this._item.amount = num;
        }
        else
        {
            if(this._nameTxt)
            {
                this._nameTxt.removeSelf();
                this._nameTxt=null;
            }
            this._item.amount = num;
        }
    }
    
    public get type():number
    {
        return this._type;
    }
    
    public get texture():Laya.Texture
    {
        if(this._item && this._item.bitmap)
        {
            return this._item.bitmap.texture;
        }
        return null;
    }

    public get width():number
    {
        return this._item.width;
    }

    public get height():number
    {
        if(this._nameTxt && this._nameTxt.parent)
        {
            return  this._nameTxt.y + 20;
        }
        return this._item.height;
    }
    
    public get num():number
    {
        return this._num;
    }
    
    public dispose():void
    {
        this.showNameNum = true;
        if(this._nameTxt)
        {
            this._nameTxt.removeSelf();
            this._nameTxt=null;
        }
        if(this._item)
        {
            this._item.dispose();
            this._item = null;
        }
        this.showNameNum = true;
    }
}