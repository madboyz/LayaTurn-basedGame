import { SheetManager } from "../SheetManager";
import { HELPER_BASE } from "../base/HELPER_BASE";

export class HelperVo extends HELPER_BASE{

   public static get(id : number,index : number = -1):HelperVo{
           if(this[id])return this[id];
           var vo : HelperVo = new HelperVo();
             this[id] = vo;
           return SheetManager.get("helper",id,this[id],vo.keys(),index);
    }
}