import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { S13002 } from "../../../../../net/pt/pt_13";
import { TaskProtocol } from "../../../../task/protocol/TaskProtocol";
import { STaskData, STaskEvent } from "../../../../task/STaskData";
import { GuildHudScenePage } from "../panel/GuildHudScenePage";
import { GameUtils } from "../../../../utils/GameUtils";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";

export class GuildHudScenePageControl extends BaseControl {
    private taskProtocol: TaskProtocol;
    constructor() {
        super();
        this.panel = new GuildHudScenePage();
        this.taskProtocol = new TaskProtocol();
    }

    public set panel(value: GuildHudScenePage) {
        this.mPanel = value;
    }

    public get panel(): GuildHudScenePage {
        return this.mPanel as GuildHudScenePage;
    }
    
    public get getEvent(): Array<any> {
        return [NotityEvents.CHAT_STATE];
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        STaskData.instance.on(STaskEvent.TASK_UPDATE, this, this.onUpdateTask);
        SRoleData.instance.on(SRoleEvent.ROLE_GET_ONLINEROLEINFO, this, this.onGetOnLineRoleInfo);
        STaskData.instance.on(STaskEvent.TASK_GUILD_COMMIT_COMPLETE, this, this.taskCommitComp);

        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onfightchange);//战斗变化
    }
    private removeEvent() {
        STaskData.instance.off(STaskEvent.TASK_UPDATE, this, this.onUpdateTask);
        SRoleData.instance.off(SRoleEvent.ROLE_GET_ONLINEROLEINFO, this, this.onGetOnLineRoleInfo);
        STaskData.instance.off(STaskEvent.TASK_GUILD_COMMIT_COMPLETE, this, this.taskCommitComp);

        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onfightchange);//战斗变化
    }


    private onUpdateTask() {
        this.panel.onUpdateTask();
    }

    private onGetOnLineRoleInfo(data: S13002) {
        if (data.PlayerId == SRoleData.instance.roleId) {
            this.onUpdateTask();
        }
    }

    private taskCommitComp(taskId: number) {
        this.panel.showTaskCompEff();
    }

    private onfightchange():void{
        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            this.panel.exitBtn.visible = true;
        } else {
            this.panel.exitBtn.visible = false;
        }
    }

    //聊天框变化=======================================
    public excuting(notity: NotityData): void {
        var event: any = notity.event;
        var data: any = notity.data;
        var funList: Function[] = [];

        funList[NotityEvents.CHAT_STATE] = this.showOrHideTask;
        var fun: Function = funList[event];
        fun.call(this, notity.data);
    }

    private showOrHideTask(): void {
        if (GameUtils.curBigState) {
            this.panel.contentBox && (this.panel.contentBox.visible = false);
        } else {
            this.panel.contentBox && (this.panel.contentBox.visible = true);
        }
    }



}
