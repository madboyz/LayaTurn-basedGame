import { ProgressBar } from "../../../compent/ProgressBar";
import { BaseItem } from "../../../compent/BaseItem";
import { SChapterData, SChapterEvent } from "../../../../chapter/SChapterData";
import { AwardUtil } from "../../../../award/AwardUtil";
import { ItemData } from "../../../compent/data/ItemData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { GameUtils } from "../../../../utils/GameUtils";
import { FightMonsterView } from "../../../../battle/role/fight/FightMonsterView";
import { FightInfo } from "../../../../battle/model/FightInfo";
import { S20007_1 } from "../../../../../net/pt/pt_20";
import { SGameData } from "../../../../../net/data/SGameData";
import { MsgManager } from "../../../manager/MsgManager";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { STeamData } from "../../../../team/STeamData";
import { Alert } from "../../../compent/Alert";
import { SNewBattleData } from "../../../../../net/data/SNewBattleData";
import { S22001 } from "../../../../../net/pt/pt_22";

export class LevelChallengePanel extends ui.main.LevelChallengePanelUI {
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [

            { url: "res/atlas/chapter.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    private LevelProgress: ProgressBar;
    private ChapterAwardItem: BaseItem;
    private goods: Array<ItemData> = [];
    private TimeProgress: ProgressBar;
    private CoolDownTime = 0;//剩余毫秒
    private CoolDownTime1 = 0;//剩余毫秒
    private CollDownTotalTime = 0;
    private FightMonsterObj: FightMonsterView;
    public update(): void {

    }

    public initComp() {
        super.initComp();
        this.LevelProgress = new ProgressBar();
        this.LevelProgress.setGrid("19,49,21,48", "8,17,11,21");
        this.LevelProgress.setBg(ResUtils.getCompUIUrl("img_bgBar"), ResUtils.getCompUIUrl("img_bar1"), 350, 50, 20, 12, 14, 22);
        this.LevelProgress.x = 62;
        this.LevelProgress.y = 167;
        this.addChild(this.LevelProgress);

        this.LevelProgress.setLabel(1, 20, "#9cff01", 0, 100, 2, "#05810e");

        this.ChapterAwardItem = new BaseItem();
        this.ChapterAwardItem.setItemStyle(80);
        this.ChapterAwardItem.x = 425;
        this.ChapterAwardItem.y = 126;
        this.addChild(this.ChapterAwardItem);

        this.TimeProgress = new ProgressBar();
        this.TimeProgress.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_redBar"), 385, 24);
        this.TimeProgress.x = 107;
        this.TimeProgress.y = 761;
        this.addChild(this.TimeProgress);
        this.initList();

        this.FightMonsterObj = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this.FightMonsterObj.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.FightMonsterObj.x = 286;
        this.FightMonsterObj.y = 506;
        this.addChild(this.FightMonsterObj);

        HtmlUtils.setHtml(this.TimeTxt.style, 3, 20, "center", "middle");


    }

    private initList(): void {
        this.levelAwardList.itemRender = BaseItem;
        this.levelAwardList.spaceX = 60;
        this.levelAwardList.spaceY = 0;
        this.levelAwardList.repeatX = 5;
        this.levelAwardList.repeatY = 1;
        this.levelAwardList.hScrollBarSkin = "";
        this.levelAwardList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.levelAwardList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.levelAwardList.renderHandler = new Laya.Handler(this, this.onListRender);
    }

    private onListRender(cell: BaseItem, index: number) {
        var item: ItemData = this.goods[index];
        if (!item) return;
        //cell.clearData();
        cell.setItemStyle(80);
        //cell.showName(item.clientInfo.name ,18 ,"#8e5213");
        cell.itemData = item;
        cell.isShowToolTip = true;
        cell.toolTipData = item;
    }

    public open(...args): void {
        var str: string = "章节";
        this.initWindow(true, true, str, 550, 750, 35);
        super.open();
        this.rankBox.visible = false;
        this.RefreshData();
    }

    private RefreshData() {
        if (SChapterData.instance.chapter.chapterId == 0)
            return;
        var str: string = `${SChapterData.instance.chapter.sheetChapterData.scene_name}${SChapterData.instance.chapter.sheetLevelData.desc}`;
        this.Title = str;

        //显示奖励
        var passBossNum = SChapterData.instance.chapter.LevelPassCount;
        var cfgs = SChapterData.instance.chapter.sheetChapterData.chapter_rewards;
        var maxBossNum: number;
        var awardId: number;
        for (let i = 0; i < cfgs.length; i++) {
            var cfg = cfgs[i];
            if (passBossNum < cfg[0]) {
                maxBossNum = cfg[0];
                awardId = cfg[1];
                break;
            }
        }
        var goodsList = AwardUtil.GetNormalGoodsList(awardId);
        if (goodsList.length > 0) {
            this.ChapterAwardItem.itemData = goodsList[0];
            this.ChapterAwardItem.showName(goodsList[0].clientInfo.name, 18, "#8e5213");
            this.ChapterAwardItem.isShowToolTip = true;
            this.ChapterAwardItem.toolTipData = goodsList[0];
        }
        this.goods = [];
        var levelAwardIds = SChapterData.instance.chapter.sheetLevelData.rewards;
        for (let i = 0; i < levelAwardIds.length; i++) {
            const id = levelAwardIds[i];
            var goodsList = AwardUtil.GetNormalGoodsList(id);
            for (let j = 0; j < goodsList.length; j++) {
                const item = goodsList[j];
                this.goods.push(item);
            }
        }
        this.levelAwardList.array = this.goods;
        this.LevelProgress.setValue(SChapterData.instance.chapter.LevelPassCount, maxBossNum);
        this.LevelProgress.Text = `${SChapterData.instance.chapter.LevelPassCount}/${maxBossNum}`;
        this.Des.text = `击败${maxBossNum}个${SChapterData.instance.chapter.sheetChapterData.scene_name}章节BOSS可获得奖励`;
        Laya.timer.clear(this, this.ChallengeTime);
        this.CoolDownTime = 0;
        if (GameUtils.TimeStamp >= SChapterData.instance.chapter.lastPassLevelTime + SChapterData.instance.chapter.LevelCoolDown) {
            this.TimeTxt.visible = false;
            this.TimeProgress.visible = false;
            this.GoBtn.visible = true;
        }
        else {
            this.TimeTxt.visible = true;
            this.TimeProgress.visible = true;
            this.GoBtn.visible = false;
            this.CoolDownTime1 = SChapterData.instance.chapter.lastPassLevelTime + SChapterData.instance.chapter.LevelCoolDown - GameUtils.TimeStamp;
            this.CoolDownTime = GameUtils.TimeStamp - SChapterData.instance.chapter.lastPassLevelTime;
            this.CollDownTotalTime = SChapterData.instance.chapter.LevelCoolDown;
            this.updateTimeDisplay();
            Laya.timer.loop(1000, this, this.ChallengeTime);
        }
        if (this.FightMonsterObj.info == null) {
            this.FightMonsterObj.info = {};
        }
        this.FightMonsterObj.info.ParentObjId = SChapterData.instance.chapter.sheetLevelData.mon_show_no;
        this.FightMonsterObj.info.LookIdx = 1;
        this.FightMonsterObj.updateSkin();
        this.FightMonsterObj.scaleX = this.FightMonsterObj.scaleY = 1;
    }

    private OnClickGoBtn() {
        if (SGameData.instance.PLAYFIGHTREPORT && !SNewBattleData.instance.isHangUpBattle) {
            MsgManager.instance.showRollTipsMsg("战斗中");
            return;
        }
        if (SRoleData.instance.info.TeamId != 0) {
            Alert.show(HtmlUtils.addColor("组队中不能挑战boss，是否离开队伍？", "#8a5428", 20), this, () => {
                STeamData.instance.protocol.QuitTeam()
            }, null, null, null, true, "提示");
            // MsgManager.instance.showRollTipsMsg("组队中不能挑战boss");
            return;
        }
        var lv = SRoleData.instance.info.Lv;
        if (lv < SChapterData.instance.chapter.sheetChapterData.lv_limit) {
            MsgManager.instance.showRollTipsMsg(`需要等级${SChapterData.instance.chapter.sheetChapterData.lv_limit}级才可以挑战！`);
            return;
        }
        var fastChalleng = SNewBattleData.instance.isHangUpBattle;
        SChapterData.instance.event(SChapterEvent.CHAPTER_CHALLENGE, fastChalleng);
        UIManager.instance.closeUI(this.index);
    }

    public initEvent(): void {
        this.GoBtn.on(Laya.Event.CLICK, this, this.OnClickGoBtn);
    }

    public removeEvent(): void {
        this.GoBtn.off(Laya.Event.CLICK, this, this.OnClickGoBtn);
    }

    public close(): void {
        super.close();
        Laya.timer.clear(this, this.ChallengeTime);
    }

    private updateTimeDisplay() {
        this.TimeTxt.innerHTML = HtmlUtils.addColor("还需要", "#8e5213", 20) + HtmlUtils.addColor(`${this.CoolDownTime1}`, "Red", 20) + HtmlUtils.addColor("秒可以挑战BOSS", "#8e5213", 20)
        this.TimeProgress.setValue(this.CoolDownTime, this.CollDownTotalTime);
    }

    private ChallengeTime() {
        if (this.CoolDownTime == this.CollDownTotalTime) {
            this.TimeTxt.visible = false;
            this.TimeProgress.visible = false;
            this.GoBtn.visible = true;
            Laya.timer.clear(this, this.ChallengeTime);
        }
        else {
            this.CoolDownTime++;
            this.CoolDownTime1--;
            this.updateTimeDisplay();

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
                    rankNoLb.text = "第" + cell.item_1[0].Value + "关";
                } else {
                    rankLb.text = "";
                    rankNoLb.text = "";
                }
            }


        }
    }

}