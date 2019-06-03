class NewCommonBg extends Laya.View {
    private _w: number;//通用背景宽
    private _h: number;//通用背景高
    private _bg: Laya.Image;
    private _closeBtn: component.ScaleButton;
    private _backBtn: component.ScaleButton;
    //private _backBtn:component.ScaleButton;
    //暂时help都屏蔽了
    // private _help:component.ScaleButton;
    private _index: number;
    public _title: any;
    public _paddingTop: number;
    constructor() {
        super();
        this.initComp();
    }

    private initComp() {
        this.cacheAs = "bitmap";
        this._bg = new Laya.Image();
        this._bg.skin = "bg/stuffBg.png";
        this._bg.width = 572;
        this._bg.height = 779;
        this.addChild(this._bg);

        this._closeBtn = new component.ScaleButton();
        this._closeBtn.skin = ResUtils.getCompUIUrl("btn_close");
        this._closeBtn.stateNum = 1;
        this._closeBtn.width = 54;
        this._closeBtn.height = 54;
        this._closeBtn.pivotX = 27;
        this._closeBtn.pivotY = 27;
        this._closeBtn.on(Laya.Event.CLICK, this, this.onClose);
        this.addChild(this._closeBtn);

        this._backBtn = new component.ScaleButton();
        this._backBtn.skin = ResUtils.getCompUIUrl("btn_back");
        this._backBtn.stateNum = 1;
        this._backBtn.x = 41;
        this._backBtn.y = 745;
        this._backBtn.anchorX = this._backBtn.anchorY = 0.5;
        this._backBtn.on(Laya.Event.CLICK, this, this.onClose);
        this.addChild(this._backBtn);

        //暂时help都屏蔽了
        // this._help = new component.ScaleButton();
        // this._help.skin = ResUtils.getCompUIUrl("btn_help");
        // this._help.stateNum = 1;
        // this._help.width = 54;
        // this._help.height = 54;
        // this._help.pivotX = 27;
        // this._help.pivotY = 27;
        // this._help.on(Laya.Event.CLICK, this, this.onHelp);
        // this.addChild(this._help);
    }

    public addBtn(): void {
        this._closeBtn.x = this._bg.localToGlobal(new Laya.Point(0, 0)).x + this.width - 30;
        this._closeBtn.y = this.y + 40;
        //this._backBtn.x = this._closeBtn.x ;
        //this._backBtn.y = this._closeBtn.y + this._h - this._backBtn.height/2;
        //暂时help都屏蔽了
        // this._help.x = this._bg.localToGlobal(new Laya.Point(0, 0)).x + 30;
        // this._help.y = this.y + 40;
    }

    public setBackBtnTo(newParent:Laya.Sprite):void{
        var backPoint = this._bg.localToGlobal(new Laya.Point(this._backBtn.x, this._backBtn.y));
        var newPoint = newParent.globalToLocal(backPoint);
        this._backBtn.x = newPoint.x;
        this._backBtn.y = newPoint.y;
        newParent.addChild(this._backBtn);
    }

    public showClose(bl: boolean): void {
        this._closeBtn.visible = bl;
        //暂时help都屏蔽了
        // this._help.visible = bl;
    }

    public showTitle(bl: boolean): void {
        this._title && (this._title.visible = bl);
    }

    /**
     * 设置背景大小
     * @param {number} w
     * @param {number} h
     * @param {number} paddingTop 
     * @memberof UIBase
     */
    public bgSize(w: number, h: number, paddingTop: number = 0) {
        this._w = w;
        this._h = h;
        this._paddingTop = paddingTop;
        this.width = 572;
        this.height = 779;
        this.addBtn();
        this.centerX = 1;
        this.y = paddingTop;
        // this.centerY = 1;
    }

    public set index(value: number) {
        this._index = value;
    }

    public set title(value: any) {
        if (typeof (value) == "string") {
            if (!this._title) {
                this._title = new Laya.Text();
                this._title.color = "#8a5428";
                this._title.align = "center";
                this._title.valign = "middle";
                this._title.fontSize = 28;
                this._title.width = 260;
                this._title.height = 42;
                this.addChild(this._title);
            }
            this._title.text = value;
        }
        else {
            if (!this._title) {
                this._title = new Laya.Image();
                this.addChild(this._title);
            }
            this._title = value;
        }
        this.layout();
    }

    public get index(): number {
        return this._index;
    }

    private layout(): void {
        this._title.x = 156;
        this._title.y = 13;
    }

    private onClose(): void {
        UIManager.instance.closeUI(this.index);
    }

    private onHelp(): void {

    }

    public removeSelf(): any {
        this._paddingTop = -1;
        this._w = -1;
        this._h = -1;
        this._index = -1;
        this.title.removeSelf();
        this.title = null;
        this._bg.removeSelf();
        this._bg = null;
        this._closeBtn.removeSelf();
        this._closeBtn = null;
        this._backBtn && this._backBtn.removeSelf();
        this._backBtn = null;
        //暂时help都屏蔽了
        // this._help.removeSelf();
        // this._help = null;
        Laya.Pool.recover("bg", this);
        super.removeSelf();
    }
}