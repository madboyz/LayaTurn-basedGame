import { SActiveData, SActiveEvent } from "../../active/data/SActiveData";
import { BeStrongerPanel } from "../panel/BeStrongerPanel";

export class BeStrongerControl extends BaseControl {
    constructor() {
        super();
        this.panel = new BeStrongerPanel();
    }

    public set panel(value: BeStrongerPanel) {
        this.mPanel = value;
    }

    public get panel(): BeStrongerPanel {
        return this.mPanel as BeStrongerPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
    }
    private removeEvent() {
    }

}