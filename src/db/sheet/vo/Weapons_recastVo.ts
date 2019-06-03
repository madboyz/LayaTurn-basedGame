import { SheetManager } from "../SheetManager";
import { WEAPONS_RECAST_BASE } from "../base/WEAPONS_RECAST_BASE";

export class Weapons_recastVo extends WEAPONS_RECAST_BASE{

   public static get(id : number,index : number = -1):Weapons_recastVo{
           if(this[id])return this[id];
           var vo : Weapons_recastVo = new Weapons_recastVo();
             this[id] = vo;
           return SheetManager.get("weapons_recast",id,this[id],vo.keys(),index);
    }
}