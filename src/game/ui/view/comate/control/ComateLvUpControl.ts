import { SComateData, SComateEvent } from "../data/SComateData";
import { ComateLvUpPanel } from "../panel/ComateLvUpPanel";
import { ComatemainProtocol } from "../protocol/ComatemainProtocol";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";


export class ComateLvUpControl extends BaseControl {
    private protocol: ComatemainProtocol;

    constructor() {
        super();
        this.panel = new ComateLvUpPanel();
        this.protocol = new ComatemainProtocol();
    }

    public set panel(value: ComateLvUpPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateLvUpPanel {
        return this.mPanel as ComateLvUpPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        // SComateData.instance.on(SComateEvent.COMATE_REQUEST_LVUP , this , this.SelectUpdate);
        SComateData.instance.on(SComateEvent.COMATE_SELECT_UPDATE , this , this.SelectUpdate);
        SComateData.instance.on(SComateEvent.COMATE_LVUP_SUCCESS , this , this.ComateLvUp);
        this.panel.on(SComateEvent.COMATE_REQUEST_LVUP , this, this.onSend37011);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD , this , this.updateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE , this , this.updateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE , this , this.updateCost);
    }
    
    private removeEvent() {
        SComateData.instance.off(SComateEvent.COMATE_SELECT_UPDATE , this , this.SelectUpdate);
        SComateData.instance.off(SComateEvent.COMATE_LVUP_SUCCESS , this , this.ComateLvUp);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD , this , this.updateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE , this , this.updateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE , this , this.updateCost);
        this.panel.off(SComateEvent.COMATE_REQUEST_LVUP , this, this.onSend37011);
    }

    // private RequsetLine()
    // {
    //     var lines = [];
    //     for (let i = 0; i < SComateData.instance.CurrentLine.keys.length; i++) {
    //         const key = SComateData.instance.CurrentLine.keys[i];
    //         var no = SComateData.instance.CurrentLine.get(key);
    //         var line = {ObjNo:no , Pos:key};
    //         lines.push(line);
    //     }
    //     SComateData.instance.protocol.send37008(lines);
    // }

    private ComateLvUp() {
        this.panel.SelectUpdate();
        this.panel.showUIEffect();
    }

    private updateCost() {
        this.panel.updateCost();
    }

    private SelectUpdate() {
        this.panel.SelectUpdate(true);//选择了新英雄，停止自动升级
    }

    private onSend37011(obj: any): void {
        this.protocol.send37011(obj);
    }
}