import { BaseMachine } from "./BaseMachine";
import { PlayerView } from "../battle/role/PlayerView";
import { SRoleData } from "../../net/data/SRoleData";
import { STeamData, STeamEvent } from "../team/STeamData";
import { RoleTeamState } from "../team/TeamInfo";
import { GameUtils } from "../utils/GameUtils";
import { Astar } from "../../framework/utils/Astar";

export class TeamMoveMachine extends BaseMachine {
    private TeamPlayerDataDic:Laya.Dictionary = new Laya.Dictionary();//已队伍id为key列表
    private allTeamPlayerView:Laya.Dictionary = new Laya.Dictionary();
    private leaderPosList = [];
    constructor()
    {
        super();
        STeamData.instance.on(STeamEvent.TEAM_ROLE_UPDATE, this ,this.LocalplayerUpdate);
    }

    public ClearTeam()
    {
        this.TeamPlayerDataDic.clear();
        this.allTeamPlayerView.clear();
    }
    
    public LocalplayerUpdate()
    {
        if(!this.targets)return;
        var myTeamInfo = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.get(SRoleData.instance.roleId);
        if(!myTeamInfo)
        {
            return;
        }
        var teamPos = myTeamInfo.trainPos;
        if(myTeamInfo.state == RoleTeamState.MB_STATE_TEM_LEAVE)
        {
            teamPos = 0;
        }
        var data = {Id:SRoleData.instance.roleId,TeamId:SRoleData.instance.info.TeamId , TeamPos:teamPos ,IsLeader:myTeamInfo.leader == true?1:0}
        this.addTeamPlayer(data, this.targets.values[0]);
        
    }

    public addTeamPlayer(target:any , player:PlayerView)
    {
        if(target.TeamId != 0)
        {
            var playerList:Array<any> = this.TeamPlayerDataDic.get(target.TeamId);
            if(!playerList)
            {
                playerList = [];
                this.TeamPlayerDataDic.set(target.TeamId , playerList);
            }
            var _player:any = null;
            for (let i = 0; i < playerList.length; i++) {
                const playerData = playerList[i];
                if(playerData.Id == target.Id)
                {
                    _player = playerData;
                    playerList[i] = target;
                    break;
                }
            }
            if(!_player)
            {
                playerList.push(target);
                this.allTeamPlayerView.set(target.Id ,player);
            }

            
            playerList.sort((a,b):number=>{
                if(a.IsLeader || b.IsLeader)
                {
                    if(!a.IsLeader && b.IsLeader)
                    {
                        return 1;
                    }
                    else
                    {
                        return -1;
                    }
                }
                else
                {
                    if(a.TeamPos < b.TeamPos)
                    {
                        return -1;
                    }
                    return 1;
                }
            });
            
        }
    }

    public RemoveTeamPlayer(uuid:number)
    {
        if(SRoleData.instance.info.TeamId == 0)
        {
            this.ClearTeam()
            return;
        }
        var index = -1;
        var teamList = this.TeamPlayerDataDic.values;
        var playerList:Array<any>;
        for (let i = 0; i < teamList.length; i++) {
            const List:Array<any> = teamList[i];
            for (let j = 0; j < List.length; j++) {
                const element = List[j];
                if(element.Id == uuid)
                {
                    index = j;
                    break;
                }
            }
            if(index != -1)
            {
                playerList = List;
                break;
            }
        }
        var playerView:PlayerView = this.allTeamPlayerView.get(uuid);
        if(playerView)
        {
            playerView.Speed = GameConfig.ROLE_SPEED;
            this.allTeamPlayerView.remove(uuid);
        }

        if(index != -1)
        {
            playerList.splice(index,1);
            playerList.sort((a,b):number=>{
                if(a.IsLeader || b.IsLeader)
                {
                    if(!a.IsLeader && b.IsLeader)
                    {
                        return 1;
                    }
                    else
                    {
                        return -1;
                    }
                }
                else
                {
                    if(a.TeamPos < b.TeamPos)
                    {
                        return -1;
                    }
                    return 1;
                }
            });
        }
    }

    public init(info:Array<any>):void{
        super.init(info);
    }

    public update():void{
        super.update();
        for (let i = 0; i < this.TeamPlayerDataDic.values.length; i++) {
            const playerDataList = this.TeamPlayerDataDic.values[i];
            var leader = playerDataList[0];
            if(!leader)
            continue;
            if(leader.IsLeader == 0)
            {
                continue;
            }
            var leaderview:PlayerView = this.allTeamPlayerView.get(leader.Id);
            if(!leaderview)
            continue;
            if(!leaderview.isMoveing)
            {
                this.leaderPosList = [];
                for (let j = 1; j < playerDataList.length; j++) {
                    const playerData = playerDataList[j];
                    if(!playerData)
                    continue;
                    var playerView:PlayerView = this.allTeamPlayerView.get(playerData.Id);
                    if(!playerView)
                    continue;
                    if(playerView.isMoveing&&playerData.TeamPos > 0)
                    {
                        playerView.stopMove();
                        playerView.angle = leaderview.angle;
                    }
                }
                continue;
            }
            var sortIndex = 1;
            for (let j = 1; j < playerDataList.length; j++) {
                const playerData = playerDataList[j];
                if(!playerData)
                continue;
                if(playerData.TeamPos == 0)
                continue
                var playerView:PlayerView = this.allTeamPlayerView.get(playerData.Id);
                if(!playerView)
                continue;
                var offset = playerView.isFly == true ? 96*sortIndex: 48*sortIndex;
                sortIndex ++;
                var distance = GameUtils.distance(playerView.px ,playerView.py ,leaderview.px, leaderview.py); 
                if(distance >= offset)
                {
                    this.SaveLeaderPos(leaderview.px , leaderview.py);
                    var leaderPos = this.leaderPosList.shift()
                    playerView.Speed = (distance-offset)/3 + 2;
                    playerView.angle = leaderview.angle;
                    var path: any = Astar.instance.find(playerView.px, playerView.py, leaderPos.px, leaderPos.py);
                    playerView.ptachTo(path);
                }
                else
                {
                    this.SaveLeaderPos(leaderview.px , leaderview.py);
                    playerView.Speed = GameConfig.ROLE_SPEED;
                }
            }
        }

    }

    private SaveLeaderPos(_px:number,_py:number)
    {
        if(this.leaderPosList.length == 0)
        {
            this.leaderPosList.push({px:_px , py:_py});
        }
        else
        {
            var lastPos = this.leaderPosList[this.leaderPosList.length-1];
            var detal = GameUtils.distance(lastPos.px ,lastPos.py ,_px, _py); 
            if(detal >Astar.instance.GridSize&&Astar.instance.GridSize > 0)
            {
                this.leaderPosList.push({px:_px , py:_py});
            }
        }
    }

    public dispose():void {
        super.dispose();
        STeamData.instance.off(STeamEvent.TEAM_ROLE_UPDATE, this ,this.LocalplayerUpdate);
    }
}