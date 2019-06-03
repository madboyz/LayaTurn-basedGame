import { SheetManager } from "../SheetManager";
import { PET_SHOULING_CFG_BASE } from "../base/PET_SHOULING_CFG_BASE";

export class Pet_shouling_cfgVo extends PET_SHOULING_CFG_BASE{

   public static get(id : number,index : number = -1):Pet_shouling_cfgVo{
           if(this[id])return this[id];
           var vo : Pet_shouling_cfgVo = new Pet_shouling_cfgVo();
             this[id] = vo;
           return SheetManager.get("pet_shouling_cfg",id,this[id],vo.keys(),index);
    }
}