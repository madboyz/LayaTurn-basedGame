import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { ItemData } from "../../../compent/data/ItemData";
import { BaseItem } from "../../../compent/BaseItem";

export class PetSkillSlotItem extends ui.main.PetlearnSkillItemUI{
    private item:BaseItem;
    constructor() {
        super();
        this.img_select.visible = false;
    }

    private showItem():void
    {
        if(!this.item)
        {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.addChild(this.item);
            this.item.x = 11;
            this.item.y = 9;
        }
        this.item.itemData = this.mData;
        this.item.toolTipData = this.mData; 
    }

    private mData:ItemData;

    public set dataSource(data:ItemData)
    {
        if(!data) return;
        this.mData = data;
        this.updateData();
    }

    private updateData():void
    {
        this.txt_name.text = this.mData.clientInfo.name;
        this.txt_desc.text = this.mData.EffectDesc;
        this.txt_desc.text = this.mData.EffectDesc;
        if(this.txt_desc.lines.length > 2)
        {
            this.txt_desc.text = this.mData.EffectDesc.substring(0,20) + "...";
        }
        this.showItem()
    }

    public checkSelect(data:any):void
    {
        if(this.mData && data)
        {
            if(this.mData.GoodsId == data.GoodsId)
            {
                this.isSelect = true;
            }
            else
            {
                this.isSelect = false;
            }
        }
    }

    public set isSelect(value:boolean)
    {
        this.img_select.visible = value
    }

    public get dataSource():ItemData
    {
        return this.mData;
    }
}