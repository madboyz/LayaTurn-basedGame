import { ChaoPlayerPanel } from "../view/ChaoPlayerPanel";
import { SChaosBattleData, SChaosBattleEvent } from "../data/SChaosBattleData";
import { S20002 } from "../../../net/pt/pt_20";
import { SNewBattleEvent, SNewBattleData } from "../../../net/data/SNewBattleData";

export class ChaoPlayerControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ChaoPlayerPanel();
    }

    public set panel(value: ChaoPlayerPanel) {
        this.mPanel = value;
    }

    public get panel(): ChaoPlayerPanel {
        return this.mPanel as ChaoPlayerPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    private initEvent() {
        SChaosBattleData.instance.on(SChaosBattleEvent.CHAOS_BALL_UPDATE , this , this.BallUdpate);
        SNewBattleData.instance.on(SNewBattleEvent.PK_PLAYER_CALL_BACK , this , this.PkCallBack);

    }

    private removeEvent() {
        SChaosBattleData.instance.off(SChaosBattleEvent.CHAOS_BALL_UPDATE , this , this.BallUdpate);
        SNewBattleData.instance.off(SNewBattleEvent.PK_PLAYER_CALL_BACK , this , this.PkCallBack);
    }

    private PkCallBack(data:S20002)
    {
        if(data.RetCode == 0)
        {
            this.panel.close()
        }
    }

    private BallUdpate()
    {
        this.panel.updateBallNum();
    }

    closeView() {
        super.closeView();
        this.removeEvent();
    }
}