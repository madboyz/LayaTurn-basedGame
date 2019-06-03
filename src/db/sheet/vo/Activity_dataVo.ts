import { SheetManager } from "../SheetManager";
import { ACTIVITY_DATA_BASE } from "../base/ACTIVITY_DATA_BASE";

export class Activity_dataVo extends ACTIVITY_DATA_BASE{

   public static get(id : number,index : number = -1):Activity_dataVo{
           if(this[id])return this[id];
           var vo : Activity_dataVo = new Activity_dataVo();
             this[id] = vo;
           return SheetManager.get("activity_data",id,this[id],vo.keys(),index);
    }
}