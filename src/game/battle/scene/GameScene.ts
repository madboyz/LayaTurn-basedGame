import { S12002_1, S12005_1 } from '../../../net/pt/pt_12';
import { AoiInfo } from '../../aoi/AoiInfo';
// import { DebugGridLayer } from './DebugGridLayer';
import { SAoiData, SAoiEvent } from '../../aoi/SAoiData';
import { LocalPlayerView } from '../role/LocalPlayerView';
import { PlayerView } from '../role/PlayerView';
import { GameLayer } from './../../../GameLayer';
import { Astar } from './../../../framework/utils/Astar';
import { SRoleData, SRoleEvent } from './../../../net/data/SRoleData';
import { Role } from './../role/Role';
import { Camera } from './Camera';
import { MapLayer } from './layer/MapLayer';
import { NameLayer } from './layer/NameLayer';
import { RoleLayer } from './layer/RoleLayer';
import { ObjView } from '../role/ObjView';
import { RoleFactory } from '../role/RoleFactory';
import { RoleAutoMoveMachine } from '../../machine/RoleAutoMoveMachine';
import { ChapterChallengeMachine } from '../../machine/ChapterChallengeMachine';
import { RoleOtherLayer } from './layer/RoleOtherLayer';
import { STeamData } from '../../team/STeamData';
import { RoleTeamState } from '../../team/TeamInfo';
import { TeamMoveMachine } from '../../machine/TeamMoveMachine';
import { SNewBattleData } from '../../../net/data/SNewBattleData';
import { SGameData, SGameEvent } from '../../../net/data/SGameData';
import { AnimationPoolManager } from '../../../framework/animation/AnimationPoolManager';
import { RoleTouch } from './touch/RoleTouch';
import { GameUtils } from '../../utils/GameUtils';
import { Delay } from '../../../framework/utils/Delay';
import { PetFollowMachine } from '../../machine/PetFollowMachine';
import { PetView } from '../role/PetView';
import { BaseScene } from './BaseScene';
import { RoleMoveAndActionMachine } from '../../machine/RoleMoveAndActionMachine';
import { SMachineData, SMachineEvent } from '../../machine/SMachineData';
import { SPetData } from '../../../net/data/SPetData';
import { PetInfo } from '../../ui/compent/data/PetInfo';
import { CommonLayer } from './layer/CommonLayer';
import { AchieveVo } from '../../../db/sheet/vo/AchieveVo';
import { RobotMachine } from '../../machine/RobotMachine';
import { ConstVo } from '../../../db/sheet/vo/ConstVo';
export class GameScene extends BaseScene {
    private roleOtherLayer: RoleOtherLayer;
    private roleLayer: RoleLayer;
    public localPlayer: LocalPlayerView;
    private players = new Laya.Dictionary();//其他玩家
    private objs = new Laya.Dictionary();//场景类npc宠物怪物等
    private robots = new Laya.Dictionary();//机器人玩家
    //private pets = new Laya.Dictionary();//跟随宠物
    private nameLayer: NameLayer;
    private commonLayer:CommonLayer;//通用层级在玩家上面
    private roleAutoMoveMachine: RoleAutoMoveMachine;
    private chapterChallengeMachine: ChapterChallengeMachine;
    private roleMoveAndActionMachine: RoleMoveAndActionMachine;
    public teamMoveMachine: TeamMoveMachine;
    private robotMachine:RobotMachine;
    private readonly DelyCheckRobotTime = 8000;
    //private petFollowMachine:PetFollowMachine;
    private readonly CheckAnimationTime = 2000;//检查动画资源间隔时间
    private CheckTime = 0;
    constructor() {
        super();
        this.chapterChallengeMachine = new ChapterChallengeMachine();
        this.roleMoveAndActionMachine = new RoleMoveAndActionMachine();
        this.teamMoveMachine = new TeamMoveMachine();
        this.robotMachine = new RobotMachine();
    }

    private _firstLogin:boolean = true;//第一次登陆自动寻路，防止后面切换场景的时候也被设成自动寻路
    // private debug: DebugGridLayer;
    protected mapReader() {
        super.mapReader();
        //this.camera.setWorldSize(Astar.instance.MapWidth, Astar.instance.MapHeight);
        //this.camera.setViewport(0, 0, Laya.stage.width, Laya.stage.height);
        this.camera.Init(Astar.instance.MapWidth, Astar.instance.MapHeight, 0, 0,
            Astar.instance.OrigMapWidth,Astar.instance.OrigMapHeight,Astar.instance.PIVOTX,Astar.instance.PIVOTY);
        
        if(this.localPlayer == null)
        {
            this.localPlayer = new LocalPlayerView();
            this.roleLayer.add(this.localPlayer); 
            this.initEvent();
        }

        this.UpdateLocalplayer();
        this.localPlayer.angle = -45;
        // this.debug = new DebugGridLayer();
        // this.debug.showGrid(Astar.instance.MapWidth, Astar.instance.MapHeight, Astar.instance.getGrid());
        // this.addChild(this.debug);
        if (Astar.instance.WalkPaths.length > 0) {
            if(this.roleAutoMoveMachine == null)
            {
                this.roleAutoMoveMachine = new RoleAutoMoveMachine();
                this.roleAutoMoveMachine.addTarget(SRoleData.instance.roleId , this.localPlayer);
            }
            this.roleAutoMoveMachine.init(Astar.instance.WalkPaths);
            if(this._firstLogin){
                this._firstLogin = false;
                SRoleData.instance.CanAutoMove = true;
            }
        }
        else
        {
            SRoleData.instance.CanAutoMove = false;
        }
        this.robotMachine.Init(Astar.instance.WalkPaths);
        this.teamMoveMachine.addTarget(SRoleData.instance.roleId , this.localPlayer);
        this.roleMoveAndActionMachine.addTarget(SRoleData.instance.roleId , this.localPlayer);
        
        //if(!this.petFollowMachine)
        //{
        //    this.petFollowMachine = new PetFollowMachine();
        //    this.petFollowMachine.addTarget(SRoleData.instance.roleId , this.localPlayer);
        //}
        
        
        this.chapterChallengeMachine.init([this.mapId]);
        SAoiData.instance.event(SAoiEvent.AOI_REQUSET_INFO, SRoleData.instance.info.SceneId);
        
        SGameData.instance.event(SGameEvent.GAME_SCENE_LOADING ,this.mapId);
        /**
         * 先清除场景机器人
         */
        for (let i = 0; i < this.robotMachine.RobotData.keys.length; i++) {
            const key = this.robotMachine.RobotData.keys[i];
            this.removeRobotToLayer(key);
        }
        /**
         * 切换地图时需要延时判断aoi是否有玩家因为如果没有玩家服务端是是不会返回的
         */
        Laya.timer.once(this.DelyCheckRobotTime,this,()=>{
            this.CheckAoiPlayerAddRobot();
        });
    }
    /**
     * 如果player不为null代表是新进入aoi的真实玩家 = null就是要添加的
     * @param player 
     */
    public CheckAoiPlayerAddRobot(player:PlayerView = null)
    {
        var vos:Array<any>= ConstVo.get("NO_ROBOT_SENCE").val;
        var IsNo = false;
        for (let index = 0; index < vos.length; index++) {
            var id = vos[index];
            if(SRoleData.instance.info.SceneNo == id)
            {
                IsNo = true;
                break; 
            }
        }
        if(IsNo)return;
        var Robotlist = this.robotMachine.RobotData;
        if(player)
        {
            var isSameName = false;
            for (let i = 0; i < Robotlist.values.length; i++) {
                const element = Robotlist.values[i];
                if(element.IsAdd&&player.PlayerName == element.PlayerName)
                {
                    this.removeRobotToLayer(element.Id);
                    isSameName = true;
                }
            }
            if(!isSameName)
            {
                for (let i = 0; i < Robotlist.values.length; i++) {
                    const element = Robotlist.values[i];
                    if(element.IsAdd)
                    {
                        this.removeRobotToLayer(element.Id);
                        break;
                    }
                } 
            }
        }
        var needCount = GameConfig.ROBOT_COUNT - (this.players.values.length + this.robots.values.length);
        if(needCount < 0)
        {
            needCount = 0;
        }
        
        for (let i = 0; i < Robotlist.values.length; i++) {
            const element = Robotlist.values[i];
            if(needCount == 0)
            break;
            if(element.IsAdd == false)
            {
                this.addRobotToLayer(element);
                needCount --;
            }
        }
    }

    /**
     * 获取一个aoi玩家有可能为null
     * @param uuid 
     */
    public GetAoiPlayer(uuid: number): PlayerView {
        var player = this.players.get(uuid);
        return player;
    }

    /**
     * 获得aoi玩家个数
     */
    public GetAoiPlayerCount():number {
        return this.players.keys.length;
    }
    /**
     * 获得aoiobj个数
     */
    public GetAoiObjCount():number {
        return this.objs.keys.length;
    }

    private UpdateLocalplayer()
    {
        if(this.localPlayer == null)
        return;
        this.localPlayer.info = SRoleData.instance.roleInfo;
        this.changeRoleScenePos(this.localPlayer, SRoleData.instance.info.X, SRoleData.instance.info.Y);
        this.localPlayer.angle = -45;
    }

    /**
     * 服务端通知本地玩家移动
     * @param netX 
     * @param netY 
     */
    public ServerLocalplayerGotoPos(netX:number , netY:number)
    {
        var x = netX * Astar.instance.GridSize;
        var y = Astar.instance.MapHeight - netY * Astar.instance.GridSize;
        var path: any = Astar.instance.find(this.localPlayer.px, this.localPlayer.py, x, y);
        this.localPlayer.ptachTo(path);
    }

    /**
     * 获取一个aoiObj有可能为null
     * @param uuid 
     */
    public GetAoiObj(uuid: number): ObjView {
        var obj = this.objs.get(uuid);
        return obj;
    }

    public changeRoleScenePos(role: Role, x: number, y: number) {
        role.px = x * Astar.instance.GridSize;
        role.py = Astar.instance.MapHeight - y * Astar.instance.GridSize;
        if(role.IsAstar)
        Astar.instance.isAlpha(role.px, role.py) ? role.alpha = 0.5 : role.alpha = 1;
    }

    protected initEvent(): void {
        super.initEvent();
    }

    protected removeEvent(): void {
        super.removeEvent();
    }

    protected initLayer(): void {
        super.initLayer();
        this.roleOtherLayer = new RoleOtherLayer();
        this.addChild(this.roleOtherLayer);

        this.roleLayer = new RoleLayer();
        this.addChild(this.roleLayer);
        
        this.commonLayer = new CommonLayer();
        this.addChild(this.commonLayer);

        this.nameLayer = new NameLayer();
        this.addChild(this.nameLayer);

    }

    public mapId: number;
    public async changeScene(mapId: number) {
        if(this.mapId != undefined && this.mapId != mapId)
        AnimationPoolManager.instance.CheckDeepPoolRes(this.localPlayer);
        this.mapId = mapId;
        SRoleData.instance.CanAutoMove = false;
        this.Reset();
        this.UpdateLocalplayer();
        var This: GameScene = this;
        Laya.Tween.clearAll(GameLayer.instacne.sceneLayer);
        GameLayer.instacne.sceneLayer.alpha = 0.1;
        var ismapReader = await This.mapLayer.setMap(mapId);
        Laya.Tween.to(GameLayer.instacne.sceneLayer,{alpha:1},1000,Laya.Ease.strongInOut);
        This.mapReader();
    }

    /**
     * 添加一个玩家（过滤本地玩家自己）
     * @param data 
     */
    public addRoleToLayer(data: S12002_1): PlayerView {
        if (data.Id == SRoleData.instance.roleId)
            return this.localPlayer;
        var info: AoiInfo = null;
        var player: PlayerView = this.players.get(data.Id);
        if (player == null) {
            player = Laya.Pool.getItemByClass("PlayerView", PlayerView);
            if (player == null) {
                player = RoleFactory.CreateAOiPlayer(data.Faction, data.Sex);
            }
            info  = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
            info.PlayerInfo = data;
            player.info = info;
            player.angle = -45;
            this.players.set(data.Id,player);
            this.roleLayer.add(player);
            //player.px = data.X;
            //player.py = data.Y;
            //player.x = player.px - this.camera.originX;
            //player.y = player.py - this.camera.originY;
            this.CheckAoiPlayerAddRobot(player);
        }
        info = player.info;
        info.PlayerInfo = data;
        if(data.AerocraftNo != 0)
        {
            player.isFly = true;
        }
        else {
            player.isFly = false;
        }
        player.updateMount(data.AerocraftNo);
        this.changeRoleScenePos(player, data.X, data.Y);
        this.nameLayer.showName(data.Id, data.PlayerName, player.x, player.y + 165);
        return player;
    }

     /**
     * 添加一个机器人玩家（过滤本地玩家自己）
     * @param data 
     */
    public addRobotToLayer(data: S12002_1): PlayerView {
        var info: AoiInfo = null;
        var player: PlayerView = this.robots.get(data.Id);
        if (player == null) {
            player = Laya.Pool.getItemByClass("PlayerView", PlayerView);
            if (player == null) {
                player = RoleFactory.CreateAOiPlayer(data.Faction, data.Sex);
            }
            info  = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
            info.PlayerInfo = data;
            player.info = info;
            player.angle = -45;
            this.robots.set(data.Id,player);
            this.roleLayer.add(player);
            //player.px = data.X;
            //player.py = data.Y;
            //player.x = player.px - this.camera.originX;
            //player.y = player.py - this.camera.originY;
        }
        info = player.info;
        info.PlayerInfo = data;
        if(data.AerocraftNo != 0)
        {
            player.isFly = true;
        }
        else {
            player.isFly = false;
        }
        //随机一个寻路点作为初始坐标
        if(Astar.instance.WalkPaths)
        {
            var round = Astar.instance.WalkPaths[0];
            var index = GMath.randRange(0,round.length-1);
            data.X = round[index].x; 
            data.Y = round[index].y;
        }
        else
        {
            data.X = this.localPlayer.x; 
            data.Y = this.localPlayer.y;
        }
        
        player.updateMount(data.AerocraftNo);
        player.px = data.X;
        player.py = data.Y;
        //this.changeRoleScenePos(player, data.X, data.Y);
        this.nameLayer.showName(data.Id, data.PlayerName, player.x, player.y + 165);
        var robot = this.robotMachine.RobotData.get(data.Id);
        if(robot)
        {
            robot.IsAdd = true;
        }
        return player;
    }

    public UpdateRoleBattleIng(id: number, x: number, y: number, isFighting: boolean,isRobot:boolean = false) {
        var other = isRobot == false?this.players:this.robots;
        var player: PlayerView = other.get(id);
        if (player != null) {
            if (isFighting) {
                var url: string = "art/anim/role_other/battleing.json";
                var offsetY = player.isFly ? -player.offsetY : 0;
                this.roleOtherLayer.ShowAnimation(id + GameConfig.BATTLE_CONST, x, y+offsetY, url, false);
            }
            else {
                this.roleOtherLayer.removeAnimation(id + GameConfig.BATTLE_CONST);
            }
        }
        else
        this.roleOtherLayer.removeAnimation(id + GameConfig.BATTLE_CONST);
    }

    public UpdateRoleTeamIng(id: number, x: number, y: number, isInTeam: boolean, IsLeader:boolean , isMe: boolean = false) {
        var player: PlayerView = this.players.get(id);
        if (!isMe && player != null || isMe) {
            if (isInTeam&&IsLeader) {
                var showPlayer = isMe ? this.localPlayer : player;
                var url: string = "art/uiAnim/ui_effect_12.json";
                var offsetY = showPlayer.isFly ? -showPlayer.offsetY : 0;
                this.roleOtherLayer.ShowAnimation(id + GameConfig.TEAM_CONST, x, y + offsetY, url, false);
            } else {
                this.roleOtherLayer.removeAnimation(id + GameConfig.TEAM_CONST);
            }
        }
        else
        this.roleOtherLayer.removeAnimation(id + GameConfig.TEAM_CONST);
    }

    //需要显示升级特效
    public needLvUpEff:boolean = false;
    //升级特效
    public playerLvUp(id: number, x: number, y: number) {
        if(!this.needLvUpEff){
            return;
        }
        var url: string = "art/uiAnim/ui_effect_13.json";
        this.roleOtherLayer.ShowAnimation(id + GameConfig.LVUP_CONST, x, y, url, true);
        var eff:Laya.Animation = this.roleOtherLayer.Animations.get(id + GameConfig.LVUP_CONST);
        eff.once(Laya.Event.COMPLETE, this, () => {
            this.needLvUpEff = false;
        });
    }

    public removeRobotToLayer(uuid: number):void {
        if (this.robots.get(uuid) != null) {
            this.roleLayer.remove(this.robots.get(uuid));
            this.robots.remove(uuid);
            this.nameLayer.removeName(uuid);
            this.roleOtherLayer.removeShadow(uuid);
            this.roleOtherLayer.removeAnimation(uuid + GameConfig.BATTLE_CONST);
            this.commonLayer.removeAnimation(uuid + GameConfig.TITLE_CONST);
            this.commonLayer.removeIcon(uuid + GameConfig.TITLE_CONST);
        }
        var data = this.robotMachine.RobotData.get(uuid);
        if(data)
        {
            data.IsAdd = false;
        }
    }
    

    public removeRoleToLayer(uuid: number): void {

        if (this.players.get(uuid) != null) {
            this.roleLayer.remove(this.players.get(uuid));
            this.players.remove(uuid);
            this.nameLayer.removeName(uuid);
            this.roleOtherLayer.removeShadow(uuid);
            this.roleOtherLayer.removeAnimation(uuid + GameConfig.TEAM_CONST);
            this.roleOtherLayer.removeAnimation(uuid + GameConfig.BATTLE_CONST);
            this.removeTitle(uuid);
        }
        this.CheckAoiPlayerAddRobot();
        //if (this.pets.get(uuid) != null) {
        //    this.roleLayer.remove(this.pets.get(uuid));
        //    this.pets.remove(uuid);
        //    this.petFollowMachine.RemoveScenePet(uuid,true);
        //}
    }
    /**
     * 添加一个非角色场
     * @param data 
     */
    public addObjToLayer(data): void {
        var info: AoiInfo = null;
        var obj: ObjView  = this.objs.get(data.ObjId);
        if (obj == null) {
            obj = Laya.Pool.getItemByClass("ObjView", ObjView);
            obj = RoleFactory.CreateNormalSceneObj(data.ObjType, data.ObjNo);
            if (obj.SheetData == null)
                return;
            info = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
            info.ObjeInfo = data;
            obj.info = info;
            obj.angle = 0;
            this.objs.set(data.ObjId,obj);
            this.roleLayer.add(obj);
            for (var i: number = 0; i < this.roleLayer.numChildren; i++) {
                var role = this.roleLayer.getChildAt(i);
                if(role instanceof PlayerView||role instanceof LocalPlayerView)
                {
                    this.roleLayer.setTop(role);
                }
            }
            if(data.ObjType == RoleType.OBJ_MONSTER)
            {
                RoleTouch.createTouch(obj , data.ObjId+GameConfig.CLICK_CONST , function(targetId: number, args: any[] , px:number , py:number)
                {
                    GameUtils.DoClickSelectSceneObj(targetId , args , obj);
                },[obj.SheetData,info]);
            }
        }
        info = obj.info;
        info.ObjeInfo = data;
        this.changeRoleScenePos(obj, data.X, data.Y);
        var name = obj.SheetData.name;
        //if (data.ObjType == RoleType.OBJ_NPC) {
        //    name = obj.SheetData.name + "\n" + obj.SheetData.title;
        //}
        obj.isFly = false;
        this.nameLayer.showName(data.ObjId, name, obj.x, obj.y + 165);
    }

    public removeObjToLayer(uuid: number): void {
        if (this.objs.get(uuid) != null) {
            this.roleLayer.remove(this.objs.get(uuid));
            this.objs.remove(uuid);
            this.nameLayer.removeName(uuid);
            RoleTouch.removeTouchByBoid(uuid+GameConfig.CLICK_CONST);
            this.roleOtherLayer.removeShadow(uuid);
            this.roleOtherLayer.removeAnimation(uuid + GameConfig.TEAM_CONST);
            this.roleOtherLayer.removeAnimation(uuid + GameConfig.BATTLE_CONST);
        }
    }
    /**
     * 更新玩家称号
     * @param id 
     * @param x 
     * @param y 
     */
    public UpdateRoleTitle(no:number,id: number, x: number, y: number,isMe: boolean = false,isRobot:boolean = false) {
        var other = isRobot == false?this.players:this.robots;
        var player: PlayerView =  isMe == true ?this.localPlayer:other.get(id);
        if (player != null) {
            if (id > 0 &&no > 0) {
                var titleVo = AchieveVo.get(no);
                if(!titleVo)return;
                var type = titleVo.effect[0];
                var url: string = titleVo.effect[1];
                var offsetX = titleVo.effect[2];
                var offsetY = (player.isFly ? -player.offsetY : 0) + titleVo.effect[3];
                switch(type)
                {
                    case 1:
                    {
                        this.commonLayer.ShowIcon(id+ GameConfig.TITLE_CONST, x+offsetX, y+offsetY+GameConfig.TITLE_Y_OFFSET, url);
                        break;
                    }
                    case 2:
                    {
                        this.commonLayer.ShowAnimation(id + GameConfig.TITLE_CONST, x+offsetX, y+offsetY+GameConfig.TITLE_Y_OFFSET, url, false);
                        break;
                    }
                }
                
            }
            else {
                this.commonLayer.removeAnimation(id + GameConfig.TITLE_CONST);
                this.commonLayer.removeIcon(id + GameConfig.TITLE_CONST);
            }
        }
        else
        {
            this.commonLayer.removeAnimation(id + GameConfig.TITLE_CONST);
            this.commonLayer.removeIcon(id + GameConfig.TITLE_CONST);
        }
    }

    public removeTitle(id: number)
    {
        this.commonLayer.removeAnimation(id + GameConfig.TITLE_CONST);
        this.commonLayer.removeIcon(id + GameConfig.TITLE_CONST);
    }

    protected loop(): void {
        super.loop();
        if(!this.localPlayer)return;
        if(SRoleData.instance.isWabaoing)
        {
            this.localPlayer.IsNeedPos = false;
        }
        if(SRoleData.instance.roleId ==0) return;
        if(this.CheckTime >= this.CheckAnimationTime)
        {
            this.CheckTime = 0;
            AnimationPoolManager.instance.CheckDeepPoolRes(this.localPlayer);
        }
        else
        this.CheckTime ++;
        var x: number = this.localPlayer.px;
        var y: number = this.localPlayer.py;
        this.camera.lookAt(x, y);
        this.localPlayer.x = x - this.camera.originX;
        this.localPlayer.y = y - this.camera.originY;
        this.nameLayer.showName(SRoleData.instance.roleId, SRoleData.instance.roleInfo.Name, this.localPlayer.x, this.localPlayer.y + 165);
        this.UpdateRoleTeamIng(SRoleData.instance.roleId, this.localPlayer.x, this.localPlayer.y, SRoleData.instance.info.TeamId != 0,SRoleData.instance.info.IsLeader == 1 ,true);
        this.playerLvUp(SRoleData.instance.roleId, this.localPlayer.x, this.localPlayer.y);
        this.UpdateRoleTitle(SRoleData.instance.info.GraphTitle,SRoleData.instance.roleId,this.localPlayer.x,this.localPlayer.y,true);
        //var localPlayerPetlist = SPetData.instance.fightList;
        //if(localPlayerPetlist.length > 0)
        //{
        //    var pet = this.pets.get(SRoleData.instance.roleId);
        //    if(!pet)
        //    {
        //        var petinfo:PetInfo = localPlayerPetlist[0];
        //        pet = Laya.Pool.getItemByClass("PetView", PetView);
        //        pet.info = {ParentPartnerNo:petinfo.PartnerNo};
        //        pet.angle = -45;
        //        this.pets.set(SRoleData.instance.roleId, pet);
        //        this.roleLayer.add(pet);
        //        pet.px = this.localPlayer.px;
        //        pet.py = this.localPlayer.py;
        //        this.petFollowMachine.UpdateScenePet(SRoleData.instance.roleId,this.localPlayer,petinfo.PartnerNo,pet);
        //    }
        //}
        

        for (let i = 0; i < this.players.keys.length; i++) {
            const key = this.players.keys[i];
            const player = this.players.get(key); 
            player.x = player.px - this.camera.originX;
            player.y = player.py - this.camera.originY;
            if (player.info != null) {
                var playerInfo: AoiInfo = player.info;
                var Info = playerInfo.getInfo(RoleType.OBJ_PLAYER);
                this.nameLayer.showName(Info.Id, Info.PlayerName, player.x, player.y + 165);
                this.UpdateRoleBattleIng(Info.Id, player.x, player.y, Info.BhvState == AoiBhvCode.BHV_BATTLING);//是否在战斗中
                this.UpdateRoleTeamIng(Info.Id, player.x, player.y, Info.TeamId != 0,Info.IsLeader == 1);
                this.UpdateRoleTitle(Info.GraphTitle,Info.Id,player.x, player.y);
                //var Playerpet: PetView = this.pets.get(key);
                //if (Playerpet == null&&Info.PartnerNo>0) {
                //    Playerpet = Laya.Pool.getItemByClass("PetView", PetView);
                //    Playerpet.info = {ParentPartnerNo:Info.PartnerNo};
                //    Playerpet.angle = -45;
                //    this.pets.set(Info.Id, pet);
                //    this.roleLayer.add(pet);
                //    Playerpet.px = player.px;
                //    Playerpet.py = player.py;
                //    Playerpet.x = Playerpet.px - this.camera.originX;
                //    Playerpet.y = Playerpet.py - this.camera.originY;
                //    this.petFollowMachine.UpdateScenePet(Info.Id,player,Info.PartnerNo,pet);
                //}
            }
        }

        for (let i = 0; i < this.robots.keys.length; i++) {
            const key = this.robots.keys[i];
            const robot = this.robots.get(key); 
            robot.x = robot.px - this.camera.originX;
            robot.y = robot.py - this.camera.originY;
            if (robot.info != null) {
                var playerInfo: AoiInfo = robot.info;
                var Info = playerInfo.getInfo(RoleType.OBJ_PLAYER);
                this.nameLayer.showName(Info.Id, "", robot.x, robot.y + 165);
                this.UpdateRoleBattleIng(Info.Id, robot.x, robot.y, Info.BhvState == AoiBhvCode.BHV_BATTLING,true);//是否在战斗中
                this.UpdateRoleTitle(Info.GraphTitle,Info.Id,robot.x, robot.y,true);
                //var Playerpet: PetView = this.pets.get(key);
                //if (Playerpet == null&&Info.PartnerNo>0) {
                //    Playerpet = Laya.Pool.getItemByClass("PetView", PetView);
                //    Playerpet.info = {ParentPartnerNo:Info.PartnerNo};
                //    Playerpet.angle = -45;
                //    this.pets.set(Info.Id, pet);
                //    this.roleLayer.add(pet);
                //    Playerpet.px = player.px;
                //    Playerpet.py = player.py;
                //    Playerpet.x = Playerpet.px - this.camera.originX;
                //    Playerpet.y = Playerpet.py - this.camera.originY;
                //    this.petFollowMachine.UpdateScenePet(Info.Id,player,Info.PartnerNo,pet);
                //}
                
                this.robotMachine.checkRobotMove(robot,Info.Id);
            }
        }

        //for (let i = 0; i < this.pets.keys.length; i++) {
        //    const key = this.pets.keys[i];
        //    const _pet = this.pets.get(key); 
        //    _pet.x = _pet.px - this.camera.originX;
        //    _pet.y = _pet.py - this.camera.originY;
        //}

        for (let i = 0; i < this.objs.keys.length; i++) {
            const key = this.objs.keys[i];
            const obj = this.objs.get(key); 
            obj.x = obj.px - this.camera.originX;
            obj.y = obj.py - this.camera.originY;
            if (obj.info != null) {
                var objInfo: AoiInfo = obj.info;
                var Info = objInfo.getInfo(RoleType.OBJ_NPC);
                var name = obj.SheetData.name;
                this.nameLayer.showName(Info.ObjId, name, obj.x, obj.y + 165);
            }
        }
        this.mapLayer.pos(- this.camera.originX, - (this.camera.originY));
        this.mapLayer.update();
        this.roleLayer.update();
        if(this.roleLayer.visible)
        {
            if(this.roleAutoMoveMachine)
            this.roleAutoMoveMachine.update();
            if(this.teamMoveMachine)
            this.teamMoveMachine.update();
            if(this.roleMoveAndActionMachine)
            this.roleMoveAndActionMachine.update();
            //if(this.petFollowMachine)
            //this.petFollowMachine.update();
        }
        if(this.chapterChallengeMachine)
        this.chapterChallengeMachine.update();

        // this.debug.pivotY = this.mapLayer.pivotY;
        // this.debug.pos(this.mapLayer.x, this.mapLayer.y);
        // this.debug.showGrid(Astar.instance.MapWidth, Astar.instance.MapHeight, Astar.instance.getGrid());
    }

    public hide(visible: boolean): void {
        super.hide(visible);
        this.localPlayer&&this.localPlayer.stopMove();
        this.roleLayer.visible = visible;
        this.nameLayer.visible = visible;
        this.commonLayer.visible = visible;
        this.roleOtherLayer.visible = visible;
    }

    protected mapClick(e: Laya.Event): void {
        super.mapClick(e);
        if(this.localPlayer == null) return;
        var local = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.get(SRoleData.instance.roleId);
        if(SRoleData.instance.info.TeamId != 0 && SRoleData.instance.info.IsLeader == 0&&(local&&local.state != RoleTeamState.MB_STATE_TEM_LEAVE))
        {
            STeamData.instance.protocol.TmpLeaveTeam();
        }
        else
        {
            var path: any = Astar.instance.find(this.localPlayer.px, this.localPlayer.py, this.mapLayer.mouseX, this.mapLayer.mouseY);
            if(!path||(path.length ==0))
            return;
            SRoleData.instance.CanAutoMove = false;
            this.localPlayer.ptachTo(path);
            this.mapLayer.showClickEffect({x:this.mapLayer.mouseX , y:this.mapLayer.mouseY});
            SRoleData.instance.event(SRoleEvent.ROLE_AUTO_MOVE_UPDATE , false);
        }
        SMachineData.instance.event(SMachineEvent.Map_Click);
    }

    public Reset():void {
        this.nameLayer.clear();
        this.roleOtherLayer.clear();
        this.commonLayer.clear();
    }

    public dispose(): void {
        super.dispose();
        this.nameLayer.clear();
        this.roleOtherLayer.clear();
        this.commonLayer.clear();
        this.roleLayer.clear();
        this.localPlayer = null;
        this.players.clear();
        this.objs.clear();
    }
}
