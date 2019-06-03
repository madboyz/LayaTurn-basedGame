import { SheetManager } from "../SheetManager";
import { GUILD_SKILL_CONFIG_BASE } from "../base/GUILD_SKILL_CONFIG_BASE";

export class Guild_skill_configVo extends GUILD_SKILL_CONFIG_BASE {

  public static get(id: number, index: number = -1): Guild_skill_configVo {
    if (this[id]) return this[id];
    var vo: Guild_skill_configVo = new Guild_skill_configVo();
    this[id] = vo;
    return SheetManager.get("guild_skill_config", id, this[id], vo.keys(), index);
  }


  private static guildSkillList: Guild_skill_configVo[];
  public static getGuildSkillCfg(): Guild_skill_configVo[] {
    if (!this.guildSkillList) {
      this.guildSkillList = []
      var list: any = SheetManager.getList("guild_skill_config");
      for (var key in list) {
        var vo: Guild_skill_configVo = this.get(parseInt(key));
        this.guildSkillList.push(vo);
      }
    }
    return this.guildSkillList;
  }
}