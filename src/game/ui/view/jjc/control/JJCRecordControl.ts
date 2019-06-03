import { SJJCEvent, SJJCData } from "../data/SJJCData";
import { JJCRecordPanel } from "../panel/JJCRecordPanel";
import { JJCProtocol } from "../protocol/JJCProtocol";

export class JJCRecordControl extends BaseControl {
    private protocol: JJCProtocol;
    constructor() {
        super();
        this.panel = new JJCRecordPanel();
        this.protocol = new JJCProtocol();
        this.initEvent();
    }

    public set panel(value: JJCRecordPanel) {
        this.mPanel = value;
    }

    public get panel(): JJCRecordPanel {
        return this.mPanel as JJCRecordPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SJJCData.instance.on(SJJCEvent.JJC_ANS_RECORD, this, this.getJJCRecordInfo);
    }
    private removeEvent() {
        SJJCData.instance.off(SJJCEvent.JJC_ANS_RECORD, this, this.getJJCRecordInfo);
    }

    /**
     * 请求竞技场的记录信息
     */
    public on23002(): void {
        this.protocol.send23002();
    }

    /**
     * 返回竞技场的记录信息
     */
    public getJJCRecordInfo(): void {
        this.panel.update();
    }

}