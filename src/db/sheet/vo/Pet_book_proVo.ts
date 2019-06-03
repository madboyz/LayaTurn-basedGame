import { SheetManager } from "../SheetManager";
import { PET_BOOK_PRO_BASE } from "../base/PET_BOOK_PRO_BASE";

export class Pet_book_proVo extends PET_BOOK_PRO_BASE{

   public static get(id : number,index : number = -1):Pet_book_proVo{
           if(this[id])return this[id];
           var vo : Pet_book_proVo = new Pet_book_proVo();
             this[id] = vo;
           return SheetManager.get("pet_book_pro",id,this[id],"no,max_slot,cur_p_skill_count,goods_list",index);
    }
}