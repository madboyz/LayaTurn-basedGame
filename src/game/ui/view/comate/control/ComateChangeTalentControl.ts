import { SComateEvent, SComateData } from "../data/SComateData";
import { ComateChangeTalentPanel } from "../panel/ComateChangeTalentPanel";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";

export class ComateChangeTalentControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateChangeTalentPanel();
    }

    public set panel(value: ComateChangeTalentPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateChangeTalentPanel {
        return this.mPanel as ComateChangeTalentPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        this.panel.on(SComateEvent.COMATE_REQUEST_EXCHANGE , this, this.RequsetExChange);
        SComateData.instance.on(SComateEvent.COMATE_TALENT_UPDATE , this , this.TalentUpdate);

        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.updateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.updateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.updateCost);
    }

    private removeEvent() {
        this.panel.off(SComateEvent.COMATE_REQUEST_EXCHANGE , this, this.RequsetExChange);
        SComateData.instance.off(SComateEvent.COMATE_TALENT_UPDATE , this , this.TalentUpdate);

        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE, this, this.updateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE, this, this.updateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD, this, this.updateCost);
    }

    private TalentUpdate()
    {
        this.panel.updateTalentPoint();
    }

    private updateCost():void{
        this.panel.updateTalentPoint();
    }

    private RequsetExChange(point:number)
    {
        if(SComateData.instance.CurrentComate == null)
        return;
        SComateData.instance.protocol.send37004(SComateData.instance.CurrentComate.Id , point);
    }

}