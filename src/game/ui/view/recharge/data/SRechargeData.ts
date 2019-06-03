import { DataManager } from "../../../../../message/manager/DataManager";
import { S13095, S13094, S13098, S13098_1, S13128, S13128_1, S13129, S13130, S13131, S13130_1 } from "../../../../../net/pt/pt_13";
import { MsgManager } from "../../../manager/MsgManager";
import { RechargeProtocol } from "../protocol/RechargeProtocol";
import { GameUtils } from "../../../../utils/GameUtils";
import { Recharge_reward_cfgVo } from "../../../../../db/sheet/vo/Recharge_reward_cfgVo";
import { Rmb_shopVo } from "../../../../../db/sheet/vo/Rmb_shopVo";

export class SRechargeData extends Laya.EventDispatcher {
    private static _instance: SRechargeData;
    public protocol: RechargeProtocol;

    public static get instance(): SRechargeData {
        return SRechargeData._instance || (SRechargeData._instance = new SRechargeData());
    }
    constructor() {
        super();
        this.protocol = new RechargeProtocol;
    }


    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E13094, this, this.on13094);
        DataManager.cancel(PROTOCOL.E13095, this, this.on13095);
        DataManager.cancel(PROTOCOL.E13098, this, this.on13098);
        DataManager.cancel(PROTOCOL.E13128, this, this.on13128);
        DataManager.cancel(PROTOCOL.E13129, this, this.on13129);
        DataManager.cancel(PROTOCOL.E13130, this, this.on13130);
        DataManager.cancel(PROTOCOL.E13131, this, this.on13131);
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E13094, this, this.on13094);
        DataManager.listen(PROTOCOL.E13095, this, this.on13095);
        DataManager.listen(PROTOCOL.E13098, this, this.on13098);
        DataManager.listen(PROTOCOL.E13128, this, this.on13128);
        DataManager.listen(PROTOCOL.E13129, this, this.on13129);
        DataManager.listen(PROTOCOL.E13130, this, this.on13130);
        DataManager.listen(PROTOCOL.E13131, this, this.on13131);
    }

    //控制处理相关================================================
    public checkOpenRecharge(): void {
        //2019/3/1
        if (this.rechargeState && this.rechargeState.item_1.length > 0) {
           UIManager.instance.openUI(UIID.RECHARGE_PANEL);
        } else {
           UIManager.instance.openUI(UIID.FIRST_RECHARGE_PANEL);
        }
    }

    public checkHaveRecharge(product_id: number): boolean {
        if (!this.rechargeState) {
            return false;
        }
        for (let i = 0; i < this.rechargeState.item_1.length; i++) {
            var ele = this.rechargeState.item_1[i];
            if (product_id == ele.No) {
                return true
            }
        }
        return false;
    }

    public hadRecharge(): boolean {
        return this.rechargeState && this.rechargeState.item_1.length > 0
    }

    //收到数据相关================================================
    public waitingRecharge: boolean = false;

    public rechargeState: S13095;
    public on13095(data: S13095): void {
        this.rechargeState = data;
        if (this.waitingRecharge) {
            this.waitingRecharge = false;
            MsgManager.instance.showRollTipsMsg("充值成功");
        }
        this.event(SRechargeEvent.RECHARGE_STATE_CHANGE);
    }

    //月卡数据
    public yuekaData: S13098_1;

    //领取当天月卡
    public on13094(data: S13094): void {
        if (data.No == 1) {
            this.yuekaData.Rewarded = 1;
        }
        this.event(SRechargeEvent.REFRESH_YUEKA_DATA);
    }

    //月卡数据
    public on13098(data: S13098): void {
        for (let i = 0; i < data.item_1.length; i++) {
            var element = data.item_1[i];
            if (element.No == 1) {
                this.yuekaData = element;
            }
        }
        this.event(SRechargeEvent.REFRESH_YUEKA_DATA);
    }


    //投机计划细节
    public touzijihuaDetail: S13128;

    //投资计划数据
    public on13128(data: S13128): void {
        this.touzijihuaDetail = data;
        this.event(SRechargeEvent.REFRESH_YUEKA_DATA);
    }

    //投资计划数据
    public on13129(data: S13129): void {
        var haveData = false;
        for (let i = 0; i < this.touzijihuaDetail.item_1.length; i++) {
            var ele: S13128_1 = this.touzijihuaDetail.item_1[i];
            if (ele.Lv == data.Lv) {
                haveData = true;
                ele.State = 1;
                break;
            }
        }
        if (!haveData) {
            var newData = new S13128_1;
            newData.Lv = data.Lv;
            newData.State = 1;
            this.touzijihuaDetail.item_1.push(newData);
        }
        this.event(SRechargeEvent.REFRESH_YUEKA_DATA);
    }

    //有月卡
    public haveYueka(): boolean {
        return this.yuekaData && this.yuekaData.Bought == 1 && this.yuekaData.ExpiredTime > GameUtils.TimeStamp
    }

    public touzijihuaAllGet(): boolean {
        if (!this.touzijihuaDetail || this.touzijihuaDetail.Bought == 0) {
            return false;
        }
        var cfgList = Rmb_shopVo.get(2).extra;
        for (let i = 0; i < cfgList.length; i++) {
            var cfg = cfgList[i];
            var hadGet = this.touzijihuaLvGet(cfg[0]);
            if (!hadGet) {
                return false;
            }
        }
        return true;
    }

    public touzijihuaLvGet(lv: number): boolean {
        if (!this.touzijihuaDetail) {
            return false;
        }
        for (let i = 0; i < this.touzijihuaDetail.item_1.length; i++) {
            var data: S13128_1 = this.touzijihuaDetail.item_1[i];
            if (data.Lv == lv) {
                return data.State == 1;
            }
        }
        return false;
    }

    //====累计充值奖励====
    public rechargeReward: S13130

    public on13130(data: S13130): void {
        this.rechargeReward = data;
        this.event(SRechargeEvent.RECHARGE_REWARD_DATA);
    }

    public on13131(data: S13131): void {
        var changeData = false;
        for (let i = 0; i < this.rechargeReward.item_1.length; i++) {
            var ele = this.rechargeReward.item_1[i];
            if (ele.No == data.No) {
                ele.State = 1;
                changeData = true;
                break;
            }
        }
        if (!changeData) {
            var newData = new S13130_1;
            newData.No = data.No;
            newData.State = 1;
            this.rechargeReward.item_1.push(newData);
        }
        this.event(SRechargeEvent.RECHARGE_REWARD_DATA);
    }

    
    public rechargeRewardAllGet(): boolean {
        if (!this.rechargeReward) {
            return false;
        }
        var cfgList = Recharge_reward_cfgVo.getAll();
        for (let i = 0; i < cfgList.length; i++) {
            var cfg = cfgList[i];
            var hadGet = this.rechargeRewardGet(cfg[0]);
            if (!hadGet) {
                return false;
            }
        }
        return true;
    }

    public rechargeRewardGet(No: number): boolean {
        if (!this.rechargeReward) {
            return false;
        }
        for (let i = 0; i < this.rechargeReward.item_1.length; i++) {
            var data: S13130_1 = this.rechargeReward.item_1[i];
            if (data.No == No) {
                return data.State == 1;
            }
        }
        return false;
    }

}


export enum SRechargeEvent {
    RECHARGE_STATE_CHANGE = "RECHARGE_STATE_CHANGE",
    REFRESH_YUEKA_DATA = "REFRESH_YUEKA_DATA",
    RECHARGE_REWARD_DATA = "RECHARGE_REWARD_DATA",
}