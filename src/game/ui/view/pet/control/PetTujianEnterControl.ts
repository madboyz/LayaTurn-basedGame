import { PetTujianEnterPanel } from '../panel/PetTujianEnterPanel';
export class PetTujianEnterControl extends BaseControl {
    
    private static _instance: PetTujianEnterControl;
    public static get instance(): PetTujianEnterControl {
        this._instance = this._instance || new PetTujianEnterControl();
        return this._instance;
    }

    constructor() {
        super();
        this.panel = new PetTujianEnterPanel();
    }

    public set panel(value: PetTujianEnterPanel) {
        this.mPanel = value;
    }

    public get panel(): PetTujianEnterPanel {
        return this.mPanel as PetTujianEnterPanel;
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