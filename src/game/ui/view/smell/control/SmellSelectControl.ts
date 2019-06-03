import { SmellSelectPanel } from "../panel/SmellSelectPanel";

export class SmellSelectControl extends BaseControl {
    constructor() {
        super();
        this.panel = new SmellSelectPanel();
    }

    public set panel(value: SmellSelectPanel) {
        this.mPanel = value;
    }

    public get panel(): SmellSelectPanel {
        return this.mPanel as SmellSelectPanel;
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