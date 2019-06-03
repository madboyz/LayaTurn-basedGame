import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { TaskVo } from "../../../../../db/sheet/vo/TaskVo";
import { STaskData, STaskEvent } from "../../../../task/STaskData";
import { Task, TaskType, TaskState } from "../../../../task/Task";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { Alert } from "../../../compent/Alert";
import { Chapter_cfgVo } from "../../../../../db/sheet/vo/Chapter_cfgVo";
import { SChapterData } from "../../../../chapter/SChapterData";
import { SceneManager } from "../../../../battle/scene/SceneManager";
import { MsgManager } from "../../../manager/MsgManager";
import { ItemData } from "../../../compent/data/ItemData";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { SNewBattleData } from "../../../../../net/data/SNewBattleData";

export class GuildHudScenePage extends ui.main.GuildHudScenePageUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_1;
        this.sameLevelEliminate = false;
        this.isFullScreen = true;
        this.mResouce = [
            { url: "res/atlas/task.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.initHtml();
        this.onUpdateTask();
        this.contentBox.y = Laya.stage.height - (GameConfig.SCREEN_HEIGHT - 547);
        this.exitBtn.x = Laya.stage.width - (GameConfig.SCREEN_WIDTH - 546);
        // this.taskBtn.y = Laya.stage.height - (GameConfig.SCREEN_HEIGHT - 580);
        // this.exitBtn.y = Laya.stage.height - (GameConfig.SCREEN_HEIGHT - 580);
        // this.finishBtn.y = Laya.stage.height - (GameConfig.SCREEN_HEIGHT - 580);
    }

    private initHtml(): void {
        HtmlUtils.setHtml(this.txt.style, 6, 16, "left", "middle");
        this.txt.style.wordWrap = false;
    }

    public update(): void {
        this.onUpdateTask();
        this.onFightReportState();
    }

    public open(...args): void {
        super.open();
        this._auto = false;
    }
    public initEvent(): void {
        STaskData.instance.on(STaskEvent.TASK_UPDATE_BY30006, this, this.on30006);
        this.taskBtn.on(Laya.Event.CLICK, this, this.OnClickTaskBtn);
        this.finishBtn.on(Laya.Event.CLICK, this, this.finishBtnClick);
        this.exitBtn.on(Laya.Event.CLICK, this, this.exitBtnClick);

        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onFightReportState);
    }
    public removeEvent(): void {
        STaskData.instance.off(STaskEvent.TASK_UPDATE_BY30006, this, this.on30006);
        this.taskBtn.off(Laya.Event.CLICK, this, this.OnClickTaskBtn);
        this.finishBtn.off(Laya.Event.CLICK, this, this.finishBtnClick);
        this.exitBtn.off(Laya.Event.CLICK, this, this.exitBtnClick);

        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onFightReportState);
    }

    private OnClickTaskBtn(): void {
        var task = STaskData.instance.CurrentTaskDic.get(TaskType.GUILD);
        if (task) {
            if (task.IsComplete) {
                STaskData.instance.protocol.send30004(task.TaskId);
            } else {
                SRoleData.instance.CanAutoMove = true;
            }
        }
    }

    private finishBtnClick(): void {
        var task: Task = STaskData.instance.CurrentTaskDic.get(TaskType.GUILD);
        //快速完成
        var moneyData = STaskData.instance.getTaskQuickFinishMoney(TaskType.GUILD);
        if (moneyData) {
            var val = moneyData[1];
            var needMoney = (task.TotalNum - task.CurrentNum + task.TotalNum * (task.leftTime - 1)) * val;
            if (SRoleData.instance.info.Yuanbao < needMoney) {
                MsgManager.instance.showRollTipsMsg("元宝不足，无法快速完成任务");
                return;
            }
        }

        var newData: ItemData = new ItemData(MoneyType.YUANBAO);
        var str: string = HtmlUtils.addColor("是否花费", "#8a5428", 20)
            + HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", ""), 25, 25)
            + HtmlUtils.addColor("x" + needMoney, "#00ff00", 20)
            + HtmlUtils.addColor("完成快速完成任务", "#8a5428", 20);
        Alert.show(str, this, () => {
            this.setAuto(true);
            // STaskData.instance.protocol.send30015(task.TaskId);
        }, null, null, null, true, "快速完成");
    }

    //自动完成任务
    private _auto: boolean = false;
    private setAuto(auto: boolean): void {
        this._auto = auto;
        this.onUpdateTask();
    }

    private exitBtnClick(): void {
        var cfgData = Chapter_cfgVo.get(SChapterData.instance.chapter.chapterId);
        SceneManager.instance.enterScene(cfgData.scene_no);
    }

    private onFightReportState():void{
        this.titleBox.visible = !SGameData.instance.PLAYFIGHTREPORT;
        this.contentBox.visible = !SGameData.instance.PLAYFIGHTREPORT || SNewBattleData.instance.isHangUpBattle;
    }


    public onUpdateTask(): void {
        var task: Task = STaskData.instance.CurrentTaskDic.get(TaskType.GUILD);
        var isAllOver = !task || task.timeData == null || (task.State == TaskState.TASK_FINISH && task.leftTime <= 1);
        //自动快速完成
        if (SRoleData.instance.info.Yuanbao < needMoney && this._auto) {
            MsgManager.instance.showRollTipsMsg("元宝不足，停止快速完成任务");
            this._auto = false;
        }
        if (isAllOver) {
            this._auto = false;
        }
        if (!this._auto) {
            //页面的显示==========================================================
            if (task) {
                var color = "Red";
                var iconname = "img_taskIcon.png";
                var progressStr = `(${task.CurrentNum}/${task.TotalNum})`;
                if (task.CurrentNum == task.TotalNum) {
                    color = "Green";
                    iconname = "img_finish.png";
                    progressStr = "(完成)";
                    this.showUIEffect(1);
                } else {
                    this.showUIEffect(2);
                }

                this.Icon.skin = "task/" + iconname;
                var awardStr = task.GetAwardDesc(16, "#fff578");
                var str = "";
                if (awardStr == "")
                    str = HtmlUtils.addColor(task.SheetData.name, "#f8a91d", 16)
                        + HtmlUtils.addColor(progressStr, color, 16);
                else
                    str = HtmlUtils.addColor(task.SheetData.name, "#f8a91d", 16)
                        + HtmlUtils.addColor(progressStr, color, 16)
                        + "<br>" + awardStr;
                this.txt.innerHTML = str;
                this.txt.layout();
            }
            this.finishBtn.visible = !isAllOver;
            this.taskBtn.mouseEnabled = !isAllOver;
            this.finishImg.visible = isAllOver;
            if (isAllOver) {
                this.timer.frameOnce(2, this, () => {
                    this.showUIEffect(2);
                })
            }
            //快速完成
            var moneyData = STaskData.instance.getTaskQuickFinishMoney(TaskType.GUILD);
            if (moneyData) {
                var val = moneyData[1];
                var needMoney = (task.TotalNum - task.CurrentNum + task.TotalNum * (task.leftTime - 1)) * val;
                if (SRoleData.instance.info.Yuanbao < needMoney) {
                    this.moneyText.color = "#FF0000";
                }
                else {
                    this.moneyText.color = "#0DA310";
                }
                this.moneyText.text = `x${needMoney}`;
            }
            //页面的显示（结束）==========================================================
        }

        if (this._auto) {
            if (task.IsComplete) {
                STaskData.instance.protocol.send30004(task.TaskId);
            } else {
                if (this.cansend30015) {
                    this.cansend30015 = false;
                    STaskData.instance.protocol.send30015(task.TaskId);
                }
            }
        }
    }

    private cansend30015: boolean = true;
    private on30006(): void {
        //只有在收到30006之后，才能发快速完成
        this.cansend30015 = true;
    }


    //特效
    private _uiEffLayer: UIeffectLayer;
    //之前的BOSS类型
    private _lastType: number;
    //任务过程，播放特效 , type,1为完成,2为进行中
    public showUIEffect(type: number): void {
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.taskBtn.addChild(this._uiEffLayer);
        }
        if (this._lastType == type) {
            return;
        }
        this._lastType = type;
        this._uiEffLayer.clearEffect();
        var effName: string = (type == 1 ? "ui_effect_8" : "ui_effect_7");
        var eff: Laya.Animation = this._uiEffLayer.playEffect(effName, 144, 39, true, 120);
        eff.scaleX = 1;
        eff.scaleY = 1.2;
    }

    //任务完成的特效
    private _taskCompleteEff: UIeffectLayer;
    //任务过程，播放特效 , type,1为完成,2为进行中
    public showTaskCompEff(): void {
        if(this._taskCompleteEff && this._taskCompleteEff.effectArr.length > 0){
            return;
        }
        if (!this._taskCompleteEff ) {
            this._taskCompleteEff = new UIeffectLayer;
            this.addChild(this._taskCompleteEff);
        }
        this._taskCompleteEff.playEffect("ui_effect_14", 300, 400, false, 130);
    }

    public close(): void {
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
            this._lastType = null;
        }
        if (this._taskCompleteEff) {
            this._taskCompleteEff.destroy();
            this._taskCompleteEff = null;
        }
        this._auto = false
        super.close();
    }
}