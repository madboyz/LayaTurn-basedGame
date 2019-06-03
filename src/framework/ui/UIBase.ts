module base {
    export class UIBase extends Laya.View {
        public isOpen: boolean;
        public isShowMask: Boolean;//是否显示遮罩用来点击空白区域关闭
        public isShowBg: boolean;//是否显示通用背景
        public isShowClose:boolean = true;//是否显示关闭按钮
        public isCloseByNull:boolean = true;//点击空白区域是否关闭
        public isShowTitle:boolean = true;//是否显示标题
        public isShowEffect:boolean = true;//是否启动ui动画
        private _w: number;//通用背景宽
        private _h: number;//通用背景高
        private _paddingTop: number;//向上偏移
        private maskSp: Laya.Sprite;
        private bg: any;
        private title: any;
        public arg:any;
        public isFullScreen:boolean = false;
        public needOpen:boolean = false;//需要将面板展示在舞台上
        public get Title(): any {
            return this.title;
        }

        public set Title(data: any) {
            this.title = data;
            if (this.isShowBg) {
                if (this.bg) {
                    this.title && (this.bg.title = this.title);
                }
            }
        }


        constructor() {
            super();
            this.mouseThrough = true;
        }

        // createView(uiView: object = null): void {
        //     if (this.isOpen)//判断是否打开后，因为在controll里new panel的时候会创建面板元素
        //     {
        //         super.createView(uiView);
        //     }
        // }

        //保存类的UIview，用来下次进行打开
        private _saveUiView: any
        //继承打开
        loadUI(uiView: string = ""): void {
            this._saveUiView = uiView || this._saveUiView;
            //判断是否打开后，因为在new panel的时候会创建面板元素
            if (this.isOpen && this._saveUiView != "") {
                super.loadUI(this._saveUiView);
                this._saveUiView = null;
            }
        }


        /**
         * 添加监听
         * @memberof UIBase
         */
        public initEvent(): void {

        }

        /**
         * 取消监听
         * @memberof UIBase
         */
        public removeEvent(): void {

        }

        /**
         * 创建面板元素
         * @memberof UIBase
         */
        public initComp(): void {
            this.addBg();
            this.loadUI();
            if(this.isFullScreen)
            {
                this.width = Laya.stage.width;
                this.height = Laya.stage.height;
                this.addMask();
            }
            else
            {
                this.centerX = 0;
                this.centerY = 0;
                if(this.layer >= UILEVEL.POP_2 && this.layer <= UILEVEL.POP_4&&this.isShowEffect)
                {
                    var THIS = this;
                    this.scaleX= this.scaleY = 0;
                    Laya.Tween.to(this,{scaleX:1,scaleY:1},200,Laya.Ease.backOut
                        ,Laya.Handler.create(this, () => {   
                            THIS.addMask();
                        })); 
                }
                else
                this.addMask();
            }
                  
            
        }

        /* 指定打开面板时，要加载的资源 */
        protected mResouce: Array<any>;
        /* 面板元素 */
        protected mViewObject: object;

        /* 返回要加载的资源 */
        public get resouce(): Array<any> {
            return this.mResouce;
        }

        /* 资源加载完成后，会调用,并且添加到了舞台
            @args  打开面板时传递的参数
        */
        public open(...args): void {
            this.isOpen = true;
            this.checkState();
        }

        /**
         * 没有子对象的时候创建子对象，否则更新面板
         * @private
         * @memberof UIBase
         */
        private checkState(): void {
            if (this.isOpen && this.numChildren == 0) {
                this.initComp();
                // this.addMouseEnable();
                //this.setCloseButton();
                //Laya.timer.frameOnce(1, this, this.setCloseButton);
            }
            else {
                this.update();
                if(!this.isFullScreen)
                {
                    if(this.layer >= UILEVEL.POP_2 && this.layer <= UILEVEL.POP_4&&this.isShowEffect)
                    {
                        this.scaleX= this.scaleY = 0;
                        var THIS = this;
                        if(this.maskSp)
                        this.maskSp.visible = false;

                        Laya.Tween.to(this,{scaleX:1,scaleY:1},200,Laya.Ease.backOut
                            ,Laya.Handler.create(this, () => {   
                                if(THIS.maskSp) THIS.maskSp.visible = true;
                            })); 
                    }
                    
                }
                
            }
            this.initEvent();
        }
        private closeBtn: Laya.Button;

        //设置关闭按钮
        private setCloseButton(): void {
            if (this.isShowBg) {
                this.bg && this.bg.addBtn(this);
            }
        }

        /**
         * 初始化窗口信息
         * @param {boolean} showMask 是否显示遮罩
         * @param {boolean} showBg 是否显示背景
         * @param {*} title 标题  图片 或者 文字
         * @param {number} w 背景宽
         * @param {number} h 背景高
         * @param {number} paddingTop 向上偏移量
         * @memberof UIBase
         */
        public initWindow(showMask: boolean, showBg: boolean, title: any, w: number, h: number, paddingTop: number = 0): void {
            this.isShowMask = showMask;
            this.isShowBg = showBg;
            this.title = title;
            this.bgSize(w, h, paddingTop);
        }

        private addMask(): void {
            if (this.isShowMask) {
                this.maskSp = new Laya.Sprite;
                Laya.timer.frameOnce(3,this,()=>{
                    var point = this.globalToLocal(new Laya.Point(0,0));
                    this.maskSp.x = point.x;
                    this.maskSp.y = point.y;
                    this.maskSp.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                });
                this.maskSp.name = "mask";
                this.addChildAt(this.maskSp,0);
                this.maskSp.alpha = 0.7;
                this.maskSp.width = Laya.stage.width;
                this.maskSp.height = Laya.stage.height;
                this.maskSp.mouseEnabled = true;
                this.maskSp.mouseThrough =false;
                this.isCloseByNull && this.maskSp.on(Laya.Event.CLICK, this, this.removePanel);
            }
        }

        /**
         * 增加通用背景
         * @memberof UIBase
         */
        private addBg(): void {
            if (this.isShowBg) {
                if (!this.bg) {
                    this.bg = BgManager.getBg(this.layer);
                    this.addChild(this.bg);
                    this.bg.index = this.index;
                    this.bg.bgSize(this._w, this._h, this._paddingTop);
                    this.title && (this.bg.title = this.title);
                    this.bg.showClose(this.isShowClose);
                    this.bg.showTitle(this.isShowTitle);
                    this.timer.frameOnce(2,this,()=>{
                       (this.layer == UILEVEL.POP_2) && (this.bg as NewCommonBg).setBackBtnTo(this);
                    })
                }
            }
            else {
                if (this.bg) {
                    this.bg.removeSelf();
                    this.bg = null;
                }
            }
        }

        /**
         * 隐藏或显示关闭按钮
         * @memberof UIBase
         */
        public showCloseBtn(show:boolean):void{
            this.isShowClose = show;
            this.bg.showClose(this.isShowClose);
        }

        /**
         * 设置背景大小 
         * @param {number} w
         * @param {number} h
         * @memberof UIBase
         */
        private bgSize(w: number, h: number, paddingTop: number) {
            this._w = w;
            this._h = h;
            this._paddingTop = paddingTop;
        }


        /**
         * 给面板元素都增加接受鼠标事件，因为面板没有接受鼠标事件也会认为是空白区域，会有一点影响性能，
         * 有更好的办法可以修改。
         * @memberof UIBase
         */
        // private addMouseEnable(): void {
        //     if (this.isShowMask) {
        //         Laya.timer.frameOnce(1, this, function (): void {
        //             this.childList = this._childs;
        //             for (var i: number = 0; i < this.childList.length; i++) {
        //                 var node: any = this.childList[i];
        //                 node.mouseEnabled = true;
        //             }
        //         });
        //     }
        // }

        /**
         * 第二次打开面板更新数据
         * @memberof UIBase
         */
        public update(): void {

        }

        private mSameLevelEliminate: boolean = true;//默认互斥

        public set sameLevelEliminate(value: boolean) {
            this.mSameLevelEliminate = value;
        }

        /* 同级是否排斥,默认排斥 */
        public get sameLevelEliminate(): boolean {
            return this.mSameLevelEliminate;
        }

        public set index(value: number) {
            this._index = value;
            this.bg && (this.bg.index = this.index);
        }

        public get index(): number {
            return this._index;
        }

        /* panel id */
        private _index: number;
        /* 层级 */
        public layer: number = UILEVEL.POP_2;
        /* 默认的tab页签 */
        public tabIndex:number = 0;
        /****用于查看面板已经关闭了多少时间*****/
        public closeTime: number = 0;

        //关悼面板
        public close(): void {
            this.closeBtn && this.closeBtn.offAll();
            this.closeBtn = null;
            this.arg = null;
            this.closeTime = Laya.Browser.now();
            this.isOpen = false;
            this.removeEvent();
            this.removeSelf();//自己移除自己
            UIManager.instance.CheckRemoveViewDic(this.index);
        }

        private removePanel(): void
        {
            UIManager.instance.closeUI(this.index);
        }
    }
}
