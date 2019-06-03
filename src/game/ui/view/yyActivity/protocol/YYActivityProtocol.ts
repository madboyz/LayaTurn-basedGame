import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C31070, C31200, C31201, C31060, C31061, C31300, C31400, C31401 } from "../../../../../net/pt/pt_31";
import { C32010, C32011 } from "../../../../../net/pt/pt_32";
import { C13003 } from "../../../../../net/pt/pt_13";

export class YYActivityProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 查询生效的运营活动列表
     */
    public send31060(): void {
        var msg: C31060 = new C31060();
        this.send(msg);
    }

    /**
     * 查询具体活动
     */
    public send31061(id: number): void {
        var msg: C31061 = new C31061();
        msg.id = id;
        this.send(msg);
    }

    /**
     * 查询活动累计充值额度
     */
    public send13003(): void {
        var msg: C13003 = new C13003();
        msg.type = 3;
        this.send(msg);
    }
    /**
     * 查询礼包活动状态
     */
    public send31300(): void {
        var msg: C31300 = new C31300();
        this.send(msg);
    }
    /**
     * 查询节日签到
     */
    public send31400(No: number): void {
        var msg: C31400 = new C31400();
        msg.No = No;
        this.send(msg);
    }
    /**
     * 领取节日签到奖励
     */
    public send31401(No: number, Day: number): void {
        var msg: C31401 = new C31401();
        msg.No = No;
        msg.Day = Day;
        this.send(msg);
    }


}