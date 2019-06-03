import { DataManager } from "../../../../../message/manager/DataManager";
import { S13051 } from "../../../../../net/pt/pt_13";
import { SignInProtocol } from "../protocol/SignInProtocol";
import { GameUtils } from "../../../../utils/GameUtils";

export class SSignInData extends Laya.EventDispatcher {
    private static _instance: SSignInData;
    public protocol: SignInProtocol;

    public static get instance(): SSignInData {
        return SSignInData._instance || (SSignInData._instance = new SSignInData());
    }
    constructor() {
        super();
        this.protocol = new SignInProtocol;
    }


    public unRegisterEvent() {
        DataManager.cancel(PROTOCOL.E13050, this, this.on13050);
        DataManager.cancel(PROTOCOL.E13051, this, this.on13051);
    }

    public registerEvent() {
        DataManager.listen(PROTOCOL.E13050, this, this.on13050);
        DataManager.listen(PROTOCOL.E13051, this, this.on13051);
    }

    //控制处理相关================================================

    //判断这个月有多少天
    public thisMonthDays(): number {
        var nowData = new Date(GameUtils.TimeStamp * 1000);
        var year: number = nowData.getFullYear();
        var month: number = nowData.getMonth() + 1;
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        } else if (month == 2) {
            var isLeapYear: boolean = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
            if (isLeapYear) {
                return 29;
            } else {
                return 28;
            }
        } else {
            return 31;
        }
    }


    //收到数据相关================================================
    public monthSignInList: any[];
    public on13051(data: S13051): void {
        this.monthSignInList = [];
        var thisDays = this.thisMonthDays();
        var countInfo = data.SignInfo;
        for (let i = 1; i <= thisDays; i++) {
            var info: any = {};
            info.sign = (countInfo % 2 == 1);
            countInfo = Math.floor(countInfo / 2);
            this.monthSignInList.push(info);
        }
    }

    public on13050(): void {
        var thisDay = (new Date(GameUtils.TimeStamp * 1000).getDate());
        this.monthSignInList[thisDay - 1].sign = true;
        this.event(SSignInEvent.RECHARGE_STATE_CHANGE);
    }

}


export enum SSignInEvent {
    RECHARGE_STATE_CHANGE = "RECHARGE_STATE_CHANGE",
}