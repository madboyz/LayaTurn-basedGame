import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { MsgManager } from "../../../manager/MsgManager";
import { SGuildData } from "../../guild/data/SGuildData";
import { SOpenServiceActivityData, SOpenServiceActivityEvent } from "../../openServiceActivity/data/SOpenServiceActivityData";
import { SRechargeData } from "../../recharge/data/SRechargeData";
import { SYYActivityData, SYYActivityEvent } from "../../yyActivity/data/SYYActivityData";



export class MainCityPanel extends ui.main.MainCityPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_1_5;
        this.sameLevelEliminate = false;
        this.isFullScreen = true;
        this.mResouce = [
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];

    }

    public initComp() {
        super.initComp();
        this.initButtom();
        this.showRed();
        this.cacheAs = "bitmap";
        this.ScrollArea.hScrollBarSkin = "";
        this.ScrollArea.vScrollBarSkin = "";
    }

    private showRed(): void {
        this.showCopyRed(RedDotManager.instance.GetRD(RedDotType.RDFB)._isActiveSave);//副本
        this.showActiveRed(RedDotManager.instance.GetRD(RedDotType.RDCityActive)._isActiveSave);//活动
        this.showFriendRed(RedDotManager.instance.GetRD(RedDotType.RDFriend)._isActiveSave);//好友
        this.showJJCRed(RedDotManager.instance.GetRD(RedDotType.RDJJC)._isActiveSave);//竞技场
        this.showBossRed(RedDotManager.instance.GetRD(RedDotType.RDCityBoss)._isActiveSave);//BOSS
        this.showComateRed(RedDotManager.instance.GetRD(RedDotType.RDCityComate)._isActiveSave);//伙伴
        this.showFuliRed(RedDotManager.instance.GetRD(RedDotType.RDFuli)._isActiveSave);//福利中心
        this.showOSActivityRed(RedDotManager.instance.GetRD(RedDotType.RDOSActivity)._isActiveSave);//开服活动
        this.showGuildRed(RedDotManager.instance.GetRD(RedDotType.RDGuild)._isActiveSave);//帮派
        this.showYuekaRed(RedDotManager.instance.GetRD(RedDotType.RDYueka)._isActiveSave);//月卡
        this.showTouzijihuaRed(RedDotManager.instance.GetRD(RedDotType.RDTouzijihua)._isActiveSave);//投资计划
        this.showRechargeRewardRed(RedDotManager.instance.GetRD(RedDotType.RDRechargeReward)._isActiveSave);//充值累计回馈

        //判断上面一排活动按钮
        var count: number = 0;
        for (let i = 0; i < this.btn_main.numChildren; i++) {
            const btn: component.ScaleButton = this.btn_main.getChildByName(`btn_${i}`) as component.ScaleButton;
            var needShow: boolean = false;
            if (i == 2) {
                needShow = SOpenServiceActivityData.instance.godPetIsOpen() || SOpenServiceActivityData.instance.OSChangeIsOpen()
            } else if (i == 4) {
                //投资计划
                needShow = !SRechargeData.instance.touzijihuaAllGet();
            } else if (i == 5) {
                //充值累计回馈
                needShow = !SRechargeData.instance.rechargeRewardAllGet();
            } else if (count >= 6) {
                needShow = false;
            } else {
                needShow = true;
            }
            if (needShow) {
                btn.x = count * 74;
                btn.visible = true;
                count++;
            } else {
                btn.visible = false;
            }
        }

        //判断左边一排活动按钮
        var count: number = 0;
        for (let i = 0; i < this.btn_left.numChildren; i++) {
            const btn: component.ScaleButton = this.btn_left.getChildByName(`btnl_${i}`) as component.ScaleButton;
            var needShow: boolean = false;
            if (i == 0) {
                needShow = SYYActivityData.instance.yyRechargeGiveBackIsOpen();
            } else if (i == 1) {
                needShow = SYYActivityData.instance.yyRankIsOpen();
            } else if (i == 2) {
                needShow = SYYActivityData.instance.yyLibaoIsOpen("天赋礼包");
            } else if (i == 3) {
                needShow = SYYActivityData.instance.yyLibaoIsOpen("技能礼包");
            } else if (i == 4) {
                needShow = SYYActivityData.instance.yyLibaoIsOpen("法宝礼包");
            } else if (i == 5) {
                needShow = SYYActivityData.instance.yyLibaoIsOpen("命格礼包");
            } else if (i == 6) {
                needShow = SYYActivityData.instance.yyLoginDayRewardIsOpen();
            }
            if (needShow) {
                btn.y = count * 74;
                btn.visible = true;
                count++;
            } else {
                btn.visible = false;
            }
        }
    }

    public showFriendRed(show: boolean = false): void {
        this.friendRed.visible = show;
    }

    public showJJCRed(show: boolean = false): void {
        this.jjcRed.visible = show;
    }

    public showBossRed(show: boolean = false): void {
        this.bossRed.visible = show;
    }

    public showComateRed(show: boolean = false): void {
        this.comateRed.visible = show;
    }

    public showCopyRed(show: boolean = false): void {
        this.copyRed.visible = show;
    }

    public showActiveRed(show: boolean = false): void {
        this.activityRed.visible = show;
    }

    public showGuildRed(show: boolean = false): void {
        this.guildRed.visible = show;
    }

    public showFuliRed(show: boolean = false): void {
        this.btn_0_Red.visible = show;
    }

    public showOSActivityRed(show: boolean = false): void {
        this.btn_2_Red.visible = show;
    }

    public showYuekaRed(show: boolean = false): void {
        this.btn_3_Red.visible = show;
    }

    public showTouzijihuaRed(show: boolean = false): void {
        this.btn_4_Red.visible = show;
    }

    public showRechargeRewardRed(show: boolean = false): void {
        this.btn_5_Red.visible = show;
    }

    private initButtom() {
    }
    public update() {
        super.update();
        this.showRed();
    }

    public open(...args): void {
        super.open();
        Laya.timer.once(2, this, () => {
            this.ScrollArea.hScrollBar.value = this.ScrollArea.width / 580 * 300;
            this.ScrollArea.vScrollBar.value = this.ScrollArea.height / 695 * 300;
        })
    }

    public initEvent(): void {
        this.btn_race.on(Laya.Event.CLICK, this, this.onOpenRace);
        this.btn_friend.on(Laya.Event.CLICK, this, this.onOpenFriend);
        this.btn_copy.on(Laya.Event.CLICK, this, this.onOpenCopy);
        this.btn_boss.on(Laya.Event.CLICK, this, this.onOpenBoss);
        this.btn_comate.on(Laya.Event.CLICK, this, this.onOpenComate);
        this.btn_active.on(Laya.Event.CLICK, this, this.onOpenActive);
        this.btn_tianti.on(Laya.Event.CLICK, this, this.onOpenTianti);
        this.btn_guild.on(Laya.Event.CLICK, this, this.onOpenGuild);

        SYYActivityData.instance.on(SYYActivityEvent.YYACTIVITY_OPEN_CHANGE, this, this.showRed);
        SOpenServiceActivityData.instance.on(SOpenServiceActivityEvent.ACTIVITY_DATA_REFRESH, this, this.showRed);
        RedDotManager.instance.on(RedDotType.RDFB, this, this.showCopyRed);
        RedDotManager.instance.on(RedDotType.RDCityActive, this, this.showActiveRed);
        RedDotManager.instance.on(RedDotType.RDFriend, this, this.showFriendRed);
        RedDotManager.instance.on(RedDotType.RDJJC, this, this.showJJCRed);
        RedDotManager.instance.on(RedDotType.RDCityBoss, this, this.showBossRed);
        RedDotManager.instance.on(RedDotType.RDCityComate, this, this.showComateRed);
        RedDotManager.instance.on(RedDotType.RDFuli, this, this.showFuliRed);
        RedDotManager.instance.on(RedDotType.RDOSActivity, this, this.showOSActivityRed);
        RedDotManager.instance.on(RedDotType.RDGuild, this, this.showGuildRed);
        RedDotManager.instance.on(RedDotType.RDYueka, this, this.showYuekaRed);
        RedDotManager.instance.on(RedDotType.RDTouzijihua, this, this.showTouzijihuaRed);
        RedDotManager.instance.on(RedDotType.RDRechargeReward, this, this.showRechargeRewardRed);

        for (let i = 0; i < this.btn_main.numChildren; i++) {
            const btn: component.ScaleButton = this.btn_main.getChildByName(`btn_${i}`) as component.ScaleButton;
            btn.on(Laya.Event.CLICK, this, this.onClickMainBtn, [i]);
        }

        for (let i = 0; i < this.btn_left.numChildren; i++) {
            const btn: component.ScaleButton = this.btn_left.getChildByName(`btnl_${i}`) as component.ScaleButton;
            btn.on(Laya.Event.CLICK, this, this.onClickLeftBtn, [i]);
        }

    }

    public removeEvent(): void {
        this.btn_race.off(Laya.Event.CLICK, this, this.onOpenRace);
        this.btn_friend.off(Laya.Event.CLICK, this, this.onOpenFriend);
        this.btn_copy.off(Laya.Event.CLICK, this, this.onOpenCopy);
        this.btn_boss.off(Laya.Event.CLICK, this, this.onOpenBoss);
        this.btn_comate.off(Laya.Event.CLICK, this, this.onOpenComate);
        this.btn_active.off(Laya.Event.CLICK, this, this.onOpenActive);
        this.btn_tianti.off(Laya.Event.CLICK, this, this.onOpenTianti);
        this.btn_guild.off(Laya.Event.CLICK, this, this.onOpenGuild);

        SYYActivityData.instance.off(SYYActivityEvent.YYACTIVITY_OPEN_CHANGE, this, this.showRed);
        SOpenServiceActivityData.instance.off(SOpenServiceActivityEvent.ACTIVITY_DATA_REFRESH, this, this.showRed);
        RedDotManager.instance.off(RedDotType.RDFB, this, this.showCopyRed);
        RedDotManager.instance.off(RedDotType.RDCityActive, this, this.showActiveRed);
        RedDotManager.instance.off(RedDotType.RDFriend, this, this.showFriendRed);
        RedDotManager.instance.off(RedDotType.RDJJC, this, this.showJJCRed);
        RedDotManager.instance.off(RedDotType.RDCityBoss, this, this.showBossRed);
        RedDotManager.instance.off(RedDotType.RDCityComate, this, this.showComateRed);
        RedDotManager.instance.off(RedDotType.RDFuli, this, this.showFuliRed);
        RedDotManager.instance.off(RedDotType.RDOSActivity, this, this.showOSActivityRed);
        RedDotManager.instance.off(RedDotType.RDGuild, this, this.showGuildRed);
        RedDotManager.instance.off(RedDotType.RDYueka, this, this.showYuekaRed);
        RedDotManager.instance.off(RedDotType.RDTouzijihua, this, this.showTouzijihuaRed);
        RedDotManager.instance.off(RedDotType.RDRechargeReward, this, this.showRechargeRewardRed);

        for (let i = 0; i < this.btn_main.numChildren; i++) {
            const btn: component.ScaleButton = this.btn_main.getChildByName(`btn_${i}`) as component.ScaleButton;
            btn.off(Laya.Event.CLICK, this, this.onClickMainBtn);
        }

        for (let i = 0; i < this.btn_left.numChildren; i++) {
            const btn: component.ScaleButton = this.btn_left.getChildByName(`btnl_${i}`) as component.ScaleButton;
            btn.off(Laya.Event.CLICK, this, this.onClickLeftBtn);
        }
    }

    private onClickMainBtn(index: number) {
        switch (index) {
            case 0:
                {
                    UIManager.instance.openUI(UIID.FULI_MAIN_PANEL);
                    break;
                }
            case 1:
                {
                    UIManager.instance.openUI(UIID.SYS_PETCHOUJIANG_PANEL);
                    break;
                }
            case 2:
                {
                    UIManager.instance.openUI(UIID.OPEN_SERVICE_ACTIVITY_PANEL);
                    break;
                }
            case 3:
                {
                    UIManager.instance.openUI(UIID.YUEKA_PANEL);
                    break;
                }
            case 4:
                {
                    UIManager.instance.openUI(UIID.TOUZIJIHUA_PANEL);
                    break;
                }
            case 5:
                {
                    UIManager.instance.openUI(UIID.RECHARGE_REWARD_PANEL);
                    break;
                }
        }
    }

    private onClickLeftBtn(index: number): void {
        switch (index) {
            case 0:
                {
                    UIManager.instance.openUI(UIID.YY_GIVEBACK_PANEL);
                    break;
                }
            case 1:
                {
                    UIManager.instance.openUI(UIID.YY_RANK_PANEL);
                    break;
                }
            case 2:
                {
                    UIManager.instance.openUI(UIID.YY_LIBAO_PANEL, [2]);
                    break;
                }
            case 3:
                {
                    UIManager.instance.openUI(UIID.YY_LIBAO_PANEL, [1]);
                    break;
                }
            case 4:
                {
                    UIManager.instance.openUI(UIID.YY_LIBAO_PANEL, [3]);
                    break;
                }
            case 5:
                {
                    UIManager.instance.openUI(UIID.YY_LIBAO_PANEL, [4]);
                    break;
                }
            case 6:
                {
                    UIManager.instance.openUI(UIID.YY_LOGIN_DAY_REWARD_PANEL);
                    break;
                }
        }
    }

    private onOpenRace(): void {
        MsgManager.instance.showRollTipsMsg("敬请期待！");
    }

    private onOpenComate(): void {
        UIManager.instance.openUI(UIID.SYS_COMATE, [0]);
        //MsgManager.instance.showRollTipsMsg("敬请期待！");
    }

    private onOpenActive(): void {
        //MsgManager.instance.showRollTipsMsg("敬请期待！");
        UIManager.instance.openUI(UIID.SYS_ACTIVITY);
        //SChaosBattleData.instance.protocol.send28001();
        // this.close();
    }

    private onOpenTianti(): void {
        UIManager.instance.openUI(UIID.SYS_OFFLINE_ARENA);
    }

    private onOpenGuild(): void {
        SGuildData.instance.checkOpenGuildPanel();
    }

    private onOpenFriend(): void {
        UIManager.instance.openUI(UIID.SYS_RELATION);
    }

    private onOpenCopy(): void {
        UIManager.instance.openUI(UIID.SYS_COPY_STUFF);
    }

    private onOpenBoss(): void {
        UIManager.instance.openUI(UIID.SYS_COPY_BOSS);
    }

    public close(): void {
        super.close();
    }
}