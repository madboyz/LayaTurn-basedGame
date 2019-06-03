import { FabaoChangePanel } from "../panel/FabaoChangePanel";

export class FabaoChangeControl extends BaseControl {
    constructor() {
        super();
        this.panel = new FabaoChangePanel();
    }

    public set panel(value: FabaoChangePanel) {
        this.mPanel = value;
    }

    public get panel(): FabaoChangePanel {
        return this.mPanel as FabaoChangePanel;
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