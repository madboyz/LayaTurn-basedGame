import { MsgManager } from "../../../../manager/MsgManager";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { SCopyEvent, SCopyData } from "../../../../../../net/data/SCopyData";
import { CommonControl } from "../../../../../common/control/CommonControl";
import { SGameData } from "../../../../../../net/data/SGameData";
import { StuffCopyItem } from "../item/StuffCopyItem";
import { ScrollList } from "../../../../compent/ScrollList";
import { PetCopyListItem } from "../item/PetCopyListItem";
import { Chapter_dunVo } from "../../../../../../db/sheet/vo/Chapter_dunVo";
import { S57019_1, S57019, S57019_2 } from "../../../../../../net/pt/pt_57";
import { RewardList } from "../../../../compent/RewardList";
import { ProgressBar } from "../../../../compent/ProgressBar";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { Alert } from "../../../../compent/Alert";
import { STeamData } from "../../../../../team/STeamData";
import { SRechargeData } from "../../../recharge/data/SRechargeData";

export class PetCopyPanel extends ui.main.PetCopyPanelUI {
    protected mItemList: ScrollList;
    private firstList: RewardList;
    private passList: RewardList;
    private bar: ProgressBar;
    private curPage: number = -1;
    private holdPage: boolean = false;
    constructor() {
        super();
    }

    public initComp(): void {
        this.txt_zang.url = "res/atlas/number/fight.atlas";
        this.txt_rank.underline = true;
        this.initList();
        this.initFirstList();
        this.initPassList();
        this.initBar();
        this.request();
        this.initEvent();
        this.updateData();
    }

    private request(): void {
        CommonControl.instance.send22005(22001);
    }

    private initList(): void {
        if (this.mItemList == null) {
            this.mItemList = new ScrollList(510, 320, 415, 320, PetCopyListItem, 0, 1, this.onChange.bind(this));
            this.mItemList._preBtn.on(Laya.Event.MOUSE_DOWN, this, this.onPreBtnDownHandler);
            this.mItemList._nextBtn.on(Laya.Event.MOUSE_DOWN, this, this.onNextBtnDownHandler);
            this.mItemList.list.on("changeSelect", this, this.updateItemData);
            this.addChild(this.mItemList);
            this.mItemList.x = (this.width - this.mItemList.width) >> 1;
            this.mItemList.y = 150;
        }
        this.initBtnData();
        this.addChild(this.leftRedDot);
        this.addChild(this.rightRedDot);
    }

    private initFirstList(): void {
        this.firstList = Laya.Pool.getItemByClass("firstList", RewardList);
        this.firstList.showNameNum = false;
        this.firstList.rowCount = 3;
        this.firstList.maxNum = 3;
        this.firstList.itemStyle = 60;
        this.firstList.x = 96;
        this.firstList.y = 470;
        this.bitmapBox.addChildAt(this.firstList, 3);
    }

    private initPassList(): void {
        this.passList = Laya.Pool.getItemByClass("passList", RewardList);
        this.passList.showNameNum = false;
        this.passList.rowCount = 3;
        this.passList.maxNum = 3;
        this.passList.itemStyle = 60;
        this.passList.x = 343;
        this.passList.y = 470;
        this.bitmapBox.addChildAt(this.passList, 3);
    }

    private initBar(): void {
        this.bar = new ProgressBar();
        this.bar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_greenBar"), 380, 24);
        this.bar.setLabel(0, 20, "#ffffff");
        this.bar.x = 120;
        this.bar.y = 583;
        this.bitmapBox.addChildAt(this.bar, 9);
    }


    public initBtnData(): void {
        this.mItemList.dataProvider = Chapter_dunVo.getAll();
        this.initSelect();
    }

    private initSelect(): void {
        if (this.mItemList.selectedIndex == -1) {
            this.curPage = 0;
            this.mItemList.selectedIndex = 0;
        }
    }

    private initEvent(): void {
        this.txt_rank.on(Laya.Event.CLICK, this, this.click);
        this.btn_enter.on(Laya.Event.CLICK, this, this.enter);
        this.btn_sweep.on(Laya.Event.CLICK, this, this.onSweep);
        this.b_0.on(Laya.Event.CLICK, this, this.receivedBox, [6]);
        this.b_1.on(Laya.Event.CLICK, this, this.receivedBox, [12]);
        this.b_2.on(Laya.Event.CLICK, this, this.receivedBox, [18]);
    }

    private removeEvent(): void {
        this.txt_rank.off(Laya.Event.CLICK, this, this.click);
        this.btn_enter.off(Laya.Event.CLICK, this, this.enter);
        this.btn_sweep.off(Laya.Event.CLICK, this, this.onSweep);
        this.b_0.off(Laya.Event.CLICK, this, this.receivedBox);
        this.b_1.off(Laya.Event.CLICK, this, this.receivedBox);
        this.b_2.off(Laya.Event.CLICK, this, this.receivedBox);
    }

    public updateData(): void {
        var haveYueka = SRechargeData.instance.haveYueka();
        this.btn_sweep.label = haveYueka ? "一键扫荡" : "扫荡";
        if (SCopyData.instance.curChallengeInfo) {
            if (this.curPage != SCopyData.instance.curChallengeInfo.ChapterID && this.holdPage != true) {
                this.curPage = (SCopyData.instance.petCopyCurPage != -1) ? SCopyData.instance.petCopyCurPage : SCopyData.instance.curChallengeInfo.ChapterID;
                if (this.curPage > Chapter_dunVo.getAll().length) {
                    this.curPage = Chapter_dunVo.getAll().length;
                }
                this.mItemList.scrollToIndex(this.curPage - 1);
                this.mItemList.selectedIndex = this.curPage - 1;
            }
        }
        Laya.timer.callLater(this, this.updateListData);
    }

    private updateListData(): void {
        this.mItemList.list.refresh();
        this.updateChance();
    }

    private curItemInfo: S57019_1;
    private copyInfo: S57019;
    private fbVo: FbVo;
    private chaterVo: Chapter_dunVo;
    private curNo: number;
    private leftNum: number;
    private updateItemData(no: number, vo: FbVo): void {
        this.titleSubImg.x = no >= 10 ? 336 : 316;
        this.txt_zang.text = no.toString();
        this.curNo = no;
        this.fbVo = vo;
        this.chaterVo = Chapter_dunVo.get(no);
        this.copyInfo = SCopyData.instance.getPetCopyInfo(no);
        this.curItemInfo = SCopyData.instance.getPetCopyItemInfo(no, vo.no);
        this.updateBoxState();
        this.updateChance();
        this.updateSweep();
        this.updateBar();
        this.rewarldList();
        this.updateState();
        this.updateRedDot();
    }

    private updateBar(): void {
        var num: number = SCopyData.instance.getPetCopyStarNum(this.curNo);
        if (num >= this.chaterVo.chapter_rewards[0][0] && num < this.chaterVo.chapter_rewards[1][0]) {
            this.bar.setValue(num - 6, 12);
        }
        else if (num >= this.chaterVo.chapter_rewards[1][0] && num < this.chaterVo.chapter_rewards[2][0]) {
            this.bar.setValue(num - 6, 12);
        }
        else if (num >= this.chaterVo.chapter_rewards[2][0]) {
            this.bar.setValue(num - 6, 12);
        }
        else {
            this.bar.setValue(0, 18);
        }
    }

    private updateChance(): void {
        if (this.curItemInfo) {
            if (this.curItemInfo.pass == 1) {
                this.get1.visible = true;
            }
            else {
                this.get1.visible = false;
                this.get2.visible = false;
            }
            this.leftNum = this.fbVo.cd[1] - this.curItemInfo.times;
            if (this.leftNum <= 0) {
                this.get2.visible = true;
            }
            else {
                this.get2.visible = false;
            }
        }
        else {
            this.leftNum = this.fbVo.cd[1];
            this.get1.visible = false;
            this.get2.visible = false;
        }
        if (this.leftNum > 0) {
            this.txt_num.color = "#00b007";
            this.btn_enter.gray = false;
        }
        else {
            this.txt_num.color = "#ff0000";
            this.btn_enter.gray = true;
        }
        this.txt_num.text = this.leftNum + "次";
    }

    private updateSweep(): void {
        var needStarNum = Chapter_dunVo.get(this.curNo).star_limit;
        if (SCopyData.instance.getPetCopyStarNum(this.curNo) < needStarNum) {
            this.txt_tips.text = "章节获得" + this.chaterVo.star_limit + "星开启";
        } else {
            this.txt_tips.text = "";
        }
    }

    private rewarldList(): void {
        this.firstList.updateRewardsByNum(this.fbVo.first_reward);
        this.passList.updateRewardsByNum(this.fbVo.final_reward);
    }

    private updateRedDot(): void {
        var leftRedDot: boolean = false;
        var rightRedDot: boolean = false;
        for (let i = 1; i < this.curNo; i++) {
            leftRedDot = leftRedDot || SCopyData.instance.canFight(i) || SCopyData.instance.canGetBox(i);
            if (leftRedDot) {
                break;
            }
        }
        for (let i = this.curNo + 1; i < SCopyData.instance.curChallengeInfo.ChapterID; i++) {
            rightRedDot = rightRedDot || SCopyData.instance.canFight(i) || SCopyData.instance.canGetBox(i);
            if (rightRedDot) {
                break;
            }
        }
        this.leftRedDot.visible = leftRedDot;
        this.rightRedDot.visible = rightRedDot;
    }

    private updateBoxState(): void {
        if (this.copyInfo) {
            this.updateBoxStarState();
            this.b_0.num.text = this.chaterVo.chapter_rewards[0][0];
            this.b_1.num.text = this.chaterVo.chapter_rewards[1][0];
            this.b_2.num.text = this.chaterVo.chapter_rewards[2][0];
        }
        else {
            this.b_0.icon.skin = "copy/b_0.png"
            this.b_1.icon.skin = "copy/b_0.png"
            this.b_2.icon.skin = "copy/b_0.png"
        }
    }

    private updateBoxStarState(): void {
        var starNum = SCopyData.instance.getPetCopyStarNum(this.curNo)
        var starInfo1: S57019_2 = SCopyData.instance.getPetCopyItemStarInfo(this.copyInfo.ChapterID, 6);
        var starInfo2: S57019_2 = SCopyData.instance.getPetCopyItemStarInfo(this.copyInfo.ChapterID, 12);
        var starInfo3: S57019_2 = SCopyData.instance.getPetCopyItemStarInfo(this.copyInfo.ChapterID, 18);
        if (starNum >= 6) {
            this.b_0.icon.skin = (starInfo1 && starInfo1.RwdState == 3) ? "copy/b_2.png" : "copy/b_1.png";
        } else {
            this.b_0.icon.skin = "copy/b_0.png";
        }
        if (starNum >= 12) {
            this.b_1.icon.skin = (starInfo2 && starInfo2.RwdState == 3) ? "copy/b_2.png" : "copy/b_1.png";
        } else {
            this.b_1.icon.skin = "copy/b_0.png";
        }
        if (starNum >= 18) {
            this.b_2.icon.skin = (starInfo3 && starInfo3.RwdState == 3) ? "copy/b_2.png" : "copy/b_1.png";
        } else {
            this.b_2.icon.skin = "copy/b_0.png";
        }
    }

    private updateState(): void {
        if (this.mItemList.selectedIndex >= SCopyData.instance.curChallengeInfo.ChapterID) {
            this.mItemList._nextBtn.gray = true;
        }
    }

    /**
     * 前翻 
     * @param e
     * 
     */
    private onPreBtnDownHandler(e: Event = null): void {
        this.mItemList.selectedIndex = this.mItemList.currentPage;
        this.updateState();
    }

    /**
     * 后翻 
     * @param e
     * 
     */
    private onNextBtnDownHandler(e: Event = null): void {
        this.mItemList.selectedIndex = this.mItemList.currentPage;
        this.updateState();
    }

    private selectMount: Chapter_dunVo;
    public onChange(): void {
        this.selectMount = this.mItemList.selectedItem as Chapter_dunVo;
    }

    private click(): void {
        UIManager.instance.openUI(UIID.SYS_COPY_PETRANK)
    }

    private enter(): void {
        if (SRoleData.instance.info.TeamId != 0) {
            Alert.show(HtmlUtils.addColor("队伍状态无法进入，是否离开队伍？", "#8a5428", 20), this, () => {
                STeamData.instance.protocol.QuitTeam()
            }, null, null, null, true, "提示");
            // MsgManager.instance.showRollTipsMsg("正在组队中不能进入副本！");
            return;
        }
        if (this.curNo <= SCopyData.instance.curChallengeInfo.ChapterID) {
            if (this.curNo == SCopyData.instance.curChallengeInfo.ChapterID) {
                if (this.fbVo.no <= SCopyData.instance.curChallengeInfo.DunNo) {
                    if (this.leftNum > 0) {
                        SCopyData.instance.copyType = CopyType.PET;
                        this.parent.event(SCopyEvent.COPY_REQUEST_ENTER, [this.fbVo.no]);
                    }
                    else {
                        MsgManager.instance.showRollTipsMsg("该副本今日挑战次数已达上限");
                    }
                }
                else {
                    MsgManager.instance.showRollTipsMsg("请先挑战前置关卡！");
                }
            }
            else {
                if (this.leftNum > 0) {
                    SCopyData.instance.copyType = CopyType.PET;
                    this.parent.event(SCopyEvent.COPY_REQUEST_ENTER, [this.fbVo.no]);
                }
                else {
                    MsgManager.instance.showRollTipsMsg("该副本今日挑战次数已达上限");
                }
            }
        }
        else {
            MsgManager.instance.showRollTipsMsg("请先挑战前置关卡！");
        }
    }

    private onSweep(): void {
        if (SCopyData.instance.canSweep(this.curNo)) {
            this.holdPage = true;
            var haveYueka = SRechargeData.instance.haveYueka();
            if (haveYueka) {
                SCopyData.instance.oneKeyShaodang(CopyType.PET);
            } else {
                this.parent.event(SCopyEvent.COPY_REQUEST_PETSWEEP, [[this.curNo]]);
            }
        }
        else {
            var num: number = SCopyData.instance.getPetCopyStarNum(this.curNo);
            var needStarNum = this.chaterVo.star_limit;
            if (num < needStarNum) {
                MsgManager.instance.showRollTipsMsg("本章节需要" + needStarNum + "星才可以扫荡！");
            }
            else {
                MsgManager.instance.showRollTipsMsg("您的挑战次数不足！");
            }
        }
    }

    private receivedBox(num: number): void {
        var star: number = 0;
        var reward: Array<any> = [];
        if (num == 6) {
            star = this.chaterVo.chapter_rewards[0][0];
            reward = this.chaterVo.chapter_rewards[0];
        }
        else if (num == 12) {
            star = this.chaterVo.chapter_rewards[1][0];
            reward = this.chaterVo.chapter_rewards[1];
        }
        else {
            star = this.chaterVo.chapter_rewards[2][0];
            reward = this.chaterVo.chapter_rewards[2];
        }
        if (this.copyInfo) {
            var info: S57019_2;
            info = SCopyData.instance.getPetCopyItemStarInfo(this.copyInfo.ChapterID, star);
            if (!info || info.RwdState != 1) {
                this.parent.event(SCopyEvent.COPY_REQUEST_STARREWARD, [[this.curNo, star]]);
            }
            else {
                MsgManager.instance.showRollTipsMsg("您得星星不足！");
            }
        }
        else {
            MsgManager.instance.showRollTipsMsg("您得星星不足！");
        }
        UIManager.instance.openUI(UIID.SYS_COPY_STARREWARD, [reward]);
    }

    public removeSelf(): any {
        // this.curPage = -1;关闭面板，不再刷新页签
        SCopyData.instance.petCopyCurPage = this.mItemList.selectedIndex + 1;
        this.removeEvent();
        super.removeSelf();
    }
}