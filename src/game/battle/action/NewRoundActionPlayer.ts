import { BaseActionPlayer } from "./BaseActionPlayer";
import { Move } from "./Move";
import { SNewBattleData } from "../../../net/data/SNewBattleData";
import { ReportType } from "../report/NewBaseReport";
import { S20041, S20042, S20043, S20044, S20062, S20063, S20063_1 } from "../../../net/pt/pt_20";
import { MessageUtils } from "../../../message/messageBase/MessageUtils";
import { Delay } from "../../../framework/utils/Delay";
import { CallBoActionPlayer } from "./CallBoActionPlayer";
import { FightView } from "../../battle/role/fight/FightView";
import { FightInfo } from "../../battle/model/FightInfo";
/**
 * 接到20089播放器 处理41~44 62等
 */
export class NewRoundActionPlayer extends BaseActionPlayer
{
    public Dispose(): void {
        super.Dispose();
        Laya.Pool.recover("NewRoundActionPlayer", this);
    }

    public async PlayAction(reports:any , move: Move , CmdPara:number , CmdType:number , CurPickTarget:number)
    {
        super.PlayAction(reports, move , CmdPara , CmdType , CurPickTarget);

        for (let i = 0; i < reports.length; i++) {
            const report = reports[i];
            var needWait = false;
            if(SNewBattleData.instance.ForceStop)
            break;
            if(i == report.length -1)
            {
                needWait = true;
            }
            switch(report.ReportType)
            {
                case ReportType.BUFF_UPDATE:
                {
                    this.Player20041(report.Data);
                    break;
                }
                case ReportType.ATTR_UPDATE:
                {
                    if(needWait)
                    {
                        await this.Player20042(report.Data , move ,needWait);
                    }
                    else
                    {
                        this.Player20042(report.Data , move ,needWait);
                    }
                    
                    break;
                }
                case ReportType.BO_DIE_UPDATE:
                {
                    await this.Player20043(report.Data , move );
                    break;
                }
                case ReportType.BO_REVIVE_UPDATE:
                {
                    if(needWait)
                    {
                        await this.Player20044(report.Data , move ,needWait);
                    }
                    else
                    {
                        this.Player20044(report.Data , move ,needWait);
                    }
                    break;
                }
                case ReportType.NEW_BOS_ADD:
                {
                    await this.Player20063(report.Data);
                    break;
                }

                case ReportType.BO_NEW_ADD:
                {
                    //播放62的播放器就好
                    await this.Player20062(report.Data);
                    break;
                }
            }
        }
    }

    private Player20041(data:S20041)
    {
        var buffs = [{BuffNo:data.BuffNo, 
            ExpireRound:data.ExpireRound,
            ProtectionRound:data.ProtectionRound,
            OverlapCount:data.OverlapCount,
            Para1_Type:data.Para1_Type,
            Para1_Value:data.Para1_Value,
            Para2_Type:data.Para2_Type,
            Para2_Value:data.Para2_Value
        }];
        var isAdd = data.Type == 2?false:true;
        this.UpdateBuff(buffs ,data.BoId , isAdd);
    }

    private async Player20042(data:S20042 , move:Move , needWait:boolean)
    {
        var HpLeft = 0;
        var MpLeft = 0;
        var AngerLeft = 0;

        var SplashDam_Hp = 0;
        var SplashDam_Mp = 0;
        var SplashDam_Anger = 0;
        var isChange = false;
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            switch(element.AttrCode)
            {
                case 1://当前hp
                {
                    isChange = true;
                    HpLeft = element.NewValue;
                    SplashDam_Hp = MessageUtils.signedValue(element.ChangeValue);
                    break;
                }

                case 2://当前mp
                {
                    isChange = true;
                    MpLeft = element.NewValue;
                    SplashDam_Mp = MessageUtils.signedValue(element.ChangeValue);
                    break;
                }

                case 3://当前anger
                {
                    isChange = true;
                    AngerLeft = element.NewValue;
                    SplashDam_Anger = MessageUtils.signedValue(element.ChangeValue);
                    break;
                }
            }
            
        }
        if(isChange)
        {
            //因为伤害飘字值小于0是绿色大于0是红色所以要反过来
            SNewBattleData.instance.fightScene.tweenBlood(data.BoId, HpLeft, MpLeft, AngerLeft);
            SNewBattleData.instance.fightScene.showDamTxt(data.BoId, -SplashDam_Hp,-SplashDam_Mp, -SplashDam_Anger);
        }
        
        if(needWait)
        await this.Dead(data.DieStatus ,data.BoId , 0 , move);
        else
        this.Dead(data.DieStatus ,data.BoId , 0 , move);
    }

    private async Player20043(data:S20043 , move:Move)
    {
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            if(SNewBattleData.instance.ForceStop)
            break;
            if(i == data.item_1.length -1)
            {
                await this.Dead(item.DieStatus ,item.BoId , 0 , move);
            }
            else
            {
                this.Dead(item.DieStatus ,item.BoId , 0 , move);
            }
        }
    }

    private async Player20044(data:S20044 , move:Move , needWait:boolean)
    {
        if(needWait)
        await this.Relive(data.BoId,move); 
        else
        this.Relive(data.BoId,move);
    }

    private async Player20063(data:S20063)
    {
        for (let i = 0; i < data.item_1.length; i++) {
            const element:S20063_1 = data.item_1[i];
            /**
             * 因为20063子节点没有Side手动加
             */
            element["Side"] = data.ForSide;
        }
        var CallPlayer: CallBoActionPlayer = Laya.Pool.getItemByClass("CallBoActionPlayer", CallBoActionPlayer);
        CallPlayer.CreateBo(data.item_1);
        await Delay.delay(7*GameConfig.GAME_BATTLE_ANIMATION_SPEED);//写死7帧
        CallPlayer.Dispose();
    }

    private async Player20062(data:S20062)
    {
        var CallPlayer: CallBoActionPlayer = Laya.Pool.getItemByClass("CallBoActionPlayer", CallBoActionPlayer);
        CallPlayer.CreateBo(data);
        await Delay.delay(7*GameConfig.GAME_BATTLE_ANIMATION_SPEED);//写死7帧
        CallPlayer.Dispose();
    }
}