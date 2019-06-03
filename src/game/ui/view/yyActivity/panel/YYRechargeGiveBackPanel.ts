import { Cost_get_reward_cfgVo } from "../../../../../db/sheet/vo/Cost_get_reward_cfgVo";
import { S31200_1 } from "../../../../../net/pt/pt_31";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { ProgressBar } from "../../../compent/ProgressBar";
import { RewardList } from "../../../compent/RewardList";
import { SRechargeData } from "../../recharge/data/SRechargeData";
import { SYYActivityData, SYYActivityEvent } from "../data/SYYActivityData";
import { ItemData } from "../../../compent/data/ItemData";

//开服兑换活动
export class YYRechargeGiveBackPanel extends ui.main.YYRechargeGiveBackPanelUI {
    public thisData: any;

    constructor() {
        super();
        this.initEvent();
        this.initComp();
        this.requestInfo();
    }

    private requestInfo(): void {
        SYYActivityData.instance.protocol.send13003();
    }

    private initEvent(): void {
        SYYActivityData.instance.on(SYYActivityEvent.YYACTIVITY_OPEN_CHANGE, this, this.updateData);
        SYYActivityData.instance.on(SYYActivityEvent.YYACTIVITY_NUM_DATA_BACK, this, this.updateData);
    }

    private removeEvent(): void {
        SYYActivityData.instance.off(SYYActivityEvent.YYACTIVITY_OPEN_CHANGE, this, this.updateData);
        SYYActivityData.instance.off(SYYActivityEvent.YYACTIVITY_NUM_DATA_BACK, this, this.updateData);
    }


    public initComp() {
        this.initList();
        //list列表
        var data = SYYActivityData.instance.yyRechargeGiveBackData();
        var mainData = JSON.parse(data.content);
        var start_time = new Date(mainData.iconStartTime*1000); 
        var end_time = new Date(mainData.iconEndTime*1000); 
        this.timeLb.text = "活动时间：" + TimerUtil.getStrDate2(start_time)  + "-" + TimerUtil.getStrDate2(end_time);
        var str = (mainData.content as string).replace(/\'/g ,"\"");
        this.thisData = JSON.parse(str);
    }


    private initList(): void {
        this.itemList.itemRender = YYRechargeGiveBackItem;
        this.itemList.vScrollBarSkin = "";
    }

    public updateData(): void {
        this.itemList.array = this.thisData.show_list.child;
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }
}


//道具的奖励ITEM
export class YYRechargeGiveBackItem extends ui.main.YYRechargeGiveBackItemUI {
    private _mData: any;
    private _rewarldList: RewardList;
    private _progressBar: ProgressBar;

    constructor() {
        super();
        this.initComp();
    }

    private initComp(): void {
        this._rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this._rewarldList.showNameNum = false;
        this._rewarldList.rowCount = 5;
        this._rewarldList.maxNum = 5;
        this._rewarldList.itemStyle = 70;
        this._rewarldList.x = 0;
        this._rewarldList.y = 0;
        this.rewardBox.addChild(this._rewarldList);

        this._progressBar = new ProgressBar();
        this._progressBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("bar"), 465, 20);
        this._progressBar.setLabel(1, 20, "#ffffff");
        this._progressBar.x = 0;
        this._progressBar.y = 0;
        this.progressBox.addChild(this._progressBar);

        this.combat.url = "res/atlas/number/fight.atlas";
    }

    public set dataSource(data: any) {
        if (!data) return;
        this._mData = data;
        var recharge = SYYActivityData.instance.giveBackRechargeNum;

        this._progressBar.setValue(recharge, data.count);
        this.combat.text = data.count + "";
        this.wordImgSub.x = this.combat.x + this.combat.w * 0.8 + 3;
        this.getImg.visible = recharge >= data.count;

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

    }

    public destroy(): void {
        this._rewarldList.removeSelf();
        this._rewarldList = null;
        this._progressBar.removeSelf();
        this._progressBar = null;
        super.destroy()
    }

}