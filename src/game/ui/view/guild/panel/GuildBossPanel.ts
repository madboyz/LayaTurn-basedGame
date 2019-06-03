import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { FbVo } from "../../../../../db/sheet/vo/FbVo";
import { Guild_boss_getCard_cfgVo } from "../../../../../db/sheet/vo/Guild_boss_getCard_cfgVo";
import { SCopyData, SCopyEvent } from "../../../../../net/data/SCopyData";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { S57003_2 } from "../../../../../net/pt/pt_57";
import { FightMonsterView } from "../../../../battle/role/fight/FightMonsterView";
import { CommonControl } from "../../../../common/control/CommonControl";
import { ItemData } from "../../../compent/data/ItemData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { RewardList } from "../../../compent/RewardList";
import { GuildHelper } from "../data/GuildHelper";
import { SGuildData, SGuildEvent } from "../data/SGuildData";

export class GuildBossPanel extends ui.main.GuildBossPanelUI {
    private normalClose: boolean = true;
    public selectIndex: number = -1;
    private cfgs: Array<FbVo>;

    private _rewarldList: RewardList;

    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/guild.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        this.sureBtn.on(Laya.Event.CLICK, this, this.sureBtnClick);
        SCopyData.instance.on(SCopyEvent.COPY_INFO_BACK, this, this.dataBack);
        SGuildData.instance.on(SGuildEvent.GUILD_BOSS_INFO_UPDATE, this, this.updateData);
        SGuildData.instance.on(SGuildEvent.GUILD_BOSS_CARD_UPDATE, this, this.updateData);
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    public removeEvent(): void {
        this.sureBtn.off(Laya.Event.CLICK, this, this.sureBtnClick);
        SCopyData.instance.off(SCopyEvent.COPY_INFO_BACK, this, this.dataBack);
        SGuildData.instance.off(SGuildEvent.GUILD_BOSS_INFO_UPDATE, this, this.updateData);
        SGuildData.instance.off(SGuildEvent.GUILD_BOSS_CARD_UPDATE, this, this.updateData);
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    private requestInfo(): void {
        CommonControl.instance.send57003(CopyType.GUILD_BOSS);
        SGuildData.instance.protocol.requsetGuildBossInfos();
    }

    public initComp() {
        super.initComp();
        this.bossList.hScrollBarSkin = "";
        this.bossList.itemRender = GuildBossItem;
        this.cfgs = FbVo.getListByType(CopyType.GUILD_BOSS);

        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.hGap = 28;
        this._rewarldList.rowCount = 4;
        this._rewarldList.maxNum = 4;
        this._rewarldList.itemStyle = 80;
        this.rewardBox.addChild(this._rewarldList);
    }

    public open(...args): void {
        this.initWindow(true, true, "帮派", 550, 750, 50);
        super.open();
        this.normalClose = true;
        this.bossList.array = [];
        this.bossList.array = this.cfgs;
        this.requestInfo();
        this.dataBack();
    }

    private showRed(): void {
    }

    public dataBack(): void {
        this.selectIndex = this.getMaxCanFightIndex();
        this.bossList.scrollBar.value = (this.selectIndex >= 1 ? this.selectIndex - 1 : this.selectIndex) * 188;
        this.updateData();
        this.showRed();
    }

    public updateData(): void {
        this.bossList.refresh();
        var cfg = this.cfgs[this.selectIndex];
        var data: S57003_2 = SCopyData.instance.getCopyInfo(cfg.no);
        var info = SGuildData.instance.guildBossInfos.get(cfg.no);
        //进入条件相关
        var killed = info.state == 0;//类型0，既被杀
        var guildLvCfg = GuildHelper.getGuildBossCfg(data.no);
        var guildLvEnough = SGuildData.instance.myGuildData.Lv >= guildLvCfg[1];
        var myLvEnough = SRoleData.instance.info.Lv >= cfg.lv_limit;
        //boss挑战次数
        var bossLeftNum = cfg.cd[1] - data.times;
        var timeEnough = bossLeftNum > 0;
        this.bossTimeLb.text = "今日剩余挑战次数：" + bossLeftNum;
        this.bossTimeLb.color = timeEnough ? "#00b007" : "#ff0000";
        //翻牌次数
        // var hadGetCard = info && info.draw_times > 0;
        var canCard = info && info.draw_state == 0;
        var cardLeftNum = ConstVo.get("GUILD_BOSS_WEEK_DRAW_COUNT").val - SGuildData.instance.getCardTimes();
        var cardEnough = cardLeftNum > 0;
        this.cardTimeLb.text = "本周剩余翻牌次数：" + cardLeftNum;
        this.cardTimeLb.color = cardEnough ? "#00b007" : "#ff0000";

        this.sureBtn.label = killed ? "翻 牌" : "挑 战";
        if (killed) {
            this.sureBtn.gray = (!cardEnough || !canCard);
            this.sureBtn.refreshRed(cardEnough && canCard);
        } else {
            this.sureBtn.gray = (!guildLvEnough || !myLvEnough || !timeEnough)
            this.sureBtn.refreshRed(guildLvEnough && myLvEnough && timeEnough);
        }
        //刷新奖励
        var itemList = Guild_boss_getCard_cfgVo.get(data.no).reward_show;
        var itemDatas = [];
        for (let i = 0; i < 4; i++) {
            const element = itemList[i];
            if (element) {
                var itemdata = new ItemData(element[0]);
                itemdata.Count = element[1];
                itemDatas.push(itemdata);
            }
        }
        this._rewarldList.updateRewards(itemDatas);


    }

    public clickItem(index: number): void {
        this.selectIndex = index;
        this.updateData();
    }


    public close(): void {
        super.close();
        if (this.normalClose) {
            UIManager.instance.openUI(UIID.GUILD_MAIN_PANEL);
        }
    }

    private getMaxCanFightIndex(): number {
        for (let i = this.cfgs.length - 1; i >= 0; i--) {
            var cfg = this.cfgs[i];
            var data: S57003_2 = SCopyData.instance.getCopyInfo(cfg.no);
            var info = SGuildData.instance.guildBossInfos.get(cfg.no);
            var killed = info.state == 0;//类型0，既被杀
            var guildLvCfg = GuildHelper.getGuildBossCfg(data.no);
            var guildLvEnough = SGuildData.instance.myGuildData.Lv >= guildLvCfg[1];
            var myLvEnough = SRoleData.instance.info.Lv >= cfg.lv_limit;
            if (!killed && guildLvEnough && myLvEnough) {
                return i
            }
        }
        return 0;
    }

    public sureBtnClick(): void {
        var cfg = this.cfgs[this.selectIndex];
        var data: S57003_2 = SCopyData.instance.getCopyInfo(cfg.no);
        var info = SGuildData.instance.guildBossInfos.get(cfg.no);
        var killed = info.state == 0;//类型0，既被杀
        //进入条件相关info
        if (killed) {
            UIManager.instance.openUI(UIID.GUILD_BOSS_SELECTCARD_PANEL, [this.cfgs[this.selectIndex].no])
        } else {
            this.fight();
        }

    }

    private fight(): void {
        this._clickFight = true;
        SCopyData.instance.copyType = CopyType.GUILD_BOSS;
        CommonControl.instance.EnterCopy(this.cfgs[this.selectIndex].no);
    }

    private _clickFight: boolean = false;
    private onUpdateFightState(): void {
        if (SGameData.instance.PLAYFIGHTREPORT == true && this._clickFight) {
            this._clickFight = false;
            this.normalClose = false;
            this.close();
            UIManager.instance.closeUI(UIID.SYS_MAIN);
        }
    }


}



export class GuildBossItem extends ui.main.GuildBossItemUI {
    private _rewarldList: RewardList;
    private _role: FightMonsterView;
    private _bossHp: ProgressBar;

    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.thisClick);

        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.hGap = 10;
        this._rewarldList.rowCount = 2;
        this._rewarldList.maxNum = 2;
        this._rewarldList.itemStyle = 60;
        this.rewardBox.addChild(this._rewarldList);
        this.initRole();
        this.initProgressBar();
    }

    private initRole(): void {
        this._role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this._role.changeScale = 0.8;
        this._role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.roleBox.addChild(this._role);
    }

    private initProgressBar(): void {
        this._bossHp = new ProgressBar();
        this._bossHp.setGrid("10,15,10,15", "5,8,5,8");
        this._bossHp.setBg(ResUtils.getCompUIUrl("barbg"), ResUtils.getCompUIUrl("bar"), 100, 25, 6, 4, 5, 6);
        this._bossHp.setLabel(1, 20, "#ffffff", 0, 100, 2);
        this.hpBox.addChild(this._bossHp);
    }

    private _mdata: FbVo;
    public set dataSource(data: FbVo) {
        if (!data) {
            return;
        }
        this._mdata = data;
        var panel = (this.parent.parent.parent as GuildBossPanel)
        var index = panel.bossList.array.indexOf(this._mdata);
        this.selectImg.visible = index == panel.selectIndex;
        //UI显示
        if (this._role) {
            if (this._role.info == null) {
                this._role.info = {};
            }
            this._role.info.ParentObjId = this._mdata.mon_show_no;
            this._role.info.LookIdx = 1;
            this._role.updateSkin();
        }
        var sdate: S57003_2 = SCopyData.instance.getCopyInfo(data.no);
        var isFirst = sdate.pass != 1;
        this.typeLb.color = isFirst ? "#00b007" : "#8a5428";
        this.typeLb.text = isFirst ? "首杀奖励" : "参与奖励";
        this.titleLb.text = data.name;
        this._rewarldList.updateRewardsByNum(isFirst ? data.first_reward : data.final_reward);
        //进入条件相关
        var guildLvCfg = GuildHelper.getGuildBossCfg(data.no);
        var guildLvEnough = SGuildData.instance.myGuildData.Lv >= guildLvCfg[1];
        var myLvEnough = SRoleData.instance.info.Lv >= data.lv_limit;
        if (!guildLvEnough) {
            this.limitLb.text = "帮派" + guildLvCfg[1] + "级开放";
        } else if (!myLvEnough) {
            this.limitLb.text = "等级" + data.lv_limit + "级开放";
        } else {
            this.limitLb.text = "";
        }
        this.bgImg.gray = (!guildLvEnough || !myLvEnough)

        //血条内容
        var info = SGuildData.instance.guildBossInfos.get(data.no);
        this.killedImg.visible = info.state == 0;//类型0，既被杀
        if (info && info.cur_hp > 0) {
            this._bossHp.setValue(info.cur_hp, info.max_hp);
            var hpText = (info.cur_hp / info.max_hp * 100).toFixed(0);
            this._bossHp.Text = `${hpText}%`;
            this._bossHp.visible = true;
        } else {
            this._bossHp.setValue(0, 1);
            this._bossHp.Text = `${0}%`;
            this._bossHp.visible = false;
        }
        //红点相关设置
        //进入条件相关
        var killed = info.state == 0;//类型0，既被杀
        //boss挑战次数
        var bossLeftNum = data.cd[1] - sdate.times;
        var timeEnough = bossLeftNum > 0;
        //翻牌次数
        var canCard = info && info.draw_state == 0;
        var cardLeftNum = ConstVo.get("GUILD_BOSS_WEEK_DRAW_COUNT").val - SGuildData.instance.getCardTimes();
        var cardEnough = cardLeftNum > 0;

        if (killed) {
            this.redDot.visible = (cardEnough && canCard);
        } else {
            this.redDot.visible = (guildLvEnough && myLvEnough && timeEnough);
        }
    }

    private thisClick(e: Laya.Event): void {
        var panel = (this.parent.parent.parent as GuildBossPanel)
        var index = panel.bossList.array.indexOf(this._mdata);
        panel.clickItem(index);
    }

    public destroy(): void {
        super.destroy();
    }

}