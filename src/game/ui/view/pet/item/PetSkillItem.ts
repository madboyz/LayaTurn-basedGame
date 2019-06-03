import { BaseItem } from "../../../compent/BaseItem";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { ToolTipsPetSkill } from "../../../compent/ToolTipsPetSkill";

export class PetSkillItem extends BaseItem {
    private _info:SkillVo;
    constructor() {
        super();
    }

    public initComp():void
    {
        super.initComp();
    }

    public set info(value:SkillVo)
    {
        this._info = value;
        this.updateSkillIcon();
    }

    public get info():SkillVo
    {
        return this._info;
    }

    protected updateSkillIcon():void
    {
        if(this._info)
        {
            this.setSource(this._info.icon);
            this.bgName = ResUtils.getItemBase("skillBg_" + this._info.quality);
        }
        else
        {
            this.bgName = ResUtils.getItemBase("skillBg_default");
            if(this._bitmap)
            {
                this._bitmap.skin = "";
            }
        }
    }


    public set renderClass(value:any){
        this._renderClass = value
    }

    public get renderClass():any
    {
        return this._renderClass || ToolTipsPetSkill;
    }


    /**
     * 设置资源
     * @param value 资源icon或者image
     *
     */
    public setSource(value:any):void
    {
        //移除之前加载的
        if(value instanceof Laya.Image)
        {
            if(this._bitmap)
            {
                this._bitmap.destroy();
                this._bitmap = null;
            }
            this._bitmap = value;
            this.updateViewSize();
            return;
        }
        else
        {
            this._bitmap && (this._bitmap.skin = ResUtils.getSkillIcon(value));
            this.updateViewSize();
            return;
        }
    }

    public dispose():void
    {
        this._bitmap.offAll();
        this._bottomLayer.offAll();
        this._middleLayer.offAll();
        this._topLayer.offAll();
        if(this._bitmap)
        {
            this._bitmap.destroy();
            this._bitmap = null;
        }
        if(this._bg)
        {
            this._bg.destroy();
            this._bg = null;
        }

        if(this._amountLabel)
        {
            this._amountLabel.destroy();
            this._amountLabel = null;
        }

        if(this._amountBg)
        {
            this._amountBg.destroy();
            this._amountBg = null;
        }

        if(this._bottomLayer)
        {
            this._bottomLayer.destroy();
            this._bottomLayer = null;
        }

        if(this._topLayer)
        {
            this._topLayer.destroy();
            this._topLayer = null;
        }

        if(this._middleLayer)
        {
            this._middleLayer.destroy();
            this._middleLayer = null;
        }
        if(this._job)
        {
            this._job.destroy();
            this._job = null;
        }
        if(this._txt)
        {
            this._txt.destroy();
            this._txt = null;
        }
        this.setSource(null);
        this._bgName = null;
        this._itemData = null;
        this._paddingTop = 6;
        this._paddingLeft = 6;
        this._amount = 0;
        this._isShowToolTip = false;
        this._tooltipData = null;
        this.offAll();
        this.removeSelf();
    }

    
    /**
     * 重写为了改变技能的底板
     */
    public setItemStyle(itemStyleConst:any = 70, bgName:String = "itemBase/skillBg_default.png", paddingTop:any = 5, paddingLeft:any = 5):void {
        super.setItemStyle(itemStyleConst,bgName,paddingTop,paddingLeft)
    }
}