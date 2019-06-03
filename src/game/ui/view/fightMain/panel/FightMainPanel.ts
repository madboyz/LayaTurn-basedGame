
import { FightInfo } from "../../../../battle/model/FightInfo";
import { TabBar } from "../../../compent/TabBar";
import { Astar } from "../../../../../framework/utils/Astar";
import { SChapterData } from "../../../../chapter/SChapterData";
import { TextLayer } from "../../../../battle/scene/layer/TextLayer";
import { SCopyData } from "../../../../../net/data/SCopyData";
import { SNewBattleData, BattleState } from "../../../../../net/data/SNewBattleData";
import { Delay } from "../../../../../framework/utils/Delay";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { GameUtils } from "../../../../utils/GameUtils";
import { PetCopyStarProgress } from "./PetCopyStarProgress";
import { CommonControl } from "../../../../common/control/CommonControl";
import { Alert } from "../../../compent/Alert";
export class FightMainPanel extends ui.main.BattlePanelUI {
    private mTab: TabBar;
    private progress: PetCopyStarProgress;
    private txtLayer: TextLayer = new TextLayer();
    private isFirst = true;
    constructor() {
        super();
        this.layer = UILEVEL.POP_1;
        this.sameLevelEliminate = false;
        this.isFullScreen = true;
        this.mResouce = [
            { url: "res/atlas/battle.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        if (!this.mTab) {
            this.mTab = new TabBar([this.skill]);
        }
        this.progress = new PetCopyStarProgress();
        this.addChildAt(this.progress, 1);
        this.AutoCheck.offAll(Laya.Event.MOUSE_OVER);
        this.AutoCheck.offAll(Laya.Event.MOUSE_OUT);
        this.addChild(this.txtLayer);
        this.txtLayer.scaleX = this.txtLayer.scaleY = 0.65;
        this.CamEffect.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        this.ExitBtn.visible = false;
        Laya.LocalStorage.setItem("autoFight", "true");
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
        this.CheckFightState();
    }

    public open(...args): void {
        super.open();
        if (!this.isFirst) return;
        this.isFirst = false;
        this.CheckFightState();
    }

    private async CheckFightState() {
        var isHaveBoss = this.arg[2];
        var mainType = this.arg[0];
        var subType = this.arg[1];
        this.DisplayerText(mainType, subType);
        this.BossCome.visible = false;
        if (isHaveBoss && mainType == BattleMainType.PVE) {
            //if(subType == PveBattleSubType.ThreeDungeon)
            //{
            //    this.BossCome.skin = "bg/nextWave.png";
            //}
            //else

            this.ShowBossDiplayer();
        } else {
            /**
             * 因为三界副本可支持重登回归战斗有可能boss已经死亡所以只要是三界本都算是boss来袭
             */
            if (mainType == BattleMainType.PVE && (subType == PveBattleSubType.ThreeDungeon || subType == PveBattleSubType.ZuoQiShiLian))
                this.ShowBossDiplayer();
            else
                this.showUIEffect();
        }
        await Delay.delay(1200);
        this.action();
    }

    private action() {
        var auto = Laya.LocalStorage.getItem("autoFight") == "true" ? true : false;
        if (this.AutoCheck.selected != auto) {
            this.AutoCheck.selected = auto;
        }
        else {
            this.checkAutoFight();
        }
        Laya.LocalStorage.setItem("autoFight", this.AutoCheck.selected.toString());
    }

    public async ShowBossDiplayer(isNewWave: boolean = false) {
        if (isNewWave)
            this.BossCome.skin = "bg/nextWave.png";
        else
            this.BossCome.skin = "bg/bossCome.png";
        this.BossCome.centerX = 600;
        this.BossCome.visible = true;
        this.BossCome.alpha = 1;

        //this.CamEffect.visible = true;
        //var frames: any = await UIManager.instance.loadUIEffect("bossCome");
        //this.CamEffect.frames = frames;
        //this.CamEffect.play(0, true);
        //this.CamEffect.x = Laya.stage.width;
        //this.CamEffect.alpha = 1;
        Laya.Tween.to(this.BossCome, { centerX: 0 }, 300, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.BossCome, { alpha: 0.1 }, 600, Laya.Ease.circIn, Laya.Handler.create(this, () => {
                this.BossCome.visible = false;
            }));
        }));

        //Laya.Tween.to(this.CamEffect,{x:54 }, 300, Laya.Ease.strongOut,Laya.Handler.create(this, () => {
        //    Laya.Tween.to(this.CamEffect, { alpha:0.1}, 600, Laya.Ease.circIn, Laya.Handler.create(this, () => {
        //        this.CamEffect.visible = false;
        //    }));
        //}));
    }


    //特效
    private _uiEffLayer: UIeffectLayer;
    //进入战斗场景的时候播特效
    public showUIEffect(): void {
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.addChild(this._uiEffLayer);
        }
        var point = GameUtils.getCenterScreenPos(280, 395);
        this._uiEffLayer.playEffect("ui_effect_9", point.x, point.y, false, 130);
    }


    public DisplayerText(mainType: number, subType: number) {
        if (mainType == BattleMainType.PVE) //1pve
        {
            switch (subType) {
                case PveBattleSubType.HangUp:
                    {
                        this.ExitBtn.visible = false;
                        if (SCopyData.instance.curCopyInfo && SCopyData.instance.curCopyInfo.isGrid) {
                            this.TopRight.visible = false;
                            this.progress.visible = false;
                            this.MapName.text = "";
                            this.DesTxt.text = "";
                        }
                        else {
                            this.TopRight.visible = true;
                            this.MapName.text = Astar.instance.MapName;
                            this.DesTxt.text = "";
                            this.progress.visible = false;
                        }
                        break;
                    }
                case PveBattleSubType.BOSS:
                    {
                        this.ExitBtn.visible = false;
                        this.TopRight.visible = true;
                        this.progress.visible = false;
                        if (SChapterData.instance.chapter.sheetChapterData)
                            this.MapName.text = `${SChapterData.instance.chapter.sheetChapterData.scene_name}${SChapterData.instance.chapter.sheetLevelData.desc}`;
                        this.DesTxt.y = 42;
                        if (SChapterData.instance.chapter.sheetChapterData) {
                            this.MapName.text = `${SChapterData.instance.chapter.sheetChapterData.scene_name}${SChapterData.instance.chapter.sheetLevelData.desc}`;
                        }
                        else {
                            this.MapName.text = `${Astar.instance.MapName}${SChapterData.instance.chapter.sheetLevelData.desc}`;
                        }
                        this.DesTxt.text = "奖励：银子、装备、经验";
                        break;
                    }
                case PveBattleSubType.ThreeDungeon:
                case PveBattleSubType.ZuoQiShiLian:
                    {
                        this.ExitBtn.visible = true;
                        this.TopRight.visible = true;
                        this.progress.visible = false;
                        if (SCopyData.instance.curCopyInfo) {
                            this.MapName.text = SCopyData.instance.curCopyInfo.name;
                        }
                        else
                            this.MapName.text = "无尽试炼";
                        this.DesTxt.text = `第${SNewBattleData.instance.BoWave}波`;
                        break;
                    }
                case PveBattleSubType.Dungeon:
                    {
                        this.ExitBtn.visible = false;
                        this.TopRight.visible = true;
                        this.progress.visible = false;
                        if (SChapterData.instance.chapter.sheetChapterData)
                            this.MapName.text = `${SChapterData.instance.chapter.sheetChapterData.scene_name}${SChapterData.instance.chapter.sheetLevelData.desc}`;
                        if (SCopyData.instance.isInCopy) {
                            if (SCopyData.instance.curCopyInfo.isPetCopy) {
                                this.MapName.text = "";
                                this.DesTxt.y = 72;
                                this.progress.visible = true;
                                this.progress && this.progress.updateBar(SNewBattleData.instance.currentRound, SNewBattleData.instance.currentMaxRound);
                                this.DesTxt.text = "奖励：" + SCopyData.instance.curCopyInfo.des;
                                this.progress.passName.text = SCopyData.instance.curCopyInfo.name;
                            }
                            else if (SCopyData.instance.curCopyInfo.isGrid) {
                                this.TopRight.visible = false;
                            }
                            else {
                                this.DesTxt.y = 42;
                                this.MapName.text = SCopyData.instance.curCopyInfo.name;
                                this.DesTxt.text = "奖励：" + SCopyData.instance.curCopyInfo.des;
                            }
                        }
                        else {
                            this.DesTxt.y = 42;
                            if (SChapterData.instance.chapter.sheetChapterData) {
                                this.MapName.text = `${SChapterData.instance.chapter.sheetChapterData.scene_name}${SChapterData.instance.chapter.sheetLevelData.desc}`;
                            }
                            else {
                                this.MapName.text = `${Astar.instance.MapName}${SChapterData.instance.chapter.sheetLevelData.desc}`;
                            }
                            this.DesTxt.text = "奖励：银子、装备、经验";
                        }

                        break;
                    }
                case PveBattleSubType.WoldBoss:
                    {
                        this.ExitBtn.visible = false;
                        this.DesTxt.y = 42;
                        this.progress.visible = false;
                        this.TopRight.visible = true;
                        this.MapName.text = SCopyData.instance.curCopyInfo.name;
                        this.DesTxt.text = "奖励：" + SCopyData.instance.curCopyInfo.des;
                        break;
                    }
                case PveBattleSubType.GuildBoss:
                    {
                        this.ExitBtn.visible = false;
                        this.DesTxt.y = 42;
                        this.progress.visible = false;
                        this.TopRight.visible = true;
                        this.MapName.text = SCopyData.instance.curCopyInfo.name;
                        this.DesTxt.text = "奖励：" + SCopyData.instance.curCopyInfo.des;
                        break;
                    }
                case PveBattleSubType.Chaos:
                    {
                        this.ExitBtn.visible = false;
                        this.DesTxt.y = 42;
                        this.progress.visible = false;
                        this.TopRight.visible = false;
                        break;
                    }
                case PveBattleSubType.Grid:
                    {
                        this.ExitBtn.visible = false;
                        this.TopRight.visible = false;
                        this.progress.visible = false;
                        this.MapName.text = "";
                        this.DesTxt.text = "";
                        break;
                    }
                case PveBattleSubType.OffLineArena:
                    {
                        this.ExitBtn.visible = false;
                        this.TopRight.visible = true;
                        this.progress.visible = false;
                        this.MapName.text = "天梯赛";
                        this.DesTxt.text = "奖励：经验、竞技币、绑元";
                        break;
                    }
                case PveBattleSubType.Wudaohui:
                    {
                        this.ExitBtn.visible = false;
                        this.TopRight.visible = true;
                        this.progress.visible = false;
                        this.MapName.text = "武道会";
                        this.DesTxt.text = "";
                        break;
                    }
                default:
                    {
                        this.ExitBtn.visible = false;
                        this.DesTxt.y = 42;
                        this.progress.visible = false;
                        this.TopRight.visible = true;
                        this.MapName.text = "";
                        this.DesTxt.text = "";
                        break;
                    }
            }
        }
        else {
            this.ExitBtn.visible = false;
            this.progress.visible = false;
            switch (subType) {
                case PvpBattleSubType.Chaos:
                    {
                        this.TopRight.visible = false;
                        break;
                    }
                case PvpBattleSubType.Wudaohui:
                    {
                        this.TopRight.visible = true;
                        this.MapName.text = "武道会";
                        this.DesTxt.text = "";
                        break;
                    }
                case PvpBattleSubType.OffLineArena:
                    {
                        this.TopRight.visible = true;
                        this.MapName.text = "天梯赛";
                        this.DesTxt.text = "奖励：经验、竞技币、绑元";
                        break;
                    }
                case PvpBattleSubType.Dart:
                    {
                        this.TopRight.visible = true;
                        this.MapName.text = "仙界运镖";
                        this.DesTxt.text = "奖励：银子、帮贡、坐骑材料";
                        break;
                    }
                default:
                    {
                        this.TopRight.visible = true;
                        this.MapName.text = "";
                        this.DesTxt.text = "";
                        break;
                    }
            }
        }
    }

    public checkAutoFight() {
        //默认都是自动战斗 如果玩家把LocalStorage清掉了也是自动 只有玩家手动取消才会设置
        this.AutoCheck.selected = Laya.LocalStorage.getItem("autoFight") == "true" ? true : false;

        // if (this.AutoCheck.selected == false) {
        //     this.AutoCheck.selected = true;
        //     Laya.LocalStorage.setItem("autoFight", this.AutoCheck.selected.toString());
        // }
        this.onAutoFight();
    }

    public initEvent(): void {
        this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        this.ExitBtn.on(Laya.Event.CLICK, this, this.onExitBtn);
        this.AutoCheck.on(Laya.Event.CHANGE, this, this.onAutoFight);
    }

    public removeEvent(): void {
        this.mTab.off(Laya.Event.CHANGE, this, this.onTabChange);
        this.ExitBtn.off(Laya.Event.CLICK, this, this.onExitBtn);
        this.AutoCheck.off(Laya.Event.CHANGE, this, this.onAutoFight);
    }

    private onExitBtn(): void {
        if (SNewBattleData.instance.CurrentBattleType == BattleMainType.PVE &&
            (SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.ThreeDungeon || SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.ZuoQiShiLian)) {
            Alert.show("退出后将消耗本次副本次数，确定要现在退出副本？", this, () => {
                CommonControl.instance.ExitThreeCopy();
            }, null, null, null, true);
        }
    }

    public UpdateTime(time: number) {
        if (time == 0) {
            this.txtLayer.clear();
        }
        else {
            var offsetX = 44;
            if (time < 10) {
                offsetX = 42;
            }
            this.txtLayer.showText(time + "", ResUtils.daojishi, "battle/daojishi/", this.AutoCheck.x + offsetX - this.stage.width / 2, this.AutoCheck.y + 44);
        }


    }


    private onAutoFight() {
        if (this.AutoCheck.selected) {
            SNewBattleData.instance.autoBo();
        }
        else {

        }
        this.showOperate(!this.AutoCheck.selected);
        Laya.LocalStorage.setItem("autoFight", this.AutoCheck.selected.toString());
    }
    //显示/隐藏操作面板
    public showOperate(value: boolean): void {
        if (SNewBattleData.instance.battleState == BattleState.REPORT_PLAYING) {
            this.hide(false);
            return;
        }
        this.hide(value);
    }

    public showJiaobiao(): void {
        var mainInfo: FightInfo[] = SNewBattleData.instance.getFightSelfBosInfo();
        if (!mainInfo.length) {
            this.jiaobiao.visible = false;
            return;
        }
        var currentInfo: FightInfo = null;
        for (let i = 0; i < mainInfo.length; i++) {
            const info = mainInfo[i];
            var has = SNewBattleData.instance.getFightBuffHasSleep(info.boid);
            if (!info.isFlg && info.dead != DEAD_TYPE.DISAPPEAR) {
                if (has) {
                    SNewBattleData.instance.protocol.send20029(info.boid);
                    continue;
                }
                this.jiaobiao.visible = false;
                currentInfo = info;
                break;
            }
        }
        if (!currentInfo) {
            this.hide(true);
            return;
        }
        this.jiaobiao.visible = true;
        var isPlayer: boolean = currentInfo.isPlayer;
        var ispet: boolean = currentInfo.isPet;
        isPlayer && (this.jiaobiao.skin = "battle/playFlg.png");
        ispet && (this.jiaobiao.skin = "battle/petFlg.png");
    }

    public hide(value: boolean): void {
        this.operate && (this.operate.visible = value);


    }

    private onTabChange(index: number, btn: Laya.Button) {
        if (this.AutoCheck.selected) return;//自动战斗，不给操作
        btn.selected = false;
        switch (index) {
            case 0://技能按钮
                this.onSkill();
                break;
            case 1://逃跑按钮
                break;
            case 2://召唤按钮
                break;
            case 3:
                break;
            case 4://防御按钮
                break;
            case 5://保护按钮
                break;
        }
    }

    private onSkill(): void {
        //    console.log(SBattleData.instance.skilInfo);
        if (UIManager.instance.hasOpenUI(UIID.SKILL_PANEL)) {
            UIManager.instance.closeUI(UIID.SKILL_PANEL);
        }
        else UIManager.instance.openUI(UIID.SKILL_PANEL);
    }

    public removeSelf(): any {
        //this.removeEvent();
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        super.removeSelf();
    }
}