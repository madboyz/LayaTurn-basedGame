import { FashionPanel } from "../panel/FashionPanel";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { RoleProtocol } from "../../role/protocol/RoleProtocol";

export class FahshionControl extends BaseControl {
    private Protocol:RoleProtocol;
    constructor() {
        super();
        this.panel = new FashionPanel();
        this.Protocol = new RoleProtocol();
    }
    public set panel(value: FashionPanel) {
        this.mPanel = value;
    }

    public get panel(): FashionPanel {
        return this.mPanel as FashionPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.updateTime);
        SRoleData.instance.on(SRoleEvent.ROLE_FASHION_UPDATE,this,this.updateFashion);
        this.panel.on(SRoleEvent.ROLE_USE_FASHION_UPDATE,this,this.UseFashion);
    }

    private removeEvent() {
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.updateTime);
        SRoleData.instance.off(SRoleEvent.ROLE_FASHION_UPDATE,this,this.updateFashion);
        this.panel.off(SRoleEvent.ROLE_USE_FASHION_UPDATE,this,this.UseFashion);
    }
    private UseFashion(no:number) {
        if(no == SRoleData.instance.info.Clothes)
        {
            this.Protocol.send13301(0);
        }
        else
        {
            this.Protocol.send13301(no);
        }
    }

    private updateFashion() {
        this.panel.updateAlldata();
    }

    private updateTime() {
        this.panel.onUpdateTimeDisplay();
    }

}