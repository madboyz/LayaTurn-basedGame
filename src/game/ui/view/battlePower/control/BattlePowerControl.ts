import { BattlePowerPanel } from "../panel/BattlePowerPanel";

export class BattlePowerControl extends BaseControl {
    constructor() {
        super();
        this.panel = new BattlePowerPanel();//面板view
        //this.protocol = new LoginProtocol();
    }
    public set panel(value: BattlePowerPanel) {
        this.mPanel = value;
    }
    public get panel(): BattlePowerPanel {
        return this.mPanel as BattlePowerPanel;
    }

    openView(...args) {
    }

    closeView() {
        super.closeView();
    }
}