import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C13055, C13056, C13057, C13058, C13053, C13054 } from "../../../../../net/pt/pt_13";

export class ActiveRewardProtocol extends BaseProtocol {

    
    /**
     * 查询在线奖励
     */
    public send13053()
    {
        var msg:C13053 = new C13053();
        this.send(msg);
    }
    /**
     * 当前领取奖励
     * @param no 
     */
    public send13054(no:number)
    {
        var msg:C13054 = new C13054();
        msg.CurNo = no;
        this.send(msg);
    }

    /**
     * 查询当前累计登录
     */
    public send13055():void {
        var msg: C13055 = new C13055();
        this.send(msg);
    }
    /**
     * 领取累计奖励
     * @param curNo 
     */
    public send13056(curNo:number):void
    {
        var msg: C13056 = new C13056();
        msg.CurNo = curNo;
        this.send(msg);
    }
    /**
     * 查询等级奖励
     */
    public send13057():void
    {
        var msg: C13057 = new C13057();
        this.send(msg);
    }
    /**
     * 领取等级奖励
     * @param curNo 
     */
    public send13058(curNo:number):void
    {
        var msg: C13058 = new C13058();
        msg.No = curNo;
        this.send(msg);
    }
}