import { SheetManager } from "../SheetManager";
import { MOUNT_BIANYI_CFG_BASE } from "../base/MOUNT_BIANYI_CFG_BASE";

export class Mount_bianyi_cfgVo extends MOUNT_BIANYI_CFG_BASE {

  public static get(id: number, index: number = -1): Mount_bianyi_cfgVo {
    if (this[id]) return this[id];
    var vo: Mount_bianyi_cfgVo = new Mount_bianyi_cfgVo();
    this[id] = vo;
    return SheetManager.get("mount_bianyi_cfg", id, this[id], vo.keys(), index);
  }

  private static mountSkillList: Mount_bianyi_cfgVo[];
  public static getSkillCfg(): Mount_bianyi_cfgVo[] {
    if (!this.mountSkillList) {
      this.mountSkillList = []
      var list: any = SheetManager.getList("mount_bianyi_cfg");
      for (var key in list) {
        var vo: Mount_bianyi_cfgVo = this.get(parseInt(key));
        if (vo.passive_skill && vo.passive_skill > 0) {
          this.mountSkillList.push(vo);
        }
      }
    }
    return this.mountSkillList;
  }

}