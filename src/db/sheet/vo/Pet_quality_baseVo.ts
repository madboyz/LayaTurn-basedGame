import { SheetManager } from "../SheetManager";
import { PET_QUALITY_BASE_BASE } from "../base/PET_QUALITY_BASE_BASE";

export class Pet_quality_baseVo extends PET_QUALITY_BASE_BASE{

   public static get(id : number,index : number = -1):Pet_quality_baseVo{
           if(this[id])return this[id];
           var vo : Pet_quality_baseVo = new Pet_quality_baseVo();
             this[id] = vo;
           return SheetManager.get("pet_quality_base",id,this[id],vo.keys(),index);
    }
}