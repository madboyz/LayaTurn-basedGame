import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C17028 } from "../../../../../net/pt/pt_17";
import { C37019, C37034 } from "../../../../../net/pt/pt_37";

export class OtherPlayerProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 查询宠物详细信息
     * @param PartnerId 
     */
    public send17028(PartnerId: number): void {
        var msg: C17028 = new C17028;
        msg.PartnerId = PartnerId;
        this.send(msg);
    }

    /**
     * 查询伙伴详细信息
     * @param PartnerId 
     */
    public send37034(Id: number): void {
        var msg: C37034 = new C37034;
        msg.Id = Id;
        this.send(msg);
    }



}