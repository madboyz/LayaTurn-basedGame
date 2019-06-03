import { MountTujianPanel } from '../panel/MountTujianPanel';
export class MountTujianControl extends BaseControl {
    
    private static _instance: MountTujianControl;
    public static get instance(): MountTujianControl {
        this._instance = this._instance || new MountTujianControl();
        return this._instance;
    }

    constructor() {
        super();
        this.panel = new MountTujianPanel();
    }

    public set panel(value: MountTujianPanel) {
        this.mPanel = value;
    }

    public get panel(): MountTujianPanel {
        return this.mPanel as MountTujianPanel;
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