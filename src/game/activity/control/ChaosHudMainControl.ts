import { ChaosHudMainPanel } from "../view/ChaosHudMainPanel";
import { SChaosBattleData, SChaosBattleEvent } from "../data/SChaosBattleData";
import { SRoleData } from "../../../net/data/SRoleData";
import { SGameData, SGameEvent } from "../../../net/data/SGameData";
import { CommonControl } from "../../common/control/CommonControl";

export class ChaosHudMainControl extends BaseControl {
    private CutPkPlayerTime = 10;
    constructor() {
        super();
        this.panel = new ChaosHudMainPanel();
    }

    public set panel(value: ChaosHudMainPanel) {
        this.mPanel = value;
    }



    public get panel(): ChaosHudMainPanel {
        return this.mPanel as ChaosHudMainPanel;
    }

    openView(...args) {
        this.CutPkPlayerTime = 10;
        this.initEvent();
        this.onUpdateFightState();
        SChaosBattleData.instance.protocol.send28004([SRoleData.instance.roleId]);
    }

    private initEvent() {
        SChaosBattleData.instance.on(SChaosBattleEvent.CHAOS_BALL_UPDATE , this , this.BallUdpate);
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE,this,this.onUpdateFightState);
        SGameData.instance.on(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
    }

    private removeEvent() {
        SChaosBattleData.instance.off(SChaosBattleEvent.CHAOS_BALL_UPDATE , this , this.BallUdpate);
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE,this,this.onUpdateFightState);
        SGameData.instance.off(SGameEvent.GAME_TIME_UPDATE,this,this.UpdateTime);
    }
    /**
     * 每秒会推的
     */
    private UpdateTime(){
        this.panel.onUpdateTimeDisplay();
        if(SGameData.instance.PLAYFIGHTREPORT == true||!SChaosBattleData.instance.AutoPKPlayer)
        {
            this.CutPkPlayerTime = 10;
            return;
        }
        if(this.CutPkPlayerTime > 0)
        {
            this.CutPkPlayerTime--;
        }
        else if(this.CutPkPlayerTime == 0)
        {
            this.CutPkPlayerTime = 10;
            var playerId = SChaosBattleData.instance.GetCanPkPlayer();
            if(playerId != 0)
            {
                CommonControl.instance.SendPk(playerId , PKType.Force);
            }
        }
    }

    private onUpdateFightState()
    {
        this.panel.LeftBottom.visible = !SGameData.instance.PLAYFIGHTREPORT;
    }

    private BallUdpate()
    {
        var num = SChaosBattleData.instance.PlayerBall.get(SRoleData.instance.roleId);
        //if(!num)
        //{
        //    num = 0;
        //}
        this.panel.udpateBallNum(num);
    }

    closeView() {
        super.closeView();
        this.removeEvent();
    }
}