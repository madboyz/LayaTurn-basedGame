import { ActiveMainPanel } from "../panel/ActiveMainPanel";
import { SActiveData, SActiveEvent } from "../data/SActiveData";

export class ActiveMainControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ActiveMainPanel();
    }

    public set panel(value: ActiveMainPanel) {
        this.mPanel = value;
    }

    public get panel(): ActiveMainPanel {
        return this.mPanel as ActiveMainPanel;
    }

    openView(...args) {
        this.initEvent();

    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SActiveData.instance.on(SActiveEvent.ACTIVE_UPDATE , this , this.Update);
    }

    private removeEvent() {
        SActiveData.instance.off(SActiveEvent.ACTIVE_UPDATE , this , this.Update);
    }

    private Update() {
        this.panel.RefreshList();
    }
}