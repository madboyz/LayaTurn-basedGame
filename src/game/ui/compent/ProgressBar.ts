export class ProgressBar extends Laya.View {
    private _model:number = 0;//0 不显示文本 1 显示文字 2 显示百分比 3 只显示当前值 4 悬浮显示文字
    private _bg:Laya.Image;//进度条背景
    private _bar:Laya.Image;//进度条
    private _label:Laya.Text;//文本
    private _min:number = 0;//最小值
    private _max:number = 100;//最大值
    private _value:number;//当前值
    private _w:number;
    private _h:number;
    private _paddingLeft:number = 0;
    private _paddingRight:number = 0;
    private _paddingTop:number = 0;
    private _paddingBottom:number = 0;
    private _node:any = null;//可能需要的节点
    constructor() {
        super();
        this.initComp();
    }

    private initComp():void
    {
        this._bg = new Laya.Image();
        this._bg.sizeGrid="10,10,10,10";
        this.addChild(this._bg);

        this._bar = new Laya.Image();
        this._bar.sizeGrid="10,10,10,10";
        this.addChild(this._bar);

        this._label = new Laya.Text();
        this._label.align = "center";
        this._label.valign = "middle";
        this.addChild(this._label);

        this._model = 0;
        this._min = 0;
        this._max = 0;
        this._value = 0;
    }

    public AddNode(node)
    {
        if(!node)return;
        this._node = node;
        this.addChild(this._node);
    }
    
    /**
     * 设置九宫格
     * @param bgGrid 
     * @param barGrid 
     */
    public setGrid(bgGrid:string , barGrid:string)
    {
        this._bg.sizeGrid = bgGrid;
        this._bar.sizeGrid = barGrid;
    }

    /**
     * 设置背景
     * @param {string} bgSkin 背景图片
     * @param {string} barSkin bar图片
     * @param {number} w 宽
     * @param {number} h 高
     * @param {number} left 
     * @param {number} top
     * @param {number} buttom
     * @param {number} right
     * @memberof ProgressBar
     */
    public setBg(bgSkin:string,barSkin:string,w:number,h:number,left:number = 0,top:number = 0,buttom:number = 0,right:number = 0):void
    {
        this._w = w;
        this._h = h;
        this._paddingLeft = left;
        this._paddingBottom = buttom;
        this._paddingRight = right;
        this._paddingTop = top;
        this._bg.skin = bgSkin;
        this._bar.skin = barSkin;
        this._bg.width = w;
        this._bg.height = h;
        this._label.width = w;
        this._label.height = h;
    }

    /**
     * 设置文本显示格式  
     * @param {number} [type=0] 0 不显示文本 1 显示文字 2 显示百分比 3 只显示当前值 4 悬浮显示文字
     * @param {number} [size=12]
     * @param {string} [color="0#ffffff"]
     * @param {number} [current=0]
     * @param {number} [max=0]
     * @memberof progressBar
     */
    public setLabel(type:number = 0,size:number = 12,color:string = "0#ffffff",current:number = 0,max:number = 100,stroke:number = 0 , strokeColor:string = "#000000"):void
    {
        var text:String = "";
        this._model = type;
        this._label.fontSize = size;

        if(color)
        {
            this._label.color = color;
        }
        if(stroke > 0)
        {
            this._label.stroke = stroke;
            this._label.strokeColor = strokeColor;
        }
        
        if(this._model == 4)  //类型为不显示数值
        {
            this._label.visible = false;
            this.on(Laya.Event.MOUSE_OVER,this,this.showText);
            this.on(Laya.Event.MOUSE_OUT,this,this.showText);
        }
        this.updateLableTxt(current,max);
    }

    public setValue(value:number,total:number):void
    {
        this.min = 0;
        this.max = total;
        this.value = value;
        this.updateLableTxt();
        this.draw();
    }

    public set Text(text:string)
    {
        if(this._label)
        this._label.text = text;
    }

    private showText(e:any):void
    {
        if(e.type == Laya.Event.MOUSE_OVER)
        {
            this._label.visible = true;
        }
        else if(e.type == Laya.Event.MOUSE_OUT)
        {
            this._label.visible = false;
        }
    }

    public set min(value:number)
    {
        this._min = value;
    }

    public set max(value:number)
    {
        this._max = value;
    }

    public get min():number
    {
        return this._min;
    }

    public get max():number
    {
        return this._max;
    }
    public set value(newValue:number)
    {
        newValue = this.clamp(newValue, this._min, this._max);
        this._value = newValue;
    }

    public get value():number
    {
        return this._value;
    }

    public get width():number
    {
        return this._w;
    }

    public get height():number
    {
        return this._h;
    }

    private clamp(value:number, minimum:number, maximum:number):number
	{
		if(minimum > maximum)
		{
			return;
		}
		if(value < minimum)
		{
			value = minimum;
		}
		else if(value > maximum)
		{
			value = maximum;
		}
		return value;
    }

    protected draw():void
    {   
        this.layoutChildren();
    }

	private targetPercentage:number=1;

    protected layoutChildren():void
    {
        if(this._max == 0)
        {
            this.targetPercentage = 0;
        }
        else if(this._min === this._max)
        {
            this.targetPercentage = 1;
        }
        else
        {
            this.targetPercentage = (this._value - this._min) / (this._max - this._min);
            if(this.targetPercentage < 0)
            {
                this.targetPercentage = 0;
            }
            else if(this.targetPercentage > 1)
            {
                this.targetPercentage = 1;
            }
        }
        
        this.updatePercent(this.targetPercentage);
    }

    public updatePercent(value:number):void
    {
        if(!this._bar)
        {
            return;
        }
        
        this.updateFillSkin(value);
    }

    protected updateFillSkin(percentage:number):void
    {
        var num:number=this.width-this._paddingLeft-this._paddingRight;
        num<0 && (num=0);
        this._bar.width = Math.round(percentage * num);
        num = this.height-this._paddingTop-this._paddingBottom;
        num<0 && (num=0);
        this._bar.height=num;
        this._bar.x = this._paddingLeft;
        this._bar.y = this._paddingTop;
        if(this._node)//注意这个node锚点要中心点才行
        {
            this._node.x = this._bar.x + this._bar.width;
            this._node.y = this._bar.y+this._bar.height/2;
        }
    }

    public updateLableTxt(current:number = 0,max:number = 0):void
    {
        var text:string="";
        switch(this._model)
        {
            case 0:
                this._label.visible = false;
                break;
            case 1:
                text = this.value + "/" + this._max;
                this._label.visible = true;
                break;
            case 2:
                text = Math.ceil(this.value /this._max * 100) + "%";
                this._label.visible = true;
                break;
            case 3:
                text = this.value.toString();
                this._label.visible = true;
                text = this.value + "/" + this._max;
                break;
            case 4:
                text = this.value + "/" + this._max;
                break;
            
        }
        this._label.text = text;
    }
    
    /**
     * 释放所有对象和置空 
     * @param isReuse
     * 
     */		
    public removeSelf():any
    {
        this._model = 0;
        this._bg.removeSelf();
        this._bg = null;
        this._bar.removeSelf();
        this._bar = null;
        this._min = 0;
        this._max = 100;
        this._value = 0;
        this._paddingLeft = 0;
        this._paddingBottom = 0;
        this._paddingRight = 0;
        this._paddingTop = 0;
        this._w = 0;
        this._h = 0;
        this.targetPercentage = 0;
        super.removeSelf();
    }
    
}