import { SLogin, SLoginEvent } from './../../../../../net/data/SLogin';
import { SGameData, SGameEvent } from './../../../../../net/data/SGameData';
import { TestLoginPanel } from "../panel/TestLoginPanel";
import { Debug } from '../../../../../debug/Debug';

export class TestLoginControl extends BaseControl{
    //private protocol:LoginProtocol;
    constructor() {
        super();
        this.panel = new TestLoginPanel();//面板view
        //this.protocol = new LoginProtocol();
    }

    public set panel(value: TestLoginPanel) {
        this.mPanel = value;
    }
    public get panel(): TestLoginPanel {
        return this.mPanel as TestLoginPanel;
    }
    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        //TODO:初始化服务器发送给客户端关于此面板的事件
        
        
    }
    private removeEvent() {
        //TODO:移除事件监听
        
        
    }

    public get getEvent(): Array<any> {
        return [NotityEvents.TESTLOGINNOTITY];//注册模块通讯
    }
    public excuting(notity: NotityData): void {
        var event: any = notity.event;
        var data: any = notity.data;
        var funList: Function[] = [];

        funList[NotityEvents.TESTLOGINNOTITY] = this.testNotice;
        var fun: Function = funList[event];
        fun.call(this, notity.data);
    }
    private testNotice():void
    {
        Debug.serverLog("测试模块通讯～～～～～～～");
    }
}