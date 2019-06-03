import { SuperBossChapPanel } from "../panel/SuperBossChapPanel";
import { WujinshilianEnterPanel } from "../panel/WujinshilianEnterPanel";

export class WujinshilianEnterControl extends BaseControl {
    constructor() {
        super();
        this.panel = new WujinshilianEnterPanel();
    }

    public set panel(value: WujinshilianEnterPanel) {
        this.mPanel = value;
    }

    public get panel(): WujinshilianEnterPanel {
        return this.mPanel as WujinshilianEnterPanel;
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