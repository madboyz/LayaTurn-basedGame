import { ForgingPanel } from './../panel/ForgingPanel';
import { ForgingProtocol } from './../protocol/ForgingProtocol';
import { SForgingEvent, SForgingData } from '../../../../../net/data/SForgingData';
import { SBagData, SGoodsEvent } from '../../../../../net/data/SBagData';
export class ForgingControl extends BaseControl {
    private protocol:ForgingProtocol;
    constructor() {
        super();
        this.panel = new ForgingPanel();
        this.protocol = new ForgingProtocol();
        this.initEvent();
    }

    public set panel(value: ForgingPanel) {
        this.mPanel = value;
    }

    public get panel(): ForgingPanel {
        return this.mPanel as ForgingPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SForgingData.instance.on(SForgingEvent.FORGING0_STRENGTH_SUCCEFUL,this,this.onUpdateStrength);
        SForgingData.instance.on(SForgingEvent.FORGING0_INLAY_SUCCEFUL,this,this.onUpdateGem);
        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE,this,this.onUpdateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE,this,this.onUpdateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD,this,this.onUpdateCost);

        this.panel.on(SForgingEvent.FORGING_REQUEST_STRENGTH,this,this.onSend15071);//申请强化
        this.panel.on(SForgingEvent.FORGING_REQUEST_INLAY,this,this.onSend15007);//宝石镶嵌
    }
    private removeEvent() {
        SForgingData.instance.off(SForgingEvent.FORGING0_STRENGTH_SUCCEFUL,this,this.onUpdateStrength);
        SForgingData.instance.off(SForgingEvent.FORGING0_INLAY_SUCCEFUL,this,this.onUpdateGem);

        this.panel.off(SForgingEvent.FORGING_REQUEST_STRENGTH,this,this.onSend15071);
        this.panel.off(SForgingEvent.FORGING_REQUEST_INLAY,this,this.onSend15007);//宝石镶嵌
        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE,this,this.onUpdateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE,this,this.onUpdateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD,this,this.onUpdateCost);
    }

    private onSend15071(data:any):void
    {
        this.protocol.send15071.apply(this.protocol,data);
    }

    private onSend15007(data:any):void
    {
        this.protocol.send15007.apply(this.protocol,data);
    }

    private onUpdateStrength(pos:number,nextPos:number):void
    {
        this.panel.onUpdateStrength(pos,nextPos);
    }

    private onUpdateGem(pos:number,lv:number):void
    {
        this.panel.onUpdateGem(pos,lv);
    }

    private onUpdateCost():void
    {
        this.panel.updateCost();
    }
}