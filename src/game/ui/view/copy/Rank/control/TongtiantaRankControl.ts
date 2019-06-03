import { SCopyData, SCopyEvent } from "../../../../../../net/data/SCopyData";
import { RankMainProrocol, SRankEvent } from "../../../rank/protocol/RankMainProrocol";
import { TongtiantaRankPanel } from "../panel/TongtiantaRankPanel";
import { RankType } from "../../../rank/panel/RankMainPanel";

export class TongtiantaRankControl extends BaseControl {
    private protocol: RankMainProrocol;
    constructor() {
        super();
        this.panel = new TongtiantaRankPanel();
        this.protocol = new RankMainProrocol();
        this.initEvent();
    }

    public set panel(value: TongtiantaRankPanel ) {
        this.mPanel = value;
    }

    public get panel(): TongtiantaRankPanel {
        return this.mPanel as TongtiantaRankPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SRankEvent.RANK_TTT , this, this.RequsetRank);
        SCopyData.instance.on(SCopyEvent.COPY_TTTRANKINFO, this, this.updateData);
    }
    private removeEvent() {
        this.panel.off(SRankEvent.RANK_TTT , this, this.RequsetRank);
        SCopyData.instance.off(SCopyEvent.COPY_TTTRANKINFO, this, this.updateData);
    }

    private updateData(): void {
        this.panel.updateData();
    }

    private RequsetRank():void{
        this.protocol.RequsetRank(RankType.TONGTIANTA , 50 ,1);
    }





}