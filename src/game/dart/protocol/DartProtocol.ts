import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C42001, C42004, C42005, C42006, C42008, C42009, C42010, C42011, C42003, C42007 } from "../../../net/pt/pt_42";

export class DartProtocol extends BaseProtocol {

    /**
     * 查询护送界面信息
     */
    public send42001()
    {
        var msg:C42001 = new C42001();
        this.send(msg);
    }
    /**
     * 查询运镖记录
     */
    public send42003()
    {
        var msg:C42003 = new C42003();
        this.send(msg);
    }

    /**
     * 查询单辆车信息
     */
    public send42004(roleId:number)
    {
        var msg:C42004 = new C42004();
        msg.role_id = roleId;
        this.send(msg);
    }

    /**
     * 请求个人运镖信息
     */
    public send42005()
    {
        var msg:C42005 = new C42005();
        this.send(msg);
    }

    /**
     * 开始押镖
     */
    public send42006()
    {
        var msg:C42006 = new C42006();
        this.send(msg);
    }
    /**
     * 领取奖励
     */
    public send42007()
    {
        var msg:C42007 = new C42007()
        this.send(msg);
    }

    /**
     * 用物品进阶镖车
     */
    public send42008()
    {
        var msg:C42008 = new C42008();
        this.send(msg);
    }

    /**
     * 直接召唤进阶到最大星
     */
    public send42009()
    {
        var msg:C42009 = new C42009();
        this.send(msg);
    }

    /**
     * 劫镖
     */
    public send42010(roleId:number)
    {
        var msg:C42010 = new C42010();
        msg.role_id = roleId;
        this.send(msg);
    }
    /**
     * 刷新镖车 返回42001
     */
    public send42011()
    {
        var msg:C42011 = new C42011();
        this.send(msg);
    }
}