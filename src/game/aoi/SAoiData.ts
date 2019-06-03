import { S12002, S12004, S12003, S12001, S12005, S12006, S12011, S12017, S12018, S12002_1, S12016, S12015 } from "../../net/pt/pt_12";
import { DataManager } from "../../message/manager/DataManager";
import { PlayerView } from "../battle/role/PlayerView";
import { AoiInfo } from "./AoiInfo";
import { SRoleData, SRoleEvent } from "../../net/data/SRoleData";
import { STeamData } from "../team/STeamData";
import { RoleTeamState } from "../team/TeamInfo";
import { SMountData } from "../../net/data/SmountData";
import { S32050 } from "../../net/pt/pt_32";
import { MsgManager } from "../ui/manager/MsgManager";
import { CommonControl } from "../common/control/CommonControl";

/**
 * aoi数据层
 */
export class SAoiData extends Laya.EventDispatcher {
    private static _instance: SAoiData;
    public AoiPlayers: Laya.Dictionary = new Laya.Dictionary();
    public AoiObjs: Laya.Dictionary = new Laya.Dictionary();
    public static get instance(): SAoiData {
        return SAoiData._instance || (SAoiData._instance = new SAoiData());
    }

    constructor() {
        super();
    }
    public unRegisterEvent() {
        this.AoiPlayers.clear();
        this.AoiObjs.clear();
        DataManager.cancel(PROTOCOL.E12001, this, this.onS12001);
        DataManager.cancel(PROTOCOL.E12002, this, this.onS12002);
        DataManager.cancel(PROTOCOL.E12003, this, this.onS12003);
        DataManager.cancel(PROTOCOL.E12004, this, this.onS12004);//通知场景玩家：对象（怪物或可移动NPC）走动
        DataManager.cancel(PROTOCOL.E12005, this, this.onS12005);//通知场景玩家：有对象（怪物或可移动NPC）进入了我的AOI
        DataManager.cancel(PROTOCOL.E12006, this, this.onS12006);//通知场景玩家：有对象（怪物或可移动NPC）离开了我的AOI（主动或者被动离开）
        DataManager.cancel(PROTOCOL.E12016, this, this.onS12016);
        DataManager.cancel(PROTOCOL.E12015, this, this.onS12015);
        DataManager.cancel(PROTOCOL.E12011, this, this.onS12011);
        DataManager.cancel(PROTOCOL.E12017, this, this.upDateAttr);//宏属性更新
        DataManager.cancel(PROTOCOL.E12018, this, this.upDateAttr);//宏属性更新字符串更新
        DataManager.cancel(PROTOCOL.E32050, this, this.onS32050);//点击明雷怪反馈
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E12001, this, this.onS12001);
        DataManager.listen(PROTOCOL.E12002, this, this.onS12002);
        DataManager.listen(PROTOCOL.E12003, this, this.onS12003);
        DataManager.listen(PROTOCOL.E12004, this, this.onS12004);//通知场景玩家：对象（怪物或可移动NPC）走动
        DataManager.listen(PROTOCOL.E12005, this, this.onS12005);//通知场景玩家：有对象（怪物或可移动NPC）进入了我的AOI
        DataManager.listen(PROTOCOL.E12006, this, this.onS12006);//通知场景玩家：有对象（怪物或可移动NPC）离开了我的AOI（主动或者被动离开）
        DataManager.listen(PROTOCOL.E12015, this, this.onS12015);
        DataManager.listen(PROTOCOL.E12016, this, this.onS12016);
        DataManager.listen(PROTOCOL.E12011, this, this.onS12011);
        DataManager.listen(PROTOCOL.E12017, this, this.upDateAttr);//宏属性更新
        DataManager.listen(PROTOCOL.E12018, this, this.upDateAttr);//宏属性更新字符串更新
        DataManager.listen(PROTOCOL.E32050, this, this.onS32050);//点击明雷怪反馈
    }

    private onS32050(data: S32050) {
        if (data.RetCode == 0) {
            CommonControl.instance.gotoFightSceneObj(data.MonId);
        }
        switch (data.RetCode) {
            case 1:
                MsgManager.instance.showRollTipsMsg("未知错误!");
                break;
            case 2:
                MsgManager.instance.showRollTipsMsg("等级不够!");
                break;
            case 3:
                MsgManager.instance.showRollTipsMsg("没有接取指定的任务!");
                break;
            case 4:
                MsgManager.instance.showRollTipsMsg("不符合：需要已经接取指定任务列表中的任意一个任务!");
                break;
            case 5:
                MsgManager.instance.showRollTipsMsg("不符合：队伍中所有非暂离的队员都有未完成的指定id的任务!");
                break;
            case 6:
                MsgManager.instance.showRollTipsMsg("在队伍中但不是队长，操作无效!");
                break;
            case 7:
                MsgManager.instance.showRollTipsMsg("明雷怪并不属于你!");
                break;
            case 8:
                MsgManager.instance.showRollTipsMsg("在队伍中，操作无效!");
                break;
            case 9:
                MsgManager.instance.showRollTipsMsg("不在队伍中，操作无效!");
                break;
            case 10:
                MsgManager.instance.showRollTipsMsg("队伍中非暂离（在队）的人数不够!");
                break;
            case 11:
                MsgManager.instance.showRollTipsMsg("队伍中非暂离（在队）并且有未完成的指定id的任务的队员的人数不够!");
                break;
            case 12:
                MsgManager.instance.showRollTipsMsg(`角色达到${data.item_1[0].Condition}级可挑战`);
                break;
            case 13:
                MsgManager.instance.showRollTipsMsg("队员等级不适合!");
                break;
            case 14:
                MsgManager.instance.showRollTipsMsg("怪物不存在!");
                break;
            case 20:
                MsgManager.instance.showRollTipsMsg("怪物已经在战斗中!");
                break;
            case 21:
                MsgManager.instance.showRollTipsMsg("怪物已过期，操作无效!");
                break;
        }
    }

    private onS12001(data: S12001): void {
        //如果aoi的玩家队伍id跟我一样并且他不是队长而且也没有暂离状态就不同步消息
        var player: S12002_1 = this.AoiPlayers.get(data.PlayerId);
        if (!player) {
            return;//本地玩家
        }
        else {
            if (player.TeamId != 0 && player.IsLeader == 0 && player.TeamPos > 0 && SRoleData.instance.info.TeamId == player.TeamId) {
                return;
            }
            player.X = data.NewX;
            player.Y = data.NewY;
        }
        this.event(SAoiEvent.AOI_PLAYER_MOVE, data);
    }

    /**
     *  通知场景玩家：有玩家进入了我的AOI
     * @param data 
     */
    private onS12002(data: S12002): void {
        //如果aoi数量到了上限处理当前缓存中数据优先处理同一个队伍的人
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            if (this.AoiPlayers.values.length >= GameConfig.GAME_AOI_MAX_COUNT) {
                if (element.TeamId != 0) {
                    //先查找不是队伍的人
                    var PlayerId = 0;
                    for (let j = 0; j < this.AoiPlayers.values.length; j++) {
                        const element: S12002_1 = this.AoiPlayers.values[j];
                        if (element.TeamId == 0) {
                            PlayerId = element.Id;
                            break;
                        }
                    }
                    if (PlayerId == 0) {
                        //再查找跟我不是队伍并且不是队长的人
                        for (let j = 0; j < this.AoiPlayers.values.length; j++) {
                            const element: S12002_1 = this.AoiPlayers.values[j];
                            if (element.TeamId != SRoleData.instance.info.TeamId && element.IsLeader == 0) {
                                PlayerId = element.Id;
                                break;
                            }
                        }
                    }
                    this.AoiPlayers.remove(PlayerId);
                    this.event(SAoiEvent.AOI_ENTER_MAX_NEED_REMOVE, PlayerId);
                }
                else {
                    continue;
                }
            }
            if (element.Id != SRoleData.instance.roleId) {
                var player = this.AoiPlayers.get(element.Id);
                if (player) {
                    player = element;
                }
                else {
                    this.AoiPlayers.set(element.Id, element);
                }
                this.event(SAoiEvent.AOI_ENTER_PLAYER, element);
            }


        }

    }

    /**
     * aoi离开
     * @param data 
     */
    private onS12003(data: S12003): void {
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            const player: S12002_1 = this.AoiPlayers.get(element.PlayerId);
            if (player) {
                if (player.IsLeader == 1 && player.TeamId == SRoleData.instance.info.TeamId && player.TeamId) {
                    var local = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.get(SRoleData.instance.roleId);
                    if (SRoleData.instance.info.IsLeader == 0 && (local && local.state == RoleTeamState.MB_STATE_IN)) {
                        STeamData.instance.protocol.RequestLeaderPos();
                    }
                }
                this.AoiPlayers.remove(element.PlayerId);
            }

        }
        this.event(SAoiEvent.AOI_EXIT_PLAYER, data);
    }
    /**
     *  通知场景玩家：对象（怪物或可移动NPC）走动
     * @param data 
     */
    private onS12004(data: S12004): void {
        this.event(SAoiEvent.AOI_OBJ_MOVE, data);
    }

    private onS12005(data: S12005): void {
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var obj = this.AoiObjs.get(element.ObjId);
            if (obj) {
                obj = element;
            }
            else {
                this.AoiObjs.set(element.ObjId, element);
            }
            this.event(SAoiEvent.AOI_ENTER_OBJ, element);
        }

    }

    private onS12015(data: S12015): void {
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var obj = this.AoiObjs.get(element.ObjId);
            if (obj) {
                obj = element;
            }
            else {
                this.AoiObjs.set(element.ObjId, element);
            }
            this.event(SAoiEvent.AOI_OBJ_ADD, element);
        }
    }

    private onS12016(data: S12016): void {
        this.AoiObjs.remove(data.ObjId);
        this.event(SAoiEvent.AOI_OBJ_REMOVE, data);
    }

    private onS12006(data: S12006): void {
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            this.AoiObjs.remove(element.ObjId);
        }
        this.event(SAoiEvent.AOI_EXIT_OBJ, data);
    }

    private onS12011(data: S12011): void {

        SRoleData.instance.info.SceneNo = data.NewSceneNo;
        SRoleData.instance.info.SceneId = data.NewSceneId;
        this.event(SAoiEvent.AOI_CHANGE_SCENE, data);
    }

    private upDateAttr(data: any): void {
        if (data.ObjId == SRoleData.instance.roleId) {
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                switch (element.Key) {
                    case AoiAttrCode.OI_CODE_WEAPON:
                        {

                            SRoleData.instance.info.Weapon = element.NewValue;
                            break;
                        }
                    case AoiAttrCode.OI_CODE_CLOTHES:
                        {
                            SRoleData.instance.info.Clothes = element.NewValue;
                            break;
                        }
                    case AoiAttrCode.OI_CODE_TEXT_TITLE:
                        {
                            SRoleData.instance.info.TextTitle = element.NewValue;

                            break;
                        }
                    case AoiAttrCode.OI_CODE_GRAPH_TITLE:
                        {
                            SRoleData.instance.info.GraphTitle = element.NewValue;
                            SRoleData.instance.event(SRoleEvent.ROLE_TITLE_UPDATE);
                            break;
                        }
                    case AoiAttrCode.OI_CODE_NICKNAME:
                        {
                            SRoleData.instance.roleInfo.Name = element.NewValue;
                            break;
                        }
                    case AoiAttrCode.OI_CODE_UEER_DEF_TITLE:
                        {
                            SRoleData.instance.info.UserDefTitle = element.NewValue;
                            break;
                        }
                    case AoiAttrCode.OI_CODE_AEROCRAFT:
                        {
                            SMountData.instance.curInfo.ShowNo = element.NewValue;
                            break;
                        }
                    case AoiAttrCode.OI_CODE_TEAM_ID:
                        {
                            SRoleData.instance.info.TeamId = element.NewValue;
                            break;
                        }
                    case AoiAttrCode.OI_CODE_LV:
                        {
                            SRoleData.instance.info.Lv = element.NewValue;
                            break;
                        }
                    case AoiAttrCode.OI_CODE_LEADER_FLAG:
                        {
                            SRoleData.instance.info.IsLeader = element.NewValue;
                            var local = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.get(SRoleData.instance.roleId);
                            if (local) {
                                local.leader = element.NewValue == 1 ? true : false;
                            }
                            break;
                        }
                    case AoiAttrCode.OI_CODE_TEAM_STATE:
                        {
                            var local = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.get(SRoleData.instance.roleId);
                            if (local) {
                                local.trainPos = element.NewValue;
                                local.state = element.NewValue == 0 ? RoleTeamState.MB_STATE_TEM_LEAVE : RoleTeamState.MB_STATE_IN;
                            }
                            else {

                            }
                            break;
                        }
                }
            }
            this.event(SAoiEvent.AOI_ROLE_UPDATE, [data, true]);
        }
        else {
            var player: S12002_1 = this.AoiPlayers.get(data.ObjId);
            if (!player)
                return;
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                this.onAttrUpdate(element, player, data.ObjId);
            }
            this.event(SAoiEvent.AOI_ROLE_UPDATE, [data, false]);
        }
    }

    private onAttrUpdate(element: any, player: S12002_1, playerId: number) {
        switch (element.Key) {
            case AoiAttrCode.OI_CODE_WEAPON:
                {
                    player.Weapon = element.NewValue;
                    break;
                }
            case AoiAttrCode.OI_CODE_CLOTHES:
                {
                    player.Clothes = element.NewValue;
                    break;
                }
            case AoiAttrCode.OI_CODE_TEXT_TITLE:
                {
                    player.TextTitle = element.NewValue;

                    break;
                }
            case AoiAttrCode.OI_CODE_GRAPH_TITLE:
                {
                    player.GraphTitle = element.NewValue;
                    break;
                }
            case AoiAttrCode.OI_CODE_NICKNAME:
                {
                    player.PlayerName = element.NewValue;
                    break;
                }
            case AoiAttrCode.OI_CODE_UEER_DEF_TITLE:
                {
                    player.UserDefTitle = element.NewValue;
                    break;
                }
            case AoiAttrCode.OI_CODE_AEROCRAFT:
                {
                    player.AerocraftNo = element.NewValue;
                    break;
                }
            case AoiAttrCode.OI_CODE_TEAM_ID:
                {
                    player.TeamId = element.NewValue;
                    break;
                }
            case AoiAttrCode.OI_CODE_LV:
                {
                    player.Lv = element.NewValue;
                    break;
                }
            case AoiAttrCode.OI_CODE_LEADER_FLAG:
                {
                    player.IsLeader = element.NewValue;
                    var teamRole = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.get(playerId);
                    if (teamRole) {
                        teamRole.leader = element.NewValue == 1 ? true : false;
                    }
                    break;
                }
            case AoiAttrCode.OI_CODE_TEAM_STATE:
                {
                    player.TeamPos = element.NewValue;
                    var teamRole = STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.get(playerId);
                    if (teamRole) {
                        teamRole.trainPos = element.NewValue;
                        teamRole.state = element.NewValue == 0 ? RoleTeamState.MB_STATE_TEM_LEAVE : RoleTeamState.MB_STATE_IN;
                    }
                    break;
                }

            case AoiAttrCode.OI_CODE_BHV_STATE:
                {
                    ////OI_CODE_BHV_STATE 状态 0空闲状态 2战斗状态 其他
                    player.BhvState = element.NewValue;
                    break;
                }
        }
    }
}

export enum SAoiEvent {
    LOCAL_PLAYER_REQUEST_MOVE = "local_player_request_move",//请求移动
    AOI_REQUSET_INFO = "aoi_request_inof",//请求aoi信息（在切换场景的时候请求）
    AOI_REQUSET_TELEPORTBYNO = "aoi_request_teleportByNo",//通过编号请求aoi传送
    AOI_PLAYER_MOVE = "aoi_player_move",//aoi玩家移动（包含玩家自己）
    AOI_ENTER_PLAYER = "aoi_enter_player",//通知有玩家进来
    AOI_EXIT_PLAYER = "aoi_exit_player",//通知有玩家离开
    AOI_ENTER_OBJ = "aoi_enter_obj",//通知场景玩家：有对象（怪物或可移动NPC）进入了我的AOI
    AOI_EXIT_OBJ = "aoi_exit_obj",//通知场景玩家：有对象（怪物或可移动NPC）离开了我的AOI（主动或者被动离开）
    AOI_OBJ_MOVE = "aoi_obj_move",//通知场景玩家：对象（怪物或可移动NPC）走动 
    AOI_OBJ_REMOVE = "aoi_obj_remove",//移除obj
    AOI_OBJ_ADD = "aoi_obj_add",//移除obj
    AOI_GO_TO_SCENE = "aoi_go_to_scene",//请求直接传送到目标位置
    AOI_CHANGE_SCENE = "aoi_change_scene",//跳转场景
    AOI_ROLE_UPDATE = "aoi_role_update",//aoi玩家更新
    AOI_ENTER_MAX_NEED_REMOVE = "aoi_enter_max_need_remove",//aoi超过上线了需要移除aoi
}