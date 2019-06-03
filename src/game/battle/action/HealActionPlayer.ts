import { BaseActionPlayer } from "./BaseActionPlayer";
import { Move } from "./Move";
import { FightView } from "../../battle/role/fight/FightView";
import { SNewBattleData, BubbleType } from "../../../net/data/SNewBattleData";
import { FightInfo } from "../../battle/model/FightInfo";
import { SkillVo } from "../../../db/sheet/vo/SkillVo";
import { EffectLayer } from "../../battle/scene/layer/EffectLayer";
import { Delay } from "../../../framework/utils/Delay";
import { MsgManager } from "../../ui/manager/MsgManager";
import { BattleUtil } from "../BattleUtil";
import { MsgRollTipsType } from "../../ui/compent/MsgRollTipsType";
/**
 * 医疗播放器
 */
export class HealActionPlayer extends BaseActionPlayer
{
    public Dispose(): void {
        super.Dispose();
        Laya.Pool.recover("HealActionPlayer", this);
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
        await this.AttackAction(move ,AttackInfo, CurPickTarget , 0 ,AttackType,skillId,0);
        if(SNewBattleData.instance.ForceStop)
        return;
        if(AttackInfo.Result == 1)
        {
            //MsgManager.instance.showRollTipsMsg("未命中！",MsgRollTipsType.msgRollTips2);
            return;
        }
        //处理飘血等
        this.ShowDamageAndBloodAndBuff(AttackInfo , DeferInfos , null, AttackInfo.Result , null);
        await this.OtherAction(DeferInfos, AttackInfo,move,skillId);
        if(SNewBattleData.instance.ForceStop)
        return;
        //统一处理死亡
        for (let i = 0; i < DeferInfos.length; i++) {
            const DeferInfo = DeferInfos[i];
            if(SNewBattleData.instance.ForceStop)
            break;
            if(DeferInfo.IsCannotBeHeal != 11||DeferInfo.IsCannotBeHeal == 12||DeferInfo.IsCannotBeHeal == 13)
            continue;
            var DieStatus = 0;
            switch(DeferInfo.IsCannotBeHeal)
            {
                case 11://11 扣血并倒地
                {
                    DieStatus = DEAD_TYPE.INVERTED;
                    break;
                }
                case 12://12 扣血并灵魂
                {
                    DieStatus = DEAD_TYPE.GHOST;
                    break;
                }
                case 13://13 扣血并死亡
                {
                    DieStatus = DEAD_TYPE.DISAPPEAR;
                    break;
                }
            }
            if(i == DeferInfos.length-1)
            {
                await this.Dead(DieStatus , DeferInfo.Id , 0 , move);
            }
            else
            {
                this.Dead(DieStatus , DeferInfo.Id , 0 , move);
            }
        }

    }
    protected ShowDamageAndBloodAndBuff(AttackInfo:any, DeferInfos:any , ProtectorInfo:any , AttResult:number ,SplashInfos:any)
    {
        for (let i = 0; i < DeferInfos.length; i++) {
            const DeferInfo = DeferInfos[i];
            
            this.UpdateBuff(DeferInfo.CutBuffs ,DeferInfo.Id , false);
            this.UpdateBuff(DeferInfo.AddBuffs ,DeferInfo.Id , true);
            SNewBattleData.instance.fightScene.tweenBlood(DeferInfo.Id ,
                DeferInfo.HpLeft , DeferInfo.MpLeft ,DeferInfo.AngerLeft);
            if(DeferInfo.IsCannotBeHeal == 1)
            continue;
            SNewBattleData.instance.ShowOneBubbleByType(DeferInfo.Id,BubbleType.BE_HEAL);
            var isCurHeal = DeferInfo.IsCannotBeHeal == 1?false:true;
            var DamToDefer = 0;
            var DamToDefer_Mp = 0;
            var DamToDefer_Anger = 0;    
            switch(AttackInfo.HealType)
            {
                case 1://1：加血
                {
                    DamToDefer = isCurHeal== true?-DeferInfo.HealVal:DeferInfo.HealVal;
                    break;
                }
                case 2://2：加蓝
                {
                    DamToDefer_Mp = isCurHeal== true? -DeferInfo.HealVal:DeferInfo.HealVal;
                    break;
                }
                case 3://3：加血加蓝
                {
                    DamToDefer = isCurHeal== true? -DeferInfo.HealVal:DeferInfo.HealVal;
                    DamToDefer_Mp = DamToDefer;
                    break;
                }
            }
            SNewBattleData.instance.fightScene.showDamTxt(DeferInfo.Id, DamToDefer, 
                DamToDefer_Mp, DamToDefer_Anger,false);

        }
        
        
        //施法者blood进度条更新
        SNewBattleData.instance.fightScene.tweenBlood(AttackInfo.Id ,
            AttackInfo.HpLeft , AttackInfo.MpLeft ,AttackInfo.AngerLeft);
    }

    protected async OtherAction(DeferInfos:any , AttackInfo:any ,move: Move, skillId:number)
    {
        //特效
        var isNeedDely = false;
        var skillVo: SkillVo = null;
        
       
        //if(isNeedDely)
        //{
        //    var defTime = 0;
        //    if(skillVo)
        //    {
        //        defTime = skillVo.target_act_time_list;
        //    }
        //    if(defTime == 0)
        //    {
        //        defTime = GameConfig.GAME_BATTLE_BE_HIT_EFFECT_DELY;
        //    }
        //    await Delay.delay(defTime);
        //}

        
        if(AttackInfo.HasReviveEff == 1)
        {
            for (let i = 0; i < DeferInfos.length; i++) {
                const DeferInfo = DeferInfos[i];
                if(SNewBattleData.instance.ForceStop)
                break;
                if(i == DeferInfos.length-1)
                {
                    await this.Relive(DeferInfo.Id,move);
                }
                else
                {
                    this.Relive(DeferInfo.Id,move);
                }
            }
        }
        else
        {
            if(skillVo&&skillVo.target_act == HIT_ACTION.NONE)return;
            for (let i = 0; i < DeferInfos.length; i++) {
                const DeferInfo = DeferInfos[i];
                
                var defView: FightView = SNewBattleData.instance.allBattleBo.get(DeferInfo.Id);
                var defInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(DeferInfo.Id);
                if(!defView||!defInfo)
                continue;
                
                var defTime = GameConfig.GAME_BATTLE_BE_HIT_EFFECT_DELY;
                if(skillId != 0)
                {
                    skillVo = SkillVo.get(skillId);
                    if(skillVo)
                    {
                        var effect_nameList = skillVo.target_eff;;
                        if(effect_nameList != null&&effect_nameList.length > 0)
                        {
                            var effectLayer = SNewBattleData.instance.fightScene.effectLayer;
                            if(effectLayer)
                            {
                                var url = ResUtils.getSkillUrl(effect_nameList[0]);
                                if(effect_nameList.length > 1)
                                url = ResUtils.getSkillUrl(defInfo.isMain ?  effect_nameList[0] : effect_nameList[1]);
                                effectLayer.addEffect(defInfo.boid ,defView.x,defView.y,url,defInfo.isMain);//播放施法动作
                                isNeedDely = true;
                            }
                        }
                          
                    }
                }
                if(SNewBattleData.instance.ForceStop)
                break;
                if(DeferInfo.IsCannotBeHeal != 10)
                {
                    if(isNeedDely)
                    {
                        if(i == DeferInfos.length-1)
                        {
                           
                            await Delay.delay(defTime);
                            if(SNewBattleData.instance.ForceStop)
                            break;
                        }
                    }
                    continue;
                }
                
                var dis = defInfo.isMain ? 30 : -30;
                if(i == DeferInfos.length-1)
                {
                    await defView.moveDefence(dis ,defTime);
                }
                else
                {
                    defView.moveDefence(dis ,defTime);
                }
                
            }
        }
    }
}