import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C13056, C13059 } from "../../../../../net/pt/pt_13";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class LoginRewardProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 申请激活一个宠物
     * @param {number} IsGet//操作状态（1领取，0查询）
     * @memberof PetProtocol
     */
    public send13059(IsGet:number): void {
        var msg:C13059 = new C13059();
        msg.No = ConstVo.get("PLYR_START_REWARD").val;
        msg.IsGet = IsGet;
        this.send(msg);
    }

    public send17001(id: number, state: number): void {
    }

    public send17003(id: number): void {
    }

}