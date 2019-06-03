import { MallVo } from "../../../../../db/sheet/vo/MallVo";

export class ShopTabItem extends ui.main.ShopTabItemUI{
    constructor() {
        super();
    }

    private mData:number;

    public set dataSource(data:number)
    {
        if(!data) return;
        this.mData = data;
        if(this.mData == 1)
        {
            this.btn.label = "元宝\n商店";
        }
        else if(this.mData == 2)
        {
            this.btn.label = "绑元\n商店";
        }
        else if(this.mData == 3)
        {
            this.btn.label = "好友\n商店";
        }
        else if(this.mData == 4)
        {
            this.btn.label = "装备\n商店";
        }
        else if(this.mData == 5)
        {
            this.btn.label = "竞技\n商店";
        }
        else if(this.mData == 6)
        {
            this.btn.label = "伙伴\n商店";
        }
        else if(this.mData == 7)
        {
            this.btn.label = "帮派\n商店";
        }
    }

    public set IsSelect(vale:boolean)
    {
        this.btn.selected = vale;
    }

    public get dataSource():number
    {
        return this.mData;
    }
}