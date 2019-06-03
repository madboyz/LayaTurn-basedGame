import { StuffCopyProtocol } from "../../copy/StuffCopy/protocol/StuffCopyProtocol";
import { OpenServiceActivityProtocol } from "../protocol/OpenServiceActivityProtocol";
import { DataManager } from "../../../../../message/manager/DataManager";
import { S31070, S31072, S31070_1, S31200, S31201, S31200_1 } from "../../../../../net/pt/pt_31";
import { GameUtils } from "../../../../utils/GameUtils";
import { S32011, S32011_1, S32010 } from "../../../../../net/pt/pt_32";

export class SOpenServiceActivityData extends Laya.EventDispatcher {
    private static _instance: SOpenServiceActivityData;
    public protocol: OpenServiceActivityProtocol;
    public copyProtocol: StuffCopyProtocol;

    public static get instance(): SOpenServiceActivityData {
        return SOpenServiceActivityData._instance || (SOpenServiceActivityData._instance = new SOpenServiceActivityData());
    }
    constructor() {
        super();
        this.copyProtocol = new StuffCopyProtocol;
        this.protocol = new OpenServiceActivityProtocol;
    }


    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E31070, this, this.on31070);
        DataManager.cancel(PROTOCOL.E31072, this, this.on31072);
        DataManager.cancel(PROTOCOL.E32010, this, this.on32010);
        DataManager.cancel(PROTOCOL.E32011, this, this.on32011);
        DataManager.cancel(PROTOCOL.E31200, this, this.on31200);
        DataManager.cancel(PROTOCOL.E31201, this, this.on31201);
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E31070, this, this.on31070);
        DataManager.listen(PROTOCOL.E31072, this, this.on31072);
        DataManager.listen(PROTOCOL.E32010, this, this.on32010);
        DataManager.listen(PROTOCOL.E32011, this, this.on32011);
        DataManager.listen(PROTOCOL.E31200, this, this.on31200);
        DataManager.listen(PROTOCOL.E31201, this, this.on31201);
    }

    //控制处理相关================================================
    public godPetIsOpen(): boolean {
        var data = this.getActiveData(OSActivityType.GOD_PET);
        if (!data || (data.end_time - GameUtils.TimeStamp) < 0) {
            return false
        }
        return true;
    }
    public OSChangeIsOpen(): boolean {
        var data = this.getActiveData(OSActivityType.OS_CHANGE);
        if (!data || (data.end_time - GameUtils.TimeStamp) < 0) {
            return false
        }
        return true;
    }
    public OSCostIsOpen(): boolean {
        var data = this.getActiveData(OSActivityType.OS_COST);
        if (!data || (data.end_time - GameUtils.TimeStamp) < 0) {
            return false
        }
        return true;
    }


    public getActiveData(activityNo: OSActivityType): S31070_1 {
        if (!this.activityList) {
            return null;
        }
        for (let i = 0; i < this.activityList.item_1.length; i++) {
            var ele = this.activityList.item_1[i];
            if (ele.no == activityNo) {
                return ele;
            }
        }
        return null;
    }

    public getOSChangeData(changeNo: number): S32011_1 {
        if (!this.allChangeTime) {
            return null;
        }
        for (let i = 0; i < this.allChangeTime.item_1.length; i++) {
            var ele = this.allChangeTime.item_1[i];
            if (ele.No == changeNo) {
                return ele;
            }
        }
        return null;
    }

    //协议数据相关=====================================================
    public activityList: S31070;
    private on31070(data: S31070) {
        this.activityList = data;
        this.event(SOpenServiceActivityEvent.ACTIVITY_DATA_REFRESH);
    }

    private on31072(data: S31072) {
        if (data.type == 0) {
            for (let i = 0; i < this.activityList.item_1.length; i++) {
                var ele = this.activityList.item_1[i];
                if (ele.id == data.id) {
                    this.activityList.item_1.splice(i, 1);
                }
            }
        } else if (data.type == 1) {
            var newAct: S31070_1 = new S31070_1;
            newAct.id = data.id;
            newAct.no = data.no;
            newAct.start_time = data.start_time;
            newAct.end_time = data.end_time;
            this.activityList.item_1.push(newAct);
        }
        this.event(SOpenServiceActivityEvent.ACTIVITY_DATA_REFRESH);
    }

    public allChangeTime: S32011
    public on32011(data: S32011): void {
        this.allChangeTime = data;
        this.event(SOpenServiceActivityEvent.ALL_CHANGE_TIME_REFRESH);
    }

    public on32010(data: S32010): void {
        if (data.RetCode == 1 && this.allChangeTime) {
            var haveData = false;
            for (let i = 0; i < this.allChangeTime.item_1.length; i++) {
                var ele = this.allChangeTime.item_1[i];
                if (ele.No == data.No) {
                    haveData = true;
                    ele.Num = data.Num;
                    break;
                }
            }
            if (!haveData) {
                var newData = new S32011_1;
                newData.No = data.No;
                newData.Num = data.Num;
                this.allChangeTime.item_1.push(newData);
            }
            this.event(SOpenServiceActivityEvent.ALL_CHANGE_TIME_REFRESH);
        }
    }

    //消耗活动数据相关=====================================================
    public costActivityData: S31200;
    public on31200(data: S31200): void {
        this.costActivityData = data;
        this.event(SOpenServiceActivityEvent.COST_ACTIVITY_DATA_REFRESH);
    }
    public on31201(data: S31201): void {
        for (let i = 0; i < this.costActivityData.item_1.length; i++) {
            var element = this.costActivityData.item_1[i];
            if(element.No == data.No){
                element.State = data.State;
                break;
            }
        }
        this.event(SOpenServiceActivityEvent.COST_ACTIVITY_DATA_REFRESH);
    }
    public getCostDataById(No:number):S31200_1{
        if(!this.costActivityData){
            return null
        }
        for (let i = 0; i < this.costActivityData.item_1.length; i++) {
            const element = this.costActivityData.item_1[i];
            if(element.No == No){
                return element;
            }
        }
        return null;
    }

}

export enum SOpenServiceActivityEvent {
    ACTIVITY_DATA_REFRESH = "ACTIVITY_DATA_REFRESH",
    ALL_CHANGE_TIME_REFRESH = "ALL_CHANGE_TIME_REFRESH",
    COST_ACTIVITY_DATA_REFRESH = "COST_ACTIVITY_DATA_REFRESH",
}


export enum OSActivityType {
    GOD_PET = 1,
    OS_COST = 2,
    OS_CHANGE = 3,
}