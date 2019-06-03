import { PropPanel } from "../panel/PropPanel";

export class PropControl extends BaseControl {
    private protocol:PropPanel;
    constructor() {
        super();
        this.panel = new PropPanel();
        this.initEvent();
    }

    public set panel(value: PropPanel) {
        this.mPanel = value;
    }

    public get panel(): PropPanel {
        return this.mPanel as PropPanel;
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