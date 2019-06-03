import { RoleAddPoint } from "../panel/RoleAddPoint";
import { RoleProtocol } from "../protocol/RoleProtocol";
import { SRoleEvent } from "../../../../../net/data/SRoleData";

export class RoleAddPointControl extends BaseControl {
    private protocol:RoleProtocol;
    constructor() {
        super();
        this.panel = new RoleAddPoint();
        this.protocol = new RoleProtocol();
        this.initEvent();
    }
    public set panel(value: RoleAddPoint) {
        this.mPanel = value;
    }

    public get panel(): RoleAddPoint {
        return this.mPanel as RoleAddPoint;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SRoleEvent.ROLE_REQUEST_ADD_POINT,this,this.onSend13008);
        this.panel.on(SRoleEvent.ROLE_REQUEST_WASH_POINT,this,this.onSend13112);
    }
    private removeEvent() {
        this.panel.off(SRoleEvent.ROLE_REQUEST_ADD_POINT,this,this.onSend13008);
        this.panel.off(SRoleEvent.ROLE_REQUEST_WASH_POINT,this,this.onSend13112);
    }

    private onSend13008(obj:Array<any>):void
    {
        this.protocol.send13008(obj);
    }

    private onSend13112(obj:any):void
    {
        this.protocol.send13112();
    }
}