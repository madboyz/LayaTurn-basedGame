import { DartInfoPanel } from "../panel/DartInfoPanel";
import { SDartData, SDartEvent } from "../../../../dart/data/SDartData";

export class DartInfoControl extends BaseControl {
    constructor()
    {
        super();
        this.panel = new DartInfoPanel();
    }

    public set panel(value: DartInfoPanel) {
        this.mPanel = value;
    }

    public get panel(): DartInfoPanel {
        return this.mPanel as DartInfoPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SDartData.instance.on(SDartEvent.DART_CALL_BACK_STAR,this,this.CallBackStar);
    }

    private removeEvent() {
        SDartData.instance.off(SDartEvent.DART_CALL_BACK_STAR,this,this.CallBackStar);
    }

    private CallBackStar(lv:number)
    {
        if(this.panel.otherRole != null)return;
        this.panel.onUpdateDart(SDartData.instance.MyDartInfo.cur_trunk,SDartData.instance.MyDartInfo.be_hijack);
        this.panel.refreshStar(SDartData.instance.MyDartInfo.cur_trunk);
    }
}