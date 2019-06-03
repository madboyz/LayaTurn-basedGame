import { SRoleData } from "../../../net/data/SRoleData";
import { C40011, C40012, C40016 } from "../../../net/pt/pt_40";
import { SocketManager } from "../../../net/SocketManager";
import { GuildPositionType, GuildHelper } from "../../ui/view/guild/data/GuildHelper";
import { SGuildData } from "../../ui/view/guild/data/SGuildData";
import { RedDotBase } from "../RedDotBase";
import { Task, TaskType, TaskState } from "../../task/Task";
import { STaskData } from "../../task/STaskData";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { FbVo } from "../../../db/sheet/vo/FbVo";
import { S57003_2 } from "../../../net/pt/pt_57";
import { SCopyData } from "../../../net/data/SCopyData";

export class RDGuildManage extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_GUILD)) {
            return false;
        }
        //管理成员
        if (SRoleData.instance.info.GuildId == 0) {
            return false;
        }
        var myGuildData = SGuildData.instance.myGuildData;
        var myGuildPosition = SGuildData.instance.myGuildPosition;
        if (!myGuildData || !myGuildPosition) {
            var msg: C40012 = new C40012();
            msg.GuildId = SRoleData.instance.info.GuildId;
            SocketManager.instance.send(msg);
            var msg2: C40016 = new C40016();
            SocketManager.instance.send(msg2);
            return false;
        }
        var canManage = (myGuildPosition.Position == GuildPositionType.leader || myGuildPosition.Position == GuildPositionType.subLeader
            || myGuildPosition.Position == GuildPositionType.elite);
        if (!canManage) {
            return false;
        }
        var applyList = SGuildData.instance.applyList;
        if (!applyList) {
            var msg3: C40011 = new C40011();
            msg3.GuildId = SRoleData.instance.info.GuildId;
            msg3.PageSize = 50;
            msg3.PageNum = 1;
            SocketManager.instance.send(msg3);
            return false;
        }
        if (applyList.item_1.length > 0) {
            return true;
        }
        if (SGuildData.instance.haveApply) {
            return true;
        }
        return false;
    }
}

export class RDGuildTask extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_GUILD)) {
            return false;
        }
        if (SRoleData.instance.info.GuildId == 0) {
            return false;
        }
        var myGuildData = SGuildData.instance.myGuildData;
        if (!myGuildData) {
            var msg: C40012 = new C40012();
            msg.GuildId = SRoleData.instance.info.GuildId;
            SocketManager.instance.send(msg);
            return false;
        }
        //帮派任务
        var task: Task = STaskData.instance.CurrentTaskDic.get(TaskType.GUILD);
        var isAllOver = !task || !task.timeData || (task.State == TaskState.TASK_FINISH && task.leftTime <= 1);
        return !isAllOver;
    }
}

export class RDGuildBoss extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_GUILD)) {
            return false;
        }
        if (SRoleData.instance.info.GuildId == 0) {
            return false;
        }
        var myGuildData = SGuildData.instance.myGuildData;
        if (!myGuildData) {
            var msg: C40012 = new C40012();
            msg.GuildId = SRoleData.instance.info.GuildId;
            SocketManager.instance.send(msg);
            return false;
        }
        //判断
        var cfgs = FbVo.getListByType(CopyType.GUILD_BOSS);
        for (let i = 0; i < cfgs.length; i++) {
            var cfg = cfgs[i];
            var data: S57003_2 = SCopyData.instance.getCopyInfo(cfg.no);
            var info = SGuildData.instance.guildBossInfos.get(cfg.no);
            if (!data || !info) {
                continue;
            }
            var killed = info.state == 0;//类型0，既被杀
            if (killed) {
                //翻牌次数
                var canCard = info && info.draw_state == 0;
                var cardLeftNum = ConstVo.get("GUILD_BOSS_WEEK_DRAW_COUNT").val - SGuildData.instance.getCardTimes();
                var cardEnough = cardLeftNum > 0;
                if (cardEnough && canCard) {
                    return true;
                }
            } else {
                //进入条件相关info
                var guildLvCfg = GuildHelper.getGuildBossCfg(data.no);
                var guildLvEnough = SGuildData.instance.myGuildData.Lv >= guildLvCfg[1];
                var myLvEnough = SRoleData.instance.info.Lv >= cfg.lv_limit;
                //boss挑战次数
                var bossLeftNum = cfg.cd[1] - data.times;
                var timeEnough = bossLeftNum > 0;
                if (guildLvEnough && myLvEnough && timeEnough) {
                    return true;
                }
            }

        }
        return false;
    }
}


export class RDGuildContribute extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_GUILD)) {
            return false;
        }
        if (SRoleData.instance.info.GuildId == 0) {
            return false;
        }
        var myGuildData = SGuildData.instance.myGuildData;
        if (!myGuildData) {
            var msg: C40012 = new C40012();
            msg.GuildId = SRoleData.instance.info.GuildId;
            SocketManager.instance.send(msg);
            return false;
        }
        //帮派贡献
        var data = SGuildData.instance.contriData;
        if (!data) {
            SGuildData.instance.protocol.send40037(0);
            return false;
        }
        //次数
        var maxTime = ConstVo.get("GUILD_DONATE_TODAY_LIMIT").val;
        return (maxTime - data.DonateToday) > 0;
    }
}
