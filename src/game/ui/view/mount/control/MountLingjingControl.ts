import { SMountData, SMountEvent } from '../../../../../net/data/SmountData';
import { MountLingjingPanel } from '../panel/MountLingjingPanel';
export class MountLingjingControl extends BaseControl {

    constructor() {
        super();
        this.panel = new MountLingjingPanel();
        this.initEvent();
    }

    public set panel(value: MountLingjingPanel) {
        this.mPanel = value;
    }

    public get panel(): MountLingjingPanel {
        return this.mPanel as MountLingjingPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SMountData.instance.on(SMountEvent.MOUNT_LINGJING_UP_SUCCEFUL, this, this.onUpdateData);
    }
    private removeEvent() {
        SMountData.instance.off(SMountEvent.MOUNT_LINGJING_UP_SUCCEFUL, this, this.onUpdateData);
    }

    private onUpdateData(): void {
        this.panel.update();
    }

}