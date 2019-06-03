import { ComateTalentPanel } from "../panel/ComateTalentPanel";
import { SComateData, SComateEvent } from "../data/SComateData";
export class ComateTalentControl extends BaseControl {
    constructor() {
        super();
        this.panel = new ComateTalentPanel();
    }

    public set panel(value: ComateTalentPanel) {
        this.mPanel = value;
    }

    public get panel(): ComateTalentPanel {
        return this.mPanel as ComateTalentPanel;
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
        SComateData.instance.on(SComateEvent.COMATE_TALENT_UPDATE , this , this.updateTalent);
    }

    private removeEvent() {
        SComateData.instance.off(SComateEvent.COMATE_SELECT_UPDATE , this , this.SelectUpdate);
        SComateData.instance.off(SComateEvent.COMATE_TALENT_UPDATE , this , this.updateTalent);
    }

    private SelectUpdate() {
        this.panel.SelectImg.visible = false;
        this.panel.SelectUpdate();
    }

    private updateTalent()
    {
        this.panel.SelectUpdate();
    }
}