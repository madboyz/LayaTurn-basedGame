import { SheetManager } from "../SheetManager";
import { CONSUMPTION_BASE } from "../base/CONSUMPTION_BASE";

export class ConsumptionVo extends CONSUMPTION_BASE{

   public static get(id : number,index : number = -1):ConsumptionVo{
           if(this[id])return this[id];
           var vo : ConsumptionVo = new ConsumptionVo();
             this[id] = vo;
           return SheetManager.get("consumption",id,this[id],vo.keys(),index);
    }
}