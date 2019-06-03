import { SActiveRewardData } from "../data/SActiveRewardData";
import { LevelRewardItem } from "./LevelRewardItem";
import { Upgrade_awardVo } from "../../../../../db/sheet/vo/Upgrade_awardVo";

export class LevelRewardPanel extends ui.main.LevelRewardPanelUI {
    constructor() {
        super();
        this.initComp();
        this.initEvent();
        this.onOpen();
    }

    public initComp() {
        this.initList();
    }

    private initList(): void {
        this.RewardList.itemRender = LevelRewardItem;
        this.RewardList.hScrollBarSkin = "";
        this.RewardList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.RewardList.scrollBar.elasticDistance = 100;
        this.RewardList.selectEnable = true;
    }

    public onOpen() {
        this.RewardList.array = SActiveRewardData.instance.LevelRewardList.values;
        var index = this.RewardList.array.length - 1;
        for (let i = 0; i < this.RewardList.array.length; i++) {
            if (this.RewardList.array[i].IsReward == 0) {
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

    public updateData() {
        this.RewardList.array = SActiveRewardData.instance.LevelRewardList.values;
    }

    public removeEvent(): void {
        this.RewardList.selectHandler = null;
        this.RewardList.mouseHandler = null;
    }

    public destroy(): void {
        this.removeEvent();
        super.destroy();
    }

    private selectInfo: LevelRewardItem;
    private onListChangeHandler(): void {
        this.selectInfo = this.RewardList.getCell(this.RewardList.selectedIndex) as LevelRewardItem;
    }
    private onClickItem(e: Laya.Event): void {
        if (e.type != Laya.Event.CLICK) {
            return;
        }
        if (e.target instanceof component.ScaleButton) {
            if (this.selectInfo.CanGet) {
                var no = this.selectInfo.dataSource.No;
                SActiveRewardData.instance.protocal.send13058(no);
            }
        }
    }

}