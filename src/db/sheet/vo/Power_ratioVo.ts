import { SheetManager } from "../SheetManager";
import { POWER_RATIO_BASE } from "../base/POWER_RATIO_BASE";

export class Power_ratioVo extends POWER_RATIO_BASE{

   public static get(id : number,index : number = -1):Power_ratioVo{
           if(this[id])return this[id];
           var vo : Power_ratioVo = new Power_ratioVo();
             this[id] = vo;
           return SheetManager.get("power_ratio",id,this[id],vo.keys(),index);
    }
}