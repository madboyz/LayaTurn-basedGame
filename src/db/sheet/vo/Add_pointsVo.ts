import { SheetManager } from "../SheetManager";
import { ADD_POINTS_BASE } from "../base/ADD_POINTS_BASE";

export class Add_pointsVo extends ADD_POINTS_BASE{

   public static get(id : number,index : number = -1):Add_pointsVo{
           if(this[id])return this[id];
           var vo : Add_pointsVo = new Add_pointsVo();
             this[id] = vo;
           return SheetManager.get("add_points",id,this[id],vo.keys(),index);
    }
}