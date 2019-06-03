import { SheetManager } from "../SheetManager";
import { PET_LEARN_BASE } from "../base/PET_LEARN_BASE";

export class Pet_learnVo extends PET_LEARN_BASE{

   public static get(id : number,index : number = -1):Pet_learnVo{
           if(this[id])return this[id];
           var vo : Pet_learnVo = new Pet_learnVo();
             this[id] = vo;
           return SheetManager.get("pet_learn",id,this[id],vo.keys(),index);
    }
}