import { SheetManager } from "../SheetManager";
import { TASK_EVENT_BASE } from "../base/TASK_EVENT_BASE";

export class Task_eventVo extends TASK_EVENT_BASE{

   public static get(id : number,index : number = -1):Task_eventVo{
           if(this[id])return this[id];
           var vo : Task_eventVo = new Task_eventVo();
             this[id] = vo;
           return SheetManager.get("task_event",id,this[id],vo.keys(),index);
    }
}