import { PlayerTitlePanel } from "../panel/PlayerTitlePanel";
import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { RoleProtocol } from "../../role/protocol/RoleProtocol";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";

export class PlayerTitleControl extends BaseControl {
    private Protocol:RoleProtocol;
    constructor() {
        super();
        this.panel = new PlayerTitlePanel();
        this.Protocol = new RoleProtocol();
    }

    public set panel(value: PlayerTitlePanel) {
        this.mPanel = value;
    }

    public get panel(): PlayerTitlePanel {
        return this.mPanel as PlayerTitlePanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SRoleData.instance.on(SRoleEvent.ROLE_TITLE_UPDATE,this,this.updateTitle);
        this.panel.on(SRoleEvent.ROLE_USE_TITLE,this,this.useTittle);
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.updateTime);
    }

    private removeEvent() {
        SRoleData.instance.off(SRoleEvent.ROLE_TITLE_UPDATE,this,this.updateTitle);
        this.panel.off(SRoleEvent.ROLE_USE_TITLE,this,this.useTittle);
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.updateTime);
    }

    private useTittle(no:number)
    {
        this.Protocol.send13031(no);
    }

    private updateTitle() {
        this.panel.updateAlldata();
    }

    private updateTime() {
        this.panel.onUpdateTimeDisplay();
    }
}