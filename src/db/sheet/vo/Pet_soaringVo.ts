import { SheetManager } from "../SheetManager";
import { PET_SOARING_BASE } from "../base/PET_SOARING_BASE";

export class Pet_soaringVo extends PET_SOARING_BASE{

   public static get(id : number,index : number = -1):Pet_soaringVo{
           if(this[id])return this[id];
           var vo : Pet_soaringVo = new Pet_soaringVo();
             this[id] = vo;
           return SheetManager.get("pet_soaring",id,this[id],vo.keys(),index);
    }
}