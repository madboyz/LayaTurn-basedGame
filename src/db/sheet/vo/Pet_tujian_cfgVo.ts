import { SheetManager } from "../SheetManager";
import { PET_TUJIAN_CFG_BASE } from "../base/PET_TUJIAN_CFG_BASE";

export class Pet_tujian_cfgVo extends PET_TUJIAN_CFG_BASE {

  public static get(id: number, index: number = -1): Pet_tujian_cfgVo {
    if (this[id]) return this[id];
    var vo: Pet_tujian_cfgVo = new Pet_tujian_cfgVo();
    this[id] = vo;
    return SheetManager.get("pet_tujian_cfg", id, this[id], vo.keys(), index);
  }

  // public static getByLv(no: number, lv: number): Pet_tujian_cfgVo {
  //   var list: any = SheetManager.getList("pet_tujian_cfg");
  //       return list[no][lv];
  // }

  /**
   * 升星对应的消耗
   * @param no 
   * @param star 
   */
  public static getByLv(no: number, lv: number): Pet_tujian_cfgVo {
    var len: number = SheetManager.getComplexLength("pet_tujian_cfg", no);
    var currentVo: Pet_tujian_cfgVo = null;
    for (var i: number = 0; i < len; i++) {
      var vo: Pet_tujian_cfgVo = new Pet_tujian_cfgVo();
      vo = SheetManager.get("pet_tujian_cfg", no, vo, vo.keys(), i);;
      if (vo.lv == lv) {
        currentVo = vo;
        break;
      }
    }
    return currentVo;
  }


}