import { SMountData, SMountEvent } from '../../../../../net/data/SmountData';
import { MountBianyiPanel } from '../panel/MountBianyiPanel';
export class MountBianyiControl extends BaseControl {

    constructor() {
        super();
        this.panel = new MountBianyiPanel();
        this.initEvent();
    }

    public set panel(value: MountBianyiPanel) {
        this.mPanel = value;
    }

    public get panel(): MountBianyiPanel {
        return this.mPanel as MountBianyiPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SMountData.instance.on(SMountEvent.MOUNT_BIANYI_UP_SUCCEFUL, this, this.onUpdateData);
    }
    private removeEvent() {
        SMountData.instance.off(SMountEvent.MOUNT_BIANYI_UP_SUCCEFUL, this, this.onUpdateData);
    }

    private onUpdateData(): void {
        this.panel.update();
    }

}