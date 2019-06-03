import { DartLogPanel } from "../panel/DartLogPanel";
import { SDartData, SDartEvent } from "../../../../dart/data/SDartData";

export class DartLogControl extends BaseControl {
    constructor()
    {
        super();
        this.panel = new DartLogPanel();
    }

    public set panel(value: DartLogPanel) {
        this.mPanel = value;
    }

    public get panel(): DartLogPanel {
        return this.mPanel as DartLogPanel;
    }

    openView(...args) {
        this.initEvent();
        this.requestLogs();
    }

    closeView() {
        this.removeEvent();
    }

    private requestLogs()
    {
        SDartData.instance.protocol.send42003();
    }

    private initEvent() {
        SDartData.instance.on(SDartEvent.DART_LOG_UPDATE,this,this.onLogUpdate);
        SDartData.instance.on(SDartEvent.DART_ONE_LOG_UPDATE,this,this.onLogUpdate);
    }

    private removeEvent() {
        SDartData.instance.off(SDartEvent.DART_LOG_UPDATE,this,this.onLogUpdate);
        SDartData.instance.off(SDartEvent.DART_ONE_LOG_UPDATE,this,this.onLogUpdate);
    }

    private onLogUpdate() {
        this.panel.LogList.array = SDartData.instance.MyLogs;
        this.panel.Nodata.visible = SDartData.instance.MyLogs.length == 0?true:false;
    }
}