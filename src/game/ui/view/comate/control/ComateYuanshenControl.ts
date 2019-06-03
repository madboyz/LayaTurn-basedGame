import { SComateData, SComateEvent } from '../data/SComateData';
import { ComateYuanshenPanel } from '../panel/ComateYuanshenPanel';
export class ComateYuanshenControl extends BaseControl {
    
    private static _instance: ComateYuanshenPanel;
    public static get instance(): ComateYuanshenPanel {
        this._instance = this._instance || new ComateYuanshenPanel();
        return this._instance;
    }

    constructor() {
        super();
        this.panel = new ComateYuanshenPanel();
    }

    public set panel(value: ComateYuanshenPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateYuanshenPanel {
        return this.mPanel as ComateYuanshenPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SComateData.instance.on(SComateEvent.COMATE_ATTR_UPDATE, this, this.onUpdateData);
        SComateData.instance.on(SComateEvent.COMATE_YUANSHEN_UP_SUCCEFUL,this,this.onUpdateData);
    }
    private removeEvent() {
        SComateData.instance.off(SComateEvent.COMATE_ATTR_UPDATE, this, this.onUpdateData);
        SComateData.instance.off(SComateEvent.COMATE_YUANSHEN_UP_SUCCEFUL,this,this.onUpdateData);
    }

    private onUpdateData():void{
        this.panel.update();
    }

}