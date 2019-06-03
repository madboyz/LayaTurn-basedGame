import { ComateTupoPanel } from '../panel/ComateTupoPanel';

export class ComateTupoControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateTupoPanel();
        this.initEvent();
    }

    public set panel(value: ComateTupoPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateTupoPanel {
        return this.mPanel as ComateTupoPanel;
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