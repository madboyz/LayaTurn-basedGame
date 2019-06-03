import { BaseActionPlayer } from "./BaseActionPlayer";
import { Move } from "./Move";
import { Delay } from "../../../framework/utils/Delay";
import { SkillVo } from "../../../db/sheet/vo/SkillVo";
import { EffectLayer } from "../../battle/scene/layer/EffectLayer";
import { FightView } from "../../battle/role/fight/FightView";
import { SNewBattleData, BubbleType } from "../../../net/data/SNewBattleData";
import { FightInfo } from "../../battle/model/FightInfo";
/**
 * 魔法攻击播放器
 */
export class MagicActionPlayer extends BaseActionPlayer
{
    public Dispose(): void {
        super.Dispose();
        Laya.Pool.recover("MagicActionPlayer", this);
    }

    public async PlayAction(action:any , move: Move , CmdPara:number , CmdType:number , CurPickTarget:number)
    {
        super.PlayAction(action, move , CmdPara , CmdType , CurPickTarget);

        var AttackInfo = action.AttackInfo;
        var DeferInfos = action.DeferInfos;//多个防御者
        var SplashInfos = action.SplashInfos;
        var AttSubType = action.AttSubType;
        var skillId = CmdPara;
        var AttackType = CmdType;

        
        var firstDefer = DeferInfos[0];
        if(SNewBattleData.instance.ForceStop)
        return;
        await this.AttackAction(move ,AttackInfo, firstDefer.Id , 0 ,AttackType,skillId,AttSubType);
        if(SNewBattleData.instance.ForceStop)
        return;
        //处理飘血等
        this.ShowDamage(AttackInfo , DeferInfos , null, 0 , SplashInfos);
        //处理 反震 分裂等图标
        this.ShowVlueAndIcon(AttackInfo ,DeferInfos,null);
        //血条
        this.BloodChange(AttackInfo,DeferInfos,null,SplashInfos);
        await this.OtherAction(DeferInfos, null,SplashInfos,skillId , AttSubType);
        if(SNewBattleData.instance.ForceStop)
        return;
        //处理死亡
        this.Dead(AttackInfo.DieStatus ,AttackInfo.Id , AttackInfo.IsApplyReborn , move);
        for (let i = 0; i < SplashInfos.length; i++) {
            const SplashInfo = SplashInfos[i];
            this.Dead(SplashInfo.DieStatus ,SplashInfo.Id , SplashInfo.IsApplyReborn , move);
        }
        for (let i = 0; i < DeferInfos.length; i++) {
            const DeferInfo = DeferInfos[i];
            if(SNewBattleData.instance.ForceStop)
            break;
            if(i == DeferInfos.length -1)
            {
                await this.Dead(DeferInfo.DieStatus ,DeferInfo.Id , DeferInfo.IsApplyReborn , move);
            }
            else
            {
                this.Dead(DeferInfo.DieStatus ,DeferInfo.Id , DeferInfo.IsApplyReborn , move);
            }
        }
    }
    protected async OtherAction(DeferInfos:any , ProtectorInfo:any ,SplashInfos:any, skillId:number , AttSubType) 
    {
        super.OtherAction(DeferInfos , ProtectorInfo ,SplashInfos, skillId);
        for (let i = 0; i < DeferInfos.length; i++) {
            const DeferInfo = DeferInfos[i];
            this.UpdateBuff(DeferInfo.CutBuffs ,DeferInfo.Id , false);
            this.UpdateBuff(DeferInfo.AddBuffs ,DeferInfo.Id , true);
            this.UpdateBuff(DeferInfo.UpdateBuffs ,DeferInfo.Id , true);
            var isNeedDely = false;
            //防御者 保护者 溅射一起处理
            var defView: FightView = SNewBattleData.instance.allBattleBo.get(DeferInfo.Id);
            var defInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(DeferInfo.Id);
            if(!defView&&!defInfo)
            continue;
            SNewBattleData.instance.ShowOneBubbleByType(DeferInfo.Id,BubbleType.BE_ATTACT);
            var skillVo: SkillVo = null;
            var url = "";
            if(skillId != 0)
            {
                skillVo = SkillVo.get(skillId);
                if(skillVo)
                {
                    var effect_nameList = skillVo.target_eff;
                
                    if(effect_nameList != null&&effect_nameList.length > 0)
                    {
                        var effectLayer = SNewBattleData.instance.fightScene.effectLayer;
                        if(effectLayer)
                        {
                            url = ResUtils.getSkillUrl(effect_nameList[0]);
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
            var defTime = GameConfig.GAME_BATTLE_BE_HIT_EFFECT_DELY;
            if(skillVo&&skillVo.target_act == HIT_ACTION.NONE)
            {
                if(isNeedDely)
                {
                    if(i == DeferInfos.length -1)
                    {
                        await Delay.delay(defTime);
                        if(SNewBattleData.instance.ForceStop)
                        break;
                    }
                }
                continue;
            }
            var dis = defInfo.isMain ? 30 : -30;
            //if(isNeedDely)
            //{
            //    if(skillVo&&skillVo.target_act_time_list > 0)
            //    {
            //        defTime = skillVo.target_act_time_list;
            //    }
            //    if(i == DeferInfos.length -1)
            //    {
            //        //Delay.delay(defTime);
            //        this.SputteringDefence(defTime ,SplashInfos);
            //        await defView.moveDefence(dis ,defTime);
            //    }
            //    else
            //    {
            //        this.SputteringDefence(defTime ,SplashInfos);
            //        defView.moveDefence(dis ,defTime);
            //    }
            //}
            //else
            //{
                this.SputteringDefence(defTime ,SplashInfos , AttSubType , url);
                if(i == DeferInfos.length -1)
                {
                    if(AttSubType == ATTSUBTYPE.BACK_ATTACK)
                    await defView.defence(defTime);
                    else
                    await defView.moveDefence(dis ,defTime);
                }
                else
                {
                    if(AttSubType == ATTSUBTYPE.BACK_ATTACK)
                    defView.defence(defTime);
                    else
                    defView.moveDefence(dis ,defTime);
                }
            //}
        }
    }

    protected ShowDamage(AttackInfo:any, DeferInfos:any , ProtectorInfo:any , AttResult:number ,SplashInfos:any)
    {
        super.ShowDamage(AttackInfo , DeferInfos , ProtectorInfo , AttResult ,SplashInfos);
        //吸血
        SNewBattleData.instance.fightScene.showDamTxt(AttackInfo.Id, -AttackInfo.AbsorbedHp, 0, 0);
        //反弹伤害
        SNewBattleData.instance.fightScene.showDamTxt(AttackInfo.Id ,AttackInfo.RetDam , 0 ,0);
        //防御者所有伤害
        var hasCrit = false;
        for (let i = 0; i < DeferInfos.length; i++) {
            const DeferInfo = DeferInfos[i];
            SNewBattleData.instance.fightScene.showDamTxt(DeferInfo.Id, DeferInfo.DamToDefer, 
                DeferInfo.DamToDefer_Mp, DeferInfo.DamToDefer_Anger,DeferInfo.AttResult == ATTACK_RESULT.CRIT);
            if(hasCrit&&DeferInfo.DamToDefer_Anger,DeferInfo.AttResult == ATTACK_RESULT.CRIT)
            hasCrit = true;
        }
        if(hasCrit)
        SNewBattleData.instance.fightScene.Shake();

        for (let i = 0; i < SplashInfos.length; i++) {
            const SplashInfo = SplashInfos[i];
            SNewBattleData.instance.fightScene.showDamTxt(SplashInfo.Id, SplashInfo.SplashDam_Hp, 
                SplashInfo.SplashDam_Mp, SplashInfo.SplashDam_Anger);
        }

    }

    protected BloodChange(AttackInfo:any , DeferInfos:any , ProtectorInfo:any  ,SplashInfos:any)
    {
        super.BloodChange(AttackInfo , DeferInfos, ProtectorInfo , SplashInfos);
        SNewBattleData.instance.fightScene.tweenBlood(AttackInfo.Id ,
            AttackInfo.HpLeft , AttackInfo.MpLeft ,AttackInfo.AngerLeft);

        for (let i = 0; i < DeferInfos.length; i++) {
            const DeferInfo = DeferInfos[i];
            SNewBattleData.instance.fightScene.tweenBlood(DeferInfo.Id ,
                DeferInfo.HpLeft , DeferInfo.MpLeft ,DeferInfo.AngerLeft);
        }
        for (let i = 0; i < SplashInfos.length; i++) {
            const SplashInfo = SplashInfos[i];
            SNewBattleData.instance.fightScene.tweenBlood(SplashInfo.Id, SplashInfo.HpLeft, SplashInfo.MpLeft, SplashInfo.AngerLeft);
        }
    }
    protected ShowVlueAndIcon(AttackInfo:any ,DeferInfos:any , ProtectorInfo:any)
    {
        super.ShowVlueAndIcon(AttackInfo , DeferInfos , ProtectorInfo);
        //免疫图标
        for (let i = 0; i < DeferInfos.length; i++) {
            const DeferInfo = DeferInfos[i];
            if(DeferInfo.DamToDefer == 0)
            {
                this.showSymbol(DeferInfo.Id ,SYMBOL_TYPE.LMMUNITY);
            }
            
        }

        //反震图标
        if(AttackInfo.RetDam > 0)
        {
            this.showSymbol(AttackInfo.Id, SYMBOL_TYPE.BACK_ANTI);
        }
        //分裂
        if(AttackInfo.AttSubType == 5)
        {
            this.showSymbol(AttackInfo.Id, SYMBOL_TYPE.SPLIT);
        }
            
    }

}