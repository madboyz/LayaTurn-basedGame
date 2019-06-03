import { YYGiveBackPanel } from "../panel/YYGiveBackPanel";

export class YYGiveBackControl extends BaseControl {
    constructor() {
        super();
        this.panel = new YYGiveBackPanel();
    }

    public set panel(value: YYGiveBackPanel) {
        this.mPanel = value;
    }

    public get panel(): YYGiveBackPanel {
        return this.mPanel as YYGiveBackPanel;
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
    //更新
    private updateData(): void {
        this.panel.updateData()
    }


}