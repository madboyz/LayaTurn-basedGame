import { GameScene } from "../scene/GameScene";
import { SRoleData, SRoleEvent } from './../../../net/data/SRoleData';
import { S13001 } from "../../../net/pt/pt_13";
import { SAoiData, SAoiEvent } from "../../aoi/SAoiData";
import { RoleView } from "../role/RoleView";
import { Role } from "../role/Role";
import { S12003, S12001, S12002_1, S12004, S12005_1, S12006, S12011, S12017, S12018, S12016, S12015, S12015_1 } from "../../../net/pt/pt_12";
import { Astar } from "../../../framework/utils/Astar";
import { PlayerView } from "../role/PlayerView";
import { AoiControl } from "../../aoi/control/AoiControl";
import { AoiInfo } from "../../aoi/AoiInfo";
import { SGameData, SGameEvent } from "../../../net/data/SGameData";
import { SNewBattleData, SNewBattleEvent } from "../../../net/data/SNewBattleData"
import { NewBattleControl } from "./NewBattleControl";
import { SdkManager } from "../../../net/SdkManager";
import { Debug } from "../../../debug/Debug";
import { MsgManager } from "../../ui/manager/MsgManager";
import { SCopyData } from "../../../net/data/SCopyData";
import { SChaosBattleData } from "../../activity/data/SChaosBattleData";
import { SceneManager } from "../scene/SceneManager";

export class GameSceneControl extends BaseControl {
    public scene: GameScene;

    constructor() {
        super();
        this.initEvent();
        this.scene = new GameScene();
    }



    private initEvent(): void {
        SRoleData.instance.on(SRoleEvent.INIT_ROLE_DATA, this, this.initGame);
        SAoiData.instance.on(SAoiEvent.AOI_ENTER_PLAYER, this, this.onAoiEnterPlayer);
        SAoiData.instance.on(SAoiEvent.AOI_EXIT_PLAYER, this, this.onAoiExitPlayer);
        SAoiData.instance.on(SAoiEvent.AOI_ENTER_MAX_NEED_REMOVE, this, this.removePlayer);
        SAoiData.instance.on(SAoiEvent.AOI_PLAYER_MOVE, this, this.onAoiPlayerMove);


        SAoiData.instance.on(SAoiEvent.AOI_ENTER_OBJ, this, this.onAoiObjEnter);
        SAoiData.instance.on(SAoiEvent.AOI_EXIT_OBJ, this, this.onAoiObjExit);
        SAoiData.instance.on(SAoiEvent.AOI_OBJ_MOVE, this, this.onAoiObjMove);
        SAoiData.instance.on(SAoiEvent.AOI_OBJ_REMOVE, this, this.onAoiObjRemove);
        SAoiData.instance.on(SAoiEvent.AOI_OBJ_ADD, this, this.onAoiObjAdd);
        SAoiData.instance.on(SAoiEvent.AOI_ROLE_UPDATE, this, this.onAoiAttrUpdate);


        SAoiData.instance.on(SAoiEvent.AOI_GO_TO_SCENE, this, this.onRequsetChangeScene);//请求跳转场景
        SAoiData.instance.on(SAoiEvent.AOI_CHANGE_SCENE, this, this.onAoiChangeScene);

        SNewBattleData.instance.on(SNewBattleEvent.HIDE_GAME_SCENE, this, this.onHideGameScene)

        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_LEVEL, this, this.roleChangeLevel);
        SGameData.instance.on(SGameEvent.GAME_RECONNECT, this, this.onReconnect);
    }

    public excuting(data: NotityData): void {
    }

    private onHideGameScene(visible: boolean): void {
        this.scene.hide(!visible);
    }

    private onReconnect() {
        this.Reset();
        this.scene.Reset();
    }

    public hide(visible: boolean): void {
        this.scene.hide(visible);
    }

    private onRequsetChangeScene(sceneId: number, x: number = 0, y: number = 0) {
        if (SGameData.instance.PLAYFIGHTREPORT) {
            MsgManager.instance.showRollTipsMsg("战斗中无法进行该操作!");
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
        if (x == 0) {
            if (Astar.instance.TransferPoint == null)
                return;
            x = Astar.instance.TransferPoint.x;
        }

        if (y == 0) {
            if (Astar.instance.TransferPoint == null)
                return;
            y = Astar.instance.TransferPoint.y;
        }
        SceneManager.instance.AoiCtrl.RequesetChangeScene([sceneId, x, y]);
    }

    private onAoiChangeScene(data: S12011) {
        if (SRoleData.instance.info) {
            SRoleData.instance.info.X = data.NewX;
            SRoleData.instance.info.Y = data.NewY;
        }
        this.changeScene(data.NewSceneNo);
    }

    private onAoiPlayerMove(data: S12001) {

        var player = this.scene.GetAoiPlayer(data.PlayerId);
        if (player) {
            var x = data.NewX * Astar.instance.GridSize;
            var y = Astar.instance.MapHeight - data.NewY * Astar.instance.GridSize;
            var path: any = Astar.instance.find(player.px, player.py, x, y);
            player.ptachTo(path);
        }
    }

    //更新玩家aoi 20018是字符串更新 20017是整型
    /**
     * 
     * @param data 
     * @param isLocal 是否为本地玩家
     */
    private onAoiAttrUpdate(data: any, isLocal: boolean) {

        var role = null;
        if (isLocal) {
            role = this.scene.localPlayer;
        }
        else {
            switch (data.ObjType) {
                case RoleType.OBJ_PLAYER:
                    {
                        role = this.scene.GetAoiPlayer(data.ObjId);
                        break;
                    }
                default:
                    {
                        role = this.scene.GetAoiObj(data.ObjId);
                        break;
                    }
            }
        }

        if (!role)
            return;
        var info: AoiInfo = role.info as AoiInfo;
        if (info && !isLocal) {
            info.PlayerInfo = SAoiData.instance.AoiPlayers.get(data.ObjId);
        }


        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            switch (element.Key) {
                case AoiAttrCode.OI_CODE_WEAPON:
                    {
                        role.updateSkin();
                        break;
                    }

                case AoiAttrCode.OI_CODE_CLOTHES:
                    {
                        role.updateSkin();
                        break;
                    }

                case AoiAttrCode.OI_CODE_NICKNAME:
                    {
                        //更新名字？
                        break;
                    }
                case AoiAttrCode.OI_CODE_LEADER_FLAG:
                    {
                        //是否为队长
                        break;
                    }

                case AoiAttrCode.OI_CODE_TEXT_TITLE:
                    {
                        //称号文本
                        break;
                    }
                case AoiAttrCode.OI_CODE_GRAPH_TITLE:
                    {
                        //称号图片
                        this.scene.removeTitle(data.ObjId);//因为称号改变是存的玩家id所以需要先移除
                        break;
                    }
                case AoiAttrCode.OI_CODE_TEAM_ID:
                    {
                        if (element.NewValue == 0) {
                            this.scene.teamMoveMachine.RemoveTeamPlayer(data.ObjId);
                        }
                        else {

                            if (isLocal) {
                                this.scene.teamMoveMachine.LocalplayerUpdate();
                            }
                            else {
                                if (info) {
                                    var playerInfo = info.getInfo(RoleType.OBJ_PLAYER);
                                    if (playerInfo && playerInfo.TeamId == SRoleData.instance.info.TeamId && playerInfo.TeamId != 0) {
                                        this.scene.teamMoveMachine.addTeamPlayer(playerInfo, role);
                                    }
                                }
                            }
                        }
                        break;
                    }

                case AoiAttrCode.OI_CODE_TEAM_STATE:
                    {
                        if (isLocal) {
                            this.scene.teamMoveMachine.LocalplayerUpdate();
                        }
                        else {
                            if (info) {
                                var playerInfo = info.getInfo(RoleType.OBJ_PLAYER);
                                if (playerInfo != null && playerInfo.TeamId != 0 && playerInfo.TeamId == SRoleData.instance.info.TeamId) {
                                    this.scene.teamMoveMachine.addTeamPlayer(playerInfo, role);
                                }
                            }
                        }

                        break;
                    }

                case AoiAttrCode.OI_CODE_UEER_DEF_TITLE:
                    {
                        //自定义称号
                        break;
                    }
                case AoiAttrCode.OI_CODE_AEROCRAFT:
                    {
                        if (element.NewValue != 0) {
                            role.isFly = true;
                        }
                        else {
                            role.isFly = false;
                        }
                        role.updateMount(element.NewValue);
                        break;
                    }
                case AoiAttrCode.OI_CODE_BHV_STATE:
                    {
                        if (element.NewValue != 2) {

                        }
                        else {

                        }
                        break;
                    }
            }
        }
    }



    private onAoiEnterPlayer(data: S12002_1) {
        var player = this.scene.addRoleToLayer(data);
        if (data.TeamId != 0 && data.TeamId == SRoleData.instance.info.TeamId) {
            if (data.Id == data.LeaderId) {
                if (data.TeamPos == 0) {
                    data.TeamPos = 1;
                }
                data.IsLeader = 1;
            }
            this.scene.teamMoveMachine.addTeamPlayer(data, player);
        }

    }

    private onAoiExitPlayer(data: S12003) {
        for (let i = 0; i < data.item_1.length; i++) {
            const uuid = data.item_1[i].PlayerId;
            this.removePlayer(uuid);
        }
    }

    private removePlayer(uuid) {
        this.scene.removeRoleToLayer(uuid);
        this.scene.teamMoveMachine.RemoveTeamPlayer(uuid);
    }

    private onAoiObjMove(data: S12004) {
        var obj = this.scene.GetAoiObj(data.ObjId);
        if (obj) {
            var x = data.NewX * Astar.instance.GridSize;
            var y = Astar.instance.MapHeight - data.NewY * Astar.instance.GridSize;
            var path: any = Astar.instance.find(obj.px, obj.py, x, y);
            obj.ptachTo(path);
        }
    }

    private onAoiObjEnter(data: S12005_1) {
        this.scene.addObjToLayer(data);
    }

    private onAoiObjAdd(data: S12015_1) {
        this.scene.addObjToLayer(data);
    }

    private onAoiObjRemove(data: S12016) {
        this.scene.removeObjToLayer(data.ObjId);
    }

    private onAoiObjExit(data: S12006) {
        for (let i = 0; i < data.item_1.length; i++) {
            const uuid = data.item_1[i].ObjId;
            this.scene.removeObjToLayer(uuid);
        }
    }

    private initGame(data: S13001) {
        //断线重连的flag
        SNewBattleData.instance.isInitLogin = true;
        SRoleData.instance.info.initInfo(data);
        UIManager.instance.openUI(UIID.HUD_MAIN);
        SRoleData.instance.NewCreateRoleTime = data.TimeStamp;
        SdkManager.instance.SendLoginEvent();
        return new Promise(async (resolve) => {
            await this.scene.changeScene(data.SceneNo);
            SGameData.instance.hasInitSence();
            SGameData.instance.EnterScene = true;
            SGameData.instance.isReConnected = false;
            SGameData.instance.PlayMusic(false);
            
            //断线重连的flag
            if(SNewBattleData.instance.isInitLogin)
            {
                SNewBattleData.instance.isInitLogin = false;
                SNewBattleData.instance.protocol.send20052();
            }
            resolve(true);
        });
    }

    public Reset() {
        for (let i = 0; i < SAoiData.instance.AoiPlayers.keys.length; i++) {
            const key = SAoiData.instance.AoiPlayers.keys[i];
            this.scene.removeRoleToLayer(key);
            this.scene.teamMoveMachine.RemoveTeamPlayer(key);
        }

        for (let i = 0; i < SAoiData.instance.AoiObjs.keys.length; i++) {
            const key = SAoiData.instance.AoiObjs.keys[i];
            this.scene.removeObjToLayer(key);
        }
        SAoiData.instance.AoiObjs.clear();
        SAoiData.instance.AoiPlayers.clear();
        //this.scene.hideAll(true);

    }


    public changeScene(sceneId: number): void {
        Debug.serverLog(`change scene ${sceneId}`);
        if (sceneId != this.scene.mapId) {
            for (let i = 0; i < SAoiData.instance.AoiPlayers.keys.length; i++) {
                const key = SAoiData.instance.AoiPlayers.keys[i];
                this.scene.removeRoleToLayer(key);
                this.scene.teamMoveMachine.RemoveTeamPlayer(key);
            }

            for (let i = 0; i < SAoiData.instance.AoiObjs.keys.length; i++) {
                const key = SAoiData.instance.AoiObjs.keys[i];
                this.scene.removeObjToLayer(key);
            }
            SAoiData.instance.AoiObjs.clear();
            SAoiData.instance.AoiPlayers.clear();
            this.scene.Reset();
        }
        this.scene.changeScene(sceneId);
        // this.scene.changeScene(1001);//测试用
    }

    //任务升级时候
    public roleChangeLevel(): void {
        this.scene.needLvUpEff = true;
    }

}