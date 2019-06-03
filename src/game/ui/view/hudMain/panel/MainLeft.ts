import { Sys_openVo } from "../../../../../db/sheet/vo/Sys_openVo";
import { DataManager } from "../../../../../message/manager/DataManager";
import { SMailData, SMailEvent } from "../../../../../net/data/SMailData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { STeamData } from "../../../../team/STeamData";
import { GameUtils } from "../../../../utils/GameUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { TabBar } from "../../../compent/TabBar";
import { MsgManager } from "../../../manager/MsgManager";
import { SActiveRewardData } from "../../dayReward/data/SActiveRewardData";
import { SRechargeData, SRechargeEvent } from "../../recharge/data/SRechargeData";

export class MainLeft extends ui.main.MainLeftUI {
    private mTab: TabBar;
    /**  开放等级　*/
    private _levelOpenDict: Object;
    private CanGetOnlineReward = false;//是否可以领取在线奖励
    constructor() {
        super();
        this.initComp();
        this.initEvent();
        this.y = 165;
        this.mouseThrough = true;
    }

    private initComp(): void {
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3, this.btn_4]);
            this.mTab.isSelect = false;
        }
        SMailData.instance.on(SMailEvent.SMAIL_UPDATE, this, this.showMailRed);
        DataManager.listen(PROTOCOL.E19008, this, this.showMailRed);//新邮件提醒
        this._levelOpenDict = {
            "btn_0": Sys_openVo.get(UIID.SYS_MAIL).lv_need,//邮件
            "btn_1": Sys_openVo.get(UIID.SYS_RANK).lv_need,//排行榜
            "btn_2": Sys_openVo.get(UIID.SYS_SHOP).lv_need,//商场
            "btn_3": Sys_openVo.get(UIID.SYS_DAY_TASK).lv_need,//日常
            "btn_4": Sys_openVo.get(UIID.SYS_TEAM).lv_need,//队伍
        };
        if (!this.onlineEffect) {
            this.onlineEffect = new UIeffectLayer;
            this.topBox.addChild(this.onlineEffect);
            this.onlineEffect.playEffect("ui_effect_22", this.btn_6.x, this.btn_6.y, true, 130);
        }
        this.showMailRed();
        this.showDayTaskRed(RedDotManager.instance.GetRD(RedDotType.RDDayTask)._isActiveSave);//等级奖励
        this.showRechargeBtn();
    }

    private initEvent(): void {
        RedDotManager.instance.on(RedDotType.RDDayTask, this, this.showDayTaskRed);
        //SRechargeData.instance.on(SRechargeEvent.RECHARGE_STATE_CHANGE, this, this.showRechargeBtn);

        this.btn_5.on(Laya.Event.CLICK, this, this.beStrongClick)
        this.btn_6.on(Laya.Event.CLICK, this, this.onClickOnlineRewardBtn);
        this.btn_7.on(Laya.Event.CLICK, this, this.firstRechargeClick);
        this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
    }
    private removeEvent(): void {
        RedDotManager.instance.off(RedDotType.RDDayTask, this, this.showDayTaskRed);
        //SRechargeData.instance.off(SRechargeEvent.RECHARGE_STATE_CHANGE, this, this.showRechargeBtn);

        this.btn_5.off(Laya.Event.CLICK, this, this.beStrongClick)
        this.btn_6.off(Laya.Event.CLICK, this, this.onClickOnlineRewardBtn);
        this.btn_7.off(Laya.Event.CLICK, this, this.firstRechargeClick);
        this.mTab.off(Laya.Event.CHANGE, this, this.onTabChange);
    }

    private onTabChange(index: number, btn: Laya.Button) {
        switch (index) {
            case 0:
                UIManager.instance.openUI(UIID.SYS_MAIL);
                break;
            case 1:
                UIManager.instance.openUI(UIID.SYS_RANK);
                break;
            case 2:
                UIManager.instance.openUI(UIID.SYS_SHOP);
                // UIManager.instance.openUI(UIID.FORGING,UILEVEL.POP_2);
                // MsgManager.instance.showRollTipsMsg("敬请期待！");
                break;
            case 3:
                UIManager.instance.openUI(UIID.SYS_DAY_TASK);
                //MsgManager.instance.showRollTipsMsg("敬请期待！");
                break;
            case 4:
                if (STeamData.instance.RequsetTeamInfos.keys.length > 0 && SRoleData.instance.info.TeamId == 0) {
                    UIManager.instance.openUI(UIID.SYS_TEAM_BEREQUEST);
                }
                else {
                    UIManager.instance.openUI(UIID.SYS_TEAM);
                }

                //  UIManager.instance.openUI(UIID.PET,UILEVEL.POP_2);
                break;
            case 5:
                // UIManager.instance.openUI(UIID.SYS_MOUNT,UILEVEL.POP_2);
                break;
            default:
                break;
        }
    }

    private onlineEffect: UIeffectLayer;
    private onlineEffect2: UIeffectLayer;
    public onlineReward() {
        if (SActiveRewardData.instance.CurrentOnlineReward.No == 0) {
            this.btn_6.visible = false;
            if (this.onlineEffect && this.onlineEffect.visible) {
                this.onlineEffect.visible = false;
            }
        } else {
            this.btn_6.visible = true;
            if (SActiveRewardData.instance.CurrentOnlineReward.lastTime == 0) {
                this.OnlineTimeText.text = "";
                this.CanGetOnlineReward = true;
                this.btn_6.refreshRed(true);
                if (this.onlineEffect && !this.onlineEffect.visible)
                    this.onlineEffect.visible = true;
            }
            else {
                if (SActiveRewardData.instance.CurrentOnlineReward.sheet &&
                    SActiveRewardData.instance.CurrentOnlineReward.sheet.condition) {
                    var time = SActiveRewardData.instance.CurrentOnlineReward.sheet.condition;
                    var nextTime = SActiveRewardData.instance.CurrentOnlineReward.lastTime + time;
                    var nowTime = GameUtils.TimeStamp;
                    if (nowTime > nextTime) {
                        this.OnlineTimeText.text = "";
                        this.CanGetOnlineReward = true;
                        this.btn_6.refreshRed(true);
                        if (this.onlineEffect && !this.onlineEffect.visible)
                            this.onlineEffect.visible = true;
                    }
                    else {
                        var countTime = nextTime - nowTime;
                        var mm = TimerUtil.mm(countTime);
                        var ss = TimerUtil.ss(countTime);
                        this.OnlineTimeText.text = `${mm}:${ss}`;
                        this.CanGetOnlineReward = false;
                        this.btn_6.refreshRed(false);
                        if (this.onlineEffect && this.onlineEffect.visible)
                            this.onlineEffect.visible = false;
                    }

                }
            }
        }
        this.layOutTopBtn();
    }

    public updateTeam() {
        if (SRoleData.instance.info.TeamId == 0) {
            if (STeamData.instance.RequsetTeamInfos.keys.length > 0) {
                this.TeamCountText.text = "";
                this.btn_4.refreshRed(true);
                //this.TeamCountText.text = `${STeamData.instance.RequsetTeamInfos.keys.length }个邀请`;
            }
            else {
                this.btn_4.refreshRed(false);
                this.TeamCountText.text = "";
            }
        }
        else {
            this.btn_4.refreshRed(false);
            this.TeamCountText.text = `(${STeamData.instance.CurrentTeamInfo.TeamRoleInfoDis.keys.length}/3)`;
        }
    }
    public updateLayout(): void {
        var k: number = 0;
        for (let index = 0; index < this.mTab.btnList.length; index++) {
            const element = this.mTab.btnList[index];
            // element.visible = this._levelOpenDict[element.name] <= SRoleData.instance.roleInfo.Lv?true:false;
            element.visible = true;//把不关等级到了没有的功能都开启
            if (element.visible) {
                element.y = 64 * k;
                k += 1;
            }
        }
        if (this.btn_7.visible) {
            if (!this.onlineEffect2) {
                this.onlineEffect2 = new UIeffectLayer;
                this.topBox.addChild(this.onlineEffect2);
                this.onlineEffect2.playEffect("ui_effect_22", 0, 0, true, 130);
            }
            this.onlineEffect2.x = this.btn_7.x;
            this.onlineEffect2.y = this.btn_7.y;
        }else{
            if (this.onlineEffect2) {
                this.onlineEffect2.destroy();
            }
        }
    }

    private showMailRed(): void {
        if (SMailData.instance.showRed) {
            this.btn_0.refreshRed(true);
        }
        else {
            this.btn_0.refreshRed(false);
        }
    }

    public showDayTaskRed(show: boolean = false): void {
        this.btn_3.refreshRed(show);
    }

    public showRechargeBtn(): void {
        this.btn_7.visible = !SRechargeData.instance.hadRecharge();
        this.layOutTopBtn();
    }

    public layOutTopBtn(): void {
        var count: number = 0;
        for (let i = 5; i <= 7; i++) {
            var btn: component.ScaleButton = this["btn_" + i];
            if (btn.visible) {
                btn.x = count * 70 + 30;
                count++;
            }

        }
    }

    private onClickOnlineRewardBtn() {
        if (!this.CanGetOnlineReward) {
            MsgManager.instance.showRollTipsMsg("目前还不能领取！");
        }
        else {
            if (SActiveRewardData.instance.CurrentOnlineReward.sheet &&
                SActiveRewardData.instance.CurrentOnlineReward.sheet.reward_no) {
                this.getOnlineRewward();
                //var awardId = SActiveRewardData.instance.CurrentOnlineReward.sheet.reward_no;
                //var goodsList = AwardUtil.GetNormalGoodsList(awardId);
                //UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, UILEVEL.POP_3, -1, goodsList, false , this.getOnlineRewward);
            }
        }
    }

    private getOnlineRewward() {
        SActiveRewardData.instance.protocal.send13054(SActiveRewardData.instance.CurrentOnlineReward.No)
        this.CanGetOnlineReward = false;
    }

    public beStrongClick(): void {
        UIManager.instance.openUI(UIID.SYS_BESTRONGER_PANEL);
    }

    public firstRechargeClick(): void {
        SRechargeData.instance.checkOpenRecharge();
    }


    public removeSelf(): any {
        if (this.onlineEffect) {
            this.onlineEffect.destroy();
            this.onlineEffect = null;
        }
        this.removeEvent();
        super.removeSelf();
    }
}