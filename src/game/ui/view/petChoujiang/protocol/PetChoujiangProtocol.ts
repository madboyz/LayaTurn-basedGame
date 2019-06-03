import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C31100, C31101 } from "../../../../../net/pt/pt_31";

export class PetChoujiangProtocol extends BaseProtocol{
    constructor() {
        super();
    }

    public send31100(type:number): void {
        var msg:C31100 = new C31100();
        msg.act_id = type;
        this.send(msg);
    }

    public send31101(type:number): void {
        var msg:C31101 = new C31101();
        msg.act_id = type;
        msg.cost_type = 2;
        this.send(msg);
    }
}