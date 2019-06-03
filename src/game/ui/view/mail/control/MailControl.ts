import { MailProtocol } from "../protocol/MailProtocol";
import { MailPanel } from "../panel/MailPanel";
import { SMailEvent, SMailData } from "../../../../../net/data/SMailData";

export class MailControl extends BaseControl {
    private protocol: MailProtocol;
    constructor() {
        super();
        this.panel = new MailPanel();
        this.protocol = new MailProtocol();
    }

    public set panel(value: MailPanel) {
        this.mPanel = value;
    }

    public get panel(): MailPanel {
        return this.mPanel as MailPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SMailData.instance.on(SMailEvent.SMAIL_UPDATE, this, this.updatePanel);
        this.panel.on(SMailEvent.SMAIL_REQUEST_READ, this, this.send19003);
        this.panel.on(SMailEvent.SMAIL_REQUEST_REVEIVEALLREWARD, this, this.reveiveallreward);
    }
    private removeEvent() {
        SMailData.instance.off(SMailEvent.SMAIL_UPDATE, this, this.updatePanel);
        this.panel.off(SMailEvent.SMAIL_REQUEST_READ, this, this.send19003);
        this.panel.off(SMailEvent.SMAIL_REQUEST_REVEIVEALLREWARD, this, this.reveiveallreward);
    }

    private send19003(ob: any): void {
        this.protocol.send19003.apply(this.protocol, ob);
    }

    private send19005(): void {
        this.protocol.send19005(SMailData.instance.wardList);
    }

    private updatePanel(): void {
        this.panel.updateData();
    }

    public reveiveallreward(): void {
        this.send19005();
    }
}