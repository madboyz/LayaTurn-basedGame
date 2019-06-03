import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C21002, C21003, C21001 } from "../../../net/pt/pt_21";
import { C13119, C13122, C13123, C13123_1 } from "../../../net/pt/pt_13";
import { C15171, C15177, C15179, C15178, C15178_1 } from "../../../net/pt/pt_15";

export class SkillProtocol extends BaseProtocol {

    public send21002(skillId: number): void {
        var msg: C21002 = new C21002();
        msg.SkillId = skillId;
        this.send(msg);
    }

    public send21003(): void {
        var msg: C21003 = new C21003();
        this.send(msg);
    }

    //查询飞升技能列表
    public send13119(): void {
        var msg: C13119 = new C13119();
        this.send(msg);
    }
    

    //重置飞升技能
    public send13122(): void {
        var msg: C13122 = new C13122();
        this.send(msg);
    }

    //强化飞升技能
    public send13123(No: number): void {
        var item_1: C13123_1[] = [];
        var item = new C13123_1;
        item.No = No;
        item_1.push(item);
        var msg: C13123 = new C13123();
        msg.item_1 = item_1;
        this.send(msg);
    }

    //强化特技装备
    public send15177(GoodsId: number): void {
        var msg: C15177 = new C15177();
        msg.GoodsId = GoodsId;
        this.send(msg);
    }

    //查询特技强化技能
    public send15179(): void {
        var msg: C15179 = new C15179();
        this.send(msg);
    }

    //装备特技强化技能
    public send15178(item_1:C15178_1[]): void {
        var msg: C15178 = new C15178();
        msg.item_1 = item_1;
        this.send(msg);
    }
}