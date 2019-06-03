import { S31061, S31400 } from "../../../../../net/pt/pt_31";
import { RewardList } from "../../../compent/RewardList";
import { SYYActivityData, SYYActivityEvent } from "../data/SYYActivityData";
import { SActiveRewardData } from "../../dayReward/data/SActiveRewardData";
import { ItemData } from "../../../compent/data/ItemData";

export class YYLoginDayRewardPanel extends ui.main.YYLoginDayRewardPanelUI {
    public panelData: S31061;
    public jsonData: any;
    public subJsonData: any;
    public signinInfo: S31400;

    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/osActivity.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initEvent(): void {
        SYYActivityData.instance.on(SYYActivityEvent.YY_LOGIN_DAY_REWARD_DATA, this, this.updateData);
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        this.RewardList.itemRender = YYLoginDayRewardItem;
        this.RewardList.vScrollBarSkin = "";
    }

    public open(...args): void {
        this.initWindow(true, true, "节日签到", 550, 750, 50);
        super.open();
        this.onOpen();
    }

    private onOpen(): void {
        this.panelData = SYYActivityData.instance.yyLoginDayRewardData();
        this.jsonData = JSON.parse(this.panelData.content);
        var str = (this.jsonData.content as string).replace(/\'/g, "\"");
        this.subJsonData = JSON.parse(str);

        SYYActivityData.instance.protocol.send31400(this.subJsonData.show_list.child[0].data3);
    }

    public updateData(): void {
        this.signinInfo = SYYActivityData.instance.yyLoginReward;

        var showList = [];
        var maxDay: number = this.getMaxDay();
        for (let i = 0; i < maxDay; i++) {
            showList.push(i + 1);
        }
        this.RewardList.array = showList;
    }

    public getMaxDay(): number {
        var maxDay = 0;
        for (let i = 0; i < this.subJsonData.show_list.child.length; i++) {
            const element = this.subJsonData.show_list.child[i];
            maxDay = Math.max(maxDay, element.data2);
        }
        return maxDay;
    }

    public getDayReward(day: number): Array<any> {
        for (let i = 0; i < this.subJsonData.show_list.child.length; i++) {
            const element = this.subJsonData.show_list.child[i];
            if (day >= element.data1 && day <= element.data2) {
                return element.goods_list;
            }
        }
        return null;
    }


    public close(): void {
        super.close();
    }
}


export class YYLoginDayRewardItem extends ui.main.YYLoginDayRewardItemUI {
    private _rewarldList: RewardList;
    private mData: any;//vo
    constructor() {
        super();
        this.initList();
        this.GetBtn.on(Laya.Event.CLICK, this, this.GetBtnClick);
    }

    private initList(): void {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 5;
        this._rewarldList.maxNum = 5;
        this._rewarldList.itemStyle = 64;
        this._rewarldList.x = 18;
        this._rewarldList.y = 25;
        this.addChild(this._rewarldList);
    }

    public set dataSource(data: any) {
        if (!data) return;
        this.mData = data;
        this.updateData();
    }

    private updateData(): void {
        var panel = (this.parent.parent.parent as YYLoginDayRewardPanel);
        var reward = panel.getDayReward(this.mData);

        this.day_txt.text = `累计登录${this.mData}天`;

        var itemList = [];
        for (let i = 0; i < reward.length; i++) {
            const element = reward[i];
            var item = new ItemData(element.goods_no);
            item.serverInfo.Quality = element.quality;
            item.Count = element.count;
            itemList.push(item);
        }
        this._rewarldList.updateRewards(itemList);

        var getDay = panel.signinInfo.item_1.length;

        if (this.mData > getDay + 1) {
            this.IsGet.visible = false;
            this.GetBtn.visible = true;
            this.GetBtn.disabled = true;
        } else if (this.mData <= getDay) {
            this.IsGet.visible = true;
            this.GetBtn.visible = false;
        } else {
            if (panel.signinInfo.IsGet == 1) {
                this.IsGet.visible = false;
                this.GetBtn.visible = true;
                this.GetBtn.disabled = true;
            } else {
                this.IsGet.visible = false;
                this.GetBtn.visible = true;
                this.GetBtn.disabled = false;
            }
        }
    }

    public GetBtnClick(): void {
        var panel = (this.parent.parent.parent as YYLoginDayRewardPanel);
        SYYActivityData.instance.protocol.send31401(Number(panel.subJsonData.show_list.child[0].data3), this.mData);
    }

}