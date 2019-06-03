import { TejiQianghuaPanel } from "../panel/TejiQianghuaPanel";

export class TejiQianghuaControl extends BaseControl {
    constructor() {
        super();
        this.panel = new TejiQianghuaPanel();
    }

    public set panel(value: TejiQianghuaPanel) {
        this.mPanel = value;
    }

    public get panel(): TejiQianghuaPanel {
        return this.mPanel as TejiQianghuaPanel;
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