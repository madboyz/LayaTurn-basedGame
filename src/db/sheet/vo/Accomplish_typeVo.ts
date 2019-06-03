import { SheetManager } from "../SheetManager";
import { ACCOMPLISH_TYPE_BASE } from "../base/ACCOMPLISH_TYPE_BASE";

export class Accomplish_typeVo extends ACCOMPLISH_TYPE_BASE{

   public static get(id : number,index : number = -1):Accomplish_typeVo{
           if(this[id])return this[id];
           var vo : Accomplish_typeVo = new Accomplish_typeVo();
             this[id] = vo;
           return SheetManager.get("accomplish_type",id,this[id],vo.keys(),index);
    }
}