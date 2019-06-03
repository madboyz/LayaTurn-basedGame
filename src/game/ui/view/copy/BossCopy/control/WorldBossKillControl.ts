import { WorldBossKillPanel } from "../panel/WorldBossKillPanel";
import { SWorldBossData, SWorldBossEvent } from "../../../../../../net/data/SWorldBossData";
import { S57104 } from "../../../../../../net/pt/pt_57";

export class WorldBossKillControl extends BaseControl {
    constructor() {
        super();
        this.panel = new WorldBossKillPanel();
    }
    public set panel(value: WorldBossKillPanel) {
        this.mPanel = value;
    }

    public get panel(): WorldBossKillPanel {
        return this.mPanel as WorldBossKillPanel;
    }

    openView(...args) {
        this.initEvent();if(args[0])
        {
            var no = args[0];
            SWorldBossData.instance.requsetWoldBossRecord(no);
        }
    }

    private initEvent() {
        SWorldBossData.instance.on(SWorldBossEvent.WORLD_BOSS_KILL_RECORD , this ,this.onUpdateBossRecord);
    }

    private removeEvent() {
        SWorldBossData.instance.off(SWorldBossEvent.WORLD_BOSS_KILL_RECORD , this ,this.onUpdateBossRecord);
    }

    private onUpdateBossRecord(data:S57104)
    {
        this.panel.onUpdateSkill(data);
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

}