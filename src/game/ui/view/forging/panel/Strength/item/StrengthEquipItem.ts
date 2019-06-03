import { BaseItem } from "../../../../../compent/BaseItem";

export class StrengthEquipItem extends BaseItem{
    public _type:number;
    private _slot:number;
    private _strBg:Laya.Image;
    private _strTxt:Laya.Text;
    constructor() {
        super();
    }

    public set type(value:number)
    {
        this._type = value;
    }
    public get type():number
    {
         return this._type;
    }

    public set slot(value:number)
    {
        this._slot = value;
    }
    public get slot():number
    {
         return this._slot;
    }

    /**
     * 设置数量标签显示内容
     * @param str 内容
     * @param size 文字大小
     * @param strokeColor 描边颜色
     * @param isHtml 是否html文字
     *
     */
    public  setStrengthLv(str:string, color:string, size:any = 18, strokeColor:any = "#000000"):void
    {
        if(str)
        {
            if(this._strTxt == null)
            {
                this._strBg = new Laya.Image();
                this._strBg.skin = ResUtils.getCompUIUrl("img_di2");
                this._topLayer.addChild(this._strBg);

                this._strTxt = new Laya.Text();
                this._strTxt.fontSize = size;
                this._strTxt.color = color;
                this._strTxt.align = "right";
                this._strTxt.valign = "middle";
                if(strokeColor != "#000000")
                {
                    this._strTxt.stroke = 2;
                    this._strTxt.strokeColor = strokeColor;
                }
                else
                {
                    this._strTxt.stroke = 0;
                }
                this._strTxt.height = size;
                this._topLayer.addChild(this._strTxt);
            }

            this._strTxt.text = str;
            this._strBg.width = this._strTxt.textWidth;
            this._strTxt.width = this._strBg.width;
            this._strBg.x = this.width - this._strBg.width;
            this._strTxt.x = this._strBg.x;
            this._strTxt.y = this._strBg.y;
        }
        else
        {
            if(this._strTxt)
            {
                this._strTxt.destroy();
                this._strTxt = null;
            }

            if(this._strBg)
            {
                this._strBg.destroy();
                this._strBg = null;
            }
        }
    }

    public updateViewSize():void
    {
        super.updateViewSize();
    }

    public dispose():void
    {
        this._type = -1;
        super.dispose();
    }
}