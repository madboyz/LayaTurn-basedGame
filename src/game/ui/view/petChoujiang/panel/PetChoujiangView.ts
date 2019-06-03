import { LotteryVo } from "../../../../../db/sheet/vo/LotteryVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { SGameData } from "../../../../../net/data/SGameData";
import { S31100 } from "../../../../../net/pt/pt_31";
import { GameUtils } from "../../../../utils/GameUtils";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { MsgManager } from "../../../manager/MsgManager";
import { SPetChoujiangData, SPetChoujiangEvent } from "../data/SPetChoujiangData";

export class PetChoujiangView extends ui.main.PetChoujiangViewUI {
    private _type: number;

    private panelInfo: S31100;
    private itemList: BaseItem[];
    private imgList: Laya.Image[];

    private itemPos = [{ x: 195, y: -5, scale: 1.3 }, { x: 305, y: 35 }, { x: 380, y: 105 },
    { x: 383, y: 188, scale: 1.3 }, { x: 380, y: 295 }, { x: 305, y: 370 },
    { x: 195, y: 385, scale: 1.3 }, { x: 100, y: 370 }, { x: 40, y: 295 },
    { x: 0, y: 188, scale: 1.3 }, { x: 40, y: 105 }, { x: 100, y: 35 }];
    private listPos = [0, 4, 8, 3, 7, 11, 1, 5, 9, 2, 6, 10];//顺序list里面放的第几个数据
    //选中的索引
    private selectIndex: number = 1;

    constructor(type: number) {
        super();
        this._type = type;
        this.initEvent();
        this.initComp();
        this.open();
    }

    public initEvent(): void {
        this.btn_reward.on(Laya.Event.CLICK, this, this.btnRewardClick);
    }

    public removeEvent(): void {
        this.timer.clear(this, this.textLoop);
    }

    public initComp() {
        this.bgImg.skin = `bg/bg_choujiang_${this._type}.png`;
        this.wordList.vScrollBarSkin = "";
        this.wordList.renderHandler = new Laya.Handler(this, this.updateWordItem);
        this.itemList = [];
        this.imgList = [];
        for (let i = 0; i < 12; i++) {
            var item = new choujiangItem();
            item.scaleX = item.scaleY = (this.itemPos[i].scale || 1);
            item._forceShowEff = 1;
            item.setItemStyle(72);
            item._selectBgStyle = 86;
            item.isShowToolTip = true;
            this.itemBox.addChild(item);
            item.x = this.itemPos[i].x;
            item.y = this.itemPos[i].y;
            this.itemList.push(item);
        }
        for (let i = 0; i < 12; i++) {
            var img = new Laya.Image;
            img.scaleX = img.scaleY = 0.7 * (this.itemPos[i].scale || 1);
            this.itemBox.addChild(img);
            img.x = this.itemPos[i].x + 2 * (this.itemPos[i].scale || 1);
            img.y = this.itemPos[i].y + 11 * (this.itemPos[i].scale || 1);
            img.skin = "comp/img_word_hasGet.png";
            this.imgList.push(img);
        }
    }

    public open(): void {
        this.selectIndex = 0;
        this.selectItem(this.selectIndex - 1);
        this.choujiangIng = false;
        this.request();
    }

    private request(): void {
        SPetChoujiangData.instance.protocol.send31100(this._type);
    }

    public updateData(): void {
        this.panelInfo = SPetChoujiangData.instance.getPanelInfo(this._type);
        //抽奖列表
        if (!this.panelInfo) {
            return;
        }
        this.wordList.array = this.panelInfo.item_2;
        //倒计时
        this.timer.clear(this, this.textLoop);
        this.textLoop();
        this.timer.loop(1000, this, this.textLoop);
        //道具
        for (let i = 0; i < 12; i++) {
            var sdata = this.panelInfo.item_1[this.listPos[i]];
            var item = this.itemList[i];
            var itemData = new ItemData(sdata.gid);
            itemData.Count = sdata.num;
            itemData.serverInfo.Quality = sdata.quality;
            itemData.serverInfo.BindState = sdata.bind;
            item.itemData = itemData;
            item.toolTipData = itemData;
            this.imgList[i].visible = sdata.get_flag == 1;
        }
        if (!this.choujiangIng) {
            this.selectItem(this.selectIndex - 1);
        }
        //抽奖消耗
        var cfg = LotteryVo.get(1);
        var itemdata: ItemData = new ItemData(cfg.cost_goods[0]);
        this.costIcon.skin = ResUtils.getItemIcon(itemdata.clientInfo.icon);
        this.costNumLb.text = "x" + (SPetChoujiangData.instance.getChoujiangTimes(this._type) + 1) * cfg.cost_goods[1];
    }

    public selectItem(index: number): void {
        for (let i = 0; i < 12; i++) {
            this.itemList[i].isSelect = false;
            // this.itemList[i].filters = null;
        }
        if (index < 0) {
            return;
        }
        // this.itemList[index].filters = [WJFilterUtils.ins.RED_GLOW];
        this.itemList[index].isSelect = true;
    }

    //抽奖列表
    private updateWordItem(cell: Laya.Box, index: number): void {
        var data = this.panelInfo.item_2[index];
        var attrLb = (cell.getChildByName("infoLb") as Laya.HTMLDivElement);
        var item = new ItemData(data.goodsno);
        var itemColor = HtmlUtils.getColor(item.clientInfo.quality);
        attrLb.innerHTML = HtmlUtils.addColor(data.name, "#ffffff", 18) + HtmlUtils.addColor("&nbsp;获得了&nbsp;", "#c4d8b9", 18) +
            HtmlUtils.addColor(item.clientInfo.name + "x" + data.num, itemColor, 18);
    }

    private textLoop(): void {
        var recoverTime = this.panelInfo && this.panelInfo.next_reset_time;
        var rcLeftTime = recoverTime - GameUtils.TimeStamp;
        if (rcLeftTime < 0) {
            rcLeftTime = 0;
            this.request();
        }
        var hh = TimerUtil.fullhh(rcLeftTime);
        var mm = TimerUtil.mm(rcLeftTime);
        var ss = TimerUtil.ss(rcLeftTime);
        //倒计时
        this.txt_time.text = hh + "时" + mm + "分" + ss + "秒后刷新";
    }

    private btnRewardClick(): void {
        var isOver: boolean = true;
        for (let i = 0; i < this.panelInfo.item_1.length; i++) {
            var ele = this.panelInfo.item_1[i];
            if (ele.get_flag == 0) {
                isOver = false;
                break;
            }
        }
        if (isOver) {
            MsgManager.instance.showRollTipsMsg("您已掏空奖池，请等待奖池刷新");
            return;
        }
        if (this.choujiangIng) {
            return;
        }
        this.choujiangIng = true;
        SPetChoujiangData.instance.protocol.send31101(this._type);
    }

    public destroy(): void {
        super.destroy();
        this.removeEvent();
        this.timer.clear(this, this.textLoop);
        this.timer.clear(this, this.choujiangRunning);
        SGameData.instance.showSaveItem();
        SBagData.instance.showSaveItem();
        this.choujiangIng = false;
    }

    //抽奖的相关行为==========================================================================
    private choujiangIng: boolean = false;
    //开始时候转间隔时间
    private startTimeCd: number = 200;
    //抽奖加速时间间隔
    private upChangeCd: number = 50;
    //最快时间转动间隔
    private fastestCd: number = 50;
    //减速时间时间间隔
    private downChangeCd: number = 20;
    //最大转动次数
    private maxZhuanTime: number = 50;

    //现在的index
    private nowIndex: number = 0;
    //现在间隔的时间
    private nowCdTime: number = 0;
    //已经转动的次数
    private hadzhuanTime: number = 0;

    public startShowChoujiang(): void {
        if (SPetChoujiangData.instance.getChoujiangInfo(this._type).code != 0) {
            // MsgManager.instance.showRollTipsMsg("道具不足或背包已满，无法抽奖");
            this.choujiangIng = false;
            return;
        }
        //把奖励排除
        var rewardNo = SPetChoujiangData.instance.getChoujiangInfo(this._type).no;
        for (let i = 0; i < this.panelInfo.item_1.length; i++) {
            var ele = this.panelInfo.item_1[i];
            if (ele.no == rewardNo) {
                SGameData.instance.hideItemNoList = [ele.gid];
                SBagData.instance.hideItemNoList = [ele.gid];
                break;
            }
        }

        this.nowIndex = this.selectIndex;
        var listIndex = SPetChoujiangData.instance.getRewardIndex(this._type);
        var posindex = 0;
        for (let i = 0; i < this.listPos.length; i++) {
            var pos = this.listPos[i];
            if (listIndex == pos) {
                posindex = i;
                break;
            }
        }
        this.selectIndex = posindex + 1;
        this.nowCdTime = this.startTimeCd;
        this.hadzhuanTime = 0;
        this.choujiangRunning();
    }

    public choujiangRunning(): void {
        this.nowIndex++;
        this.hadzhuanTime++;
        if (this.nowIndex > 12) {
            this.nowIndex -= 12;
        }
        this.selectItem(this.nowIndex - 1);
        if (this.hadzhuanTime < this.maxZhuanTime) {
            if (this.nowCdTime > this.fastestCd) {
                this.nowCdTime -= this.upChangeCd;
            } else {
                //平滑运行过程
            }
        } else {
            this.nowCdTime += this.downChangeCd;
        }
        if (this.nowCdTime >= this.startTimeCd && this.nowIndex == this.selectIndex) {
            this.choujiangOver();
        } else {
            this.timer.once(this.nowCdTime, this, this.choujiangRunning);
        }
    }

    public choujiangOver(): void {
        this.choujiangIng = false;
        SGameData.instance.showSaveItem();
        SBagData.instance.showSaveItem();
        this.request();
    }


}


export class choujiangItem extends BaseItem {
    constructor() {
        super();
    }

    public set isSelect(value: Boolean) {
        if (value) {
            if (this._selectBg == null) {
                this._selectBg = new Laya.Image();
                this._selectBg.sizeGrid = "35,35,35,35";
                this._selectBg.skin = ResUtils.getItemBase("img_select_2");//选中
                this._selectBg.width = this._selectBgStyle > 0 ? this._selectBgStyle : (this.width + 8);
                this._selectBg.height = this._selectBgStyle > 0 ? this._selectBgStyle : (this.height + 10);
                this._middleLayer.addChild(this._selectBg);
                this._selectBg.x = (this.width - this._selectBg.width) / 2 - 8 * this.scaleX;
                this._selectBg.y = (this.height - this._selectBg.height) / 2 - 8 * this.scaleX;
                this._selectBg.scaleX = this._selectBg.scaleY = 1.2;
            }
        }
        else {
            if (this._selectBg) {
                this._selectBg.removeSelf();
                this._selectBg = null;
            }
        }
    }

}