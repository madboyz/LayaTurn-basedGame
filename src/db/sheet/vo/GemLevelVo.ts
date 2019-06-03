import { SheetManager } from "../SheetManager";
import { GEMLEVEL_BASE } from "../base/GEMLEVEL_BASE";

export class GemLevelVo extends GEMLEVEL_BASE{

   public static get(id : number,index : number = -1):GemLevelVo{
           if(this[id])return this[id];
           var vo : GemLevelVo = new GemLevelVo();
             this[id] = vo;
           return SheetManager.get("gemLevel",id,this[id],vo.keys(),index);
    }

    public static getByLv(slot: number, lv: number): GemLevelVo {
    var key: string = slot + "_" + lv;
    var vo: GemLevelVo = this[key];
    if (vo) return vo;
    var len: number = SheetManager.getComplexLength("gemLevel", slot);
    for (var i: number = 0; i < len; i++) {
      this[slot] = null;
      var vo: GemLevelVo = this.get(slot, i);
      this[vo.no + "_" + vo.lv] = vo;
    }
    return this[key];
  }
}