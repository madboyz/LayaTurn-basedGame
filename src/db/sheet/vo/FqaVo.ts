import { SheetManager } from "../SheetManager";
import { FQA_BASE } from "../base/FQA_BASE";

export class FqaVo extends FQA_BASE{

   public static get(id : number,index : number = -1):FqaVo{
           if(this[id])return this[id];
           var vo : FqaVo = new FqaVo();
             this[id] = vo;
           return SheetManager.get("fqa",id,this[id],vo.keys(),index);
    }
}