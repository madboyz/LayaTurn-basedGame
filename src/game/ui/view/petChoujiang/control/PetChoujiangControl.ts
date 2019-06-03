import { PetChoujiangProtocol } from "../protocol/PetChoujiangProtocol";
import { SPetChoujiangEvent, SPetChoujiangData } from "../data/SPetChoujiangData";
import { PetChoujiangPanel } from "../panel/PetChoujiangPanel";

export class PetChoujiangControl extends  BaseControl{
    constructor() {
        super();
        this.panel = new PetChoujiangPanel();
        this.initEvent();
    }

    public set panel(value: PetChoujiangPanel) {
        this.mPanel = value;
    }

    public get panel(): PetChoujiangPanel {
        return this.mPanel as PetChoujiangPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
    }

    private initEvent() {
        SPetChoujiangData.instance.on(SPetChoujiangEvent.ANS_PANEL_INFO,this,this.on31100);
        SPetChoujiangData.instance.on(SPetChoujiangEvent.ANS_CHOUJIANG,this,this.on31101);
        
    }
    private removeEvent() {
        SPetChoujiangData.instance.off(SPetChoujiangEvent.ANS_PANEL_INFO,this,this.on31100);
        SPetChoujiangData.instance.off(SPetChoujiangEvent.ANS_CHOUJIANG,this,this.on31101);
    }

    private on31100():void{
        this.panel.updateData();
    }

    private on31101():void{
        this.panel.startShowChoujiang();
    }
}