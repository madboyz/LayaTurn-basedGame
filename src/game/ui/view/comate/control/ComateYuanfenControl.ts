import { ComateYuanfenPanel } from "../panel/ComateYuanfenPanel";
import { SComateData, SComateEvent } from "../data/SComateData";

export class ComateYuanfenControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateYuanfenPanel();
    }

    public set panel(value: ComateYuanfenPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateYuanfenPanel {
        return this.mPanel as ComateYuanfenPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SComateData.instance.on(SComateEvent.ANS_COMATE_YUANFEN,this,this.updateData);
    }
    
    private removeEvent() {
        SComateData.instance.off(SComateEvent.ANS_COMATE_YUANFEN,this,this.updateData);
    }

    public updateData():void{
        this.panel.update();
    }

}