import { LocalPlayerPanel } from "../panel/LocalPlayerPanel";
import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { PropertyEnumCode } from "../../../../property/RoleProperty";

export class LocalPlayerPanelControl extends BaseControl {
    constructor() {
        super();
        this.panel = new LocalPlayerPanel();
    }

    public set panel(value: LocalPlayerPanel) {
        this.mPanel = value;
    }

    public get panel(): LocalPlayerPanel {
        return this.mPanel as LocalPlayerPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_LEVEL , this , this.UpdateInfoText);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_PROP , this , this.onInfoUpdate);
    }

    private removeEvent() {
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_LEVEL , this , this.UpdateInfoText);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_PROP , this , this.onInfoUpdate);
    }

    private UpdateInfoText() {
        this.panel.UpdateInfoText();
    }

    public onInfoUpdate(type:number)
    {
        if(type == PropertyEnumCode.OI_CODE_BATTLE_POWER)
        {
            this.panel.updateCombat();
        }
    }
}