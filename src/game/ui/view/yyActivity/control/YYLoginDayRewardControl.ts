import { YYLoginDayRewardPanel } from "../panel/YYLoginDayRewardPanel";

export class YYLoginDayRewardControl extends BaseControl {
    constructor() {
        super();
        this.panel = new YYLoginDayRewardPanel();
    }

    public set panel(value: YYLoginDayRewardPanel) {
        this.mPanel = value;
    }

    public get panel(): YYLoginDayRewardPanel {
        return this.mPanel as YYLoginDayRewardPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
    }
    private removeEvent() {
    }

    //处理面板状态相关==========================================


}