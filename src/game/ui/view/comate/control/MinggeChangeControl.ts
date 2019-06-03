import { MinggeChangePanel } from "../panel/MinggeChangePanel";

export class MinggeChangeControl extends BaseControl {
    constructor() {
        super();
        this.panel = new MinggeChangePanel();
    }

    public set panel(value: MinggeChangePanel) {
        this.mPanel = value;
    }

    public get panel(): MinggeChangePanel {
        return this.mPanel as MinggeChangePanel;
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

    public updateData(): void {
        this.panel.updateData();
    }

}