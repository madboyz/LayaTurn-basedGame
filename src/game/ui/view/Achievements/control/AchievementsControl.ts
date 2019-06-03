import { AchievementsPanel } from "../panel/AchievementsPanel";
import { SChapterData, SChapterEvent } from "../../../../chapter/SChapterData";

export class AchievementsControl extends BaseControl {
    constructor() {
        super();
        this.panel = new AchievementsPanel();
    }

    public set panel(value: AchievementsPanel) {
        this.mPanel = value;
    }

    public get panel(): AchievementsPanel {
        return this.mPanel as AchievementsPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SChapterData.instance.on(SChapterEvent.ACHIEVEMENTS_UPDATE ,this , this.UpadteAchievement);
    }

    private removeEvent() {
        SChapterData.instance.off(SChapterEvent.ACHIEVEMENTS_UPDATE ,this , this.UpadteAchievement);
    }

    private UpadteAchievement() {
        this.panel.Refresh();
    }
}