import { SheetManager } from "../SheetManager";
import { PET_INTIMACY_BASE } from "../base/PET_INTIMACY_BASE";

export class Pet_intimacyVo extends PET_INTIMACY_BASE{

   public static get(id : number,index : number = -1):Pet_intimacyVo{
           if(this[id])return this[id];
           var vo : Pet_intimacyVo = new Pet_intimacyVo();
             this[id] = vo;
           return SheetManager.get("pet_intimacy",id,this[id],vo.keys(),index);
    }
}