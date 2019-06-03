import { FirstRechargePanel } from "../panel/FirstRechargePanel";

export class FirstRechargeControl extends BaseControl {
    constructor() {
        super();
        this.panel = new FirstRechargePanel();
    }

    public set panel(value: FirstRechargePanel) {
        this.mPanel = value;
    }

    public get panel(): FirstRechargePanel {
        return this.mPanel as FirstRechargePanel;
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