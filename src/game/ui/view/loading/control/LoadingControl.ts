import { LoadingPanel } from "../panel/LoadingPanel";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";

export class LoadingControl extends BaseControl{
    constructor() {
        super();
        this.panel = new LoadingPanel();//面板view
        //this.protocol = new LoginProtocol();
    }
    public set panel(value: LoadingPanel) {
        this.mPanel = value;
    }
    public get panel(): LoadingPanel {
        return this.mPanel as LoadingPanel;
    }

    openView(...args) {
        this.initEvent();
        SGameData.instance.InitLoading();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private UpdateProgress(tips:string)
    {
        this.panel.UpdateProgress(tips);
    }

    private initEvent() {
        SGameData.instance.on(SGameEvent.GAME_LOADING_UPDATE , this ,this.UpdateProgress)
    }

    private removeEvent() {
        SGameData.instance.off(SGameEvent.GAME_LOADING_UPDATE , this ,this.UpdateProgress)
    }
}