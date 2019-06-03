import { S31061 } from "../../../../../net/pt/pt_31";
import { TabBar } from "../../../compent/TabBar";
import { SYYActivityData } from "../data/SYYActivityData";
import { SdkManager } from "../../../../../net/SdkManager";
import { GameUtils } from "../../../../utils/GameUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { RewardList } from "../../../compent/RewardList";
import { ItemData } from "../../../compent/data/ItemData";

export class YYLibaoPanel extends ui.main.YYLibaoPanelUI {
    private mTab: TabBar;
    private _rewarldList: RewardList;

    public curIndex: number = -1;
    public panelType: number = -1;//1为技能礼包，2为天赋礼包,3法宝礼包，4命格礼包;
    public panelData: S31061;
    public jsonData: any;
    public subJsonData: any;
    public tabList: any[];

    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/osActivity.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        this.buyBtn.on(Laya.Event.CLICK, this, this.buyBtnClick);
    }

    public removeEvent(): void {
        this.buyBtn.off(Laya.Event.CLICK, this, this.buyBtnClick);
    }

    public initComp() {
        super.initComp();
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 6;
        this._rewarldList.maxNum = 6;
        this._rewarldList.itemStyle = 70;
        this._rewarldList.x = 0;
        this._rewarldList.y = 0;
        this.rewardBox.addChild(this._rewarldList);

        HtmlUtils.setHtml(this.tabLb0.style, 3, 16, "center", "middle")
        HtmlUtils.setHtml(this.tabLb1.style, 3, 16, "center", "middle")
        HtmlUtils.setHtml(this.tabLb2.style, 3, 16, "center", "middle")
        HtmlUtils.setHtml(this.tabLb3.style, 3, 16, "center", "middle")
        this.tabLb0.color = "#fed421";
        this.tabLb1.color = "#fed421";
        this.tabLb2.color = "#fed421";
        this.tabLb3.color = "#fed421";
    }

    public open(...args): void {
        this.initWindow(true, false, "超值礼包", 550, 750, 50);
        super.open();
        this.onOpen();
        this.mTab.select = this.tabIndex;
    }

    private onOpen(): void {
        this.panelType = this.arg[0];
        if (this.panelType == 1) {
            this.panelData = SYYActivityData.instance.getYYLibaoData("技能礼包")[0];
        } else if (this.panelType == 2) {
            this.panelData = SYYActivityData.instance.getYYLibaoData("天赋礼包")[0];
        } else if (this.panelType == 3) {
            this.panelData = SYYActivityData.instance.getYYLibaoData("法宝礼包")[0];
        } else if (this.panelType == 4) {
            this.panelData = SYYActivityData.instance.getYYLibaoData("命格礼包")[0];
        }
        this.jsonData = JSON.parse(this.panelData.content);
        var str = (this.jsonData.content as string).replace(/\'/g, "\"");
        this.subJsonData = JSON.parse(str);
        this.tabList = this.subJsonData.show_list.child
        for (let i = 0; i < 4; i++) {
            const element: component.ScaleButton = this["btn_" + i];
            const element2: Laya.HTMLDivElement = this["tabLb" + i];
            element.visible = i < this.tabList.length;
            element2.visible = i < this.tabList.length;
            element2.mouseEnabled = false;
        }
        //页签文字
        for (let i = 0; i < this.tabList.length; i++) {
            const element = this.tabList[i];
            const element2: Laya.HTMLDivElement = this["tabLb" + i];
            element2.innerHTML = HtmlUtils.showColorStr(element.title);
        }

        this.timer.clear(this, this.textLoop);
        this.textLoop();
        this.timer.loop(1000, this, this.textLoop);
    }

    private onTabChange(index: number, btn: Laya.Button) {
        if (this.curIndex != index) {
            this.curIndex = index;
        }
        this.updateData();
    }

    public updateData(): void {
        if (this.panelType == 1) {
            this.titleLb.text = "技能礼包"
        } else if (this.panelType == 2) {
            this.titleLb.text = "天赋礼包"
        } else if (this.panelType == 3) {
            this.titleLb.text = "法宝礼包"
        } else if (this.panelType == 4) {
            this.titleLb.text = "命格礼包"
        }
        this.wordImg.skin = "osActivity/yy_libao_word_" + this.panelType + ".png";

        var showData = this.tabList[this.curIndex];
        this.realPriceLb.text = "现价:" + showData.real_price;
        this.lastPriceLb.text = "原价:" + showData.ori_price;

        var showList = [];
        for (let i = 0; i < showData.goods_list.length; i++) {
            const element = showData.goods_list[i];
            var itemdata = new ItemData(element.goods_no);
            itemdata.Count = element.count;
            itemdata.serverInfo.Quality = element.quality;
            showList.push(itemdata);
        }
        this._rewarldList.updateRewards(showList);

        if (GameConfig.GAME_DEBUG) {
            this.testLb1.visible = true;
            this.testLb2.visible = true;
            this.testLb2.text = showData.shop_no + "";
        } else {
            this.testLb1.visible = false;
            this.testLb2.visible = false;
        }
    }

    private textLoop(): void {
        var rcLeftTime = this.jsonData.endTime - GameUtils.TimeStamp;
        if (rcLeftTime < 0) {
            rcLeftTime = 0;
        }
        var hh = TimerUtil.fullhh(rcLeftTime);
        var mm = TimerUtil.mm(rcLeftTime);
        var ss = TimerUtil.ss(rcLeftTime);
        this.leftTimeLb.text = hh + ":" + mm + ":" + ss;
    }


    public buyBtnClick(): void {
        var showData = this.tabList[this.curIndex];
        SdkManager.instance.Pay(showData.shop_no, showData.real_price);
    }

    public close(): void {
        this.timer.clear(this, this.textLoop);
        super.close();
    }
}
