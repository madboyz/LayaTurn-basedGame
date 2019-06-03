import { SheetManager } from "../SheetManager";
import { PET_GROW_BASE } from "../base/PET_GROW_BASE";

export class Pet_growVo extends PET_GROW_BASE{

   public static get(id : number,index : number = -1):Pet_growVo{
           if(this[id])return this[id];
           var vo : Pet_growVo = new Pet_growVo();
             this[id] = vo;
           return SheetManager.get("pet_grow",id,this[id],vo.keys(),index);
    }
}