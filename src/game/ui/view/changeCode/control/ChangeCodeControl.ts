import { ChangeCodePanel } from "../panel/ChangeCodePanel";

export class ChangeCodeControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ChangeCodePanel();
    }

    public set panel(value: ChangeCodePanel) {
        this.mPanel = value;
    }

    public get panel(): ChangeCodePanel {
        return this.mPanel as ChangeCodePanel;
    }
    openView(...args) {
    }

    closeView() {
        super.closeView();
    }
}