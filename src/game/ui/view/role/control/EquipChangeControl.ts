import { EquipChangePanel } from "../panel/EquipChangePanel";

export class EquipChangeControl extends BaseControl {
    constructor() {
        super();
        this.panel = new EquipChangePanel();
    }

    public set panel(value: EquipChangePanel) {
        this.mPanel = value;
    }

    public get panel(): EquipChangePanel {
        return this.mPanel as EquipChangePanel;
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

}