import { ComatemainPanel } from "../panel/ComatemainPanel";
import { SComateData, SComateEvent } from "../data/SComateData";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";

export class ComatemainControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComatemainPanel();
    }

    public set panel(value: ComatemainPanel) {
        this.mPanel = value;
    }

    public get panel(): ComatemainPanel {
        return this.mPanel as ComatemainPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SComateData.instance.on(SComateEvent.COMATE_LINE_UPDATE , this , this.Update);
        SComateData.instance.on(SComateEvent.COMATE_STAR_UPDATE , this , this.Update);
        SComateData.instance.on(SComateEvent.COMATE_HAVE_NEW , this , this.NewComate);
        
    }

    private removeEvent() {
        SComateData.instance.off(SComateEvent.COMATE_LINE_UPDATE , this , this.Update);
        SComateData.instance.off(SComateEvent.COMATE_STAR_UPDATE , this , this.Update);
        SComateData.instance.off(SComateEvent.COMATE_HAVE_NEW , this , this.NewComate);
    }

    private Update() {
        this.panel.Refresh();
    }
    private NewComate(id)
    {
        var list = SComateData.instance.allData;
        var selectIndex = 0;
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            if(element.Id == id)
            {
                selectIndex = i;
                break;
            }
        }
        this.panel.Refresh(selectIndex);
    }
}