import { BaseProtocol } from "../../../../../../net/protocol/BaseProtocol";
import { C17041 } from "../../../../../../net/pt/pt_17";
export class PetLearnSkillProtocol extends BaseProtocol{
    constructor() {
        super();
    }

    /**
     * 学习节能书
     * @param {number} id
     * @param {number} goodsNo
     * @memberof PetProtocol
     */
    public send17041(id:number,goodsNo:number):void
    {
        var msg:C17041 = new C17041();
        msg.PartnerId = id;
        msg.GoodsId = goodsNo;
        this.send(msg);
    }
}