import { SheetManager } from "../SheetManager";
import { LABA_BASE } from "../base/LABA_BASE";

export class LabaVo extends LABA_BASE{

   public static get(id : number,index : number = -1):LabaVo{
           if(this[id])return this[id];
           var vo : LabaVo = new LabaVo();
             this[id] = vo;
           return SheetManager.get("laba",id,this[id],vo.keys(),index);
    }
}