import { FightSkillPanel } from './../panel/FightSkillPanel';
import { SNewBattleData, SNewBattleEvent } from '../../../../../net/data/SNewBattleData';
export class FightSkillControl extends BaseControl {
    constructor() {
        super();
        this.panel = new FightSkillPanel();
    }

    public set panel(value: FightSkillPanel) {
        this.mPanel = value;
    }



    public get panel(): FightSkillPanel {
        return this.mPanel as FightSkillPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    private initEvent() {
        SNewBattleData.instance.on(SNewBattleEvent.FIGHT_SKILL_INFO_UPDATE , this , this.updateSkill);
    }

    private removeEvent() {
        SNewBattleData.instance.off(SNewBattleEvent.FIGHT_SKILL_INFO_UPDATE , this , this.updateSkill);
    }

    public updateSkill() {
        this.panel.showSkill();
    }

    closeView() {
        super.closeView();
        this.removeEvent();
    }
}