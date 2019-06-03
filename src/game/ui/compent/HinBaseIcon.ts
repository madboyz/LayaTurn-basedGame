import { GameLayer } from "../../../GameLayer";

export class HinBaseIcon extends Laya.View{
    private icon:component.ScaleButton;
    constructor(iconString:string) {
        super();
        this.initComp(iconString);
    }

    private initComp(str:string):void
    {
        this.addBtn(str);
    }

    public addBtn(str:string):void
    {
        this.icon = new component.ScaleButton();
        this.icon.skin = str;
        this.icon.label = "";
        this.icon.stateNum=1;
        this.addChild(this.icon);
        this.icon.on(Laya.Event.CLICK,this,this.onClick);
        Laya.timer.callLater(this,()=>{
            this.icon.pivotX=this.icon.width/2;
            this.icon.pivotY=this.icon.height/2;
        });
    }

    protected  onClick():void
    {
        // TODO Auto Generated method stub
    }

    public show():void
    {
        if( GameLayer.instacne.smallLayer)
        {
            GameLayer.instacne.smallLayer.addPopUp(this);
        }
    }

    public hide(tweenable:Boolean=true):void
    {
        if( this.parent )
        {
            if(GameLayer.instacne.smallLayer)
            {
                GameLayer.instacne.smallLayer.removePopup(this, tweenable);
            }
            else
            {
                this.removeSelf();
            }
        }
    }
}