import { Cost_get_reward_cfgVo } from "../../../../../db/sheet/vo/Cost_get_reward_cfgVo";
import { ItemData } from "../../../compent/data/ItemData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { RewardList } from "../../../compent/RewardList";
import { SOpenServiceActivityData, SOpenServiceActivityEvent } from "../data/SOpenServiceActivityData";
import { S31200_1 } from "../../../../../net/pt/pt_31";
import { TimerUtil } from "../../../../utils/TimerUtil";

//开服兑换活动
export class CostGetRewardPanel extends ui.main.CostGetRewardPanelUI {
    public cfgs: Array<Cost_get_reward_cfgVo>;

    constructor() {
        super();
        this.initEvent();
        this.initComp();
        this.requestInfo();
    }

    private requestInfo(): void {
        SOpenServiceActivityData.instance.protocol.send31200();
    }

    private initEvent(): void {
        SOpenServiceActivityData.instance.on(SOpenServiceActivityEvent.COST_ACTIVITY_DATA_REFRESH, this, this.updateData);
    }

    private removeEvent(): void {
        SOpenServiceActivityData.instance.off(SOpenServiceActivityEvent.COST_ACTIVITY_DATA_REFRESH, this, this.updateData);
    }


    public initComp() {
        this.initList();
        //list列表
        this.cfgs = Cost_get_reward_cfgVo.getAll()
        var data = SOpenServiceActivityData.instance.getActiveData(2);
        var start_time = new Date(data.start_time*1000); 
        var end_time = new Date(data.end_time*1000); 
        this.timeLb.text = "活动时间：" + TimerUtil.getStrDate2(start_time)  + "-" + TimerUtil.getStrDate2(end_time);
    }


    private initList(): void {
        this.itemList.itemRender = CostGetRewardItem;
        this.itemList.vScrollBarSkin = "";
    }

    public updateData(): void {
        this.itemList.array = this.cfgs;
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }
}


//道具的奖励ITEM
export class CostGetRewardItem extends ui.main.CostGetRewardItemUI {
    private _mData: Cost_get_reward_cfgVo;
    private _rewarldList: RewardList;
    private _progressBar: ProgressBar;

    constructor() {
        super();
        this.getBtn.on(Laya.Event.CLICK, this, this.getBtnClick);
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
        this.getBtn.refreshRed(true);
    }

    public set dataSource(data: Cost_get_reward_cfgVo) {
        if (!data) return;
        this._mData = data;
        var serverData = SOpenServiceActivityData.instance.getCostDataById(data.no);
        if (!serverData) {
            serverData = new S31200_1;
            serverData.No = data.no;
            serverData.Num = 0;
            serverData.State = 0;
        }
        var rewardId = data.reward[0];
        this._rewarldList.updateRewardsByNum(rewardId);

        // this._progressBar.setValue(1000, data.count);
        // this.combat.text = 1000 + "";

        this._progressBar.setValue(serverData.Num, data.count);
        this.combat.text = data.count + "";
        this.wordImgSub.x = this.combat.x + this.combat.w * 0.8 + 3;

        var hadGet = serverData.State == 2;
        var canGet = serverData.Num >=  data.count;
        this.hadGetImg.visible = hadGet;
        this.getBtn.visible = !hadGet && canGet;
    }

    private getBtnClick(): void {
        SOpenServiceActivityData.instance.protocol.send31201(this._mData.no);
    }

    public destroy(): void {
        this._rewarldList.removeSelf();
        this._rewarldList = null;
        this._progressBar.removeSelf();
        this._progressBar = null;
        super.destroy()
    }

}