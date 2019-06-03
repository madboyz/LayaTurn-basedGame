import { TabBar } from "../../../compent/TabBar";
import { RewardList } from "../../../compent/RewardList";
import { ProgressBar } from "../../../compent/ProgressBar";
import { Task, TaskType, TaskState } from "../../../../task/Task";
import { STaskData } from "../../../../task/STaskData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { Alert } from "../../../compent/Alert";
import { ItemData } from "../../../compent/data/ItemData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { MsgManager } from "../../../manager/MsgManager";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { SGameData } from "../../../../../net/data/SGameData";



export class DayTaskPanel extends ui.main.DayTaskPanelUI {
    private mTab: TabBar;
    private rewarldList: RewardList;
    private taskProgressBar: ProgressBar;
    private taskProgressText: Laya.Text;
    public curIndex: number = -1;
    private taskType: TaskType = TaskType.TASK_DAILY_ON_HOOK_TYPE;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public update(): void {
        this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        this.mTab.select = this.curIndex;
    }

    private initProgressBar(): void {
        this.taskProgressBar = new ProgressBar();
        this.taskProgressBar.setGrid("0,97,0,96", "11,24,8,26");
        this.taskProgressBar.setBg(ResUtils.getCompUIUrl("barbg14"), ResUtils.getCompUIUrl("bar14"), 400, 51, 42, 16, 9, 42);
        this.taskProgressBar.x = 89 - 87;
        this.taskProgressBar.y = 312 - 210;
        this.baseBox.addChild(this.taskProgressBar);
        this.taskProgressBar.setValue(10, 10);

        this.taskProgressText = new Laya.Text();
        this.taskProgressText.color = "#fdee01";
        this.taskProgressText.strokeColor = "#494414";
        this.taskProgressText.fontSize = 20;
        this.taskProgressText.width = 400;
        this.taskProgressText.height = 51;
        this.taskProgressText.align = "center";
        this.taskProgressText.valign = "middle";
        this.taskProgressText.x = 89 - 87;
        this.taskProgressText.y = 315 - 210;
        this.taskProgressText.stroke = 2;
        this.baseBox.addChild(this.taskProgressText);
        this.taskProgressText.text = "1/2";
    }

    private initList(): void {
        this.rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this.rewarldList.showNameNum = false;
        this.rewarldList.rowCount = 4;
        this.rewarldList.maxNum = 4;
        this.rewarldList.x = 125 - 87;
        this.rewarldList.y = 380 - 210;
        this.baseBox.addChild(this.rewarldList);
    }

    public initComp() {
        super.initComp();
        this.initProgressBar();
        this.initList();
        HtmlUtils.setHtml(this.taskDes.style, 6, 20, "left", "top");
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3, this.btn_4], [0, 0, 0, 0, UIID.SYS_DIG_TASK]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
        this.mTab.select = this.curIndex;
    }


    public open(...args): void {
        if (this.tabIndex != 0) {
            this.curIndex = this.tabIndex;
        } else {
            this.openTab();
        }
        if (this.mTab)
            this.mTab.select = this.curIndex;
        this.initWindow(true, true, "日常任务", 488, 516, 175);
        super.open();
    }

    public openTab(): void {
        var tabIndex = 0;
        var taskTypeList = [TaskType.TASK_DAILY_ON_HOOK_TYPE, TaskType.TASK_DAILY_BOSS_TYPE, TaskType.TASK_DAILY_DUN_TYPE, TaskType.TASK_DAILY_ARENA_TYPE, TaskType.BAOTU];
        for (let i = 0; i < taskTypeList.length; i++) {
            var taskType = taskTypeList[i];
            var task: Task = STaskData.instance.CurrentTaskDic.get(taskType);
            if (task && task.State != TaskState.TASK_FINISH && task.CurrentNum == task.TotalNum) {
                tabIndex = i;
                break;
            }
        }
        this.curIndex = tabIndex;
    }

    public initEvent(): void {
        this.quickBtn.on(Laya.Event.CLICK, this, this.onClickQuickBtn);
        this.gotoBtn.on(Laya.Event.CLICK, this, this.onClickGotoBtn);
        this.FinishBtn.on(Laya.Event.CLICK, this, this.onClickfinishBtn);
        this.refreshBtn.on(Laya.Event.CLICK, this, this.onClickRefreshBtn);
    }


    public removeEvent(): void {
        this.mTab.off(Laya.Event.CHANGE, this, this.onTabChange);
        this.quickBtn.off(Laya.Event.CLICK, this, this.onClickQuickBtn);
        this.gotoBtn.off(Laya.Event.CLICK, this, this.onClickGotoBtn);
        this.FinishBtn.off(Laya.Event.CLICK, this, this.onClickfinishBtn);
        this.refreshBtn.off(Laya.Event.CLICK, this, this.onClickRefreshBtn);
    }

    private onClickGotoBtn() {
        var task: Task = STaskData.instance.CurrentTaskDic.get(this.taskType);
        if (SGameData.instance.PLAYFIGHTREPORT && this.taskType == TaskType.BAOTU) {
            MsgManager.instance.showRollTipsMsg("战斗中无法切换场景");
            return;
        }
        if (task)
            task.doAction();
        this.close();
    }

    private onClickfinishBtn() {
        var task = STaskData.instance.CurrentTaskDic.get(this.taskType);
        if (task && task.State != TaskState.TASK_FINISH) {
            STaskData.instance.protocol.send30004(task.TaskId);
        }
    }

    private onClickRefreshBtn() {
        var task: Task = STaskData.instance.CurrentTaskDic.get(this.taskType);
        if (task && this.taskType == TaskType.BAOTU) {
            if (task.starLv >= 5) {
                MsgManager.instance.showRollTipsMsg("任务已达到满星，无需刷新");
                return;
            }
            //任务状态
            if (task && task.CurrentNum == task.TotalNum) {
                MsgManager.instance.showRollTipsMsg("该任务已完成，请先领取奖励");
                return;
            }
            var itemCfg = ConstVo.get("TASK_REFRESH_STAR_COSTS").val[0];
            var itemData = new ItemData(itemCfg[0]);
            var str: string = HtmlUtils.addColor("消耗", "#8a5428", 20) +
                HtmlUtils.addImage("art/item/" + itemData.clientInfo.icon.replace(".png", ""), 25, 25) +
                HtmlUtils.addColor(itemCfg[1], "#3f8f4f", 20) +
                HtmlUtils.addColor("进行一次任务星级刷新", "#8a5428", 20);
            Alert.show(str, this, () => {
                STaskData.instance.protocol.send30017(task.TaskId, 1);
            }, null, null, null, true, "刷新星级");
        }
    }

    private onClickQuickBtn() {
        var task: Task = STaskData.instance.CurrentTaskDic.get(this.taskType);
        if (task) {
            if (this.curIndex != 4) {
                STaskData.instance.protocol.send30015(task.TaskId);
            } else {
                if (task.starLv >= 5) {
                    MsgManager.instance.showRollTipsMsg("任务已达到满星，无需刷新");
                    return;
                }
                STaskData.instance.protocol.send30017(task.TaskId, 0);//一键满星
            }
        }
    }

    private onTabChange(index: number, btn: Laya.Button) {
        this.curIndex = index;
        switch (index) {
            case 0:
                {
                    this.taskType = TaskType.TASK_DAILY_ON_HOOK_TYPE;
                    break;
                }
            case 1:
                {
                    this.taskType = TaskType.TASK_DAILY_BOSS_TYPE;
                    break;
                }
            case 2:
                {
                    this.taskType = TaskType.TASK_DAILY_DUN_TYPE;
                    break;
                }
            case 3:
                {
                    this.taskType = TaskType.TASK_DAILY_ARENA_TYPE;
                    break;
                }
            case 4:
                {
                    this.taskType = TaskType.BAOTU;
                    break;
                }
        }
        this.updateTask();
    }

    public updateLayout(): void {
        this.baseBox.visible = true;
        this.index4FinishBox.visible = false;
        this.leftTaskNumLb.text = "";
        if (this.curIndex != 4) {
            this.baotuBox.visible = false;
            this.taskDes.y = 20;
            this.rewarldList.y = 380 - 210;
            this.taskProgressBar.y = 312 - 210;
            this.taskProgressText.y = 315 - 210;
            this.quickBtn.label = "快速完成";
        } else {
            this.baotuBox.visible = true;
            this.taskDes.y = 35;
            this.rewarldList.y = 398 - 210;
            this.taskProgressBar.y = 287 - 210;
            this.taskProgressText.y = 290 - 210;
            this.quickBtn.label = "一键满星";
            this.updateIndex4();
        }
    }

    public updateIndex4(): void {
        //藏宝任务重新刷新下面板，保证是最后
        var itemCfg = ConstVo.get("TASK_FULL_STAR_COSTS").val[0];
        var needMoney = itemCfg[1];
        if (SRoleData.instance.info.Yuanbao < needMoney) {
            this.moneyText.color = "#FF0000";
        } else {
            this.moneyText.color = "#0DA310";
        }
        this.moneyText.text = `x${needMoney}`;
        //任务状态
        var task: Task = STaskData.instance.CurrentTaskDic.get(this.taskType);
        if (!task || (task.State == TaskState.TASK_FINISH && task.leftTime <= 1)) {
            this.baseBox.visible = false;
            this.index4FinishBox.visible = true;
        } else {
            this.baseBox.visible = true;
            this.index4FinishBox.visible = false;
        }
        //星级
        if (task && task.starLv != null) {
            for (let i = 1; i <= 5; i++) {
                var starSp = this["star" + i] as Laya.Image;
                if (task.starLv >= i) {
                    starSp.skin = "comp/img_lightStar.png";
                } else {
                    starSp.skin = "comp/img_grayStar.png";
                }
            }
            //剩余次数
            this.leftTaskNumLb.text = "剩余任务次数：" + task.leftTime;
        }
    }


    public updateRed(): void {
        var taskTypeList = [TaskType.TASK_DAILY_ON_HOOK_TYPE, TaskType.TASK_DAILY_BOSS_TYPE, TaskType.TASK_DAILY_DUN_TYPE, TaskType.TASK_DAILY_ARENA_TYPE, TaskType.BAOTU];
        for (let i = 0; i < taskTypeList.length; i++) {
            var taskType = taskTypeList[i];
            var task: Task = STaskData.instance.CurrentTaskDic.get(taskType);
            var btn = this["btn_" + i] as component.ScaleButton;
            if (task && task.State != TaskState.TASK_FINISH && task.CurrentNum == task.TotalNum) {
                btn.refreshRed(true);
            } else {
                btn.refreshRed(false);
            }
        }
    }

    public updateTask() {
        var task: Task = STaskData.instance.CurrentTaskDic.get(this.taskType);
        if (!task) {
            this.updateRed();
            this.updateLayout();
            return;
        }
        if (this.taskType == TaskType.BAOTU) {
            var awardId = task.SheetData.reward[task.starLv - 1][1];
        } else {
            var awardId = task.SheetData.reward[0];
        }

        this.rewarldList.updateRewardsByNum(awardId);
        var color = "";
        var progressStr = "";
        if (task.State == TaskState.TASK_FINISH) {
            color = "Green";
            progressStr = "(已完成)";
            this.FinishBtn.disabled = true;
            this.gotoBtn.visible = false;
            this.quickBtn.visible = false;
            this.FinishBtn.visible = true;
            this.taskProgressBar.setValue(1, 1);
            this.moneyBox.visible = false;
        }
        else {
            if (task.CurrentNum == task.TotalNum) {
                color = "Green";
                this.gotoBtn.visible = false;
                this.quickBtn.visible = false;
                this.FinishBtn.visible = true;
                this.moneyBox.visible = false;
                this.FinishBtn.disabled = false;
                progressStr = "(完成)";

            }
            else {
                color = "Red";
                progressStr = `(${task.CurrentNum}/${task.TotalNum})`;
                this.FinishBtn.visible = false;
                this.gotoBtn.visible = true;
                this.quickBtn.visible = true;
                this.moneyBox.visible = true;
                var moneyData = STaskData.instance.getTaskQuickFinishMoney(this.taskType);
                if (moneyData) {
                    var val = moneyData[1];
                    var needMoney = (task.TotalNum - task.CurrentNum) * val;
                    if (SRoleData.instance.info.Yuanbao < needMoney) {
                        this.moneyText.color = "#FF0000";
                    }
                    else {
                        this.moneyText.color = "#0DA310";
                    }
                    this.moneyText.text = `x${needMoney}`;
                }
            }
            this.taskProgressBar.setValue(task.CurrentNum, task.TotalNum);
        }


        this.taskDes.innerHTML = HtmlUtils.addColor(task.SheetData.name, "#8e5213", 20)
            + HtmlUtils.addColor(progressStr, color, 20);

        this.taskProgressText.text = progressStr;

        this.updateRed();
        this.updateLayout();
    }


    //任务完成的特效
    private _taskCompleteEff: UIeffectLayer;
    //任务过程，播放特效 , type,1为完成,2为进行中
    public showTaskCompEff(): void {
        if (!this._taskCompleteEff) {
            this._taskCompleteEff = new UIeffectLayer;
            this.addChild(this._taskCompleteEff);
        }
        this._taskCompleteEff.playEffect("ui_effect_14", 290, 370, false, 130);
    }

    public close(): void {
        if (this._taskCompleteEff) {
            this._taskCompleteEff.destroy();
            this._taskCompleteEff = null;
        }
        this.curIndex = -1;
        this.mTab.select = this.curIndex;
        super.close();
    }
}