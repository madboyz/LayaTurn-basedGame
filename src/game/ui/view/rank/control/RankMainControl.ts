import { RankMainPanel, RankType } from "../panel/RankMainPanel";
import { RankMainProrocol, SRankEvent } from "../protocol/RankMainProrocol";
import { DataManager } from "../../../../../message/manager/DataManager";
import { S22001, S22002 } from "../../../../../net/pt/pt_22";

export class RankMainControl extends BaseControl {
    private protocol:RankMainProrocol;
    constructor() {
        super();
        this.panel = new RankMainPanel();
        this.protocol = new RankMainProrocol();
    }
    public set panel(value: RankMainPanel) {
        this.mPanel = value;
    }

    public get panel(): RankMainPanel {
        return this.mPanel as RankMainPanel;
    }

    openView(...args) {
        this.initEvent();
        super.openView(args);
        this.panel.updateRank(args);
    }
    

    private RequsetPage(pageNo:number , rankType:number)
    {
        var pageSize = 4;
        if(pageNo == 1)
        {
            pageSize = 4;//5;不知道为什么写5
        }
        this.protocol.RequsetRank(rankType , pageSize , pageNo);
    }

    private initEvent() {
        this.panel.on(SRankEvent.RANK_PAGE_LIST , this, this.RequsetPage);
        DataManager.listen(PROTOCOL.E22001, this, this.onS22001);//个人排行榜
        DataManager.listen(PROTOCOL.E22002, this, this.onS22002);//非角色排行榜
    }

    private removeEvent() {        
        this.panel.off(SRankEvent.RANK_PAGE_LIST , this, this.RequsetPage);
        DataManager.cancel(PROTOCOL.E22001, this, this.onS22001);//个人排行榜
        DataManager.cancel(PROTOCOL.E22002, this, this.onS22002);//非角色排行榜
    }

    private onS22001(data:S22001) {
        this.panel.updatePage(data.RankType , data);
    }

    private onS22002(data:S22002) {
        this.panel.updatePage(data.RankType , data);
    }

    closeView() {
        super.closeView();
        this.removeEvent();
    }
}