import { SheetManager } from "../SheetManager";
import { TASK_CLIENT_SHOW_BASE } from "../base/TASK_CLIENT_SHOW_BASE";

export class Task_client_showVo extends TASK_CLIENT_SHOW_BASE{

   public static get(id : number,index : number = -1):Task_client_showVo{
           if(this[id])return this[id];
           var vo : Task_client_showVo = new Task_client_showVo();
             this[id] = vo;
           return SheetManager.get("task_client_show",id,this[id],vo.keys(),index);
    }
}