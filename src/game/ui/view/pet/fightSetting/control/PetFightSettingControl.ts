import { PetFightSettingProtocol } from "../protocol/PetFightSettingProtocol";
import { PetFightSettingPanel } from "../panel/PetFightSettingPanel";

export class PetFightSettingControl extends BaseControl {
    private protocol:PetFightSettingProtocol;
    constructor() {
        super();
        this.panel = new PetFightSettingPanel();
        this.protocol = new PetFightSettingProtocol();
    }

    public set panel(value: PetFightSettingPanel) {
        this.mPanel = value;
    }

    public get panel(): PetFightSettingPanel {
        return this.mPanel as PetFightSettingPanel;
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
}