import { S57104 } from "../../../../../../net/pt/pt_57";
import { TimerUtil } from "../../../../../utils/TimerUtil";

export class WorldBossKillPanel extends ui.main.WorldBossKillPanelUI
{
    constructor() {
        super(); 
        this.layer = UILEVEL.POP_3;
        this.sameLevelEliminate = false;
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/copy.atlas", type: Laya.Loader.ATLAS},
            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS},
        ];
    }

    public initComp() {
        super.initComp();
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
    }
    //WORLD_BOSS_KILL_RECORD
    public open(...args): void {
        super.open();
    }

    public onUpdateSkill(data:S57104)
    {
        var timeStr = "";
        var nameStr = "";
        var battleStr = "";
        for (let i = 0; i < 6; i++) {
            const element = data.item_1[i];
            var enterStr = "\n";
            if(element)
            {
                var now = new Date(element.TimeStamp*1000); 
                var _timeStr = TimerUtil.getStrTimeByDate(now);
                timeStr += `${_timeStr}${enterStr}`;
                nameStr += `${element.roleName}${enterStr}`;
                battleStr += `${element.Bp}${enterStr}`;
            }
        }

        this.TimeTxt.text = timeStr;
        this.NameTxt.text = nameStr;
        this.BattleTxt.text = battleStr;
    }

    public initEvent(): void {
    }

    public removeEvent(): void {

    }

    public close(): void {
        super.close();
    }
}