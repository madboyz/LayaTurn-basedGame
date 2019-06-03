import { ComateStarPanel } from "../panel/ComateStarPanel";
import { SComateData, SComateEvent } from "../data/SComateData";
import { ComateInfo } from "../data/ComateInfo";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";

export class ComateStartControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateStarPanel();
    }

    public set panel(value: ComateStarPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateStarPanel {
        return this.mPanel as ComateStarPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SComateData.instance.on(SComateEvent.COMATE_SELECT_UPDATE , this , this.SelectUpdate);
        SComateData.instance.on(SComateEvent.COMATE_STAR_UPDATE , this , this.StarUpdate);
        this.panel.on(SComateEvent.COMATE_REQUEST_STAR , this, this.RequsetStar);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD , this , this.updateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE , this , this.updateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE , this , this.updateCost);
    }

    private removeEvent() {
        SComateData.instance.off(SComateEvent.COMATE_SELECT_UPDATE , this , this.SelectUpdate);
        SComateData.instance.off(SComateEvent.COMATE_STAR_UPDATE , this , this.StarUpdate);
        this.panel.off(SComateEvent.COMATE_REQUEST_STAR , this, this.RequsetStar);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD , this , this.updateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE , this , this.updateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE , this , this.updateCost);
    }

    private updateCost() {
        this.panel.updateCost();
    }

    private StarUpdate() {
        this.panel.updateBattle();
        this.panel.updateStar();
        this.panel.updateCost();
    }

    private RequsetStar()
    {
        SComateData.instance.protocol.send37003(SComateData.instance.CurrentComate.Id);
    }

    private SelectUpdate() {
        this.panel.SelectUpdate();
    }
}