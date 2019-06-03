import { SheetManager } from "../SheetManager";
import { COMATE_STAR_BASE } from "../base/COMATE_STAR_BASE";

export class Comate_starVo extends COMATE_STAR_BASE {

  public static get(id: number, index: number = -1): Comate_starVo {
    if (this[id]) return this[id];
    var vo: Comate_starVo = new Comate_starVo();
    this[id] = vo;
    return SheetManager.get("comate_star", id, this[id], vo.keys(), index);
  }
  /**
   * 升星对应的消耗
   * @param no 
   * @param star 
   */
  public static getComateStarCost(no: number, star: number): Comate_starVo {
    var len: number = SheetManager.getComplexLength("comate_star", no);
    var currentVo: Comate_starVo = null;
    for (var i: number = 0; i < len; i++) {
      var vo: Comate_starVo = new Comate_starVo();
      vo = SheetManager.get("comate_star", no, vo, vo.keys(), i);;
      if (vo.lv == star) {
        currentVo = vo;
        break;
      }
    }
    return currentVo;
  }

  /**
  * 伙伴对应的第几个技能的Vo
  * @param no 
  * @param index 
  */
  public static getComateSkillByIndex(no: number, index: number): Comate_starVo {
    var count = index;
    var lv = 1;
    var cfg = this.getByLv(no, lv);
    while (true) {
      if (cfg.skill) {
        count--;
      }
      if (cfg.skill && count == 0) {
        break;
      }
      lv++;
      cfg = this.getByLv(no, lv);
      if (!cfg) {
        break;
      }
    }
    return cfg;
  }


  /**
   * 升星对应的消耗
   * @param no 
   * @param star 
   */
  public static getByLv(no: number, starlv: number): Comate_starVo {
    var len: number = SheetManager.getComplexLength("comate_star", no);
    var currentVo: Comate_starVo = null;
    for (var i: number = 0; i < len; i++) {
      var vo: Comate_starVo = new Comate_starVo();
      vo = SheetManager.get("comate_star", no, vo, vo.keys(), i);;
      if (vo.lv == starlv) {
        currentVo = vo;
        break;
      }
    }
    return currentVo;
  }

}