import { SheetManager } from "../SheetManager";
import { SUPER_BOSS_CHAP_CFG_BASE } from "../base/SUPER_BOSS_CHAP_CFG_BASE";

export class Super_boss_chap_cfgVo extends SUPER_BOSS_CHAP_CFG_BASE {

  public static get(id: number, index: number = -1): Super_boss_chap_cfgVo {
    if (this[id]) return this[id];
    var vo: Super_boss_chap_cfgVo = new Super_boss_chap_cfgVo();
    this[id] = vo;
    return SheetManager.get("super_boss_chap_cfg", id, this[id], vo.keys(), index);
  }

  private static List: Array<Super_boss_chap_cfgVo>;
  public static getAll(): Array<Super_boss_chap_cfgVo> {
    if (!this.List) {
      this.List = []
      var list: any = SheetManager.getList("super_boss_chap_cfg");
      var vo: Super_boss_chap_cfgVo;
      for (var key in list) {
        vo = this.get(parseInt(key));
        this.List.push(vo);
      }
    }
    return this.List;
  }

}