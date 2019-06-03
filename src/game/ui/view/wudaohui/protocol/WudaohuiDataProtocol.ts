import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C13051, C13050 } from "../../../../../net/pt/pt_13";
import { C27001, C27002, C27000 } from "../../../../../net/pt/pt_27";

export class WudaohuiDataProtocol extends BaseProtocol {
    constructor() {
        super();
    }
    
    /**
     * 参加武道会匹配
     */
    public send27000(): void {
        var msg: C27000 = new C27000();
        this.send(msg);
    }
    
    /**
     * 参加武道会匹配
     */
    public send27001(): void {
        var msg: C27001 = new C27001();
        this.send(msg);
    }
    
    /**
     * 取消武道会匹配
     */
    public send27002(): void {
        var msg: C27002 = new C27002();
        this.send(msg);
    }

}