import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C17028 } from "../../../../../net/pt/pt_17";
import { C37019, C37034 } from "../../../../../net/pt/pt_37";
import { C15175, C15176 } from "../../../../../net/pt/pt_15";

export class FabaoProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 法宝淬炼
     * @param PartnerId 
     */
    public send15175(GoodsId: number): void {
        var msg: C15175 = new C15175;
        msg.GoodsId = GoodsId;
        msg.Count = 1;
        this.send(msg);
    }

    /**
     * 探宝
     * @param PartnerId 
     */
    public send15176(SeekId: number): void {
        var msg: C15176 = new C15176;
        msg.SeekId = SeekId;
        this.send(msg);
    }



}