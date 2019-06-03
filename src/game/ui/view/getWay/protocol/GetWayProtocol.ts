import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
import { C52001 } from '../../../../../net/pt/pt_52';
export class GetWayProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 购买物品
     * @param {number} id
     * @param {number} num
     * @memberof GetWayProtocol
     */
    public send52001(id:number,num:number):void
    {
        var msg:C52001 = new C52001();
        msg.No = id;
        msg.Count = num;
        this.send(msg);
    }
}