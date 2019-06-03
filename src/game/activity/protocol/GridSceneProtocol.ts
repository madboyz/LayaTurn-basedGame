import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C57201, C57203, C57210 } from "../../../net/pt/pt_57";

export class GridSceneProtocol extends BaseProtocol {
    /**
     * 摇骰子
     */
    public send57201()
    {
        var msg:C57201 = new C57201();
        this.send(msg);
    }
    /**
     * 副本答题 回答
     * @param No 
     * @param optionNo 
     */
    public send57203(optionNo:number,No:number)
    {
        var msg:C57203 = new C57203();
        msg.No = No;
        msg.OptionNo = optionNo;
        this.send(msg);
    }
    /**
     * 通知服务端可以开始事件
     */
    public send57210()
    {
        var msg:C57210 = new C57210();
        this.send(msg);
    }
}