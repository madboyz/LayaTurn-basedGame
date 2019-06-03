import { PetSkillTujianPanel } from '../panel/PetSkillTujianPanel';
export class PetSkillTujianControl extends BaseControl {
    
    private static _instance: PetSkillTujianControl;
    public static get instance(): PetSkillTujianControl {
        this._instance = this._instance || new PetSkillTujianControl();
        return this._instance;
    }

    constructor() {
        super();
        this.panel = new PetSkillTujianPanel();
    }

    public set panel(value: PetSkillTujianPanel) {
        this.mPanel = value;
    }

    public get panel(): PetSkillTujianPanel {
        return this.mPanel as PetSkillTujianPanel;
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