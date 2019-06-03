import { ReadMaildPanel } from "../panel/ReadMaildPanel";
import { SMailEvent } from "../../../../../net/data/SMailData";
import { MailProtocol } from "../protocol/MailProtocol";

export class ReadMailControl extends BaseControl {
    private protocol:MailProtocol;
    constructor() {
        super();
        this.panel = new ReadMaildPanel();
        this.protocol = new MailProtocol();
    }

    public set panel(value: ReadMaildPanel) {
        this.mPanel = value;
    }

    public get panel(): ReadMaildPanel {
        return this.mPanel as ReadMaildPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SMailEvent.SMAIL_REQUEST_RECEIVEREWARD,this,this.send19004);
        this.panel.on(SMailEvent.SMAIL_REQUEST_DELETE,this,this.send19006);
    }
    private removeEvent() {
        this.panel.off(SMailEvent.SMAIL_REQUEST_RECEIVEREWARD,this,this.send19004);
        this.panel.off(SMailEvent.SMAIL_REQUEST_DELETE,this,this.send19006);
    }

    public send19004(ob:any):void
    {
        this.protocol.send19004.apply(this.protocol,ob);
    }

    public send19006(ob:any):void
    {
        this.protocol.send19006.apply(this.protocol,ob);
    }
}