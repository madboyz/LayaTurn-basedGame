import { YuekaPanel } from "../panel/YuekaPanel";
import { SRechargeData } from "../data/SRechargeData";

export class YuekaControl extends BaseControl {
    constructor() {
        super();
        this.panel = new YuekaPanel();
    }

    public set panel(value: YuekaPanel) {
        this.mPanel = value;
    }

    public get panel(): YuekaPanel {
        return this.mPanel as YuekaPanel;
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
        SRechargeData.instance.protocol.send13098();//请求月卡数据
    }

    //处理面板状态相关==========================================
    //更新
    private updateData(): void {
        this.panel.update()
    }


}