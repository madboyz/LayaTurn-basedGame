import { PetAddPoint } from "../panel/PetAddPoint";
import { PetAddPointProtocol } from "../protocol/PetAddPointProtocol";
import { SPetData, SPetEvent } from "../../../../../net/data/SPetData";

export class PetAddPointControl extends BaseControl {
    private protocol:PetAddPointProtocol;
    constructor() {
        super();
        this.panel = new PetAddPoint();
        this.protocol = new PetAddPointProtocol();
    }

    public set panel(value: PetAddPoint) {
        this.mPanel = value;
    }

    public get panel(): PetAddPoint {
        return this.mPanel as PetAddPoint;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SPetEvent.PET_REQUEST_WASHPOINT,this,this.onSend17035);
        this.panel.on(SPetEvent.PET_REQUEST_ADDPOINT,this,this.onSend17034);
    }
    private removeEvent() {
        this.panel.off(SPetEvent.PET_REQUEST_WASHPOINT,this,this.onSend17035);
        this.panel.off(SPetEvent.PET_REQUEST_ADDPOINT,this,this.onSend17034);
    }

    private onSend17034(obj:any):void
    {
        this.protocol.send17034.apply(this.protocol,obj);
    }

    private onSend17035(obj:any):void
    {
        this.protocol.send17035.apply(this.protocol,obj);
    }
}