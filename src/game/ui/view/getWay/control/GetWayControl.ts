import { GetWayProtocol } from "../protocol/GetWayProtocol";
import { GetWayPanel } from "../panel/GetWayPanel";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";

export class GetWayControl extends BaseControl {
    private protocol:GetWayProtocol;
    constructor() {
        super();
        this.panel = new GetWayPanel();
        this.protocol = new GetWayProtocol();
    }

    public set panel(value: GetWayPanel) {
        this.mPanel = value;
    }

    public get panel(): GetWayPanel {
        return this.mPanel as GetWayPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SGoodsEvent.GOODS_BUY,this,this.onBuy);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_MONEY,this,this.onUpdateMoney);
    }
    private removeEvent() {
        this.panel.off(SGoodsEvent.GOODS_BUY,this,this.onBuy);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_MONEY,this,this.onUpdateMoney);
    }

    private onUpdateMoney(type:number):void {
        this.panel.onChange();
    }

    private onBuy(data:any):void
    {
        this.protocol.send52001.apply(this.protocol,data);
    }
}