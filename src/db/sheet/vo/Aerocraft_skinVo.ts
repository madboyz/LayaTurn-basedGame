import { SheetManager } from "../SheetManager";
import { AEROCRAFT_SKIN_BASE } from "../base/AEROCRAFT_SKIN_BASE";

export class Aerocraft_skinVo extends AEROCRAFT_SKIN_BASE {

  public static get(id: number, index: number = -1): Aerocraft_skinVo {
    if (this[id]) return this[id];
    var vo: Aerocraft_skinVo = new Aerocraft_skinVo();
    this[id] = vo;
    return SheetManager.get("aerocraft_skin", id, this[id], vo.keys(), index);
  }

  public static getCfgByItemId(itemId: number): Aerocraft_skinVo {
    var list: any = SheetManager.getList("aerocraft_skin");
    for (var key in list) {
      var vo: Aerocraft_skinVo = this.get(parseInt(key));
      if (vo.goods_list[0] && vo.goods_list[0][0] == itemId) {
        return vo;
      }
    }
    return null;
  }

  private static List: Array<Aerocraft_skinVo>;
  public static getAll(): Array<Aerocraft_skinVo> {
    if (!this.List) {
      this.List = []
      var list: any = SheetManager.getList("aerocraft_skin");
      var vo: Aerocraft_skinVo;
      for (var key in list) {
        vo = this.get(parseInt(key));
        this.List.push(vo);
      }
    }
    return this.List;
  }

}