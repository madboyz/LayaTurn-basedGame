import { SheetManager } from '../../db/sheet/SheetManager';
import { ConstVo } from '../../db/sheet/vo/ConstVo';
import { Sys_openVo } from '../../db/sheet/vo/Sys_openVo';
import { SChaosBattleData } from '../../game/activity/data/SChaosBattleData';
import { SAoiData } from '../../game/aoi/SAoiData';
import { SChapterData } from '../../game/chapter/SChapterData';
import { CommonControl } from '../../game/common/control/CommonControl';
import { RedDotManager } from '../../game/redDot/RedDotManager';
import { SSkillData } from '../../game/skill/SSkillData';
import { STaskData } from '../../game/task/STaskData';
import { STeamData } from '../../game/team/STeamData';
import { ItemData } from '../../game/ui/compent/data/ItemData';
import { MsgRollTipsType } from '../../game/ui/compent/MsgRollTipsType';
import { FliterManager } from '../../game/ui/manager/FliterManager';
import { FucManager } from '../../game/ui/manager/FucManager';
import { SActiveData } from '../../game/ui/view/active/data/SActiveData';
import { SAnswerQuestionData } from '../../game/ui/view/answerQuestion/data/SAnswerQuestionData';
import { SComateData } from '../../game/ui/view/comate/data/SComateData';
import { SActiveRewardData } from '../../game/ui/view/dayReward/data/SActiveRewardData';
import { SJJCData } from '../../game/ui/view/jjc/data/SJJCData';
import { SPetChoujiangData } from '../../game/ui/view/petChoujiang/data/SPetChoujiangData';
import { HtmlUtils } from '../../game/utils/HtmlUtils';
import { S998, S999 } from '../pt/pt_comm';
import { SdkManager } from '../SdkManager';
import { Debug } from './../../debug/Debug';
import { MsgManager } from './../../game/ui/manager/MsgManager';
import { GameUtils } from './../../game/utils/GameUtils';
import { DataManager } from './../../message/manager/DataManager';
import { MessageBase } from './../../message/messageBase/MessageBase';
import { C10004, C10006, C10008, C10009, C10012, S10004, S10007, S10008, S10009, S10010, S10012 } from './../pt/pt_10';
import { S13014, S13070, S13070_1, S13071, S13093 } from './../pt/pt_13';
import { SocketManager } from './../SocketManager';
import { SBagData } from './SBagData';
import { SChatData } from './SChatData';
import { SCopyData } from './SCopyData';
import { SForgingData } from './SForgingData';
import { SFriendData } from './SFriendData';
import { SLogin, ServerMarkNO } from './SLogin';
import { SMailData } from './SMailData';
import { SMountData } from './SmountData';
import { SNewBattleData } from './SNewBattleData';
import { SPetData } from './SPetData';
import { SRoleData } from './SRoleData';
import { SShopData } from './SShopData';
import { SWorldBossData } from './SWorldBossData';
import { Alert } from '../../game/ui/compent/Alert';
import { SceneManager } from '../../game/battle/scene/SceneManager';
import { SGridSceneData } from '../../game/activity/data/SGridSceneData';
import { SMachineData } from '../../game/machine/SMachineData';
import { SGuildData } from '../../game/ui/view/guild/data/SGuildData';
import { SRechargeData } from '../../game/ui/view/recharge/data/SRechargeData';
import { SSignInData } from '../../game/ui/view/signIn/data/SSignInData';
import { SOpenServiceActivityData } from '../../game/ui/view/openServiceActivity/data/SOpenServiceActivityData';
import { SWudaohuiData } from '../../game/ui/view/wudaohui/data/SWudaohuiData';
import { SDartData } from '../../game/dart/data/SDartData';
import { SYYActivityData } from '../../game/ui/view/yyActivity/data/SYYActivityData';
import { SBossData } from '../../game/ui/view/copy/BossCopy/data/SBossData';
import { SOtherPlayerData } from '../../game/ui/view/otherPlayer/data/SOtherPlayerData';
import { SFabaoData } from '../../game/ui/view/fabao/data/SFabaoData';
export class SGameData extends Laya.EventDispatcher {
    /** 心跳发送间隔  */
    //private StartCallTimeCall:boolean = false;//开启心跳包回包计时
    //private readonly HertTimeOut = 10000;
    //private TickCallBackTimer = 0;//心跳包回来时间
    public readonly TICKER: number = 60000;
    public HertTimer: number = 60000;
    public openList: Array<any> = [];
    public PLAYFIGHTREPORT: boolean = false;//是否正在播放战报
    public LoadingCount = 0;
    public EnterScene = false;//进入场景
    public isReConnected = false;//是否断线重连
    private OpenReConnect: boolean = false;
    private LastHours = 0;
    public ReconnetTime = 0;//断线间隔时间
    private isReconnetTimeOut: boolean = false;
    constructor() {
        super();
        SocketManager.instance.on(Laya.Event.COMPLETE, this, this.onSuccess);
        SocketManager.instance.on(Laya.Event.ERROR, this, this.onWSError);
        SocketManager.instance.on(Laya.Event.CLOSE, this, this.onWSClose);
    }
    private static _instance: SGameData;
    public static get instance(): SGameData {
        this._instance = this._instance || new SGameData();
        return this._instance;
    }
    /** 
     * 预load角色模型
    */
    public preLoadRoleJson() {
        var resList = [
            "art/anim/role1/body/stand.json",
            "art/anim/role3/body/stand.json",
            "art/anim/role1/body/run.json",
            "art/anim/role3/body/run.json",
            "art/anim/role1/body/defence.json",
            "art/anim/role3/body/defence.json",
            "art/anim/role1/body/attack01.json",
            "art/anim/role3/body/attack01.json",
            "art/anim/role1/body/attack02.json",
            "art/anim/role3/body/attack02.json",
            "art/anim/role1/body/standbei.json",
            "art/anim/role3/body/standbei.json",
            "art/anim/role1/body/runbei.json",
            "art/anim/role3/body/runbei.json",
            "art/anim/role1/body/defencebei.json",
            "art/anim/role3/body/defencebei.json",
            "art/anim/role1/body/attack01bei.json",
            "art/anim/role3/body/attack01bei.json",
            "art/anim/role1/body/attack02bei.json",
            "art/anim/role3/body/attack02bei.json",
        ];

        var THIS = this;
        var AtlatCount = 0;
        for (let i = 0; i < resList.length; i++) {
            const element = resList[i];
            Laya.loader.load(element,
                Laya.Handler.create(this, function () {
                    AtlatCount++;
                    if (AtlatCount == resList.length) {
                        THIS.LoadingComplete("正在初始化SDK");
                    }
                    else {
                        Laya.Animation.createFrames(element, element);
                        THIS.LoadingComplete(`正在加载模型资源资源${AtlatCount}`);
                    }
                }), null, Laya.Loader.ATLAS);
        }
    }

    public InitLoading() {
        if (Laya.Browser.window.launchLoading && Laya.Browser.window.launchLoading.remove)
            Laya.Browser.window.launchLoading.remove();
        this.LoadingCount = 0;
        var THIS = this;
        THIS.LoadingComplete("正在加载配置表1");
        FliterManager.instance.load(() => {
            THIS.LoadingComplete("正在加载配置表2");
            SheetManager.loadDB(() => {
                UIManager.instance.fuc = new FucManager();
                var AtlatCount = 0;
                UILoadManager.instance.preLoadAtlas(
                    Laya.Handler.create(this, function () {
                        AtlatCount++;
                        if (AtlatCount == GameConfig.GAME_LOAD_UI_COUNT) {
                            //THIS.LoadingComplete("正在初始化SDK");
                            THIS.preLoadRoleJson();
                        }
                        else
                            THIS.LoadingComplete(`正在加载UI资源${AtlatCount}`);
                    })
                );
            });
        });
    }

    private LoadingComplete(tips: string) {
        this.LoadingCount++;
        this.event(SGameEvent.GAME_LOADING_UPDATE, [tips])
        if (this.LoadingCount == GameConfig.GAME_LOAD_COUNT)
        //if(this.LoadingCount == 7)
        {
            SceneManager.instance.Init();
            if (!GameConfig.GAME_SDK) {
                UIManager.instance.closeUI(UIID.LOADING);
                UIManager.instance.openUI(UIID.TEST_LOGIN);
            }
            else {
                /**
                * 其他sdk相关
                */
                SdkManager.instance.InitSDk();
            }
        }
    }

    /**
     * 用于注册一些control
     */
    public registerControl() {

    }

    public unRegisterEvent() {
        SLogin.instance.unRegisterEvent();//登陆信息
        SRoleData.instance.unRegisterEvent();//角色信息
        SChatData.instance.unRegisterEvent();//聊天信息
        SNewBattleData.instance.unRegisterEvent();//新战斗注册
        SAoiData.instance.unRegisterEvent();
        STaskData.instance.unRegisterEvent();//任务信息
        SBagData.instance.unRegisterEvent();//背包信息
        SSkillData.instance.unRegisterEvent();//技能查询
        SPetData.instance.unRegisterEvent();//宠物信息
        SForgingData.instance.unRegisterEvent();//锻造信息
        SChapterData.instance.unRegisterEvent();//章节
        SMountData.instance.unRegisterEvent();//坐骑信息
        SFriendData.instance.unRegisterEvent();//好友信息
        STeamData.instance.unRegisterEvent();
        SCopyData.instance.unRegisterEvent();//副本信息
        SMailData.instance.unRegisterEvent();//邮件信息
        SChaosBattleData.instance.unRegisterEvent();//注册大乱斗
        SWorldBossData.instance.unRegisterEvent();//世界boss
        SComateData.instance.unRegisterEvent();//伙伴
        SShopData.instance.unRegisterEvent();//商店
        SActiveData.instance.unRegisterEvent();//活动
        SActiveRewardData.instance.unRegisterEvent();//累计奖励;
        SJJCData.instance.unRegisterEvent();//竞技场
        RedDotManager.instance.unRegisterEvent();//红点系统
        SAnswerQuestionData.instance.unRegisterEvent();//世界答题活动
        SPetChoujiangData.instance.unRegisterEvent();//宠物抽奖
        SGridSceneData.instance.unRegisterEvent();//格子副本
        SMachineData.instance.unRegisterEvent();//寻路机器人
        SGuildData.instance.unRegisterEvent();//帮派
        SRechargeData.instance.unRegisterEvent();//充值
        SSignInData.instance.unRegisterEvent();//签到
        SOpenServiceActivityData.instance.unRegisterEvent();//开服活动
        SWudaohuiData.instance.unRegisterEvent();//武道会
        SDartData.instance.unRegisterEvent();//押镖
        SYYActivityData.instance.unRegisterEvent();//运营活动
        SBossData.instance.unRegisterEvent();//至尊BOSS
        SOtherPlayerData.instance.unRegisterEvent();//查看别人信息
        SFabaoData.instance.unRegisterEvent();//法宝

        DataManager.cancel(PROTOCOL.E998, this, this.onGetMsg);//获得某个提示
        DataManager.cancel(PROTOCOL.E999, this, this.onGetErrorMsg);//错误提示
        DataManager.cancel(PROTOCOL.E10004, this, this.onEnterGame);//进入游戏成功
        // DataManager.listen(10006, this, this.onHeartBack);//心跳包返回
        DataManager.cancel(PROTOCOL.E10007, this, this.onOtherPlayer);//账号被其他人顶替了
        DataManager.cancel(PROTOCOL.E10008, this, this.onSynchroTime);//同步服务端时间
        DataManager.cancel(PROTOCOL.E10009, this, this.onHasInitBack);//服务器已经知道客户端初始化完毕
        DataManager.cancel(PROTOCOL.E10010, this, this.onShotOffBySever);//被服务器强行踢出
        DataManager.cancel(PROTOCOL.E10012, this, this.onGetOpenSeverTime);//获得服务器开服时间
        DataManager.cancel(PROTOCOL.E13014, this, this.onGetItem);//获得物品提示
        DataManager.cancel(PROTOCOL.E13070, this, this.onOpenLists);//系统已开放列表
        DataManager.cancel(PROTOCOL.E13071, this, this.onNewSystemOpen);//新系统开放
        DataManager.cancel(PROTOCOL.E13093, this, this.onS13093);//离线收益
        DataManager.cancel(PROTOCOL.E10013, this, this.onUpdateVersion);//版本更新
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    /**
    *  连接成功后注册所有事件
    */
    public registerEvent() {
        SLogin.instance.registerEvent();//登陆信息
        SRoleData.instance.registerEvent();//角色信息
        SChatData.instance.registerEvent();//聊天信息
        //SBattleData.instance.registerEvent();//战斗协议注册
        SNewBattleData.instance.registerEvent();//新战斗注册
        SAoiData.instance.registerEvent();
        STaskData.instance.registerEvent();//任务信息
        SBagData.instance.registerEvent();//背包信息
        SSkillData.instance.registerEvent();//技能查询
        SPetData.instance.registerEvent();//宠物信息
        SForgingData.instance.registerEvent();//锻造信息
        SChapterData.instance.registerEvent();//章节
        SMountData.instance.registerEvent();//坐骑信息
        SFriendData.instance.registerEvent();//好友信息
        STeamData.instance.registerEvent();
        SCopyData.instance.registerEvent();//副本信息
        SMailData.instance.registerEvent();//邮件信息
        SChaosBattleData.instance.registerEvent();//注册大乱斗
        SWorldBossData.instance.registerEvent();//世界boss
        SComateData.instance.registerEvent();//伙伴
        SShopData.instance.registerEvent();//商店
        SActiveData.instance.registerEvent();//活动
        SActiveRewardData.instance.registerEvent();//累计奖励;
        SJJCData.instance.registerEvent();//竞技场
        RedDotManager.instance.registerEvent();//红点系统初始化
        SAnswerQuestionData.instance.registerEvent();//世界答题活动
        SPetChoujiangData.instance.registerEvent();//宠物抽奖
        SGridSceneData.instance.registerEvent();//格子副本
        SMachineData.instance.registerEvent();//寻路机器人
        SGuildData.instance.registerEvent();//帮派
        SRechargeData.instance.registerEvent();//充值
        SSignInData.instance.registerEvent();//签到
        SOpenServiceActivityData.instance.registerEvent();//开服活动
        SWudaohuiData.instance.registerEvent();//武道会
        SDartData.instance.registerEvent();//押镖
        SYYActivityData.instance.registerEvent();//运营活动
        SBossData.instance.registerEvent();//至尊BOSS
        SOtherPlayerData.instance.registerEvent();//查看别人信息
        SFabaoData.instance.registerEvent();//法宝

        DataManager.listen(PROTOCOL.E998, this, this.onGetMsg);//获得某个提示
        DataManager.listen(PROTOCOL.E999, this, this.onGetErrorMsg);//错误提示
        DataManager.listen(PROTOCOL.E10004, this, this.onEnterGame);//进入游戏成功
        // DataManager.listen(10006, this, this.onHeartBack);//心跳包返回
        DataManager.listen(PROTOCOL.E10007, this, this.onOtherPlayer);//账号被其他人顶替了
        DataManager.listen(PROTOCOL.E10008, this, this.onSynchroTime);//同步服务端时间
        DataManager.listen(PROTOCOL.E10009, this, this.onHasInitBack);//服务器已经知道客户端初始化完毕
        DataManager.listen(PROTOCOL.E10010, this, this.onShotOffBySever);//被服务器强行踢出
        DataManager.listen(PROTOCOL.E10012, this, this.onGetOpenSeverTime);//获得服务器开服时间
        DataManager.listen(PROTOCOL.E13014, this, this.onGetItem);//获得物品提示
        DataManager.listen(PROTOCOL.E13070, this, this.onOpenLists);//系统已开放列表
        DataManager.listen(PROTOCOL.E13071, this, this.onNewSystemOpen);//新系统开放
        DataManager.listen(PROTOCOL.E13093, this, this.onS13093);//离线收益
        DataManager.listen(PROTOCOL.E10013, this, this.onUpdateVersion);//版本更新

        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    /**
     * 登陆服务器
     * @param {string} ip 
     * @param {number} port 
     * @memberof SGameData
     */
    public loginSever(ip?: string, port?: number): void {
        SocketManager.instance.connect(ip, port);
    }

    /**
     * ws连接成功处理
     */
    private onSuccess() {
        this.OpenReConnect = false;
        Laya.timer.clear(this, this.onTicker);
        this.unRegisterEvent();//取消注册监听服务器的事件
        this.registerEvent();//注册监听服务器的事件
        this.registerControl();//注册数据control类
        SLogin.instance.LoginGameServer();
        //UIManager.instance.openUI(UIID.START_GAME,UILEVEL.POP_2);
        //this.event(SGameEvent.GAME_REQUEST_LAND);//申请登陆
        Laya.timer.loop(1000, this, this.onTicker);//心跳

        Laya.timer.clear(this, this.updateReconnetTime);
    }

    /**
     * 向服务器发送心跳
     */
    public onTicker(): void {
        if (this.HertTimer == this.TICKER) {
            var msg: MessageBase = new C10006();
            SocketManager.instance.send(msg);
            this.HertTimer = 0;
            //this.TickCallBackTimer = 0;
            //this.StartCallTimeCall = true;
        }
        else {
            //if(this.StartCallTimeCall)
            //this.TickCallBackTimer += 1000;
            this.HertTimer += 1000;
        }
        //if(this.TickCallBackTimer >= this.HertTimeOut)
        //{
        //    this.TickCallBackTimer = 0;
        //    this.StartCallTimeCall = false;
        //    SocketManager.instance.close();\
        //}
        GameUtils.TimeStamp++;
        var date = new Date(GameUtils.TimeStamp * 1000);
        var hh = date.getHours();
        if (this.LastHours != hh) {
            if ((hh == 0 || hh == 24)) {
                SWorldBossData.instance.init();//查询世界boss详情
                SGuildData.instance.protocol.requsetGuildBossInfos();
                CommonControl.instance.send57003(CopyType.PERSON);//查询个人副本信息
                CommonControl.instance.send57003(CopyType.WORLD);//查询世界boss副本信息
                CommonControl.instance.send57003(CopyType.MATERIAL);//查询材料副本信息
                CommonControl.instance.send57003(CopyType.Grid);//查询格子副本
                CommonControl.instance.send57003(CopyType.OPEN_ACTIVITY);//查询开服副本
                CommonControl.instance.send57003(CopyType.GUILD_BOSS);//查询帮派BOSS
                CommonControl.instance.send57018();//查询宠物副本信息   
                SActiveRewardData.instance.protocal.send13055();//查询7日奖励
                SActiveRewardData.instance.protocal.send13053();//查询在线奖励
                SSignInData.instance.protocol.send13051();//请求每月签到相关
                SRechargeData.instance.protocol.send13098();//请求月卡数据
            }
            this.LastHours = hh;
        }
        this.event(SGameEvent.GAME_TIME_UPDATE);
    }
    /**
     * 客户端已经初始化完毕 等待服务端通知充值、或者其他的一些异步消息通知客户端
     * @memberof SGameData
     */
    public hasInitSence(): void {
        var msg: C10009 = new C10009();
        SocketManager.instance.send(msg);
    }
    /**
     * 请求开服时间
     * @memberof SGameData
     */
    public requestOpenTime(): void {
        var msg: C10012 = new C10012();
        SocketManager.instance.send(msg);
    }

    public requestServerTime(): void {
        var msg: C10008 = new C10008();
        SocketManager.instance.send(msg);
    }

    /**
     * 申请进入游戏 
     */
    public requestEnterGame(): void {
        var msg: C10004 = new C10004();
        msg.Id = SRoleData.instance.roleId;
        SocketManager.instance.send(msg);
    }
    /**
     * 断线重连
     */
    public ReConnect(): void {
        if (!this.EnterScene) {
            Alert.show("大侠,你掉线了！", this, () => {
                var location = window["location"];
                location.reload();
            }, null, null, null, false);
            return;
        }
        this.isReConnected = true;
        SNewBattleData.instance.isInitLogin = false;
        if (this.PLAYFIGHTREPORT) {
            SNewBattleData.instance.ForceStop = true;
            SNewBattleData.instance.BattleFinish(0, false);
        }

        this.event(SGameEvent.GAME_RECONNECT);
        UIManager.instance.closePanelByLayer(UILEVEL.POP_1_5);
        UIManager.instance.closePanelByLayer(UILEVEL.POP_2);
        UIManager.instance.closePanelByLayer(UILEVEL.POP_3);
        UIManager.instance.closePanelByLayer(UILEVEL.POP_4);
        UIManager.instance.closePanelByLayer(UILEVEL.POP_5);
        SLogin.instance.Login(GameConfig.GAME_SERVER_ID);
        this.OpenReConnect = true;

        //SLogin.instance.Reconnet();
    }

    protected onWSError() {
        Laya.timer.clear(this, this.onTicker);
        Debug.serverLog("onWSError >> ");
        //if(this.isReConnected) return;
        //Alert.show("大侠,你掉线了！",this,()=>{
        //    this.ReConnect();
        //},null,null,null,false);
        //this.ReConnect();
    }


    protected onWSClose() {
        Laya.timer.clear(this, this.onTicker);
        Debug.serverLog("onWSClose >> ");
        //if(this.isReConnected) return;
        //if(this.ReConnectCount == GameConfig.GAME_RECONNECT_COUNT)
        //{
        //    Alert.show("大侠,你掉线了！",this,()=>{
        //        this.ReConnectCount = 0;
        //        var location = window["location"];
        //        location.reload();
        //    },null,null,null,false);
        //    return;
        //}

        if (!this.OpenReConnect) {
            Laya.timer.loop(1000, this, this.updateReconnetTime);
        }
        if (!this.isReconnetTimeOut)
            this.ReConnect();
        //this.ReConnectCount ++;
        //this.ReConnect();
    }

    public updateReconnetTime(): void {
        if (this.ReconnetTime > 20) {
            this.isReconnetTimeOut = true;
            Alert.show("大侠,你掉线了！", this, () => {
                var location = window["location"];
                location.reload();
            }, null, null, null, false);
            Laya.timer.clear(this, this.updateReconnetTime);
        }
        this.ReconnetTime++;
    }

    private onGetMsg(data: S998): void {
        MsgManager.instance.showCommonTips(data.MsgCode);
    }

    private onGetErrorMsg(data: S999): void {
        MsgManager.instance.showRollTipsMsg(data.ErrMsg);
    }

    private onEnterGame(data: S10004): void {
        if (data.RetCode == 0) {
            this.requestServerTime();
            SRoleData.instance.roleId = data.Id;
            this.requestOpenTime();
            CommonControl.instance.send13002(data.Id);
            SRoleData.instance.requestRoleInfo();
            CommonControl.instance.send13070();//查询已开放的系统
            CommonControl.instance.send21001();//查看技能
            CommonControl.instance.send40055();//查看帮派技能
            //this.event(SRoleEvent.ROLE_REQUEST_ROLEINFO);//申请角色简要信息
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_PLAYER_EQP, 0);//请求人物装备0
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_MOUNT_EQP, 0, 3);//请求坐骑装备
            // CommonControl.instance.onGoodsCheckStroage(BagType.LOC_PARTNER_EQP, 0);//请求宠物装备
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_BAG_EQ, 0);//请求查询装备
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_BAG_USABLE, 0);//请求查询物品
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_BAG_UNUSABLE, 0);//请求查询物品5
            CommonControl.instance.onGoodsCheckStroage(BagType.LOC_ACCESSORY, 0);//请求查询法宝
            CommonControl.instance.send66001();//查询坐骑列表
            CommonControl.instance.send14000();//好友列表
            CommonControl.instance.send14011();//好友信息0
            CommonControl.instance.send19002(1);//查看邮件简要信息列表
            CommonControl.instance.send19002(2);//查看邮件简要信息列表
            SWorldBossData.instance.init();//查询世界boss详情
            SGuildData.instance.protocol.requsetGuildBossInfos();
            CommonControl.instance.send57003(CopyType.PERSON);//查询个人副本信息
            CommonControl.instance.send57003(CopyType.WORLD);//查询世界boss副本信息
            CommonControl.instance.send57003(CopyType.MATERIAL);//查询材料副本信息
            CommonControl.instance.send57003(CopyType.Grid);//查询格子副本
            CommonControl.instance.send57003(CopyType.OPEN_ACTIVITY);//查询开服副本
            CommonControl.instance.send57003(CopyType.GUILD_BOSS);//查询帮派BOSS
            CommonControl.instance.send57018();//查询宠物副本信息
            SChapterData.instance.RequestChapter();
            //SChapterData.instance.RequestAchievements();
            SLogin.instance.PostServerControl();
            // CommonControl.instance.send13092(0);//离线领取test 如果不发会卡战斗
            CommonControl.instance.send13047();//查询心法
            CommonControl.instance.send13046();//查询经脉
            CommonControl.instance.send37007();//已获得伙伴信息
            CommonControl.instance.send37009();//阵容信息
            CommonControl.instance.send13090();//请求挂机状态
            CommonControl.instance.send58001();//查询活动状态
            CommonControl.instance.send13059();//查询登录奖励是否领取
            SActiveRewardData.instance.protocal.send13055();//查询7日奖励
            SActiveRewardData.instance.protocal.send13057();//查询等级奖励
            SActiveRewardData.instance.protocal.send13053();//查询等级奖励
            CommonControl.instance.send52002();//查询商城
            CommonControl.instance.send17008();//获得已激活宠物列表
            CommonControl.instance.send15005();//初始化强化信息和宝石镶嵌信息
            CommonControl.instance.send13095();//请求各档位充值状态
            SSignInData.instance.protocol.send13051();//请求每月签到相关
            CommonControl.instance.requestAllTitle();//初始化请求所有称号
            CommonControl.instance.requestAllFashion();//初始化请求所有时装
            SOpenServiceActivityData.instance.protocol.send31070();//查询活动活动相关内容
            SOpenServiceActivityData.instance.protocol.send32011();//查询兑换次数
            SComateData.instance.protocol.send37012();//查询伙伴缘分
            SRechargeData.instance.protocol.send13098();//请求月卡数据
            SRechargeData.instance.protocol.send13128();//请求投资计划数据
            SRechargeData.instance.protocol.send13130();//请求累计充值数据
            SYYActivityData.instance.protocol.send31060();//请求运营活动
            SYYActivityData.instance.protocol.send31300();//请求运营礼包情况
            SBossData.instance.protocol.askSuperBossInfo();//至尊BOSS
            SBossData.instance.protocol.send57028();//三界副本
            SBossData.instance.protocol.send57032();//勇闯天宫
            SComateData.instance.protocol.askMinggeInfo();//命格列表
            SComateData.instance.protocol.askMinggePoolInfo();//命格池子列表
            SSkillData.instance.protocol.send13119();//查询飞升技能

            SLogin.instance.PostServerPoint(ServerMarkNO.ENTER_GAME);
            SLogin.instance.MarkPoint = false;
        }
        else {
            var str: string;
            switch (data.RetCode) {
                case EnterGameError.ENTER_GAME_FAIL_UNKNOWN:
                    str = "失败（未知错误）";
                    break;
                case EnterGameError.ENTER_GAME_FAIL_ROLE_BANNED:
                    str = "角色被封禁了";
                    break;
                case EnterGameError.ENTER_GAME_FAIL_SERVER_FULL:
                    str = "服务器人满了";
                    break;
                case EnterGameError.ENTER_GAME_FAIL_SERVER_BUSY:
                    str = "服务器繁忙，请稍后再试";
                    break;
                default:
                    break;
            }
            MsgManager.instance.showRollTipsMsg(str);
        }
    }

    private onOtherPlayer(data: S10007) {
        alert("您的账号在别处登录了");
        SdkManager.instance.LogOut();
        SocketManager.instance.close();
        var location = window["location"];
        location.reload();
    }

    private onSynchroTime(data: S10008) {
        GameUtils.TimeStamp = data.TimeStamp;//同步服务器时间
        var aaaaa = new Date(data.TimeStamp * 1000 + 30 * 24 * 3600 * 1000);
        var vbbbb = aaaaa.getMonth();
        var ccccc = aaaaa.getDate();
        var dddddd = aaaaa.getDay();

        //this.StartCallTimeCall = false;
        //this.TickCallBackTimer = 0;
        this.event(SGameEvent.GAME_TIME_UPDATE);
    }

    private onHasInitBack(data: S10009) {
        this.event(SGameEvent.GAME_ENTER_SUCCES);//场景加载完毕，进入游戏成功
    }

    private onShotOffBySever(data: S10010) {
        switch (data.Reason) {
            case 0:
                {
                    alert("服务器停服维护");
                    break;
                }
            case 1:
                {
                    alert("您使用外挂,请刷新后重试");
                    break;
                }
        }
        SdkManager.instance.LogOut();
        SocketManager.instance.close();
        var location = window["location"];
        location.reload();
    }

    private onUpdateVersion() {
        Alert.show("大侠,有版本更新！", this, () => {
            SdkManager.instance.LogOut();
            SocketManager.instance.close();
            var location = window["location"];
            location.reload();
        }, null, null, null, false);
    }


    //需要剔除的道具列表
    public hideItemNoList: number[] = [];
    //存储的数据列表
    public saveDateList: S13014[] = [];
    //存下来的道具，显示出来
    public showSaveItem(): void {
        for (let i = this.saveDateList.length - 1; i >= 0; i--) {
            var data = this.saveDateList[i];
            this.onGetItem(data);
        }
        this.saveDateList = [];
    }

    private onGetItem(data: S13014): void {
        //去掉隐藏列表里面的道具
        for (let i = this.hideItemNoList.length - 1; i >= 0; i--) {
            var itemNo = this.hideItemNoList[i];
            if (data.No == itemNo) {
                this.hideItemNoList.splice(i, 1);
                this.saveDateList.push(data);
                return;
            }
        }
        var itemData = new ItemData(data.No);
        if (data.No == 99 || itemData.clientInfo.type == GoodsType.AUTO_GOODS) {
            //策划让把99ID的道具，临时屏蔽掉
            return;
        }
        if (this.PLAYFIGHTREPORT == false || data.Delay != 1) {
            var item: ItemData = new ItemData(data.No);
            var str: string;
            var newData: ItemData;
            if (item.clientInfo && item.clientInfo.no) {
                if (item.IsEquip) {
                    newData = SBagData.instance.equip.getItemDataByGoodId(data.Id);
                    if (newData) {
                        str = HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", "")) + HtmlUtils.addColor(newData.clientInfo.name, HtmlUtils.getTipsColor(newData.serverInfo.Quality), 20);
                        MsgManager.instance.showItemRollTipsMsg(str, MsgRollTipsType.msgRollTips2);
                    }
                }
                else {
                    newData = SBagData.instance.prop.getItemDataByGoodId(data.Id);
                    if (newData && newData.serverInfo && newData.serverInfo.Quality) {
                        str = HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", "")) + HtmlUtils.addColor(newData.clientInfo.name + " x " + GMath.GetChineseNumber(data.Count), HtmlUtils.getTipsColor(newData.serverInfo.Quality), 20);
                    }
                    else {
                        str = HtmlUtils.addImage("art/item/" + item.clientInfo.icon.replace(".png", "")) + HtmlUtils.addColor(item.clientInfo.name + " x " + GMath.GetChineseNumber(data.Count), HtmlUtils.getTipsColor(item.clientInfo.quality), 20);
                    }
                    MsgManager.instance.showItemRollTipsMsg(str, MsgRollTipsType.msgRollTips2);
                }
            }
        }
        else {
            this.itemList.push(data);
        }
    }

    public itemList: Array<any> = [];

    private onUpdateFightState(): void {
        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            while (this.itemList.length) {
                var data: any = this.itemList.shift();
                var item: ItemData = new ItemData(data.No);
                var str: string;
                var newData: ItemData;
                if (item.clientInfo && item.clientInfo.no) {
                    if (item.IsEquip) {
                        newData = SBagData.instance.equip.getItemDataByGoodId(data.Id);
                        if (newData) {
                            str = HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", "")) + HtmlUtils.addColor(newData.clientInfo.name, HtmlUtils.getTipsColor(newData.serverInfo.Quality), 20);
                            MsgManager.instance.showItemRollTipsMsg(str, MsgRollTipsType.msgRollTips2);
                        }
                    }
                    else {
                        newData = SBagData.instance.prop.getItemDataByGoodId(data.Id);
                        if (newData && newData.serverInfo && newData.serverInfo.Quality) {
                            str = HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", "")) + HtmlUtils.addColor(newData.clientInfo.name + " x " + GMath.GetChineseNumber(data.Count), HtmlUtils.getTipsColor(newData.serverInfo.Quality), 20);
                        }
                        else {
                            str = HtmlUtils.addImage("art/item/" + item.clientInfo.icon.replace(".png", "")) + HtmlUtils.addColor(item.clientInfo.name + " x " + GMath.GetChineseNumber(data.Count), HtmlUtils.getTipsColor(item.clientInfo.quality), 20);
                        }
                        MsgManager.instance.showItemRollTipsMsg(str, MsgRollTipsType.msgRollTips2);
                    }
                }
            }

        }
        this.PlayMusic(SGameData.instance.PLAYFIGHTREPORT);
    }

    private onGetOpenSeverTime(data: S10012) {
        GameUtils.openSeverTimeStamp = data.Timestamp;
        this.event(SGameEvent.GAME_SEVEROPENTIME_CHANGE);
    }
    private onOpenLists(data: S13070) {
        this.openList = this.openList.concat(data.item_1);
        this.checkOpenReward();
        this.event(SGameEvent.GAME_SYSTEMOPENLIST);
    }

    private onNewSystemOpen(data: S13071): void {
        this.openList.push(data);
        this.checkSysOpenReward(data.SysCode);
        this.event(SGameEvent.GAME_NEWSYSTEMOPEN, [[data.SysCode]]);
    }

    private onS13093(data: S13093): void {
        var config: ConstVo = ConstVo.get("GAME_MIN_OFFLINE_CALC_TIME");
        if (data.State == 1 && data.Second > config.val) {
            UIManager.instance.openUI(UIID.SYS_OFFLINE_DATA, [data]);
        }
    }

    private _lastFight: boolean;
    public PlayMusic(nono: boolean) {
        if (!GameConfig.GAME_PLAY_MUSIC) return;
        var isFight = !SNewBattleData.instance.isHangUpBattle && SGameData.instance.PLAYFIGHTREPORT
        if (isFight == this._lastFight) {
            return;
        }
        this._lastFight = isFight;
        var url = "";
        if (isFight)
            url = "art/sound/zhandou.mp3";
        else
            url = "art/sound/bg1.mp3";
        Laya.SoundManager.playMusic(url, 0);
    }

    public fightStart(): void {
        this.PLAYFIGHTREPORT = true;//正在播放战报
        this.event(SGameEvent.GAME_FIGHTREPORTSTATE);
        //SGameData.instance.PlayMusic(true);
    }

    public fightEnd(): void {
        this.PLAYFIGHTREPORT = false;//战报播放完毕
        this.event(SGameEvent.GAME_FIGHTREPORTSTATE);
        //SGameData.instance.PlayMusic(false);
    }

    /**
     * 某个系统是否已经开启
     * @param {number} code
     * @returns {boolean}
     * @memberof SGameData
     */
    public hasOpen(code: number): boolean {
        for (let index = 0; index < this.openList.length; index++) {
            const element = this.openList[index];
            if ((element == code) || (element.SysCode == code)) {
                return true;
            }
        }
    }

    /**
     * 检查开放系统的奖励是否已领，没有就打开面板
     */
    public checkOpenReward(): void {
        var cfgs = Sys_openVo.getAllFuncCfgs();
        for (let i = 0; i < cfgs.length; i++) {
            var cfg = cfgs[i] as Sys_openVo;
            if (cfg.is_func_book && cfg.is_func_book > 0 && SRoleData.instance.info.Lv >= cfg.lv_need) {
                var server = this.getOneOfOpenList(cfg.no);
                if (server && server.RewardState != 1) {
                    UIManager.instance.openUI(UIID.SYS_FUNC_OPEN, [true, cfg.no]);//传true表示，是打开领取奖励面板
                }
            }
        }
    }

    public checkSysOpenReward(sysid: number): void {
        var cfg = Sys_openVo.getFuncCfg(sysid);
        if (cfg && cfg.tips && cfg.tips > 0 && SRoleData.instance.info.Lv >= cfg.lv_need) {
            var server = this.getOneOfOpenList(cfg.no);
            if (server && server.RewardState != 1) {
                UIManager.instance.openUI(UIID.SYS_FUNC_OPEN, [true, cfg.no]);//传true表示，是打开领取奖励面板
            }
        }
    }

    /**
     * 获得openList中的一个
     */
    public getOneOfOpenList(sysId: number): S13070_1 {
        for (let i = 0; i < this.openList.length; i++) {
            if (this.openList[i].SysCode == sysId) {
                return this.openList[i];
            }
        }
        return null;
    }

}

export enum SGameEvent {
    GAME_REQUEST_LAND = "game_request_land",//申请登陆
    GAME_REQUEST_ENTERGAME = "game_request_enterGame",//申请进入游戏
    GAME_ENTER_SUCCES = "game_enter_succes",//进入游戏成功
    GAME_SEVEROPENTIME_CHANGE = "game_severOpenTime_change",//服务器开服时间更新
    GAME_SYSTEMOPENLIST = "game_systemOpenList",//系统开放列表
    GAME_NEWSYSTEMOPEN = "game_newSystemOpen",//系统开放
    GAME_NEWSYSTE_GETREWARD = "game_newSystem_gerReward",//新系统领取奖励
    GAME_FIGHTREPORTSTATE = "game_fightReportState",//战斗播放状态
    GAME_TIME_UPDATE = "game_time_update",//服务器时间
    GAME_SCENE_LOADING = "game_scene_load",//游戏地图改变包含初始登录
    GAME_LOADING_UPDATE = "game_loading_update",//loading进度条
    GAME_RECONNECT = "game_reconnect",//断线重连
    GAME_CLICK_SCENE_ROLE = "game_click_scene_role",//点击场景玩家
}