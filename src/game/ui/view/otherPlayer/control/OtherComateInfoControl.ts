import { OtherComateInfoPanel } from "../panel/OtherComateInfoPanel";

export class OtherComateInfoControl extends BaseControl {
    constructor() {
        super();
        this.panel = new OtherComateInfoPanel();
    }

    public set panel(value: OtherComateInfoPanel) {
        this.mPanel = value;
    }

    public get panel(): OtherComateInfoPanel {
        return this.mPanel as OtherComateInfoPanel;
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