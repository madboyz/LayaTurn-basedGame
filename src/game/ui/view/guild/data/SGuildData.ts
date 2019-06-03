import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { FbVo } from "../../../../../db/sheet/vo/FbVo";
import { DataManager } from "../../../../../message/manager/DataManager";
import { SCopyData } from "../../../../../net/data/SCopyData";
import { SGameData } from "../../../../../net/data/SGameData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { S40001, S40004, S40007, S40008, S40010, S40011, S40012, S40013, S40014, S40016, S40017, S40019, S40023, S40037, S40038, S40062 } from "../../../../../net/pt/pt_40";
import { S57101, S57102, S57105 } from "../../../../../net/pt/pt_57";
import { SChaosBattleData } from "../../../../activity/data/SChaosBattleData";
import { SAoiData, SAoiEvent } from "../../../../aoi/SAoiData";
import { CommonControl } from "../../../../common/control/CommonControl";
import { GameUtils } from "../../../../utils/GameUtils";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { FucManager } from "../../../manager/FucManager";
import { MsgManager } from "../../../manager/MsgManager";
import { GuildProtocol } from "../protocol/GuildProtocol";

export class SGuildData extends Laya.EventDispatcher {
    private static _instance: SGuildData;
    public protocol: GuildProtocol;

    public static get instance(): SGuildData {
        return SGuildData._instance || (SGuildData._instance = new SGuildData());
    }
    constructor() {
        super();
        this.protocol = new GuildProtocol;
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E40001, this, this.on40001);
        DataManager.cancel(PROTOCOL.E40017, this, this.on40017);
        DataManager.cancel(PROTOCOL.E40012, this, this.on40012);//联盟信息
        DataManager.cancel(PROTOCOL.E40016, this, this.on40016);//职位信息
        DataManager.cancel(PROTOCOL.E40013, this, this.on40013);//公告
        DataManager.cancel(PROTOCOL.E40011, this, this.on40011);//申请列表
        DataManager.cancel(PROTOCOL.E40004, this, this.on40004);//申请列表处理
        DataManager.cancel(PROTOCOL.E40010, this, this.on40010);//成员列表
        DataManager.cancel(PROTOCOL.E40008, this, this.on40008);//退出帮会
        DataManager.cancel(PROTOCOL.E40007, this, this.on40007);//踢出别人
        DataManager.cancel(PROTOCOL.E40014, this, this.on40014);//修改别人职位
        DataManager.cancel(PROTOCOL.E40019, this, this.on40019);//同意入帮
        DataManager.cancel(PROTOCOL.E40023, this, this.on40023);//被剔除帮会
        DataManager.cancel(PROTOCOL.E40038, this, this.on40038);//通知有人申请
        DataManager.cancel(PROTOCOL.E40062, this, this.on40062);//申请状态改变
        DataManager.cancel(PROTOCOL.E40037, this, this.on40037);//捐献数据
        DataManager.cancel(PROTOCOL.E57101, this, this.on57101);//帮派BOSS
        DataManager.cancel(PROTOCOL.E57102, this, this.on57102);//帮派BOSS
        DataManager.cancel(PROTOCOL.E57105, this, this.on57105);//帮派BOSS翻牌

        this.off(SGuildEvent.GUILD_ID_INFO_CHANGE, this, this.GuildIdChange);
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E40001, this, this.on40001);
        DataManager.listen(PROTOCOL.E40017, this, this.on40017);
        DataManager.listen(PROTOCOL.E40012, this, this.on40012);//联盟信息
        DataManager.listen(PROTOCOL.E40016, this, this.on40016);//职位信息
        DataManager.listen(PROTOCOL.E40013, this, this.on40013);//公告
        DataManager.listen(PROTOCOL.E40011, this, this.on40011);//申请列表
        DataManager.listen(PROTOCOL.E40004, this, this.on40004);//申请列表处理
        DataManager.listen(PROTOCOL.E40010, this, this.on40010);//成员列表
        DataManager.listen(PROTOCOL.E40008, this, this.on40008);//退出帮会
        DataManager.listen(PROTOCOL.E40007, this, this.on40007);//踢出别人
        DataManager.listen(PROTOCOL.E40014, this, this.on40014);//修改别人职位
        DataManager.listen(PROTOCOL.E40019, this, this.on40019);//同意入帮
        DataManager.listen(PROTOCOL.E40023, this, this.on40023);//被剔除帮会
        DataManager.listen(PROTOCOL.E40038, this, this.on40038);//通知有人申请
        DataManager.listen(PROTOCOL.E40062, this, this.on40062);//申请状态改变
        DataManager.listen(PROTOCOL.E40037, this, this.on40037);//捐献数据
        DataManager.listen(PROTOCOL.E57101, this, this.on57101);//帮派BOSS
        DataManager.listen(PROTOCOL.E57102, this, this.on57102);//帮派BOSS
        DataManager.listen(PROTOCOL.E57105, this, this.on57105);//帮派BOSS翻牌

        this.on(SGuildEvent.GUILD_ID_INFO_CHANGE, this, this.GuildIdChange);
    }

    //判断相关============================================================
    public checkOpenGuildPanel(): void {
        var openFuc: FucManager = UIManager.instance.fuc;
        if (openFuc && !openFuc.isOpen(UIID.SYS_GUILD)) {
            return;
        }
        if (SRoleData.instance.info.GuildId > 0) {
            UIManager.instance.openUI(UIID.GUILD_MAIN_PANEL);
        } else {
            UIManager.instance.openUI(UIID.GUILD_LIST_PANEL);
        }
    }

    public gotoGuildPlace(): void {
        if (SRoleData.instance.info.GuildId == 0) {
            MsgManager.instance.showRollTipsMsg("请先加入或创建一个帮派");
            return;
        }
        if (SGameData.instance.PLAYFIGHTREPORT) {
            MsgManager.instance.showRollTipsMsg("战斗中无法切换场景");
            return;
        }
        if (SRoleData.instance.info.TeamId != 0) {
            MsgManager.instance.showRollTipsMsg("组队中无法进行该操作");
            return;
        }
        if (SChaosBattleData.instance.isChaoScene()) {
            MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            return;
        }
        if (SCopyData.instance.isInCopy) {
            MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            return;
        }
        //前往帮派
        var transferId = ConstVo.get("GUILD_SCENE_TRANSFER").val;
        SAoiData.instance.event(SAoiEvent.AOI_REQUSET_TELEPORTBYNO, transferId);
    }

    public isGuildScene(): boolean {
        var InGuildScene = false;
        var guildSceneId = ConstVo.get("GUILD_SCENE").val
        if (SRoleData.instance.info.SceneNo == guildSceneId) {
            InGuildScene = true;
        }
        return InGuildScene;
    }

    private GuildIdChange(): void {
        CommonControl.instance.send40055();//查看帮派技能
        this.protocol.requsetGuildBossInfos();//查看BOSS战斗
    }

    //协议数据相关=====================================================
    private on40001(data: S40001) {
        SRoleData.instance.info.GuildId = data.GuildId;
        UIManager.instance.closeUI(UIID.GUILD_LIST_PANEL);
        this.checkOpenGuildPanel();
        this.event(SGuildEvent.GUILD_ID_INFO_CHANGE);
    }

    public guildList: S40017;
    private on40017(data: S40017) {
        this.guildList = data;
        this.event(SGuildEvent.ANS_GUILD_LIST);
    }

    public myGuildData: S40012;
    private on40012(data: S40012) {
        if (data.GuildId == SRoleData.instance.info.GuildId) {
            this.myGuildData = data;
            this.event(SGuildEvent.ANS_GUILD_INFO);
        }
    }

    public myGuildPosition: S40016;
    private on40016(data: S40016) {
        this.myGuildPosition = data;
        this.event(SGuildEvent.ANS_GUILD_INFO);
    }

    private on40013(data: S40013) {
        if (data.RetCode == 0) {
            this.event(SGuildEvent.ANS_GUILD_CHANGE_NOTICE);
        }
    }

    public applyList: S40011;
    private on40011(data: S40011) {
        this.applyList = data;
        this.event(SGuildEvent.ANS_GUILD_MANAGELIST);
    }

    public tempApplyPlayerId: number;
    private on40004(data: S40004) {
        if ((data.Choise == 0 || data.Choise == 1) && this.applyList && data.RetCode == 0) {
            for (let i = this.applyList.item_1.length - 1; i >= 0; i--) {
                var ele = this.applyList.item_1[i];
                if (ele.PlayerId == data.PlayerId) {
                    this.applyList.item_1.splice(i, 1);
                    break;
                }
            }
        } else if ((data.Choise == 2 || data.Choise == 3) && this.applyList && data.RetCode == 0) {
            this.applyList.item_1.length = 0;
        } else if (data.Choise == 1 && data.RetCode == 1) {
            SGuildData.instance.event(SGuildEvent.ASK_REJECT_JOIN_GUILD, data.PlayerId);
        }
        this.event(SGuildEvent.ANS_JOIN_GUID);
    }

    public menberList: S40010;
    private on40010(data: S40010) {
        this.menberList = data;
        this.event(SGuildEvent.ANS_GUILD_MENBERLIST);
    }

    private on40008(data: S40008) {
        if (data.RetCode == 0) {
            SRoleData.instance.info.GuildId = 0;
            this.event(SGuildEvent.ANS_EXIT_GUILD);
            this.event(SGuildEvent.GUILD_ID_INFO_CHANGE);
        }
    }

    private on40007(data: S40007) {
        if (!this.menberList) {
            return;
        }
        for (let i = this.menberList.item_1.length - 1; i >= 0; i--) {
            var person = this.menberList.item_1[i];
            if (person.PlayerId == data.PlayerId) {
                this.menberList.item_1.splice(i, 1);
                break;
            }
        }
        this.event(SGuildEvent.ANS_OTHER_EXIT_GUILD);
    }

    private on40014(data: S40014) {
        if (!this.menberList) {
            return;
        }
        for (let i = this.menberList.item_1.length - 1; i >= 0; i--) {
            var person = this.menberList.item_1[i];
            if (person.PlayerId == data.PlayerId) {
                person.Position = data.Position;
                MsgManager.instance.showRollTipsMsg("任命成功");
                break;
            }
        }
        this.event(SGuildEvent.ANS_GUILD_POSITION_CHANGE);
    }

    private on40019(data: S40019) {
        //只处理自己，进入工会
        if (data.PlayerName != SRoleData.instance.roleName) {
            return;
        }
        SRoleData.instance.info.GuildId = data.GuildId;
        MsgManager.instance.showRollTipsMsg("你通过了帮派：" + HtmlUtils.addColor(data.GuildName, "#00b007", 20) + "的加入申请");
        UIManager.instance.closeUI(UIID.GUILD_LIST_PANEL);
        this.event(SGuildEvent.GUILD_ID_INFO_CHANGE);
    }

    private on40023(data: S40023) {
        //只处理自己，被踢出工会
        if (data.OpedName != SRoleData.instance.roleName) {
            return;
        }
        SRoleData.instance.info.GuildId = 0;
        this.myGuildData = null;
        this.myGuildPosition = null;

        MsgManager.instance.showRollTipsMsg("你被" + HtmlUtils.addColor(data.OpName, "#00b007", 20) + "请离了帮派");
        UIManager.instance.closeUI(UIID.GUILD_MAIN_PANEL);
        this.event(SGuildEvent.GUILD_ID_INFO_CHANGE);
    }

    public haveApply = false;
    private on40038(data: S40038) {
        //有人申请进入帮派
        this.haveApply = true;
    }

    private on40062(data: S40062) {
        this.myGuildData.HandleApplyState = data.HandleApplyState;
        this.event(SGuildEvent.ANS_GUILD_INFO);
    }

    public contriData: S40037
    private on40037(data: S40037) {
        this.contriData = data;
        this.event(SGuildEvent.REFRESH_CONTRI_DATA);
    }

    //帮派BOSS相关数据
    public guildBossInfos: Laya.Dictionary = new Laya.Dictionary;
    private on57102(data: S57102) {
        if (data.item_2.length > 0) {
            var checkData = data.item_2[0];
            var cfg = FbVo.get(checkData.dun_no);
            if (cfg.type != CopyType.GUILD_BOSS) {
                return;
            }
        }
        for (let i = 0; i < data.item_2.length; i++) {
            const element = data.item_2[i];
            var info = this.guildBossInfos.get(element.dun_no);
            if (!info) {
                info = {};
                this.guildBossInfos.set(element.dun_no, info);
            }
            info.dun_no = element.dun_no;
            info.state = element.state;
            info.join_num = element.join_num;
            info.max_hp = element.max_hp;
            info.cur_hp = element.cur_hp;
            info.draw_state = element.draw_state;
            info.draw_times = element.draw_times;
            if (GameUtils.TimeStamp >= element.reborn_time) {
                info.reborn_time = 0;
            }
            else {
                info.reborn_time = element.reborn_time;
            }

        }
        this.event(SGuildEvent.GUILD_BOSS_INFO_UPDATE);
    }

    private on57101(data: S57101) {
        var cfg = FbVo.get(data.DunNo);
        if (cfg.type != CopyType.GUILD_BOSS) {
            return;
        }
        var info = this.guildBossInfos.get(data.DunNo);
        if (!info) {
            info = {}
            this.guildBossInfos.set(data.DunNo, info);
        }
        info.max_hp = data.maxHp;
        info.cur_hp = data.curHp;
        info.dun_no = data.DunNo;
        this.event(SGuildEvent.GUILD_BOSS_INFO_UPDATE);
    }

    private on57105(data: S57105) {
        var info = this.guildBossInfos.get(data.DunNo);
        if (!info) {
            info = {}
            this.guildBossInfos.set(data.DunNo, info);
        }
        info.draw_times += 1;
        info.dun_no = data.DunNo;
        info.draw_state = 1;
        this.event(SGuildEvent.GUILD_BOSS_CARD_UPDATE, [data]);
    }

    public getCardTimes(): number {
        var totalTime = 0;
        var list = this.guildBossInfos.values;
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            totalTime += element.draw_times;
        }
        return totalTime;
    }




}


export enum SGuildEvent {
    GUILD_ID_INFO_CHANGE = "GUILD_ID_INFO_CHANGE",//联盟ID信息发生改变

    ASK_GUILD_LIST = "ASK_GUILD_LIST",//联盟列表
    ANS_GUILD_LIST = "ANS_GUILD_LIST",
    ASK_CREAT_GUILD = "ASK_CREAT_GUILD",//创建联盟
    ANS_CREAT_GUILD = "ANS_CREAT_GUILD",
    ASK_JOIN_GUILD = "ASK_JOIN_GUILD",//申请加入联盟
    ASK_HOlE_GUILD_INFO = "ASK_HOlE_GUILD_INFO",//联盟的完整信息
    ANS_GUILD_INFO = "ANS_GUILD_INFO",
    ASK_GUILD_CHANGE_NOTICE = "ASK_GUILD_CHANGE_NOTICE",//修改公告
    ANS_GUILD_CHANGE_NOTICE = "ANS_GUILD_CHANGE_NOTICE",
    ASK_GUILD_MANAGELIST = "ASK_GUILD_MANAGELIST",//请求管理列表
    ANS_GUILD_MANAGELIST = "ANS_GUILD_MANAGELIST",
    ASK_ALLOW_JOIN_GUILD = "ASK_ALLOW_JOIN_GUILD",//同意加入联盟
    ASK_REJECT_JOIN_GUILD = "ASK_REJECT_JOIN_GUILD",//拒绝加入联盟
    ASK_REJECT_ALL_JOIN_GUILD = "ASK_REJECT_ALL_JOIN_GUILD",//拒绝所有加入联盟
    ANS_JOIN_GUID = "ANS_JOIN_GUID",//处理申请人回复
    ASK_GUILD_MENBERLIST = "ASK_GUILD_MENBERLIST",//请求成员列表
    ANS_GUILD_MENBERLIST = "ANS_GUILD_MENBERLIST",
    ASK_EXIT_GUILD = "ASK_EXIT_GUILD",//请求退出帮派
    ANS_EXIT_GUILD = "ANS_EXIT_GUILD",
    ASK_OTHER_EXIT_GUILD = "ASK_OTHER_EXIT_GUILD",//将别人剔除帮派
    ANS_OTHER_EXIT_GUILD = "ANS_OTHER_EXIT_GUILD",
    ASK_GUILD_POSITION_CHANGE = "ASK_GUILD_POSITION_CHANGE",//帮派职位变化
    ANS_GUILD_POSITION_CHANGE = "ANS_GUILD_POSITION_CHANGE",
    REFRESH_CONTRI_DATA = "REFRESH_CONTRI_DATA",//刷新捐献的数据
    GUILD_BOSS_INFO_UPDATE = "GUILD_BOSS_INFO_UPDATE",//帮派BOSS数据刷新
    GUILD_BOSS_CARD_UPDATE = "GUILD_BOSS_CARD_UPDATE",//帮派翻牌信息刷新

}