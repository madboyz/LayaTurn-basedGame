import { SActiveRewardData, SActiveRewardEvent } from "../../dayReward/data/SActiveRewardData";
import { WudaohuiPanel } from "../panel/WudaohuiPanel";
import { SWudaohuiData, SWudaohuiEvent } from "../data/SWudaohuiData";

export class WudaohuiControl extends BaseControl {
    constructor() {
        super();
        this.panel = new WudaohuiPanel();
    }

    public set panel(value: WudaohuiPanel) {
        this.mPanel = value;
    }

    public get panel(): WudaohuiPanel {
        return this.mPanel as WudaohuiPanel;
    }

    openView(...args) {
        this.initEvent();
        SWudaohuiData.instance.protocol.send27000();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SWudaohuiData.instance.on(SWudaohuiEvent.WUDAPHUI_PANEL_DATA,this,this.update);
        SWudaohuiData.instance.on(SWudaohuiEvent.WUDAOHUI_START_MATCH,this,this.startMatch);
    }
    private removeEvent() {
        SWudaohuiData.instance.off(SWudaohuiEvent.WUDAPHUI_PANEL_DATA,this,this.update);
        SWudaohuiData.instance.off(SWudaohuiEvent.WUDAOHUI_START_MATCH,this,this.startMatch);
    }

    private startMatch():void{
        this.panel.startMatch();
    }

    private update():void{
        this.panel.update();
    }


}