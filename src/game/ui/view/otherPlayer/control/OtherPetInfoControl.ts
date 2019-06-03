import { OtherPetInfoPanel } from "../panel/OtherPetInfoPanel";

export class OtherPetInfoControl extends BaseControl {
    constructor() {
        super();
        this.panel = new OtherPetInfoPanel();
    }

    public set panel(value: OtherPetInfoPanel) {
        this.mPanel = value;
    }

    public get panel(): OtherPetInfoPanel {
        return this.mPanel as OtherPetInfoPanel;
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