import { DataManager } from "../../message/manager/DataManager";
import { S30001_1, S30002_1, S30001, S30002, S30006, S30004, S30013, S30015, S30014, S30016 } from "../../net/pt/pt_30";
import { Task, TaskType, TaskState } from "./Task";
import { TaskUtil } from "./TaskUtil";
import { TaskProtocol } from "./protocol/TaskProtocol";
import { ConstVo } from "../../db/sheet/vo/ConstVo";
import { TaskVo } from "../../db/sheet/vo/TaskVo";
import { MsgManager } from "../ui/manager/MsgManager";
import { HtmlUtils } from "../utils/HtmlUtils";

export class STaskData extends Laya.EventDispatcher {
    public CurrentTaskDic: Laya.Dictionary = new Laya.Dictionary();//每个类型的任务只接取一个
    public protocol: TaskProtocol;
    constructor() {
        super();
        this.protocol = new TaskProtocol();
        //初始化设置任务key
        this.CurrentTaskDic.set(TaskType.MAIN, null);
        this.CurrentTaskDic.set(TaskType.GUILD, null);
        this.CurrentTaskDic.set(TaskType.BAOTU, null);
        this.CurrentTaskDic.set(TaskType.TASK_DAILY_ON_HOOK_TYPE, null);
        this.CurrentTaskDic.set(TaskType.TASK_DAILY_BOSS_TYPE, null);
        this.CurrentTaskDic.set(TaskType.TASK_DAILY_DUN_TYPE, null);
        this.CurrentTaskDic.set(TaskType.TASK_DAILY_ARENA_TYPE, null);

    }

    private static mInstance: STaskData;
    public static get instance(): STaskData {
        return this.mInstance || (this.mInstance = new STaskData);
    }

    public unRegisterEvent(): void {
        this.CurrentTaskDic.set(TaskType.MAIN, null);
        this.CurrentTaskDic.set(TaskType.GUILD, null);
        this.CurrentTaskDic.set(TaskType.BAOTU, null);
        this.CurrentTaskDic.set(TaskType.TASK_DAILY_ON_HOOK_TYPE, null);
        this.CurrentTaskDic.set(TaskType.TASK_DAILY_BOSS_TYPE, null);
        this.CurrentTaskDic.set(TaskType.TASK_DAILY_DUN_TYPE, null);
        this.CurrentTaskDic.set(TaskType.TASK_DAILY_ARENA_TYPE, null);
        DataManager.cancel(PROTOCOL.E30001, this, this.onS30001);//当前可接任务
        DataManager.cancel(PROTOCOL.E30002, this, this.onS30002);//已接任务
        DataManager.cancel(PROTOCOL.E30006, this, this.onS30006);
        DataManager.cancel(PROTOCOL.E30004, this, this.onS30004);
        DataManager.cancel(PROTOCOL.E30013, this, this.onS30013);
        DataManager.cancel(PROTOCOL.E30014, this, this.onS30014);
        DataManager.cancel(PROTOCOL.E30015, this, this.onS30015);
        DataManager.cancel(PROTOCOL.E30016, this, this.onS30016);
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E30001, this, this.onS30001);//当前可接任务
        DataManager.listen(PROTOCOL.E30002, this, this.onS30002);//已接任务
        DataManager.listen(PROTOCOL.E30006, this, this.onS30006);
        DataManager.listen(PROTOCOL.E30004, this, this.onS30004);
        DataManager.listen(PROTOCOL.E30013, this, this.onS30013);
        DataManager.listen(PROTOCOL.E30014, this, this.onS30014);
        DataManager.listen(PROTOCOL.E30015, this, this.onS30015);
        DataManager.listen(PROTOCOL.E30016, this, this.onS30016);
    }
    /**
     * 30001一定是客户端没有接取的任务
     * @param data 
     */
    private onS30001(data: S30001) {
        if (data.item_1.length == 0)
            return;
        for (let i = 0; i < this.CurrentTaskDic.keys.length; i++) {
            const taskType = this.CurrentTaskDic.keys[i];
            var getTask = TaskUtil.GetCurrentTaskData(data, taskType);
            if (getTask != null) {
                this.protocol.send30003(getTask.TaskId);
            }
        }
    }
    /**
     * 30002一定要在s30001才行
     * @param data 
     */
    private onS30002(data: S30002) {
        if (data.item_1.length == 0)
            return;
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            this.UpdateTask(item);
        }
        for (let i = TaskType.TASK_DAILY_ON_HOOK_TYPE; i <= TaskType.TASK_DAILY_ARENA_TYPE; i++) {
            var dayType = i;
            var task: Task = this.CurrentTaskDic.get(dayType);
            if (!task) {
                var vo = TaskVo.getTaskByTaskType(dayType);
                if (vo) {
                    this.protocol.send30014(vo.no);
                }
            }
        }
        //帮派任务也请求
        var dayType = TaskType.GUILD;
        var task: Task = this.CurrentTaskDic.get(dayType);
        if (!task) {
            var vo = TaskVo.getTaskByTaskType(dayType);
            if (vo) {
                this.protocol.send30014(vo.no);
            }
        }
        //宝图任务请求星级
        var taskType = TaskType.BAOTU;
        var task: Task = this.CurrentTaskDic.get(taskType);
        if (task) {
            this.protocol.send30016(task.TaskId);
        }
    }
    /**
     * 如果是日常任务就存起来
     * @param data 
     */
    private onS30014(data: S30014) {
        var vo = TaskVo.get(data.TaskId);
        if (!vo)
            return;
        if ((vo.type >= TaskType.TASK_DAILY_ON_HOOK_TYPE && vo.type <= TaskType.TASK_DAILY_ARENA_TYPE) && data.State == 3) {
            var task: Task = new Task(data.TaskId);
            task.State = TaskState.TASK_FINISH;
            this.CurrentTaskDic.set(vo.type, task);
        }
        //帮派任务，如果没有，就存进去
        var task: Task = this.CurrentTaskDic.get(TaskType.GUILD);
        if (vo.type == TaskType.GUILD && !task) {
            var task: Task = new Task(data.TaskId);
            task.State = TaskState.TASK_FINISH;
            this.CurrentTaskDic.set(vo.type, task);
        }

    }


    private onS30015(data: S30015) {
        var taskType = TaskUtil.getTaskTypeById(data.TaskId);
        if (taskType == TaskType.MAIN)
            this.CurrentTaskDic.set(taskType, null);
        //else if(taskType >= TaskType.TASK_DAILY_ON_HOOK_TYPE&&taskType <= TaskType.TASK_DAILY_ARENA_TYPE)
        //{
        //    var task:Task = this.CurrentTaskDic.get(taskType);
        //    task.State = TaskState.TASK_FINISH;
        //}
    }

    private onS30016(data: S30016) {
        var taskType = TaskUtil.getTaskTypeById(data.TaskId);
        var task: Task = this.CurrentTaskDic.get(taskType);
        task.starLv = data.Star;
        this.event(STaskEvent.TASK_UPDATE);
    }

    private onS30013(data: S30013) {
        //宝图任务请求星级
        var taskType = TaskUtil.getTaskTypeById(data.TaskId);
        if (taskType == TaskType.BAOTU) {
            this.protocol.send30016(data.TaskId);
        }
        //--------
        this.UpdateTask(data);
    }

    private onS30006(data: S30006) {
        this.UpdateTask(data);
        //宝图任务飘字
        var taskType = TaskUtil.getTaskTypeById(data.TaskId);
        if (taskType == TaskType.BAOTU || taskType == TaskType.GUILD) {
            var task: Task = this.CurrentTaskDic.get(taskType);
            var str = HtmlUtils.addColor(task.SheetData.name, "#ffffff", 20)
                + HtmlUtils.addColor(`(${task.CurrentNum}/${task.TotalNum})`, task.CurrentNum >= task.TotalNum ? "#00ff00" : "#ff0000", 20);
            MsgManager.instance.showRollTipsMsg(str);
        }
        this.event(STaskEvent.TASK_UPDATE_BY30006);
        //自动提交的任务，完成后，自动提交
        var task: Task = this.CurrentTaskDic.get(taskType);
        if (task && task.SheetData.finish_event.length > 0 && task.State != TaskState.TASK_FINISH && task.CurrentNum == task.TotalNum) {
            STaskData.instance.protocol.send30004(task.TaskId);
        }
    }

    private onS30004(data: S30004) {
        if (data.State == 1) {
            var taskType = TaskUtil.getTaskTypeById(data.TaskId);
            if (taskType == TaskType.MAIN) {
                this.CurrentTaskDic.set(taskType, null);
                this.event(STaskEvent.TASK_COMMIT_COMPLETE, [data.TaskId]);
            }
            else if (taskType >= TaskType.TASK_DAILY_ON_HOOK_TYPE && taskType <= TaskType.TASK_DAILY_ARENA_TYPE || taskType == TaskType.BAOTU) {
                var task: Task = this.CurrentTaskDic.get(taskType);
                task.State = TaskState.TASK_FINISH;
                this.event(STaskEvent.TASK_DAILY_COMMIT_COMPLETE, [data.TaskId]);
            }
            else if (taskType == TaskType.GUILD) {
                var task: Task = this.CurrentTaskDic.get(taskType);
                task.State = TaskState.TASK_FINISH;
                this.event(STaskEvent.TASK_GUILD_COMMIT_COMPLETE, [data.TaskId]);
            }
        }
        this.event(STaskEvent.TASK_UPDATE);
    }

    public getTaskQuickFinishMoney(taskType: number): any {
        var moneyData = null;
        var task: Task = this.CurrentTaskDic.get(taskType);
        if (task) {
            var vos: Array<any> = ConstVo.get("QUICK_FINISH_TASK_COSTS").val;
            for (let i = 0; i < vos.length; i++) {
                const element = vos[i];
                if (element[0] == taskType) {
                    moneyData = element[1][0];
                    break;
                }
            }
        }
        return moneyData;
    }

    private UpdateTask(data: any) {
        var taskType = TaskUtil.getTaskTypeById(data.TaskId);
        if (taskType != -1) {
            var task = this.CurrentTaskDic.get(taskType) as Task;
            if (task == null) {
                task = new Task(data.TaskId);
                this.CurrentTaskDic.set(taskType, task);
            }
            else {
                task.TaskId = data.TaskId;
                task.updateSheet();
            }

            for (let i = 0; i < data.item_1.length; i++) {
                var item1 = data.item_1[i];
                task.updateSubTask(item1);
            }
            //宝图任务,帮派任务（环任务）更新任务次数
            if ((taskType == TaskType.BAOTU || taskType == TaskType.GUILD) && task) {
                task.updateLeftTime(data);
            }
        }

        this.event(STaskEvent.TASK_UPDATE);
        this.checkTask();
    }

    private showed: boolean = false;
    private checkTask(): void {
        if (this.showed) {
            return;
        }
        var taskId = ConstVo.get("TIPS_PICTURE").val[0];
        var taskData: Task = this.CurrentTaskDic.get(TaskType.MAIN);
        if (taskData && taskData.TaskId == taskId) {
            this.showed = true;
            UIManager.instance.openUI(UIID.COM_SHOW_IMAGE, [ConstVo.get("TIPS_PICTURE").val[1]]);
        }

    }


    public get mainTaskIsComp(): boolean {
        var task = this.CurrentTaskDic.get(TaskType.MAIN);
        if (task && task.CurrentNum == task.TotalNum) {
            return true;
        }
        return false;
    }

}
export enum STaskEvent {
    TASK_UPDATE = "task_get_newTask",//任务更新
    TASK_UPDATE_BY30006 = "TASK_UPDATE_BY30006",//通过30006更新的任务
    TASK_RECEIVED_NEWTASK = "task_received_newTask",//领取一个新的任务
    TASK_COMMIT = "task_commit",//提交一个任务
    TASK_COMMIT_COMPLETE = "task_commit_complete",//提交任务成功
    TASK_DAILY_COMMIT_COMPLETE = "task_daily_commit_complete",//日常任务提交
    TASK_GUILD_COMMIT_COMPLETE = "task_guild_commit_complete",//帮派任务提交
}