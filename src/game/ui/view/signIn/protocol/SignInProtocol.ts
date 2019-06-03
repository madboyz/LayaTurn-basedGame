import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C13051, C13050 } from "../../../../../net/pt/pt_13";

export class SignInProtocol extends BaseProtocol {
    constructor() {
        super();
    }
    
    /**
     * 请求每月签到相关信息
     */
    public send13051(): void {
        var msg: C13051 = new C13051();
        this.send(msg);
    }
    
    /**
     * 进行签到
     */
    public send13050(): void {
        var msg: C13050 = new C13050();
        this.send(msg);
    }

}