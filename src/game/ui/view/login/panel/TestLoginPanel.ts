import { SLogin } from '../../../../../net/data/SLogin';

export class TestLoginPanel extends ui.main.TestLoginUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isFullScreen = true;
        this.mResouce = [
            //面板需要的ui资源
            { url: "res/atlas/startgame.atlas", type: Laya.Loader.ATLAS },//面板需要的ui资源
        ];
    }

    public initComp() {
        super.initComp();
        //TODO:第一次打开面板初始化面板信息/aa
        this.mouseThrough = true;
        var txt: string = localStorage.getItem("key");
        if (!txt) txt = GameConfig.TEST_ACCOUNT;
        this.NameInput.text = txt;
    }
    public update() {
        //TODO:第二次打开面板
        super.update();
    }

    public open(...args): void {
        super.open();
    }

    private onWssLoginBtn(): void {
        GameConfig.TEST_ACCOUNT = this.NameInput.text;
        localStorage.setItem("key", this.NameInput.text);
        SLogin.instance.TestLogin();
        this.close();
    }


    public initEvent(): void {
        //TODO:初始化面板监听
        this.WssLoginBtn.on(Laya.Event.CLICK, this, this.onWssLoginBtn);
    }
    public removeEvent(): void {
        //TODO:移除面板监听
        this.WssLoginBtn.off(Laya.Event.CLICK, this, this.onWssLoginBtn);
    }

    public close(): void {
        super.close();
        //TODO:关闭面板处理
    }
}