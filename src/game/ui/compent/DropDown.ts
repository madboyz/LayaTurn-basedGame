/**
 * 下拉框
 */
export class DropDown extends Laya.Sprite {
    private CurrentBtn:Laya.Button;
    private Bg:Laya.Image;//背景图
    public SeletItem: Laya.Handler;//点击后的回调
    private list:Laya.List;//列表
    private Mask:Laya.Sprite;
    public set array(value:any[])
    {
        if(!this.list)
        return;
        this.list.array = value;
    }
    public get array():any[]
    {
        if(!this.list)
        return null;
    }

    constructor(sizeGrid:string , bgSkin:string,button:Laya.Button ,  bgHeight:number , count:number 
        , mouseHandler:Laya.Handler , renderHandler:Laya.Handler ,itemRender:any , repeatX:number , 
        repeatY:number , cellWidth:number , cellHeight:number) {
        super();
        if(!button)
        return;
        this.CurrentBtn = button;
        
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        if(!this.Mask)
        {
            this.Mask = new Laya.Sprite;
            this.Mask.width = Laya.stage.width;
            this.Mask.height = Laya.stage.height;
            this.Mask.mouseEnabled = true;
            this.addChild(this.Mask);
        }
        if(!this.Bg)
        {
            this.Bg = new Laya.Image();
            this.Bg.mouseEnabled = true;
            this.addChild(this.Bg);
        }

        this.Bg.skin = bgSkin;
        this.Bg.x = this.CurrentBtn.x;
        this.Bg.y = this.CurrentBtn.y + this.CurrentBtn.height + 5;
        this.Bg.width = this.CurrentBtn.width;
        this.Bg.height = bgHeight;
        this.Bg.sizeGrid = sizeGrid;

        if(this.list == null)
        {
            this.list = new Laya.List();
            this.addChild(this.list);
            this.initServerList(count , repeatX , repeatY,itemRender,mouseHandler,renderHandler);
            
            this.list.width = this.Bg.width;
            this.list.height = this.Bg.height - 20;
            this.list.x = this.Bg.x + (this.Bg.width -  cellWidth)/2;
            this.list.y = this.Bg.y + 10;
        }
        this.Mask.off(Laya.Event.CLICK, this, this.Hide);
        this.Mask.on(Laya.Event.CLICK, this, this.Hide);
        this.visible = false;
    }

    private initServerList(count:number , repeatX:number , 
        repeatY:number , itemRender:any ,mouseHandler:Laya.Handler,renderHandler:Laya.Handler)
    {
        this.list.spaceX = repeatX;
        this.list.spaceY = repeatY;
        this.list.repeatX = 1;
        this.list.repeatY = count;
        this.list.itemRender = itemRender;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离
        this.list.renderHandler =  renderHandler;
        this.list.mouseHandler = mouseHandler;
    }

    public open(index:number = 0 , data:any = null): void {
        this.visible = true;
        this.list.selectedIndex = index;
        this.list.scrollTo(index);
    }

    public removeSelf ():laya.display.Node
    {
        this.off(Laya.Event.CLICK, this, this.Hide);
        this.CurrentBtn.off(Laya.Event.CLICK, this, this.open);
        this.list.renderHandler =  null;
        this.list.mouseHandler = null;
        return super.removeSelf();
    }

    public Hide(): void {
        this.visible = false;
    }
}