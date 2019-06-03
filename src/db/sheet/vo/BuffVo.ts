import { SheetManager } from "../SheetManager";
import { BUFF_BASE } from "../base/BUFF_BASE";

export class BuffVo extends BUFF_BASE{

   public static get(id : number,index : number = -1):BuffVo{
           if(this[id])return this[id];
           var vo : BuffVo = new BuffVo();
             this[id] = vo;
           return SheetManager.get("buff",id,this[id],vo.keys(),index);
    }
}