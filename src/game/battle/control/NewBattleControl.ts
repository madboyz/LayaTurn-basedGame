import { SNewBattleData, SNewBattleEvent, BattleState } from "../../../net/data/SNewBattleData";
import { ReportType } from "../report/NewBaseReport";
import { S20006 } from "../../../net/pt/pt_20";
import { MsgManager } from "../../ui/manager/MsgManager";
import { NewRoundActionPlayer } from "../action/NewRoundActionPlayer";
import { SkillVo, TARGET_TYPE_LIMIT } from "../../../db/sheet/vo/SkillVo";
import { RoleTouch } from "../../battle/scene/touch/RoleTouch";
import { FightView } from "../../battle/role/fight/FightView";
import { FightInfo } from "../../battle/model/FightInfo";
import { Move } from "../action/Move";
import { SGameData, SGameEvent } from "../../../net/data/SGameData";
import { Debug } from "../../../debug/Debug";

export class NewBattleControl extends BaseControl {
    
    private touchAnimName = "art/skill/fightTarget.json";
    constructor(){
        super();
        this.initEvent();
    }
    public get getEvent(): string[] {
        return [CMD.USE_SKILL];
    }

    private initEvent(): void {
        SNewBattleData.instance.on(SNewBattleEvent.START_PLAY_REPORT , this, this.onPlayReport);
        SNewBattleData.instance.on(SNewBattleEvent.ROUND_END_ACTION , this, this.onPlayerRoundEndAction);
    }

    public excuting(data: NotityData): void {
        if (data.event == CMD.USE_SKILL) {
            this.showClickEffect.apply(this, data.data);
        }
    }

    private showClickEffect(skillId: number, boid: number): void {
        var skillVo: SkillVo = SkillVo.get(skillId);
        if(skillVo.isPassive)
        return;
        var isSelf = false;
        for (let i = 0; i < skillVo.target_type_limit.length; i++) {
            const type = skillVo.target_type_limit[i];
            if(type == TARGET_TYPE_LIMIT.SELF)
            {
                isSelf = true;
                break;
            }
        }

        if(isSelf)
        {
            SNewBattleData.instance.protocol.send20030(boid, skillId, boid);
        }
        else
        {
            var boids: number[] = SNewBattleData.instance.getFighrBoidsCondition(skillVo.target_type_limit, boid);
            this.touch(boids, this.removeClickEffect, [boid, skillId]);
        }
    }

    private touch(boids: number[], callBack: Function, args1: any[]): void {
        if(SNewBattleData.instance.fightScene&& SNewBattleData.instance.fightScene.effectLayer)
        SNewBattleData.instance.fightScene.effectLayer.removeAnimation(this.touchAnimName);
        for (var i: number = 0; i < boids.length; i++) {
            var role: FightView = SNewBattleData.instance.allBattleBo.get(boids[i]);
            if(!role)
            continue;
            var info: FightInfo = SNewBattleData.instance.allFightInfos.get(boids[i])
            if(!info)
            continue;
            if(SNewBattleData.instance.fightScene&& SNewBattleData.instance.fightScene.effectLayer)
            {
                SNewBattleData.instance.fightScene.effectLayer.addEffect(boids[i], role.x, role.y + 30, this.touchAnimName, false, false);
            }
            
            RoleTouch.createTouch(role, boids[i], function (targetId: number, args: any[]) {
                args1.push(targetId);
                callBack.apply(this, args1);
                for (let index = 0; index < boids.length; index++) {
                    const element = boids[index];
                    RoleTouch.removeTouchByBoid(element);
                }
            }.bind(this));
        }
    }

    private removeClickEffect(boid: number, skillId: number, targetId: number): void {
        //发送攻击指令
        SNewBattleData.instance.protocol.send20030(boid, skillId, targetId);
        this.removeTouch();
    }

    private removeTouch():void{
        if(SNewBattleData.instance.fightScene&& SNewBattleData.instance.fightScene.effectLayer)
        SNewBattleData.instance.fightScene.effectLayer.removeAnimation(this.touchAnimName);
    }

    /**
     * 接到播战报
     */
    private onPlayReport()
    {
        if(SNewBattleData.instance.battleState == BattleState.REPORT_PLAYING)
        {
            return;
        }
        if(SNewBattleData.instance.roundEndReport.length > 0)
        {
            //防止如果服务端没有推20089的话需要调用一次
            this.onPlayerRoundEndAction();
            return;
        }
        this.removeTouch();
        SNewBattleData.instance.event(SNewBattleEvent.ROUND_TIME_START,[0]);
        this.PlayReport();
    }

    private async PlayReport()
    {
        if( SNewBattleData.instance.battleState == BattleState.REPORT_ROUND_END)
        {
            //如果正在处理回合结算就先不播战报 回合结算会主动调Play的
            return;
        }
        SNewBattleData.instance.battleState  = BattleState.REPORT_PLAYING;
        var report = SNewBattleData.instance.reportList.shift();
        if(!report)
        {
            SNewBattleData.instance.battleState = BattleState.REPORT_WAITING;//等待战报回来
            return;
        }
        else
        {
            if(!SNewBattleData.instance.fightScene)
            {
                return;
            }
            await SNewBattleData.instance.fightScene.playReportMachine.PlayOneReport(report);
            if(SNewBattleData.instance.ForceStop)
            {
                SNewBattleData.instance.ForceStop = false;
                return;
            }
            if(report.reportType == ReportType.BATTLE_END)
            {
                Debug.serverLog("战斗结束！");
                //const action:S20006 = report.AllAction.shift();
                //SNewBattleData.instance.BattleFinish(action.WinSide);
                return;
            }
            else if(report.reportType == ReportType.ROUND_END)
            {
                Debug.serverLog("战报播放完毕！");
                if(SNewBattleData.instance.reportList.length > 0)
                {
                    await this.PlayReport();
                }
                else
                {
                    SNewBattleData.instance.protocol.send20090();
                }
                
                return;
            }
            else
            {
                await this.PlayReport();
            }
            
        }
    }
    /**
     * 处理回合结束相关
     */
    private async onPlayerRoundEndAction()
    {
        if(SNewBattleData.instance.battleState == BattleState.REPORT_ROUND_END)
        return;
        SNewBattleData.instance.battleState = BattleState.REPORT_ROUND_END;//设置状态正在处理回合结束清算
        var move: Move = Laya.Pool.getItemByClass("Move", Move);
        var newPlayer: NewRoundActionPlayer = Laya.Pool.getItemByClass("NewRoundActionPlayer", NewRoundActionPlayer);
        //统一处理
        await newPlayer.PlayAction(SNewBattleData.instance.roundEndReport , move , 0,0,0);
        move.dispose();
        SNewBattleData.instance.roundEndReport = [];
        SNewBattleData.instance.battleState = BattleState.REPORT_PLAYING;
        this.PlayReport();
    }
}