import { SheetManager } from "../SheetManager";
import { AEROCRAFT_FLY_BASE } from "../base/AEROCRAFT_FLY_BASE";

export class Aerocraft_flyVo extends AEROCRAFT_FLY_BASE{

   public static get(id : number,index : number = -1):Aerocraft_flyVo{
           if(this[id])return this[id];
           var vo : Aerocraft_flyVo = new Aerocraft_flyVo();
             this[id] = vo;
           return SheetManager.get("aerocraft_fly",id,this[id],vo.keys(),index);
    }
}