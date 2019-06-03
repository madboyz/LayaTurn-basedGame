import { SheetManager } from "../SheetManager";
import { PET_ABL_LINK_BASE } from "../base/PET_ABL_LINK_BASE";

export class Pet_abl_linkVo extends PET_ABL_LINK_BASE{

   public static get(id : number,index : number = -1):Pet_abl_linkVo{
           if(this[id])return this[id];
           var vo : Pet_abl_linkVo = new Pet_abl_linkVo();
             this[id] = vo;
           return SheetManager.get("pet_abl_link",id,this[id],vo.keys(),index);
    }
}