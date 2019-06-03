import { SPetData, SPetEvent } from '../../../../../net/data/SPetData';
import { PetTujianPanel } from '../panel/PetTujianPanel';
import { PetProtocol } from '../protocol/PetProtocol';
export class PetTujianControl extends BaseControl {
    
    private static _instance: PetTujianControl;
    public static get instance(): PetTujianControl {
        this._instance = this._instance || new PetTujianControl();
        return this._instance;
    }

    private protocol: PetProtocol;

    constructor() {
        super();
        this.panel = new PetTujianPanel();
        this.protocol = new PetProtocol();
    }

    public set panel(value: PetTujianPanel) {
        this.mPanel = value;
    }

    public get panel(): PetTujianPanel {
        return this.mPanel as PetTujianPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SPetData.instance.on(SPetEvent.ANS_PET_TUJIAN_UP,this,this.on17050);
        this.panel.on(SPetEvent.ASK_PET_TUJIAN_UP, this, this.onSend17050);
    }
    private removeEvent() {
        SPetData.instance.off(SPetEvent.ANS_PET_TUJIAN_UP,this,this.on17050);
        this.panel.off(SPetEvent.ASK_PET_TUJIAN_UP, this, this.onSend17050);
    }

    private onSend17050(obj: any): void {
        this.protocol.send17050(obj);
    }

    private on17050():void{
        this.panel.update();
    }

}