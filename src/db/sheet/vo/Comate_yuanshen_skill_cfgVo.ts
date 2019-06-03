import { COMATE_YUANSHEN_SKILL_CFG_BASE } from "../base/COMATE_YUANSHEN_SKILL_CFG_BASE";
import { SheetManager } from "../SheetManager";

export class Comate_yuanshen_skill_cfgVo extends COMATE_YUANSHEN_SKILL_CFG_BASE{

   public static get(id : number,index : number = -1):Comate_yuanshen_skill_cfgVo{
           if(this[id])return this[id];
           var vo : Comate_yuanshen_skill_cfgVo = new Comate_yuanshen_skill_cfgVo();
             this[id] = vo;
           return SheetManager.get("comate_yuanshen_skill_cfg",id,this[id],vo.keys(),index);
    }

  /**
   * 升星对应的消耗
   * @param no 
   * @param star 
   */
  public static getByLv(no: number, lv: number): Comate_yuanshen_skill_cfgVo {
    var len: number = SheetManager.getComplexLength("comate_yuanshen_skill_cfg", no);
    var currentVo: Comate_yuanshen_skill_cfgVo = null;
    for (var i: number = 0; i < len; i++) {
      var vo: Comate_yuanshen_skill_cfgVo = new Comate_yuanshen_skill_cfgVo();
      vo = SheetManager.get("comate_yuanshen_skill_cfg", no, vo, vo.keys(), i);;
      if (vo.lv == lv) {
        currentVo = vo;
        break;
      }
    }
    return currentVo;
  }

}