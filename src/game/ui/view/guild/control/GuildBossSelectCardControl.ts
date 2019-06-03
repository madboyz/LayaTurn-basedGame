import { GuildBossSelectCardPanel } from "../panel/GuildBossSelectCardPanel";

export class GuildBossSelectCardControl extends BaseControl {
    constructor() {
        super();
        this.panel = new GuildBossSelectCardPanel();
    }

    public set panel(value: GuildBossSelectCardPanel) {
        this.mPanel = value;
    }

    public get panel(): GuildBossSelectCardPanel {
        return this.mPanel as GuildBossSelectCardPanel;
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