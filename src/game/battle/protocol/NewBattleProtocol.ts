import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C20050, C20064, C20060, C20090, C20036, C20045, C20046, C20030, C20007, C20052, C20029, C20051 } from "../../../net/pt/pt_20";


export class NewBattleProtocol extends BaseProtocol {
    /**
     * 查询自己可操控的bo的技能可使用情况
     * @param boid 
     */
    public send20050(boid: number): void {
        var msg: C20050 = new C20050();
        msg.BoId = boid;
        this.send(msg);
    }
    /**
     * 查询战斗的开始时间（unix时间戳）
     */
    public send20064(): void {
        var msg: C20064 = new C20064();
        this.send(msg);
    }

    /**
     * 客户端通知服务端：客户端战斗结束
     */
    public send20060():void {
        var msg: C20060 = new C20060();
        this.send(msg);
    }
    /**
     * 客户端通知服务端：播放战报完毕 -
     */
    public send20090(): void {
        var msg: C20090 = new C20090();
        this.send(msg);
    }

    /**
     *  下达指令：请求依据按AI下指令
     * @param boid 
     */
    public send20036(boid): void {
        var msg: C20036 = new C20036();
        msg.ForBoId = boid;
        this.send(msg);
    }

    //自动战斗
    public send20045(): void {
        var msg: C20045 = new C20045();
        this.send(msg);
    }
    //取消自动战斗
    public send20046(): void {
        var msg: C20046 = new C20046();
        this.send(msg);
    }
    /**
     * 下达指令：使用技能 
     * @param boid 
     * @param skillId 
     * @param targetId 
     */
    public send20030(boid: number, skillId: number, targetId: number): void {
        var msg: C20030 = new C20030();
        msg.ForBoId = boid;
        msg.SkillId = skillId;
        msg.TargetBoId = targetId;
        this.send(msg);
    }
    /**
     * 空指令
     * @param boid 
     */
    public send20029(boid: number)
    {
        var msg: C20029 = new C20029();
        msg.ForBoId = boid;
        this.send(msg);
    }
    /**
     * 请求战斗
     */
    public send20007()
    {
        var msg: C20007 = new C20007();
        this.send(msg); 
    }
    /**
     * 检查是否有可以回归的战斗
     */
    public send20052()
    {
        var msg:C20052 = new C20052();
        this.send(msg);
    }

    public send20051(boid:number)
    {
        var msg:C20051 = new C20051()
        msg.TargetBoId = boid;
        this.send(msg);
    }
}