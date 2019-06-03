import { BaseMachine } from "./BaseMachine";
import { FightInfo } from "../battle/model/FightInfo";
import { Delay } from "../../framework/utils/Delay";
import { Move } from "../battle/action/Move";
import { SNewBattleData, BubbleType } from "../../net/data/SNewBattleData";
import { ReportType } from "../battle/report/NewBaseReport";
import { PhysicalActionPlayer } from "../battle/action/PhysicalActionPlayer";
import { MagicActionPlayer } from "../battle/action/MagicActionPlayer";
import { BuffActionPlayer } from "../battle/action/BuffActionPlayer";
import { CallBoActionPlayer } from "../battle/action/CallBoActionPlayer";
import { HealActionPlayer } from "../battle/action/HealActionPlayer";
import { RunActionPlayer } from "../battle/action/RunActionPlayer";
import { S20006 } from "../../net/pt/pt_20";
import { FightView } from "../battle/role/fight/FightView";
import { Debug } from "../../debug/Debug";
/**
 * 战报播放器
 */
export class PlayReportMachine extends BaseMachine{
    private noti: Notice = new Notice;
    constructor()
    {
        super();
    }

    public async CheckPlayerPos(move: Move)
    {
        for (let i = 0; i < SNewBattleData.instance.allFightInfos.keys.length; i++) {
            var key = SNewBattleData.instance.allFightInfos.keys[i]
            var info:FightInfo = SNewBattleData.instance.allFightInfos.get(key);
            if(SNewBattleData.instance.ForceStop)
            {
                var role: FightView = SNewBattleData.instance.allBattleBo.get(key);
                role.x = role.OriginalX;
                role.y = role.OriginalY;
            }
            else
            {
                if(info.dead == DEAD_TYPE.NODEAD)
                {
                    await move.backToPlace(key);
                } 
            }
            
        }
    }

    public async PlayOneReport(PlayOneReport:any)
    {
        switch(PlayOneReport.reportType)
        {
            case ReportType.PHYSICAL_ATTACK:
            {
                Debug.serverLog("正在播放物理战报！")
                var move: Move = Laya.Pool.getItemByClass("Move", Move);
                while(PlayOneReport.AllAction.length > 0)
                {
                    if(SNewBattleData.instance.ForceStop)
                    {
                        break;
                    }
                    const action = PlayOneReport.AllAction.shift();
                    //对象池获取物理播放器
                    var phyPlayer: PhysicalActionPlayer = Laya.Pool.getItemByClass("PhysicalActionPlayer", PhysicalActionPlayer);
                    await phyPlayer.PlayAction(action , move , PlayOneReport.CmdPara ,  PlayOneReport.CmdType ,PlayOneReport.CurPickTarget);
                    phyPlayer.Dispose();
                }
                //action播完了
                await this.CheckPlayerPos(move);
                move.dispose();
                Debug.serverLog("物理战报播放完毕！")
                break;
            }
            case ReportType.MAGIC_ATTACK:
            {
                Debug.serverLog("正在播放法术战报！")
                var move: Move = Laya.Pool.getItemByClass("Move", Move);
                while(PlayOneReport.AllAction.length > 0)
                {
                    if(SNewBattleData.instance.ForceStop)
                    {
                        break;
                    }
                    const action = PlayOneReport.AllAction.shift();
                    var magPlayer: MagicActionPlayer = Laya.Pool.getItemByClass("MagicActionPlayer", MagicActionPlayer);
                    await magPlayer.PlayAction(action , move , PlayOneReport.CmdPara ,  PlayOneReport.CmdType ,PlayOneReport.CurPickTarget);
                    magPlayer.Dispose();  
                }
                //action播完了
                await this.CheckPlayerPos(move);
                move.dispose();
                Debug.serverLog("法术战报播放完毕！")
                break;
            }
            case ReportType.BUFF:
            {
                var move: Move = Laya.Pool.getItemByClass("Move", Move);
                Debug.serverLog("正在播放buff战报！")
                while(PlayOneReport.AllAction.length > 0)
                {
                    if(SNewBattleData.instance.ForceStop)
                    {
                        break;
                    }
                    const action = PlayOneReport.AllAction.shift();
                    var buffPlayer: BuffActionPlayer = Laya.Pool.getItemByClass("BuffActionPlayer", BuffActionPlayer);
                    await buffPlayer.PlayAction(action , move , PlayOneReport.CmdPara ,  PlayOneReport.CmdType ,PlayOneReport.CurPickTarget);
                    buffPlayer.Dispose();
                }
                await this.CheckPlayerPos(move);
                move.dispose();
                Debug.serverLog("buff战报播放完毕！")
                break;
            }
            case ReportType.SUMMON://召唤
            {
                if(!SNewBattleData.instance.ForceStop)
                {
                    var move: Move = Laya.Pool.getItemByClass("Move", Move);
                    const actions = PlayOneReport.AllAction.shift();
                    SNewBattleData.instance.ShowOneBubbleByType(PlayOneReport.CurActorId , BubbleType.SUMMON);
                    var callPlayer: CallBoActionPlayer = Laya.Pool.getItemByClass("CallBoActionPlayer", CallBoActionPlayer);
                    await callPlayer.PlayAction(actions, move , PlayOneReport.CmdPara ,  PlayOneReport.CmdType ,PlayOneReport.CurPickTarget);
                    move.dispose();
                    callPlayer.Dispose();
                }
                break;
            }
            case ReportType.HEAl:
            {
                var move: Move = Laya.Pool.getItemByClass("Move", Move);
                while(PlayOneReport.AllAction.length > 0&&!SNewBattleData.instance.ForceStop)
                {
                    const action = PlayOneReport.AllAction.shift();
                    var healPlayer: HealActionPlayer = Laya.Pool.getItemByClass("HealActionPlayer", HealActionPlayer);
                    await healPlayer.PlayAction(action , move , PlayOneReport.CmdPara ,  PlayOneReport.CmdType ,PlayOneReport.CurPickTarget);
                    healPlayer.Dispose();
                }
                await this.CheckPlayerPos(move);
                move.dispose();
                break;
            }
            case ReportType.BO_NEW_ADD://有可能62会在普通战报里面
            {
                if(!SNewBattleData.instance.ForceStop)
                {
                    var move: Move = Laya.Pool.getItemByClass("Move", Move);
                    const action = PlayOneReport.AllAction.shift();
                    var CallPlayer: CallBoActionPlayer = Laya.Pool.getItemByClass("CallBoActionPlayer", CallBoActionPlayer);
                    CallPlayer.CreateBo(action);
                    await Delay.delay(7*GameConfig.GAME_BATTLE_ANIMATION_SPEED);//写死7帧
                    CallPlayer.Dispose();
                    move.dispose();
                }
                break;
            }

            case ReportType.RUN:
            {
                if(!SNewBattleData.instance.ForceStop)
                {
                    var move: Move = Laya.Pool.getItemByClass("Move", Move);
                    const action = PlayOneReport.AllAction.shift();
                    var runPlayer: RunActionPlayer = Laya.Pool.getItemByClass("RunActionPlayer", RunActionPlayer);
                    runPlayer.PlayAction(action,move , PlayOneReport.CmdPara ,  PlayOneReport.CmdType ,PlayOneReport.CurPickTarget)
                    runPlayer.Dispose();
                    move.dispose();
                }
                break;
            }

            case ReportType.BATTLE_END:
            {
                if(!SNewBattleData.instance.ForceStop)
                {
                    var move: Move = Laya.Pool.getItemByClass("Move", Move);
                    const action:S20006 = PlayOneReport.AllAction.shift();
                    SNewBattleData.instance.BattleFinish(action.WinSide);
                    await this.CheckPlayerPos(move);
                    move.dispose();
                }
                break;
            }

            case ReportType.ROUND_END:
            {
                if(!SNewBattleData.instance.ForceStop)
                {
                    var move: Move = Laya.Pool.getItemByClass("Move", Move);
                    await this.CheckPlayerPos(move);
                    move.dispose();
                }
                break;
            }

        }
    }


    public init(info:Array<any>):void{
        super.init(info);
    }

    public update():void{
        super.update();
    }

    public dispose():void {
        super.dispose();
    }
}