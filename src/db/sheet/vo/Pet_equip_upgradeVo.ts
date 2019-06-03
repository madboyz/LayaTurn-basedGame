import { SheetManager } from "../SheetManager";
import { PET_EQUIP_UPGRADE_BASE } from "../base/PET_EQUIP_UPGRADE_BASE";

export class Pet_equip_upgradeVo extends PET_EQUIP_UPGRADE_BASE{

   public static get(id : number,index : number = -1):Pet_equip_upgradeVo{
           if(this[id])return this[id];
           var vo : Pet_equip_upgradeVo = new Pet_equip_upgradeVo();
             this[id] = vo;
           return SheetManager.get("pet_equip_upgrade",id,this[id],vo.keys(),index);
    }
}