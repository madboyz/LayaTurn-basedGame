import { DataManager } from "../../message/manager/DataManager";
import { S14000, S14003, S14004, S14005, S14006, S14010, S14030, S14036, S14100, S14101, S14037, S14002, S14014, S14015, S14011, S14001, S14000_1 } from "../pt/pt_14";
import { FriendInfo } from "../../game/ui/compent/data/FriendInfo";
import { MsgManager } from "../../game/ui/manager/MsgManager";
import { FriendSmallIcon } from "../../game/ui/view/friend/FriendSmallIcon";

export class SFriendData extends Laya.EventDispatcher {
    private static _instance:SFriendData;
    private _friends:Array<FriendInfo> = [];
    private _blackLists:Array<FriendInfo> = [];
    private _applyLists:Array<FriendInfo> = [];
    private _findFriendLists:Array<FriendInfo> = [];
    private _tujianFriendList:Array<FriendInfo> = [];
    private _cdList:Array<any> = [];
    public friendInfo:S14011;
    public curName:string = "";//查找好友得名字 ""推荐好友 否则是模糊查找
    private totalPage:number;
    private _curPage:number = 1;
    constructor() {
        super();
    }

    public static get instance(): SFriendData {
        return SFriendData._instance || (SFriendData._instance = new SFriendData());
    }

    public unRegisterEvent(): void {
        DataManager.cancel(PROTOCOL.E14000, this, this.onS14000);//好友列表
        DataManager.cancel(PROTOCOL.E14001, this, this.onS14001);//好友列表
        DataManager.cancel(PROTOCOL.E14003, this, this.onS14002);//回复添加好友
        DataManager.cancel(PROTOCOL.E14003, this, this.onS14003);//删除好友
        DataManager.cancel(PROTOCOL.E14004, this, this.onS14004);//加入黑名单
        DataManager.cancel(PROTOCOL.E14005, this, this.onS14005);//添加好友
        DataManager.cancel(PROTOCOL.E14006, this, this.onS14006);//申请添加自己为好友
        DataManager.cancel(PROTOCOL.E14010, this, this.onS14010);//查找好友
        DataManager.cancel(PROTOCOL.E14011, this, this.onS14011);//好友信息
        DataManager.cancel(PROTOCOL.E14014, this, this.onS14014);//收取爱心
        DataManager.cancel(PROTOCOL.E14015, this, this.onS14015);//赠送爱心
        DataManager.cancel(PROTOCOL.E14030, this, this.onS14030);//好友上下线
        DataManager.cancel(PROTOCOL.E14036, this, this.onS14036);//好友升级
        DataManager.cancel(PROTOCOL.E14037, this, this.onS14037);//好友改名
        DataManager.cancel(PROTOCOL.E14100, this, this.onS14100);//赠送鲜花
        DataManager.cancel(PROTOCOL.E14101, this, this.onS14101);//好感度变化
        this._friends = [];
        this._blackLists = [];
        this._applyLists = [];
        this._findFriendLists = [];
        this._tujianFriendList = [];
        this._cdList = [];
        this.friendInfo = null;
        this.curName = "";//查找好友得名字 ""推荐好友 否则是模糊查找
        this.totalPage = 0;
        this._curPage = 1;
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E14000, this, this.onS14000);//好友列表
        DataManager.listen(PROTOCOL.E14001, this, this.onS14001);//好友列表
        DataManager.listen(PROTOCOL.E14003, this, this.onS14002);//回复添加好友
        DataManager.listen(PROTOCOL.E14003, this, this.onS14003);//删除好友
        DataManager.listen(PROTOCOL.E14004, this, this.onS14004);//加入黑名单
        DataManager.listen(PROTOCOL.E14005, this, this.onS14005);//添加好友
        DataManager.listen(PROTOCOL.E14006, this, this.onS14006);//申请添加自己为好友
        DataManager.listen(PROTOCOL.E14010, this, this.onS14010);//查找好友
        DataManager.listen(PROTOCOL.E14011, this, this.onS14011);//好友信息
        DataManager.listen(PROTOCOL.E14014, this, this.onS14014);//收取爱心
        DataManager.listen(PROTOCOL.E14015, this, this.onS14015);//赠送爱心
        DataManager.listen(PROTOCOL.E14030, this, this.onS14030);//好友上下线
        DataManager.listen(PROTOCOL.E14036, this, this.onS14036);//好友升级
        DataManager.listen(PROTOCOL.E14037, this, this.onS14037);//好友改名
        DataManager.listen(PROTOCOL.E14100, this, this.onS14100);//赠送鲜花
        DataManager.listen(PROTOCOL.E14101, this, this.onS14101);//好感度变化
    }

    private onS14000(data:S14000):void
    {
        this.initFriendList(data.item_1);
        this.event(SFriendEvent.INIT_RRIEND_LIST);
    }

    private onS14001(data:S14001):void
    {
        // this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    private onS14002(data:S14002):void
    {
        this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    private onS14003(data:S14003):void
    {
        this.deleteFriend(data.Id);
        this._friends.sort(this.friendSort);
        this.event(SFriendEvent.FRIEND_DELETE_BACK);
    }

    private onS14004(data:S14004):void
    {
        //TODO黑名单
    }

    private onS14005(data:S14005):void
    {
        var info:FriendInfo = new FriendInfo();
        info.initData(data);
        this.deleteApplyFriend(data.PlayerId);
        this._friends.push(info);
        this._friends.sort(this.friendSort);
        this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    private onS14006(data:S14006):void
    {
        var info:FriendInfo = new FriendInfo();
        info.initData(data);
        this.pushInApply(info);
        FriendSmallIcon.instance.show();
        this.event(SFriendEvent.FRIEND_RECEIVED_APPLY);
    }

    private onS14010(data:S14010):void
    {
        this.totalPage = data.TotalPage;
        this._curPage = data.PageNum + 1 > this.totalPage?1:data.PageNum + 1;
        if(this.curName)
        {
            this.initFindList(data.item_1);
            this.event(SFriendEvent.FRIEND_RECEIVED_FIND);
            if(data.item_1.length == 0)
            {
                MsgManager.instance.showRollTipsMsg("场景上没有该玩家！");
            }
        }
        else
        {
            this.initTujianList(data.item_1);
            this.event(SFriendEvent.FRIEND_RECEIVED_FIND);
            if(data.item_1.length == 0)
            {
                MsgManager.instance.showRollTipsMsg("暂无玩家推荐！");
            }
        }
    }

    private onS14011(data:S14011):void
    {
        this.friendInfo = data;
        var info:FriendInfo;
        for (let index = 0; index < data.item_1.length; index++) {
            var element = data.item_1[index];
            info = this.getFriendInfo(element.PlayerId);
            info && (info.LoveState = element.LoveState);
        }
    }

    private onS14014(data:S14014):void
    {
        var info:FriendInfo;
        for (let index = 0; index < data.item_1.length; index++) {
            var element = data.item_1[index];
            info = this.getFriendInfo(element.PlayerID);
            info.LoveState = 2;
        }
        this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    private onS14015(data:S14015):void
    {
        var info:FriendInfo;
        for (let index = 0; index < data.item_1.length; index++) {
            var element = data.item_1[index];
            info = this.getFriendInfo(element.PlayerID);
            info.GiveState = 1;
        }
        this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    private onS14100(data:S14100):void
    {
        var info:FriendInfo = this.getFriendInfo(data.PlayerId);
        info.Intimacy += data.GetIntimacy;
        this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    private onS14101(data:S14101):void
    {
        var info:FriendInfo = this.getFriendInfo(data.ObjPlayerId);
        info.Intimacy = data.CurIntimacy;
        this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    private onS14030(data:S14030):void
    {
        var info:FriendInfo = this.getFriendInfo(data.PlayerId);
        if(data.Action == 0)
        {
            info.Online = Date.now()/1000;
            MsgManager.instance.showRollTipsMsg(info.Name + "下线了！");
        }
        else
        {
            info.Online = 0;
            MsgManager.instance.showRollTipsMsg(info.Name + "上线了！");
        }
        this._friends.sort(this.friendSort);
        this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    private onS14036(data:S14036):void
    {
        var info:FriendInfo = this.getFriendInfo(data.PlayerId);
        info.Lv = data.Lv;
        this._friends.sort(this.friendSort);
        this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    private onS14037(data:S14037):void
    {
        var info:FriendInfo = this.getFriendInfo(data.PlayerId);
        info.Name = data.Name;
        this.event(SFriendEvent.FRIEND_ADD_BACK);
    }

    public getFriendInfo(id:number):FriendInfo
    {
        for (let index = 0; index < this._friends.length; index++) {
            var element = this._friends[index];
            if(element.PlayerId == id)
            {
                return element;
            }
        }
        return null;
    }

    private deleteFriend(id:number):void
    {
        for (let index = 0; index < this._friends.length; index++) {
            var element = this._friends[index];
            if(element.Id == id)
            {
                this._friends.splice(index,1);
                return;
            }
        }
    }

    public deleteApplyFriend(id:number):void
    {
        for (let index = 0; index < this._applyLists.length; index++) {
            var element = this._applyLists[index];
            if(element.PlayerId == id)
            {
                this._applyLists.splice(index,1);
                return;
            }
        }
    }

    private pushInApply(info:FriendInfo):void
    {
        for (let index = 0; index < this._applyLists.length; index++) {
            const element = this._applyLists[index];
            if(element.PlayerId == info.PlayerId)
            {
                return;
            }
        }
        this._applyLists.push(info);
        this._applyLists.sort(this.friendSort);
    }

    public pushInCdList(info:FriendInfo):void
    {
        if(!this.getCDtime(info))
        {
            var obj:any = {};
            obj.info = info;
            obj.time = Date.now()/1000;
            this._cdList.push(obj);
        }
        else
        {
            this.getCDtime(info).time = Date.now()/1000;
        }
    }

    public getCDtime(info:FriendInfo):any
    {
        for (let index = 0; index < this._cdList.length; index++) {
            const element = this._cdList[index];
            if(info.PlayerId == element.info.PlayerId)
            {
                return element;
            }
        }
        return null;
    }

    private initFriendList(arr:Array<S14000_1>):void
    {
        var vo:FriendInfo;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            var info:FriendInfo = this.getFriendInfo(element.PlayerId);
            if(info){
                this.deleteFriend(info.Id);
            }
            vo = new FriendInfo();
            vo.initData(element);
            this._friends.push(vo);
        }
        this._friends.sort(this.friendSort);

    }

    private initBlackList(arr:Array<any>):void
    {
        var vo:FriendInfo;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            vo = new FriendInfo();
            vo.initData(element);
            this._blackLists.push(vo);
        }
        this._blackLists.sort(this.friendSort);
    }

    private initFindList(arr:Array<any>):void
    {
        this._findFriendLists = [];
        var vo:FriendInfo;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            vo = new FriendInfo();
            vo.initData(element);
            this._findFriendLists.push(vo);
        }
        this._findFriendLists.sort(this.friendSort);
    }

    private initTujianList(arr:Array<any>):void
    {
        this._tujianFriendList = [];
        var vo:FriendInfo;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            vo = new FriendInfo();
            vo.initData(element);
            this._tujianFriendList.push(vo);
        }
        this._tujianFriendList.sort(this.friendSort);
    }

    public get curPage():number
    {
        return this._curPage;
    }

    public get friendList():Array<FriendInfo>
    {
        return this._friends;
    }

    public get applyFriendList():Array<FriendInfo>
    {
        return this._applyLists;
    }

    public get findList():Array<FriendInfo>
    {
        return this._findFriendLists;
    }

    public get tujianList():Array<FriendInfo>
    {
        return this._tujianFriendList;
    }

    private friendSort(a:FriendInfo,b:FriendInfo):number
    {
        if(a.Online == 0 && b.Online > 0)
        {
            return -1;
        }
        else if(a.Online > 0 && b.Online == 0)
        {
            return 1;
        }
        else
        {
            if(a.BattlePower > b.BattlePower)
            {
                return -1;
            }
            else if(a.BattlePower < b.BattlePower)
            {
                return 1;
            }
            else
            {
                if(a.Lv > b.Lv)
                {
                    return -1;
                }
                else if(a.Lv < b.Lv)
                {
                    return 1;
                }
                return 1;
            }
        }
    }

     /**
     * 是否需要显示红点
     * @readonly
     * @type {boolean}
     * @memberof SFriendData
     */
    public get showRed():boolean
    {
        if(this._applyLists && this._applyLists.length > 0)
        {
            return true;
        }
        return false;
    }
}
export enum SFriendEvent{
    INIT_RRIEND_LIST = "INIT_RRIEND_LIST",//初始化好友列表
    FRIEND_REQUEST_DELETE = "friend_request_delete",//申请删除好友
    FRIEND_REQUEST_ADD = "friend_request_add",//申请添加好友
    FRIEND_REQUEST_FIND = "friend_request_find",//申请查找好友
    FRIEND_REQUEST_FRESH = "friend_request_fresh",//申请刷新推荐好友
    FRIEND_REQUEST_BACKADD = "friend_request_backAdd",//回复添加好友
    FRIEND_REQUEST_SENDHEART = "friend_request_sendHeart",//申请送星
    FRIEND_REQUEST_RECEIVEDHEART = "friend_request_receivedHeart",//申请收星
    FRIEND_DELETE_BACK = "friend_delete_back",//删除好友返回
    FRIEND_ADD_BACK = "friend_add_back",//添加好友返回
    FRIEND_RECEIVED_APPLY = "friend_received_apply",//收到申请加好友信息
    FRIEND_RECEIVED_FIND = "friend_received_find",//收到查找好友列表
    FRIEND_RECEIVED_FRESH = "friend_received_fresh",//收到刷新推荐好友列表
}