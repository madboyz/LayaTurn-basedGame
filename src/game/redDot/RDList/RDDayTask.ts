import { SActiveRewardData } from "../../ui/view/dayReward/data/SActiveRewardData";
import { RedDotBase } from "../RedDotBase";
import { STaskData } from "../../task/STaskData";
import { TaskType, Task, TaskState } from "../../task/Task";

export class RDDayTask extends RedDotBase {

    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_DAY_TASK)) {
            return false;
        }
        var taskTypeList = [TaskType.TASK_DAILY_ON_HOOK_TYPE, TaskType.TASK_DAILY_BOSS_TYPE, TaskType.TASK_DAILY_DUN_TYPE, TaskType.TASK_DAILY_ARENA_TYPE, TaskType.BAOTU];
        for (let i = 0; i < taskTypeList.length; i++) {
            var taskType = taskTypeList[i];
            var task: Task = STaskData.instance.CurrentTaskDic.get(taskType);
            if (!task) {
                continue;
            }
            if (task.State != TaskState.TASK_FINISH /**&& task.CurrentNum == task.TotalNum*/) {
                return true;
            }
        }
        return false;
    }
}
