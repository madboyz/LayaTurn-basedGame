import { FabaoMainPanel } from "../panel/FabaoMainPanel";

export class FabaoMainControl extends BaseControl {
    constructor() {
        super();
        this.panel = new FabaoMainPanel();
        this.initEvent();
    }
    public set panel(value: FabaoMainPanel) {
        this.mPanel = value;
    }

    public get panel(): FabaoMainPanel {
        return this.mPanel as FabaoMainPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
    }
    private removeEvent() {
    }

}