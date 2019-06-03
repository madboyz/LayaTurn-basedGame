import { SheetManager } from "../SheetManager";
import { PET_EXP_LIMIT_BASE } from "../base/PET_EXP_LIMIT_BASE";

export class Pet_exp_limitVo extends PET_EXP_LIMIT_BASE{

   public static get(id : number,index : number = -1):Pet_exp_limitVo{
           if(this[id])return this[id];
           var vo : Pet_exp_limitVo = new Pet_exp_limitVo();
             this[id] = vo;
           return SheetManager.get("pet_exp_limit",id,this[id],vo.keys(),index);
    }
}