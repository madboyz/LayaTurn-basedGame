import { MainButtom } from './MainButtom';
import { SRoleData } from './../../../../../net/data/SRoleData';
import { SChatEvent } from "../../../../../net/data/SChatData";
import { MainLeft } from './MainLeft';
import { Sys_openVo } from '../../../../../db/sheet/vo/Sys_openVo';
import { Delay } from '../../../../../framework/utils/Delay';
import { SChapterData } from '../../../../chapter/SChapterData';
import { GameUtils } from '../../../../utils/GameUtils';
import { SGameData, SGameEvent } from '../../../../../net/data/SGameData';
import { SAoiData, SAoiEvent } from '../../../../aoi/SAoiData';
import { Astar } from '../../../../../framework/utils/Astar';
import { AwardUtil } from '../../../../award/AwardUtil';
import { SChaosBattleData } from '../../../../activity/data/SChaosBattleData';
import { MsgManager } from '../../../manager/MsgManager';
import { UIeffectLayer } from '../../../../battle/scene/layer/UIeffectLayer';
import { SdkManager } from '../../../../../net/SdkManager';
import { HtmlUtils } from '../../../../utils/HtmlUtils';
import { FactionVo } from '../../../../../db/sheet/vo/FactionVo';
import { GameScene } from '../../../../battle/scene/GameScene';
import { SceneManager, SceneType } from '../../../../battle/scene/SceneManager';
import { SGuildData } from '../../guild/data/SGuildData';
import { ConstVo } from '../../../../../db/sheet/vo/ConstVo';
import { SBagData } from '../../../../../net/data/SBagData';
import { SRechargeData } from '../../recharge/data/SRechargeData';
import { SCopyData, SCopyEvent } from '../../../../../net/data/SCopyData';
import { SNewBattleData } from '../../../../../net/data/SNewBattleData';
export enum BossBtnState {
    Challenge = 0,
    UnChallenge,
    GetAward,
    NewChapter,
}

export class HudMainPanel extends ui.main.HudMainPageUI {
    private btnButtom: MainButtom;
    public btnLeft: MainLeft;
    private time: number = 0;
    private bossBtnState: BossBtnState = BossBtnState.Challenge;
    constructor() {
        super();
        this.layer = UILEVEL.POP_1;
        this.sameLevelEliminate = false;
        this.isFullScreen = true;
        this.mResouce = [

            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.initButtom();
        this.updateHead();
        this.updateExp();
        this.updateMoney();
        this.updadeLevel();
        this.updateCombat();
        this.updateName();
        this.updateVipInfo();
        this.updateFuncOpen();
        this.updateBossBtn();
        this.onUpdateFightState();
        this.SceneUpdate(0);
        this.btnLeft.onlineReward()
        this.btnLeft.updateTeam();
        if (SRoleData.instance.info)
            this.LocalplayerPos(0, SRoleData.instance.info.X, SRoleData.instance.info.Y);
        this.mouseThrough = true;
        this.showMsg();
        this.updateAutoBoss();
    }
    private initButtom() {
        this.btnButtom = new MainButtom();
        this.addChild(this.btnButtom);

        this.btnLeft = new MainLeft();
        this.addChild(this.btnLeft);

        this.combat.url = "res/atlas/number/fight.atlas";
        this.combat.scale(0.5, 0.5);

        UIManager.instance.closeUI(UIID.SELECT_ROLE);//获得人物简要信息后关闭选择角色界面

        UIManager.instance.openUI(UIID.CHAT);//聊天
    }
    public update() {
        super.update();
        this.updateHead();
        this.updateExp();
        this.updateMoney();
        this.updadeLevel();
        this.updateCombat();
        this.updateName();
        this.updateVipInfo();
        this.updateFuncOpen();
        this.updateBossBtn();
        this.onUpdateFightState();
        this.showMsg();
        this.updateAutoBoss();
    }

    private showMsg(): void {
        // Laya.timer.once(5000,this,()=>{
        //     for (let index = 0; index < 50; index++) {
        //         MsgManager.instance.showRollTipsMsg("我是tellme");
        //     }
        // });
    }

    public open(...args): void {
        super.open();
    }

    public initEvent(): void {
        this.btn_world.on(Laya.Event.CLICK, this, this.onWorldBtn, [false]);
        this.BossBtn.on(Laya.Event.CLICK, this, this.onBossBtn);
        this.AutoBoss.on(Laya.Event.CLICK, this, this.onAutoBtn);
        this.btn_addGold.on(Laya.Event.CLICK, this, this.addGoldClick);
        this.funcOpenBox.on(Laya.Event.CLICK, this, this.funcOpenBoxClick);
        this.headImg.on(Laya.Event.CLICK, this, this.onClickHead)
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
        SCopyData.instance.on(SCopyEvent.COPY_ENTER_BACK, this, this.onUpdateFightState);
        SCopyData.instance.on(SCopyEvent.COPY_EXIT_BACK, this, this.onUpdateFightState);
        SAoiData.instance.on(SAoiEvent.AOI_REQUSET_INFO, this, this.SceneUpdate);
        SAoiData.instance.on(SAoiEvent.LOCAL_PLAYER_REQUEST_MOVE, this, this.LocalplayerPos);

    }

    public removeEvent(): void {
        this.btn_world.off(Laya.Event.CLICK, this, this.onWorldBtn);
        this.BossBtn.off(Laya.Event.CLICK, this, this.onBossBtn);
        this.AutoBoss.off(Laya.Event.CLICK, this, this.onAutoBtn);
        this.btn_addGold.off(Laya.Event.CLICK, this, this.addGoldClick);
        this.funcOpenBox.off(Laya.Event.CLICK, this, this.funcOpenBoxClick);
        this.headImg.off(Laya.Event.CLICK, this, this.onClickHead)
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
        SCopyData.instance.off(SCopyEvent.COPY_ENTER_BACK, this, this.onUpdateFightState);
        SCopyData.instance.off(SCopyEvent.COPY_EXIT_BACK, this, this.onUpdateFightState);
        SAoiData.instance.off(SAoiEvent.AOI_REQUSET_INFO, this, this.SceneUpdate);
        SAoiData.instance.off(SAoiEvent.LOCAL_PLAYER_REQUEST_MOVE, this, this.LocalplayerPos);
    }

    private testpay() {
        //SdkManager.instance.Pay(1, 1);
    }

    private onClickHead(): void {
        UIManager.instance.openUI(UIID.SYS_LOCAL_PLAYER_PANEL);
    }

    public updateHead(): void {
        if (SRoleData.instance.info) {
            this.headImg.skin = FactionVo.get(SRoleData.instance.info.Faction).head_icon[SRoleData.instance.info.Sex - 1];
        }
    }

    public updateExp(): void {
        if (SRoleData.instance.info) {
            var value: number = SRoleData.instance.info.Exp / SRoleData.instance.info.ExpLim;
            var pecent: number = Math.floor(value * 100);
            this.exp.value = value;
            this.txt_exp.text = `${(pecent)}%`;
        }
    }
    public updateMoney(): void {
        this.txt_gold.text = GMath.GetChineseNumber(SRoleData.instance.info.Yuanbao);
        this.txt_silver.text = GMath.GetChineseNumber(SRoleData.instance.info.BindGameMoney);
        this.txt_point.text = GMath.GetChineseNumber(SRoleData.instance.info.BindYuanbao);
    }

    public updadeLevel(): void {
        if (SRoleData.instance.info) {
            this.txt_level.text = "Lv." + SRoleData.instance.info.Lv;
            this.updateSystemOpen();
        }
    }

    public updateSystemOpen(): void {
        this.btnLeft.updateLayout();
    }

    private autoMoveAnim: UIeffectLayer;

    public updateAutoMoveAnim(isStart: boolean): void {
        if (!this.autoMoveAnim) {
            this.autoMoveAnim = new UIeffectLayer;
            this.addChild(this.autoMoveAnim);
            var point = GameUtils.getCenterScreenPos(278, 250);
            this.autoMoveAnim.playEffect("ui_effect_19", point.x, point.y, true, 130);
        }
        if(this.autoMoveAnim.visible != isStart)
        this.autoMoveAnim.visible = isStart;

    }

    public updateCombat(): void {
        if (SRoleData.instance.info) {
            this.combat.text = SRoleData.instance.info.BattlePower.toString();
        }
    }

    public updateName(): void {
        this.txt_name.text = SRoleData.instance.roleName;
    }

    public updateVipInfo(): void {
        // this.txt_vip.text = `VIP ${SRoleData.instance.playerInfo.VipLv}`;
    }

    private _funcOpenImg: Laya.Image;
    private _funcEff: UIeffectLayer;
    // private _funcUiEffLayer: UIeffectLayer;
    private _lastNextCfg: Sys_openVo;
    public updateFuncOpen(): void {
        var nextCfg = Sys_openVo.nextFuncCfg(SRoleData.instance.info.Lv)
        if (!nextCfg) {
            this.funcOpenBox.mouseThrough = true;
            this.funcOpenLb.visible = this.funcOpenBg1.visible = this.funcOpenBg2.visible = false;
            // if (this._funcUiEffLayer) {
            //     this._funcUiEffLayer.destroy();
            //     this._funcUiEffLayer = null;
            // }
        }
        if (this._lastNextCfg == nextCfg) {
            return;
        }
        this._lastNextCfg = nextCfg;
        if (this._funcEff) {
            this._funcEff.destroy();
            this._funcEff = null;
        }
        if (this._funcOpenImg) {
            this._funcOpenImg.removeSelf();
            this._funcOpenImg = null;
        }
        if (!nextCfg) {
            return;
        }
        // if (!this._funcUiEffLayer) {
        //     this._funcUiEffLayer = new UIeffectLayer;
        //     this.funcOpenBox.addChild(this._funcUiEffLayer);
        //     var eff = this._funcUiEffLayer.playEffect("ui_effect_21", 80, 86, true);
        //     eff.scaleX = eff.scaleY = 0.6;
        // }
        var res = nextCfg.res[(nextCfg.res.length > 1 ? (SRoleData.instance.info.Faction - 1) : 0)];
        if (res[0] == 1) {
            if (!this._funcOpenImg) {
                this._funcOpenImg = new Laya.Image;
                this._funcOpenImg.anchorX = this._funcOpenImg.anchorY = 0.5;
                this._funcOpenImg.x = 80 + (res[2] || 0);
                this._funcOpenImg.y = 30 + (res[3] || 0);
                this._funcOpenImg.scaleX = this._funcOpenImg.scaleY = nextCfg.scale[0][0];
                // this.funcOpenBox.addChild(this._funcUiEffLayer);
                this.funcOpenBox.addChild(this._funcOpenImg);
            }
            this._funcOpenImg.skin = res[1];
        } else if (res[0] == 2) {
            if (!this._funcEff) {
                this._funcEff = new UIeffectLayer;
                // this.funcOpenBox.addChild(this._funcUiEffLayer);
                this.funcOpenBox.addChild(this._funcEff);
            }
            var eff = this._funcEff.playEffect(res[1] + "@@full", (80 + (res[2] || 0)), (-55 + (res[3] || 0)), true);
            eff.scaleX = eff.scaleY = nextCfg.scale[0][0];
        }
        this.funcOpenLb.style.align = "center";
        this.funcOpenLb.innerHTML = HtmlUtils.addColor(nextCfg.sys_name + "", "#d9e109", 18, "黑体") + "<br>" +
            HtmlUtils.addColor("角色", "#ffffff", 20, "黑体") +
            HtmlUtils.addColor(nextCfg.lv_need + "级", "#d9e109", 20, "黑体") +
            HtmlUtils.addColor("开启", "#ffffff", 20, "黑体")
    }

    private SceneUpdate(sceneId: any): void {
        if (isNaN(sceneId)) {

        }
        else {
            this.txt_senceName.text = Astar.instance.MapName;
        }
    }
    private LocalplayerPos(sceneId: number, x: number, y: number) {
        this.txt_pos.text = `(${x}.${y})`;
    }

    public onUpdateFightState(): void {
        //这里要做各种场景判断
        this.btnLeft.visible = true;
        this.btnLeft.leftBox.visible = true;
        this.btnLeft.leftBox.y = Laya.stage.height - 930 + 150;
        this.btnLeft.topBox.visible = true;

        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            var chaos = SChaosBattleData.instance.isChaoScene();
            if (chaos) {
                this.RightTop.visible = false;
                this.funcOpenBox.visible = false;
                this.BossBtn.visible = false;
                this.btnLeft.visible = false;
                UIManager.instance.closeUI(UIID.SYS_TASK);
                UIManager.instance.closeUI(UIID.GUILD_HUD);
            }
            else if (SceneManager.instance.CurrentType == SceneType.GridScene) {
                this.RightTop.visible = false;
                this.funcOpenBox.visible = false;
                this.BossBtn.visible = false;
                this.btnLeft.visible = false;
                UIManager.instance.closeUI(UIID.SYS_TASK);
                UIManager.instance.closeUI(UIID.GUILD_HUD);
            }
            else if (SGuildData.instance.isGuildScene()) {
                this.RightTop.visible = false;
                this.funcOpenBox.visible = true;
                this.BossBtn.visible = false;
                this.btnLeft.visible = true;
                UIManager.instance.closeUI(UIID.SYS_TASK);
                UIManager.instance.openUI(UIID.GUILD_HUD);
            }
            else {
                this.RightTop.visible = true;
                this.funcOpenBox.visible = true;
                this.BossBtn.visible = true;
                this.btnLeft.visible = true;
                UIManager.instance.openUI(UIID.SYS_TASK);
                UIManager.instance.closeUI(UIID.GUILD_HUD);
            }
            if (this.bossBtnState != BossBtnState.NewChapter) {
                this.updateBossBtn();
            }
        }
        else {
            if (SGuildData.instance.isGuildScene()) {
                this.btnLeft.visible = !SGameData.instance.PLAYFIGHTREPORT || SNewBattleData.instance.isHangUpBattle;
                this.RightTop.visible = false;
                this.funcOpenBox.visible = false;
                this.BossBtn.visible = false;
                UIManager.instance.closeUI(UIID.SYS_TASK);
                UIManager.instance.closeUI(UIID.GUILD_HUD);
            }
            else if (SNewBattleData.instance.isHangUpBattle) {
                this.btnLeft.visible = true;
                this.RightTop.visible = false;
                this.funcOpenBox.visible = false;
                this.BossBtn.visible = false;
                UIManager.instance.openUI(UIID.SYS_TASK);
                UIManager.instance.closeUI(UIID.GUILD_HUD);
            } else {
                this.btnLeft.visible = false;
                this.RightTop.visible = false;
                this.funcOpenBox.visible = false;
                this.BossBtn.visible = false;
                UIManager.instance.closeUI(UIID.SYS_TASK);
                UIManager.instance.closeUI(UIID.GUILD_HUD);
            }

        }

        this.AutoBoss.visible = this.BossBtn.visible;
        this.updateAutoBoss();

    }

    public NewChapter() {
        this.bossBtnState = BossBtnState.NewChapter;
        this.BossBtn.skin = "";
        // this.BossBtn.skin = "comp/touming.png";
        this.coolDownImg && this.coolDownImg.removeSelf();
        this.coolDownImg && (this.coolDownImg = null);
        this.showUIEffect(4);
    }

    public updateAutoBoss() {
        this.AutoBoss.label = SChapterData.instance.openAutoChapter ? "取消挑战" : "自动挑战";
        if (SChapterData.instance.openAutoChapter)
            this.AutoBoss.filters = [];
        else
            this.AutoBoss.createGrayFilter();
    }

    public updateBossBtn() {
        if (SChapterData.instance.chapter.chapterId == 0)
            return;
        if (SChapterData.instance.chapter.IsCanGetAward) {
            this.bossBtnState = BossBtnState.GetAward;
            this.BossBtn.skin = "";
            // this.BossBtn.skin = "comp/touming.png";
            this.coolDownImg && this.coolDownImg.removeSelf();
            this.coolDownImg && (this.coolDownImg = null);
            this.showUIEffect(3);
        }
        else {
            if (GameUtils.TimeStamp >= SChapterData.instance.chapter.lastPassLevelTime + SChapterData.instance.chapter.LevelCoolDown) {
                this.bossBtnState = BossBtnState.Challenge;
                this.BossBtn.skin = "";
                // this.BossBtn.skin = "comp/touming.png";
                this.coolDownImg && this.coolDownImg.removeSelf();
                this.coolDownImg && (this.coolDownImg = null);
                this.showUIEffect(1);
            }
            else {
                this.bossBtnState = BossBtnState.UnChallenge;
                this.BossBtn.skin = "main/btn_boss2.png";
                this.showUIEffect(2);
                var coolDown = SChapterData.instance.chapter.lastPassLevelTime + SChapterData.instance.chapter.LevelCoolDown - GameUtils.TimeStamp;
                this.updateBossBtnTime(coolDown);
            }
        }
    }

    //特效
    private _uiEffLayer: UIeffectLayer;
    //之前的BOSS类型
    private _lastType: number;
    //升级成功的时候，播放升级成功的特效 , type,1为挑战BOSS,2为不可挑战，3为领取宝箱，4位切换新地图
    public showUIEffect(type: number): void {
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.BossBtn.addChild(this._uiEffLayer);
        }
        if (this._lastType == type) {
            return;
        }
        this._lastType = type;
        this._uiEffLayer.clearEffect();
        if (type == 1) {
            this._uiEffLayer.playEffect("ui_effect_5", 67, 47, true);
        } else if (type == 3) {
            this._uiEffLayer.playEffect("ui_effect_16", 67, 47, true);
        } else if (type == 4) {
            this._uiEffLayer.playEffect("ui_effect_15", 67, 47, true);
        }
    }

    //挑战BOSS缓慢可以的图片
    private coolDownImg: Laya.Image;

    public async updateBossBtnTime(time: number = 30) {
        this.time = SChapterData.instance.chapter.lastPassLevelTime + SChapterData.instance.chapter.LevelCoolDown - GameUtils.TimeStamp;//time;
        if (time <= 0) {
            if (this.coolDownImg) {
                this.coolDownImg.removeSelf();
                this.coolDownImg = null;
            }
            this.updateBossBtn();
            return;
        } else {
            if (!this.coolDownImg) {
                this.coolDownImg = new Laya.Image;
                this.BossBtn.addChild(this.coolDownImg);
                this.coolDownImg.skin = "main/btn_boss1.png";
            }
            var starY = 94 * this.time / SChapterData.instance.chapter.LevelCoolDown;
            this.coolDownImg.y = starY;
            this.coolDownImg.scrollRect = new Laya.Rectangle(0, starY, 134, 94 - starY);
        }
        await Delay.delay(1000);
        this.time--;
        this.updateBossBtnTime(this.time);
    }

    private onWorldBtn(needGuide: boolean): void {
        UIManager.instance.openUI(UIID.SYS_CHAPTER_MAP, [needGuide]);//传true进去标识，打开面板需要指引新章节
    }



    private onAutoBtn(): void {
        var limt_open_lv = ConstVo.get("AUTO_FT").val;
        if (SRoleData.instance.info.Lv < limt_open_lv) {
            MsgManager.instance.showRollTipsMsg(`${limt_open_lv}级开启该功能`);
            return;
        }
        if (SRoleData.instance.info.TeamId != 0) {
            MsgManager.instance.showRollTipsMsg("组队状态下无法自动挑战!");
            return;
        }
        if (SGameData.instance.PLAYFIGHTREPORT)
            return;
        if (SChapterData.instance.chapter.chapterId == 0)
            return;
        if (SChapterData.instance.chapter.IsCanGetAward) {
            MsgManager.instance.showRollTipsMsg("请先领取奖励才能自动挑战");
            return;
        }
        if (SBagData.instance.equip.itemLength >= SBagData.instance.equip.capacity) {
            MsgManager.instance.showRollTipsMsg("背包已满");
            return;
        }
        var lv = SRoleData.instance.info.Lv;
        if (lv < SChapterData.instance.chapter.sheetChapterData.lv_limit) {
            MsgManager.instance.showRollTipsMsg(`需要等级${SChapterData.instance.chapter.sheetChapterData.lv_limit}级才可以挑战！`);
            return;
        }
        SChapterData.instance.openAutoChapter = !SChapterData.instance.openAutoChapter;
        if (!SChapterData.instance.openAutoChapter)
            SChapterData.instance.isSendAutoBoss = false;//容错
        this.updateAutoBoss();
    }

    private onBossBtn(): void {
        if (this.bossBtnState == BossBtnState.UnChallenge || this.bossBtnState == BossBtnState.Challenge) {
            UIManager.instance.openUI(UIID.SYS_CHALLENGE_BOSS);
        }
        else if (this.bossBtnState == BossBtnState.GetAward) {
            var awardId = SChapterData.instance.chapter.CurrentChapterAwardId;
            var goodsList = AwardUtil.GetNormalGoodsList(awardId);
            UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [0, goodsList, false]);
            //SChapterData.instance.RequestGetChapterAward();
        }
        else if (this.bossBtnState == BossBtnState.NewChapter) {
            this.onWorldBtn(true);
            this.updateBossBtn();
        }
        else {
            UIManager.instance.openUI(UIID.SYS_CHALLENGE_BOSS);
            this.updateBossBtn();
        }
    }

    private funcOpenBoxClick(): void {
        UIManager.instance.openUI(UIID.SYS_FUNC_OPEN);
    }

    private addGoldClick(): void {
        SRechargeData.instance.checkOpenRecharge();
    }

    public close(): void {
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
            this._lastType = null;
        }
        if (this._funcEff) {
            this._funcEff.destroy();
            this._funcEff = null;
        }
        // if (this._funcUiEffLayer) {
        //     this._funcUiEffLayer.destroy();
        //     this._funcUiEffLayer = null;
        // }
        if (this.autoMoveAnim) {
            this.autoMoveAnim.destroy();
            this.autoMoveAnim = null;
        }
        super.close();
    }
}