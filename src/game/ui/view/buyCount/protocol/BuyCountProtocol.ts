import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C15022 } from "../../../../../net/pt/pt_15";

export class BuyCountProtocol extends BaseProtocol  {
    constructor() {
        super();
    }


    public send15022(local:number,count:number):void
    {
        var msg:C15022 = new C15022();
        msg.Location =local;
        msg.ExtendNum = count;
        this.send(msg);
    }
}