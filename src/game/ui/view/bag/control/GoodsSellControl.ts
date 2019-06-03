import { GoodsSellPanel } from "../panel/GoodsSellPanel";

export class GoodsSellControl extends BaseControl {
    constructor() {
        super();
        this.panel = new GoodsSellPanel();
    }

    public set panel(value: GoodsSellPanel) {
        this.mPanel = value;
    }

    public get panel(): GoodsSellPanel {
        return this.mPanel as GoodsSellPanel;
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