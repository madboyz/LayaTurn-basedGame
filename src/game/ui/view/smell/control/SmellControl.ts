import { SmellPanel } from "../panel/SmellPanel";
import { SmellProtocol } from "../protocol/SmellProtocol";
import { SGoodsEvent, SBagData } from "../../../../../net/data/SBagData";

export class SmellControl extends BaseControl {
    private protocol:SmellProtocol;
    constructor() {
        super();
        this.panel = new SmellPanel();
        this.protocol = new SmellProtocol();
    }

    public set panel(value: SmellPanel) {
        this.mPanel = value;
    }

    public get panel(): SmellPanel {
        return this.mPanel as SmellPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SGoodsEvent.G00D_SMELL,this,this.onSend15073);

        SBagData.instance.on(SGoodsEvent.GOOD_SMELL_SUCCEFUL,this,this.onUpdate);
    }
    private removeEvent() {
        this.panel.off(SGoodsEvent.G00D_SMELL,this,this.onSend15073);

        SBagData.instance.off(SGoodsEvent.GOOD_SMELL_SUCCEFUL,this,this.onUpdate);
    }

    public get getEvent(): Array<any> {
        return [NotityEvents.SURESELECTEQUIPSMELL];
    }
    public excuting(notity: NotityData): void {
        var event: any = notity.event;
        var data: any = notity.data;
        var funList: Function[] = [];

        funList[NotityEvents.SURESELECTEQUIPSMELL] = this.onUpdate;
        var fun: Function = funList[event];
        fun.call(this, notity.data);
    }

    private onUpdate():void
    {
        this.panel.update();
    }

    private onSend15073():void
    {
        this.protocol.send15073(SBagData.instance.equip.smellList);
    }
}