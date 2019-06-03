import { GuildBossPanel } from "../panel/GuildBossPanel";

export class GuildBossControl extends BaseControl {
    constructor() {
        super();
        this.panel = new GuildBossPanel();
    }

    public set panel(value: GuildBossPanel) {
        this.mPanel = value;
    }

    public get panel(): GuildBossPanel {
        return this.mPanel as GuildBossPanel;
    }

    openView(...args) {
        if (UIManager.instance.hasOpenUI(UIID.SYS_MAIN) == false) {
            UIManager.instance.openUI(UIID.SYS_MAIN);
        }
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