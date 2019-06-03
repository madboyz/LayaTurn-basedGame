import { SheetManager } from "../SheetManager";
import { DECOMPOSE_BASE_BASE } from "../base/DECOMPOSE_BASE_BASE";

export class Decompose_baseVo extends DECOMPOSE_BASE_BASE{

   public static get(id : number,index : number = -1):Decompose_baseVo{
           if(this[id])return this[id];
           var vo : Decompose_baseVo = new Decompose_baseVo();
             this[id] = vo;
           return SheetManager.get("decompose_base",id,this[id],vo.keys(),index);
    }
}