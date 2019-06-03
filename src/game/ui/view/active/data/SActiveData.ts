import { S58001, S58004, S58005 } from "../../../../../net/pt/pt_58";
import { DataManager } from "../../../../../message/manager/DataManager";
import { ActiveInfo } from "./ActiveInfo";
import { Activity_dataVo } from "../../../../../db/sheet/vo/Activity_dataVo";
import { CommonControl } from "../../../../common/control/CommonControl";
import { S13059 } from "../../../../../net/pt/pt_13";

export class SActiveData extends Laya.EventDispatcher {
    private static _instance: SActiveData;
    public ActiveDic:Laya.Dictionary = new Laya.Dictionary();
    public static get instance(): SActiveData {
        return SActiveData._instance || (SActiveData._instance = new SActiveData());
    }
    constructor() {
        super();
    }

    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E58001, this, this.on58001);
        DataManager.cancel(PROTOCOL.E58004, this, this.on58004);
        DataManager.cancel(PROTOCOL.E58005, this, this.on58005);
        DataManager.cancel(PROTOCOL.E13059, this, this.on13059);
        this.ActiveDic.clear();
    }
    
    public registerEvent() {
        DataManager.listen(PROTOCOL.E58001, this, this.on58001);
        DataManager.listen(PROTOCOL.E58004, this, this.on58004);
        DataManager.listen(PROTOCOL.E58005, this, this.on58005);
        DataManager.listen(PROTOCOL.E13059, this, this.on13059);
    }

    public ClientActvies(type:number):ActiveInfo[]
    {
        var list = [];
        for (let i = 0; i < this.ActiveDic.values.length; i++) {
            const element:ActiveInfo = this.ActiveDic.values[i];
            if(element.Sheet&&element.Sheet.is_need_show == 0&&element.Sheet.type == type)
            list.push(element);
        }
        list.sort((a: ActiveInfo, b: ActiveInfo): number => {
            return a.Sheet.orderNo - b.Sheet.orderNo;
        });
        return list;
    }

    private on58001(data:S58001)
    {
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var info:ActiveInfo = this.ActiveDic.get(element.sys);
            if(info == null)
            {
                info = new ActiveInfo();
                info.No = element.sys;
                info.Sheet = Activity_dataVo.get(info.No);
                this.ActiveDic.set(info.No , info);
            }
            info.maxNum = element.max_times;
            info.useNum = element.times;
            info.state = element.state;
        }
        this.event(SActiveEvent.ACTIVE_UPDATE);
    }   
    
    private on58004(data:S58004)
    {
        var info:ActiveInfo = this.ActiveDic.get(data.sys);
        if(info == null)
        {
            info = new ActiveInfo();
            info.No = data.sys;
            info.Sheet = Activity_dataVo.get(info.No);
            this.ActiveDic.set(info.No , info);
            CommonControl.instance.send58001();//如果发生改变并且不存在查询一次
        }
        info.useNum = data.curtimes;
        this.event(SActiveEvent.ACTIVE_UPDATE);
    }

    private on58005(data:S58005)
    {
        var isNo = false;
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            var info:ActiveInfo = this.ActiveDic.get(element.sys);
            if(info == null)
            {
                isNo = true;
                info = new ActiveInfo();
                info.No = element.sys;
                info.Sheet = Activity_dataVo.get(info.No);
                this.ActiveDic.set(info.No , info);
            }
            info.state = element.state;
        }
        if(isNo)
        {
            CommonControl.instance.send58001();//如果发生改变并且不存在查询一次
        }
        this.event(SActiveEvent.ACTIVE_UPDATE);
    }
    
    private on13059(data:S13059):void{
        if(data.RetCode == 1){
            //已经领取了
            this.event(SActiveEvent.ACTIVE_CHECK_LOGINREWARD,false);
        }else{
            UIManager.instance.openUI(UIID.SYS_LOGIN_REWARD);
            this.event(SActiveEvent.ACTIVE_CHECK_LOGINREWARD,true);
        }
    }
}


export enum SActiveEvent {
    ACTIVE_UPDATE = "active_update",//活动更新
    ACTIVE_CHECK_LOGINREWARD = 'active_check_loginReward',//查看是否还有登录奖励
    ACTIVE_GET_LOGINREWARD = "active_get_loginReward",//登录奖励领取
    
}