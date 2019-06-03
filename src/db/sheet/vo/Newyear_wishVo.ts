import { SheetManager } from "../SheetManager";
import { NEWYEAR_WISH_BASE } from "../base/NEWYEAR_WISH_BASE";

export class Newyear_wishVo extends NEWYEAR_WISH_BASE{

   public static get(id : number,index : number = -1):Newyear_wishVo{
           if(this[id])return this[id];
           var vo : Newyear_wishVo = new Newyear_wishVo();
             this[id] = vo;
           return SheetManager.get("newyear_wish",id,this[id],vo.keys(),index);
    }
}