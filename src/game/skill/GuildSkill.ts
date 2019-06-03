import { ConstVo } from "../../db/sheet/vo/ConstVo";
import { Guild_skill_configVo } from "../../db/sheet/vo/Guild_skill_configVo";
import { SkillVo } from "../../db/sheet/vo/SkillVo";
import { Skill_costVo } from "../../db/sheet/vo/Skill_costVo";
import { SRoleData } from "../../net/data/SRoleData";
import { HtmlUtils } from "../utils/HtmlUtils";
import { Skill } from "./Skill";
import { SGuildData } from "../ui/view/guild/data/SGuildData";
import { Guild_skill_up_cons_configVo } from "../../db/sheet/vo/Guild_skill_up_cons_configVo";

export class GuildSkill extends Skill {
    public sheetDataGS: Guild_skill_configVo = null;
    constructor(id: number, skillType: number = 1) {
        super(id, skillType);
        this.Id = id;
        if (id == 0)
            return;
        if (skillType == 2) {
            this.sheetDataGS = Guild_skill_configVo.get(id);
        }
    }

    public set Lv(lv: number) {
        this._lv = lv;
        var next_lv = lv + 1;
        var data = Guild_skill_up_cons_configVo.get(next_lv);
        if (data != null && data.price_type != null) {
            this.isMaxLv = false;
            this.cost_type = data.price_type;
            this.cost_value = data.price;
        }
        else {
            this.isMaxLv = true;
        }
    }

    public get Lv(): number {
        return this._lv;
    }

    public get canUpgardeLvG(): number {
        this._canUpgardeLvG = Guild_skill_up_cons_configVo.getMaxCanUpLv(SGuildData.instance.myGuildData.Lv);
        return this._canUpgardeLvG;
    }
    /**
     * 根据穿过来得skill两者比较返回显示html文本
     * @param skill 
     */
    public GetNextSkillHtmlDes(fontsize: number): string {
        var des = "";
        if (SRoleData.instance.info.GuildId == 0)
            return des;
        if (this.isMaxLv)
            return HtmlUtils.addColor("(已满级)", "#8e5213", fontsize);

        var next_lv = this._lv + 1;
        var data = Guild_skill_up_cons_configVo.get(next_lv);
        if (data.lv_limit > SGuildData.instance.myGuildData.Lv) {
            des = HtmlUtils.addColor(`(需要帮派等级${data.lv_limit})`, "Red", fontsize);
        } else {
            des = "";
        }
        return des;
    }

    public get canUpRed(): boolean {
        if (SRoleData.instance.info.GuildId == 0) {
            return false;
        }
        if (this.isMaxLv) {
            return false;
        }
        var next_lv = this._lv + 1;
        var data = Guild_skill_up_cons_configVo.get(next_lv);
        var guildLv = SGuildData.instance.myGuildData && (SGuildData.instance.myGuildData.Lv) || 0;
        if (data.lv_limit > guildLv) {
            return false;
        }
        if(SRoleData.instance.getMoneyByType(this.cost_type) < this.cost_value){
            return false;
        }
        return true;
    }

}