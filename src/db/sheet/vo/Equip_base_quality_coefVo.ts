import { SheetManager } from "../SheetManager";
import { EQUIP_BASE_QUALITY_COEF_BASE } from "../base/EQUIP_BASE_QUALITY_COEF_BASE";

export class Equip_base_quality_coefVo extends EQUIP_BASE_QUALITY_COEF_BASE {

  public static get(id: number, index: number = -1): Equip_base_quality_coefVo {
    if (this[id]) return this[id];
    var vo: Equip_base_quality_coefVo = new Equip_base_quality_coefVo();
    this[id] = vo;
    return SheetManager.get("equip_base_quality_coef", id, this[id], vo.keys(), index);
  }

  public static getRatioByLvAndQuality(lv: number, quality: number): number {
    var list: any = SheetManager.getList("equip_base_quality_coef");
    var useCfg: Equip_base_quality_coefVo;
    for (var key in list) {
      var vo: Equip_base_quality_coefVo = this.get(parseInt(key));
      if (!vo || lv < vo.no) {
        break;
      } else {
        useCfg = vo;
      }
    }
    switch (quality) {
      case 1: return useCfg.white_max;
      case 2: return useCfg.green_max;
      case 3: return useCfg.blue_max;
      case 4: return useCfg.purple_max;
      case 5: return useCfg.orange_max;
      case 6: return useCfg.red_max;
    }
    return 1;
  }
}