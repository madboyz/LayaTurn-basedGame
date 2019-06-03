import { GonggaoPanel } from '../panel/GonggaoPanel';

export class GonggaoControl extends BaseControl {
    constructor() {
        super();
        this.panel = new GonggaoPanel();
    }

    public set panel(value: GonggaoPanel) {
        this.mPanel = value;
    }
    public get panel(): GonggaoPanel {
        return this.mPanel as GonggaoPanel;
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