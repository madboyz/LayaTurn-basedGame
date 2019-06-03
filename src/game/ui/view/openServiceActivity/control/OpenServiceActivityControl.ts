import { OpenServiceActivityPanel } from "../panel/OpenServiceActivityPanel";

export class OpenServiceActivityControl extends BaseControl {
    constructor() {
        super();
        this.panel = new OpenServiceActivityPanel();
    }

    public set panel(value: OpenServiceActivityPanel) {
        this.mPanel = value;
    }

    public get panel(): OpenServiceActivityPanel {
        return this.mPanel as OpenServiceActivityPanel;
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