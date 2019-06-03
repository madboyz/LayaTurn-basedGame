import { BuyCountProtocol } from "../protocol/BuyCountProtocol";
import { BuyCountPanel } from "../panel/BuyCountPanel";
import { SGoodsEvent } from "../../../../../net/data/SBagData";

export class  BuyCountControl extends BaseControl{
    private protocol:BuyCountProtocol;
    constructor() {
        super();
        this.panel = new BuyCountPanel();
        this.protocol = new BuyCountProtocol();
    }

    public set panel(value: BuyCountPanel) {
        this.mPanel = value;
    }

    public get panel(): BuyCountPanel {
        return this.mPanel as BuyCountPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SGoodsEvent.GOODS_REQUEST_BUYCOUNT,this,this.onSend15022);
    }
    private removeEvent() {
        this.panel.off(SGoodsEvent.GOODS_REQUEST_BUYCOUNT,this,this.onSend15022);
    }

    private onSend15022(obj:any):void
    {
        this.protocol.send15022.apply(this.protocol,obj);
    }
}