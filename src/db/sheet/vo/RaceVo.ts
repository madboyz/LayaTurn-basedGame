import { SheetManager } from "../SheetManager";
import { RACE_BASE } from "../base/RACE_BASE";

export class RaceVo extends RACE_BASE {

  public static get(id: number, index: number = -1): RaceVo {
    if (this[id]) return this[id];
    var vo: RaceVo = new RaceVo();
    this[id] = vo;
    return SheetManager.get("race", id, this[id], "no,race_name,sex,audio_style,half_portrait,full_portrait,action_res,head_anim,body_anim,back_anim,weapon_anim,desc", index);
  }

  public static getBySex(id: number, sex: number): RaceVo {
    var key: string = id + "_" + sex;
    var vo: RaceVo = this[key];
    if (vo) return vo;
    var len: number = SheetManager.getComplexLength("race", id);
    for (var i: number = 0; i < len; i++) {
      this[id] = null;
      var vo: RaceVo = this.get(id, i);
      this[vo.no + "_" + vo.sex] = vo;
    }
    return this[key];
  }
}