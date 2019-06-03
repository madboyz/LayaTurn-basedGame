import { SComateEvent, SComateData } from "../data/SComateData";
import { ComateTalentInfoPanel } from "../panel/ComateTalentInfoPanel";

export class ComateTalentInfoControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateTalentInfoPanel();
    }

    public set panel(value: ComateTalentInfoPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateTalentInfoPanel {
        return this.mPanel as ComateTalentInfoPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SComateData.instance.on(SComateEvent.COMATE_TALENT_UPDATE , this , this.TalentUpdate);
    }

    private removeEvent() {
        SComateData.instance.off(SComateEvent.COMATE_TALENT_UPDATE , this , this.TalentUpdate);
    }

    private TalentUpdate()
    {
        this.panel.updateDes();
    }

}