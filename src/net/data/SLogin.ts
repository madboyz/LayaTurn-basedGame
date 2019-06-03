import { MsgManager } from './../../game/ui/manager/MsgManager';
import { DataManager } from './../../message/manager/DataManager';
import { S10000, C10000 } from './../pt/pt_10';
import { SocketManager } from '../SocketManager';
import { Debug } from '../../debug/Debug';
import { SGameData } from './SGameData';
import { SdkManager } from '../SdkManager';
import { CommonControl } from '../../game/common/control/CommonControl';


/**
 * 后台采集数据编号
 * 1客户端初始化
 * 2loading
 * 3初始化sdk
 * 4注册或者登录账号
 * 5选服
 */
export enum ServerMarkNO
{
    INIT = 1,//初始化
    LOADING,//loading
    INIT_SDK,//sdk初始化完毕
    SDK_LOGINED,//sdk登录完毕
    SERVER_LIST,//服务器列表完毕
    LOGINED_SERVER,//登录服务器(sokcet)
    CREATE_ROLE,//创角打开
    ENTER_GAME,//进入游戏收到10004
}
export class SLogin extends Laya.EventDispatcher {
    private static _instance: SLogin;
    public ServerList:Laya.Dictionary = new Laya.Dictionary();//服务器列表包含
    public RegionList:Array<any> = [];//大区列表
    public LastLoginServerId = 0;
    private readonly RequsetCount = 3;//如果拿去服务器列表失败请求次数
    private Count = 0;
    private readonly NoticeRequsetCount = 3;//公告请求次数
    private NoticeCount = 0;
    public NoticeData: any;
    public httpRequest: Laya.HttpRequest = new Laya.HttpRequest();
    public Ticket: string = "";
    public CurrentServerInfo: any = null;//当前服务器info
    public MarkPoint = true;
    public static get instance(): SLogin {
        return SLogin._instance || (SLogin._instance = new SLogin());
    }

    constructor() {
        super();
    }
    public unRegisterEvent()
    {
        this.Count = 0;
        DataManager.cancel(PROTOCOL.E10000, this, this.onLoginSucc);
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E10000, this, this.onLoginSucc);
    }
    /**
     * 获取服务器列表
     */
    public GetServerList():void
    {
        var os_type = SdkManager.instance.DeviceInfo.os_type;
        this.httpRequest.http.timeout = 3000;//10s
        var url = `${GameConfig.GAME_CONTROL_URL}servlet/GetServerList?os=${os_type}&channel=${GameConfig.GAME_CHANNEL}&flag=un_1&app_v=1.0.0&game_mark=${GameConfig.GAME_MARK}&show_mark=${GameConfig.GAME_SHOW_MARK}&account=${GameConfig.REAL_ACCOUNT}`;
        //var url = "http://control.mzyule.com/servlet/GetServerList?game_mark=mh&show_mark=2&mark=WINDOWS-XXXXXX&account=85454";
        //var url = "http://120.76.247.32:8080/servlet/GetServerList?os=Andriod&channel=junhai&flag=un_1&app_v=1.00&game_mark=mxxy&show_mark=888&account=1381"
        var THIS = this;
        this.httpRequest.once(Laya.Event.COMPLETE,this,function(data):void{
            data = JSON.parse(data);
            if (data.result != 200)
            {
                MsgManager.instance.showRollTipsMsg("服务器列表请求失败！");
                if(THIS.Count >= THIS.RequsetCount)
                return;
                THIS.GetServerList();
                THIS.Count ++;
                return;
            }
            THIS.Count = 0;
            THIS.RegionList = [];
            THIS.ServerList.clear();
            THIS.LastLoginServerId = data.args.last_login.server_id;
            if( THIS.LastLoginServerId == undefined)
            THIS.LastLoginServerId = 0;
            GameConfig.GAME_SERVER_ID = THIS.LastLoginServerId;
            var region_list = data.args.region_list;
            
            var server_list = data.args.server_list;
            for (let i = 0; i < region_list.length; i++) {
                const item = region_list[i];
                THIS.RegionList.push({id:item.id , title:item.title});
            }
            /**
             * "server_list":[
            {
                "show_mark":888,
                "region_id":15,
                "open_time":"2017-08-10 15:02:39",
                "merge_server":0,
                "type":0,
                "url":"192.168.0.196:9999",
                "roles_info":[
                    {
                        "role_name":"段苹",
                        "role_id":1000100000010018,
                        "lv":50,
                        "icon_id":"22"
                    }
                ],
                "sid":7,
                "local_url":"192.168.0.196:9998",
                "name":"伟强",
                "id":7,
                "state":2,
                "still_time":0,
                "desc":"今日11:00开服",
                "order":99
            },
            {
                 "show_mark":5,
                "region_id":15,
                "open_time":"2017-10-19 16:18:24",
                "merge_server":0,
                "type":3,
                "url":"112.74.29.26:19996",
                "sid":1234567,
                "local_url":"112.74.29.26:19995",
                "name":"决战之巅",
                "id":1234567,
                "state":2,
                "still_time":0,
                "desc":"欢迎测试",
                "order":11
            },
             */
            for (let i = 0; i < server_list.length; i++) {
                const item = server_list[i];
                var table = {}
                var haveRole = false;
                var serverList = THIS.ServerList.get(item.region_id);
                if(serverList == null)
                {
                    serverList = [];
                    THIS.ServerList.set(item.region_id , serverList);
                }
                if(item.roles_info != undefined)
                {
                    haveRole = true;
                }
                table = {show_mark:item.show_mark , sid:item.sid , open_time:item.open_time , type:item.type , 
                    name:item.name ,  state:item.state , order:item.order , url:item.url , 
                    desc:item.desc, region_id:item.region_id , haveRole:haveRole};
                serverList.push(table);
                    //THIS.ServerList.set(item.region_id , table);
            }

            THIS.RegionList.sort((item1 , item2)=>{return item2.id - item1.id;});
            //if(THIS.RegionList.length == 0)
            //{
            //    THIS.RegionList.push({id:120 , title:"天河一区"});
            //}
            //if(THIS.ServerList.keys.length == 0)
            //{
            //    THIS.LastLoginServerId = 1001;
            //    table = {show_mark:888 , sid:1001 , open_time:"2017-08-11 11:00:00" , type:1 , 
            //        name:"铁头服" ,  state:2 , order:THIS.RegionList[0].id , url:GameConfig.GAME_URL , desc:"测试服" , region_id:120 
            //        , haveRole:true};
            //    THIS.ServerList.set(THIS.RegionList[0].id , [table]);
            //}
            
            THIS.PostServerPoint(ServerMarkNO.SERVER_LIST);
            THIS.event(SLoginEvent.LOGIN_SERVER_LIST_UPDATE);
        });
        
        //alert(" 请求服务器列表===="+url);
        Debug.serverLog("请求服务器列表"+url);
        this.httpRequest.send(encodeURI(url));
    }

    /**
    * 获取公告
    */
    public GetUpdateContent(): void {
        var comtentHttpRequest: Laya.HttpRequest = new Laya.HttpRequest();
        var os_type = SdkManager.instance.DeviceInfo.os_type;
        comtentHttpRequest.http.timeout = 3000;//10s
        var url = `http://control.mzyule.com/servlet/GetUpdateNotice?game_mark=${GameConfig.GAME_MARK}&os=${os_type}&show_mark=${GameConfig.GAME_SHOW_MARK}`;
        //var url = `http://control.mzyule.com/servlet/GetUpdateNotice?game_mark=mxxy&os=android&show_mark=888`;
        var THIS = this;
        comtentHttpRequest.once(Laya.Event.COMPLETE, this, function (data): void {
            data = JSON.parse(data);
            if (data.result != 200) {
                if (THIS.NoticeCount >= THIS.NoticeRequsetCount)
                    return;
                THIS.GetUpdateContent();
                THIS.NoticeCount++;
                return;
            }
            THIS.NoticeCount = 0;
            THIS.NoticeData = data.args;
            if (THIS.NoticeData.popup == 1) {
                UIManager.instance.openUI(UIID.GONGGAO_PANEL)
            }
        });
        Debug.serverLog("请求公告" + url);
        comtentHttpRequest.send(encodeURI(url));
    }

    public PostRoleInfoControl(uuid: number, name: string, lv: number, icon: number = 11) {
        var imei = SdkManager.instance.DeviceInfo.android_imei;
        name = encodeURI(name);
        var url = `${GameConfig.GAME_CONTROL_URL}log/RoleInfo?game_mark=${GameConfig.GAME_MARK}&account=${GameConfig.REAL_ACCOUNT}&server_id=${GameConfig.GAME_SERVER_ID}&provider=${GameConfig.GAME_CHANNEL}&imei=${imei}&role_id=${uuid}&role_name=${name}&lv=${lv}&icon_id=${icon}`;
        this.httpRequest.once(Laya.Event.COMPLETE, this, function (data): void {
            data = JSON.parse(data);
            if (data.result != 200)
                return;
        });
        this.httpRequest.send(encodeURI(url));
    }

    //获取当前要显示服务器结构
    public GetCurrentServer(): any {
        if (SLogin.instance.LastLoginServerId > 0) {
            var regionlist = SLogin.instance.ServerList.values;
            for (let i = 0; i < regionlist.length; i++) {

                const serverlist = regionlist[i];
                for (let j = 0; j < serverlist.length; j++) {
                    const item = serverlist[j]
                    if (item.sid == SLogin.instance.LastLoginServerId) {
                        return item;
                    }
                }

            }
        }

        return null;
    }

    public GetServerInfo(serverId: number): any {
        var regionlist = SLogin.instance.ServerList.values;
        for (let i = 0; i < regionlist.length; i++) {

            const serverlist = regionlist[i];
            for (let j = 0; j < serverlist.length; j++) {
                const item = serverlist[j]
                if (item.sid == serverId) {
                    return item;
                }
            }

        }
        return null;
    }

    /**
     * 登录前后台打点
     * @param action 
     */
    public PostServerPoint(action: number) {
        //var mark_time = Date.now();
        if (GameConfig.GAME_DEBUG) return;
        if (!this.MarkPoint) return;
        var device_id = SdkManager.instance.DeviceInfo.device_id;
        var ios_idfa = SdkManager.instance.DeviceInfo.ios_idfa;
        var android_imei = SdkManager.instance.DeviceInfo.android_imei;
        var android_adv_id = SdkManager.instance.DeviceInfo.android_adv_id;
        var android_id = SdkManager.instance.DeviceInfo.android_id;
        var device_name = SdkManager.instance.DeviceInfo.device_name;
        var os_ver = SdkManager.instance.DeviceInfo.os_ver;
        var sdk_ver = SdkManager.instance.DeviceInfo.sdk_ver;
        var package_name = SdkManager.instance.DeviceInfo.package_name;
        var os_type = SdkManager.instance.DeviceInfo.os_type;
        var net_type = SdkManager.instance.DeviceInfo.net_type;
        var applicaiton_memory = SdkManager.instance.DeviceInfo.applicaiton_memory;
        var applicaiton_usage_memory = SdkManager.instance.DeviceInfo.applicaiton_usage_memory;
        var capacity = SdkManager.instance.DeviceInfo.capacity;
        var battery = SdkManager.instance.DeviceInfo.battery;
        var url = `${GameConfig.GAME_CONTROL_URL}log/Step?game_mark=${GameConfig.GAME_MARK}&step=${action}&account=${GameConfig.REAL_ACCOUNT}&device_id=${device_id}&ios_idfa=${ios_idfa}&android_imei=${android_imei}&android_id=${android_id}&device_name=${device_name}&os_ver=${os_ver}&sdk_ver=${sdk_ver}&package_name=${package_name}&os_type=${os_type}&net_type=${net_type}&applicaiton_memory=${applicaiton_memory}&applicaiton_usage_memory=${applicaiton_usage_memory}&capacity=${capacity}&battery=${battery}&android_adv_id=${android_adv_id}`;
        this.httpRequest.once(Laya.Event.COMPLETE, this, function (data): void {
            data = JSON.parse(data);
            if (data.result != 200)
                return;
        });
        this.httpRequest.send(encodeURI(url));
    }

    public PostServerControl() {

        var os_type = SdkManager.instance.DeviceInfo.os_type;
        var imei = SdkManager.instance.DeviceInfo.android_imei;
        var os_ver = SdkManager.instance.DeviceInfo.os_ver;
        var device_name = SdkManager.instance.DeviceInfo.device_name;
        var net_type = SdkManager.instance.DeviceInfo.net_type;
        var mac = window.navigator.productSub;
        var url = `${GameConfig.GAME_CONTROL_URL}log/AccountLogin?game_mark=${GameConfig.GAME_MARK}&account=${GameConfig.REAL_ACCOUNT}&server_id=${GameConfig.GAME_SERVER_ID}&provider=${GameConfig.GAME_CHANNEL}&imei=${imei}&net=${net_type}&mac=${mac}&imsi=${0}&show_mark=${GameConfig.GAME_SHOW_MARK}&os=${os_type}&os_ver=${os_ver}&mobile=${device_name}`;
        this.httpRequest.once(Laya.Event.COMPLETE, this, function (data): void {
            data = JSON.parse(data);
            if (data.result != 200)
                return;
        });
        this.httpRequest.send(encodeURI(url));
    }

    /**
     * 接入sdk后登陆控制服
     */
    public SDKLogin() {
        var sdk = SdkManager.instance;
        var imei = SdkManager.instance.DeviceInfo.android_imei;
        var device_name = SdkManager.instance.DeviceInfo.device_name;
        var os_ver = SdkManager.instance.DeviceInfo.os_ver;
        var os_type = SdkManager.instance.DeviceInfo.os_type;
        var net_type = SdkManager.instance.DeviceInfo.net_type;
        var url = `${GameConfig.GAME_CONTROL_URL}login/junhai?game_mark=${GameConfig.GAME_MARK}&user_id=${sdk.LoginInfo.user_id}&channel_id=${sdk.LoginInfo.channel_id}&game_channel_id=${sdk.LoginInfo.game_channel_id}&time=${sdk.LoginInfo.time}&sign=${sdk.LoginInfo.l_h5_sign}&os=${os_type}&os_ver=${os_ver}&mobile=${device_name}&net=${net_type}&imei=${imei}&mac=xxx&imsi=xxx`;
        this.httpRequest.http.timeout = 10000;//10s
        //alert("sdk_url=="+url);
        this.httpRequest.once(Laya.Event.COMPLETE, this, function (data): void {
            data = JSON.parse(data);
            if (data.result != 200) {
                SdkManager.instance.LogOut();
                var location = window["location"];
                location.reload();
                alert("登录失败!" + data.message);
                return;
            }
            this.Ticket = data.args.ticket;
            GameConfig.REAL_ACCOUNT = data.args.account;
            //alert(`SLogin.instance.Ticke=${SLogin.instance.Ticket}\n
            //GameConfig.REAL_ACCOUNT=${GameConfig.REAL_ACCOUNT}`);
            SLogin.instance.PostServerPoint(ServerMarkNO.SDK_LOGINED);
            UIManager.instance.closeUI(UIID.LOADING);
            UIManager.instance.openUI(UIID.START_GAME);
        })
        this.httpRequest.send(encodeURI(url));
    }

    public Reconnet() {
        var THIS = this;
        var imei = SdkManager.instance.DeviceInfo.android_imei;
        var device_name = SdkManager.instance.DeviceInfo.device_name;
        var os_ver = SdkManager.instance.DeviceInfo.os_ver;
        var os_type = SdkManager.instance.DeviceInfo.os_type;
        var net_type = SdkManager.instance.DeviceInfo.net_type;
        var sdk = SdkManager.instance;
        if (!sdk.LoginInfo) return;
        var url = `${GameConfig.GAME_CONTROL_URL}login/junhai?game_mark=${GameConfig.GAME_MARK}&user_id=${sdk.LoginInfo.user_id}&channel_id=${sdk.LoginInfo.channel_id}&game_channel_id=${sdk.LoginInfo.game_channel_id}&time=${sdk.LoginInfo.time}&sign=${sdk.LoginInfo.l_h5_sign}&os=${os_type}&os_ver=${os_ver}&mobile=${device_name}&net=${net_type}&imei=${imei}&mac=xxx&imsi=xxx`;
        if (GameConfig.GAME_DEBUG) {
            url = `${GameConfig.GAME_CONTROL_URL}login/test?game_mark=${GameConfig.GAME_MARK}&cuid=${GameConfig.TEST_ACCOUNT}&os=${os_type}&os_ver=${os_ver}&mobile=${device_name}&net=${net_type}&imei=${imei}&mac=xxx&imsi=xxx`;
        }
        this.httpRequest.http.timeout = 10000;//10s
        this.httpRequest.once(Laya.Event.COMPLETE, this, function (data): void {
            data = JSON.parse(data);
            if (data.result != 200) {
                SdkManager.instance.LogOut();
                var location = window["location"];
                location.reload();
                alert("登录失败!" + data.message);
                return;
            }
            THIS.Ticket = data.args.ticket;
            GameConfig.REAL_ACCOUNT = data.args.account;
            THIS.Login(GameConfig.GAME_SERVER_ID);
        })

        this.httpRequest.send(encodeURI(url));
    }

    public TestLogin() {
        //var url = `${GameConfig.GAME_CONTROL_URL}/login/special?game_mark=${GameConfig.GAME_MARK}&account=${GameConfig.REAL_ACCOUNT}&os=xxx&os_ver=xxx&mobile=xxx&net=xxx&imei=xxx&mac=xxx&imsi=xxx`;
        var THIS = this;
        var url = "";
        var imei = SdkManager.instance.DeviceInfo.android_imei;
        var device_name = SdkManager.instance.DeviceInfo.device_name;
        var os_ver = SdkManager.instance.DeviceInfo.os_ver;
        var os_type = SdkManager.instance.DeviceInfo.os_type;
        var net_type = SdkManager.instance.DeviceInfo.net_type;
        if(GameConfig.GAME_DEBUG)
        url = `${GameConfig.GAME_CONTROL_URL}login/test?game_mark=${GameConfig.GAME_MARK}&cuid=${GameConfig.TEST_ACCOUNT}&os=${os_type}&os_ver=${os_ver}&mobile=${device_name}&net=${net_type}&imei=${imei}&mac=xxx&imsi=xxx`;
        else
        url = `${GameConfig.GAME_CONTROL_URL}/login/special?game_mark=${GameConfig.GAME_MARK}&account=${GameConfig.GAME_MARK}&os=xxx&os_ver=xxx&mobile=xxx&net=xxx&imei=xxx&mac=xxx&imsi=xxx`;
        this.httpRequest.http.timeout = 10000;//10s
        this.httpRequest.once(Laya.Event.COMPLETE, this, function (data): void {
            data = JSON.parse(data);
            if (data.result != 200) {
                SdkManager.instance.LogOut();
                var location = window["location"];
                location.reload();
                alert("登录失败!" + data.message);
                return;
            }
            THIS.Ticket = data.args.ticket;
            GameConfig.REAL_ACCOUNT = data.args.account;
            UIManager.instance.openUI(UIID.START_GAME);
        })
        this.httpRequest.send(encodeURI(url));

    }

    /**
     * 登录游戏协议
     * @param ticket 
     */
    public LoginGameServer() {

        var device_name = SdkManager.instance.DeviceInfo.device_name;
        var msg: C10000 = new C10000();
        msg.Account = GameConfig.REAL_ACCOUNT;
        msg.Md5Auth = this.Ticket;
        msg.PhoneModel = device_name;
        msg.PhoneMAC = "xxx";
        msg.FromServerId = GameConfig.GAME_SERVER_ID;
        SocketManager.instance.send(msg);

        SLogin.instance.PostServerPoint(ServerMarkNO.LOGINED_SERVER);
        //alert(`GameConfig.REAL_ACCOUNT=${GameConfig.REAL_ACCOUNT}\nGameConfig.GAME_SERVER_ID=${GameConfig.GAME_SERVER_ID}`);
    }



    public Login(sid: number = 0): void {
        if (sid == 0) {
            GameConfig.GAME_SERVER_ID = this.LastLoginServerId;
        }
        else {
            GameConfig.GAME_SERVER_ID = sid;
        }
        this.CurrentServerInfo = this.GetServerInfo(GameConfig.GAME_SERVER_ID);
        if (!this.CurrentServerInfo) return;
        if (this.CurrentServerInfo.state == 0 || this.CurrentServerInfo.state == 10) {
            this.getServerStateById(GameConfig.GAME_SERVER_ID);
        }
        else {

            GameConfig.GAME_URL = this.CurrentServerInfo.url;
            SGameData.instance.loginSever();
        }
    }

    public getServerStateById(sid: number) {
        var THIS = this;
        var url = `${GameConfig.GAME_CONTROL_URL}servlet/GetServerStateByServerId?game_mark=${GameConfig.GAME_MARK}&server_id=${sid}`;
        this.httpRequest.http.timeout = 5000;//10s
        this.httpRequest.once(Laya.Event.COMPLETE, this, function (data): void {
            data = JSON.parse(data);
            if (data.result != 200) {
                return;
            }
            THIS.event(SLoginEvent.LOGIN_GET_SERVER_STATE, true);
            THIS.CurrentServerInfo.state = data.args.state;
            if (THIS.CurrentServerInfo.state == 0) {
                MsgManager.instance.showRollTipsMsg(`服务器将于${THIS.CurrentServerInfo.open_time}开启！`);
                return;
            }
            else if (THIS.CurrentServerInfo.state == 10) {
                MsgManager.instance.showRollTipsMsg("服务器维护中！");
                return;
            }
            else {
                GameConfig.GAME_URL = THIS.CurrentServerInfo.url;
                SGameData.instance.loginSever();
            }

        })
        this.httpRequest.send(encodeURI(url));
        this.event(SLoginEvent.LOGIN_GET_SERVER_STATE, false);
    }


    private onLoginSucc(data: S10000): void {
        if (data.RetCode == 0) {
            CommonControl.instance.requestRoleList();//申请角色列表
        }
        else {
            var str: string;
            switch (data.RetCode) {
                case LoginError.LOGIN_FAIL_AUTH_FAILED:
                    str = "验证失败";
                    break;
                case LoginError.LOGIN_FAIL_SERVER_CLOSED:
                    str = "服务器未开启";
                    break;
                case LoginError.LOGIN_FAIL_IP_BANNED:
                    str = "IP被封禁了";
                    break;
                default:
                    break;
            }
            MsgManager.instance.showRollTipsMsg(str);
        }
    }
}

export enum SLoginEvent {
    LOGIN_REQUEST_SERVER_LIST = "login_request_server_list",//请求服务器列表
    LOGIN_SERVER_LIST_UPDATE = "login_server_list_update",//服务器列表返回
    LOGIN_GET_SERVER_STATE = "login_get_server_state",//获取单个服务器状态
}