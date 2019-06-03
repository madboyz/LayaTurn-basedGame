import { SheetManager } from "../SheetManager";
import { FROM_SOURCE_BASE } from "../base/FROM_SOURCE_BASE";

export class From_sourceVo extends FROM_SOURCE_BASE{

   public static get(id : number,index : number = -1):From_sourceVo{
           if(this[id])return this[id];
           var vo : From_sourceVo = new From_sourceVo();
             this[id] = vo;
           return SheetManager.get("from_source",id,this[id],vo.keys(),index);
    }
}