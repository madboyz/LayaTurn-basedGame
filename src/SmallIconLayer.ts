import { GameLayer } from "./GameLayer";

export class SmallIconLayer extends Laya.Sprite {
    protected HorizenGap:number = 42;
    private vcDisplaObject:Array<any> =[];
    public _iconContainer:Laya.Sprite;
    protected _isNeedTween:Boolean = true;
    public isTween:Boolean = true;
    constructor() {
        super();
        this.initComp();
    }

    private initComp():void
    {
        this.size(580,80);
        this._iconContainer = new Laya.Sprite();
        this.addChild(this._iconContainer);
        this._iconContainer.mouseEnabled = true;
        this._iconContainer.mouseThrough = true;
        this.stageResize();
    }

    private tweenAtIndex(index:number):void
    {
        var i:number = 0;
        this.vcDisplaObject[i].y = 0;
        if(index == this.vcDisplaObject.length - 1)
        {
            this.vcDisplaObject[index].x = this.HorizenGap * index + 120;
            Laya.Tween.to(this.vcDisplaObject[index],{x:this.HorizenGap * index},1000);
        }
        else
        {
            for(i = index;i < this.vcDisplaObject.length;i++)
            {
                Laya.Tween.clearTween(this.vcDisplaObject[i]);
                this.vcDisplaObject[i].x = this.HorizenGap * i + 120;
                Laya.Tween.to(this.vcDisplaObject[i],{x:this.HorizenGap * i},1000);
            }
        }
    }
		
    //移除的缓动
    private tweenRemoveAtIndex(index:number):void
    {
        var i:number = 0;
        if(this.vcDisplaObject.length >= 1)
        {
            this.vcDisplaObject[i].y = 0;
            for(i = index;i < this.vcDisplaObject.length;i++)
            {
                Laya.Tween.clearTween(this.vcDisplaObject[i]);
                Laya.Tween.to(this.vcDisplaObject[i],{x:this.HorizenGap * i},1000);
            }
        }
    }
		
    public addPopUp(displayObject:any, modal:Boolean=false):void
    {
        if( displayObject && this.contains(displayObject) == false )
        {		
            this._iconContainer.addChild(displayObject);
            this.vcDisplaObject.push(displayObject);
            if(!modal && this._isNeedTween)
            {
                this.tweenAtIndex(this.vcDisplaObject.length - 1);
            }
            else
            {
                displayObject.x = this.HorizenGap * (this.vcDisplaObject.length - 1);
            }
            
        }
    }
		
		
    public isTop(displayObject:any):Boolean
    {
        if( this._iconContainer.contains(displayObject) )
        {
            return this._iconContainer.getChildIndex( displayObject ) == this._iconContainer.numChildren-1;
        }
        return false;
    }
		
    public removePopup(displayObject:any,tweenable:Boolean=true):void
    {
        if( this._iconContainer.contains(displayObject) )
        {
            this._iconContainer.removeChild(displayObject);
            var index:number = this.vcDisplaObject.indexOf(displayObject);
            if(index >= 0)
            {
                this.vcDisplaObject.splice(index,1);
            }
            this.tweenRemoveAtIndex(index);
        }
    }
		
    public isPopup(displayObject:any):Boolean
    {
        return this._iconContainer.contains(displayObject);
    }
    
    public setTop(displayObject:any):void
    {
        if( this._iconContainer.contains(displayObject) )
        {
            if( this._iconContainer.getChildIndex(displayObject) != this._iconContainer.numChildren -1 )
            {
                this._iconContainer.setChildIndex(displayObject,this._iconContainer.numChildren - 1);
            }
        }
    }
		
    public stageResize():void
    {
        this.x = Laya.stage.width/2;
        this.y = Laya.stage.height - 420;
    }
}