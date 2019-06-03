import { RoleEquipItem } from "./RoleEquipItem";
import { DisplayUtils } from "../../../../utils/DisplayUtils";
import { ItemData } from "../../../compent/data/ItemData";
import { SBagData } from "../../../../../net/data/SBagData";
import { RolePackCache } from "../../bag/cache/RolePackCache";
import { ToolTipsEquipment } from "../../../compent/ToolTipsEquipment";
import { StrengthInfo } from "../../../compent/data/StrengthInfo";
import { SForgingData } from "../../../../../net/data/SForgingData";
import { RefineInfo } from "../../../compent/data/RefineInfo";

export class RoleEquipPart extends Laya.Sprite {
    protected _equipmentList:Array<any>;
    protected _equipTypeList:Array<any>;
    constructor() {
        super();
        this.resetEquipListPos();
		this.createEquipList();
    }

    public resetEquipListPos():void
    {
        var leftX:number = 0;
			var rightX:number = 355;
			this._equipTypeList = [];
            this._equipTypeList[EquipSubType.EQ_POS1] = {x:leftX,y:0,type:EquipSubType.EQ_POS3}; //武器
            this._equipTypeList[EquipSubType.EQ_POS3] = {x:leftX,y:119,type:EquipSubType.EQ_POS4}; //衣服
            this._equipTypeList[EquipSubType.EQ_POS5] = {x:leftX,y:242,type:EquipSubType.EQ_POS1}; //项链
            
            this._equipTypeList[EquipSubType.EQ_POS2] = {x:rightX,y:0,type:EquipSubType.EQ_POS2}; //护腕
            this._equipTypeList[EquipSubType.EQ_POS4] = {x:rightX,y:119,type:EquipSubType.EQ_POS6}; //鞋子
            this._equipTypeList[EquipSubType.EQ_POS6] = {x:rightX,y:242,type:EquipSubType.EQ_POS5}; //腰带
    }

    public createEquipList():void
    {
        this._equipmentList = [];
        
        var len:number = this._equipTypeList.length;
        var equipItem:RoleEquipItem;
        for(var i:number=1 ; i < len; i++)
        {
            equipItem = new RoleEquipItem();
            equipItem.setItemStyle(80);
            equipItem.x = this._equipTypeList[i].x;
            equipItem.y = this._equipTypeList[i].y;
            equipItem.type = this._equipTypeList[i].type;
            equipItem.isShowJob = false;
            this.addChild(equipItem);
            this._equipmentList.push(equipItem);
        }
        this.updateAllEquip();
    }

    //更新装备数据
    public updateAllEquip():void
	{
        var len:number = this._equipmentList.length;
        var item:RoleEquipItem;
        var goods:ItemData;
        var roleEquipdata:RolePackCache;
        roleEquipdata = SBagData.instance.role;
        for(var i:number = 0 ; i < len ; i++)  //i代表类型
        {
            item = this._equipmentList[i];
            if(item)
            {
                if(roleEquipdata)
                {
                    goods = roleEquipdata.getItemBySubType(item.type);
                    if(goods)
                    {
                        if(goods.clientInfo)
                        {
                            item.itemData = goods;
                            item.showName("Lv." + goods.clientInfo.lv , 18, "#76420b");
                            item.renderClass = ToolTipsEquipment;
                            item.toolTipData = goods;
                            //强化，精炼等级不要了
                            // this.updateStrength(item);
                            // this.updateRefine(item);
                            item.updateRed();
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
                    // item.itemData = null;
                    item.clearData();
                }
            }
        }
    }

    private updateStrength(item:any):void
    {
        var strengthInfo:StrengthInfo;
        strengthInfo = SForgingData.instance.getStrengthInfoByPos(item.type);
        if(strengthInfo.StrLv >= 1)
        {
            item.setStrengthLv("+" + strengthInfo.StrLv,"#4e17cd");
        }
    }

    private updateRefine(item:any):void
    {
        var refineInfo:RefineInfo;
        refineInfo = SForgingData.instance.getRefineInfoByPos(item.type);
        if(refineInfo.StrLv >= 1)
        {
            item.setRefineLv("+" + refineInfo.StrLv,"#ed0000");
        }
    }

    public dispose():void
    {
        DisplayUtils.removeArray(this._equipmentList);
        DisplayUtils.removeArray(this._equipTypeList);
       this.removeSelf();
    }
}