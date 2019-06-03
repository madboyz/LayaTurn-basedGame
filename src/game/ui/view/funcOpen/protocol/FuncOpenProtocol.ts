import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C13059, C13072 } from "../../../../../net/pt/pt_13";

export class FuncOpenProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 领取开启系统奖励
     * @param {number} 
     * @memberof PetProtocol
     */
    public send13072(sysCode:number): void {
        var msg:C13072 = new C13072();
        msg.SysCode = sysCode;
        this.send(msg);
    }


}