import { SheetManager } from "../SheetManager";
import { MALL_DISCOUNT_BASE } from "../base/MALL_DISCOUNT_BASE";

export class Mall_discountVo extends MALL_DISCOUNT_BASE{

   public static get(id : number,index : number = -1):Mall_discountVo{
           if(this[id])return this[id];
           var vo : Mall_discountVo = new Mall_discountVo();
             this[id] = vo;
           return SheetManager.get("mall_discount",id,this[id],vo.keys(),index);
    }
}