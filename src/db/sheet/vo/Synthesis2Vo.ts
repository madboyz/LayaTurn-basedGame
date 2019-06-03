import { SheetManager } from "../SheetManager";
import { SYNTHESIS2_BASE } from "../base/SYNTHESIS2_BASE";

export class Synthesis2Vo extends SYNTHESIS2_BASE {

  public static get(id: number, index: number = -1): Synthesis2Vo {
    if (this[id]) return this[id];
    var vo: Synthesis2Vo = new Synthesis2Vo();
    this[id] = vo;
    return SheetManager.get("synthesis2", id, this[id], vo.keys(), index);
  }

  public static getTargetByGoodsNo(goodsNo: number): Synthesis2Vo {
    var list: any = SheetManager.getList("synthesis2");
    for (var key in list) {
      var vo: Synthesis2Vo = this.get(parseInt(key));
      if (vo.formulas[0][0][1] == goodsNo) {
        return vo;
      }
    }
    return null;
  }

}