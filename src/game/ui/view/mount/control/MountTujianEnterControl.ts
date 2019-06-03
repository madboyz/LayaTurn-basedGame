import { MountTujianEnterPanel } from '../panel/MountTujianEnterPanel';
export class MountTujianEnterControl extends BaseControl {
    
    private static _instance: MountTujianEnterControl;
    public static get instance(): MountTujianEnterControl {
        this._instance = this._instance || new MountTujianEnterControl();
        return this._instance;
    }

    constructor() {
        super();
        this.panel = new MountTujianEnterPanel();
    }

    public set panel(value: MountTujianEnterPanel) {
        this.mPanel = value;
    }

    public get panel(): MountTujianEnterPanel {
        return this.mPanel as MountTujianEnterPanel;
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