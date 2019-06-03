import { WorldBossDamageRankPanel } from "../panel/WorldBossDamageRankPanel";
import { SWorldBossData, SWorldBossEvent } from "../../../../../../net/data/SWorldBossData";
import { S57103 } from "../../../../../../net/pt/pt_57";

export class WorldBossDamageRankControl extends BaseControl {
    constructor(){
        super();
        this.panel = new WorldBossDamageRankPanel();
    }
    openView(...args) {
        this.initEvent();
        if(args[0])
        {
            var no = args[0];
            SWorldBossData.instance.requsetWoldBossRank(no);
        }
        
    }

    public set panel(value: WorldBossDamageRankPanel) {
        this.mPanel = value;
    }
    public get panel(): WorldBossDamageRankPanel {
        return this.mPanel as WorldBossDamageRankPanel;
    }

    private onUpdateBossRank(data:S57103)
    {
        this.panel.updateBossRank(data);
    }

    private initEvent() {
        SWorldBossData.instance.on(SWorldBossEvent.WORLD_BOSS_RANK_UPDATE , this ,this.onUpdateBossRank);
    }

    private removeEvent() {
        SWorldBossData.instance.off(SWorldBossEvent.WORLD_BOSS_RANK_UPDATE , this ,this.onUpdateBossRank);
    }
    
    closeView() {
        this.removeEvent();
        super.closeView();
    }
}