import { SheetManager } from "../SheetManager";
import { MOUNT_BIANYI_SKILL_CFG_BASE } from "../base/MOUNT_BIANYI_SKILL_CFG_BASE";

export class Mount_bianyi_skill_cfgVo extends MOUNT_BIANYI_SKILL_CFG_BASE {

  public static get(id: number, index: number = -1): Mount_bianyi_skill_cfgVo {
    if (this[id]) return this[id];
    var vo: Mount_bianyi_skill_cfgVo = new Mount_bianyi_skill_cfgVo();
    this[id] = vo;
    return SheetManager.get("mount_bianyi_skill_cfg", id, this[id], vo.keys(), index);
  }

  /**
   * 升星对应的消耗
   * @param no 
   * @param star 
   */
  public static getByLv(no: number, lv: number): Mount_bianyi_skill_cfgVo {
    var len: number = SheetManager.getComplexLength("mount_bianyi_skill_cfg", no);
    var currentVo: Mount_bianyi_skill_cfgVo = null;
    for (var i: number = 0; i < len; i++) {
      var vo: Mount_bianyi_skill_cfgVo = new Mount_bianyi_skill_cfgVo();
      vo = SheetManager.get("mount_bianyi_skill_cfg", no, vo, vo.keys(), i);;
      if (vo.lv == lv) {
        currentVo = vo;
        break;
      }
    }
    return currentVo;
  }

}