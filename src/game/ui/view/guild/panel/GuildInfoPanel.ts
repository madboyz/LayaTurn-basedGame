import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { SAoiData, SAoiEvent } from "../../../../aoi/SAoiData";
import { STaskData } from "../../../../task/STaskData";
import { Task, TaskState, TaskType } from "../../../../task/Task";
import { ProgressBar } from "../../../compent/ProgressBar";
import { FliterManager } from "../../../manager/FliterManager";
import { MsgManager } from "../../../manager/MsgManager";
import { GuildPositionType } from "../data/GuildHelper";
import { SGuildData, SGuildEvent } from "../data/SGuildData";
import { SGameData } from "../../../../../net/data/SGameData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { RedDotType } from "../../../../redDot/RedDotList";

export class GuildInfoPanel extends ui.main.GuildInfoPanelUI {
    private expBar: ProgressBar;
    public ischangingGonggao: boolean = false;

    constructor() {
        super();
        this.initComp();
    }

    private initComp(): void {
        this.initBar();
        this.initEvent();
        this.funcPanel.hScrollBarSkin = "";
        this.funcBox1.on(Laya.Event.CLICK, this, this.funcBox1Click);
        this.funcBox2.on(Laya.Event.CLICK, this, this.funcBox2Click);
        this.funcBox3.on(Laya.Event.CLICK, this, this.funcBox3Click);
        this.ischangingGonggao = false;
    }

    private initBar(): void {
        this.expBar = new ProgressBar();
        this.expBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_greenBar_1"), 150, 24);
        this.expBar.setLabel(1, 20, "#ffffff");
        this.expBar.x = 375;
        this.expBar.y = 204;
        this.addChild(this.expBar);
    }

    private initEvent(): void {
        this.gonggaoInputLb.on(Laya.Event.INPUT, this, this.txtOnChange);
        this.bianjiBtn.on(Laya.Event.CLICK, this, this.bianjiBtnClick);
        this.baocunBtn.on(Laya.Event.CLICK, this, this.baocunBtnClick);
        this.quxiaoBtn.on(Laya.Event.CLICK, this, this.quxiaoBtnClick);
    }

    private removeEvent(): void {
        this.gonggaoInputLb.off(Laya.Event.INPUT, this, this.txtOnChange);
        this.bianjiBtn.off(Laya.Event.CLICK, this, this.bianjiBtnClick);
        this.baocunBtn.off(Laya.Event.CLICK, this, this.baocunBtnClick);
        this.quxiaoBtn.off(Laya.Event.CLICK, this, this.quxiaoBtnClick);
    }

    private bianjiBtnClick(): void {
        this.ischangingGonggao = true;
        this.gonggaoInputLb.text = "";
        this.gonggaoInputLb.focus = true;

        this.updateData();
    }

    private baocunBtnClick(): void {
        if (this.gonggaoInputLb.text == "") {
            MsgManager.instance.showRollTipsMsg("请先输入公告");
            return;
        }
        SGuildData.instance.event(SGuildEvent.ASK_GUILD_CHANGE_NOTICE, this.gonggaoInputLb.text);
    }

    private quxiaoBtnClick(): void {
        this.ischangingGonggao = false;
        this.updateData();
    }

    private txtOnChange(): void {
        this.gonggaoInputLb.text = FliterManager.instance.getFilterStr(this.gonggaoInputLb.text);
    }

    public updateData(): void {
        var myGuildData = SGuildData.instance.myGuildData;
        var myGuildPosition = SGuildData.instance.myGuildPosition;
        if (!myGuildData || !myGuildPosition) {
            return;
        }
        this.guildNameLb.text = myGuildData.GuildName;
        this.leaderNameLb.text = myGuildData.ChiefName;
        this.menberNumLb.text = myGuildData.CurMbCount + "/" + myGuildData.MbCapacity;
        this.gongxianLb.text = GMath.GetChineseNumber(SRoleData.instance.getMoneyByType(MoneyType.GUILD_CONTRI));
        this.rankLb.text = myGuildData.Rank + "";
        this.zhanliLb.text = myGuildData.BattlePower + "";
        this.guildLvLb.text = myGuildData.Lv + "级帮派";
        this.expBar.setValue(myGuildData.CurProsper, myGuildData.MaxProsper);
        var curStr = GMath.GetChineseNumber(myGuildData.CurProsper);
        var maxStr = GMath.GetChineseNumber(myGuildData.MaxProsper);
        this.expBar.Text = `${curStr}/${maxStr}`;
        //修改公告
        this.bianjiBtn.visible = !this.ischangingGonggao && (myGuildPosition.Position == GuildPositionType.leader || myGuildPosition.Position == GuildPositionType.subLeader);
        this.baocunBtn.visible = this.quxiaoBtn.visible = this.ischangingGonggao;
        this.gonggaoLb.visible = !this.ischangingGonggao;
        this.gonggaoInputLb.visible = this.ischangingGonggao;
        this.gonggaoLb.text = (myGuildData.Notice == "") ? "还没有发布公告" : myGuildData.Notice;
        //帮派任务
        var task: Task = STaskData.instance.CurrentTaskDic.get(TaskType.GUILD);
        var isAllOver = !task || !task.timeData || (task.State == TaskState.TASK_FINISH && task.leftTime <= 1);
        this.taskProgressLb.text = isAllOver ? "(已完成)" : "(" + (task.timeData.setp - 1) + "/" + task.SheetData.ring[1] + ")";
        this.taskRed.visible = !isAllOver;
        this.bossRed.visible = RedDotManager.instance.GetRD(RedDotType.RDGuildBoss)._isActiveSave;
    }

    private funcBox1Click(): void {
        SGuildData.instance.gotoGuildPlace();
        UIManager.instance.closeUI(UIID.GUILD_MAIN_PANEL);
        UIManager.instance.closeUI(UIID.SYS_MAIN);
    }

    private funcBox2Click(): void {
        UIManager.instance.closeUI(UIID.GUILD_MAIN_PANEL);
        UIManager.instance.openUI(UIID.GUILD_BOSS_PANEL);
    }

    private funcBox3Click(): void {
        MsgManager.instance.showRollTipsMsg("敬请期待");
    }

    public destroy(): any {
        this.removeEvent();
        super.destroy();
    }
}