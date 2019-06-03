import { GameLayer } from "../../../../../GameLayer";
import { SGuideEvent } from "../data/SGuideData";

export class GuidePop extends Laya.Image {
    private isLeft = true;
    //private ScaleTween1:Laya.Tween;
    //private ScaleTween2:Laya.Tween;
    constructor() {
        super();
        this.width = 83;
        this.height = 88;
        
        if(this.skin == null)
        {
            var resouce = [
                { url: "res/atlas/guide.atlas", type: Laya.Loader.ATLAS },
            ];
            UILoadManager.instance.load(UIID.GUIDE_MASK, resouce, Laya.Handler.create(this, function () {
                //this.MaskImg.skin = "guide/img_effect.png";
                this.skin = "guide/img_btn.png";
            }));
        }
        this.mouseThrough = true;
        this.mouseEnabled = true;
        //this.MaskImg = new Laya.Image();
        //this.MaskImg.width = this.MaskImg.height = 208;
        //this.addChild(this.MaskImg);
        //this.MaskImg.mouseThrough = false;
        //this.MaskImg.mouseEnabled = true;
        //this.MaskImg.pivotX = 104;
        //this.MaskImg.pivotY = 104;
        this.mouseThrough = true;
        this.mouseEnabled = false;
        this.visible =false;
        //this.ArrowImg.on(Laya.Event.CLICK , this , this.Click);
        //this.MaskImg.on(Laya.Event.CLICK , this , this.Click);
        //Laya.Tween.to(this.MaskImg,{scaleX:1.1,scaleY:1.1},1000,Laya.Ease.linearInOut,Laya.Handler.create(this,this.onMaskTween1));
        Laya.Tween.to(this,{scaleX:0.7 ,scaleY:0.7},300,Laya.Ease.linearInOut,Laya.Handler.create(this,this.onArrowTween1));
    } 

    private onArrowTween1():void
	{
        this.scaleX = 1;
        this.scaleY = 1;
        var x = 0.7;
		Laya.Tween.to(this,{scaleX:x,scaleY:0.7},300,Laya.Ease.linearInOut,Laya.Handler.create(this,this.onArrowTween2));
    }
    
    private onArrowTween2():void
    {
        this.scaleX = 0.7;
        this.scaleY = 0.7;
        var x = 1;
		Laya.Tween.to(this,{scaleX:x,scaleY:1},300,Laya.Ease.linearInOut,Laya.Handler.create(this,this.onArrowTween1));
    }

    private onMaskTween1():void
	{
		Laya.Tween.clearTween(this.onMaskTween1);
		//Laya.Tween.to(this.MaskImg,{scaleX:0.8,scaleY:0.8},1000,Laya.Ease.linearInOut,Laya.Handler.create(this,this.onMaskTween2));
    }
    
    private onMaskTween2():void
    {
        Laya.Tween.clearTween(this.onMaskTween2);
		//Laya.Tween.to(this.MaskImg,{scaleX:1.1,scaleY:1.1},1000,Laya.Ease.linearInOut,Laya.Handler.create(this,this.onMaskTween1));
    }

    public Show(isleft = true)
    {
        //if(GameLayer.instacne.uiLayer.getChildIndex(this) == -1)
        //{
        //    GameLayer.instacne.uiLayer.addChild(this);
        //}
        //else
        //{
        //    GameLayer.instacne.uiLayer.setChildIndex(this,GameLayer.instacne.uiLayer.numChildren - 1);
        //}
        //this.mouseEnabled = force;
        if(this.isLeft != isleft)
        {
            //Laya.Tween.clearTween(this.ScaleTween1);
            //Laya.Tween.clearTween(this.ScaleTween2);
            this.isLeft = isleft;
            //this.rotation = isleft?0:90;
            //this.scaleY = 1;
            //var _x = this.isLeft == true?0.7:-0.7;
            //this.ScaleTween1 = Laya.Tween.to(this,{scaleX:_x ,scaleY:0.7},300,Laya.Ease.linearInOut,Laya.Handler.create(this,this.onArrowTween1));
        } 
        
        if(this.visible)
        return;
        this.visible = true;
    }
    private Click()
    {
        //if(this.Func)
        //this.Func.runWith(this.Func.args);
        //this.event(SGuideEvent.GUIDE_CLICK);
        //this.ShowArrow (false);
        
    }
}