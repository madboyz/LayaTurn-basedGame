import { SCopyData, SCopyEvent } from "../../../../../../net/data/SCopyData";
import { SanjieCopyRankPanel } from "../panel/SanjieCopyRankPanel";

export class SanjieCopyRankControl extends BaseControl {
    constructor() {
        super();
        this.panel = new SanjieCopyRankPanel();
        this.initEvent();
    }

    public set panel(value: SanjieCopyRankPanel ) {
        this.mPanel = value;
    }

    public get panel(): SanjieCopyRankPanel {
        return this.mPanel as SanjieCopyRankPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SCopyData.instance.on(SCopyEvent.SANJIE_RANK_INFO, this, this.updateData);
    }
    private removeEvent() {
        SCopyData.instance.off(SCopyEvent.SANJIE_RANK_INFO, this, this.updateData);
    }

    private updateData(): void {
        this.panel.updateData();
    }

}