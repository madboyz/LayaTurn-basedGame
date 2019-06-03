import { BaseActionPlayer } from "./BaseActionPlayer";
import { Move } from "./Move";
import { FightView } from "../../battle/role/fight/FightView";
import { SNewBattleData } from "../../../net/data/SNewBattleData";
import { FightInfo } from "../../battle/model/FightInfo";
import { SkillVo } from "../../../db/sheet/vo/SkillVo";
import { EffectLayer } from "../../battle/scene/layer/EffectLayer";
import { Delay } from "../../../framework/utils/Delay";
import { MsgManager } from "../../ui/manager/MsgManager";
import { BattleUtil } from "../BattleUtil";
import { MsgRollTipsType } from "../../ui/compent/MsgRollTipsType";
/**
 * buff播放器
 */
export class BuffActionPlayer extends BaseActionPlayer
{
    public Dispose(): void {
        super.Dispose();
        Laya.Pool.recover("BuffActionPlayer", this);
    }
    public async PlayAction(action:any , move: Move , CmdPara:number , CmdType:number , CurPickTarget:number)
    {
        super.PlayAction(action, move , CmdPara , CmdType , CurPickTarget);
        var AttackInfo = action.AttackInfo;
        var DeferInfos = action.DeferInfos;//多个防御者
        var skillId = CmdPara;
        var AttackType = CmdType;
        if(SNewBattleData.instance.ForceStop)
        return;
        if(AttackInfo.NeedPerfCasting == 1)//1要施展动作
        {
            await this.AttackAction(move ,AttackInfo, CurPickTarget , 0 ,AttackType,skillId,0);
        }
        if(AttackInfo.Result == 1)//0命中1未命中
        {
            //MsgManager.instance.showRollTipsMsg("未命中！",MsgRollTipsType.msgRollTips2);
            return;
        }
        if(SNewBattleData.instance.ForceStop)
        return;
        await this.OtherAction(DeferInfos, null,null,skillId);
    }

    protected async OtherAction(DeferInfos:any , ProtectorInfo:any ,SplashInfos:any, skillId:number)
    {
        super.OtherAction(DeferInfos , ProtectorInfo ,SplashInfos, skillId);
        
        var defTime = GameConfig.GAME_BATTLE_BE_HIT_EFFECT_DELY;
        for (let i = 0; i < DeferInfos.length; i++) {
            const DeferInfo = DeferInfos[i];
            //var skillVo: SkillVo = null;
            //if(skillId != 0)
            //{
            //    skillVo = SkillVo.get(skillId);
            //    var defView: FightView = SNewBattleData.instance.allBattleBo.get(DeferInfo.Id);
            //    var defInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(DeferInfo.Id);
            //    var isNeedDely = false;
            //    if(skillVo&&defView&&defInfo)
            //    {
            //        
            //        var effect_nameList = skillVo.target_eff_self;
            //    
            //        if(effect_nameList != null&&effect_nameList.length > 0)
            //        {
            //            var effectLayer = SNewBattleData.instance.fightScene.effectLayer;
            //            if(effectLayer)
            //            {
            //                var url = ResUtils.getSkillUrl(effect_nameList[0]);
            //                if(effect_nameList.length > 1)
            //                    url = ResUtils.getSkillUrl(defInfo.isMain ?  effect_nameList[0] : effect_nameList[1]);
            //                effectLayer.addEffect(defInfo.boid ,defView.x,defView.y,url , defInfo.isMain);//播放施法动作
            //                isNeedDely = true;
            //            }
            //        }
            //    }
            //}
            //if(i == DeferInfos.length -1)
            //{
            //    if(isNeedDely)
            //    await Delay.delay(defTime);
            //}
            this.UpdateBuff(DeferInfo.CutBuffs ,DeferInfo.Id , false);
            this.UpdateBuff(DeferInfo.AddBuffs ,DeferInfo.Id , true);
            this.UpdateBuff(DeferInfo.UpdateBuffs ,DeferInfo.Id , true);
        }
        
    }

}