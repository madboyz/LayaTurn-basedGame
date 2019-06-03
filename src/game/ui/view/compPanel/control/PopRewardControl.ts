import { PopRewardPanel } from "../panel/PopRewardPanel";

export class PopRewardControl extends BaseControl {

    constructor() {
        super();
        this.panel = new PopRewardPanel();
        this.initEvent();
    }

    public set panel(value: PopRewardPanel) {
        this.mPanel = value;
    }

    public get panel(): PopRewardPanel {
        return this.mPanel as PopRewardPanel;
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
