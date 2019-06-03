import { DayTaskPanel } from "../panel/DayTaskPanel";
import { STaskData, STaskEvent } from "../../../../task/STaskData";

export class DayTaskControl extends BaseControl {
    constructor(){
        super();
        this.panel = new DayTaskPanel();
    }

    openView(...args) {
        this.initEvent();
    }

    public set panel(value: DayTaskPanel) {
        this.mPanel = value;
    }
    public get panel(): DayTaskPanel {
        return this.mPanel as DayTaskPanel;
    }

    private initEvent() {
        STaskData.instance.on(STaskEvent.TASK_UPDATE,this,this.onUpdateTask);
        STaskData.instance.on(STaskEvent.TASK_DAILY_COMMIT_COMPLETE,this,this.taskCommitComp);
    }
    
    private removeEvent() {
        STaskData.instance.off(STaskEvent.TASK_UPDATE,this,this.onUpdateTask);
        STaskData.instance.off(STaskEvent.TASK_DAILY_COMMIT_COMPLETE,this,this.taskCommitComp);
    }

    private onUpdateTask() {
        this.panel.updateTask();
    }

    private taskCommitComp():void{
        this.panel.showTaskCompEff();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }
}