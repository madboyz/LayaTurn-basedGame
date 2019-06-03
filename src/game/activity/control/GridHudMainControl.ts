import { GridHudMainPage } from "../view/GridHudMainPage";
import { SGridSceneData, SGridSceneEvent } from "../data/SGridSceneData";
import { SGameData, SGameEvent } from "../../../net/data/SGameData";

export class GridHudMainControl extends BaseControl {
    constructor() {
        super();
        this.panel = new GridHudMainPage();
    }

    public set panel(value: GridHudMainPage) {
        this.mPanel = value;
    }

    public get panel(): GridHudMainPage {
        return this.mPanel as GridHudMainPage;
    }

    openView(...args) {
        this.initEvent();
    }

    private initEvent() {
        SGridSceneData.instance.on(SGridSceneEvent.GRIRD_ROLL_UPDATE,this,this.onUpdateRollNum);
        SGridSceneData.instance.on(SGridSceneEvent.GRIRD_SCORE_UPDATE,this,this.onScoreUpdate);
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
        SGridSceneData.instance.on(SGridSceneEvent.GRIRD_NO_UPDATE,this,this.onGridNoUpdate);
        SGridSceneData.instance.on(SGridSceneEvent.GRIRD_ROLL_STATE,this,this.onGridRandStateUpdate);
    }

    private removeEvent() {
        SGridSceneData.instance.off(SGridSceneEvent.GRIRD_ROLL_UPDATE,this,this.onUpdateRollNum);
        SGridSceneData.instance.off(SGridSceneEvent.GRIRD_SCORE_UPDATE,this,this.onScoreUpdate);
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
        SGridSceneData.instance.off(SGridSceneEvent.GRIRD_NO_UPDATE,this,this.onGridNoUpdate);
        SGridSceneData.instance.off(SGridSceneEvent.GRIRD_ROLL_STATE,this,this.onGridRandStateUpdate);
    }

    private onGridRandStateUpdate()
    {
        this.panel.updateGridState();
    }

    private onGridNoUpdate()
    {
        this.panel.updateGridNo();
    }

    private onUpdateFightState()
    {
        this.panel.updateBattleState();
    }
    
    private onScoreUpdate()
    {
        this.panel.updateScore();
    }

    private onUpdateRollNum(Point:number)
    {
        this.panel.updateRollNum(Point);
    }

    closeView() {
        super.closeView();
        this.removeEvent();
    }
}