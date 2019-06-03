import { SheetManager } from "../SheetManager";
import { FIGHT_LOST_CFG_BASE } from "../base/FIGHT_LOST_CFG_BASE";

export class Fight_lost_cfgVo extends FIGHT_LOST_CFG_BASE {

  public static get(id: number, index: number = -1): Fight_lost_cfgVo {
    if (this[id]) return this[id];
    var vo: Fight_lost_cfgVo = new Fight_lost_cfgVo();
    this[id] = vo;
    return SheetManager.get("fight_lost_cfg", id, this[id], vo.keys(), index);
  }

  private static List: Array<Fight_lost_cfgVo>;
  public static getAll(): Array<Fight_lost_cfgVo> {
    if (!this.List) {
      this.List = []
      var list: any = SheetManager.getList("fight_lost_cfg");
      var vo: Fight_lost_cfgVo;
      for (var key in list) {
        vo = this.get(parseInt(key));
        this.List.push(vo);
      }
    }
    return this.List;
  }
}