import { FightPetView } from "../../../../battle/role/fight/FightPetView";
import { MsgManager } from "../../../manager/MsgManager";

export class CatchPetMainPanel extends ui.main.CatchPetMainPanelUI {
   
    private Matter:any = Laya.Browser.window.Matter;
	private LayaRender:any = Laya.Browser.window.LayaRender;
    private mouseConstraint:any;
    private ballshadow:Laya.Sprite;
    private engine:any;
    private role:FightPetView;
    private readonly itemList = [0,2,3,4,1015,1016,1003,1004,1005,1006,1007,1008,1009,1021,1020];
    private ballBody:any;
    private score:number = 0;
    private matterRender:any = null;
    constructor() {
        super();
        this.layer = UILEVEL.POP_2;
        this.sameLevelEliminate = false;
        this.isFullScreen = true;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.role = Laya.Pool.getItemByClass("FightPetView", FightPetView);
        this.role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.role.x = 268;
        this.role.y = 684;
        this.role.info = {ParentPartnerNo:130};
        this.BgImg.addChild(this.role);
        //var gameWorld: Laya.Sprite = new Laya.Sprite();
        //this.BgImg.addChild()
        //this.BgImg.visible = false;;

        this.initMatter();
    }

    
    private initMatter():void {
        this.engine = this.Matter.Engine.create({enableSleeping: true});
       
        this.Matter.Engine.run(this.engine);
        this.matterRender = this.LayaRender.create({
                        engine: this.engine, 
                        width:  this.BgImg.width, 
                        height: this.BgImg.height, 
                        options: {
                            // background: 'res/UI/background.jpg',
                            wireframes: false
                        },
                        //container:this.BgImg,
                        //bounds:
                        //{
                        //    min:
			            //    {
			            //    	x: 43,
			            //    	y: 117
                        //    },
                        //    max:
			            //    {
			            //    	x: 43,
			            //    	y: 117
			            //    }
                        //}
                        
                    });
        //this.LayaRender.run(this.matterRender);
        //this.mouseConstraint = this.Matter.MouseConstraint.create(this.engine, {constraint: {angularStiffness: 0.1, stiffness: 2}, element: Laya.Render.canvas});
		//this.Matter.World.add(this.engine.world, this.mouseConstraint);
        //render.mouse = this.mouseConstraint.mouse;
        
        this.engine.world.gravity.y = 4;
    }

    public open(...args): void {
        //this.initWindow(true, true, "全民抓宠", 550, 750, 50);
        super.open();
        this.initWorld();
        //if(this.engine)
        //this.Matter.Engine.run(this.engine);
        if(this.matterRender)
        this.LayaRender.run(this.matterRender);
    }

    public initEvent():void {
        this.RefreshBtn.on(Laya.Event.CLICK,this,this.onClickRefreshBtn);
        this.ExitBtn.on(Laya.Event.CLICK,this,this.onExitBtn);
        this.BgImg.on(Laya.Event.MOUSE_DOWN, this, this.onClickBg);
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        this.Matter.Events.on(this.engine,'collisionStart',this.onCollisionStart.bind(this));
    }

    public removeEvent():void {
        this.RefreshBtn.off(Laya.Event.CLICK,this,this.onClickRefreshBtn);
        this.ExitBtn.off(Laya.Event.CLICK,this,this.onExitBtn);
        this.BgImg.off(Laya.Event.MOUSE_DOWN, this, this.onClickBg);
        Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
        this.Matter.Events.off(this.engine,'collisionStart',this.onCollisionStart.bind(this));
    }

    private onClickRefreshBtn() {
        this.score = 0;
        var bodies = this.Matter.Composite.allBodies(this.engine.world);
        for (let i = 0; i < bodies.length; i++) {
            const bodie = bodies[i];
            this.Matter.World.remove(this.engine.world,bodie,true);
        }
        this.initWorld();
    }

    private onClickBg(event) {
        var point = new Laya.Point(event.stageX,event.stageY)
        if(this.Matter.Bounds.contains(this.ballBody.bounds,point)){
            this.Matter.Body.applyForce(this.ballBody,point,{ x :(this.ballBody.position.x - point.x)/10,y:-10});
            this.score++;
            MsgManager.instance.showRollTipsMsg(`得分:${this.score}`);
        }
    }

    private onExitBtn() {
        this.close();
    }

    private onResize():void
	{
		// 设置鼠标的坐标缩放
		// Laya.stage.clientScaleX代表舞台缩放
		// Laya.stage._canvasTransform代表画布缩放
		//this.Matter.Mouse.setScale(this.mouseConstraint.mouse, {x: 1 / (Laya.stage.clientScaleX * Laya.stage._canvasTransform.a), y: 1 / (Laya.stage.clientScaleY * Laya.stage._canvasTransform.d)});
    }

    private onCollisionStart(event)
    {
        let pairs  =  event.pairs;
        let pair;
        var THIS = this;
        for (var i = 0; i < event.pairs.length; i++) {
            pair = pairs[i];
            if(pair.bodyA.label === "g" ||pair.bodyB.label === "g"){
                if(THIS.score>0){
                    THIS.score = 0;
                    //Laya.timer.once(300,this,this.showRank);
                }
            }
        }
    }

    private initWorld():void
	{
        let GameHeight = Laya.stage.height;
        let GameWidth  = Laya.stage.width;
        let top        = this.Matter.Bodies.rectangle(GameWidth/2, 0, GameWidth,4, {density:1,isStatic: true, render: {visible: false} });
        let leftWall   = this.Matter.Bodies.rectangle(0,GameHeight/2,4,GameHeight,{density:1,isStatic: true,render: {visible: false} })
        let rightWall  = this.Matter.Bodies.rectangle(GameWidth,GameHeight/2,4,GameHeight,{density:1,isStatic: true,render: {visible: false} })
        let ground     = this.Matter.Bodies.rectangle(GameWidth/2,GameHeight, GameWidth,4, {density:1,isStatic: true, render: {visible: false},label:"g"});
        var index = GMath.randRange(0,this.itemList.length-1);
        //var nameStr = `${Laya.URL.basePath}art/item/${this.itemList[index]}.png`;
        
        var nameStr = `${Laya.URL.basePath}art/uiAnim/ui_migong02.png`;
        let rockOptions = {
            density: 0.018, 
            restitution: 0.8,
            render: {sprite:{texture:nameStr, xOffset: 35, yOffset: 35,visible: true}}};
        this.ballBody   = this.Matter.Bodies.circle(GameWidth/2, GameHeight-50,35,rockOptions)
        this.Matter.World.add(this.engine.world, [leftWall,rightWall,ground,top,this.ballBody]);
    }

    public close(): void {
        super.close();
        this.score = 0;
        var bodies = this.Matter.Composite.allBodies(this.engine.world);
        for (let i = 0; i < bodies.length; i++) {
            const bodie = bodies[i];
            this.Matter.World.remove(this.engine.world,bodie,true);
        }
        this.Matter.Runner.stop(this.engine); 
        this.Matter.World.clear(this.engine.world);    
        this.LayaRender.stop(this.matterRender);

    }
}