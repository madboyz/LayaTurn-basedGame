import { SheetManager } from "../SheetManager";
import { HOLIDAY_ACTIVITY_BASE } from "../base/HOLIDAY_ACTIVITY_BASE";

export class Holiday_activityVo extends HOLIDAY_ACTIVITY_BASE{

   public static get(id : number,index : number = -1):Holiday_activityVo{
           if(this[id])return this[id];
           var vo : Holiday_activityVo = new Holiday_activityVo();
             this[id] = vo;
           return SheetManager.get("holiday_activity",id,this[id],vo.keys(),index);
    }
}