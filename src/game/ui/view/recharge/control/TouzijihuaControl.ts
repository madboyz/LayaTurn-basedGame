import { TouzijihuaPanel } from "../panel/TouzijihuaPanel";
import { SRechargeData } from "../data/SRechargeData";

export class TouzijihuaControl extends BaseControl {
    constructor() {
        super();
        this.panel = new TouzijihuaPanel();
    }

    public set panel(value: TouzijihuaPanel) {
        this.mPanel = value;
    }

    public get panel(): TouzijihuaPanel {
        return this.mPanel as TouzijihuaPanel;
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
        SRechargeData.instance.protocol.send13128();//请求投资计划数据
    }

    //处理面板状态相关==========================================
    //更新
    private updateData(): void {
        this.panel.update()
    }


}