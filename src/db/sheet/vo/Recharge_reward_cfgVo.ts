import { SheetManager } from "../SheetManager";
import { RECHARGE_REWARD_CFG_BASE } from "../base/RECHARGE_REWARD_CFG_BASE";

export class Recharge_reward_cfgVo extends RECHARGE_REWARD_CFG_BASE {

  public static get(id: number, index: number = -1): Recharge_reward_cfgVo {
    if (this[id]) return this[id];
    var vo: Recharge_reward_cfgVo = new Recharge_reward_cfgVo();
    this[id] = vo;
    return SheetManager.get("recharge_reward_cfg", id, this[id], vo.keys(), index);
  }

  private static datas: Array<Recharge_reward_cfgVo>;
  public static getAll(): Array<Recharge_reward_cfgVo> {
    if (!this.datas) {
      this.datas = [];
      var list: any = SheetManager.getList("recharge_reward_cfg");
      for (var key in list) {
        var vo: Recharge_reward_cfgVo = this.get(parseInt(key));
        this.datas.push(vo);
      }
    }
    return this.datas;
  }

}