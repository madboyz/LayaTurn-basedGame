import { TASK_BASE } from "../../db/sheet/base/TASK_BASE";
import { TaskVo } from "../../db/sheet/vo/TaskVo";
import { S30002_1_1, S30002_1 } from "../../net/pt/pt_30";
import { SAoiData, SAoiEvent } from "../aoi/SAoiData";
import { SRoleData } from "../../net/data/SRoleData";
import { HtmlUtils } from "../utils/HtmlUtils";
import { AwardUtil } from "../award/AwardUtil";
import { SChapterData } from "../chapter/SChapterData";
import { MsgManager } from "../ui/manager/MsgManager";
import { SMachineData, SMachineEvent } from "../machine/SMachineData";
import { FucManager } from "../ui/manager/FucManager";
import { Chapter_cfgVo } from "../../db/sheet/vo/Chapter_cfgVo";

export enum TaskState {
    TASK_TRIGGER = 1,       //可见的任务
    TASK_CAN_ACCEPT = 3,    //可接的任务
    TASK_ACCEPTED = 7,      //已接的任务
    TASK_FAIL = 15,         //失败的任务
    TASK_COMPLETED = 23,    //完成的任务
    TASK_FINISH = 9999,     //已领奖（已提交）
}

export enum TaskType {
    MAIN = 0,//主线
    BRANCH = 1,//支线
    GUILD = 3,//帮派
    BAOTU = 7,//宝图任务
    HOLD = 8,//挂机
    TASK_DAILY_ON_HOOK_TYPE = 20,//日常野外挂机任务
    TASK_DAILY_BOSS_TYPE = 21,//日常BOSS任务
    TASK_DAILY_DUN_TYPE = 22,//日常副本任务
    TASK_DAILY_ARENA_TYPE = 23,//日常竞技任务
}

export class Task {
    public TaskId = 0;
    public State: TaskState = TaskState.TASK_CAN_ACCEPT;
    public SheetData: TASK_BASE = null;
    public SubTask: any[]; //自任务状态结构是这样{Isfinish:false , TotalNum:0 , CurrentNum:0};
    public starLv: number;//任务的星级（只有宝图任务有星级）
    public leftTime: number;//任务的剩余次数（只有宝图任务有）
    constructor(taskId: number) {
        this.TaskId = taskId;
        this.SheetData = TaskVo.get(taskId);
    }
    /**
     * 是否为主线任务
     */
    public get IsMainTask(): boolean {
        if (!this.SheetData)
            return false;

        return this.SheetData.type == TaskType.MAIN;
    }

    public get TotalNum(): number {
        var num: number = 0;
        if (!this.SubTask)
            return num;

        if (this.SubTask.length > 0) {
            const item = this.SubTask[0];
            num = item.TotalNum;
        }
        return num;
    }

    public GetAwardDesc(fontsize: number, color: string): string {
        var str = "";
        if (this.SheetData != null) {
            if (this.SheetData.reward.length > 0 && SRoleData.instance.info) {
                var awardId = this.SheetData.reward[0];
                var goodslist = AwardUtil.GetNormalGoodsList(awardId, false);
                var expStr = AwardUtil.GetAwardExpDesc(awardId);
                if (goodslist.length > 0) {
                    var countStr = GMath.GetChineseNumber(goodslist[0].Count);
                    if (expStr == "") {
                        str = HtmlUtils.addColor(`${goodslist[0].clientInfo.name}x${countStr}`, color, fontsize);
                    }
                    else {
                        str = HtmlUtils.addColor(`${goodslist[0].clientInfo.name}x${countStr}`, color, fontsize) + "<br>" + HtmlUtils.addColor(expStr, color, fontsize);;
                    }
                }
                else {
                    if (expStr != "")
                        str = HtmlUtils.addColor(expStr, color, fontsize);
                }
            }

        }
        return str;
    }

    public get CurrentNum(): number {
        var num: number = 0;
        if (!this.SubTask)
            return num;
        if (this.SubTask.length > 0) {
            const item = this.SubTask[0];
            num = item.CurrentNum;
        }
        return num;
    }

    public get IsComplete(): boolean {
        if (this.State == TaskState.TASK_COMPLETED)
            return false;
        if (!this.SubTask)
            return false;
        var count = 0;
        for (let i = 0; i < this.SubTask.length; i++) {
            if (this.SubTask[i].Isfinish == true) {
                count++;
            }
        }
        return count == this.SubTask.length;

    }

    public updateSheet() {
        this.SheetData = TaskVo.get(this.TaskId);
    }

    public updateSubTask(data: S30002_1_1) {
        if (!this.SubTask) {
            this.SubTask = new Array<any>();
        }
        else {
            this.SubTask = [];
        }
        if (data.tolNum != data.curNum && this.State == TaskState.TASK_FINISH) {
            this.State = TaskState.TASK_CAN_ACCEPT;
        }
        var sub = { Isfinish: data.state == 1 ? true : false, TotalNum: data.tolNum, CurrentNum: data.curNum };
        this.SubTask.push(sub);
    }

    //剩余次数相关信息
    public timeData: S30002_1;
    //任务的剩余次数（只有宝图任务有）
    public updateLeftTime(data: S30002_1): void {
        this.timeData = data;
        var ringCfg = this.SheetData.ring;
        this.leftTime = ringCfg[1] * ringCfg[3] - ((data.setp - 1) * ringCfg[3] + data.ring) + 1;
    }

    public doAction() {
        if (!this.SheetData)
            return;
        if (this.SheetData.content == null)
            return;
        if (this.SheetData.actionType == 2 && this.SheetData.action.length > 0) {
            FucManager.doCfgAction(this.SheetData.action);
        }
        else if (this.SheetData.actionType == 3 && this.SheetData.action.length > 0) {
            //从可以去的地图里面随机一个；
            var sceneList = (this.SheetData.action as Array<number>).concat();
            var randomScene = 0;
            var nowChapter = SChapterData.instance.chapter.chapterId;
            while (sceneList.length > 0) {
                var randomIndex = Math.floor(Math.random() * sceneList.length);
                var checkScene = sceneList[randomIndex];
                for (let i = 1; i <= nowChapter; i++) {
                    var chapterData = Chapter_cfgVo.get(i);
                    if(chapterData.scene_no == checkScene){
                        randomScene = chapterData.scene_no;
                        break;
                    }
                }
                if(randomScene != 0){
                    break;
                };
                sceneList.splice(randomIndex,1);
            };
            if(randomScene == 0){
                randomScene = 101;
            };
            SMachineData.instance.event(SMachineEvent.Start_Action_Machine, [randomScene, null, this, () => {
                SRoleData.instance.CanAutoMove = true;
                SMachineData.instance.event(SMachineEvent.Stop_Action_Machine);
            }]);
        }
        else {
            GameConfig.GAME_IS_OPEN_AUTO_ROLE = true;
        }

    }
}