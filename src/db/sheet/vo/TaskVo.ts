import { SheetManager } from "../SheetManager";
import { TASK_BASE } from "../base/TASK_BASE";

export class TaskVo extends TASK_BASE{

   public static get(id : number,index : number = -1):TaskVo{
           if(this[id])return this[id];
           var vo : TaskVo = new TaskVo();
             this[id] = vo;
           return SheetManager.get("task",id,this[id],vo.keys(),index);
    }
    /**
     * 根据任务类型获得第一个taskvo
     * @param type 
     */
    public static getTaskByTaskType(type:number):TaskVo
    {
      var vo:TaskVo = null;
      var list: any = SheetManager.getList("task");
      for (var key in list) {
        if(key != null)
        {
          var data = this.get(parseInt(key));
          if(data != null && data.type == type)
          {
            vo = data;
            break;
          }
        }
      }
      return vo;
    }
}