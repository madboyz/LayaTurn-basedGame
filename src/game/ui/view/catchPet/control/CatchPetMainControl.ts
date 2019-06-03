import { CatchPetMainPanel } from "../panel/CatchPetMainPanel";
export class CatchPetMainControl extends BaseControl {
    constructor()
    {
        super();
        this.panel = new CatchPetMainPanel();
    }

    public set panel(value: CatchPetMainPanel) {
        this.mPanel = value;
    }

    public get panel(): CatchPetMainPanel {
        return this.mPanel as CatchPetMainPanel;
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