import { SheetManager } from "../SheetManager";
import { ALLOT_ATTRS_BASE } from "../base/ALLOT_ATTRS_BASE";

export class Allot_attrsVo extends ALLOT_ATTRS_BASE{

   public static get(id : number,index : number = -1):Allot_attrsVo{
           if(this[id])return this[id];
           var vo : Allot_attrsVo = new Allot_attrsVo();
             this[id] = vo;
           return SheetManager.get("allot_attrs",id,this[id],vo.keys(),index);
    }
}