import { SeleclSceneObjPanel } from "../panel/SeleclSceneObjPanel";

export class SeleclSceneObjControl extends BaseControl {
    constructor() {
        super();
        this.panel = new SeleclSceneObjPanel();
    }


    public set panel(value: SeleclSceneObjPanel) {
        this.mPanel = value;
    }

    public get panel(): SeleclSceneObjPanel {
        return this.mPanel as SeleclSceneObjPanel;
    }

    openView(...args) {

    }

    closeView() {
        super.closeView();
    }
}