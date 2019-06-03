import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
import { C14010, C14001, C14001_1, C14002, C14002_1, C14003, C14100, C14100_1, C14015, C14014 } from '../../../../../net/pt/pt_14';
import { SFriendData } from '../../../../../net/data/SFriendData';
export class FriendProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 发送添加好友请求
     * @param {number} id
     * @memberof FriendProtocol
     */
    public send14001(id:number):void
    {
        var msg:C14001 = new C14001();
        var arr:Array<C14001_1> = [];
        var info:C14001_1 = new C14001_1;
        info.Id = id;
        arr.push(info);
        msg.item_1 = arr;
        this.send(msg);
    }

    /**
     * 回应添加好友请求
     * @param {number} id
     * @param {number} choice
     * @memberof FriendProtocol
     */
    public send14002(id:number,choice:number):void
    {
        var msg:C14002 = new C14002();
        var arr:Array<C14002_1> = [];
        var info:C14002_1 = new C14002_1;
        info.Id = id;
        arr.push(info);
        msg.Choice = choice;
        msg.item_1 = arr;
        this.send(msg);
    }

    /**
     * 删除好友
     * @param {number} id
     * @memberof FriendProtocol
     */
    public send14003(id:number):void
    {
        var msg:C14003 = new C14003();
        msg.Id = id;
        this.send(msg);
    }

    /**
     * 申请查找好友
     * @param {string} name
     * @memberof FriendProtocol
     */
    public send14010(name:string):void
    {
        var msg:C14010 = new C14010();
        msg.Name = name;
        msg.PageNum = SFriendData.instance.curPage;
        msg.PageSize = 4
        this.send(msg);
    }

    /**
     * 收取爱心
     * @param {number} id
     * @memberof FriendProtocol
     */
    public send14014(id:number):void
    {
        var msg:C14014 = new C14014();
        msg.PlayerID = id;
        this.send(msg);
    }

    /**
     * 送花
     * @param {number} id
     * @memberof FriendProtocol
     */
    public send14015(id:number):void
    {
        var msg:C14015 = new C14015();
        msg.PlayerID = id;
        this.send(msg);
    }
}