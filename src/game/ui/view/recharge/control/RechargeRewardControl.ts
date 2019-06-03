import { RechargeRewardPanel } from "../panel/RechargeRewardPanel";
import { SRechargeData } from "../data/SRechargeData";

export class RechargeRewardControl extends BaseControl {
    constructor() {
        super();
        this.panel = new RechargeRewardPanel();
    }

    public set panel(value: RechargeRewardPanel) {
        this.mPanel = value;
    }

    public get panel(): RechargeRewardPanel {
        return this.mPanel as RechargeRewardPanel;
    }

    openView(...args) {
        this.initEvent();
        this.request();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
    }
    private removeEvent() {
    }

    private request():void{
        SRechargeData.instance.protocol.send13130();//请求累计充值奖励
    }


}