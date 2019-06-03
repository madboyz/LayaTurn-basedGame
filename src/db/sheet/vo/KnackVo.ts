import { SheetManager } from "../SheetManager";
import { KNACK_BASE } from "../base/KNACK_BASE";

export class KnackVo extends KNACK_BASE{

   public static get(id : number,index : number = -1):KnackVo{
           if(this[id])return this[id];
           var vo : KnackVo = new KnackVo();
             this[id] = vo;
           return SheetManager.get("knack",id,this[id],vo.keys(),index);
    }
}