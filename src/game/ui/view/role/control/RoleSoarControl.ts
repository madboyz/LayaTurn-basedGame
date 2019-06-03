import { RoleProtocol } from "../protocol/RoleProtocol";
import { RoleSoarPanel } from "../panel/RoleSoarPanel";
import { SRoleEvent } from "../../../../../net/data/SRoleData";

export class RoleSoarControl extends  BaseControl {
    private protocol:RoleProtocol;
    constructor() {
        super();
        this.panel = new RoleSoarPanel();
        this.protocol = new RoleProtocol();
    }

    public set panel(value: RoleSoarPanel) {
        this.mPanel = value;
    }

    public get panel(): RoleSoarPanel {
        return this.mPanel as RoleSoarPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SRoleEvent.ROLE_REQUEST_SOAR,this,this.onSend13117);
    }

    private removeEvent() {
        this.panel.off(SRoleEvent.ROLE_REQUEST_SOAR,this,this.onSend13117);
    }

    private onSend13117()
    {
        this.protocol.send13117();
    }
}