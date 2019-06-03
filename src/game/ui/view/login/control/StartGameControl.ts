import { StartGamePanel } from "../panel/StartGamePanel";
import { SLogin, SLoginEvent } from "../../../../../net/data/SLogin";
import { SGameData, SGameEvent } from "../../../../../net/data/SGameData";

export class StartGameControl extends BaseControl {
    constructor() {
        super();
        this.panel = new StartGamePanel();
    }

    public set panel(value: StartGamePanel) {
        this.mPanel = value;
    }
    public get panel(): StartGamePanel {
        return this.mPanel as StartGamePanel;
    }

    openView(...args) {
        this.initEvent();
        this.onRequestList();
    }

    private initEvent() {
        SLogin.instance.on(SLoginEvent.LOGIN_SERVER_LIST_UPDATE, this, this.OnServreListUpdate);
        SGameData.instance.on(SGameEvent.GAME_REQUEST_LAND, this, this.onRequestLand);//申请登陆
        SLogin.instance.on(SLoginEvent.LOGIN_GET_SERVER_STATE, this, this.onRequsetServerState);//单个服务器状态请求遮罩显示
    }

    private removeEvent() {
        SLogin.instance.off(SLoginEvent.LOGIN_SERVER_LIST_UPDATE, this, this.OnServreListUpdate);
        SGameData.instance.off(SGameEvent.GAME_REQUEST_LAND, this, this.onRequestLand);
        SLogin.instance.off(SLoginEvent.LOGIN_GET_SERVER_STATE, this, this.onRequsetServerState);
    }

    private onRequsetServerState(isCallback: boolean) {
        Laya.timer.clear(this, this.CloseMask);
        if (!isCallback) {
            this.panel.Loging.visible = true;
            Laya.timer.once(5000, this, this.CloseMask);
        }
        else
            this.CloseMask();
    }

    private CloseMask() {
        this.panel.Loging.visible = false;
    }

    private OnServreListUpdate() {
        this.panel.UpdateDisplyer();
    }

    private onRequestList() {
        SLogin.instance.GetServerList();
        SLogin.instance.GetUpdateContent();
    }



    private onRequestLand(sid: number): void {
        SLogin.instance.Login(sid);
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

}