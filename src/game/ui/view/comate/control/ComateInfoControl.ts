import { SComateData, SComateEvent } from "../data/SComateData";
import { ComateInfoPanel } from "../panel/ComateInfoPanel";

export class ComateInfoControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateInfoPanel();
    }

    public set panel(value: ComateInfoPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateInfoPanel {
        return this.mPanel as ComateInfoPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SComateData.instance.on(SComateEvent.COMATE_SELECT_UPDATE , this , this.SelectUpdate);
        SComateData.instance.on(SComateEvent.COMATE_LINE_UPDATE , this , this.LineUpdate);
        SComateData.instance.on(SComateEvent.COMATE_HAVE_NEW , this , this.LineUpdate);
        this.panel.on(SComateEvent.COMATE_REQUEST_LINE , this, this.RequsetLine);
    }

    private removeEvent() {
        SComateData.instance.off(SComateEvent.COMATE_SELECT_UPDATE , this , this.SelectUpdate);
        SComateData.instance.off(SComateEvent.COMATE_LINE_UPDATE , this , this.LineUpdate);
        SComateData.instance.off(SComateEvent.COMATE_HAVE_NEW , this , this.LineUpdate);
        this.panel.off(SComateEvent.COMATE_REQUEST_LINE , this, this.RequsetLine);
    }

    private RequsetLine(comate_no:number,pos:number)
    {
        var lines = [];
        for (let i = 0; i < SComateData.instance.CurrentLine.keys.length; i++) {
            const key = SComateData.instance.CurrentLine.keys[i];
            var no = SComateData.instance.CurrentLine.get(key);
            var line = {ObjNo:no , Pos:key};
            lines.push(line);
        }
        if(comate_no != null && pos != null){
            lines.push({ObjNo:comate_no , Pos:pos})
        }
        SComateData.instance.protocol.send37008(lines);
    }

    private LineUpdate() {
        this.panel.updateSetState();
    }

    private SelectUpdate() {
        this.panel.SelectUpdate();
    }
}