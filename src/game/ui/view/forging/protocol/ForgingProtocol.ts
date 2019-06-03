import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
import { C15071, C15007 } from '../../../../../net/pt/pt_15';
export class ForgingProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 申请强化
     * @param {number} pos 装备栏格子编号
     * @param {number} count 强化次数0//表示一键升级
     * @param {number} type 是否使用绑定的强化石0//不使用1//使用2混合使用
     * @memberof ForgingProtocol
     */
    public send15071(sys:number,pos:number,count:number,type:number):void
    {
        var msg:C15071 = new C15071();
        msg.Slot = pos;
        msg.Count = count;
        msg.UseBindStone = type;
        msg.Sys = sys;
        this.send(msg);
    }

    /**
     * 申请宝石镶嵌
     * @param {number} pos
     * @memberof ForgingProtocol
     */
    public send15007(pos:number):void
    {
        var msg:C15007 = new C15007();
        msg.Slot = pos;
        this.send(msg);
    }
}