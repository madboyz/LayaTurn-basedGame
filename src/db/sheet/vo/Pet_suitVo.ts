import { SheetManager } from "../SheetManager";
import { PET_SUIT_BASE } from "../base/PET_SUIT_BASE";

export class Pet_suitVo extends PET_SUIT_BASE{

   public static get(id : number,index : number = -1):Pet_suitVo{
           if(this[id])return this[id];
           var vo : Pet_suitVo = new Pet_suitVo();
             this[id] = vo;
           return SheetManager.get("pet_suit",id,this[id],vo.keys(),index);
    }
}