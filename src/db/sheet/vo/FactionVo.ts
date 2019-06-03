import { SheetManager } from "../SheetManager";
import { FACTION_BASE } from "../base/FACTION_BASE";

export class FactionVo extends FACTION_BASE{

   public static get(id : number,index : number = -1):FactionVo{
           if(this[id])return this[id];
           var vo : FactionVo = new FactionVo();
             this[id] = vo;
           return SheetManager.get("faction",id,this[id],vo.keys(),index);
    }
}