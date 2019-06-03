import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { FightMonsterView } from "../../../../../battle/role/fight/FightMonsterView";
import { MsgManager } from "../../../../manager/MsgManager";
import { SBossData, SBossEvent } from "../data/SBossData";
import { DataManager } from "../../../../../../message/manager/DataManager";
import { RankType } from "../../../rank/panel/RankMainPanel";
import { S22001 } from "../../../../../../net/pt/pt_22";
import { RankMainProrocol } from "../../../rank/protocol/RankMainProrocol";
import { UIeffectLayer } from "../../../../../battle/scene/layer/UIeffectLayer";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { ProgressBar } from "../../../../compent/ProgressBar";
import { AwardUtil } from "../../../../../award/AwardUtil";
import { S57029_2 } from "../../../../../../net/pt/pt_57";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { CommonControl } from "../../../../../common/control/CommonControl";
import { SRechargeData } from "../../../recharge/data/SRechargeData";

export class SanjieCopyPanel extends ui.main.SanjieCopyPanelUI {
    private stage1: SanjieCopyItem;
    private stage2: SanjieCopyItem;
    private stage3: SanjieCopyItem;
    private proBar: ProgressBar;

    constructor() {
        super();
    }

    public initComp(): void {
        this.initEvent();
        this.initList();
        this.initProgressBar();
        this.requestInfo();

        this.onOpen();
    }

    private initList(): void {
        if (!this.stage1) {
            this.stage1 = new SanjieCopyItem;
            this.stage1.x = 72;
            this.stage1.y = 264;
            this.addChild(this.stage1);
        }
        if (!this.stage2) {
            this.stage2 = new SanjieCopyItem;
            this.stage2.x = 225;
            this.stage2.y = 264;
            this.addChild(this.stage2);
        }
        if (!this.stage3) {
            this.stage3 = new SanjieCopyItem;
            this.stage3.x = 378;
            this.stage3.y = 264;
            this.addChild(this.stage3);
        }
        this.txt_rank.underline = true;
        HtmlUtils.setHtml(this.talkLb.style, 3, 18, "center", "middle")
        this.talkLb.color = "#8e5213";
    }

    private initProgressBar(): void {
        this.proBar = new ProgressBar();
        this.proBar.setGrid("10,15,10,15", "5,8,5,8");
        this.proBar.setBg(ResUtils.getCompUIUrl("barbg"), ResUtils.getCompUIUrl("bar"), 460, 25, 6, 4, 5, 6);
        this.proBar.setLabel(0, 20, "#ffffff", 0, 100, 2);
        this.proBar.x = 0;
        this.proBar.y = 40;
        this.proBox.addChildAt(this.proBar, 0);
    }

    private requestInfo(): void {
        (new RankMainProrocol()).RequsetRank(RankType.SANJIE, 4, 1);
    }

    private initEvent(): void {
        DataManager.listen(PROTOCOL.E22001, this, this.onS22001);//个人排行榜
        SBossData.instance.on(SBossEvent.SANJIE_COPY_INFO, this, this.updateData);

        this.txt_rank.on(Laya.Event.CLICK, this, this.rankTxtClick);
        this.box1.on(Laya.Event.CLICK, this, this.boxClick, [0]);
        this.box2.on(Laya.Event.CLICK, this, this.boxClick, [1]);
        this.box3.on(Laya.Event.CLICK, this, this.boxClick, [2]);
        this.stageBtnL.on(Laya.Event.CLICK, this, this.stageBtnLClick);
        this.stageBtnR.on(Laya.Event.CLICK, this, this.stageBtnRClick);
        this.boxBtnL.on(Laya.Event.CLICK, this, this.boxBtnLClick);
        this.boxBtnR.on(Laya.Event.CLICK, this, this.boxBtnRClick);
        this.btn_enter.on(Laya.Event.CLICK, this, this.btn_enterClick);
        this.btn_sweep.on(Laya.Event.CLICK, this, this.btn_sweepClick);
    }

    private removeEvent(): void {
        DataManager.cancel(PROTOCOL.E22001, this, this.onS22001);//个人排行榜
        SBossData.instance.off(SBossEvent.SANJIE_COPY_INFO, this, this.updateData);

        this.txt_rank.on(Laya.Event.CLICK, this, this.rankTxtClick);
        this.box1.on(Laya.Event.CLICK, this, this.boxClick, [0]);
        this.box2.on(Laya.Event.CLICK, this, this.boxClick, [1]);
        this.box3.on(Laya.Event.CLICK, this, this.boxClick, [2]);
        this.stageBtnL.off(Laya.Event.CLICK, this, this.stageBtnLClick);
        this.stageBtnR.off(Laya.Event.CLICK, this, this.stageBtnRClick);
        this.boxBtnL.off(Laya.Event.CLICK, this, this.boxBtnLClick);
        this.boxBtnR.off(Laya.Event.CLICK, this, this.boxBtnRClick);
        this.btn_enter.off(Laya.Event.CLICK, this, this.btn_enterClick);
        this.btn_sweep.off(Laya.Event.CLICK, this, this.btn_sweepClick);
    }

    public onOpen(): void {
        this.cfgs = FbVo.getListByType(CopyType.SANJIE_COPY);
        this.boxCfgs = [];
        for (let i = 0; i < this.cfgs.length; i++) {
            const element = this.cfgs[i];
            if (element.box_rewards && element.box_rewards.length > 0) {
                this.boxCfgs.push(element);
            }
        }
        this.nowDunNo = SBossData.instance.sanjieDunChapInfo.DunNo - 23001;
        this.maxPassLb.text = (this.nowDunNo > 0 ? "最大通关" + this.nowDunNo + "层" : "");
        var haveYueka = SRechargeData.instance.haveYueka();
        this.btn_sweep.label = haveYueka ? "一键扫荡" : "扫荡";
        //刷新模型
        var useCfg: FbVo;
        for (let i = 0; i < this.cfgs.length; i++) {
            if (this.cfgs[i].no >= SBossData.instance.sanjieDunChapInfo.DunNo && this.cfgs[i].resource && this.cfgs[i].resource.length > 0) {
                useCfg = this.cfgs[i];
                break;
            }
        }
        this.updateIcon(useCfg);

        //初始化选择
        this.selectDunNo = SBossData.instance.getMaxCanFightDunNo();
        this.selectDunNoPage = this.getMaxPageIndex();
        this.selectBoxPage = this.getMaxBoxPageIndex();


        this.updateData();
    }


    private cfgs: FbVo[];//三界副本类型表
    private boxCfgs: FbVo[];//有宝箱的对应奖励列表

    private nowDunNo: number;//已经通关的最大副本
    public selectDunNo: number = -1;
    private selectDunNoPage: number = -1;
    private selectBoxPage: number = -1;



    public updateData(): void {
        this.stage1.dataSource = this.cfgs[this.selectDunNoPage * 3 + 0];
        this.stage2.dataSource = this.cfgs[this.selectDunNoPage * 3 + 1];
        this.stage3.dataSource = this.cfgs[this.selectDunNoPage * 3 + 2];
        //按钮相关禁用
        this.stageBtnL.gray = this.selectDunNoPage <= 0;
        var maxStage = this.getMaxNoPassPageIndex() + 1;
        this.stageBtnR.gray = this.selectDunNoPage >= maxStage;
        this.boxBtnL.gray = this.selectBoxPage <= 0;
        var maxBoxPage = this.getMaxBoxcanSeePage();
        this.boxBtnR.gray = this.selectBoxPage >= maxBoxPage;

        //进度条
        this.proBar.setValue(5, 100);
        //打相关按钮
        var info: S57029_2 = SBossData.instance.getSanjieDunInfo(this.selectDunNo);
        var noFirst = !info || info.pass != 1;//类型1，表示首通过
        var killed = info && info.times > 0;//次数大于1，表示打过
        this.btn_enter.gray = killed;
        this.btn_sweep.gray = noFirst || killed;

        //刷新宝箱相关问题========
        var widthList = [0, 74, 231, 386, 460];
        var showW = 0;
        for (let i = 0; i <= 3; i++) {
            var startCfg = this.boxCfgs[this.selectBoxPage * 3 + i - 1];
            var starCount = startCfg != null ? (startCfg.no - 23000) : 0;
            var endCfg = this.boxCfgs[this.selectBoxPage * 3 + i];
            var endCount = endCfg != null ? (endCfg.no - 23000) : 10000;
            var nowCount = SBossData.instance.sanjieDunChapInfo.DunNo - 23001;
            if (nowCount < starCount) {
                break;
            } else if (nowCount >= endCount) {
                showW = widthList[i + 1];
            } else if (nowCount >= starCount && nowCount < endCount) {
                showW = (nowCount - starCount) / (endCount - starCount) * (widthList[i + 1] - widthList[i]) + widthList[i];
            }
        }
        this.proBar.setValue(showW, 460);
        for (let i = 1; i <= 3; i++) {
            var boxImg: Laya.Image = this["box" + i];
            var getImg: Laya.Image = this["getImg" + i];
            var boxStage1: Laya.Text = this["boxStage" + i];
            var cfg = this.boxCfgs[this.selectBoxPage * 3 + i - 1];
            boxImg.visible = getImg.visible = boxStage1.visible = cfg != null;
            if (cfg) {
                var info = SBossData.instance.getSanjieDunInfo(cfg.no);
                var canGet = (SBossData.instance.sanjieDunChapInfo.DunNo - 1) >= cfg.no;
                var hadGet = info && info.RwdState == 3;
                boxStage1.text = (cfg.no - 23000) + "层";
                if (!canGet) {
                    boxImg.skin = "copy/b_0.png";
                    getImg.visible = false;
                } else if (hadGet) {
                    boxImg.skin = "copy/b_2.png";
                    getImg.visible = true;
                } else {
                    boxImg.skin = "copy/b_1.png";
                    getImg.visible = false;
                }
            }

        }


    }



    public dunClick(dunNo: number): void {
        this.selectDunNo = dunNo;
        this.updateData();
    }

    private getMaxPageIndex(): number {
        var fightIndex = SBossData.instance.getMaxCanFightIndex();
        return Math.floor(fightIndex / 3);
    }

    private getMaxNoPassPageIndex(): number {
        var noPassIndex = SBossData.instance.getMaxNoPassIndex();
        return Math.floor(noPassIndex / 3);
    }

    private getMaxBoxPageIndex(): number {
        var maxBoxIndex: number = 0;
        for (let i = 0; i < this.boxCfgs.length; i++) {
            var ele = this.boxCfgs[i];
            var info = SBossData.instance.getSanjieDunInfo(ele.no);
            if (!info || info.RwdState != 3) {
                maxBoxIndex = i;
                break;
            }
        }
        return Math.floor(maxBoxIndex / 3);
    }

    private getMaxBoxcanSeePage(): number {
        var maxBoxIndex: number = 0;
        for (let i = 0; i < this.boxCfgs.length; i++) {
            var ele = this.boxCfgs[i];
            if (ele.no >= SBossData.instance.sanjieDunChapInfo.DunNo) {
                maxBoxIndex = i;
                break;
            }
        }
        return Math.floor(maxBoxIndex / 3);
    }


    //模型显示

    //ICON特效或图片显示
    private _funcOpenImg: Laya.Image;
    private _funcEff: UIeffectLayer;
    public updateIcon(cfg: FbVo): void {
        if (this._funcEff) {
            this._funcEff.destroy();
            this._funcEff = null;
        }
        if (this._funcOpenImg) {
            this._funcOpenImg.removeSelf();
            this._funcOpenImg = null;
        }
        this.iconTipsBox.visible = cfg != null;
        if (cfg) {
            var res = cfg.resource[(cfg.resource.length > 1 ? (SRoleData.instance.info.Faction - 1) : 0)];
            if (res[0] == 1) {
                if (!this._funcOpenImg) {
                    this._funcOpenImg = new Laya.Image;
                    this._funcOpenImg.anchorX = this._funcOpenImg.anchorY = 0.5;
                    this._funcOpenImg.x = 70 + (res[2] || 0);
                    this._funcOpenImg.y = 70 + (res[3] || 0);
                    this.funcOpenBox.addChild(this._funcOpenImg);
                }
                this._funcOpenImg.skin = res[1];
            } else if (res[0] == 2) {
                if (!this._funcEff) {
                    this._funcEff = new UIeffectLayer;
                    this.funcOpenBox.addChild(this._funcEff);
                }
                this._funcEff.playEffect(res[1] + "@@full", (70 + (res[2] || 0)), (0 + (res[3] || 0)), true);
            }
            this.talkLb.innerHTML = HtmlUtils.showColorStr(cfg.desc, 35);
        }
    }


    //排行榜------------
    private onS22001(data: S22001) {
        if (data.RankType == RankType.SANJIE) {
            this.updateRank(data);
        }
    }
    public updateRank(data: S22001): void {
        if (data.item_1.length > 0) {
            this.rankBox.visible = true;
            for (let i = 0; i < 3; i++) {
                var cell = data.item_1[i];
                var rankLb = this["rank" + (i + 1)] as Laya.Text;
                var rankNoLb = this["rankNo" + (i + 1)] as Laya.Text;
                if (cell) {
                    rankLb.text = (i + 1) + "." + cell.PlayerName;
                    rankNoLb.text = "第" + cell.item_1[0].Value + "层";
                } else {
                    rankLb.text = "";
                    rankNoLb.text = "";
                }
            }
        } else {
            this.rankBox.visible = false;
        }
    }


    public rankTxtClick(): void {
        UIManager.instance.openUI(UIID.SANJIE_RANK_PANEL);
    }

    public boxClick(index: number): void {
        var useCfg = this.boxCfgs[this.selectBoxPage * 3 + index];
        UIManager.instance.openUI(UIID.COM_SHOW_REWARD, [
            AwardUtil.GetNormalGoodsList(useCfg.box_rewards),//奖励
            null,//点击确定的方法
            "通关奖励",//一级标题
            "第" + (useCfg.no - 23000) + "层通关奖励",//二级标题
            "确定",//确定按钮名字
        ]);

        var info = SBossData.instance.getSanjieDunInfo(useCfg.no);
        var canGet = (SBossData.instance.sanjieDunChapInfo.DunNo - 1) >= useCfg.no;
        var hadGet = info && info.RwdState == 3;

        if (!canGet) {
            MsgManager.instance.showRollTipsMsg("通关该关卡后可领取该奖励");
        } else if (hadGet) {
            MsgManager.instance.showRollTipsMsg("已领取该关卡奖励");
        } else {
            SBossData.instance.protocol.send57031(useCfg.no);
        }

    }

    private stageBtnLClick(): void {
        this.selectDunNoPage -= 1;
        this.updateData();
    }

    private stageBtnRClick(): void {
        this.selectDunNoPage += 1;
        this.updateData();
    }

    private boxBtnLClick(): void {
        this.selectBoxPage -= 1;
        this.updateData();
    }

    private boxBtnRClick(): void {
        this.selectBoxPage += 1;
        this.updateData();
    }

    private btn_enterClick(): void {
        if (this.selectDunNo > SBossData.instance.sanjieDunChapInfo.DunNo) {
            MsgManager.instance.showRollTipsMsg("请先通关前置关卡");
            return;
        }
        SCopyData.instance.copyType = CopyType.SANJIE_COPY;
        CommonControl.instance.EnterCopy(this.selectDunNo);
    }

    private btn_sweepClick(): void {
        if (this.selectDunNo > SBossData.instance.sanjieDunChapInfo.DunNo) {
            MsgManager.instance.showRollTipsMsg("请先通关前置关卡");
            return;
        }
        SCopyData.instance.copyType = CopyType.SANJIE_COPY;
        var haveYueka = SRechargeData.instance.haveYueka();
        if (haveYueka) {
            SCopyData.instance.oneKeyShaodang(CopyType.SANJIE_COPY);
        } else {
            SBossData.instance.protocol.send57030(this.selectDunNo);
        }
    }


    public removeSelf(): any {
        if (this._funcEff) {
            this._funcEff.destroy();
            this._funcEff = null;
        }
        if (this._funcOpenImg) {
            this._funcOpenImg.removeSelf();
            this._funcOpenImg = null;
        }
        this.stage1 && this.stage1.destroy();
        this.stage1 = null;
        this.stage2 && this.stage2.destroy();
        this.stage2 = null;
        this.stage3 && this.stage3.destroy();
        this.stage3 = null;
        this.removeEvent();
        super.removeSelf();
    }
}




//道具的奖励ITEM
export class SanjieCopyItem extends ui.main.SanjieCopyItemUI {
    private _mData: FbVo;
    private role: FightMonsterView;

    constructor() {
        super();
        this.initRole();
        this.on(Laya.Event.CLICK, this, this.thisClick);
    }

    private initRole(): void {
        this.role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this.role.changeScale = 0.7;
        this.role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.roleBox.addChild(this.role);
    }

    public set dataSource(data: FbVo) {
        if (!data) return;
        this._mData = data;
        if (this.role) {
            if (this.role.info == null) {
                this.role.info = {};
            }
            this.role.info.ParentObjId = data.mon_show_no;
            this.role.info.LookIdx = 1;
            this.role.updateSkin();
        }
        //首通
        this.titleLb.text = `第${(data.no - 23000)}层`;

        var panel = (this.parent as SanjieCopyPanel)
        var selected = panel.selectDunNo == data.no;
        this.bgImg.skin = selected ? "copy/sejie_bg_1_select.png" : "copy/sejie_bg_1.png";
        this.bgImg2.visible = selected;

        var chapInfo = SBossData.instance.getSanjieDunInfo(data.no);
        var hadKill: boolean = chapInfo && chapInfo.times > 0;
        this.killedImg.visible = hadKill;
    }

    public thisClick(): void {
        var panel = (this.parent as SanjieCopyPanel)
        panel.dunClick(this._mData.no);
    }

    public destroy(): void {
        this.role.dispose();
        this.role = null;
        super.destroy()
    }



}