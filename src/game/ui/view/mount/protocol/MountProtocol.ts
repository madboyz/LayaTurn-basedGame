import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
import { C60002, C60003, C60004, C60005, C60006, C60007, C60008 } from '../../../../../net/pt/pt_60';
export class MountProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 升星
     * @memberof MountProtocol
     */
    public send60002(): void {
        var msg: C60002 = new C60002();
        this.send(msg);
    }

    /**
     * 飞升
     * @memberof MountProtocol
     */
    public send60003(): void {
        var msg: C60003 = new C60003();
        this.send(msg);
    }

    /**
     * 喂养
     * @param {number} num
     * @memberof MountProtocol
     */
    public send60004(num: number): void {
        var msg: C60004 = new C60004();
        msg.Count = num;
        this.send(msg);
    }

    /**
     * 幻化
     * @param {number} no
     * @memberof MountProtocol
     */
    public send60005(no: number): void {
        var msg: C60005 = new C60005();
        msg.No = no;
        this.send(msg);
    }

    /**
     * 灵境升级
     */
    public send60006(): void {
        var msg: C60006 = new C60006();
        msg.Count = 1;
        this.send(msg);
    }

    /**
     * 坐骑变异
     */
    public send60007(): void {
        var msg: C60007 = new C60007();
        msg.Count = 1;
        this.send(msg);
    }

    /**
     * 坐骑技能进阶
     */
    public send60008(SkillNo: number): void {
        var msg: C60008 = new C60008();
        msg.SkillNo = SkillNo;
        this.send(msg);
    }
}