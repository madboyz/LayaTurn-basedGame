import { ShowRewardPanel } from "../panel/ShowRewardPanel";
import { ShowImagePanel } from "../panel/ShowImagePanel";

export class ShowImageControl extends BaseControl {

    constructor() {
        super();
        this.panel = new ShowImagePanel();
        this.initEvent();
    }

    public set panel(value: ShowImagePanel) {
        this.mPanel = value;
    }

    public get panel(): ShowImagePanel {
        return this.mPanel as ShowImagePanel;
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
