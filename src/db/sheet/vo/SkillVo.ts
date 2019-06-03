import { SheetManager } from "../SheetManager";
import { SKILL_BASE } from "../base/SKILL_BASE";

export class SkillVo extends SKILL_BASE {

  public static get(id: number, index: number = -1): SkillVo {
    if (this[id]) return this[id];
    var vo: SkillVo = new SkillVo();
    this[id] = vo;
    return SheetManager.get("skill", id, this[id], vo.keys(), index);
  }

  /**
     * 
     * 原地施法
     * @readonly
     * @type {boolean}
     * @memberOf SkillVo
     */
  public get isPlace(): boolean {
    return this.cast_type == CAST_TYPE.PLACE;
  }
  /**
   * 
   * 移动到目标前面
   * @readonly
   * @type {boolean}
   * @memberOf SkillVo
   */
  public get isMoveTarget(): boolean {
    return this.cast_type == CAST_TYPE.MOVE_TARGE;
  }
  /**
   * 
   * 战场中间施法 
   * @readonly
   * @type {boolean}
   * @memberOf SkillVo
   */
  public get isCenter(): boolean {
    return this.cast_type == CAST_TYPE.POS_CENTER;
  }
  /**
   * 边移动边施法
   * 
   * @readonly
   * @type {boolean}
   * @memberOf SkillVo
   */
  public get isSingleMoveRelease(): boolean {
    return this.cast_type == CAST_TYPE.SINGLE_MOVE_RElEASE;
  }

  //是否主动技能
  public get isTake(): boolean {
    return this.type == type.TAKE;
  }

  //是否被动技能
  public get isPassive(): boolean {
    return this.type == type.PASSIVE;
  }


}
// 1.站在原地施法
// 2.移动到主选目标前再施法
// 3.站在场中央施法
// 4.针对单体目标边移动边施法
export enum CAST_TYPE {
  PLACE = 1,
  MOVE_TARGE = 2,
  POS_CENTER = 3,
  SINGLE_MOVE_RElEASE = 4,
}
export enum TARGET_TYPE_LIMIT {
  ENEME = 1,// 敌方
  FD = 2,// 友方
  SELF = 3,// 自己
  NO_SELF = 4,// 非自己
  DEAD = 5,// 死亡
  NO_DEAD = 6,// 非死亡
  MENKE = 7,// 门客
  NO_MENKE = 8,// 非门客
  MONSTER = 9,// 怪物
  DAXIA = 10,//大侠
  PEIOU = 11,//配偶
  NO_MONSTER = 12,//非怪物
  NO_PLAYER = 13,//玩家
  NO_NPC = 14,//NPC
}

enum type {
  TAKE = 1,
  PASSIVE = 2,
}

