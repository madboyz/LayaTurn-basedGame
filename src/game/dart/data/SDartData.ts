import { DartProtocol } from "../protocol/DartProtocol";
import { S42001, S42001_1, S42004, S42003, S42005, S42006, S42008, S42009, S42011, S42010, S42002 } from "../../../net/pt/pt_42";
import { DataManager } from "../../../message/manager/DataManager";
import { MsgManager } from "../../ui/manager/MsgManager";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { SRoleData } from "../../../net/data/SRoleData";
import { SGameData, SGameEvent } from "../../../net/data/SGameData";
import { SNewBattleData } from "../../../net/data/SNewBattleData";

export class SDartData extends Laya.EventDispatcher {

    private static _instance: SDartData;
    public protocol:DartProtocol = new DartProtocol();
    public AllInfos = new Laya.Dictionary();
    public MyDartInfo:any = {};
    public MyLogs = [];//自己运镖记录
    public static get instance(): SDartData {
        return SDartData._instance || (SDartData._instance = new SDartData());
    }
    constructor() {
        super();
    }

    public unRegisterEvent() {
        this.AllInfos.clear();
        this.MyDartInfo = {cur_trunk:1,cur_transp:0,cur_hijack:0,
        state:0,start_time:0,be_hijack:0};
        DataManager.cancel(PROTOCOL.E42001, this, this.onS42001);
        DataManager.cancel(PROTOCOL.E42002, this, this.onS42002);
        DataManager.cancel(PROTOCOL.E42003, this, this.onS42003);
        DataManager.cancel(PROTOCOL.E42004, this, this.onS42004);
        DataManager.cancel(PROTOCOL.E42005, this, this.onS42005);
        DataManager.cancel(PROTOCOL.E42006, this, this.onS42006);
        DataManager.cancel(PROTOCOL.E42008, this, this.onS42008);
        DataManager.cancel(PROTOCOL.E42009, this, this.onS42009);
        DataManager.cancel(PROTOCOL.E42010, this, this.onS42010);
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onFightStateChange);//战斗变化
    }

    public registerEvent() {
        //for (let i = 1; i <= 10; i++) {
        //    var lv = GMath.randRange(1,5);
        //    var info = {role_name:`机器人${i}`,role_lv:1,truck_lv:lv};
        //    this.AllInfos.set(i,info);
        //}
        DataManager.listen(PROTOCOL.E42001, this, this.onS42001);
        DataManager.listen(PROTOCOL.E42002, this, this.onS42002);
        DataManager.listen(PROTOCOL.E42003, this, this.onS42003);
        DataManager.listen(PROTOCOL.E42004, this, this.onS42004);
        DataManager.listen(PROTOCOL.E42005, this, this.onS42005);
        DataManager.listen(PROTOCOL.E42006, this, this.onS42006);
        DataManager.listen(PROTOCOL.E42008, this, this.onS42008);
        DataManager.listen(PROTOCOL.E42009, this, this.onS42009);
        DataManager.listen(PROTOCOL.E42010, this, this.onS42010);        
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onFightStateChange);//战斗变化
    }

    

    private onFightStateChange()
    {
        if(SNewBattleData.instance.CurrentBattleType != BattleMainType.PVP||
            SNewBattleData.instance.CurrentBattleSubType != PvpBattleSubType.Dart)
            return;
        if(SGameData.instance.PLAYFIGHTREPORT)
        {
            UIManager.instance.closeUI(UIID.DART_PANEL);
            UIManager.instance.closeUI(UIID.SYS_MAIN);
            UIManager.instance.closeUI(UIID.DART_LOG_PANEL);
        }
        else
        {
            UIManager.instance.openUI(UIID.SYS_MAIN);
            UIManager.instance.openUI(UIID.DART_PANEL);
        }
    }

    private onS42003(data:S42003)
    {
        this.MyLogs = [];
        this.MyLogs = data.item_1;
        this.event(SDartEvent.DART_LOG_UPDATE);
    }

    private onS42002(data:S42002)
    {
        this.MyLogs.push(data);
        this.event(SDartEvent.DART_ONE_LOG_UPDATE,data);
    }

    private onS42001(data:S42001)
    {
        this.AllInfos.clear();
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            // if(element.role_id == SRoleData.instance.roleId)
            // continue;
            this.AllInfos.set(element.role_id,
                    {role_id:element.role_id,role_name:element.role_name,role_lv:element.role_lv,truck_lv:element.truck_lv,
                        employ:element.employ,cur_hijack:element.cur_hijack,max_hijack:element.max_hijack,
                        stage:element.stage,stage_time:element.stage_time});
            
        }
        this.event(SDartEvent.DART_UPDATE_ALL);
    }

    private onS42004(data:S42004)
    {
        if(data.role_id == 0)
        {
            this.protocol.send42001();
            return;
        }
        var info = this.AllInfos.get(data.role_id);
        if(info)
        {
            info.role_name = data.role_name;
            info.role_lv = data.role_lv;
            info.truck_lv = data.truck_lv;
            info.employ = data.employ;
            info.cur_hijack = data.cur_hijack;
            info.max_hijack = data.max_hijack;
            info.stage = data.stage;
            info.stage_time = data.stage_time;
        }
        else
        {
            this.AllInfos.set(data.role_id,
                {role_id:data.role_id,role_name:data.role_name,role_lv:data.role_lv,truck_lv:data.truck_lv,
                    employ:data.employ,cur_hijack:data.cur_hijack,max_hijack:data.max_hijack,
                    stage:data.stage,stage_time:data.stage_time});
        }
        this.event(SDartEvent.DART_UPDATE_ONE , data.role_id);
    }

    private onS42005(data:S42005)
    {
        this.MyDartInfo.cur_trunk = data.cur_trunk;
        this.MyDartInfo.cur_transp = data.cur_transp;
        this.MyDartInfo.cur_hijack = data.cur_hijack;
        this.MyDartInfo.be_hijack = data.be_hijack;
        this.MyDartInfo.state = data.state;
        this.MyDartInfo.start_time = data.start_time;
        this.event(SDartEvent.DART_UPDATE_MY_INFO);
    }

    private onS42006(data:S42006)
    {
        if(data.state == 0)
        {
            this.protocol.send42005();
        }
    }

    private onS42008(data:S42008)
    {
        this.MyDartInfo.cur_trunk = data.truck_lv;
        this.event(SDartEvent.DART_CALL_BACK_STAR,data.truck_lv);
    }

    private onS42009(data:S42009)
    {
        this.MyDartInfo.cur_trunk = data.truck_lv;
        this.event(SDartEvent.DART_CALL_BACK_STAR,data.truck_lv);
    }
    /**
     * 如果返回劫镖失败就重刷列表
     * @param data 
     */
    private onS42010(data:S42010)
    {
        if(data.RetCode == 1)
        {
            this.protocol.send42001();
        }
    }

    public GetReawardNum(count:number,beHiJack:number)
    {
        var g = parseFloat(ConstVo.get("ESCORT_ROB_REWARD").val);
        var num = 0;
        switch(beHiJack)
        {
            case 0:
            {
                num = count;
                break;
            }
            case 1:
            {
                num = Math.ceil(count*g);
                break;
            }
            case 2:
            {
                num = Math.ceil(count*g - count*Math.pow(g,2));
                break;
            }
            default:
            {
                num = Math.ceil(count*g - 2*count*Math.pow(g,2) + count*Math.pow(g,3));
                break;
            }
        }
        return num;
    }
}

export enum SDartEvent {
    DART_UPDATE_HI_COUNT = "dart_update_count",//刷新劫镖次数
    DART_UPDATE_MY_INFO = "dart_update_my_info",//自己运镖信息
    DART_UPDATE_ONE = "dart_update_one",//刷新单个
    DART_UPDATE_ALL = "dart_update_all",//刷新所有
    DART_LOG_UPDATE = "dart_log_update",//运镖记录
    DART_ONE_LOG_UPDATE = "dart_one_log_update",//单个运镖记录推送
    DART_CALL_BACK_STAR = "dart_call_back_star",//各种刷新镖车后的星级
}