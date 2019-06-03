import { SCopyData, SCopyEvent } from "../../../../../../net/data/SCopyData";
import { StuffCopyPanel } from "../panel/StuffCopyPanel";
import { StuffCopyProtocol } from "../protocol/StuffCopyProtocol";
import { S49001 } from "../../../../../../net/pt/pt_49";
import { CommonControl } from "../../../../../common/control/CommonControl";

export class StuffCopyControl extends BaseControl {
    private protocol: StuffCopyProtocol;
    constructor() {
        super();
        this.panel = new StuffCopyPanel();
        this.protocol = new StuffCopyProtocol();
        this.initEvent();
    }

    public set panel(value: StuffCopyPanel) {
        this.mPanel = value;
    }

    public get panel(): StuffCopyPanel {
        return this.mPanel as StuffCopyPanel;
    }

    openView(...args) {
        if (UIManager.instance.hasOpenUI(UIID.SYS_MAIN) == false) {
            UIManager.instance.openUI(UIID.SYS_MAIN);
        }
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SCopyData.instance.on(SCopyEvent.COPY_ENTER_BACK, this, this.onEnterCopy);
        SCopyData.instance.on(SCopyEvent.COPY_INFO_BACK, this, this.updateData);
        SCopyData.instance.on(SCopyEvent.COPY_RESULT_BACK, this, this.updateData);
        SCopyData.instance.on(SCopyEvent.COPY_TTTINFO_BACK, this, this.updateData);

        this.panel.on(SCopyEvent.COPY_REQUEST_ENTER, this, this.onSend57001);
        this.panel.on(SCopyEvent.COPY_REQUEST_SWEEP, this, this.onSend57017);
        this.panel.on(SCopyEvent.COPY_REQUEST_PETSWEEP, this, this.onSend57020);
        this.panel.on(SCopyEvent.COPY_REQUEST_STARREWARD, this, this.onSend57021);
        this.panel.on(SCopyEvent.COPY_REQUEST_TTTINFO, this, this.onSend49001);
        this.panel.on(SCopyEvent.COPY_REQUEST_TTTENTERBATTLE, this, this.onSend49002);
        this.panel.on(SCopyEvent.COPY_TTT_BUYTIME, this, this.onSend49003);
    }
    private removeEvent() {
        SCopyData.instance.off(SCopyEvent.COPY_ENTER_BACK, this, this.onEnterCopy);
        SCopyData.instance.off(SCopyEvent.COPY_INFO_BACK, this, this.updateData);
        SCopyData.instance.off(SCopyEvent.COPY_RESULT_BACK, this, this.updateData);
        SCopyData.instance.off(SCopyEvent.COPY_TTTINFO_BACK, this, this.updateData);

        this.panel.off(SCopyEvent.COPY_REQUEST_ENTER, this, this.onSend57001);
        this.panel.off(SCopyEvent.COPY_REQUEST_SWEEP, this, this.onSend57017);
        this.panel.off(SCopyEvent.COPY_REQUEST_PETSWEEP, this, this.onSend57020);
        this.panel.off(SCopyEvent.COPY_REQUEST_STARREWARD, this, this.onSend57021);
        this.panel.off(SCopyEvent.COPY_REQUEST_TTTINFO, this, this.onSend49001);
        this.panel.off(SCopyEvent.COPY_REQUEST_TTTENTERBATTLE, this, this.onSend49002);
        this.panel.off(SCopyEvent.COPY_TTT_BUYTIME, this, this.onSend49003);
    }

    private updateData(): void {
        this.panel.updateData();
    }

    private onEnterCopy(): void {
        UIManager.instance.closeUI(UIID.SYS_COPY_STUFF);
        UIManager.instance.closeUI(UIID.SYS_MAIN);
    }

    private onSend57001(no: number): void {
        CommonControl.instance.EnterCopy(no);
    }

    private onSend57017(no: number): void {
        CommonControl.instance.OneKeyCopy(no);
    }

    private onSend57020(obj: any): void {
        this.protocol.send57020.apply(this.protocol, obj);
    }

    private onSend57021(obj: any): void {
        this.protocol.send57021.apply(this.protocol, obj);
    }

    private onSend49001(): void {
        this.protocol.send49001();
    }

    private onSend49002(): void {
        this.protocol.send49002();
    }

    private onSend49003(): void {
        this.protocol.send49003();
    }

}