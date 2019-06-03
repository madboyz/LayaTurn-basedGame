import { BaseMachine } from "./BaseMachine";
import { SGameEvent, SGameData } from "../../net/data/SGameData";
import { S12002_1 } from "../../net/pt/pt_12";
import { PlayerView } from "../battle/role/PlayerView";
import { Astar } from "../../framework/utils/Astar";
import { AoiInfo } from "../aoi/AoiInfo";
import { GameUtils } from "../utils/GameUtils";
/**
 * 本地机器人
 */
export class RobotMachine extends BaseMachine {
    public RobotData:Laya.Dictionary = new Laya.Dictionary();
    private RobotPaths:Laya.Dictionary = new Laya.Dictionary();
    private RobotTimes:Laya.Dictionary = new Laya.Dictionary();//机器人间隔增量时间处理其他事物
    constructor()
    {
        super();
        SGameData.instance.on(SGameEvent.GAME_SCENE_LOADING, this, this.onGameSceneLoading);//场景变化
        this.InitRobotData();
    }
    public Init(info:Array<any>)
    {
        super.init(info);
    }

    /**
     * 初始化机器人数据（随机名字等）
     */
    public InitRobotData()
    {
        this.RobotData.clear();
        var clothes = [0,60001,60003,60006,60008,60010,60012,60014];
        var ride = [0,1,2,3,4,6,13];
        for (let i = 0; i < GameConfig.ROBOT_COUNT; i++) {
            var data = new S12002_1();
            data.Id = i+GameConfig.ROBOT_ID;
            data.Faction = GMath.randRange(1,2);
            /**
            * 2018/11/29 10:27 孝鹏要求没有性别按钮只有两个职业跟对应的1个形象
            */
            data.Sex = data.Faction;
            data.GraphTitle = 50019;
            data.Lv = GMath.randRange(1,90);
            data.AerocraftNo = GMath.randRange(0,ride.length - 1);
            data.Clothes = clothes[GMath.randRange(0,clothes.length-1)];
            data["IsAdd"] = false;
            data.PlayerName = GameUtils.RandNameBySex(data.Sex);
            this.RobotData.set(data.Id,data);
            this.RobotTimes.set(data.Id,0);
        }
    }

    /**
     * 随机路线
     */
    private RandCurrentPathRound(uuid:number){
        if(!this.data)
        return;
        var path = [];
        if(this.data.length > 1)
        {
            var index = GMath.randRange(0,this.data.length-1);
            if (this.data[index]) {
                var round:any[] = this.data[index];
                round = GMath.Shuffle(round); 
                for (let i = 0; i < round.length; i++) {
                    var point = round[i];
                    path.push(point);
                }
            }
            
        }
        else
        {
            
            var round:any[] = this.data[0];
            round = GMath.Shuffle(round); 
            for (let i = 0; i < round.length; i++) {
                var point = round[i];
                path.push(point);
            }
                
        }
        this.RobotPaths.set(uuid,path)
    }

    public update():void{
        super.update();
        //if(this.mCurrentPath.length == 0)
        //{
        //    this.RandCurrentPathRound();
        //}
        //var point = this.mCurrentPath.shift();
    }

    public checkRobotMove(playerView:PlayerView,uuid:number)
    {

        var time = this.RobotTimes.get(uuid);
        var playerInfo: AoiInfo = playerView.info;
        var Info = playerInfo.getInfo(RoleType.OBJ_PLAYER);
        if(time >= 800)
        {
            this.RobotTimes.set(uuid,0);
            if(Info.BhvState == AoiBhvCode.BHV_BATTLING)
            {
                Info.BhvState = AoiBhvCode.BHV_IDLE;
            }
            else
            {
                var randBattle = GMath.randRange(0,5);
                if(randBattle <=2)
                {
                    Info.BhvState = AoiBhvCode.BHV_BATTLING;
                }
            }
            
        }
        else
        {
            time ++;
            this.RobotTimes.set(uuid,time);
        }
        if(Info.BhvState == AoiBhvCode.BHV_BATTLING)
        {
            playerView.stopMove();
            return;
        }
        if(!playerView.isMoveing)
        {
            var round = this.RobotPaths.get(uuid);
            if(round)
            {
                if(round.length == 0)
                {
                    this.RandCurrentPathRound(uuid);
                }
                var point = round.shift();
                if(point)
                {
                    var path: any = Astar.instance.find(playerView.px, playerView.py, point.x, point.y);
                    playerView.ptachTo(path);
                }
                else
                round = [];
                
            }
            else
            this.RandCurrentPathRound(uuid);
            
        }
    }

    private onGameSceneLoading(SceneNo:number)
    {
        this.RobotPaths.clear();
    }

    public dispose():void {
        super.dispose();
        SGameData.instance.off(SGameEvent.GAME_SCENE_LOADING, this, this.onGameSceneLoading);//场景变化
    }
}