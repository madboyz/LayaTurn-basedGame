import { SheetManager } from "../SheetManager";
import { COMATE_YUANSHEN_CFG_BASE } from "../base/COMATE_YUANSHEN_CFG_BASE";

export class Comate_yuanshen_cfgVo extends COMATE_YUANSHEN_CFG_BASE {

  public static get(id: number, index: number = -1): Comate_yuanshen_cfgVo {
    if (this[id]) return this[id];
    var vo: Comate_yuanshen_cfgVo = new Comate_yuanshen_cfgVo();
    this[id] = vo;
    return SheetManager.get("comate_yuanshen_cfg", id, this[id], vo.keys(), index);
  }

  private static comateSkillList: Comate_yuanshen_cfgVo[];
  public static getSkillCfg(): Comate_yuanshen_cfgVo[] {
    if (!this.comateSkillList) {
      this.comateSkillList = []
      var list: any = SheetManager.getList("comate_yuanshen_cfg");
      for (var key in list) {
        var vo: Comate_yuanshen_cfgVo = this.get(parseInt(key));
        if (vo.passive_skill && vo.passive_skill > 0) {
          this.comateSkillList.push(vo);
        }
      }
    }
    return this.comateSkillList;
  }
}