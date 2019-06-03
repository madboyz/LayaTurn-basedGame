import { TejiQianghuaSelectPanel } from "../panel/TejiQianghuaSelectPanel";

export class TejiQianghuaSelectControl extends BaseControl {
    constructor() {
        super();
        this.panel = new TejiQianghuaSelectPanel();
    }

    public set panel(value: TejiQianghuaSelectPanel) {
        this.mPanel = value;
    }

    public get panel(): TejiQianghuaSelectPanel {
        return this.mPanel as TejiQianghuaSelectPanel;
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