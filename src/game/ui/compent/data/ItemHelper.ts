import { FormulaVo } from "../../../../db/sheet/vo/FormulaVo";
import { Equip_base_quality_coefVo } from "../../../../db/sheet/vo/Equip_base_quality_coefVo";
import { ItemData } from "./ItemData";
import { PropertyVo } from "../../../../db/sheet/vo/PropertyVo";

export class ItemHelper {
    public static getEquipPower(item: ItemData, quality: number = 1): number {
        var vo: FormulaVo = FormulaVo.get(2);
        var ratio = Equip_base_quality_coefVo.getRatioByLvAndQuality(item.clientInfo.lv, quality);
        var _fight: number = 0;
        for (let i = 1; i <= 3; i++) {
            var attrs = item.clientInfo["equip_add_base_attr" + i];
            for (let j = 0; j < attrs.length; j++) {
                var attr = attrs[j];
                var attributeVo = PropertyVo.getByInfo(attr[0]);
                _fight += (parseInt(attr[1]) * vo[attributeVo.sys_name]);
            }
        }
        return Math.ceil(_fight * ratio);
    }
}