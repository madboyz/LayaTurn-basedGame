import { SheetManager } from "../SheetManager";
import { PEAK_ATTR_EXCHANGE_BASE } from "../base/PEAK_ATTR_EXCHANGE_BASE";

export class Peak_attr_exchangeVo extends PEAK_ATTR_EXCHANGE_BASE{

   public static get(id : number,index : number = -1):Peak_attr_exchangeVo{
           if(this[id])return this[id];
           var vo : Peak_attr_exchangeVo = new Peak_attr_exchangeVo();
             this[id] = vo;
           return SheetManager.get("peak_attr_exchange",id,this[id],vo.keys(),index);
    }
}