import { BaseActionPlayer } from "./BaseActionPlayer";
import { Move } from "./Move";
import { Delay } from "../../../framework/utils/Delay";
import { SNewBattleData } from "../../../net/data/SNewBattleData";
import { FightInfo } from "../../battle/model/FightInfo";
import { BattleUtil } from "../BattleUtil";
import { SRoleData } from "../../../net/data/SRoleData";
/**
 * 召唤或者新战斗单位
 */
export class CallBoActionPlayer extends BaseActionPlayer
{
    public Dispose(): void {
        super.Dispose();
        Laya.Pool.recover("CallBoActionPlayer", this);
    }
    public async PlayAction(actions:any , move: Move , CmdPara:number , CmdType:number , CurPickTarget:number)
    {
        super.PlayAction(actions, move , CmdPara , CmdType , CurPickTarget);

        for (let i = 0; i < actions.length; i++) {
            const boInfos = actions[i];
            if(SNewBattleData.instance.ForceStop)
            break;
            if(i == actions.length-1)
            {
                this.CreateBo(boInfos);
                await Delay.delay(7*GameConfig.GAME_BATTLE_ANIMATION_SPEED);//写死7帧
            }
            else
            {
                this.CreateBo(boInfos);
            }
        }
    }

    public CreateBo(boInfos:any)
    {
        for (let i = 0; i < boInfos.length; i++) {
            const boInfo = boInfos[i];
            //吐槽下服务端客主队没有做处理 side 跟20007两个数组是一样的意思 ，客主队是相对不是绝对，其实只要服务端对应不同的战斗推送做筛选过滤就好了
            var infoData = BattleUtil.getFightViewInfo(boInfo.ParentObjId , boInfo.Sex , boInfo.Faction ,
                boInfo.Weapon,boInfo.LookIdx ,boInfo.ParentPartnerNo,boInfo.Name,boInfo.Clothes);
            var fightInfo = new FightInfo();
            fightInfo.objInfo = boInfo;
            if(SNewBattleData.instance.localFightInfo.Side == boInfo.Side)
            {
                fightInfo.isMain = true;
            }
            else
            {
                fightInfo.isMain = false;
            }
            
            var fightView = BattleUtil.createBattleRole(boInfo,fightInfo.isMain);
            fightView.info = infoData;
            fightView.angle =  fightInfo.isMain == true?-180:45;
            //fightView.defaultSkin();
            SNewBattleData.instance.allBattleBo.set(boInfo.BoId , fightView);
            SNewBattleData.instance.allFightInfos.set(boInfo.BoId,fightInfo);
            if(boInfo.ParentObjId == SRoleData.instance.roleId)
            {
                SNewBattleData.instance.localFightInfo = fightInfo;
            }
            else if(SNewBattleData.instance.getCanCtrl(fightInfo))//如果这个归属是玩家自己就要送查询技能
            {
                SNewBattleData.instance.RequsetBoskillInfo(boInfo.BoId);
            }
            SNewBattleData.instance.fightScene.addOneRole(fightView ,boInfo.BoId , infoData.Name , fightInfo);
            var effectLayer = SNewBattleData.instance.fightScene.effectLayer;
            if(effectLayer)
            {
                var url = ResUtils.getSkillUrl("petskill_38");
                effectLayer.addEffect(fightInfo.boid ,fightView.x,fightView.y,url ,fightInfo.isMain);//播放召唤特效
            }
            
        }
    }
}