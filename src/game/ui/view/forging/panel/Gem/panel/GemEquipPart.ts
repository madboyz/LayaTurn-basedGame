import { StrengthEquipPart } from "../../Strength/panel/StrengthEquipPart";
import { ItemData } from "../../../../../compent/data/ItemData";
import { RolePackCache } from "../../../../bag/cache/RolePackCache";
import { SBagData } from "../../../../../../../net/data/SBagData";
import { SForgingData } from "../../../../../../../net/data/SForgingData";
import { ToolTipSmellEquip } from "../../../../../compent/ToolTipSmellEquip";
import { GemEquipItem } from "../item/GemEquipItem";
import { GemInfo } from "../../../../../compent/data/GemInfo";

export class GemEquipPart extends StrengthEquipPart{
    constructor() {
        super();
    }

    //更新装备数据
    public updateAllEquip():void
	{
        var len:number = this._equipmentList.length;
        var item:GemEquipItem;
        var goods:ItemData;
        var roleEquipdata:RolePackCache;
        var strengthInfo:GemInfo;
        roleEquipdata = SBagData.instance.role;
        for(var i:number = 0 ; i < len ; i++)  //i代表类型
        {
            item = this._equipmentList[i];
            if(item)
            {
                strengthInfo = SForgingData.instance.getGemInfoByPos(item.slot);
                if(strengthInfo.level >= 1)
                {
                    item.setStrengthLv("+" + strengthInfo.level,"#4e17cd");
                }
                if(roleEquipdata)
                {
                    goods = roleEquipdata.getItemBySubType(item.type);
                    if(goods)
                    {
                        if(goods.clientInfo)
                        {
                            item.itemData = goods;
                            item.renderClass = ToolTipSmellEquip;
                            item.toolTipData = goods;
                        }
                        else
                        {
                            item.itemData = null;
                            item.clearData();
                        }
                    }
                    else
                    {
                        item.itemData = null;
                        item.clearData();
                    }
                }
                else
                {
                    item.itemData = null;
                    item.clearData();
                }
            }
        }
    }
}