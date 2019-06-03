import { SChatEvent } from './../../../../../net/data/SChatData';
import { ChatPanel } from './../panel/ChatPanel';
import { ChatProtocol } from '../protocol/ChatProtocol';
import { SChatData } from '../../../../../net/data/SChatData';
import { SNewBattleData, SNewBattleEvent } from '../../../../../net/data/SNewBattleData';
import { SGameEvent, SGameData } from '../../../../../net/data/SGameData';
export class ChatControl extends BaseControl {
    private protocol: ChatProtocol;
    constructor() {
        super();
        this.panel = new ChatPanel();
        this.protocol = new ChatProtocol();
    }

    public set panel(value: ChatPanel) {
        this.mPanel = value;
    }

    public get panel(): ChatPanel {
        return this.mPanel as ChatPanel;
    }

    public get getEvent(): Array<any> {
        return [NotityEvents.CHAT_SENDMSG];
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateState);
        SChatData.instance.on(SChatEvent.CHAT_ADDNEWMSG, this, this.onAddMsg);//新增一条聊天
        SChatData.instance.on(SChatEvent.CHAT_REQUEST_BROADCASTINFOLIST, this, this.onRequest11202);//玩家获取运营后台广播信息详细信息

        this.panel.on(SChatEvent.CHAT_REQUEST_SENDMSG, this, this.requestSendChatMsg);//申请聊天
        this.panel.on(SChatEvent.CHAT_REQUEST_BROADCASTIDLIST, this, this.onRequest11201);//玩家进入游戏后获取当前用到的广播id列表
        this.onRequest11201();
    }
    private removeEvent() {
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateState);
        this.panel.off(SChatEvent.CHAT_REQUEST_SENDMSG, this, this.requestSendChatMsg);
        this.panel.off(SChatEvent.CHAT_REQUEST_BROADCASTIDLIST, this, this.onRequest11201);//玩家进入游戏后获取当前用到的广播id列表

        SChatData.instance.off(SChatEvent.CHAT_ADDNEWMSG, this, this.onAddMsg);
        SChatData.instance.off(SChatEvent.CHAT_REQUEST_BROADCASTINFOLIST, this, this.onRequest11202);//玩家获取运营后台广播信息详细信息
    }

    public excuting(notity: NotityData): void {
        var event: any = notity.event;
        var data: any = notity.data;
        var funList: Function[] = [];

        funList[NotityEvents.CHAT_SENDMSG] = this.requestSendChatMsg;
        var fun: Function = funList[event];
        fun.call(this, notity.data);
    }

    private onRequest11201(): void {
        this.protocol.send11201();//玩家进入游戏后获取当前用到的广播id列表
    }
    private onRequest11202(): void {
        this.protocol.send11202();//玩家获取运营后台广播信息详细信息
    }

    private onAddMsg(obj: any): void {
        this.panel.msgReceive.apply(this.panel, obj);//新增一条新消息
    }

    private onUpdateState(bl: boolean): void {
        this.panel.showState();
    }

    private requestSendChatMsg(obj: any): void {
        this.protocol.requestSendChatMsg.apply(this.protocol, obj);//申请发生聊天信息
        SChatData.instance.startSendBtnCool(obj[1] == ChatChannel.WORLD);//聊天后按钮灰掉
    }

}