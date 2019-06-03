import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { ToolTipsEquipment } from "../../../compent/ToolTipsEquipment";
import { ToolTipsMountItem } from "../../../compent/ToolTipsMountItem";
import { ToolTipsBaseItem } from "../../../compent/ToolTipsBaseItem";

export class BackPackItem extends Laya.View
{
    private itemDatas:Array<BaseItem> = [];
    private line:Laya.Image;

    constructor()
    {
        super();
        this.init();
    }

    init():void
    {
        var item:BaseItem;
        for (let index = 0; index < 5; index++) {
            item = new BaseItem();
            item.setItemStyle(80);
            this.addChild(item);
            item.x = index*(item.width + 15);
            this.itemDatas.push(item);
        }
        this.line = new Laya.Image();
        this.addChild(this.line);
        this.line.skin = ResUtils.getCompUIUrl("img_di1");
        this.line.sizeGrid = "3,56,3,52";
        this.line.alpha = 0.3;
        this.line.width = 475;
        this.line.height = 7;
        this.line.y = 105;
        this.size(465, 105);
    }

    private mData:Array<ItemData>

    public set dataSource(data:Array<ItemData>)
    {
        if(!data) return;
        this.mData = data;
        this.setList(this.mData);
    }

    private setList(arr:Array<ItemData>):void
    {
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            this.setData(element,this.itemDatas[index]);
        }
    }

    private setData(data:ItemData,item:BaseItem):void
    {
        if(data)
        {
            item.itemData = data;
            item.toolTipData = data;
            if(data.Count > 1)
            {
                item.setAmountLabel("" + data.Count, "#4e17cd");
            }
            else
            {
                item.setAmountLabel("", "#4e17cd");
            }

            // if(data.clientInfo.type != GoodsType.EQUIP)
            // {
            //     item.showName(data.clientInfo.name, 16, "#76420b");
            //     item.renderClass = ToolTipsBagItem;
            // }
            // else
            // {
            //     item.showName(data.clientInfo.lv + "级", 16, "#76420b");
            //     item.renderClass = ToolTipsEquipment;
            // }
            if(data.IsRoleEquip){
                // item.showName(data.clientInfo.lv + "级", 16, "#76420b");
                item.showName(data.clientInfo.bag_show_lv, 16, "#76420b");
                item.renderClass = ToolTipsEquipment;
            }else if (data.IsOtherEquip){
                // item.showName(data.clientInfo.lv + "阶", 16, "#76420b");
                item.showName(data.clientInfo.bag_show_lv, 16, "#76420b");
                item.renderClass = ToolTipsEquipment;
            }else if (data.IsMount){
                item.showName(data.clientInfo.name, 16, "#76420b");
                item.renderClass = ToolTipsMountItem;
            }else{
                item.showName(data.clientInfo.name, 16, "#76420b");
                item.renderClass = ToolTipsBaseItem;
            }
        }
        else
        {
            item.itemData = null;
        }
    }

    public get dataSource():Array<ItemData>
    {
        return this.mData;
    }
}