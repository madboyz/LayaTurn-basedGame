class CommonBg extends Laya.View {
    private _w:number;//通用背景宽
    private _h:number;//通用背景高
    private _titleBg:Laya.Image;
    private _bg:Laya.Image;
    private _closeBtn:component.ScaleButton;
    // private _help:component.ScaleButton;
    private _index:number;
    public _title:any;
    public _paddingTop:number;
    constructor() {
        super();
        this.initComp();
    }

    private initComp() {

        this._bg = new Laya.Image();
        this._bg.sizeGrid="122,112,125,107";
        this._bg.skin = ResUtils.getCompUIUrl("img_bg");
        this.addChild(this._bg);

        this._titleBg = new Laya.Image();
        this._titleBg.sizeGrid="0,42,0,42";
        this._titleBg.skin = ResUtils.getCompUIUrl("img_titleBg");
        this._titleBg.width = 310;
        this._titleBg.height = 54;
        this.addChild(this._titleBg);

        this._closeBtn = new component.ScaleButton();
        this._closeBtn.skin = ResUtils.getCompUIUrl("btn_close");
        this._closeBtn.stateNum = 1;
        this._closeBtn.width = 54;
        this._closeBtn.height = 54;
        this._closeBtn.pivotX = 27;
        this._closeBtn.pivotY = 27;
        this._closeBtn.on(Laya.Event.CLICK, this, this.onClose);

        // this._help = new component.ScaleButton();
        // this._help.skin = ResUtils.getCompUIUrl("btn_help");
        // this._help.stateNum = 1;
        // this._help.width = 54;
        // this._help.height = 54;
        // this._help.pivotX = 27;
        // this._help.pivotY = 27;
        // this._help.on(Laya.Event.CLICK, this, this.onHelp);
        this.addChild(this._closeBtn);
        // this.addChild(this._help);
    }

    public addBtn():void
    {
        this._closeBtn.x = this._bg.localToGlobal(new Laya.Point(0,0)).x + this.width - 20;
        this._closeBtn.y = this.y + 10;
        // this._help.x = this._bg.localToGlobal(new Laya.Point(0,0)).x + 20;
        // this._help.y = this.y + 10;
    }

    public showClose(bl:boolean):void
    {
        this._closeBtn.visible = bl;
        // this._help.visible = bl;
    }

    public showTitle(bl:boolean):void
    {
        this._titleBg.visible = bl;
        this._title && (this._title.visible = bl);
    }

    /**
     * 设置背景大小
     * @param {number} w
     * @param {number} h
     * @param {number} paddingTop 
     * @memberof UIBase
     */
    public bgSize(w:number,h:number,paddingTop:number = 0)
    {
        this._w = w;
        this._h = h;
        this._bg.width = this._w;
        this._bg.height = this._h;
        this._paddingTop = paddingTop;
        this.width = this._w;
        this.height = this._h;
        this.addBtn();
        this.centerX = 1;
        this.y = this._paddingTop;
    }

    public set index(value:number)
    {
        this._index = value;
    }

    public set title(value:any)
    {
        if(typeof(value) == "string")
        {
            if(!this._title)
            {
                this._title = new Laya.Text();
                this._title.color = "#8a5428";
                this._title.align = "center";
                this._title.valign = "middle";
                this._title.fontSize = 28;
                this._title.width = 235;
                this._title.height = 35;
                this.addChild(this._title);
            }
            this._title.text = value;
        }
        else
        {
            if(!this._title)
            {
                this._title = new Laya.Image();
                this.addChild(this._title);
            }
            this._title = value;
        }
        this.layout();
    }

    public get index():number
    {
        return this._index;
    }

    private layout():void
    {
        this._titleBg.x = (this._w - this._titleBg.width)>>1;
        this._titleBg.y = -this._titleBg.height/2;
        this._title.x = this._titleBg.x + 38;
        this._title.y = this._titleBg.y + 7;
    }

    private onClose():void
    {
        UIManager.instance.closeUI(this.index);
    }

    private onHelp():void
    {

    }

    public removeSelf():any
    {
        this._paddingTop = -1;
        this._w = -1;
        this._h = -1;
        this._index = -1;
        this.title.removeSelf();
        this.title = null;
        this._titleBg.removeSelf();
        this._titleBg = null;
        this._bg.removeSelf();
        this._bg = null;
        this._closeBtn.removeSelf();
        this._closeBtn =null;
        // this._help.removeSelf();
        // this._help =null;
        Laya.Pool.recover("bg",this);
        super.removeSelf();
    }
}