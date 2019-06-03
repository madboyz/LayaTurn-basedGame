import { SheetManager } from "../SheetManager";
import { DECOMPOSE_ADD_BASE } from "../base/DECOMPOSE_ADD_BASE";

export class Decompose_addVo extends DECOMPOSE_ADD_BASE{

   public static get(id : number,index : number = -1):Decompose_addVo{
           if(this[id])return this[id];
           var vo : Decompose_addVo = new Decompose_addVo();
             this[id] = vo;
           return SheetManager.get("decompose_add",id,this[id],vo.keys(),index);
    }
}