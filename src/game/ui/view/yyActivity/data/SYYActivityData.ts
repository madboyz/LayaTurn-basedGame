import { DataManager } from "../../../../../message/manager/DataManager";
import { S31070_1, S31060, S31061, S31062, S31060_1, S31300, S31400, S31401, S31400_1 } from "../../../../../net/pt/pt_31";
import { GameUtils } from "../../../../utils/GameUtils";
import { YYActivityProtocol } from "../protocol/YYActivityProtocol";
import { S13003 } from "../../../../../net/pt/pt_13";
import { SActiveEvent } from "../../active/data/SActiveData";
import { RankMainProrocol } from "../../rank/protocol/RankMainProrocol";

export class SYYActivityData extends Laya.EventDispatcher {
    private static _instance: SYYActivityData;
    public protocol: YYActivityProtocol;
    public rankProtocal: RankMainProrocol;

    public static get instance(): SYYActivityData {
        return SYYActivityData._instance || (SYYActivityData._instance = new SYYActivityData());
    }
    constructor() {
        super();
        this.protocol = new YYActivityProtocol;
        this.rankProtocal = new RankMainProrocol;
    }


    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E13003, this, this.on13003);
        DataManager.cancel(PROTOCOL.E31060, this, this.on31060);
        DataManager.cancel(PROTOCOL.E31061, this, this.on31061);
        DataManager.cancel(PROTOCOL.E31062, this, this.on31062);
        DataManager.cancel(PROTOCOL.E31300, this, this.on31300);
        DataManager.cancel(PROTOCOL.E31400, this, this.on31400);
        DataManager.cancel(PROTOCOL.E31401, this, this.on31401);
        // DataManager.cancel(PROTOCOL.E31072, this, this.on31072);
        // DataManager.cancel(PROTOCOL.E32010, this, this.on32010);
        // DataManager.cancel(PROTOCOL.E32011, this, this.on32011);
        // DataManager.cancel(PROTOCOL.E31200, this, this.on31200);
        // DataManager.cancel(PROTOCOL.E31201, this, this.on31201);
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E13003, this, this.on13003);
        DataManager.listen(PROTOCOL.E31060, this, this.on31060);
        DataManager.listen(PROTOCOL.E31061, this, this.on31061);
        DataManager.listen(PROTOCOL.E31062, this, this.on31062);
        DataManager.listen(PROTOCOL.E31300, this, this.on31300);
        DataManager.listen(PROTOCOL.E31400, this, this.on31400);
        DataManager.listen(PROTOCOL.E31401, this, this.on31401);
        // DataManager.listen(PROTOCOL.E31072, this, this.on31072);
        // DataManager.listen(PROTOCOL.E32010, this, this.on32010);
        // DataManager.listen(PROTOCOL.E32011, this, this.on32011);
        // DataManager.listen(PROTOCOL.E31200, this, this.on31200);
        // DataManager.listen(PROTOCOL.E31201, this, this.on31201);
    }

    //控制处理相关================================================
    public yyRechargeGiveBackIsOpen(): boolean {
        var data = this.yyRechargeGiveBackData();
        return data != null;
    }

    public yyRechargeGiveBackData(): S31061 {
        for (let i = 0; i < this.yyActivityDic.values.length; i++) {
            const element: S31061 = this.yyActivityDic.values[i];
            if (element.sys == YYActivityType.ACT_SYS_RECHARGE_ACC) {
                return element;
            }
        }
        return null;
    }

    public yyRankIsOpen(): boolean {
        var data = this.yyRankData();
        return data.length > 0;
    }

    public yyRankData(): S31061[] {
        var data = [];
        for (let i = 0; i < this.yyActivityDic.values.length; i++) {
            const element: S31061 = this.yyActivityDic.values[i];
            if (element.sys == YYActivityType.ACT_SYS_RANK) {
                data.push(element);
            }
        }
        return data;
    }

    public yyLibaoIsOpen(titleStr: string): boolean {
        var data = this.getYYLibaoData(titleStr);
        return data.length > 0 && !this.libaoIsBuy(2);
    }

    public getYYLibaoData(titleStr: string): S31061[] {
        var data = [];
        for (let i = 0; i < this.yyActivityDic.values.length; i++) {
            const element: S31061 = this.yyActivityDic.values[i];
            if (element.sys == YYActivityType.ACT_SYS_LIBAO) {
                var showJson = JSON.parse(element.content);
                if (showJson.title == titleStr) {
                    data.push(element);
                }
            }
        }
        return data;
    }

    public yyLoginDayRewardIsOpen(): boolean {
        var data = this.yyLoginDayRewardData();
        return data != null;
    }

    public yyLoginDayRewardData(): S31061 {
        for (let i = 0; i < this.yyActivityDic.values.length; i++) {
            const element: S31061 = this.yyActivityDic.values[i];
            if (element.sys == YYActivityType.ACT_SYS_LOGIN_DAY_REWARD) {
                // var showJson = JSON.parse(element.content);
                // if (showJson.title == "端午节") {
                //     return element;
                // }
                return element;
            }
        }
        return null;
    }

    // public getActiveData(activityNo: YYActivityType, subType: number = null): S31061 {
    //     for (let i = 0; i < this.yyActivityDic.values.length; i++) {
    //         const element: S31061 = this.yyActivityDic.values[i];
    //         if (element.sys == activityNo) {
    //             return element;
    //         }
    //     }
    //     return null;
    // }

    //协议数据相关=====================================================
    public giveBackRechargeNum: number = 0;
    public on13003(data: S13003): void {
        if (data.type == 3) {
            this.giveBackRechargeNum = data.amount;
        }
        this.event(SYYActivityEvent.YYACTIVITY_NUM_DATA_BACK);
    }

    //运营数据处理--------------------------
    public yyActivityList: S31060;//总体运营活动列表
    public yyActivityDic: Laya.Dictionary = new Laya.Dictionary;//活动列表的字典类型；
    //各种活动-----

    public on31060(data: S31060): void {
        this.yyActivityList = data;
        for (let i = 0; i < this.yyActivityList.item_1.length; i++) {
            const element = this.yyActivityList.item_1[i];
            this.protocol.send31061(element.id);
        }
        this.event(SYYActivityEvent.YYACTIVITY_OPEN_CHANGE);
    }


    public on31061(data: S31061): void {
        this.yyActivityDic.set(data.id, data);
        this.event(SYYActivityEvent.YYACTIVITY_OPEN_CHANGE);
    }

    public on31062(data: S31062): void {
        if (data.type == 1) {
            var newData = new S31060_1;
            newData.id = data.id;
            this.yyActivityList.item_1.push(newData);
            this.protocol.send31061(newData.id);
        } else if (data.type == 0) {
            for (let i = 0; i < this.yyActivityList.item_1.length; i++) {
                const element = this.yyActivityList.item_1[i];
                if (element.id == data.id) {
                    this.yyActivityList.item_1.splice(i, 1);
                    break;
                }
            }
            this.yyActivityDic.remove(data.id);
        }
        this.event(SYYActivityEvent.YYACTIVITY_OPEN_CHANGE);
    }

    //礼包活动数据
    public yyLibaoData: S31300;
    public on31300(data: S31300): void {
        this.yyLibaoData = data;
        this.event(SYYActivityEvent.YYACTIVITY_OPEN_CHANGE);
    }
    public libaoIsBuy(subType: number): boolean {
        for (let i = 0; i < this.yyLibaoData.item_1.length; i++) {
            const element = this.yyLibaoData.item_1[i];
            if (element.subtype == subType) {
                return element.State == 1;
            }
        }
        return false;
    }

    //礼包活动数据
    public yyLoginReward: S31400;
    public on31400(data: S31400): void {
        this.yyLoginReward = data;
        this.event(SYYActivityEvent.YY_LOGIN_DAY_REWARD_DATA);
    }
    public on31401(data: S31401): void {
        if (data.State == 1) {
            this.yyLoginReward.IsGet = 1;
            var haveData = false;
            for (let i = 0; i < this.yyLoginReward.item_1.length; i++) {
                const element = this.yyLoginReward.item_1[i];
                if(element.Day == data.Day){
                    haveData = true;
                }
            }
            if(!haveData){
                var newdata = new S31400_1;
                newdata.Day = data.Day;
                this.yyLoginReward.item_1.push(newdata);
            }
        }
        this.event(SYYActivityEvent.YY_LOGIN_DAY_REWARD_DATA);
    }

}

export enum SYYActivityEvent {
    YYACTIVITY_OPEN_CHANGE = "YYACTIVITY_OPEN_CHANGE",//运营活动开启状态改变
    YYACTIVITY_NUM_DATA_BACK = "YYACTIVITY_NUM_DATA_BACK",//获得了数值的数据
    YY_LOGIN_DAY_REWARD_DATA = "YY_LOGIN_DAY_REWARD_DATA",//节日签到数据
}


export enum YYActivityType {
    ACT_SYS_RANK = 1,//排行
    ACT_SYS_GUILD = 2,
    ACT_SYS_RECHARGE_ACC = 3,//充值累积活动
    ACT_SYS_SHOW = 5,//展示类活动
    ACT_SYS_GUESS = 7,//竞猜活动
    ACT_SYS_GRAB_ANSWER = 9,//世界答题
    ACT_SYS_BEAUTY_CONTEST = 10,
    ACT_SYS_OP_SHOP = 11,//限时抢购
    ACT_SYS_DEGREE = 12,//活跃度
    ACT_SYS_RECHARGE_ONE = 13,
    ACT_SYS_RECHARGE_ACC_DAY = 14,
    ACT_SYS_USE_GOODS_DAY = 15,//累计使用物品(以天为单位)
    ACT_SYS_CRAZY_SHOP = 16,//购买狂欢节
    ACT_SYS_LIBAO = 19,//礼包活动
    ACT_SYS_LOGIN_DAY_REWARD = 20,//节日签到
}