import { SheetManager } from "../SheetManager";
import { CONST_BASE } from "../base/CONST_BASE";

export class ConstVo extends CONST_BASE{

   public static get(id : any,index : number = -1):ConstVo{
           if(this[id])return this[id];
           var vo : ConstVo = new ConstVo();
             this[id] = vo;
           return SheetManager.get("const",id,this[id],vo.keys(),index);
    }
}