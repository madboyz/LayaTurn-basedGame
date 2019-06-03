import { SheetManager } from "../SheetManager";
import { SOARING_BASE } from "../base/SOARING_BASE";

export class SoaringVo extends SOARING_BASE {

  public static get(id: number, index: number = -1): SoaringVo {
    if (this[id]) return this[id];
    var vo: SoaringVo = new SoaringVo();
    this[id] = vo;
    return SheetManager.get("soaring", id, this[id], vo.keys(), index);
  }

  public static getListBySkillId(skillId: number): SoaringVo[] {
    var showList = []
    var list: any = SheetManager.getList("soaring");
    var vo: SoaringVo;
    for (var key in list) {
      vo = this.get(parseInt(key));
      if (vo.skill_id == skillId) {
        showList.push(vo);
      }
    }
    return showList;
  }


}