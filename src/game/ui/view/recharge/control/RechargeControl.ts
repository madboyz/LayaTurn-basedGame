import { RechargePanel } from "../panel/RechargePanel";

export class RechargeControl extends BaseControl {
    constructor() {
        super();
        this.panel = new RechargePanel();
    }

    public set panel(value: RechargePanel) {
        this.mPanel = value;
    }

    public get panel(): RechargePanel {
        return this.mPanel as RechargePanel;
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