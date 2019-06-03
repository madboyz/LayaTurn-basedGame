import { SLogin, SLoginEvent } from "../../../../../net/data/SLogin";
import { SGameEvent, SGameData } from "../../../../../net/data/SGameData";

export class StartGamePanel extends ui.main.StartGamePanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isFullScreen = true;
        this.sameLevelEliminate = false;
        this.mResouce = [
            //面板需要的ui资源
            { url: "res/atlas/startgame.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.currentServerTxt.valign = "middle";
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
    }

    public initEvent(): void {
        this.gonggaoBtn.on(Laya.Event.CLICK, this, this.gonggaoBtnClick);
        this.ServerListBtn.on(Laya.Event.CLICK, this, this.onClickServerListBtn);
        this.LoginBtn.on(Laya.Event.CLICK, this, this.onClickEnterGameBtn);
    }

    public removeEvent(): void {
        this.gonggaoBtn.off(Laya.Event.CLICK, this, this.gonggaoBtnClick);
        this.ServerListBtn.off(Laya.Event.CLICK, this, this.onClickServerListBtn);
        this.LoginBtn.off(Laya.Event.CLICK, this, this.onClickEnterGameBtn);
    }

    public open(...args): void {
        super.open();
        this.Loging.visible = true;
        this.gonggaoBtn.x = Laya.stage.width - GameConfig.SCREEN_WIDTH + 520;
        //SLogin.instance.event(SLoginEvent.LOGIN_REQUEST_SERVER_LIST);
    }

    public UpdateDisplyer() {
        this.Loging.visible = false;
        var currentInfo = SLogin.instance.GetCurrentServer();
        if (!currentInfo)
            return;
        this.currentServerTxt.text = currentInfo.name;
        var index = 1;
        switch (currentInfo.state) {
            case 0:
                {
                    index = 4;
                    break;
                }
            case 1:
                {
                    index = 1;
                    break;
                }
            case 2:
                {
                    index = 3;
                    break;
                }
            default:
                {
                    index = 4;
                    break;
                }
        }
        this.CurrentServerState.skin = `startgame/img_server${index}.png`;
    }

    private gonggaoBtnClick():void{
        UIManager.instance.openUI(UIID.GONGGAO_PANEL);
    }

    private onClickServerListBtn() {
        UIManager.instance.openUI(UIID.SERVER_LIST);
    }

    private onClickEnterGameBtn() {
        SGameData.instance.event(SGameEvent.GAME_REQUEST_LAND, GameConfig.GAME_SERVER_ID);
    }

    public close(): void {
        super.close();
        //TODO:关闭面板处理
    }
}