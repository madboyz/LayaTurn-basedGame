import { BaseItem } from "../../../compent/BaseItem";
import { SBagData } from "../../../../../net/data/SBagData";

export class RoleEquipItem extends BaseItem{
    public _type:number;
    private _strBg:Laya.Image;
    private _strTxt:Laya.Text;
    private _refineBg:Laya.Image;
    private _refineTxt:Laya.Text;
    private _red:Laya.Image;
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

    public updateRed():void
    {
        if(SBagData.instance.equip.hasBatterEquipByType(this.type))
        {
            if(!this._red)
            {
                this._red = new Laya.Image();
                this._red.skin = ResUtils.getCompUIUrl("img_red");
                this._red.x = this.width - this._red.width;
                this._middleLayer.addChild(this._red);
            }
        }
        else
        {
            if(this._red)
            {
                this._red.removeSelf();
                this._red = null;
            }
        }
    }

    /**
     * 设置强化等级
     * @param str 内容
     * @param size 文字大小
     * @param strokeColor 描边颜色
     * @param isHtml 是否html文字
     *
     */
    public setStrengthLv(str:string, color:string, size:any = 18, strokeColor:any = "#000000"):void
    {
        if(str)
        {
            if(this._strTxt == null)
            {
                this._strBg = new Laya.Image();
                this._strBg.skin = ResUtils.getCompUIUrl("img_di2");
                this._middleLayer.addChild(this._strBg);

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
                this._middleLayer.addChild(this._strTxt);
            }

            this._strTxt.text = str;
            this._strBg.width = this._strTxt.textWidth;
            this._strTxt.width = this._strBg.width;
            this._strBg.x = 2;
            this._strBg.y = this.height - this._strBg.height;
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

    /**
     * 设置精炼等级
     * @param str 内容
     * @param size 文字大小
     * @param strokeColor 描边颜色
     * @param isHtml 是否html文字
     *
     */
    public setRefineLv(str:string, color:string, size:any = 18, strokeColor:any = "#000000"):void
    {
        if(str)
        {
            if(this._refineTxt == null)
            {
                this._refineBg = new Laya.Image();
                this._refineBg.skin = ResUtils.getCompUIUrl("img_di2");
                this._middleLayer.addChild(this._refineBg);

                this._refineTxt = new Laya.Text();
                this._refineTxt.fontSize = size;
                this._refineTxt.color = color;
                this._refineTxt.align = "right";
                this._refineTxt.valign = "middle";
                if(strokeColor != "#000000")
                {
                    this._refineTxt.stroke = 2;
                    this._refineTxt.strokeColor = strokeColor;
                }
                else
                {
                    this._refineTxt.stroke = 0;
                }
                this._refineTxt.height = size;
                this._middleLayer.addChild(this._refineTxt);
            }

            this._refineTxt.text = str;
            this._refineBg.width = this._refineTxt.textWidth;
            this._refineTxt.width = this._refineBg.width;
            this._refineBg.x = this.width - this._refineBg.width;
            this._refineBg.y = this.height - this._refineBg.height;
            this._refineTxt.x = this._refineBg.x;
            this._refineTxt.y = this._refineBg.y;
        }
        else
        {
            if(this._refineTxt)
            {
                this._refineTxt.destroy();
                this._refineTxt = null;
            }

            if(this._refineBg)
            {
                this._refineBg.destroy();
                this._refineBg = null;
            }
        }
    }

    /**
     * 清除数据
     */
    public clearData()
    {
        super.clearData();
        this.clearLv();
    }

    private clearLv():void
    {
        if(this._refineTxt)
        {
            this._refineTxt.removeSelf();
            this._refineTxt = null;
        }
        if(this._refineBg)
        {
            this._refineBg.removeSelf();
            this._refineBg = null;
        }

        if(this._strBg)
        {
            this._strBg.removeSelf();
            this._strBg = null;
        }
        if(this._strTxt)
        {
            this._strTxt.removeSelf();
            this._strTxt = null;
        }
    }

    public updateViewSize():void
    {
        super.updateViewSize();
    }

    public dispose():void
    {
        this._type = -1;
        this.clearLv();
        super.dispose();
    }
}