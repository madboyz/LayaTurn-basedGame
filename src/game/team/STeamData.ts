import { TeamInfo, RoleTeamState } from "./TeamInfo";
import { S24000, S24010, S24023, S24054, S24057, S24053, S24026, S24027, S24024, S24011, S24003, S24022, S24055, S24050, S24056, S24007, S24014, S24006, S24060 } from "../../net/pt/pt_24";
import { DataManager } from "../../message/manager/DataManager";
import { SRoleData } from "../../net/data/SRoleData";
import { TeamUtil } from "./TeamUtil";
import { Alert } from "../ui/compent/Alert";
import { MsgManager } from "../ui/manager/MsgManager";
import { TeamProtocol } from "./protocol/TeamProtocol";
import { SGameData } from "../../net/data/SGameData";
import { GameUtils } from "../utils/GameUtils";
import { SAoiData, SAoiEvent } from "../aoi/SAoiData";

export class STeamData extends Laya.EventDispatcher {
    public CurrentTeamInfo:TeamInfo = new TeamInfo();
    public protocol:TeamProtocol = new TeamProtocol();
    private static _instance: STeamData;
    public RequsetTeamInfos:Laya.Dictionary = new Laya.Dictionary();//被邀请通知
    public LeaderRequsetTime:Laya.Dictionary = new Laya.Dictionary();//队长邀请玩家的时间

    public static get instance(): STeamData {
        return STeamData._instance || (STeamData._instance = new STeamData());
    }

    constructor() {
        super();
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E24000, this, this.onS24000);//创建队伍
        DataManager.cancel(PROTOCOL.E24010, this, this.onS24010);//查询自己所在队伍的信息//登录如果13001中teamid不为0的话就是主动请求一次
        DataManager.cancel(PROTOCOL.E24023, this, this.onS24023);//目前是有人新加入队伍后，服务端会主动通知队伍信息给队伍的所有人（包括新加入的人）
        DataManager.cancel(PROTOCOL.E24054, this, this.onS24054);//队长邀请玩家归队
        DataManager.cancel(PROTOCOL.E24057, this, this.onS24057);//玩家接到队长归队邀请
        DataManager.cancel(PROTOCOL.E24053, this, this.onS24053);//玩家归队
        DataManager.cancel(PROTOCOL.E24026, this, this.onS24026);//通知队伍成员：有人归队了（服务端主动通知）
        DataManager.cancel(PROTOCOL.E24027, this, this.onS24027);//通知队伍成员：有人离线了（服务端主动通知）
        DataManager.cancel(PROTOCOL.E24024, this, this.onS24024);//通知队伍成员：有人被请离队了（服务端主动通知）
        DataManager.cancel(PROTOCOL.E24011, this, this.onS24011);//玩家主动离队，通知队伍中的成员：有人离队了（服务端主动通知）
        DataManager.cancel(PROTOCOL.E24003, this, this.onS24003);//服务器主动通知所有队员某个队员暂离队伍
        DataManager.cancel(PROTOCOL.E24022, this, this.onS24022);//服务器通知队长邀请玩家入队结果
        DataManager.cancel(PROTOCOL.E24055, this, this.onS24055);//队长拒绝玩家加入队伍
        DataManager.cancel(PROTOCOL.E24050, this, this.onS24050);//查询场景中的队伍列表
        DataManager.cancel(PROTOCOL.E24056, this, this.onS24056);//申请列表服务端主动推的
        DataManager.cancel(PROTOCOL.E24007, this, this.onS24007);//被邀请入队通知
        DataManager.cancel(PROTOCOL.E24014, this, this.onS24014);//队长变更
        DataManager.cancel(PROTOCOL.E24006, this, this.onS24006);//邀请入队反馈
        this.CurrentTeamInfo.clear();
        this.RequsetTeamInfos.clear();
        this.LeaderRequsetTime.clear();
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E24000, this, this.onS24000);//创建队伍
        DataManager.listen(PROTOCOL.E24010, this, this.onS24010);//查询自己所在队伍的信息//登录如果13001中teamid不为0的话就是主动请求一次
        DataManager.listen(PROTOCOL.E24023, this, this.onS24023);//目前是有人新加入队伍后，服务端会主动通知队伍信息给队伍的所有人（包括新加入的人）
        
        //归队
        DataManager.listen(PROTOCOL.E24054, this, this.onS24054);//队长邀请玩家归队
        DataManager.listen(PROTOCOL.E24057, this, this.onS24057);//玩家接到队长归队邀请
        DataManager.listen(PROTOCOL.E24053, this, this.onS24053);//玩家归队
        DataManager.listen(PROTOCOL.E24026, this, this.onS24026);//通知队伍成员：有人归队了（服务端主动通知）

        //离线
        DataManager.listen(PROTOCOL.E24027, this, this.onS24027);//通知队伍成员：有人离线了（服务端主动通知）
        
        //退队
        DataManager.listen(PROTOCOL.E24024, this, this.onS24024);//通知队伍成员：有人被请离队了（服务端主动通知）
        DataManager.listen(PROTOCOL.E24011, this, this.onS24011);//玩家主动离队，通知队伍中的成员：有人离队了（服务端主动通知）

        //暂时离开
        DataManager.listen(PROTOCOL.E24003, this, this.onS24003);//服务器主动通知所有队员某个队员暂离队伍

        DataManager.listen(PROTOCOL.E24022, this, this.onS24022);//服务器通知队长邀请玩家入队结果
        DataManager.listen(PROTOCOL.E24055, this, this.onS24055);//队长拒绝玩家加入队伍
        DataManager.listen(PROTOCOL.E24050, this, this.onS24050);//查询场景中的队伍列表
        DataManager.listen(PROTOCOL.E24056, this, this.onS24056);//申请列表服务端主动推的

        DataManager.listen(PROTOCOL.E24007, this, this.onS24007);//被邀请入队通知

        //服务器通知队长变更
        DataManager.listen(PROTOCOL.E24014, this, this.onS24014);//队长变更

        DataManager.listen(PROTOCOL.E24006, this, this.onS24006);//邀请入队反馈

        
        DataManager.listen(PROTOCOL.E24060, this, this.onS24060);//队长位置
    }

    private onS24006(data:S24006)
    {
        if(data.RetCode != 0)
        {
            MsgManager.instance.showRollTipsMsg("邀请失败！玩家下线或不存在！");
        }
    }

    private onS24014(data:S24014)
    {
        for (let i = 0; i < this.CurrentTeamInfo.TeamRoleInfoDis.values.length; i++) {
            var roleInfo = this.CurrentTeamInfo.TeamRoleInfoDis.values[i];
            roleInfo.leader = false;
        }
        this.CurrentTeamInfo.LeaderId = data.NewLeaderId;
        if(data.NewLeaderId == SRoleData.instance.roleId)
        {
            SRoleData.instance.info.IsLeader = 1;
        }
        else
        {
            SRoleData.instance.info.IsLeader = 0;
        }
        var roleInfo = this.CurrentTeamInfo.TeamRoleInfoDis.get(data.NewLeaderId);
        if(!roleInfo)
        return;
        roleInfo.leader = true;
        this.event(STeamEvent.TEAM_ROLE_UPDATE);
    }

    private onS24007(data:S24007)
    {
        if(this.RequsetTeamInfos.keys.length == 30)
        {
            this.RequsetTeamInfos.remove(this.RequsetTeamInfos.keys[0]);
        }
        var table = this.RequsetTeamInfos.get(data.FromPlayerId);
        if(table)
        {
            this.RequsetTeamInfos.remove(data.FromPlayerId);
        }
        
        this.RequsetTeamInfos.set(data.FromPlayerId ,{FromPlayerId:data.FromPlayerId,FromPlayerName:data.FromPlayerName
        ,FromPlayerLv:data.FromPlayerLv , TeamActivityType:data.TeamActivityType,
        SceneNo: data.SceneNo ,BattlePower:data.TeamBp ,Time:GameUtils.TimeStamp});
        this.event(STeamEvent.TEAM_BE_REQUSET_INTO_TEAM);
    }

    private onS24056(data:S24056)
    {
        if(GameConfig.GAME_AUTO_ALLOW_TEAM&&this.CurrentTeamInfo.TeamRoleInfoDis.values.length < 3)
        {
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                this.protocol.AllowJoinTeam(SRoleData.instance.info.TeamId , element.PlayerId);
            }
        }
    }

    private onS24060(data:S24060)
    {
        SAoiData.instance.event(SAoiEvent.AOI_GO_TO_SCENE, [data.SceneNo , data.X , data.Y]);
    }

    private onS24050(data:S24050)
    {
        this.event(STeamEvent.TEAM_LIST_UPDATE , data);
    }

    private onS24055(data:S24055)
    {
        this.event(STeamEvent.TEAM_ROLE_UPDATE);
    }

    private onS24022(data:S24022)
    {
        var resultStr = data.Result == 0?"拒绝":"同意";
        MsgManager.instance.showRollTipsMsg(`${data.Name}${resultStr}入队！`);
    }

    private onS24003(data:S24003)
    {
        var roleInfo = this.CurrentTeamInfo.TeamRoleInfoDis.get(data.PlayerId);
        if(!roleInfo)
        return;
        roleInfo.state = RoleTeamState.MB_STATE_TEM_LEAVE;
        if(data.PlayerId != SRoleData.instance.roleId)
        {
            MsgManager.instance.showRollTipsMsg(`${roleInfo.name}暂离队伍了！`);
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("你暂离队伍了！！");
        }
        this.event(STeamEvent.TEAM_ROLE_ONE_UPDATE , data.PlayerId);
    }

    private onS24011(data:S24011)
    {
        var roleInfo = this.CurrentTeamInfo.TeamRoleInfoDis.get(data.PlayerId);
        if(!roleInfo)
        return;
        if(data.PlayerId != SRoleData.instance.roleId)
        {
            this.CurrentTeamInfo.LeaderId = data.NewLeaderId != 0?data.NewLeaderId:this.CurrentTeamInfo.LeaderId;
            var newLeader = this.CurrentTeamInfo.TeamRoleInfoDis.get(data.NewLeaderId);
            if(newLeader)
            {
                newLeader.leader = true;
            }

            this.CurrentTeamInfo.TeamRoleInfoDis.remove(data.PlayerId);
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("你离开了队伍");
            this.CurrentTeamInfo.clear();
        }

        
        this.event(STeamEvent.TEAM_ROLE_UPDATE);
    }

    private onS24024(data:S24024)
    {
        var roleInfo = this.CurrentTeamInfo.TeamRoleInfoDis.get(data.PlayerId);
        if(!roleInfo)
        return;
        if(data.PlayerId != SRoleData.instance.roleId)
        {
            MsgManager.instance.showRollTipsMsg(`${roleInfo.name}被请离了！`);
            this.CurrentTeamInfo.TeamRoleInfoDis.remove(data.PlayerId);
        }
        else
        {
            this.CurrentTeamInfo.clear();
            MsgManager.instance.showRollTipsMsg("你被请离了！");
        }
        this.event(STeamEvent.TEAM_ROLE_UPDATE);
    }

    private onS24027(data:S24027)
    {
        var roleInfo = this.CurrentTeamInfo.TeamRoleInfoDis.get(data.PlayerId);
        if(!roleInfo)
        return;
        roleInfo.state = RoleTeamState.MB_STATE_OFFLINE;
        if(data.PlayerId != SRoleData.instance.roleId)
        {
            MsgManager.instance.showRollTipsMsg(`${roleInfo.name}离线了！`);
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("你离线了！");
        }
        this.event(STeamEvent.TEAM_ROLE_ONE_UPDATE , data.PlayerId);
    }

    private onS24026(data:S24026)
    {
        var roleInfo = this.CurrentTeamInfo.TeamRoleInfoDis.get(data.PlayerId);
        if(!roleInfo)
        return;
        roleInfo.state = RoleTeamState.MB_STATE_IN;
        if(data.PlayerId != SRoleData.instance.roleId)
        {
            MsgManager.instance.showRollTipsMsg(`${roleInfo.name}已归队！`);
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("你已归队！");
        }
        this.event(STeamEvent.TEAM_ROLE_ONE_UPDATE , data.PlayerId);
    }

    private onS24053(data:S24053) {
        if(data.RetCode != 0)
        {
            MsgManager.instance.showRollTipsMsg("归队失败！");
        }
        
    }

    private onS24057(data:S24057) {
        Alert.show("是否接受队长邀请归队？",this,()=>{
            //发送24053
            this.protocol.CallBackTeam(data.TeamId);
        },null,null,null,true)
    }

    private onS24054(data:S24054) {
        if(data.RetCode != 0)
        {
            MsgManager.instance.showRollTipsMsg("邀请归队失败！");
        }
    }

    private onS24023(data:S24023)
    {
        var teamRoleInfo = TeamUtil.CreateTeamRoleInfo(data.PlayerId , data.Name , data.Level, data.TrainPos 
            , data.Faction , data.Sex ,data.SceneNo , data.State , data.BtPower , false);
        this.CurrentTeamInfo.TeamRoleInfoDis.set(data.PlayerId , teamRoleInfo);
        this.event(STeamEvent.TEAM_ROLE_UPDATE);
        if(SRoleData.instance.info.IsLeader == 1)
        {
            STeamData.instance.protocol.RequsetCallBackTeam(data.PlayerId);
        }
        if(SRoleData.instance.info.TeamId == 0 && data.PlayerId == SRoleData.instance.roleId)
        {
            STeamData.instance.protocol.RequsetTeamInfo();
        }
    }

    private onS24010(data:S24010)
    {
        SRoleData.instance.info.TeamId = data.TeamId;
        this.CurrentTeamInfo.TeamActivityType = data.TeamActivityType;
        this.CurrentTeamInfo.TeamRoleInfoDis.clear();
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var IsLeader = false;
            if(i == 0)//队长的话要把场景编号赋值过去
            {
                this.CurrentTeamInfo.LeaderId = element.Id;
                if(SRoleData.instance.roleId == this.CurrentTeamInfo.LeaderId)
                {
                    SRoleData.instance.info.SceneNo = element.SceneNo;
                }
                IsLeader = true;
            }
            var teamRoleInfo = TeamUtil.CreateTeamRoleInfo(element.Id , element.Name , element.Level, element.TrainPos 
                , element.Faction , element.Sex,element.SceneNo ,element.State , element.BtPower,IsLeader);
                this.CurrentTeamInfo.TeamRoleInfoDis.set(element.Id , teamRoleInfo);
        }
        this.event(STeamEvent.TEAM_ROLE_UPDATE);
    }

    private onS24000(data:S24000)
    {
        SRoleData.instance.info.TeamId = data.TeamId;
        this.CurrentTeamInfo.TeamActivityType = data.TeamActivityType;
        this.CurrentTeamInfo.LeaderId = SRoleData.instance.roleId;
        SRoleData.instance.info.SceneNo = SRoleData.instance.info.SceneNo;
        var localPlayerInfo = TeamUtil.CreateTeamRoleInfo(SRoleData.instance.roleId ,SRoleData.instance.roleInfo.Name ,SRoleData.instance.info.Lv,
        1 , SRoleData.instance.info.Faction , SRoleData.instance.info.Sex,SRoleData.instance.info.SceneNo , 
        RoleTeamState.MB_STATE_IN , SRoleData.instance.info.BattlePower , true);
        this.CurrentTeamInfo.TeamRoleInfoDis.clear();
        this.CurrentTeamInfo.TeamRoleInfoDis.set(SRoleData.instance.roleId,localPlayerInfo);
        this.protocol.RequsetTeamInfo();
        this.event(STeamEvent.TEAM_CREATE_UPDATE);
        
    }

}

export enum STeamEvent {
    TEAM_CREATE_UPDATE = "team_create_update",//队伍创建跟刷新
    TEAM_ROLE_UPDATE = "team_role_update",//队员信息变化
    TEAM_LEADER_UPDATE = "team_leader_update",//队长变化
    TEAM_ROLE_ONE_UPDATE = "team_role_one_update",//单个玩家信息更新传id
    TEAM_LIST_UPDATE = "team_list_update",//队伍列表
    TEAM_BE_REQUSET_INTO_TEAM = "team_be_requset_into_team",//被邀请入队
}