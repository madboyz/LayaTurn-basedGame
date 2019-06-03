import { SheetManager } from "../SheetManager";
import { CHARGE_BASE } from "../base/CHARGE_BASE";

export class ChargeVo extends CHARGE_BASE {

  public static get(id: number, index: number = -1): ChargeVo {
    if (this[id]) return this[id];
    var vo: ChargeVo = new ChargeVo();
    this[id] = vo;
    return SheetManager.get("charge", id, this[id], vo.keys(), index);
  }

  //取首冲有的列表
  private static firstRechargeList: ChargeVo[];
  public static getFirstRechargeCfg(): ChargeVo[] {
    if (!this.firstRechargeList) {
      this.firstRechargeList = []
      var list: any = SheetManager.getList("charge");
      for (var key in list) {
        var vo: ChargeVo = this.get(parseInt(key));
        if (vo.first_recharge_goods && vo.first_recharge_goods.length > 0) {
          this.firstRechargeList.push(vo);
        }
      }
    }
    return this.firstRechargeList;
  }

  //充值档位列表
  private static rechargeList: ChargeVo[];
  public static getRechargeCfg(): ChargeVo[] {
    if (!this.rechargeList) {
      this.rechargeList = []
      var list: any = SheetManager.getList("charge");
      for (var key in list) {
        var vo: ChargeVo = this.get(parseInt(key));
        this.rechargeList.push(vo);
      }
    }
    return this.rechargeList;
  }
}