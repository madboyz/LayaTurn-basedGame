import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C31070, C31200, C31201 } from "../../../../../net/pt/pt_31";
import { C32010, C32011 } from "../../../../../net/pt/pt_32";

export class OpenServiceActivityProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 查询生效的节日活动列表
     */
    public send31070(): void {
        var msg: C31070 = new C31070();
        this.send(msg);
    }

    /**
     * 进行兑换
     */
    public send32010(id: number): void {
        var msg: C32010 = new C32010();
        msg.NpcId = 0;
        msg.No = id;
        this.send(msg);
    }
    /**
     * 查询所有已经兑换的次数
     */
    public send32011(): void {
        var msg: C32011 = new C32011();
        this.send(msg);
    }
    /**
     * 查询消耗奖励领取列表
     */
    public send31200(): void {
        var msg: C31200 = new C31200();
        this.send(msg);
    }
    /**
     * 领取消耗奖励领取列表
     */
    public send31201(No: number): void {
        var msg: C31201 = new C31201();
        msg.No = No;
        this.send(msg);
    }


}