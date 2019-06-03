import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
import { C17009, C17000, C17001, C17019, C17003, C17018, C17015, C17040, C17041, C17033, C17036, C17048, C17049, C17050, C17051 } from '../../../../../net/pt/pt_17';
import { C32010 } from '../../../../../net/pt/pt_32';
import { CommonControl } from '../../../../common/control/CommonControl';
export class PetProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 申请激活一个宠物
     * @param {number} id
     * @memberof PetProtocol
     */
    public send32010(id: number): void {
        CommonControl.instance.send32010(id);
    }

    public send17001(id: number, state: number): void {
        var msg: C17001 = new C17001();
        msg.PartnerId = id;
        msg.State = state;
        this.send(msg);
    }

    public send17003(id: number): void {
        var msg: C17003 = new C17003();
        msg.PartnerId = id;
        this.send(msg);
    }

    /**
     * 为宠物使用物品
     * @param {number} id
     * @param {number} goodsId
     * @param {number} count
     * @memberof PetProtocol
     */
    public send17018(id: number, goodsId: number, count: number): void {
        var msg: C17018 = new C17018();
        msg.PartnerId = id;
        msg.GoodsId = goodsId;
        msg.Count = count;
        this.send(msg);
    }

    public send17019(id: number, index: number): void {
        var msg: C17019 = new C17019();
        msg.PartnerId = id;
        msg.Order = index;
        this.send(msg);
    }

    /**
     * 申请某个宠物得所有信息
     * @param {number} id
     * @memberof PetProtocol
     */
    public send17009(id: number): void {
        var msg: C17009 = new C17009();
        msg.PartnerId = id;
        this.send(msg);
    }

    /**
     * 一键修炼
     * @param {number} id
     * @param {number} num
     * @memberof PetProtocol
     */
    public send17015(id: number, num: number): void {
        var msg: C17015 = new C17015();
        msg.PartnerId = id;
        msg.Count = num;
        this.send(msg);
    }

    /**
     * 遗忘技能
     * @param {number} id
     * @param {number} skillId
     * @memberof PetProtocol
     */
    public send17036(id: number, skillId: number): void {
        var msg: C17036 = new C17036();
        msg.PartnerId = id;
        msg.SkillId = skillId;
        this.send(msg);
    }

    /**
     * 炼化
     * @param {number} id
     * @param {number} goodsId
     * @param {string} name
     * @memberof PetProtocol
     */
    public send17040(id: number, goodsId: number, name: string, count: number): void {
        var msg: C17040 = new C17040();
        msg.PartnerId = id;
        msg.GoodsNo = goodsId;
        msg.AttrName = name;
        this.send(msg);
    }

    /**
     * 宠物点化
     * @param PartnerId 
     */
    public send17048(PartnerId: number): void {
        var msg: C17048 = new C17048;
        msg.PartnerId = PartnerId;
        msg.Count = 1;
        this.send(msg);
    }

    /**
     * 宠物兽灵
     * @param PartnerId 
     */
    public send17049(PartnerId: number): void {
        var msg: C17049 = new C17049;
        msg.PartnerId = PartnerId;
        msg.Count = 1;
        this.send(msg);
    }

    /**
     * 宠物图鉴升级
     * @param PartnerId 
     */
    public send17050(PartnerId: number): void {
        var msg: C17050 = new C17050;
        msg.PartnerId = PartnerId;
        msg.Count = 1;
        this.send(msg);
    }


    /**
     * 宠物点化技能升级
     * @param PartnerId 
     */
    public send17051(PartnerId: number, SkillNo: number): void {
        var msg: C17051 = new C17051;
        msg.PartnerId = PartnerId;
        msg.SkillNo = SkillNo;
        this.send(msg);
    }

}