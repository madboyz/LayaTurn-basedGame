import { BagPanel } from '../panel/BagPanel';
import { BagProtocol } from './../protocol/BagProtocol';
import { SBagData, SGoodsEvent } from '../../../../../net/data/SBagData';
export class BagControl extends BaseControl {
    private protocol:BagProtocol;
    constructor() {
        super();
        this.panel = new BagPanel();
        this.protocol = new BagProtocol();
    }

    public set panel(value: BagPanel) {
        this.mPanel = value;
    }

    public get panel(): BagPanel {
        return this.mPanel as BagPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SBagData.instance.on(SGoodsEvent.GOODS_ADD,this,this.onUpdate);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE,this,this.onUpdate);
        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE,this,this.onUpdate);
        SBagData.instance.on(SGoodsEvent.GOODS_BUYCOUNT_SUCCEFUL,this,this.onUpdate);
    }
    private removeEvent() {
        SBagData.instance.off(SGoodsEvent.GOODS_ADD,this,this.onUpdate);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE,this,this.onUpdate);
        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE,this,this.onUpdate);
        SBagData.instance.off(SGoodsEvent.GOODS_BUYCOUNT_SUCCEFUL,this,this.onUpdate);
    }

    private onUpdate():void
    {
        this.panel.updateData();
    }

    private onUpdateCount():void
    {
        this.panel.updateData();
    }
}