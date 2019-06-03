import { SCopyData, SCopyEvent } from "../../../../../../net/data/SCopyData";
import { ChuangTianGongRankPanel } from "../panel/ChuangTianGongRankPanel";

export class ChuangTianGongRankControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ChuangTianGongRankPanel();
        this.initEvent();
    }

    public set panel(value: ChuangTianGongRankPanel ) {
        this.mPanel = value;
    }

    public get panel(): ChuangTianGongRankPanel {
        return this.mPanel as ChuangTianGongRankPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SCopyData.instance.on(SCopyEvent.CHUANGTIANGONG_RANK_INFO, this, this.updateData);
    }
    private removeEvent() {
        SCopyData.instance.off(SCopyEvent.CHUANGTIANGONG_RANK_INFO, this, this.updateData);
    }

    private updateData(): void {
        this.panel.updateData();
    }

}