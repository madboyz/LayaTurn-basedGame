import { SCopyData, SCopyEvent } from "../../../../../../net/data/SCopyData";
import { PetCopyRankPanel } from "../panel/PetCopyRankPanel";
import { DataManager } from "../../../../../../message/manager/DataManager";
import { S22001 } from "../../../../../../net/pt/pt_22";
import { SRankEvent, RankMainProrocol } from "../../../rank/protocol/RankMainProrocol";
import { RankType } from "../../../rank/panel/RankMainPanel";

export class PetCopyRankControl extends BaseControl {
    private protocol:RankMainProrocol;
    constructor() {
        super();
        this.panel = new PetCopyRankPanel();
        this.protocol = new RankMainProrocol();
        this.initEvent();
    }

    public set panel(value: PetCopyRankPanel) {
        this.mPanel = value;
    }

    public get panel(): PetCopyRankPanel {
        return this.mPanel as PetCopyRankPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SRankEvent.RANK_PET_COPY , this, this.send22001);
        SCopyData.instance.on(SCopyEvent.ANS_PETCOPYRANK_INFO,this,this.updateData);
        // DataManager.listen(PROTOCOL.E22001, this, this.onS22001);//通用排行榜
    }
    private removeEvent() {
        this.panel.off(SRankEvent.RANK_PET_COPY , this, this.send22001);
        SCopyData.instance.off(SCopyEvent.ANS_PETCOPYRANK_INFO,this,this.updateData);
        // DataManager.cancel(PROTOCOL.E22001, this, this.onS22001);//通用排行榜
    }

    private send22001():void{
        this.protocol.RequsetRank(RankType.DUNGEON_LEVEL , 50 ,1);
    }

    private updateData():void
    {
        this.panel.updateData();
    }

}