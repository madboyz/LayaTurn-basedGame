import { TeamRequsetPanel } from "../panel/TeamRequsetPanel";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { STeamData } from "../../../../team/STeamData";
import { GameUtils } from "../../../../utils/GameUtils";

export class TeamRequsetControl extends BaseControl {
    constructor(){
        super();
        this.panel = new TeamRequsetPanel();
    }

    openView(...args) {
        this.initEvent();
    }

    public set panel(value: TeamRequsetPanel) {
        this.mPanel = value;
    }
    public get panel(): TeamRequsetPanel {
        return this.mPanel as TeamRequsetPanel;
    }

    private initEvent() {
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);//服务器时间更新
    }

    private removeEvent() {
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);//服务器时间更新
    }

    private UpdateTime(){
        this.panel.RefreshIndex();
    }
    
    closeView() {
        this.removeEvent();
        super.closeView();
    }
}