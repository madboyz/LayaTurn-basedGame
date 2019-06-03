import { S37025_1 } from "../../../../../net/pt/pt_37";
import { Comate_mingge_cfgVo } from "../../../../../db/sheet/vo/Comate_mingge_cfgVo";
import { FormulaVo } from "../../../../../db/sheet/vo/FormulaVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";

export class MinggeInfo {
    public serverInfo: S37025_1;
    public cfg: Comate_mingge_cfgVo;
    public HoleNo: number = 0;//大于1表示装备在身上的孔位置

    constructor(data: S37025_1, HoleNo: number = 0) {
        this.serverInfo = data;
        this.HoleNo = HoleNo;
        this.cfg = Comate_mingge_cfgVo.get(data.No);
    }

    public get battlePower() {
        var vo: FormulaVo = FormulaVo.get(3);
        var _fight: number = 0;
        var attrs = this.cfg.attrs_adds;
        // for (let i = 0; i < attrs.length; i++) {
        //     var attr = attrs[i];
        //     var attributeVo = PropertyVo.getByInfo(attr[0]);
        //     _fight += (parseInt(attr[1]) * vo[attributeVo.sys_name]);
        // }
        var attr = attrs[this.Lv - 1];
        var attributeVo = PropertyVo.getByInfo(attr[0]);
        _fight += (parseInt(attr[1]) * vo[attributeVo.sys_name]);
        return Math.ceil(_fight);
    }

    public get Lv() {
        var expCfg = this.cfg.lv_exp;
        var lv: number = 0;
        for (let i = 0; i < expCfg.length; i++) {
            const element = expCfg[i];
            if (this.serverInfo.TotalExp >= element) {
                lv = i + 1;
                continue;
            }else {
                break;
            }
        }
        return lv;
    }

}