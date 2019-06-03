import { ComateMinggePanel } from "../panel/ComateMinggePanel";
import { ComateLiemingPanel } from "../panel/ComateLiemingPanel";

export class ComateLiemingControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateLiemingPanel();
    }

    public set panel(value: ComateLiemingPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateLiemingPanel {
        return this.mPanel as ComateLiemingPanel;
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