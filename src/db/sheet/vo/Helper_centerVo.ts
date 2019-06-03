import { SheetManager } from "../SheetManager";
import { HELPER_CENTER_BASE } from "../base/HELPER_CENTER_BASE";

export class Helper_centerVo extends HELPER_CENTER_BASE{

   public static get(id : number,index : number = -1):Helper_centerVo{
           if(this[id])return this[id];
           var vo : Helper_centerVo = new Helper_centerVo();
             this[id] = vo;
           return SheetManager.get("helper_center",id,this[id],vo.keys(),index);
    }
}