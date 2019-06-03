import { SheetManager } from "../SheetManager";
import { HOLIDAY_BASE } from "../base/HOLIDAY_BASE";

export class HolidayVo extends HOLIDAY_BASE{

   public static get(id : number,index : number = -1):HolidayVo{
           if(this[id])return this[id];
           var vo : HolidayVo = new HolidayVo();
             this[id] = vo;
           return SheetManager.get("holiday",id,this[id],vo.keys(),index);
    }
}