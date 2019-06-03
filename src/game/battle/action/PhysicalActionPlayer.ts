import { BaseActionPlayer } from "./BaseActionPlayer";
import { Move } from "./Move";
import { Delay } from "../../../framework/utils/Delay";
import { SkillVo } from "../../../db/sheet/vo/SkillVo";
import { EffectLayer } from "../../battle/scene/layer/EffectLayer";
import { FightView } from "../../battle/role/fight/FightView";
import { FightInfo } from "../../battle/model/FightInfo";
import { SNewBattleData, BubbleType } from "../../../net/data/SNewBattleData";
/**
 * 物理攻击播放器
 */
export class PhysicalActionPlayer extends BaseActionPlayer
{
    public Dispose(): void {
        super.Dispose();
        Laya.Pool.recover("PhysicalActionPlayer", this);
    }

    public async PlayAction(action:any , move: Move , CmdPara:number , CmdType:number , CurPickTarget:number)
    {
        super.PlayAction(action, move , CmdPara , CmdType , CurPickTarget);

        //攻击者
        var AttackInfo = action.AttackInfo;
        var DeferInfo = action.DeferInfo;
        var ProtectorInfo = action.ProtectorInfo;
        var SplashInfos = action.SplashInfos;
        var skillId = CmdPara;
        var AttackType = CmdType;
        var AttSubType = AttackInfo.AttSubType;

        if(SNewBattleData.instance.ForceStop)
        return;
        await this.AttackAction(move,AttackInfo,DeferInfo.Id,ProtectorInfo.Id,AttackType,skillId , AttSubType);
        //处理飘血等
        if(SNewBattleData.instance.ForceStop)
        return;
        this.ShowDamage(AttackInfo ,DeferInfo ,ProtectorInfo , action.AttResult , SplashInfos);
        //处理 反震 分裂等图标
        this.ShowVlueAndIcon(AttackInfo ,DeferInfo ,ProtectorInfo);
        //血条
        this.BloodChange(AttackInfo,DeferInfo,ProtectorInfo,SplashInfos);
        await this.OtherAction(DeferInfo,ProtectorInfo,SplashInfos,skillId , AttSubType);

        if(SNewBattleData.instance.ForceStop)
        return;
        //处理死亡
        this.Dead(ProtectorInfo.DieStatus ,ProtectorInfo.Id , ProtectorInfo.IsApplyReborn , move);
        this.Dead(AttackInfo.DieStatus ,AttackInfo.Id , AttackInfo.IsApplyReborn , move);
        for (let i = 0; i < SplashInfos.length; i++) {
            const SplashInfo = SplashInfos[i];
            this.Dead(SplashInfo.DieStatus ,SplashInfo.Id , SplashInfo.IsApplyReborn , move);
        }
        await this.Dead(DeferInfo.DieStatus ,DeferInfo.Id , DeferInfo.IsApplyReborn , move);
        
    }
    protected ShowDamage(AttackInfo:any, DeferInfo:any , ProtectorInfo:any , AttResult:number ,SplashInfos:any)
    {
        super.ShowDamage(AttackInfo , DeferInfo , ProtectorInfo , AttResult ,SplashInfos);
        //反弹伤害
        SNewBattleData.instance.fightScene.showDamTxt(AttackInfo.Id ,AttackInfo.RetDam , 0 ,AttackInfo.RetDam_Anger);
        //吸血
        SNewBattleData.instance.fightScene.showDamTxt(AttackInfo.Id, -AttackInfo.AbsorbedHp, 0, 0);

        SNewBattleData.instance.fightScene.showDamTxt(DeferInfo.Id, DeferInfo.DamToDefer, 
            DeferInfo.DamToDefer_Mp, DeferInfo.DamToDefer_Anger,AttResult == ATTACK_RESULT.CRIT);
        if(ProtectorInfo.Id > 0)
        {
            SNewBattleData.instance.fightScene.showDamTxt(ProtectorInfo.Id, ProtectorInfo.DamToProtector, 
                0, AttackInfo.DamToProtector_Anger);
        }
        if(DeferInfo.DamToDefer_Anger,AttResult == ATTACK_RESULT.CRIT)
        SNewBattleData.instance.fightScene.Shake();
        for (let i = 0; i < SplashInfos.length; i++) {
            const SplashInfo = SplashInfos[i];
            SNewBattleData.instance.fightScene.showDamTxt(SplashInfo.Id, SplashInfo.SplashDam_Hp, 
                SplashInfo.SplashDam_Mp, SplashInfo.SplashDam_Anger);
        }
    }

    protected BloodChange(AttackInfo:any , DeferInfo:any , ProtectorInfo:any ,SplashInfos:any)
    {
        super.BloodChange(AttackInfo , DeferInfo, ProtectorInfo , SplashInfos);
        SNewBattleData.instance.fightScene.tweenBlood(AttackInfo.Id ,
            AttackInfo.HpLeft , AttackInfo.MpLeft ,AttackInfo.AngerLeft);
        SNewBattleData.instance.fightScene.tweenBlood(DeferInfo.Id ,
            DeferInfo.HpLeft , DeferInfo.MpLeft ,DeferInfo.AngerLeft);
        SNewBattleData.instance.fightScene.tweenBlood(ProtectorInfo.Id, ProtectorInfo.HpLeft, -1, ProtectorInfo.AngerLeft);
        for (let i = 0; i < SplashInfos.length; i++) {
            const SplashInfo = SplashInfos[i];
            SNewBattleData.instance.fightScene.tweenBlood(SplashInfo.Id, SplashInfo.HpLeft, SplashInfo.MpLeft, SplashInfo.AngerLeft);
        }
    }

    

    /**
     * 防御者 保护者 溅射
     * @param DeferInfo 
     * @param ProtectorInfo 
     * @param SplashInfos 
     * @param skillId 
     */
    protected async OtherAction(DeferInfo:any , ProtectorInfo:any  ,SplashInfos:any, skillId:number , AttSubType)
    {
        super.OtherAction(DeferInfo , ProtectorInfo ,SplashInfos, skillId , AttSubType);
        this.UpdateBuff(DeferInfo.CutBuffs ,DeferInfo.Id , false);
        this.UpdateBuff(DeferInfo.AddBuffs ,DeferInfo.Id , true);
        this.UpdateBuff(DeferInfo.UpdateBuffs ,DeferInfo.Id , true);
        if(ProtectorInfo)
        {
            this.UpdateBuff(ProtectorInfo.CutBuffs ,ProtectorInfo.Id , false);
            this.UpdateBuff(ProtectorInfo.AddBuffs ,ProtectorInfo.Id , true);
        }
        var isNeedDely = false;
        //防御者 保护者 溅射一起处理
        var defView: FightView = SNewBattleData.instance.allBattleBo.get(DeferInfo.Id);
        var defInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(DeferInfo.Id);
        if(!defView&&!defInfo)
        return;
        
        SNewBattleData.instance.ShowOneBubbleByType(DeferInfo.Id,BubbleType.BE_ATTACT);
        var skillVo: SkillVo = null;
        var url = "";
        if(skillId != 0)
        {
            skillVo = SkillVo.get(skillId);
            if(skillVo)
            {
                var effect_nameList = skillVo.target_eff;
                if(effect_nameList != null&&effect_nameList.length> 0)
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
        return;
        var defTime = GameConfig.GAME_BATTLE_BE_HIT_EFFECT_DELY;
        
        if(skillVo&&skillVo.target_act == HIT_ACTION.NONE)
        {
            if(isNeedDely)
            {
                await Delay.delay(defTime);
            }
            return;
        }
        if(SNewBattleData.instance.ForceStop)
        return;
        var dis = defInfo.isMain ? 30 : -30;
        
        //if(isNeedDely)
        //{
        //    if(skillVo&&skillVo.target_act_time_list > 0)
        //    {
        //        defTime = skillVo.target_act_time_list;
        //    }
        //    await Delay.delay(defTime);
        //    this.ProtectorDefenceAction(defTime , ProtectorInfo);
        //    this.SputteringDefence(defTime ,SplashInfos);
        //    await defView.moveDefence(dis ,defTime);
        //}
        //else
        //{
            this.ProtectorDefenceAction(defTime , ProtectorInfo);
            this.SputteringDefence(defTime ,SplashInfos , AttSubType , url);
            if(AttSubType == ATTSUBTYPE.BACK_ATTACK)
            await defView.defence(defTime);
            else
            await defView.moveDefence(dis ,defTime);
            
        //}
    }

    

    /**
     * 处理 反震 分裂等图标
     */
    protected ShowVlueAndIcon(AttackInfo:any , DeferInfo:any , ProtectorInfo:any)
    {
        super.ShowVlueAndIcon(AttackInfo , DeferInfo , ProtectorInfo);
        //免疫图标
        if(DeferInfo.DamToDefer == 0)
        {
            this.showSymbol(DeferInfo.Id ,SYMBOL_TYPE.LMMUNITY);
        }

        if(ProtectorInfo.DamToProtector == 0)
        {
            this.showSymbol(ProtectorInfo.Id ,SYMBOL_TYPE.LMMUNITY);
        }

        //反震图标
        if(AttackInfo.RetDam > 0)
        {
            this.showSymbol(AttackInfo.Id, SYMBOL_TYPE.BACK_ANTI);
        }
        //分裂
        if(AttackInfo.AttSubType == ATTSUBTYPE.SPUTTER_ATTACK)
        {
            this.showSymbol(AttackInfo.Id, SYMBOL_TYPE.SPLIT);
        }
            
    }
}