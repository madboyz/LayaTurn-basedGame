import { RolePackCache } from "../../view/bag/cache/RolePackCache";
import { SBagData } from "../../../../net/data/SBagData";
import { ItemData } from "./ItemData";
import { SRoleData } from "../../../../net/data/SRoleData";
import { KaiLingVo } from "../../../../db/sheet/vo/KaiLingVo";

export class KaiLingInfo {
    public Slot: number;//1~6
    public StrLv: number;//强化等级
    public StrExp: number;//当前强化经验
    private vo: KaiLingVo;
    private nextVo: KaiLingVo;
    constructor() {

    }

    /**
     * 初始化强化信息
     * @param {number} pos
     * @param {number} lv
     * @param {number} exp
     * @memberof StrengthInfo
     */
    public initInfo(pos: number, lv: number, exp: number): void {
        this.Slot = pos;
        this.StrLv = lv;
        this.StrExp = exp;
        this.vo = KaiLingVo.getByLv(this.StrLv);
        this.nextVo = KaiLingVo.getByLv(this.StrLv + 1);
    }

    /**
     * 是否已经达到最高等级
     * @readonly
     * @type {boolean}
     * @memberof StrengthInfo
     */
    public get max(): boolean {
        return this.nextVo ? false : true;
    }

    /**
     * 材料数组
     * @readonly
     * @type {Array<number>}
     * @memberof StrengthInfo
     */
    public get materials(): Array<number> {
        var arr: Array<any> = [];
        if (this.nextVo.strengthen_stone_count > 0 && this.nextVo.yuanbao > 0) {
            arr = [this.nextVo.strengthen_stone, this.nextVo.strengthen_stone_count, 1, this.nextVo.yuanbao];
        }
        else {
            arr = [this.nextVo.strengthen_stone, this.nextVo.strengthen_stone_count];
        }
        return arr;
    }

    /**
     * 读表计算属性加成
     */
    public addAttrNum(attrName: string, baseAttrNum: number, isNextLv: boolean = false): number {
        var tempVo = isNextLv ? this.nextVo : this.vo;
        if (!tempVo) {
            return 0;
        }
        var attrs = tempVo.base_attr_add[this.Slot - 1]
        for (let i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            if (attr[0] == attrName) {
                return Math.round((baseAttrNum + attr[1]) * (1 + attr[2]) - baseAttrNum);
            }
        }
        return 0;
    }

    /**
     * 需要装备等级
     * @returns {number}
     * @memberof StrengthInfo
     */
    public get needEquipLv(): number {
        return parseInt(this.nextVo.need_eq_lv);
    }

    /**
     * 是否可以强化
     * @readonly
     * @type {boolean}
     * @memberof StrengthInfo
     */
    public get canStrength(): boolean {
        var arr: Array<number> = this.materials;
        if (arr.length > 2) {
            if (this.propNum >= arr[1] && this.moneyNum >= arr[3]) {
                return true;
            }
        }
        else {
            if (this.propNum >= arr[1]) {
                return true;
            }
        }
        return false;
    }

    public get propNum(): number {
        return SBagData.instance.prop.getItemCountByGoodsNo(this.materials[0]);
    }

    public get moneyNum(): number {
        return SRoleData.instance.info.BindGameMoney;
    }

    public get needPropNum(): number {
        return this.materials[1];
    }

    public get needProp(): number {
        return this.materials[0];
    }

    public get needMoney(): number {
        return this.materials[3];
    }
}