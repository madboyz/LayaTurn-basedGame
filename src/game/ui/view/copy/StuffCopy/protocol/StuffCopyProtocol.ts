import { BaseProtocol } from "../../../../../../net/protocol/BaseProtocol";
import { C57001, C57017, C57021, C57020, C57022 } from "../../../../../../net/pt/pt_57";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { MsgManager } from "../../../../manager/MsgManager";
import { C49001, C49002, C49003 } from "../../../../../../net/pt/pt_49";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { SChaosBattleData } from "../../../../../activity/data/SChaosBattleData";
import { SGameData } from "../../../../../../net/data/SGameData";
import { SNewBattleData } from "../../../../../../net/data/SNewBattleData";

export class StuffCopyProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    public send57020(no:number):void
    {
        if(SGameData.instance.PLAYFIGHTREPORT)
        {
            if(SNewBattleData.instance.CurrentBattleType == BattleMainType.PVP)
            {
                MsgManager.instance.showRollTipsMsg("PVP战斗中无法进行该操作");
                return;
            }
            else if(SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.OffLineArena)
            {
                MsgManager.instance.showRollTipsMsg("PVP战斗中无法进行该操作");
                return;
            }
        }
        if(SRoleData.instance.info.TeamId != 0)
        {
            MsgManager.instance.showRollTipsMsg("组队中无法进行该操作");
            return;
        }
        if(SChaosBattleData.instance.isChaoScene())
        {
            MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            return;
        }
        if(SCopyData.instance.isInCopy)
        {
            MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            return;
        }
        SCopyData.instance.copyType = 0;//重新打开面板扫荡清空
        var msg:C57020 = new C57020();
        msg.ChapterID = no;
        this.send(msg);
    }
    
    public send57021(no:number,star:number):void
    {
        var msg:C57021 = new C57021();
        msg.ChapterID = no;
        msg.Star = star;
        this.send(msg);
    }

    //通天塔相关协议=======================
    //通天塔基本信息请求
    public send49001():void{
        var msg:C49001 = new C49001();
        this.send(msg);
    }

    //通天塔进入战斗
    public send49002():void{
        if(SGameData.instance.PLAYFIGHTREPORT)
        {
            if(SNewBattleData.instance.CurrentBattleType == BattleMainType.PVP)
            {
                MsgManager.instance.showRollTipsMsg("PVP战斗中无法进行该操作");
                return;
            }
            else if(SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.OffLineArena)
            {
                MsgManager.instance.showRollTipsMsg("PVP战斗中无法进行该操作");
                return;
            }
        }
        if(SRoleData.instance.info.TeamId != 0)
        {
            MsgManager.instance.showRollTipsMsg("组队中无法进行该操作");
            return;
        }
        if(SChaosBattleData.instance.isChaoScene())
        {
            MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            return;
        }
        if(SCopyData.instance.isInCopy)
        {
            MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            return;
        }
        var msg:C49002 = new C49002();
        msg.cur_floor = SCopyData.instance.tttInfo.cur_floor + 1;
        this.send(msg);
    }

    //通天塔购买次数
    public send49003():void{
        var msg:C49003 = new C49003();
        this.send(msg);
    }

}