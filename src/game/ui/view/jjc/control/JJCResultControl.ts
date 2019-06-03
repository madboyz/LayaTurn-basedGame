import { SJJCData, SJJCEvent } from "../data/SJJCData";
import { JJCResultPanel } from "../panel/JJCResultPanel";
import { JJCProtocol } from "../protocol/JJCProtocol";

export class JJCResultControl extends BaseControl {
    private protocol: JJCProtocol;
    constructor() {
        super();
        this.panel = new JJCResultPanel();
        this.protocol = new JJCProtocol();
        this.initEvent();
    }

    public set panel(value: JJCResultPanel) {
        this.mPanel = value;
    }

    public get panel(): JJCResultPanel {
        return this.mPanel as JJCResultPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SJJCData.instance.on(SJJCEvent.JJC_OUT_FIGHT,this,this.outJJCFight);
    }
    private removeEvent() {
        SJJCData.instance.off(SJJCEvent.JJC_OUT_FIGHT, this, this.outJJCFight);
    }

    /**
     * 请求竞技场的记录信息
     */
    public outJJCFight(): void {
        
    }


}