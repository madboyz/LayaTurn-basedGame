import { TeamBeRequestPanel } from "../panel/TeamBeRequestPanel";


export class TeamBeRequestControl extends BaseControl {
    constructor(){
        super();
        this.panel = new TeamBeRequestPanel();
    }

    openView(...args) {
        this.initEvent();
    }

    public set panel(value: TeamBeRequestPanel) {
        this.mPanel = value;
    }
    public get panel(): TeamBeRequestPanel {
        return this.mPanel as TeamBeRequestPanel;
    }

    private initEvent() {
    }

    private removeEvent() {
    }
    
    closeView() {
        this.removeEvent();
        super.closeView();
    }
}