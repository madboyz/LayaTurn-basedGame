import { StrengthEquipPart } from "../../Strength/panel/StrengthEquipPart";
import { ToolTipSmellEquip } from "../../../../../compent/ToolTipSmellEquip";
import { RefineEquipItem } from "../item/RefineEquipItem";
import { ItemData } from "../../../../../compent/data/ItemData";
import { RolePackCache } from "../../../../bag/cache/RolePackCache";
import { RefineInfo } from "../../../../../compent/data/RefineInfo";
import { SBagData } from "../../../../../../../net/data/SBagData";
import { SForgingData } from "../../../../../../../net/data/SForgingData";

export class RefineEquipPart extends StrengthEquipPart{
    constructor() {
        super();
    }

    //更新装备数据
    public updateAllEquip():void
	{
        var len:number = this._equipmentList.length;
        var item:RefineEquipItem;
        var goods:ItemData;
        var roleEquipdata:RolePackCache;
        var strengthInfo:RefineInfo;
        roleEquipdata = SBagData.instance.role;
        for(var i:number = 0 ; i < len ; i++)  //i代表类型
        {
            item = this._equipmentList[i];
            if(item)
            {
                strengthInfo = SForgingData.instance.getRefineInfoByPos(item.slot);
                if(strengthInfo.StrLv >= 1)
                {
                    item.setStrengthLv("+" + strengthInfo.StrLv,"#4e17cd");
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