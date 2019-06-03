import { CopyLevelSelectPanel } from "../panel/CopyLevelSelectPanel";

export class CopyLevelSelectControl extends BaseControl {
    constructor(){
        super();
        this.panel = new CopyLevelSelectPanel();
    }
    public set panel(value: CopyLevelSelectPanel) {
        this.mPanel = value;
    }

    public get panel(): CopyLevelSelectPanel {
        return this.mPanel as CopyLevelSelectPanel;
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