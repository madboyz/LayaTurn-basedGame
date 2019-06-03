import { SheetManager } from "../SheetManager";
import { PET_DIANHUA_CFG_BASE } from "../base/PET_DIANHUA_CFG_BASE";

export class Pet_dianhua_cfgVo extends PET_DIANHUA_CFG_BASE {

  public static get(id: number, index: number = -1): Pet_dianhua_cfgVo {
    if (this[id]) return this[id];
    var vo: Pet_dianhua_cfgVo = new Pet_dianhua_cfgVo();
    this[id] = vo;
    return SheetManager.get("pet_dianhua_cfg", id, this[id], vo.keys(), index);
  }

  private static petSkillList: Pet_dianhua_cfgVo[];
  public static getSkillCfg(): Pet_dianhua_cfgVo[] {
    if (!this.petSkillList) {
      this.petSkillList = []
      var list: any = SheetManager.getList("pet_dianhua_cfg");
      for (var key in list) {
        var vo:Pet_dianhua_cfgVo = this.get(parseInt(key));
        if (vo.passive_skill && vo.passive_skill > 0) {
          this.petSkillList.push(vo);
        }
      }
    }
    return this.petSkillList;
  }
}