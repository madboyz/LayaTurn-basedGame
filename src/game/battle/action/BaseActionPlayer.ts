import { FightView } from "../../battle/role/fight/FightView";
import { SNewBattleData, BubbleType } from "../../../net/data/SNewBattleData";
import { FightInfo } from "../../battle/model/FightInfo";
import { Move } from "./Move";
import { SkillVo, CAST_TYPE } from "../../../db/sheet/vo/SkillVo";
import { EffectLayer } from "../../battle/scene/layer/EffectLayer";
import { Delay } from "../../../framework/utils/Delay";
import { BattleUtil } from "../BattleUtil";
import { Buff } from "../role/fight/Buff/FightBuff";
import { Debug } from "../../../debug/Debug";

export class BaseActionPlayer {
    /**
     * 播放action
     * @param action 
     * @param move 
     */
    public PlayAction(action:any , move: Move , CmdPara:number , CmdType:number , CurPickTarget:number)
    {
        if(!action)
        {
            return;
        }
    }

    public Dispose(): void {
        //外部控制数据本地只管播放
        //Laya.Pool.recover("BaseActionPlayer", this);
    }
    

    protected async AttackAction(move:Move , AttackInfo , DeferId:number , ProtectorId:number , AttackType , skillId , AttSubType )
    {
        var attackView: FightView = SNewBattleData.instance.allBattleBo.get(AttackInfo.Id);
        var attackInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(AttackInfo.Id);
        if(!attackView&&!attackInfo||(attackInfo&&attackInfo.dead != DEAD_TYPE.NODEAD))
        return;
        SNewBattleData.instance.ShowOneBubbleByType(AttackInfo.Id,BubbleType.ATTACK);
        await this.Move(move,AttackInfo.Id,DeferId , ProtectorId , AttackType , AttSubType , skillId);
        /*如果攻击者跟被攻击者都是友方那么需要调整方向*/
        
        if(SNewBattleData.instance.ForceStop)
        return;
        
        //攻击者播放动作
        SNewBattleData.instance.fightScene.setRoleToTop(attackView);

        //attackView.parent.setChildIndex(attackView , attackView.parent.in)
        //攻击者是否播放特效
        var skillVo: SkillVo = null;
        var effectLayer:EffectLayer = null;
        var isEffect = false;
        var effectUrl = "";
        if(skillId != 0)
        {
            //攻击者
            skillVo = SkillVo.get(skillId);
            if(skillVo&&skillVo.cast_eff.length > 0)
            {
                effectLayer = SNewBattleData.instance.fightScene.effectLayer;
                if(effectLayer)
                {
                    effectUrl = ResUtils.getSkillUrl(skillVo.cast_eff[0]);
                    if(skillVo.cast_eff.length > 1)
                    effectUrl = ResUtils.getSkillUrl(attackInfo.isMain ?  skillVo.cast_eff[0]: skillVo.cast_eff[1]);
                    effectLayer.addEffect(AttackInfo.Id ,attackView.x,attackView.y,effectUrl ,attackInfo.isMain);//播放施法动作
                    isEffect = true;
                }
            }
            //攻击者是否要显示技能名称
            if(AttSubType == ATTSUBTYPE.ATTACK) {
                var show_name = skillVo.hide_name == 0?false:true;
                var skillNameLayer = SNewBattleData.instance.fightScene.skillNameLayer;
                if(skillNameLayer&&show_name)
                {
                    skillNameLayer.showName(skillVo.name, attackView.x, attackView.y);
                }
            }
        }
        var symbolType = 0;
        switch(AttSubType)
        {
            case ATTSUBTYPE.BACK_ATTACK://反击
            {
                symbolType = SYMBOL_TYPE.BACK;
                break;
            }
            case ATTSUBTYPE.CONTINUE_ATTACK://连击
            {
                symbolType = SYMBOL_TYPE.ATTACK_CONTINUE;
                break;
            }
            case ATTSUBTYPE.PURSUE_ATTACK://追击
            {
                symbolType = SYMBOL_TYPE.PURSUE;
                break;
            }
            case 5://分裂图标
            {
                symbolType = SYMBOL_TYPE.SPLIT;
                break;
            }
        }
        if(symbolType > 0)
        this.showSymbol(AttackInfo.Id, symbolType);//攻击类型图标
        var attackAniType = AttackType == NEW_BATTLE_CMD_TYPE.SKILL?2:1
        if(skillVo)
        {
            if(skillVo.cast_act == 3)
            return;
            attackAniType = skillVo.cast_act;
            SNewBattleData.instance.ShowOneBubbleByType(AttackInfo.Id,BubbleType.USE_SKILL);
        }
        await attackView.attck(attackAniType);
        if(skillVo&&skillVo.scene_eff_loc != null&&skillVo.scene_eff != "")
        {
            var url = ResUtils.getSkillUrl(skillVo.scene_eff);
            var pos:Laya.Point = null;
            switch(skillVo.scene_eff_loc)
            {
                case SKILL_SCENE_EFFECT_TYPE.CENTER:
                {
                    pos = new Laya.Point(Laya.stage.width / 2 , Laya.stage.height / 2);
                    break;
                }
                case SKILL_SCENE_EFFECT_TYPE.ATTACK_CENTER:
                {
                    if(attackInfo.isMain)
                    pos = BattleUtil.SceneEffectPos().self;
                    else
                    pos = BattleUtil.SceneEffectPos().enemy;
                    break;
                }
                case SKILL_SCENE_EFFECT_TYPE.BE_ATTACK_CENTER:
                {
                    if(attackInfo.isMain)
                    pos = BattleUtil.SceneEffectPos().enemy;
                    else
                    pos = BattleUtil.SceneEffectPos().self;
                    break;
                }
            }
            var actionNum = 0;
            if(pos != null && effectLayer != null)
            {
                effectLayer.addEffect(attackInfo.boid ,pos.x,pos.y,url , false);
                actionNum = await BattleUtil.GetFrameCount(url) as number;
            }
            
            if(SNewBattleData.instance.ForceStop)
            return;
            var  time = GameConfig.GAME_BATTLE_ANIMATION_SPEED*(actionNum);
            await Delay.delay(time);
        }

        //var path: number = GMath.getPath(attackView.angle);
        //var action = attackAniType == 1 ? Action.attack01 : Action.attack02;
        //var url: string = ResUtils.getRoleUrl(attackView.resPath, action, path);
        //var actionNum = await BattleUtil.GetFrameCount(url) as number;
        ////处理攻击者施法动作延时
        ////这里固定写死一个帧数因为动画播放一般就要显示受击特效等处理
        //var time = 0;
        //var MaxNum = 0;
        //if(isEffect)
        //{
        //    var effectNum = await BattleUtil.GetFrameCount(effectUrl) as number;
        //    MaxNum = actionNum;
        //    if(actionNum < effectNum)
        //    {
        //        MaxNum = effectNum;
        //    }
        //    time = GameConfig.GAME_BATTLE_ANIMATION_SPEED*(MaxNum-1);
        //}
        //else
        //{
        //    time = GameConfig.GAME_BATTLE_ANIMATION_SPEED*(actionNum-1);
        //}
        //if(actionNum == 12)
        //{
        //    MaxNum = 8;
        //}
        //else
        //{
        //    MaxNum = actionNum -1;
        //}
        //time = GameConfig.GAME_BATTLE_ANIMATION_SPEED*(MaxNum);
        //await Delay.delay(time);

        this.UpdateBuff(AttackInfo.CutBuffs ,AttackInfo.Id , false);
        this.UpdateBuff(AttackInfo.AddBuffs ,AttackInfo.Id , true);
    }

    /**
     *  祖传buff更新：先删除在添加没有更新 如果有疑问请看手游祖传代码
     * 更新buff因为buff会在update中更新位置的
     */
    protected UpdateBuff(buffs: any, Id: number, isAdd: boolean = true)
    {
        var fighView: FightView =  SNewBattleData.instance.allBattleBo.get(Id);
        if(!fighView||!buffs)
        return;
        for (var i: number = 0; i < buffs.length; i++) {
            var item: any = buffs[i];
            if(isAdd)
            {
                if (item.BuffNo == 0) 
                continue;
                fighView.FightBuffs.AddBuff(item.BuffNo, item);
            }
            else
            {
                var buffid: number = (item.AtterBuffRemoved || item.DeferBuffRemoved || item.ProtectorBuffRemoved || item.BuffRemoved || item.BeSplashBo_BuffRemoved || item.BuffsRemoved);
                
                if(SNewBattleData.instance.fightScene)
                {
                    SNewBattleData.instance.fightScene.removeBuff(buffid , Id);
                    fighView.FightBuffs.RemoveBuff(buffid);
                }
                else
                {
                    Debug.serverLog("buffid=="+buffid+"hasNotRemove");
                }
                
            }
        }
    }

    //处理移动
    protected async Move(move:Move , attack_boid:number , def_boid:number , pro_boid:number ,AttackType:number ,AttSubType:number ,skillId:number)
    {
        var MoveType = CAST_TYPE.PLACE;
        if(SNewBattleData.instance.ForceStop)
        return;
        if(AttackType == NEW_BATTLE_CMD_TYPE.NORMAL_ATTACK)
        {
            if(AttSubType == ATTSUBTYPE.ATTACK)
            MoveType = CAST_TYPE.MOVE_TARGE;
        }
        else
        {
            if(skillId != 0)
            {
                var skillVo: SkillVo = SkillVo.get(skillId);
                MoveType = skillVo.cast_type;
            }
        }
        if(pro_boid != 0)
        {
            await move.moveToPrototed(pro_boid,def_boid);//保护者移动到防守者前面
            switch(MoveType)
            {
                case CAST_TYPE.MOVE_TARGE:
                {
                    await move.moveToTarget(attack_boid,def_boid);//攻击者移动到防御者面前
                    break;
                }

                case CAST_TYPE.POS_CENTER:
                {
                    await move.moveToCenter(attack_boid);//攻击者移动中心
                    break;
                }
            }
        }
        else
        {
            switch(MoveType)
            {
                case CAST_TYPE.MOVE_TARGE:
                {
                    await move.moveToTarget(attack_boid,def_boid);//攻击者移动到防御者面前
                    break;
                }

                case CAST_TYPE.POS_CENTER:
                {
                    await move.moveToCenter(attack_boid);//攻击者移动中心
                    break;
                }
            }
        }

        if(MoveType == CAST_TYPE.MOVE_TARGE)
        {
            var attackView: FightView = SNewBattleData.instance.allBattleBo.get(attack_boid);
            var attackInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(attack_boid);
            var deferInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(def_boid);
            if(deferInfo&&attackView&&attackInfo)
            {
                if(deferInfo.isMain == attackInfo.isMain)
                {
                    attackView.angle =  deferInfo.isMain== true?45:-180;
                }
            }
        }
    }

    /**
     * 子攻击类型图标
     * @param boId 
     * @param symbolType 
     */
    protected showSymbol(boId:number , symbolType)
    {
       SNewBattleData.instance.fightScene.showSymbol(boId ,symbolType);
    }

    //处理溅射
    protected SputteringDefence(delayTime:number ,SplashInfos:any , AttSubType:number , effectUrl = "")
    {
        var effectLayer = SNewBattleData.instance.fightScene.effectLayer;
        for (let i = 0; i < SplashInfos.length; i++) {
            const SplashInfo = SplashInfos[i];
            this.UpdateBuff(SplashInfo.CutBuffs ,SplashInfo.Id , false);
            var SplashView: FightView = SNewBattleData.instance.allBattleBo.get(SplashInfo.Id);
            var Info: FightInfo = SNewBattleData.instance.allFightInfos.get(SplashInfo.Id);
            if(!SplashView&&!Info)
            continue;
            if(effectLayer&&effectUrl != "")
            {
                effectLayer.addEffect(Info.boid ,SplashView.x,SplashView.y,effectUrl,Info.isMain);//s受击特效 
            }
            if(AttSubType == ATTSUBTYPE.BACK_ATTACK)
            {
                SplashView.defence(delayTime);
            }
            else
            {
                var dis = Info.isMain ? 30 : -30;
                SplashView.moveDefence(dis,delayTime);
            }
        }
    }
    /**
     * 伤害
     * @param AttackInfo 
     * @param DeferInfo 
     * @param ProtectorInfo 
     * @param AttResult 
     * @param SplashInfos 
     */
    protected ShowDamage(AttackInfo:any, DeferInfo:any , ProtectorInfo:any , AttResult:number ,SplashInfos:any)
    {

    }

    /**
     * 处理 反震 分裂等图标
     * @param AttackInfo 
     * @param DeferInfo 
     * @param ProtectorInfo 
     */
    protected ShowVlueAndIcon(AttackInfo ,DeferInfo ,ProtectorInfo)
    {

    }
    /**
     * 血量
     * @param AttackInfo 
     * @param DeferInfo 
     * @param ProtectorInfo 
     * @param SplashInfos 
     */
    protected BloodChange(AttackInfo:any , DeferInfo:any , ProtectorInfo:any ,SplashInfos:any)
    {

    }
    /**
     * 被攻击者行动
     * @param DeferInfo 
     * @param ProtectorInfo 
     * @param SplashInfos 
     * @param skillId 
     */
    protected async OtherAction(DeferInfo:any , ProtectorInfo:any  ,SplashInfos:any, skillId:number , AttSubType:number = 0)
    {

    }
    

    protected async Relive(Id:any , move: Move)
    {
        
        if(SNewBattleData.instance.ForceStop)
        return;
        var fighView: FightView = SNewBattleData.instance.allBattleBo.get(Id);
        var fightInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(Id);
        if(!fighView&&!fightInfo)
        return;
        await move.backToPlace(Id);
        if(SNewBattleData.instance.ForceStop)
        return;
        fightInfo.dead = DEAD_TYPE.NODEAD;
        fighView.action = Action.stand;
        var effectLayer = SNewBattleData.instance.fightScene.effectLayer;
        if(effectLayer)
        {
            var url = ResUtils.getSkillUrl("petskill_38");
            effectLayer.addEffect(fightInfo.boid ,fighView.x,fighView.y,url , fightInfo.isMain);//播放重生特效
        }
    }

    

    //死亡处理
    protected async Dead(DieStatus:number , Id:any , IsApplyReborn:number ,move: Move)
    {
        var fighView: FightView = SNewBattleData.instance.allBattleBo.get(Id);
        var fightInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(Id);
        if(!fighView&&!fightInfo)
        return;
        if(SNewBattleData.instance.ForceStop)
        return;
        if(IsApplyReborn != 0)
        {
            await this.Relive(Id , move);
        }
        else if(DieStatus != 0)
        {
            var buffs = fighView.FightBuffs.AllBuff.values;
            for (let i = 0; i < buffs.length; i++) {
                const buff: Buff = buffs[i];
                if(SNewBattleData.instance.fightScene)
                {
                    SNewBattleData.instance.fightScene.removeBuff(buff.Id , Id);
                }
                else
                {
                    Debug.serverLog("buffid=="+buff.Id+"hasNotRemove");
                }
                
            }
            fighView.FightBuffs.Clear();
            if (DieStatus == DEAD_TYPE.INVERTED) {
                fightInfo.dead = DEAD_TYPE.INVERTED;
                var time = GameConfig.GAME_BATTLE_ANIMATION_SPEED*8;
                await move.backToPlace(Id);
                if(SNewBattleData.instance.ForceStop)
                return;
                var effectLayer = SNewBattleData.instance.fightScene.effectLayer;
                if(effectLayer)
                {
                    var url = ResUtils.getSkillUrl("dead");
                    effectLayer.addEffect(fightInfo.boid ,fighView.x,fighView.y,url , fightInfo.isMain);//死亡特效
                }
                await fighView.dead(time);
                if(SNewBattleData.instance.ForceStop)
                return;
                SNewBattleData.instance.fightScene.removeBlood(Id);
            } else if (DieStatus == DEAD_TYPE.GHOST) {
                fightInfo.dead = DEAD_TYPE.GHOST;
                fighView.alpha = 0.5;//暂时这样处理
                await move.backToPlace(Id);
            } else {
                fightInfo.dead = DEAD_TYPE.DISAPPEAR;
                SNewBattleData.instance.fightScene.removeBlood(Id);
                await move.backToPlace(Id);
                if(SNewBattleData.instance.ForceStop)
                return;
                await this.disappear(fighView);
                if(SNewBattleData.instance.ForceStop)
                return;
                if(fightInfo.dead == DEAD_TYPE.DISAPPEAR)
                SNewBattleData.instance.removeDisappearBo(Id);
            }
        }
    }
    /**
     * 保护者做动作
     * @param delayTime 
     * @param protectorInfo 
     */

    protected ProtectorDefenceAction(delayTime:number , protectorInfo:any)
    {
        if(protectorInfo.Id > 0)
        {
            var proView: FightView = SNewBattleData.instance.allBattleBo.get(protectorInfo.Id);
            if(!proView)
            return;
            proView.defence(delayTime);
        }
    }

    //消失
    protected disappear(role: FightView){
        return new Promise((resolve) => {
            if(!role)
            {
                resolve(true);
                return;
            }
            var pos = {};
            if (role.x != role.OriginalX) {
                pos = {x:-role.OriginalX-200 , y:role.OriginalY};
            }
            else
            {
                pos = {x:-200};
            }
            Laya.Tween.to(role,pos, 300, null,Laya.Handler.create(this, () => {
                role.action = Action.stand; 
                resolve(true);
            }));
            
        });
        
    }
}