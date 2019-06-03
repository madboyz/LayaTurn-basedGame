import { BehaviorVo } from "../../../../../db/sheet/vo/BehaviorVo";
import { DayMarkItem } from "./DayMarkItem";
import { SActiveRewardData } from "../data/SActiveRewardData";

export class DayMarkRewardPanel extends ui.main.DayMarkRewardPanelUI {
    constructor() {
        super();
        this.initComp();
        this.initEvent();
    }

    private RewardListData = [];

    public initComp() {
        this.RewardListData = BehaviorVo.get7DayReward();
        this.RewardListData.sort((a: BehaviorVo, b: BehaviorVo): any => {
            return a.no > b.no;
        });
        for (let i = 0; i < this.RewardListData.length; i++) {
            const element = this.RewardListData[i];
            element.index = i + 1;
        }
        this.initList();
    }

    private initList(): void {
        this.RewardList.itemRender = DayMarkItem;
        this.RewardList.vScrollBarSkin = "";
        this.RewardList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.RewardList.scrollBar.elasticDistance = 100;
        this.RewardList.selectEnable = true;
    }

    private selectInfo: DayMarkItem;
    private onListChangeHandler(): void {
        this.selectInfo = this.RewardList.getCell(this.RewardList.selectedIndex) as DayMarkItem;
    }

    private onClickItem(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }
        if (e.target instanceof component.ScaleButton) {
            if (this.selectInfo.CanGet) {
                var no = this.selectInfo.dataSource.no;
                SActiveRewardData.instance.protocal.send13056(no);
            }
        }
    }

    public updateData(): void {
        this.RefreshList();
    }

    public RefreshList() {
        var state = SActiveRewardData.instance.CurrentDayRewardInfo.state;
        for (let i = 0; i < this.RewardListData.length; i++) {
            const data = this.RewardListData[i];
            data.state = state;
            state = Math.floor(state / 2);
        }
        this.RewardList.array = this.RewardListData;
        var index = this.RewardList.array.length - 1;
        for (let i = 0; i < this.RewardList.array.length; i++) {
            var _state = this.RewardList.array[i].state;
            var canGet = _state % 2 == 1 ? false : true;
            if (canGet) {
                index = i;
                break;
            }
        }
        this.RewardList.scrollTo(index);
    }

    public initEvent(): void {
        this.RewardList.selectHandler = Laya.Handler.create(this, this.onListChangeHandler, null, false);
        this.RewardList.mouseHandler = Laya.Handler.create(this, this.onClickItem, null, false);
    }

    public removeEvent(): void {
        this.RewardList.selectHandler = null;
        this.RewardList.mouseHandler = null;
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }
}