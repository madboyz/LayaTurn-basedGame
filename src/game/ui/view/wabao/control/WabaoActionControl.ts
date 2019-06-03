import { WabaoActionPanel } from "../panel/WabaoActionPanel";

export class WabaoActionControl extends BaseControl {
    private protocol: WabaoActionPanel;
    constructor() {
        super();
        this.panel = new WabaoActionPanel();
    }

    public set panel(value: WabaoActionPanel) {
        this.mPanel = value;
    }

    public get panel(): WabaoActionPanel {
        return this.mPanel as WabaoActionPanel;
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