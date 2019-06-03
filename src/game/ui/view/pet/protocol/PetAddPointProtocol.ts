import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C17035, C17034, C17034_1 } from "../../../../../net/pt/pt_17";

export class PetAddPointProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    public send17034(arr:Array<any>,id:number):void
    {
        var msg:C17034 = new C17034;
        var poins:Array<C17034_1> = [];
        var point:C17034_1;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            point = new C17034_1();
            point.TalentType = element.TalentType;
            point.AddPoints = element.AddPoints;
            poins.push(point);
        }
        msg.PartnerId = id;
        msg.item_1 = poins;
        this.send(msg);
    }

    public send17035(id:number):void
    {
        var msg:C17035 = new C17035();
        msg.PartnerId = id;
        this.send(msg);
    }
}