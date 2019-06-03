import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { FightMonsterView } from "../../../../../battle/role/fight/FightMonsterView";
import { ItemData } from "../../../../compent/data/ItemData";
import { RewardList } from "../../../../compent/RewardList";
import { SBossData, SBossEvent } from "../data/SBossData";
import { Super_boss_chap_cfgVo } from "../../../../../../db/sheet/vo/Super_boss_chap_cfgVo";
import { MsgManager } from "../../../../manager/MsgManager";

export class SuperBossPanel extends ui.main.PersonBossPanelUI {
    constructor() {
        super();
    }

    public initComp(): void {
        this.initEvent();
        this.initList();
        this.requestInfo();
        this.updateData();
    }

    private initList(): void {
        this.list.itemRender = SuperBossItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        //this.list.array = FbVo.getListByType(CopyType.PERSON);
    }

    private requestInfo(): void {
        SBossData.instance.protocol.send57024();
    }

    private initEvent(): void {
        SBossData.instance.on(SBossEvent.SUPER_BOSS_INFO, this, this.updateData);
    }

    private removeEvent(): void {
        SBossData.instance.off(SBossEvent.SUPER_BOSS_INFO, this, this.updateData);
    }

    public updateData(): void {
        this.updateList();
    }

    private updateList(): void {
        var useList = Super_boss_chap_cfgVo.getAll();
        // var useList = FbVo.getListByType(CopyType.SUPER_BOSS);
        this.list.array = useList;
        var index: number = SBossData.instance.getNowCanFightMaxChap() - 1;
        this.list.scrollBar.value = (index >= 1 ? index - 1 : index) * 190;
    }


    public removeSelf(): any {
        this.list.array = [];
        this.removeEvent();
        super.removeSelf();
    }
}




//道具的奖励ITEM
export class SuperBossItem extends ui.main.SuperBossItemUI {
    private _mData: Super_boss_chap_cfgVo;
    private _rewarldList: RewardList;
    private role: FightMonsterView;

    constructor() {
        super();
        this.initComp();
        this.initRole();
        this.sureBtn.on(Laya.Event.CLICK, this, this.sureBtnClick);
    }

    private initComp(): void {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 5;
        this._rewarldList.maxNum = 5;
        this._rewarldList.itemStyle = 80;
        this._rewarldList.x = 0;
        this._rewarldList.y = 0;
        this.rewardBox.addChild(this._rewarldList);

    }

    private initRole(): void {
        this.role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this.role.changeScale = 0.7;
        this.role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.role.x = this.headBg.x + this.headBg.width / 2
        this.role.y = this.headBg.y + this.headBg.height / 2 + 50;
        this.addChild(this.role);
    }

    public set dataSource(data: Super_boss_chap_cfgVo) {
        if (!data) return;
        this._mData = data;
        if (this.role) {
            if (this.role.info == null) {
                this.role.info = {};
            }
            this.role.info.ParentObjId = data.boss_show;
            this.role.info.LookIdx = 1;
            this.role.updateSkin();
        }
        this._rewarldList.updateRewardsByNum(data.chapter_rewards);
        //首通
        this.txt_chapName.text = `第${data.no}章`;
        var chapInfo = SBossData.instance.getSuperBossChap(data.no);
        var hadKill: boolean = chapInfo && chapInfo.FirstKillName && chapInfo.FirstKillName != "";
        this.getImgBox.visible = chapInfo && chapInfo.FKState == 1
        this.txt_leftNum.color = hadKill ? "#ff0000" : "#8e5213"
        this.txt_leftNum.text = "首通玩家:" + (hadKill ? chapInfo.FirstKillName : "暂无");
        //判断可不可打
        var maxChap = SBossData.instance.getNowCanFightMaxChap();
        if (data.no <= maxChap) {
            if (hadKill && chapInfo.FKState != 1) {
                this.sureBtn.label = "领 取";
                this.sureBtn.labelColors = "#b2660d";
            } else {
                this.sureBtn.label = "进 入";
                this.sureBtn.labelColors = "#b2660d";
            }
        } else {
            this.sureBtn.label = "通关第" + (data.no - 1) + "章解锁";
            this.sureBtn.labelColors = "#ff0000";
        }

    }

    public sureBtnClick(): void {
        var chapInfo = SBossData.instance.getSuperBossChap(this._mData.no);
        var hadKill: boolean = chapInfo && chapInfo.FirstKillName && chapInfo.FirstKillName != "";
        //判断可不可打
        var maxChap = SBossData.instance.getNowCanFightMaxChap();
        if (this._mData.no <= maxChap) {
            if (hadKill && chapInfo.FKState != 1) {
                SBossData.instance.protocol.send57027(this._mData.no);
            } else {
                SBossData.instance.superBossShowingChap = this._mData.no;
                UIManager.instance.openUI(UIID.SUPER_BOSS_CHAP_PANEL);
            }
        } else {
            MsgManager.instance.showRollTipsMsg("通关" + (this._mData.no - 1) + "章解锁");
        }

    }

    public destroy(): void {
        this._rewarldList.removeSelf();
        this._rewarldList = null;
        this.role.dispose();
        this.role = null;
        super.destroy()
    }



}