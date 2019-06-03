import { MinggeEatPanel } from "../panel/MinggeEatPanel";

export class MinggeEatControl extends BaseControl {
    constructor() {
        super();
        this.panel = new MinggeEatPanel();
    }

    public set panel(value: MinggeEatPanel) {
        this.mPanel = value;
    }

    public get panel(): MinggeEatPanel {
        return this.mPanel as MinggeEatPanel;
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