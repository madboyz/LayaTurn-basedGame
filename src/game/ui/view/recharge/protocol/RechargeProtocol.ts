import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C13056, C13059, C13094, C13098, C13128, C13129, C13130, C13131 } from "../../../../../net/pt/pt_13";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class RechargeProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 领取月卡奖励
     */
    public send13094(): void {
        var msg: C13094 = new C13094();
        msg.No = 1;
        this.send(msg);
    }

    /**
     * 月卡数据
     */
    public send13098(): void {
        var msg: C13098 = new C13098();
        this.send(msg);
    }

    /**
     * 投资计划
     */
    public send13128(): void {
        var msg: C13128 = new C13128();
        this.send(msg);
    }

    /**
     * 领取投资计划
     */
    public send13129(Lv: number): void {
        var msg: C13129 = new C13129();
        msg.Lv = Lv;
        this.send(msg);
    }

    /**
     * 累计充值奖励
     */
    public send13130(): void {
        var msg: C13130 = new C13130();
        this.send(msg);
    }

    /**
     * 领取累计充值奖励
     */
    public send13131(No: number): void {
        var msg: C13131 = new C13131();
        msg.No = No;
        this.send(msg);
    }

}