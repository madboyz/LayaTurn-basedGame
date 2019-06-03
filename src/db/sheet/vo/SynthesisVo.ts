import { SheetManager } from "../SheetManager";
import { SYNTHESIS_BASE } from "../base/SYNTHESIS_BASE";

export class SynthesisVo extends SYNTHESIS_BASE{

   public static get(id : number,index : number = -1):SynthesisVo{
           if(this[id])return this[id];
           var vo : SynthesisVo = new SynthesisVo();
             this[id] = vo;
           return SheetManager.get("synthesis",id,this[id],vo.keys(),index);
    }
}