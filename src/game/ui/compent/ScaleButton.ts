module component {
    /**
     * 缩放按钮组件
     * 
     */
    export class ScaleButton extends Laya.Button {
        private oldScaleX:number = NaN;
        private oldScaleY:number = NaN;
        private red:Laya.Image;
        private scaleTime: number = 50;
        public  cdTime:number;
        private _timeBack:Function;
        constructor(skin: string = null, label: string = "") {
            super(skin, label);
            this.autoSize = true;
            this.stateNum = 1;
            
            this.on(Laya.Event.MOUSE_DOWN, this, this.scaleSmall);
            this.on(Laya.Event.MOUSE_UP, this, this.scaleBig);
            this.on(Laya.Event.MOUSE_OUT, this, this.scaleBig);
            this.on(Laya.Event.CLICK, this, this.btnClick);
        }

        private btnClick():void{
            if (!GameConfig.GAME_PLAY_MUSIC) return;
            var url = "art/sound/click.ogg";
            Laya.SoundManager.playSound(url, 1);
        }

        public scaleSmall(): void {
            if(isNaN(this.oldScaleX) && isNaN(this.oldScaleY))
            {
                this.oldScaleX = this.scaleX;
                this.oldScaleY = this.scaleY;
            }
            let scaleX: number = this.oldScaleX < 0 ? this.oldScaleX + 0.1 : this.oldScaleX - 0.1;
            let scaleY: number = this.oldScaleY < 0 ? this.oldScaleY + 0.1 : this.oldScaleY - 0.1;
            Laya.Tween.to(this, { scaleX: scaleX, scaleY: scaleY }, this.scaleTime);
        }
        public scaleBig(): void {
            if(isNaN(this.oldScaleX) && isNaN(this.oldScaleY))
            {
                this.oldScaleX = this.scaleX;
                this.oldScaleY = this.scaleY;
            }
            Laya.Tween.to(this, { scaleX: this.oldScaleX, scaleY: this.oldScaleY }, this.scaleTime);
        }

        public changeState():void
        {
            if(!this._gray)
            {
                this._state = this._state > 1?1:this._state;
            }
            super.changeState();
        }

        /** 
         * 更新红点显示
         * @param {boolean} bl 
         * @memberof ScaleButton
         */
        public refreshRed(bl:boolean):void
        {
            if(bl)
            {
                if(!this.red)
                {
                    this.red = new Laya.Image();
                    this.red.skin = ResUtils.getCompUIUrl("img_red");
                    this.red.x = this.width - this.red.height + 10;
                    this.red.y = -10;
                    this.addChild(this.red);
                }
            }
            this.red && (this.red.visible = bl);
        }

        /**
         * 设置红点的显示位置 
         * @param {number} x 
         * @param {number} y 
         * @memberof ScaleButton
         */
        public updadeRedPos(x:number,y:number):void
        {
            if(this.red)
            {
                this.red.x = x;
                this.red.y = y;
            }
        }

        public createGrayFilter():void{
            var colorMatrix:any = 
                [
                    0.3086, 0.6094, 0.0820, 0, 0,  //R
                    0.3086, 0.6094, 0.0820, 0, 0, //G
                    0.3086, 0.6094, 0.0820, 0, 0,  //B
                    0, 0, 0, 1, 0, //A
                ];
            var GrayFilter:Laya.ColorFilter = new Laya.ColorFilter(colorMatrix);
            this.filters = [GrayFilter];
        }

        /**
         * 置灰 直接用gray会对性能有影响
         * @memberof ScaleButton
         */
        public set gray(value:boolean)
        {
            if(value)
            {
                this.createGrayFilter();
            }
            else
            {
                this.filters = [];
            }
            this.mouseEnabled = !value;
            this._gray = value;
        }

        public get gray():boolean
        {
            return this._gray;
        }

        private oldTime:number = 0;
        /**
		 * 初始化cd数据 
		 * @param time 冷却时间
		 * 
		 */		
		public initCD(time:number,name:string):void
		{
            this.cdTime = time;
		}
		
		public set timeBack(func:Function)
		{
			this._timeBack = func;
		}
		
		public get timeBack():Function
		{
			return this._timeBack;
		}
		
		public startCoolDown():void
		{
            if(this.gray == false)
            {
                this.oldTime = this.cdTime;
                this.gray = true;
                Laya.timer.clear(this,this.updateTime);
                Laya.timer.loop(1000,this,this.updateTime);
                this.updateTime();
            }
		}
		
		private updateTime():void
		{
            this.oldTime -= 1000;
			if(this.oldTime < 1000)
			{
                this.gray = false;
				Laya.timer.clear(this,this.updateTime);
				if(this._timeBack)
				{
					this._timeBack.apply(this);
				}
				return;
			}
        }

        public clearTime():void
        {
            this.gray = false;
            Laya.timer.clear(this,this.updateTime);
        }
        
        public timeToStr(time:number):string
		{
			var hour:number = 0;
			var minute:number = 0;
			var second:number = 0;
			second = time / 1000;
			if (second > 60) {
				minute = Math.floor(second / 60);
				second = Math.floor(second % 60);
			}
			if (minute > 60) {
				hour = Math.floor(minute / 60);
				minute = Math.floor(minute % 60);
			}
			if(hour > 0)
			{
				return (this.getTwoLength(hour) + ":" + this.getTwoLength(minute)  + ":"  + this.getTwoLength(second));
			}
			else if(minute > 0)
			{
				return (this.getTwoLength(minute)  + ":"  + this.getTwoLength(second));
			}
			else
			{
				return second.toString();
            }
        }
        
        private getTwoLength(num:number):string {
			if(num < 10) {
				return "0" + Math.ceil(num);
			} else {
				return "" + Math.ceil(num);
			}
        }

        public removeSelf():any
        {
            this.filters = [];
            this.cdTime = -1;
            this.oldTime = -1;
            this.timeBack = null;
            Laya.timer.clear(this,this.updateTime);
            if(this.red)
            {
                this.red.removeSelf();
                this.red = null;
            }
            super.removeSelf();
        }

    }
}