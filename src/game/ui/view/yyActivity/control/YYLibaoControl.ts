import { YYLibaoPanel } from "../panel/YYLibaoPanel";

export class YYLibaoControl extends BaseControl {
    constructor() {
        super();
        this.panel = new YYLibaoPanel();
    }

    public set panel(value: YYLibaoPanel) {
        this.mPanel = value;
    }

    public get panel(): YYLibaoPanel {
        return this.mPanel as YYLibaoPanel;
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