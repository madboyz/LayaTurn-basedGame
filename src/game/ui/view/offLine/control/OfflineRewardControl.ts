import { OfflineRewardProtocol } from "../protocol/OfflineRewardProtocol";
import { OfflineRewardPanel } from "../panel/OfflineRewardPanel";

export class OfflineRewardControl extends  BaseControl{
    private protocol:OfflineRewardProtocol;
    constructor() {
        super();
        this.panel = new OfflineRewardPanel();
        this.protocol = new OfflineRewardProtocol();
    }

    public set panel(value: OfflineRewardPanel) {
        this.mPanel = value;
    }

    public get panel(): OfflineRewardPanel {
        return this.mPanel as OfflineRewardPanel;
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