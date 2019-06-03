import { SheetManager } from "../SheetManager";
import { GUILD_SKILL_UP_CONS_CONFIG_BASE } from "../base/GUILD_SKILL_UP_CONS_CONFIG_BASE";

export class Guild_skill_up_cons_configVo extends GUILD_SKILL_UP_CONS_CONFIG_BASE {

  public static get(id: number, index: number = -1): Guild_skill_up_cons_configVo {
    if (this[id]) return this[id];
    var vo: Guild_skill_up_cons_configVo = new Guild_skill_up_cons_configVo();
    this[id] = vo;
    return SheetManager.get("guild_skill_up_cons_config", id, this[id], vo.keys(), index);
  }

  public static getMaxCanUpLv(guildLv: number): number {
    var list: any = SheetManager.getList("guild_skill_up_cons_config");
    var limitMaxVo:Guild_skill_up_cons_configVo;
    for (var key in list) {
      var vo: Guild_skill_up_cons_configVo = this.get(parseInt(key));
      if (guildLv >= vo.lv_limit) {
        limitMaxVo = vo;
        continue;
      } else {
        return limitMaxVo.no;
      }
    }
    return 1;
  }
}