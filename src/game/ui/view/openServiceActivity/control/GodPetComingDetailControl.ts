import { GodPetComingDetailPanel } from "../panel/GodPetComingDetailPanel";

export class GodPetComingDetailControl extends BaseControl {
    constructor() {
        super();
        this.panel = new GodPetComingDetailPanel();
    }

    public set panel(value: GodPetComingDetailPanel) {
        this.mPanel = value;
    }

    public get panel(): GodPetComingDetailPanel {
        return this.mPanel as GodPetComingDetailPanel;
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
    }


}