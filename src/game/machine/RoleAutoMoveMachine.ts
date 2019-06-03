import { BaseMachine } from "./BaseMachine";
import { Role } from "../battle/role/Role";
import { Astar } from "../../framework/utils/Astar";
import { Debug } from "../../debug/Debug";
import { SGameData, SGameEvent } from "../../net/data/SGameData";
import { SRoleData, SRoleEvent } from "../../net/data/SRoleData";
import { LocalPlayerView } from "../battle/role/LocalPlayerView";
import { STeamData } from "../team/STeamData";
import { RoleTeamState } from "../team/TeamInfo";
import { SCopyData } from "../../net/data/SCopyData";
/**
 * 玩家自动移动machine
 */
export class RoleAutoMoveMachine extends BaseMachine{
    private mCurrentPath: Array<any> = new Array<any>();//当前自动寻路路线
    private mCheckAutoTime:number = 0;//不移动时检查是否挂机的间隔时间（帧数）
    private mCurrentTime:number = 0;//time
    private mPanelids = [UIID.SYS_CHALLENGE_RESULT , UIID.SYS_LOGIN_REWARD , UIID.SYS_CHAPTER_MAP , UIID.SYS_CHALLENGE_BOSS , UIID.SYS_TEAM , UIID.SYS_TEAM_BEREQUEST, UIID.SYS_COPY_BOSS,UIID.SYS_COPY_STUFF,UIID.SYS_MAIN,UIID.SYS_OFFLINE_DATA];
    public init(info:Array<any>):void{
        super.init(info);
        //var frame = 30;
        //if(Laya.stage.frameRate == Laya.Stage.FRAME_FAST)
        //{
        //    frame = 60;
        //}
        //this.mCheckAutoTime = Math.floor(10 / (1/frame));
        this.mCheckAutoTime = 300;
    }

    constructor()
    {
        super();
        SGameData.instance.on(SGameEvent.GAME_SCENE_LOADING, this, this.onGameSceneLoading);//场景变化
    }
    
    private onGameSceneLoading(SceneNo:number)
    {
        var localPlayer:LocalPlayerView = this.targets.get(SRoleData.instance.roleId);
        if(localPlayer)
        {
            localPlayer.stopMove();
            this.mCurrentPath = [];
        }
    }

    public update():void{
        super.update();
        if(!GameConfig.GAME_IS_OPEN_AUTO_ROLE)
        {
            SRoleData.instance.event(SRoleEvent.ROLE_AUTO_MOVE_UPDATE , false);
            return;
        }
        if(SCopyData.instance.isInCopy)
        {
            SRoleData.instance.event(SRoleEvent.ROLE_AUTO_MOVE_UPDATE , false);
            return;
        }
        var localPlayer:LocalPlayerView = this.targets.get(SRoleData.instance.roleId);
        if(!localPlayer)
        return;
        if(SRoleData.instance.FoceStopMove)
        {
            if(localPlayer.isMoveing)
            localPlayer.stopMove();
            return;
        }
        if(SRoleData.instance.info.TeamId != 0&&SRoleData.instance.info.IsLeader != 1)
        {
            var roleInfo = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.get(SRoleData.instance.roleId);
            if(roleInfo &&  roleInfo.state == RoleTeamState.MB_STATE_IN)
            {
                this.mCurrentPath = [];
                SRoleData.instance.event(SRoleEvent.ROLE_AUTO_MOVE_UPDATE , false);
                return;
            }
            
        }
        var noOpen = true;
        for (let i = 0; i < this.mPanelids.length; i++) {
            const id = this.mPanelids[i];
            if(UIManager.instance.hasOpenUI(id))
            {
                noOpen = false;
                break;
            }
        }
        if(!noOpen||SGameData.instance.PLAYFIGHTREPORT)
        {
            localPlayer.stopMove();
            this.mCurrentPath = [];
            
            return;
        }
            if(SRoleData.instance.CanAutoMove)
            {
                if(!localPlayer.isMoveing)
                {
                    if(this.mCurrentPath.length == 0)
                    {
                        this.RandCurrentPathRound();
                    }
                    localPlayer.IsNeedPos = true;
                    var point = this.mCurrentPath.shift();
                    var path: any = Astar.instance.find(localPlayer.px, localPlayer.py, point.x, point.y);
                    localPlayer.ptachTo(path);
                    SRoleData.instance.event(SRoleEvent.ROLE_AUTO_MOVE_UPDATE , true);
                }
            }
            else
            {
                if(this.mCurrentPath.length > 0)
                {
                    this.mCurrentPath.splice(0,this.mCurrentPath.length);
                }
                
                if(!localPlayer.isMoveing)
                {
                    if(this.mCurrentTime >= this.mCheckAutoTime)
                    {
                        SRoleData.instance.CanAutoMove = true;
                        this.mCurrentTime = 0;
                    }
                    else
                    {
                        this.mCurrentTime ++;
                    }
                    
                }
                else
                {
                    this.mCurrentTime = 0;
                }
            }
        
    }
    /**
     * 随机路线
     */
    private RandCurrentPathRound(){
        if(!this.data)
        return;
        if(this.data.length > 1)
        {
            var index = GMath.randRange(0,this.data.length-1);
            if (this.data[index]) {
                this.mCurrentPath = new Array<any>();
                for (let i = 0; i < this.data[index].length; i++) {
                    var point = this.data[index][i];
                    this.mCurrentPath.push(point);
                }
            }
        }
        else
        {
            this.mCurrentPath = new Array<any>();
            for (let i = 0; i < this.data[0].length; i++) {
                var point = this.data[0][i];
                this.mCurrentPath.push(point);
            }
                
        }
        
    }

    public dispose():void {
        super.dispose();
        SGameData.instance.off(SGameEvent.GAME_SCENE_LOADING, this, this.onGameSceneLoading);//场景变化
    }
} 