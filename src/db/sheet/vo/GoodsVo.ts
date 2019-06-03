import { SheetManager } from "../SheetManager";
import { GOODS_BASE } from "../base/GOODS_BASE";

export class GoodsVo extends GOODS_BASE {

  public static get(id: number, index: number = -1): GoodsVo {
    if (this[id]) return this[id];
    var vo: GoodsVo = new GoodsVo();
    this[id] = vo;
    return SheetManager.get("goods", id, this[id], vo.keys(), index);
  }

  public static getSuitList(suitId: number): GoodsVo[] {
    var list: any = SheetManager.getList("goods");
    var suitList = [];
    for (var key in list) {
      var data = this.get(parseInt(key));
      if (data && data.suit_id == suitId) {
        suitList.push(data);
      }
    }
    return suitList;


  }
}