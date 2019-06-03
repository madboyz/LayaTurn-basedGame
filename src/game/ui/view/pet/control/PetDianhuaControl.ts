import { SPetData, SPetEvent } from '../../../../../net/data/SPetData';
import { PetDianhuaPanel } from '../panel/PetDianhuaPanel';
import { PetProtocol } from '../protocol/PetProtocol';
export class PetDianhuaControl extends BaseControl {
    
    private static _instance: PetDianhuaControl;
    public static get instance(): PetDianhuaControl {
        this._instance = this._instance || new PetDianhuaControl();
        return this._instance;
    }

    private protocol: PetProtocol;

    constructor() {
        super();
        this.panel = new PetDianhuaPanel();
        this.protocol = new PetProtocol();
    }

    public set panel(value: PetDianhuaPanel) {
        this.mPanel = value;
    }

    public get panel(): PetDianhuaPanel {
        return this.mPanel as PetDianhuaPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SPetData.instance.on(SPetEvent.PET_DIANHUA_SUCCEFUL,this,this.onUpdateData);
        this.panel.on(SPetEvent.PET_REQUEST_DIANHUA, this, this.onSend17048);
    }
    private removeEvent() {
        SPetData.instance.off(SPetEvent.PET_DIANHUA_SUCCEFUL,this,this.onUpdateData);
        this.panel.off(SPetEvent.PET_REQUEST_DIANHUA, this, this.onSend17048);
    }

    private onSend17048(obj: any): void {
        this.protocol.send17048(obj);
    }

    private onUpdateData():void{
        this.panel.update();
    }

}