import { SuperBossChapPanel } from "../panel/SuperBossChapPanel";

export class SuperBossChapControl extends BaseControl {
    constructor() {
        super();
        this.panel = new SuperBossChapPanel();
    }

    public set panel(value: SuperBossChapPanel) {
        this.mPanel = value;
    }

    public get panel(): SuperBossChapPanel {
        return this.mPanel as SuperBossChapPanel;
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