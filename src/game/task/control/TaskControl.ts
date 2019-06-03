import { TaskProtocol } from "../protocol/TaskProtocol";
import { TaskPanel } from "../../ui/view/task/panel/TaskPanel";
import { STaskEvent, STaskData } from "../STaskData";
import { SRoleData, SRoleEvent } from "../../../net/data/SRoleData";
import { S13002 } from "../../../net/pt/pt_13";
import { GameUtils } from "../../utils/GameUtils";
import { SGuideData } from "../../ui/view/guide/data/SGuideData";

export class TaskControl extends BaseControl {
    private protocol:TaskProtocol;
    constructor() {
        super();
        this.panel = new TaskPanel();
        this.protocol = STaskData.instance.protocol;
    }

    public set panel(value: TaskPanel) {
        this.mPanel = value;
    }

    public get panel(): TaskPanel {
        return this.mPanel as TaskPanel;
    }

    public get getEvent(): Array<any> {
        return [NotityEvents.CHAT_STATE];
    }

    openView(...args) {
        this.initEvent();
        this.onUpdateTask();
        SGuideData.instance.InitGuide();//内部做了判断需要任务面板打开的时候去调用
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        STaskData.instance.on(STaskEvent.TASK_UPDATE,this,this.onUpdateTask);
        SRoleData.instance.on(SRoleEvent.ROLE_GET_ONLINEROLEINFO,this,this.onGetOnLineRoleInfo);
        STaskData.instance.on(STaskEvent.TASK_COMMIT_COMPLETE,this,this.taskCommitComp);
        this.panel.on(STaskEvent.TASK_COMMIT,this,this.onCommitTask);
    }
    private removeEvent() {
        STaskData.instance.off(STaskEvent.TASK_UPDATE,this,this.onUpdateTask);
        SRoleData.instance.off(SRoleEvent.ROLE_GET_ONLINEROLEINFO,this,this.onGetOnLineRoleInfo);
        STaskData.instance.off(STaskEvent.TASK_COMMIT_COMPLETE,this,this.taskCommitComp);
        this.panel.off(STaskEvent.TASK_COMMIT,this,this.onCommitTask);
    }

    public excuting(notity: NotityData): void {
        var event: any = notity.event;
        var data: any = notity.data;
        var funList: Function[] = [];

        funList[NotityEvents.CHAT_STATE] = this.showOrHideTask;
        var fun: Function = funList[event];
        fun.call(this, notity.data);
    }

    private onGetOnLineRoleInfo(data:S13002) {
        if(data.PlayerId == SRoleData.instance.roleId)
        {
            this.onUpdateTask();
        }
    }

    private onCommitTask(taskId: number ,goodsList:Array<any> = null)
    {
        this.protocol.send30004(taskId,goodsList);
    }

    private taskCommitComp(taskId: number ){
        this.panel.showTaskCompEff();
    }

    private onUpdateTask() {
        this.panel.onUpdateTask();
    }

    private showOrHideTask():void
    {
        if(GameUtils.curBigState)
        {
            this.panel.visible = false;
        }
        else
        {
            this.panel.visible = true;
        }
    }
}