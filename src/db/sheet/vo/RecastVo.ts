import { SheetManager } from "../SheetManager";
import { RECAST_BASE } from "../base/RECAST_BASE";

export class RecastVo extends RECAST_BASE{

   public static get(id : number,index : number = -1):RecastVo{
           if(this[id])return this[id];
           var vo : RecastVo = new RecastVo();
             this[id] = vo;
           return SheetManager.get("recast",id,this[id],vo.keys(),index);
    }
}