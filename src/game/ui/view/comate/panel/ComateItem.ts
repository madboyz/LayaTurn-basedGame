import { ComateInfo } from "../data/ComateInfo";
import { CustomizeTexture } from "../../../../battle/scene/comp/CustomizeTexture";
import { SComateData } from "../data/SComateData";

export class ComateItem extends ui.main.ComateItemUI {
    
    constructor() {
        super();
        for (let i = 0; i < this.Stars._childs.length; i++) {
            const element = this.Stars.getChildByName(`star${i}`);
            this.starSImage.push(element);
        }
    }
    private starSImage = [];

    private mData:ComateInfo = null;
    private red:Laya.Image;

    public set dataSource(data:ComateInfo)
    {
        if(!data) return;
        this.mData = data;
        this.LoadIcon();
        this.InLine = this.mData.IsSet;
        this.SelectItem = false;
        this.UpdateStar();
        var skilName = ResUtils.getItemBase("equipBg_default");
        if(this.mData.Sheet.quality > 0)
        {
            skilName =  ResUtils.getItemBase(`equipBg_${this.mData.Sheet.quality}`);
        }
        this.QualityBg.skin = skilName;
       ;
    }

    public CheckInfoRed(bl:boolean):void
    {
        if(bl)
        {
            if(!this.red)
            {
                this.red = new Laya.Image();
                this.red.skin = ResUtils.getCompUIUrl("img_red");
                this.red.x = this.width - this.red.height + 8;
                this.red.y = -8;
                this.addChild(this.red);
            }
        }
        this.red && (this.red.visible = bl);
    }

    public set InLine(isIn:boolean)
    {
        this.SetBg.visible = isIn;
    }

    public UpdateStar()
    {
        var starLv = 0;
        if(this.mData == null)
        starLv = 0;
        else
        starLv = this.mData.StarLv;
        this.Stars.width = starLv*21*this.Stars.scaleX;
        for (let i = 0; i < this.starSImage.length; i++) {
            const star = this.starSImage[i];
            if(this.mData == null)
            {
                star.visible = false;
            }
            else
            {
                if(starLv > i)
                star.visible = true;
                else
                star.visible = false;
            }
        }
    }

    public get dataSource():ComateInfo
    {
        return this.mData;
    }

    private async LoadIcon() {
        var url: string = ResUtils.getCommonPng(this.mData.Sheet.head);
        var textrue = await CustomizeTexture.asyncGetTextureByUrl(url, this.mData.Id, this.icon.x, this.icon.y);
        if(! textrue||(textrue&&! textrue.texture))return;
        this.icon.texture = textrue.texture;
        this.gray = !this.mData.IsHave;
    }

    public checkSelect(info:ComateInfo)
    {
        if(this.mData&&info)
        {
            this.InLine = this.mData.IsSet;
            this.UpdateStar();
            if(info.No == this.mData.No)
            {
                this.SelectItem = true;
            }
            else
            {
                this.SelectItem = false;
            }
        }
        this.gray = !this.mData.IsHave;
    }

    public set SelectItem(select:boolean)
    {
        this.selectBg.visible = select;
    }

    public set gray(value:boolean)
    {
        if(value)
        {
            var GrayFilter:Laya.ColorFilter = new Laya.ColorFilter(ResUtils.colorMatrix);
            this.icon.filters = [GrayFilter];
        }
        else
        {
            this.icon.filters = [];
        }
    }
}