import { SheetManager } from "../SheetManager";
import { NATURE_BASE } from "../base/NATURE_BASE";

export class NatureVo extends NATURE_BASE{

   public static get(id : number,index : number = -1):NatureVo{
           if(this[id])return this[id];
           var vo : NatureVo = new NatureVo();
             this[id] = vo;
           return SheetManager.get("nature",id,this[id],vo.keys(),index);
    }
}