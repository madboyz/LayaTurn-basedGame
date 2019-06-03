import { ComateMinggePanel } from "../panel/ComateMinggePanel";

export class ComateMinggeControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateMinggePanel();
    }

    public set panel(value: ComateMinggePanel) {
        this.mPanel = value;
    }

    public get panel(): ComateMinggePanel {
        return this.mPanel as ComateMinggePanel;
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