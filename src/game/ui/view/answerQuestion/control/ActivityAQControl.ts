import { ActivityAQPanel } from "../panel/ActivityAQPanel";

export class ActivityAQControl extends BaseControl {

    constructor() {
        super();
        this.panel = new ActivityAQPanel();
        this.initEvent();
    }

    public set panel(value: ActivityAQPanel) {
        this.mPanel = value;
    }

    public get panel(): ActivityAQPanel {
        return this.mPanel as ActivityAQPanel;
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