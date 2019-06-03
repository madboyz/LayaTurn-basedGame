import { S30001, S30001_1 } from "../../net/pt/pt_30";
import { TaskVo } from "../../db/sheet/vo/TaskVo";
import { TaskType, Task } from "./Task";

export class TaskUtil{
    public static GetCurrentTaskData(data:S30001 , taksType:number):S30001_1
    {
        var dataTask:S30001_1 = null;
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var vo = TaskVo.get(item.TaskId);
            if(!vo)
            continue;
            if(vo.type == taksType)
            {
                dataTask = item;
                break;
            }
        }
        return dataTask
    }

    public static ParseTargetDesc(task: Task)
    {
        
        if(task.SheetData.content != null)
        {
            var action:string = task.SheetData.content[0];
            if(action == "kill")
            {
                
            }
        }
    }
    /**
     * 获得任务类型
     * @param taskId 
     */
    public static getTaskTypeById(taskId:number):number
    {
        var vo = TaskVo.get(taskId);
        if(!vo)
        return -1;
        else
        return vo.type;

    }

}