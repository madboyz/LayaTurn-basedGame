import { ItemData } from "../../../compent/data/ItemData";
import { RewardList } from "../../../compent/RewardList";
import { TabBar } from "../../../compent/TabBar";
import { SYYActivityData } from "../data/SYYActivityData";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { S22001, S22002 } from "../../../../../net/pt/pt_22";
import { S20001, S20002 } from "../../../../../net/pt/pt_20";

export class YYRankPanel extends ui.main.YYRankPanelUI {
    // public thisData: any[];

    private mTab: TabBar;
    public curIndex: number = -1;
    public initTab: number = -1;
    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        this.itemList.itemRender = YYRankItem;
        this.itemList.vScrollBarSkin = "";
        if (!this.mTab) {
            this.mTab = new TabBar([this.btn_0, this.btn_1, this.btn_2, this.btn_3]);
            this.mTab.on(Laya.Event.CHANGE, this, this.onTabChange);
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "冲榜活动", 550, 750, 50);
        super.open();
        this.initTab = -1;
        this.onOpen();
        if (this.tabIndex != 0) {
            this.mTab.select = this.tabIndex;
        } else {
            this.mTab.select = this.initTab;
        }
    }

    private onOpen(): void {
        //list列表
        var datas = SYYActivityData.instance.yyRankData();
        // var mainData = JSON.parse(data.content);
        // var start_time = new Date(mainData.iconStartTime * 1000);
        // var end_time = new Date(mainData.iconEndTime * 1000);
        // this.timeLb.text = "活动时间：" + TimerUtil.getStrDate2(start_time) + "-" + TimerUtil.getStrDate2(end_time);
        // var str = (mainData.content as string).replace(/\'/g, "\"");
        // this.thisData = JSON.parse(str);


        //判断上面一排活动按钮
        var count: number = 0;
        for (let i = 0; i < 4; i++) {
            const btn: component.ScaleButton = this["btn_" + i] as component.ScaleButton;
            var needShow: boolean = false;
            var data = datas[i];
            if (data) {
                needShow = true;
                var mainData = JSON.parse(data.content);
                var title: string = mainData.title;
                var firNum = Math.floor(title.length / 2);
                var str = title.substr(0, firNum) + "\n" + title.substr(firNum, title.length - 1);
                btn.label = str;
            }
            if (needShow) {
                btn.x = count * 105 + 140;
                btn.visible = true;
                count++;
                (this.initTab == -1) && (this.initTab = i);
            } else {
                btn.visible = false;
            }
        }
    }

    private onTabChange(index: number, btn: Laya.Button) {
        if (this.curIndex != index) {
            this.curIndex = index;
        }
        (this[("btn_" + index)] as component.ScaleButton).selected = true;
        //向后端请求
        var data = SYYActivityData.instance.yyRankData()[this.curIndex];
        var mainData = JSON.parse(data.content);
        var str = (mainData.content as string).replace(/\'/g, "\"");
        var subData = JSON.parse(str);
        // this.indexData = this.rankDataList.get()
        var rankType = subData.show_list.child[0].data3;
        SYYActivityData.instance.rankProtocal.RequsetRank(rankType, 10, 1);
        this.updateData();
    }

    public rankDataList: Laya.Dictionary = new Laya.Dictionary;
    public indexData: S22001 | S22002;

    public rankDataBack(data: S22001 | S22002): void {
        this.rankDataList.set(data.RankType, data);
        this.updateData();
    }

    public updateData(): void {
        var data = SYYActivityData.instance.yyRankData()[this.curIndex];
        var mainData = JSON.parse(data.content);
        var start_time = new Date(mainData.iconStartTime * 1000);
        var end_time = new Date(mainData.iconEndTime * 1000);
        this.timeLb.text = "活动时间：" + TimerUtil.getStrDate2(start_time) + "-" + TimerUtil.getStrDate2(end_time);
        var str = (mainData.content as string).replace(/\'/g, "\"");
        var subData = JSON.parse(str);

        this.itemList.array = subData.show_list.child;
    }

    public close(): void {
        super.close();
    }
}


//道具的奖励ITEM
export class YYRankItem extends ui.main.YYRankItemUI {
    private _mData: any;
    private _rewarldList: RewardList;

    constructor() {
        super();
        this.initComp();
    }

    private initComp(): void {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 5;
        this._rewarldList.maxNum = 5;
        this._rewarldList.itemStyle = 65;
        this._rewarldList.x = 0;
        this._rewarldList.y = 0;
        this.rewardBox.addChild(this._rewarldList);

        HtmlUtils.setHtml(this.rankLb.style, 6, 16, "center", "top");
        this.lookBtn.on(Laya.Event.CLICK,this,this.lookBtnClick);
    }

    public set dataSource(data: any) {
        if (!data) return;
        this._mData = data;

        var goods = data.goods_list;
        var showList = [];
        for (let i = 0; i < goods.length; i++) {
            const element = goods[i];
            var itemdata = new ItemData(element.goods_no);
            itemdata.Count = element.count;
            itemdata.serverInfo.Quality = element.quality;
            showList.push(itemdata);
        }
        this._rewarldList.updateRewards(showList);
        this.rankLb.innerHTML = HtmlUtils.showColorStr(data.title, 18)

        this.noDataLb.text = this.nameLb.text = this.powerLb.text = "";
        this.lookBtn.visible = false;

        var showPlayer = data.data1 == data.data2;
        if (showPlayer) {
            var playerData: S22001 | S22002 = (this.parent.parent.parent as YYRankPanel).rankDataList.get(data.data3);
            if (playerData && playerData.item_1[data.data1]) {
                if(playerData instanceof S22001){
                    var use = playerData.item_1[data.data1];
                    if (data.data3 == 1002 ) {
                        //等级排行榜单独处理
                        this.nameLb.text = "" + use.PlayerName;
                        this.powerLb.text = "Lv." + use.item_1[0].Value;
                    }else{
                        this.nameLb.text = "" + use.PlayerName;
                        this.powerLb.text = "战:" + use.Bp;
                    }
                } else if (playerData instanceof S22002){
                    var use2 = playerData.item_1[data.data1];
                    this.nameLb.text = "" + use2.PlayerName;
                    this.powerLb.text = "战:" + use2.item_1[0].Value;
                }
            }else{
                this.noDataLb.text = "虚位以待";
            }
        } else {
            this.lookBtn.visible = true;
        }
    }

    public lookBtnClick():void{
        (this.parent.parent.parent as YYRankPanel).close();
        UIManager.instance.openUI(UIID.SYS_RANK,[this._mData.data3])
    }

    public destroy(): void {
        this._rewarldList.removeSelf();
        this._rewarldList = null;
        super.destroy()
    }

}