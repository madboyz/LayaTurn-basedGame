/**
 * 时间类工具
 * @export
 * @class TimerUtil
 */
export class TimerUtil {
    private static Second: number = 60;
    private static Minute: number = 60;
    private static Hour: number = 24;
    public static oneDayTime: number = 86400;
    constructor() {

    }

    /**
     * 是否在时间内
     * @static
     * @param {number} time 
     * @returns {boolean} 
     * @memberof TimerUtil
     */
    public static insideTime(time: number): boolean {
        var curTime: number = Math.floor(Date.now() / 1000);
        if (curTime >= time) {
            return false;
        }
        return true;
    }

    /**
     * 剩余时间
     * @static
     * @param {number} time 
     * @returns {number} 
     * @memberof TimerUtil
     */
    public static getLeftTime(time: number): number {
        var newTime: number = Math.floor(Date.now() / 1000);
        var leftTime: number = time - newTime;
        return leftTime;
    }

    public static getDate(leftTime: number): number {
        return Math.floor(leftTime / (this.Second * this.Minute * this.Hour));
    }

    public static getHours(leftTime: number): number {
        return Math.floor(leftTime % (this.Second * this.Minute * this.Hour) / (this.Minute * this.Second));
    }

    public static getMinutes(leftTime: number): number {
        return Math.floor(leftTime % (this.Second * this.Minute) / this.Second);
    }

    public static getSeconds(leftTime: number): number {
        return leftTime % this.Second;
    }

    public static fullhh(leftTime: number): string {
        var hh = Math.floor(leftTime / (this.Minute * this.Second));
        return (hh < 10 ? "0" : "") + hh;
    }

    public static dd(leftTime: number): string {
        return (this.getDate(leftTime) < 10 ? "0" : "") + this.getDate(leftTime);
    }

    public static hh(leftTime: number): string {
        return (this.getHours(leftTime) < 10 ? "0" : "") + this.getHours(leftTime);
    }

    public static mm(leftTime: number): string {
        return (this.getMinutes(leftTime) < 10 ? "0" : "") + this.getMinutes(leftTime);
    }

    public static ss(leftTime: number): string {
        return (this.getSeconds(leftTime) < 10 ? "0" : "") + this.getSeconds(leftTime);
    }

    /**
     * 获得年月日
     * @param date 
     */
    public static getStrDate(date: Date): string {
        var str: string = date.getFullYear() + "/" + this.getZeroStr(date.getMonth() + 1) + "/" + this.getZeroStr(date.getDate());
        return str;
    }

    /**
     * 获得年月日2
     * @param date
     */
    public static getStrDate2(date: Date): string {
        var str: string = date.getFullYear() + "年" + this.getZeroStr(date.getMonth() + 1) + "月" + this.getZeroStr(date.getDate())+ "日";
        return str;
    }

    /**
     * 把时间日期解析成字符串类型(格式：年-月-日 hh:mm:ss)
     */
    public static getStrTimeByDate(date: Date): string {
        var str: string = date.getFullYear() + "/" + this.getZeroStr(date.getMonth() + 1) + "/" + this.getZeroStr(date.getDate()) + " " + this.getZeroStr(date.getHours()) + ":" + this.getZeroStr(date.getMinutes()) + ":" + this.getZeroStr(date.getSeconds());
        return str;
    }

    /**
     * 把时间日期解析成字符串类型(格式：月-日 hh:mm:ss)
     */
    public static getStrTimeByDate2(date: Date): string {
        var str: string = this.getZeroStr(date.getMonth() + 1) + "-" + this.getZeroStr(date.getDate()) + " " + this.getZeroStr(date.getHours()) + ":" + this.getZeroStr(date.getMinutes()) + ":" + this.getZeroStr(date.getSeconds());
        return str;
    }

    private static getZeroStr(value: number): string {
        var str: string;
        if (value < 10) {
            return "0" + value;
        }
        return value + "";
    }

    /**
     * 获得离线时间
     * @static
     * @param {number} value 
     * @returns {string} 
     * @memberof TimerUtil
     */
    public static getOffLineTime(value: number): string {
        var str: string;
        if (value > this.oneDayTime) {
            str = Math.floor(value / this.oneDayTime) + "天前";
        }
        else if (value >= 3600 && value < this.oneDayTime) {
            str = Math.floor(value / 3600) + "小时前";
        }
        else if (value >= 60 && value < 3600) {
            str = Math.floor(value / 60) + "分钟前";
        }
        else if (value < 60) {
            str = "1分钟前";
        }
        return str;
    }

    public static getLeftTimeStr(value: number): string {
        var str: string;
        if (value >= 3600) {
            str = Math.floor(value / 3600) + "小时";
            if (value % 3600 > 0 && value % 3600 < 60) {
                str += Math.floor((value % 3600)) + "分";
            }
            if (value % 3600 >= 60) {
                str += Math.floor((value % 3600) / 60) + "分";
                if ((value % 3600) % 60 > 0) {
                    str += (value % 3600) % 60 + "秒";
                }
            }
        }
        else if (value >= 60 && value < 3600) {
            str = Math.floor(value / 60) + "分";
            if (value % 60 > 0) {
                str += value % 60 + "秒";
            }
        }
        else if (value < 60) {
            str = value + "秒";
        }
        return str;
    }

    public static getLeftTimeStr2(value: number): string {
        var addStr = "";
        var count = 0;
        var dd = this.getDate(value);
        addStr += (dd >= 10 ? this.getDate(value) + "天" : (dd == 0 ? "" : "0" + dd + "天"));
        (dd > 0) && (count++);
        var hh = this.getHours(value);
        addStr += (hh >= 10 ? this.getHours(value) + "时" : (hh == 0 ? "" : "0" + hh + "时"));
        (hh > 0) && (count++);
        if (count >= 2) {
            return addStr
        }
        var mm = this.getMinutes(value);
        addStr += (mm >= 10 ? this.getDate(value) + "分" : (mm == 0 ? "" : "0" + mm + "分"));
        (mm > 0) && (count++);
        if (count >= 2) {
            return addStr
        }
        var ss = this.getDate(value);
        addStr += (ss >= 10 ? this.getDate(value) + "秒" : (ss == 0 ? "" : "0" + ss + "秒"));
        (ss > 0) && (count++);
        return addStr;
    }

}