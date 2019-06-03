import { PetRelivePanel } from "../panel/PetRelivePanel";

export class PetReliveControl extends BaseControl {
    constructor() {
        super();
        this.panel = new PetRelivePanel();
        this.initEvent();
    }

    public set panel(value: PetRelivePanel) {
        this.mPanel = value;
    }

    public get panel(): PetRelivePanel {
        return this.mPanel as PetRelivePanel;
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