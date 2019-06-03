import { SGameData } from "./data/SGameData";
import { SRoleData } from "./data/SRoleData";
import { GameUtils } from "../game/utils/GameUtils";
import { ChargeVo } from "../db/sheet/vo/ChargeVo";
import { SLogin, ServerMarkNO } from "./data/SLogin";
import { Debug } from "../debug/Debug";
import { MsgManager } from "../game/ui/manager/MsgManager";
import { SRechargeData } from "../game/ui/view/recharge/data/SRechargeData";

export enum SDkState {
    INVALID = 0,//非初始化
    INITING,//初始化中
    INITFAIl,//初始化失败
    INITED,//初始化成功
}

export enum SDKSubState {
    INVALID = 0,//不需要等待
    WAITING,//等待信息
    COMPLETE,//完成所有数据。
}


export class SdkManager extends Laya.EventDispatcher {
    private roleEvent:any;
    constructor() {
        super();
        window.addEventListener("MIR_JH",this.MIrJHSDk);
        this.roleEvent = window.document.createEvent("HTMLEvents");
        this.roleEvent.initEvent("MIR_JH_ANALYSIS_FROM_CP",false,false);
    }
    private static _instance: SdkManager;
    public MirInterRuntime:any = null;//sdkWindow对象
    public SdkState:SDkState = SDkState.INVALID;
    private subLoginState:SDKSubState = SDKSubState.INVALID;
    private subPayState:SDKSubState = SDKSubState.INVALID;
    private subLogout:SDKSubState = SDKSubState.INVALID;
    public LoginInfo:any;//sdk返回的数据结构
    public PayInfo:any;//初始支付数据结构
    public DeviceInfo:any = { 
    device_id:"0",
    ios_idfa:"0",
    android_imei: "0",
    android_adv_id:0,
    android_id:0,
    device_name:"0",
    os_ver: "0", 
    sdk_ver:"0", 
    package_name:"0",
    os_type: "0",
    net_type:"0",
    applicaiton_memory:"0",
    applicaiton_usage_memory:"0",
    capacity:"0",
    battery:"0"
    };
    private timeCount = 0;
    private readonly OutTime = 10000;//10s超时
    public static get instance(): SdkManager {
        return SdkManager._instance || (SdkManager._instance = new SdkManager());
    }

    public InitSDk()
    {
        this.DeviceInfo.os_type = SdkManager.instance.GetPlatform().platform;
        if(this.SdkState != SDkState.INVALID) return;
        this.LoginInfo = null;
        this.PayInfo = null;
        this.subPayState = SDKSubState.INVALID;
        this.subLoginState = SDKSubState.INVALID;
        this.timeCount = 0;
        var data = {
            shareinfo:{
                title: "萌仙西游",
                message: "快来玩游戏",
                img_url: "http://mxxy-res1.mzyule.com/fun_game/remote-assets/res/raw-assets/atlas/bird.png",
                qzone_img_url: ""
                },
                agent_domain: "agent1.ijunhai.com",
        }
        var THIS = this;
        this.MirInterRuntime = window["MirInterRuntime"];
        this.SdkState = SDkState.INITING;
        this.MirInterRuntime.junhai_init((obj)=>{
            if(obj)
            {
                if(obj.ret == 1)
                {
        
                    SLogin.instance.PostServerPoint(ServerMarkNO.INIT_SDK);
                    if(this.MirInterRuntime.h5_login != null)
                    {
                        //alert("this.MirInterRuntime.h5_login != null");
                        THIS.WaitLoginInfo();
                    }
                    if(this.MirInterRuntime.check_h5_pay != null)
                    {
                        //alert("this.MirInterRuntime.check_h5_pay ！= null");
                        THIS.WaitPayInfo();
                    }

                    if(THIS.MirInterRuntime.h5_login == null||THIS.MirInterRuntime.check_h5_pay == null)
                    
                    THIS.SdkState = SDkState.INITED;//sdk全部初始化成功！
                }
                else
                {
                    THIS.SdkState = SDkState.INITFAIl; 
                }
            }
        },data)
    }

    private WaitLoginInfo()
    {
        if(this.subLoginState == SDKSubState.WAITING) return;
        this.subLoginState = SDKSubState.WAITING;
        var THIS = this;

        this.MirInterRuntime.h5_get_device((obj) => {
            if(obj)
            {
                THIS.DeviceInfo.device_id = obj.device_id;
                THIS.DeviceInfo.ios_idfa = obj.ios_idfa;
                THIS.DeviceInfo.android_imei = obj.android_imei;
                THIS.DeviceInfo.android_adv_id = obj.android_adv_id;
                THIS.DeviceInfo.android_id = obj.android_id;
                THIS.DeviceInfo.device_name = obj.device_name;
                THIS.DeviceInfo.os_ver = obj.os_ver;
                THIS.DeviceInfo.sdk_ver = obj.sdk_ver;
                THIS.DeviceInfo.package_name = obj.package_name;
                THIS.DeviceInfo.os_type = obj.os_type;
                THIS.DeviceInfo.net_type = obj.net_type;
                THIS.DeviceInfo.applicaiton_memory = obj.applicaiton_memory;
                THIS.DeviceInfo.applicaiton_usage_memory = obj.applicaiton_usage_memory;
                THIS.DeviceInfo.capacity = obj.capacity;
                THIS.DeviceInfo.battery = obj.battery;
            }
        });
        this.MirInterRuntime.h5_login((obj)=>{
            if(obj.ret == 1)
            {
                THIS.subLoginState = SDKSubState.COMPLETE;
                THIS.LoginInfo = obj.content;
                //alert(`user_id${THIS.LoginInfo.user_id}\n
                //token${THIS.LoginInfo.token}\n
                //game_id${THIS.LoginInfo.game_id}\n
                //channel_id${THIS.LoginInfo.channel_id}\n
                //game_channel_id${THIS.LoginInfo.game_channel_id}\n
                //time${THIS.LoginInfo.time}\n
                //l_h5_sign${THIS.LoginInfo.l_h5_sign}`);
                SLogin.instance.SDKLogin();
            }
            else
            {
                THIS.subLoginState = SDKSubState.INVALID;
            }
        });
    }

    private WaitPayInfo()
    {
        if(this.subPayState == SDKSubState.WAITING) return;
        this.subPayState = SDKSubState.WAITING;
        var THIS = this;
        this.MirInterRuntime.check_h5_pay((obj)=>{
            THIS.subPayState = SDKSubState.COMPLETE;
            THIS.PayInfo = obj;
        });
    }

   /**
     * 单位元
     * @param money 
     */
    public Pay(product_id:number = null,num:number = 1)
    {
        SRechargeData.instance.waitingRecharge = true;
        MsgManager.instance.showRollTipsMsg("SDK正式版本方可调用充值");
        //if(this.MirInterRuntime == null||this.MirInterRuntime.h5_pay == null) return;
        //var order:any = {};
        //if(SRoleData.instance.roleId == 0&&SRoleData.instance.roleInfo) return;
        //order.uid_in_game = SRoleData.instance.roleId;
        //order.user_name_in_game = SRoleData.instance.roleInfo.Name;
        //var platform_id = this.GetPlatform().id;
        //order.order_id = `${GameConfig.GAME_SERVER_ID}_${platform_id}_${SRoleData.instance.roleId}_${GameConfig.REAL_ACCOUNT}_${GameConfig.GAME_PAY_DEBUG}_${GameUtils.TimeStamp}`;
        //order.callback_url = GameConfig.GAME_CONTROL_URL+"pay/junhai/mxxy";
        //var vo:ChargeVo = ChargeVo.get(product_id);
        //if(vo == null ||(vo&&vo.money == null))return;
        //order.product_name = vo.name;
        //product_id && (order.product_id = product_id);
        //order.server_id = GameConfig.GAME_SERVER_ID;
        //order.pay_money = vo.money*100;//君海sdk默认需要放大倍数10=0.1元
        //order.product_count = num;
        //
        //var extra:any = {};
        //extra.game_area = "";
        //extra.rgrade = SRoleData.instance.roleInfo.Lv;
        //extra.desc = `充值金额${vo.money} = ${vo.name}${vo.yuanbao}`;
        //if(this.LoginInfo == null || (this.LoginInfo&&this.LoginInfo.user_id == null))return;
        //extra.user_id = this.LoginInfo.user_id;
        //extra.time = GameUtils.TimeStamp;
        //if(this.LoginInfo == null )return;
        //extra.token = this.LoginInfo.token;
        //var extraStr = JSON.stringify(extra);
        //var orderStr = JSON.stringify(order);
        //var game_id = this.LoginInfo.game_id;
        //var pay_sign = "505daa288f829e0235585e4dab232a06";
        //var time = GameUtils.TimeStamp;
        //var user_id = this.LoginInfo.user_id;
        //var hex_md5 = window["hex_md5"];
        //var str = `extra=${extraStr}&game_id=${game_id}&order=${orderStr}&pay_sign=${pay_sign}&time=${time}&user_id=${user_id}`;
        //var heart = hex_md5(str);
        //this.MirInterRuntime.h5_pay(order, extra, heart, (obj)=>{
        //    if(obj)
        //    {
        //        if(obj.ret == 1)
        //        {
        //            alert("支付成功！");
        //        }
        //        else
        //        {
        //            alert(obj.msg);
        //        }
        //    }
        //});
    }
    /**
     * 登出
     */
    public LogOut()
    {
        if(this.MirInterRuntime&&this.MirInterRuntime.h5_logout&&this.LoginInfo&&this.subLogout == SDKSubState.INVALID)
        {
            this.subLogout = SDKSubState.WAITING;
            var userinfo = {user_id:this.LoginInfo.user_id , token:this.LoginInfo.token};
            this.MirInterRuntime.h5_logout(userinfo , (obj)=>{
                this.subLogout = SDKSubState.INVALID;
                if(obj.ret == 1)
                {
                    
                }
            });
        }
    }
    /**
     * 返回结构
     */
    public GetPlatform():any
    {
        var platform = "undefined";
        var id = 2;
        if(laya.utils.Browser.onAndroid)
        {
            platform = "Andriod";
            id = 2;
        }
        else if(Laya.Browser.onIOS)
        {
            platform = "IOS";
            id = 1;
        }
        else if(Laya.Browser.onWP)
        {
            platform = "windows Phone";
            id = 3;
        }
        else if(Laya.Browser.onWeiXin)
        {
            platform = "WeiXin";
            id = 4;
        }
        else if(Laya.Browser.onPC)
        {
            platform = "PC";
            id = 5;
        }
        else if(Laya.Browser.onMiniGame)
        {
            platform = "MiniGame";
            id = 6;
        }
        else if(Laya.Browser.onMobile)
        {
            platform = "Mobile";
            id = 7;
            
        }
        return {platform:platform,id:id};
    }

    public getBaseData(action:string):any
    {
        var base_data:any = {};//sdk数据统计
        base_data.user_id = this.LoginInfo.user_id;
        base_data.role_id = SRoleData.instance.roleId;
        base_data.role_name = SRoleData.instance.roleInfo.Name;
        base_data.server = GameConfig.GAME_SERVER_ID;
        base_data.area = "China";
        base_data.is_new = SRoleData.instance.IsNewRole == true?1:0;
        base_data.server_name = SLogin.instance.CurrentServerInfo.name;
        base_data.party_name = "";
        base_data.action = action;
        return base_data;
    }

    public SendLoginEvent()
    {
        if(!this.LoginInfo)return;
        var base_data = this.getBaseData("loginEvent");
        var extend_data:any = {};
        extend_data.level = SRoleData.instance.roleInfo.Lv;
        extend_data.vip_level = "";
        extend_data.golds = SRoleData.instance.info.Yuanbao;
        extend_data.score = "";
        extend_data.role_create_time = SRoleData.instance.NewCreateRoleTime;
        extend_data.role_update_time = GameUtils.TimeStamp;
        this.roleEvent.data = {
            action: "loginEvent",
            base_data: base_data,
            extend_data: extend_data,
        };
        window.dispatchEvent(this.roleEvent);
    }

    public SendPayEvent()
    {
    }

    public SendLevelEvent()
    {
        if(!this.LoginInfo)return;
        var base_data = this.getBaseData("levelEvent");
        var extend_data:any = {};
        extend_data.level = SRoleData.instance.roleInfo.Lv;
        extend_data.vip_level = "";
        extend_data.golds = SRoleData.instance.info.Yuanbao;
        extend_data.score = "";
        extend_data.role_create_time = SRoleData.instance.NewCreateRoleTime;
        extend_data.role_update_time = GameUtils.TimeStamp
        this.roleEvent.data = {
            action: "levelEvent",
            base_data: base_data,
            extend_data: extend_data,
        };
        window.dispatchEvent(this.roleEvent);
    }
    
    private MIrJHSDk(e)
    {
        try {
            var currentAction = e.data.action;
            switch(currentAction)
            {
                case "share":
                {
                    break;
                }
                case "follow":
                {
                    break;
                }
                case "showMessage":
                {
                    break;
                }
                case "logout":
                {
                    SGameData.instance.ReConnect();
                    this.SdkState = SDkState.INVALID;
                    break;
                }
                case "desktop":
                {
                    break;
                }
                case "qbrowserVisibilityChange":
                {
                    //alert("e.data.result==="+e.data.result);
                    //Laya.stage.renderingEnabled = e.data.result == "success"?true:false;
                    if(e.data.result)
                    {
                        SGameData.instance.PlayMusic(SGameData.instance.PLAYFIGHTREPORT);
                        Laya.stage.renderingEnabled = true;
                    }
                    else
                    {
                        Laya.SoundManager.stopAll();
                        Laya.stage.renderingEnabled = false;
                    }
                    break;
                }
                case "gift":
                {
                    break;
                }
            }
            
        } catch (error) {
            Debug.serverLog(error);
        }
    }
}