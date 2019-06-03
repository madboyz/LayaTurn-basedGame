module component 
{
    export class NumberImage extends Laya.Sprite {
        public w:number = 0;
        constructor() {
            super();
        }

        private mUrl:string = "";//艺术字url
        private atlas:Array<any>;
        private args:Array<any>;
        public set url(value:string){
            this.mUrl = value;
        }
          
        public get url():string
        {
            return this.mUrl;
        }
        
        private mText:string;

        public get text():string {
            return this.mText;
        }

        public set text(value:string){
            var reg:RegExp = new RegExp(":", "g");
            var str = value.replace(reg,"_");
            if (this.mText == str) // 相同的text，则不再更新
                return;
            this.mText = str;
            if(!this.atlas && this.mUrl)//有路径则使用艺术字否则使用textfield
            {
                this.atlas = Laya.Loader.getAtlas(this.mUrl);
                if(!this.atlas)
                {
                    Laya.loader.load(this.mUrl, Laya.Handler.create(this, () => {
                        this.atlas = Laya.Loader.getAtlas(this.mUrl);
                        this.drawTxt(value);
                    }))
                }
                else
                {
                    this.drawTxt(value);
                }
                
            }
            else
            {
                this.drawTxt(value);
            }
        }

        private drawTxt(value:string):void
        {
            this.w = 0;
            this.atlas = Laya.Loader.getAtlas(this.mUrl);
            if(this.atlas)
            {
                var lastX = 0;
                var len:number = this.mText.length;
                var i:number = 0;
                var texture:Laya.Texture;
                var index:number = 0;
                this.clear();
                for ( i ; i < len ; i ++){
                    texture = this.getTexture(this.mText.charAt(i) + ".png");
                    try {
                        this.w += texture.sourceWidth;
                        this.graphics.drawTexture(texture, lastX);
                        lastX += texture.sourceWidth;
                        
                    } 
                    catch (error) {
                    }
                }
                this.event(Laya.Event.CHANGE);
            }
            else
            {
                this.graphics.clear();
                var defaultFont: string = "18px 黑体";
                this.args = [
                    value,
                    0,
                    0,
                    defaultFont,
                    "#fff179",
                    // "#00ff00",//描边颜色
                    // 1,   //描边像素
                    "center"
                ];
                this.graphics._saveToCmd(Laya.Render._context._fillText, this.args);
            }
        }
        
        private getTexture(name:String):Laya.Texture{
            var texture:Laya.Texture;
            for (var j:number = 0, n:number = this.atlas.length; j < n; j++) {
                if(this.atlas[j].indexOf(name) >= 1){
                    return texture = Laya.Loader.getRes(this.atlas[j])
                }
            }
            return null;
        }
        
        public clear():void{
            this.w = 0;
            this.graphics.clear();
            this.args =null;
        }
        
        public dispose():void
        {
            this.w = 0;
            this.args = null;
            this.mText = "";
            this.mUrl = "";
            this.graphics.clear();
            this.removeSelf();
        }
    }
}