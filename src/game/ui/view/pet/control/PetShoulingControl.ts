import { SPetData, SPetEvent } from '../../../../../net/data/SPetData';
import { PetShoulingPanel } from '../panel/PetShoulingPanel';
import { PetProtocol } from '../protocol/PetProtocol';
export class PetShoulingControl extends BaseControl {

    private protocol: PetProtocol;

    constructor() {
        super();
        this.panel = new PetShoulingPanel();
        this.protocol = new PetProtocol();
        this.initEvent();
    }

    public set panel(value: PetShoulingPanel) {
        this.mPanel = value;
    }

    public get panel(): PetShoulingPanel {
        return this.mPanel as PetShoulingPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SPetData.instance.on(SPetEvent.PET_SHOULING_UP_SUCCEFUL,this,this.onUpdateData);
        this.panel.on(SPetEvent.PET_REQUEST_SHOULING_UP, this, this.onSend17049);
    }
    private removeEvent() {
        SPetData.instance.off(SPetEvent.PET_SHOULING_UP_SUCCEFUL,this,this.onUpdateData);
        this.panel.off(SPetEvent.PET_REQUEST_SHOULING_UP, this, this.onSend17049);
    }

    private onSend17049(obj: any): void {
        this.protocol.send17049(obj);
    }

    private onUpdateData():void{
        this.panel.update();
    }

}