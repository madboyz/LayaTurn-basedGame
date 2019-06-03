import { SActiveRewardData, SActiveRewardEvent } from "../../dayReward/data/SActiveRewardData";
import { FuliMainPanel } from "../panel/FuliMainPanel";
import { SSignInEvent, SSignInData } from "../data/SSignInData";

export class FuliMainControl extends BaseControl {
    constructor() {
        super();
        this.panel = new FuliMainPanel();
    }

    public set panel(value: FuliMainPanel) {
        this.mPanel = value;
    }

    public get panel(): FuliMainPanel {
        return this.mPanel as FuliMainPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SActiveRewardData.instance.on(SActiveRewardEvent.DAY_REWARD_UPDATE,this,this.updateData);
        SActiveRewardData.instance.on(SActiveRewardEvent.LEVEL_REWARD_UPDATE,this,this.updateData);
        SSignInData.instance.on(SSignInEvent.RECHARGE_STATE_CHANGE,this,this.updateData);
    }
    private removeEvent() {
        SActiveRewardData.instance.off(SActiveRewardEvent.DAY_REWARD_UPDATE,this,this.updateData);
        SActiveRewardData.instance.off(SActiveRewardEvent.LEVEL_REWARD_UPDATE,this,this.updateData);
        SSignInData.instance.off(SSignInEvent.RECHARGE_STATE_CHANGE,this,this.updateData);
    }

    //处理面板状态相关==========================================
    //更新
    private updateData(): void {
        this.panel.updateData()
    }


}