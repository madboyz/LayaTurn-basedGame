import { ComateRelivePanel } from "../panel/ComateRelivePanel";

export class ComateReliveControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateRelivePanel();
        this.initEvent();
    }

    public set panel(value: ComateRelivePanel) {
        this.mPanel = value;
    }

    public get panel(): ComateRelivePanel {
        return this.mPanel as ComateRelivePanel;
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