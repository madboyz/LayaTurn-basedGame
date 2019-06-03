import { StarRewardPanel } from "../panel/StarRewardPanel";

export class StarRewardControl extends BaseControl {
    private protocol:StarRewardPanel;
    constructor() {
        super();
        this.panel = new StarRewardPanel();
        this.initEvent();
    }

    public set panel(value: StarRewardPanel) {
        this.mPanel = value;
    }

    public get panel(): StarRewardPanel {
        return this.mPanel as StarRewardPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        
    }
    private removeEvent() {
        
    }

    private updateData():void
    {
        this.panel.updateData();
    }

}