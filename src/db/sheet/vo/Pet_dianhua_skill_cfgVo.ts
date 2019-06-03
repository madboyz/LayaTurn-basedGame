import { SheetManager } from "../SheetManager";
import { PET_DIANHUA_SKILL_CFG_BASE } from "../base/PET_DIANHUA_SKILL_CFG_BASE";

export class Pet_dianhua_skill_cfgVo extends PET_DIANHUA_SKILL_CFG_BASE {

  public static get(id: number, index: number = -1): Pet_dianhua_skill_cfgVo {
    if (this[id]) return this[id];
    var vo: Pet_dianhua_skill_cfgVo = new Pet_dianhua_skill_cfgVo();
    this[id] = vo;
    return SheetManager.get("pet_dianhua_skill_cfg", id, this[id], vo.keys(), index);
  }

  /**
   * 升星对应的消耗
   * @param no 
   * @param star 
   */
  public static getByLv(no: number, lv: number): Pet_dianhua_skill_cfgVo {
    var len: number = SheetManager.getComplexLength("pet_dianhua_skill_cfg", no);
    var currentVo: Pet_dianhua_skill_cfgVo = null;
    for (var i: number = 0; i < len; i++) {
      var vo: Pet_dianhua_skill_cfgVo = new Pet_dianhua_skill_cfgVo();
      vo = SheetManager.get("pet_dianhua_skill_cfg", no, vo, vo.keys(), i);;
      if (vo.lv == lv) {
        currentVo = vo;
        break;
      }
    }
    return currentVo;
  }

}