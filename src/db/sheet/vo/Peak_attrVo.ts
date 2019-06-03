import { SheetManager } from "../SheetManager";
import { PEAK_ATTR_BASE } from "../base/PEAK_ATTR_BASE";

export class Peak_attrVo extends PEAK_ATTR_BASE{

   public static get(id : number,index : number = -1):Peak_attrVo{
           if(this[id])return this[id];
           var vo : Peak_attrVo = new Peak_attrVo();
             this[id] = vo;
           return SheetManager.get("peak_attr",id,this[id],vo.keys(),index);
    }
}