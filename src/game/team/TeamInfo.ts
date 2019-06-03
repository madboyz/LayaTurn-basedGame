import { S24000 } from "../../net/pt/pt_24";
import { SRoleData } from "../../net/data/SRoleData";

export enum RoleTeamState {
    MB_STATE_TEM_LEAVE = 1,//暂离
    MB_STATE_IN = 2,//在队在线
    MB_STATE_OFFLINE = 3,//离线托管
}

export class TeamInfo {
    public TeamActivityType:number = 0;
    public get LeaderId():number
    {
        return this._leaderId;
    }

    public set LeaderId(value:number)
    {
        this._leaderId = value;
        if(value == SRoleData.instance.roleId)
        {
            SRoleData.instance.info.IsLeader = 1;
        }
        else
        {
            SRoleData.instance.info.IsLeader = 0;
        }
    }
    private _leaderId:number = 0;
    public TeamRoleInfoDis:Laya.Dictionary = new Laya.Dictionary();//已玩家id为key的
    /**
     * 是否有队伍
     */
    public get hasTeam():boolean
    {
        return SRoleData.instance.info.TeamId != 0;
    }

    public clear()
    {
        SRoleData.instance.info.TeamId = 0;
        SRoleData.instance.info.IsLeader = 0;
        this.TeamActivityType = 0;
        this.LeaderId = 0; 
        this.TeamRoleInfoDis.clear();
    }
}