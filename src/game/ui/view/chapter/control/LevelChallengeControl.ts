import { ChapterProtocol } from "../../../../chapter/protocol/ChapterProtocol";
import { SChapterData } from "../../../../chapter/SChapterData";
import { LevelChallengePanel } from "../panel/LevelChallengePanel";
import { DataManager } from "../../../../../message/manager/DataManager";
import { RankType } from "../../rank/panel/RankMainPanel";
import { RankMainProrocol } from "../../rank/protocol/RankMainProrocol";
import { S22001 } from "../../../../../net/pt/pt_22";

export class LevelChallengeControl extends BaseControl {
    private protocol: ChapterProtocol;
    constructor() {
        super();
        this.panel = new LevelChallengePanel();
        this.protocol = SChapterData.instance.Protocol;
    }
    public set panel(value: LevelChallengePanel) {
        this.mPanel = value;
    }
    public get panel(): LevelChallengePanel {
        return this.mPanel as LevelChallengePanel;
    }

    openView(...args) {
        this.initEvent();
        this.initRequest();
    }

    private initEvent() {
        DataManager.listen(PROTOCOL.E22001, this, this.onS22001);//个人排行榜
    }

    private removeEvent() {
        DataManager.cancel(PROTOCOL.E22001, this, this.onS22001);//个人排行榜
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initRequest(): void {
        (new RankMainProrocol()).RequsetRank(RankType.MAIN_LEVEL, 4, 1);
    }


    private onS22001(data: S22001) {
        if (data.RankType == RankType.MAIN_LEVEL) {
            this.panel.updateRank(data);
        }

    }


}