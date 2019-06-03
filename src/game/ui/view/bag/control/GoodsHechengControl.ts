import { GoodsHechengPanel } from "../panel/GoodsHechengPanel";

export class GoodsHechengControl extends BaseControl {
    constructor() {
        super();
        this.panel = new GoodsHechengPanel();
    }

    public set panel(value: GoodsHechengPanel) {
        this.mPanel = value;
    }

    public get panel(): GoodsHechengPanel {
        return this.mPanel as GoodsHechengPanel;
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