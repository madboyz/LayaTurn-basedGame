import { C11001, C11201, C11202, C11203, C11300, C11301, C11005, C11006 } from './../../../../../net/pt/pt_11';
import { BaseProtocol } from '../../../../../net/protocol/BaseProtocol';
import { SChatData } from '../../../../../net/data/SChatData';
export class ChatProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 申请发生聊天信息
     * @param {string} str 
     * @param {number} type 
     * @memberof ChatProtocol
     */
    public requestSendChatMsg(str:string,type:number):void
    {
        var msg:any;
        if(type == ChatChannel.WORLD)
        {
            msg = new C11001();
            msg.Msg = str;
        }
        else if(type == ChatChannel.TEAM)
        {
            msg = new C11006();
            msg.Msg = str;
        }
        else if(type == ChatChannel.GUILD)
        {
            msg = new C11005();
            msg.Msg = str;
        }
        this.send(msg);
    }

    /**
     * 玩家进入游戏后获取当前用到的广播id列表
     * @memberof ChatProtocol
     */
    public send11201():void
    {
        var msg:C11201 = new C11201();
        this.send(msg);
    }

    /**
     * 玩家获取运营后台广播信息详细信息
     * @memberof ChatProtocol
     */
    public send11202():void
    {
        var msg:C11202 = new C11202();
        msg.item_1 = SChatData.instance.broadCastIDList;
        this.send(msg);
    }

    /**
     * 使某人禁言
     * @param {string} id 玩家id
     * @param {string} str 禁言原因
     * @param {number} time 禁言时间
     * @memberof ChatProtocol
     */
    public send11300(id:number,str:string,time:number):void {
        var msg:C11300 = new C11300();
        msg.TargetPlayerId = id;
        msg.BanReason = str;
        msg.BanTime = time;
        this.send(msg);
    }

    /**
     * 解除某人禁言
     * @param {number} id 玩家id
     * @memberof ChatProtocol
     */
    public send11301(id:number):void
    {
        var msg:C11301 = new C11301();
        msg.TargetPlayerId = id;
        this.send(msg);
    }
}