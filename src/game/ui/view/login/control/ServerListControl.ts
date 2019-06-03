import { ServerListPanel } from "../panel/ServerListPanel";

export class ServerListControl extends BaseControl {

    constructor() {
        super();
        this.panel = new ServerListPanel();
    }

    public set panel(value: ServerListPanel) {
        this.mPanel = value;
    }
    public get panel(): ServerListPanel {
        return this.mPanel as ServerListPanel;
    }

    openView(...args) {
        this.initEvent();
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