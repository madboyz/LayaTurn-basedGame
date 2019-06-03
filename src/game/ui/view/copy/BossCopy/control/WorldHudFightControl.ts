import { WorldHudFightPanel } from "../panel/WorldHudFightPanel";
import { SWorldBossData, SWorldBossEvent } from "../../../../../../net/data/SWorldBossData";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { S57103 } from "../../../../../../net/pt/pt_57";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { SGuildData, SGuildEvent } from "../../../guild/data/SGuildData";

export class WorldHudFightControl extends BaseControl {
    constructor() {
        super();
        this.panel = new WorldHudFightPanel();
    }

    public set panel(value: WorldHudFightPanel) {
        this.mPanel = value;
    }



    public get panel(): WorldHudFightPanel {
        return this.mPanel as WorldHudFightPanel;
    }

    openView(...args) {
        this.initEvent();
        if(!SCopyData.instance.curCopyInfo)
        return;
        SWorldBossData.instance.requsetWoldBossRank(SCopyData.instance.curCopyInfo.no);
        SWorldBossData.instance.updateInDunBossHP();
    }

    private initEvent() {
        SWorldBossData.instance.on(SWorldBossEvent.WORLD_BOSS_INFO_UPDATE , this ,this.onUpdateWorldBossInfo);
        SWorldBossData.instance.on(SWorldBossEvent.WORLD_BOSS_RANK_UPDATE , this ,this.onUpdateBossRank);

        SGuildData.instance.on(SGuildEvent.GUILD_BOSS_INFO_UPDATE, this ,this.onUpdateWorldBossInfo);
    }

    private removeEvent() {
        SWorldBossData.instance.off(SWorldBossEvent.WORLD_BOSS_INFO_UPDATE , this ,this.onUpdateWorldBossInfo);
        SWorldBossData.instance.off(SWorldBossEvent.WORLD_BOSS_RANK_UPDATE , this ,this.onUpdateBossRank);

        SGuildData.instance.off(SGuildEvent.GUILD_BOSS_INFO_UPDATE, this ,this.onUpdateWorldBossInfo);
    }
    
    private onUpdateBossRank(data:S57103)
    {
        this.panel.updateBossRank(data);
    }

    private onUpdateWorldBossInfo()
    {
        if(!SCopyData.instance.curCopyInfo)
        return;
        var vo = FbVo.get(SCopyData.instance.curCopyInfo.no);
        if(vo.isWorldBoss){
            var info = SWorldBossData.instance.WorldBossInfos.get(SCopyData.instance.curCopyInfo.no);
        }else if (vo.isGuildBoss){
            var info = SGuildData.instance.guildBossInfos.get(SCopyData.instance.curCopyInfo.no);
        }
        if(info)
        {
            this.panel.updateBossHp(info.cur_hp,info.max_hp);
        }
    }

    closeView() {
        super.closeView();
        this.removeEvent();
    }
}