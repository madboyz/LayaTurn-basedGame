import { SRoleData } from './SRoleData';
import { MarqueeManager } from './../../game/ui/manager/MarqueeManager';
import { S11001 } from '../pt/pt_11';
import { MsgManager } from './../../game/ui/manager/MsgManager';
import { DataManager } from './../../message/manager/DataManager';
import { S11002, S11003, S11004, S11005, S11006, S11007, S11008, S11009, S11010, S11011, S11100, S11201, S11202, S11203, S11204, S11205, S11300, S11301, S11202_2 } from './../pt/pt_11';
import { NoticeVo } from '../../db/sheet/vo/NoticeVo';
import { ChatInfo } from '../../game/ui/compent/data/ChatInfo';
import { ChatUtil } from '../../game/ui/view/chat/ChatUtil';
import { Debug } from '../../debug/Debug';
export class SChatData extends Laya.EventDispatcher {
    public readonly MAXLINE = 30;
    private typeMsgs: object = {};
    private allMsgList: Array<any>;
    private privateMsgList: Array<any>;
    private _nospeakInfo: S11010;
    public broadCastIDList: Array<any> = [];//运营广播id
    public broadCastInfoList: Array<any> = [];//运营广播详细信息
    private anExcuses: Array<number> = [];//禁言玩家列表
    public chatType: number = ChatType.WORLD;//当前聊天频道
    private static _instance: SChatData;
    public static get instance(): SChatData {
        return SChatData._instance || (SChatData._instance = new SChatData());
    }

    constructor() {
        super();
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E11001, this, this.onGetMessage);//世界消息
        DataManager.cancel(PROTOCOL.E11002, this, this.onGetMessage);//私聊消息
        DataManager.cancel(PROTOCOL.E11003, this, this.onGetMessage);//场景消息
        DataManager.cancel(PROTOCOL.E11004, this, this.onGetMessage);//系统消息
        DataManager.cancel(PROTOCOL.E11005, this, this.onGetMessage);//帮派消息
        DataManager.cancel(PROTOCOL.E11006, this, this.onGetMessage);//队伍消息
        DataManager.cancel(PROTOCOL.E11007, this, this.onGetMessage);//喇叭消息
        DataManager.cancel(PROTOCOL.E11008, this, this.onGetMessage);//种族消息
        DataManager.cancel(PROTOCOL.E11011, this, this.onGetMessage);//获得跨服竞技聊天
        DataManager.cancel(PROTOCOL.E11009, this, this.onGetChatRoleInfo);//获得聊天玩家的信息
        DataManager.cancel(PROTOCOL.E11010, this, this.onGetNoSpeak);//获得禁言消息
        DataManager.cancel(PROTOCOL.E11100, this, this.onGetChatState);//获得聊天状态返回
        DataManager.cancel(PROTOCOL.E11201, this, this.onGetBroadcastIds);//获得广播列表
        DataManager.cancel(PROTOCOL.E11202, this, this.onGetBroadcastInfos);//获得广播详细信息列表
        DataManager.cancel(PROTOCOL.E11203, this, this.onGetDeleteBroadCast);//删除某天广播信息
        DataManager.cancel(PROTOCOL.E11204, this, this.onGetNewBroadCast);//获得一条新的运营广播
        DataManager.cancel(PROTOCOL.E11205, this, this.onGetSystemTips);//获得一条系统提示
        DataManager.cancel(PROTOCOL.E11300, this, this.onGetAnExcuse);//禁言某个玩家
        DataManager.cancel(PROTOCOL.E11301, this, this.onGetClearAnExcuse);//取消禁言某个玩家
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E11001, this, this.onGetMessage);//世界消息
        DataManager.listen(PROTOCOL.E11002, this, this.onGetMessage);//私聊消息
        DataManager.listen(PROTOCOL.E11003, this, this.onGetMessage);//场景消息
        DataManager.listen(PROTOCOL.E11004, this, this.onGetMessage);//系统消息
        DataManager.listen(PROTOCOL.E11005, this, this.onGetMessage);//帮派消息
        DataManager.listen(PROTOCOL.E11006, this, this.onGetMessage);//队伍消息
        DataManager.listen(PROTOCOL.E11007, this, this.onGetMessage);//喇叭消息
        DataManager.listen(PROTOCOL.E11008, this, this.onGetMessage);//种族消息
        DataManager.listen(PROTOCOL.E11011, this, this.onGetMessage);//获得跨服竞技聊天
        DataManager.listen(PROTOCOL.E11009, this, this.onGetChatRoleInfo);//获得聊天玩家的信息
        DataManager.listen(PROTOCOL.E11010, this, this.onGetNoSpeak);//获得禁言消息
        DataManager.listen(PROTOCOL.E11100, this, this.onGetChatState);//获得聊天状态返回
        DataManager.listen(PROTOCOL.E11201, this, this.onGetBroadcastIds);//获得广播列表
        DataManager.listen(PROTOCOL.E11202, this, this.onGetBroadcastInfos);//获得广播详细信息列表
        DataManager.listen(PROTOCOL.E11203, this, this.onGetDeleteBroadCast);//删除某天广播信息
        DataManager.listen(PROTOCOL.E11204, this, this.onGetNewBroadCast);//获得一条新的运营广播
        DataManager.listen(PROTOCOL.E11205, this, this.onGetSystemTips);//获得一条系统提示
        DataManager.listen(PROTOCOL.E11300, this, this.onGetAnExcuse);//禁言某个玩家
        DataManager.listen(PROTOCOL.E11301, this, this.onGetClearAnExcuse);//取消禁言某个玩家
    }

    private onGetMessage(data: any): void {
        var type: number;
        var info: ChatInfo = new ChatInfo();
        info.initInfo(data);
        this.addTypeMsg(info);
        this.event(SChatEvent.CHAT_ADDNEWMSG, [[info]]);
    }

    private onGetChatRoleInfo(data: S11009): void {
        this.event(SChatEvent.CHAT_GETROLEINFO_SUCCEFUL, [[data]]);
    }

    private onGetNoSpeak(data: S11010): void {
        this.initNoSpeak(data);
        this.event(SChatEvent.CHAT_NOSPEAK_SUCCEFUL);
    }

    private onGetChatState(data: S11100): void {
        if (data.state == 0) {
            MsgManager.instance.showRollTipsMsg("你输入的文字太长");
        }
        else {
            var str: string;
            switch (data.cmd) {
                case ChatErrorType.TYPE_1:
                    str = "CD未到";
                    break;
                case ChatErrorType.TYPE_2:
                    str = "对方不在线";
                    break;
                case ChatErrorType.TYPE_3:
                    str = "没有帮派";
                    break;
                case ChatErrorType.TYPE_4:
                    str = "没有队伍";
                    break;
                case ChatErrorType.TYPE_5:
                    str = "没有喇叭";
                    break;
                default:
                    break;
            }
            MsgManager.instance.showRollTipsMsg(str);
        }
    }
    private onGetBroadcastIds(data: S11201): void {
        this.broadCastIDList = data.item_1;
        this.event(SChatEvent.CHAT_REQUEST_BROADCASTINFOLIST);
    }

    private onGetBroadcastInfos(data: S11202): void {
        this.broadCastInfoList = data.item_2;
        this.event(SChatEvent.CHAT_GET_BROADCASTINFOLIST);
        MarqueeManager.instance.registerMarquees();
    }

    private onGetDeleteBroadCast(data: S11203): void {
        this.deleteBroadCast(data.Id);
    }
    private onGetNewBroadCast(data: S11204): void {
        this.addBroadCast(data);
        this.event(SChatEvent.CHAT_GET_ADDBROADCAST, [[data]]);//新增一条运营广播
    }
    private onGetSystemTips(data: S11205): void {
        var vo: NoticeVo = NoticeVo.get(data.No);
        if (vo == null || (vo && !vo.type)) {
            Debug.serverLog(`公告id${data.No}不存在!`);
            return;
        }
        var msg: string;
        var info: ChatInfo = new ChatInfo();
        for (let index = 0; index < vo.type.length; index++) {
            var element = vo.type[index];
            if (element == 4) {
                Debug.serverLog(vo.content);
                // info.type = ChatType.WORLD;
                // info.Msg = msg = ChatUtil.NoticeReplace(vo.content,data.item_1);
            }
            else if (element == 5)//综合
            {
                // info.type = ChatType.WORLD;
                // info.Msg = msg = ChatUtil.NoticeReplace(vo.content,data.item_1);
            }
            else if (element == 7)//帮派
            {
                info.type = ChatType.GUILD;
                info.Msg = msg = ChatUtil.NoticeReplace(vo.content, data.item_1);
            }
            else if (element == 8)//队伍
            {
                info.type = ChatType.TEAM;
                info.Msg = msg = ChatUtil.NoticeReplace(vo.content, data.item_1);
            }
            else if (element == 10)//系统
            {
                info.type = ChatType.SYSTEM;
                info.Msg = msg = ChatUtil.NoticeReplace(vo.content, data.item_1);
                info.NoticeVo = vo.no;
            }

            info.Msg && this.addTypeMsg(info);
            info.Msg && this.event(SChatEvent.CHAT_ADDNEWMSG, [[info]]);
        }
        // this.event(SChatEvent.CHAT_GET_SYSTEMTIPS,[[data]]);//获得一条系统提示
    }

    private onGetAnExcuse(data: S11300): void {
        if (data.RetCode == 0) {
            this.anExcusePlayer(data.TargetPlayerId);//禁言某个玩家
        }
    }

    private onGetClearAnExcuse(data: S11301): void {
        if (data.RetCode == 0) {
            this.clearAnExcusePlayer(data.TargetPlayerId);//取消禁言某个玩家
        }
    }

    private initAllMsg(data: ChatInfo): void {
        // if(data.type == ChatType.SYSTEM) return;
        if (!this.allMsgList) {
            this.allMsgList = [];
        }
        this.allMsgList.push(data);

        if (this.allMsgList.length > this.MAXLINE) {
            var len: number = this.allMsgList.length - this.MAXLINE;
            this.allMsgList.splice(0, len);
        }
    }

    /**
     * 增加一条聊天内容
     * @private
     * @param {*} data 
     * @memberof SChatData.intance
     */
    public addTypeMsg(info: ChatInfo): void {
        this.initAllMsg(info);
        this.addPrivateMsg(info);
        if (info.type != ChatType.PRIVATE && info.type != ChatType.SYSTEM) {
            if (!this.typeMsgs[info.type]) {
                this.typeMsgs[info.type] = [];
            }
            this.typeMsgs[info.type].push(info);
            if (this.typeMsgs[info.type].length > this.MAXLINE) {
                var len: number = this.typeMsgs[info.type].length - this.MAXLINE;
                this.typeMsgs[info.type].splice(0, len);
            }
        }
    }

    /**
     * 新增一条私聊  玩家被拉入黑名单的时候需要移除该玩家的聊天列表
     * @private
     * @static
     * @param {*} data 
     * @param {number} type 
     * @memberof SChatData.intance
     */
    private addPrivateMsg(data: ChatInfo): void {
        if (data.type != ChatType.PRIVATE) return;
        if (!this.privateMsgList) {
            this.privateMsgList = [];
        }

        if (data.FromId != SRoleData.instance.roleId)//我是接收方
        {
            if (!this.privateMsgList[data.FromId]) {
                this.privateMsgList[data.FromId] = [];
            }
            this.privateMsgList[data.FromId].push(data);

            if (this.privateMsgList[data.FromId].length > this.MAXLINE) {
                var len: number = this.privateMsgList[data.FromId].length - this.MAXLINE;
                this.privateMsgList[data.FromId].splice(0, len);
            }
        }
        else if (data.FromId == SRoleData.instance.roleId)//我是发送方
        {
            if (!this.privateMsgList[data.ToId]) {
                this.privateMsgList[data.ToId] = [];
            }
            this.privateMsgList[data.ToId].push(data);

            if (this.privateMsgList[data.ToId].length > 30) {
                var len: number = this.privateMsgList[data.ToId].length - this.MAXLINE;
                this.privateMsgList[data.ToId].splice(0, len);
            }
        }
    }
    public initNoSpeak(data: S11010): void {
        this._nospeakInfo = data;
        if (this._nospeakInfo.time > 0) {
            Laya.timer.loop(1000, this, this.updateTime);
        }
    }
    public get noSpeakInfo(): S11010 {
        return this._nospeakInfo;
    }

    /**
     * 自己是否被禁言
     * @readonly
     * @static
     * @type {boolean}
     * @memberof SChatData.intance
     */
    public get hasNoSpeak(): boolean {
        if (!this.noSpeakInfo) return false;
        if (this.noSpeakInfo.time == 0) return true;
        return this.noSpeakInfo.time > 0 ? true : false;
    }

    private updateTime(): void {
        this.noSpeakInfo.time -= 1;
        if (this.noSpeakInfo.time <= -1) {
            Laya.timer.clear(this, this.updateTime);
        }
    }

    /**
     * 禁言某个玩家
     * @static
     * @param {number} id 
     * @memberof SChatData.intance
     */
    public anExcusePlayer(id: number): void {
        this.anExcuses.push(id);
    }

    /**
     * 取消禁言某个玩家
     * @static
     * @param {number} id 
     * @memberof SChatData.intance
     */
    public clearAnExcusePlayer(id: number): void {
        this.anExcuses.splice(this.anExcuses.indexOf(id), 1);
    }

    /**
     * 某个玩家是否被禁言
     * @static
     * @param {number} id 
     * @returns {boolean} 
     * @memberof SChatData.intance
     */
    public playerHasAnExcuse(id: number): boolean {
        return this.anExcuses.indexOf(id) >= 0 ? true : false;
    }

    /**
     * 增加一天运营广播
     * @static
     * @param {S11204} data 
     * @memberof SChatData.intance
     */
    public addBroadCast(data: S11204): void {
        var info: S11202_2 = new S11202_2();
        info.Id = data.Id;
        info.Type = data.Type;
        info.Interval = data.Interval;
        info.StartTime = data.StartTime;
        info.EndTime = data.EndTime;
        info.Priority = data.Priority;
        info.Content = data.Content;
        this.broadCastIDList.push(info.Id);
        this.broadCastInfoList.push(info);
    }

    /**
     * 删除一条运营广播
     * @static
     * @param {number} id 
     * @memberof SChatData.intance
     */
    public deleteBroadCast(id: number): void {
        this.broadCastIDList.splice(this.broadCastIDList.indexOf(id), 1);
        for (let index = 0; index < this.broadCastInfoList.length; index++) {
            var element = this.broadCastInfoList[index];
            if (element.Id == id) {
                this.broadCastInfoList.splice(index, 1);
            }
        }
    }

    /**
     * 获得跑马灯列表
     * @readonly
     * @static
     * @type {Array<any>}
     * @memberof SChatData.intance
     */
    public get marqueeList(): Array<any> {
        var arr: Array<any> = [];
        for (let index = 0; index < this.broadCastInfoList.length; index++) {
            var element = this.broadCastInfoList[index];
            if (element.Type == 1 || element.Type == 2) {
                arr.push(element);
            }
        }
        return arr.sort(this.marqueenSort);
    }
    private marqueenSort(a: any, b: any): number {
        if (a.Priority < b.Priority) {
            return -1;
        }
        return 1;
    }

    /**
     * 通过频道获得聊天信息
     * @param {number} chanel
     * @returns {Array<ChatInfo>}
     * @memberof SChatData
     */
    public getMsgListByType(chanel: number): Array<ChatInfo> {
        if (chanel == ChatChannel.TEAM) {
            return this.typeMsgs[ChatType.TEAM];
        }
        else if (chanel == ChatChannel.GUILD) {
            return this.typeMsgs[ChatType.GUILD];
        }
        else {
            return this.allMsgList;
        }
    }

    /**
     * 通过类型删除某个类型的聊天列表
     * @static
     * @param {number} type 聊天类型
     * @param {number} [id=-1] 角色id 队伍id 帮派id 场景id 等等
     * @memberof SChatData.intance
     */
    public clearMsgList(type: number, id: number = -1): void {
        if (type == ChatType.PRIVATE) {
            this.privateMsgList.length = 0;
        }
        else if (type == ChatType.SENCE || type == ChatType.GUILD || type == ChatType.TEAM || type == ChatType.CROSS)//离开当前场景、离开工会、离开队伍移除聊天
        {
            this.typeMsgs[type].length = 0;
        }
    }

    //=================处理发言相关内容=================================
    public chatTime: number = 0;//可以发言的时间戳

    public get canChat(): boolean {
        return Date.now() > this.chatTime;
    }
    public startSendBtnCool(isWorld: boolean = true): void {
        var cdTime:number = isWorld ? 15000 : 5000;
        this.chatTime = Date.now() + cdTime;
        this.event(SChatEvent.START_SENDBTN_COOL,[cdTime]);
    }


}

export enum SChatEvent {
    CHAT_REQUEST_BROADCASTIDLIST = "chat_request_broadcastIdList",//申请广播id列表
    CHAT_REQUEST_BROADCASTINFOLIST = "chat_request_broadcastInfoList",//申请广播详细列表
    CHAT_REQUEST_SENDMSG = "chat_request_sendMsg",//申请发送聊天信息
    START_SENDBTN_COOL = "START_SENDBTN_COOL",//开始聊天按钮至灰
    CHAT_REQUEST_GETROLEINFO = "chat_request_getRoleInfo",//申请获得聊天玩家信息
    CHAT_REQUEST_NOSPEAK = "chat_request_noSpeak",//申请禁言
    CHAT_REQUEST_ANEXCUSE_PLAYER = "chat_request_anExcuse_player",//禁言某个人
    CHAT_REQUEST_CLEARANEXCUSE_PLAYER = "chat_request_clearAnExcuse_player",//取消禁言某个人
    CHAT_GET_BROADCASTIDLIST = "chat_get_broadcastIdList",//获得广播id列表
    CHAT_GET_BROADCASTINFOLIST = "chat_get_broadcastInfoList",//获得广播信息列表
    CHAT_GET_ADDBROADCAST = "chat_get_addBroadCast",//新增一条运营广播
    CHAT_GET_SYSTEMTIPS = "chat_get_systemTips",//获得一条系统提示
    CHAT_ADDNEWMSG = "chat_addMsg",//新增一条聊天
    CHAT_GETROLEINFO_SUCCEFUL = "chat_getRoleInfo_succeful",//获得聊天玩家信息成功
    CHAT_NOSPEAK_SUCCEFUL = "chat_noSpeak_succeful",//禁言返回
    ADD_AN_EMOTION = "ADD_AN_EMOTION",//增加一个聊天表情
}
