import { ShowRewardPanel } from "../panel/ShowRewardPanel";

export class ShowRewardControl extends BaseControl {

    constructor() {
        super();
        this.panel = new ShowRewardPanel();
        this.initEvent();
    }

    public set panel(value: ShowRewardPanel) {
        this.mPanel = value;
    }

    public get panel(): ShowRewardPanel {
        return this.mPanel as ShowRewardPanel;
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
