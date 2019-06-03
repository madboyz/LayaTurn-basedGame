import { SheetManager } from "../SheetManager";
import { COMATE_YUANFEN_CFG_BASE } from "../base/COMATE_YUANFEN_CFG_BASE";

export class Comate_yuanfen_cfgVo extends COMATE_YUANFEN_CFG_BASE {

  public static get(id: number, index: number = -1): Comate_yuanfen_cfgVo {
    if (this[id]) return this[id];
    var vo: Comate_yuanfen_cfgVo = new Comate_yuanfen_cfgVo();
    this[id] = vo;
    return SheetManager.get("comate_yuanfen_cfg", id, this[id], vo.keys(), index);
  }

  private static datas: Array<Comate_yuanfen_cfgVo>;
  public static getAll(): Array<Comate_yuanfen_cfgVo> {
    if (!this.datas) {
      this.datas = [];
      var list: any = SheetManager.getList("comate_yuanfen_cfg");
      for (var key in list) {
        var vo: Comate_yuanfen_cfgVo = this.get(parseInt(key));
        this.datas.push(vo);
      }
    }
    return this.datas;
  }

}