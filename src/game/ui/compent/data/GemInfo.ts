import { PropertyVo } from "../../../../db/sheet/vo/PropertyVo";
import { Attribute } from "../../../property/RoleProperty";
import { GemLevelVo } from "../../../../db/sheet/vo/GemLevelVo";
import { SBagData } from "../../../../net/data/SBagData";

export class GemInfo {
    public Slot: number;//1~6
    public StrLv: number;//宝石等级
    private vo: GemLevelVo;
    private nextVo: GemLevelVo;
    private stepVo: GemLevelVo;
    private levels: Array<object> = [{ slot: 1, lv: 0 }, { slot: 2, lv: 0 }, { slot: 3, lv: 0 }, { slot: 4, lv: 0 }];
    public nameList: Array<any> = [];
    public propList: Array<Attribute> = [];
    constructor() {

    }

    public initInfo(pos: number, lv: number): void {
        this.Slot = pos;
        this.StrLv = lv;
        this.stepVo = GemLevelVo.getByLv(pos, 1);
        this.vo = GemLevelVo.getByLv(pos, this.StrLv);
        this.nextVo = GemLevelVo.getByLv(pos, this.StrLv + 1);
        this.splitLevel();
        this.initProp();
        this.nameList = [];
        for (let i = 1; i <= 4; i++) {
            var slotInfo = this.getlvByPos(i);
            var slotLv:number = slotInfo && slotInfo["lv"];
            var gemLv = slotLv != null? (slotLv*4 + (-4+i)):1;
            gemLv = gemLv >=1 ? gemLv:1;
            this.nameList.push(GemLevelVo.getByLv(pos, gemLv).name);
            // const element = array[i];
        }
        // this.name = GemLevelVo.getByLv(pos,this.StrLv >= 1?this.StrLv:1).name;
    }

    /**
     * 分配部位得宝石等级
     * @private
     * @memberof GemInfo
     */
    private splitLevel(): void {
        var len: number;
        var cow: number;
        this.levels = [{ slot: 1, lv: 0 }, { slot: 2, lv: 0 }, { slot: 3, lv: 0 }, { slot: 4, lv: 0 }]
        if (this.StrLv > 4) {
            if (this.StrLv % 4 == 0) {
                cow = this.StrLv / 4;
                this.levels = [{ slot: 1, lv: cow }, { slot: 2, lv: cow }, { slot: 3, lv: cow }, { slot: 4, lv: cow }];
            }
            else {
                len = this.StrLv % 4;
                cow = (this.StrLv - len) / 4;
                this.levels = [{ slot: 1, lv: cow }, { slot: 2, lv: cow }, { slot: 3, lv: cow }, { slot: 4, lv: cow }];
                for (let id = 1; id <= len; id++) {
                    (this.levels[id - 1]["lv"]) += 1;
                }
            }
        }
        else {
            len = this.StrLv;
            for (let index = 1; index <= len; index++) {
                (this.levels[index - 1]["lv"]) += 1;
            }
        }
        this.levels.sort(this.sortLevel);
    }

    private initProp(): void {
        var p: PropertyVo;
        this.propList = [];
        var arr: Array<any> = this.stepVo.attrs_adds;
        for (let index = 0; index < 4; index++) {
            var element = arr[index];
            p = PropertyVo.getByInfo(element[0]);
            var attr: Attribute = new Attribute(p.no, 0);
            this.propList.push(attr);
        }
        var arr: Array<any> = this.vo && this.vo.attrs_adds || [];
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            var attr: Attribute;
            if (element[1] > 0) {
                attr = this.propList[index];
                attr.value = element[1];
            }
            else if (element[2] > 0) {
                attr = this.propList[index];
                attr.isPercent = true;
                attr.value = element[2];
            }
        }
    }

    /**
     * 是否可以镶嵌
     * @readonly
     * @type {boolean}
     * @memberof GemInfo
     */
    public get canInlay(): boolean {
        var arr: Array<object> = this.needs;
        var len: number = arr.length;
        var idex: number = 0;
        for (let index = 0; index < len; index++) {
            var element = arr[index];
            if (element["hasNum"] >= element["needNum"]) {
                idex += 1;
            }
        }
        if (idex >= len) {
            return true;
        }
        return false;
    }

    public get needs(): Array<object> {
        if (this.nextVo) {
            var len: number = this.nextVo.costs.length;
            var newArr: Array<object> = [];
            var ob: object;
            var needNum: number;
            this.lvNum = 0;
            for (let index = 0; index < len; index++) {
                var arr = this.nextVo.costs[index];
                ob = {};
                ob["code"] = arr[0];
                ob["hasNum"] = SBagData.instance.prop.getItemCountByGoodsNo(arr[0]);
                needNum = this.checkUpLv(ob["hasNum"], this.StrLv);
                ob["needNum"] = needNum > 0 ? needNum : arr[1];
                newArr.push(ob);
            }
            return newArr;
        }
        return null;
    }

    private lvNum: number = 0;
    private checkUpLv(num: number, lv: number): number {
        var nextLv: number = lv + 1;
        var next: GemLevelVo = GemLevelVo.getByLv(this.Slot, nextLv);
        var needNum: number;
        if (next) {
            needNum = next.costs[0][1];
            if (num >= (this.lvNum + needNum)) {
                this.lvNum += needNum;
                if (nextLv % 4 != 0) {
                    this.checkUpLv(num, nextLv);
                }
            }
        }
        return this.lvNum;
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
     * 需要装备等级
     * @returns {number}
     * @memberof StrengthInfo
     */
    public get needEquipLv(): number {
        return parseInt(this.nextVo.need_lv);
    }

    /**
     * 排序
     * @private
     * @param {*} a
     * @param {*} b
     * @returns {number}
     * @memberof SForgingData
     */
    private sortLevel(a: any, b: any): number {
        if (a.lv < b.lv) {
            return -1;
        }
        else if (a.lv > b.lv) {
            return 1;
        }
        else {
            if (a.slot < b.slot) {
                return -1;
            }
            else if (a.slot > b.slot) {
                return 1;
            }
            return 1
        }
    }

    /**
     * 获得某个类型的属性
     * @param {number} type
     * @returns {Array<Attribute>}
     * @memberof ItemData
     */
    public getTypeAtrrList(): Array<Attribute> {
        return this.propList;
    }

    public get level(): number {
        this.levels.sort(this.sortLevel);
        return this.levels[0]["lv"];
    }

    public getlvByPos(pos: number): object {
        for (let index = 0; index < this.levels.length; index++) {
            var element = this.levels[index];
            if (element["slot"] == pos) {
                return element;
            }
        }
        return null;
    }

}