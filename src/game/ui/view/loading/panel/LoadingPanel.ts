import { ProgressBar } from "../../../compent/ProgressBar";
import { SGameData } from "../../../../../net/data/SGameData";

export class LoadingPanel extends ui.main.LoadingPanelUI {
    public TotalBar:ProgressBar;
    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isFullScreen = true;
        this.mResouce = [
            { url: "res/atlas/loading.atlas", type: Laya.Loader.ATLAS },//面板需要的ui资源
        ];
    }

    public initComp() {
        super.initComp();
        this.RefreshText.underline = true;
        this.TotalBar = new ProgressBar(); 
        this.TotalBar.setGrid("0,75,0,75","7,16,7,16");
        this.TotalBar.setBg("loading/progressBg.png","loading/progressbar2.png",502,61 ,50 ,21 ,16 ,50);
        this.TotalBar.x = 40;
        this.TotalBar.y = 804;
        this.TotalBar.centerX = 0;
        this.TotalBar.bottom = 126;
        this.addChild(this.TotalBar);
        this.TotalBar.setLabel(1,17,"#ffffff",0,100,1,"#309203");
        this.TotalBar.setValue(1,1);
        this.TotalBar.Text = "加载中";
        //Laya.Browser.window.launchLoading.remove();
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
        this.TotalBar.visible = true;
        this.UpdateProgress(this.arg[0]);

    }

    public open(...args): void {
        super.open();
    }
    

    public initEvent(): void {
        this.RefreshText.on(Laya.Event.CLICK,this,this.onClickText);
    }

    public removeEvent(): void {
        this.RefreshText.off(Laya.Event.CLICK,this,this.onClickText);
    }

    public UpdateProgress(tips:string):void {
        this.TotalBar.setValue(SGameData.instance.LoadingCount,GameConfig.GAME_LOAD_COUNT);
        this.TotalBar.Text = tips;
    }

    private onClickText()
    {
        var location = window["location"];
        if(location)
        location.reload();
    }

    public close(): void {
        super.close();
    }
}