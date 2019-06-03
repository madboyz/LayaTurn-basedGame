import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C24005, C24004, C24053, C24052, C24054, C24055, C24000, C24006, C24050, C24051, C24010, C24009, C24021, C24060 } from "../../../net/pt/pt_24";
import { SRoleData } from "../../../net/data/SRoleData";
import { MsgManager } from "../../ui/manager/MsgManager";
import { SGameData } from "../../../net/data/SGameData";
import { SChaosBattleData } from "../../activity/data/SChaosBattleData";
import { SCopyData } from "../../../net/data/SCopyData";
import { SNewBattleData } from "../../../net/data/SNewBattleData";

export class TeamProtocol extends BaseProtocol {
    /**
     * 查询队长位置
     */
    public RequestLeaderPos()
    {
        var msg:C24060 = new C24060();
        this.send(msg);
    }

    /**
     * 创建队伍 目前类型方面写死
     * @param sceneNo 
     * @param teamName 
     */
    public CreateTeam(sceneNo:number , teamName:string)
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
        if(SCopyData.instance.isInCopy)
        {
            MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            return;
        }
        if(SChaosBattleData.instance.isChaoScene())
        {
            MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            return;
        }
        var msg:C24000 = new C24000();
        msg.TeamId = 0;
        msg.SceneNo = sceneNo;
        msg.TeamActivityType = 1;//pt_24目前写死任务
        msg.Condition1 = 2//类型挂机
        msg.Condition1 = 0;
        msg.TeamMinLv = 0;
        msg.TeamMaxLv = 0;
        msg.TeamName = teamName;
        this.send(msg);
    }

    //退出队伍
    public QuitTeam()
    {
        var msg:C24005 = new C24005();
        this.send(msg);
    }
    /**
     * 队长踢队员
     * @param playerId 
     */
    public LeaderKickPlayer(playerId:number)
    {
        var msg:C24009 = new C24009();
        msg.ObjPlayerId = playerId;
        this.send(msg);
    }

    //暂离队伍
    public TmpLeaveTeam()
    {
        var msg:C24004 = new C24004();
        this.send(msg);
    }

    //玩家归队
    public CallBackTeam(teamId:number)
    {
        var msg:C24053 = new C24053();
        msg.TeamId = teamId;
        this.send(msg);
    }

    /**
     * 队长同意入队
     * @param teamId 
     * @param playerId 
     */
    public AllowJoinTeam(teamId:number , playerId:number)
    {
        var msg:C24052 = new C24052();
        msg.TeamId = teamId;
        msg.PlayerId = playerId;
        this.send(msg);
    }

    
    /**
     * 拒绝玩家入队
     * @param playerId 
     */
    public CancelJoinTeam(playerId:number)
    {
        var msg:C24055 = new C24055();
        msg.ObjPlayerId = playerId;
        this.send(msg);
    }

    /**
     * 队长邀请归队
     * @param playerId 
     */
    public RequsetCallBackTeam(playerId:number)
    {
        var msg:C24054 = new C24054();
        msg.PlayerId = playerId;
        this.send(msg);
    }

    /**
     * 被邀请入队反馈
     * @param action 
     * @param leaderId 
     */
    public BeRequestAllow(action:number , leaderId:number)
    {
        var msg:C24021 = new C24021();
        msg.Action = action;
        msg.LeaderId = leaderId;
        this.send(msg); 
    }


    /**
     * 队长邀请玩家入队
     * @param playerId 
     */
    public RequsetJoinTeam(playerId:number)
    {
        var msg:C24006 = new C24006();
        msg.ObjPlayerId = playerId;
        this.send(msg);
    }

    /**
     * 查询指定场景中的队伍列表
     * @param sceneNo 
     * @param pageSize 
     * @param pageIndex 
     */
    public FindSceneTeam(sceneNo:number , pageSize:number , pageIndex:number)
    {
        var msg:C24050 = new C24050();
        msg.SceneNo = sceneNo;
        msg.PageIndex = pageIndex;
        msg.PageSize = pageSize;
        msg.TeamActivityType = 1;//pt_24目前写死任务
        msg.Condition1 = 2//类型挂机
        msg.Condition1 = 0;
        this.send(msg);
    }
    /**
     * 申请加入队伍
     * @param leaderId 
     */
    public JoinTeam(leaderId:number)
    {
        if(SCopyData.instance.isInCopy)
        {
            MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            return;
        }
        if(SChaosBattleData.instance.isChaoScene())
        {
            MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            return;
        }
        if(SRoleData.instance.info.TeamId != 0)
        {
            MsgManager.instance.showRollTipsMsg("已有队伍！");
            return;
        }
        if(SGameData.instance.PLAYFIGHTREPORT == true)
        {
            MsgManager.instance.showRollTipsMsg("战斗中，不能加入队伍！");
            return;
        }
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_TEAM)) {
            MsgManager.instance.showRollTipsMsg("组队功能未开启！");
            return ;
        }

        var msg:C24051 = new C24051();
        msg.LeaderId = leaderId;
        this.send(msg);
    }
    /**
     * 请求队伍队员详情
     */
    public RequsetTeamInfo()
    {
        var msg:C24010 = new C24010()
        this.send(msg);
    }
}