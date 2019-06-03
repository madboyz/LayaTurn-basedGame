import { CreateRoleProtocol } from './../protocol/CreateRoleProtocol';
import { SRoleEvent } from './../../../../../net/data/SRoleData';
import { CreateRolePanel } from "../panel/CreateRolePanel";
import { Debug } from '../../../../../debug/Debug';


export class CreateRoleControl extends BaseControl{
    private protocol:CreateRoleProtocol;
    constructor() {
        super();
        this.panel = new CreateRolePanel();//面板view
        this.protocol = new CreateRoleProtocol();
    }

    public set panel(value: CreateRolePanel) {
        this.mPanel = value;
    }
    public get panel(): CreateRolePanel {
        return this.mPanel as CreateRolePanel;
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
        this.panel.on(SRoleEvent.ROLE_REQUEST_CREATEROLE,this,this.onCreateRole); //点击创建角色的时候派发 this.event(SRoleEvent.ROLE_REQUEST_CREATEROLE,[[3,1,1,"onlyWe","ios"]]);
    }
    private removeEvent() {
        //TODO:移除事件监听
        this.panel.off(SRoleEvent.ROLE_REQUEST_CREATEROLE,this,this.onCreateRole);
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
    private onCreateRole(obj:any):void
    {
        this.protocol.requestCreateRole.apply(this.protocol,obj);
    }
}