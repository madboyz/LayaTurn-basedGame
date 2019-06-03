import { DataManager } from "../../message/manager/DataManager";
import { S21001, S21002, S21003 } from "../../net/pt/pt_21";
import { Skill } from "./Skill";
import { SRoleData, SRoleEvent } from "../../net/data/SRoleData";
import { S13002, S13122, S13119, S13119_1 } from "../../net/pt/pt_13";
import { FactionVo } from "../../db/sheet/vo/FactionVo";
import { SheetManager } from "../../db/sheet/SheetManager";
import { Guild_skill_configVo } from "../../db/sheet/vo/Guild_skill_configVo";
import { GuildSkill } from "./GuildSkill";
import { S40055, S40054, S40061, S40061_1 } from "../../net/pt/pt_40";
import { SkillProtocol } from "./protocol/SkillProtocol";
import { S12005 } from "../../net/pt/pt_12";
import { S15000, S15179, S15178 } from "../../net/pt/pt_15";

export class SSkillData extends Laya.EventDispatcher {
    private static _instance: SSkillData;
    public static get instance(): SSkillData {
        return SSkillData._instance || (SSkillData._instance = new SSkillData());
    }
    public Skills: Laya.Dictionary = new Laya.Dictionary();
    public GuildSkills: Laya.Dictionary = new Laya.Dictionary();
    public protocol: SkillProtocol;


    constructor() {
        super();
        this.protocol = new SkillProtocol();
    }

    public unRegisterEvent(): void {
        this.Skills.clear();
        this.GuildSkills.clear();
        DataManager.cancel(PROTOCOL.E21001, this, this.onS21001);
        DataManager.cancel(PROTOCOL.E21002, this, this.onS21002);
        DataManager.cancel(PROTOCOL.E21003, this, this.onS21003);
        DataManager.cancel(PROTOCOL.E40054, this, this.onS40054);
        DataManager.cancel(PROTOCOL.E40055, this, this.onS40055);
        DataManager.cancel(PROTOCOL.E40061, this, this.onS40061);
        DataManager.cancel(PROTOCOL.E13119, this, this.onS13119);
        DataManager.cancel(PROTOCOL.E13122, this, this.onS13122);
        DataManager.cancel(PROTOCOL.E15178, this, this.onS15178);
        DataManager.cancel(PROTOCOL.E15179, this, this.onS15179);
        SRoleData.instance.off(SRoleEvent.ROLE_GET_ONLINEROLEINFO, this, this.onGetOnLineRoleInfo);
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E21001, this, this.onS21001);
        DataManager.listen(PROTOCOL.E21002, this, this.onS21002);
        DataManager.listen(PROTOCOL.E21003, this, this.onS21003);
        DataManager.listen(PROTOCOL.E40054, this, this.onS40054);
        DataManager.listen(PROTOCOL.E40055, this, this.onS40055);
        DataManager.listen(PROTOCOL.E40061, this, this.onS40061);
        DataManager.listen(PROTOCOL.E13119, this, this.onS13119);
        DataManager.listen(PROTOCOL.E13122, this, this.onS13122);
        DataManager.listen(PROTOCOL.E15178, this, this.onS15178);
        DataManager.listen(PROTOCOL.E15179, this, this.onS15179);
        SRoleData.instance.on(SRoleEvent.ROLE_GET_ONLINEROLEINFO, this, this.onGetOnLineRoleInfo);
        this.initGuildSkills();
    }

    private onGetOnLineRoleInfo(data: S13002) {
    }

    public initSkills() {
        if (this.Skills.values.length > 0)
            return;
        if (SRoleData.instance.info && this.Skills.values.length == 0) {
            var data = FactionVo.get(SRoleData.instance.info.Faction);
            if (data != null) {
                if (data.skills instanceof Array) {
                    for (let i = 0; i < data.skills.length; i++) {
                        var item = data.skills[i] as Array<number>;
                        var id = item[0];//id
                        var learnLv = item[1];//学习等级
                        var skill: Skill = new Skill(id);
                        skill.LearnLv = learnLv;
                        skill.Lv = 0;
                        this.Skills.set(skill.Id, skill);
                    }
                }
            }
        }
    }

    public initGuildSkills() {
        if (this.GuildSkills.values.length > 0)
            return;
        if (SRoleData.instance.info.GuildId > 0 && this.GuildSkills.values.length == 0) {
            var data = Guild_skill_configVo.getGuildSkillCfg();
            if (data != null) {
                for (let i = 0; i < data.length; i++) {
                    var item = data[i] as Guild_skill_configVo;
                    var id = item.no
                    var guildSkill: GuildSkill = new GuildSkill(id, 2);
                    guildSkill.Lv = 0;
                    this.GuildSkills.set(guildSkill.Id, guildSkill);
                }
            }
        }
    }

    /**
     * 判断是否有技能可升级
     */
    public SkillRedUpdate(): boolean {
        var isCan = false;
        for (let i = 0; i < this.Skills.values.length; i++) {
            const skill: Skill = this.Skills.values[i];
            var money = SRoleData.instance.getMoneyByType(skill.cost_type);
            if (money >= skill.cost_value) {
                if (skill.Lv == 0) {
                    if (skill.LearnLv < SRoleData.instance.info.Lv) {
                        isCan = true;
                        break;
                    }
                }
                else {
                    if (skill.sheetData.pre_skill_id == 0) {
                        if (skill.Lv < SRoleData.instance.info.Lv) {
                            isCan = true;
                            break;
                        }
                    }
                    else {
                        var lastSkill: Skill = this.Skills.get(skill.sheetData.pre_skill_id);
                        if (lastSkill != null && lastSkill.Lv > skill.Lv) {
                            isCan = true;
                            break;
                        }
                    }
                }
            }
        }
        return isCan;
    }


    /**
     * 判断是否有帮派技能可以升级
     */
    public GuildSkillRed(): boolean {
        if (SRoleData.instance.info.GuildId == 0) {
            return false;
        }
        for (let i = 0; i < this.GuildSkills.values.length; i++) {
            var guildSkill: GuildSkill = this.GuildSkills.values[i];
            if (guildSkill.canUpRed) {
                return true;
            }
        }
        return false;
    }

    public IsCanUpgarde(skillId: number): boolean {
        var skill: Skill = this.Skills.get(skillId);
        if (skill == null)
            return false;
        if (skill.isMaxLv)
            return false;
        var money = SRoleData.instance.getMoneyByType(skill.cost_type);
        //if(money < skill.cost_value)
        //return false;
        if (SRoleData.instance.info == null)
            return false;
        if (skill.Lv == 0) {
            return skill.LearnLv <= SRoleData.instance.info.Lv
        }
        else {
            if (skill.sheetData.pre_skill_id == 0) {
                return skill.Lv < SRoleData.instance.info.Lv;
            }
            else {
                var lastSkill: Skill = this.Skills.get(skill.sheetData.pre_skill_id);
                if (lastSkill == null)
                    return false;
                else {
                    return lastSkill.Lv > skill.Lv;
                }
            }
        }
    }

    private onS21001(data: S21001): void {
        this.initSkills();
        for (let i = 0; i < data.item_1.length; i++) {
            var item = data.item_1[i];
            var skill: Skill = this.Skills.get(item.SkillId);
            if (skill != null) {
                skill.Lv = item.SkillLv;

            }
        }
        this.event(SSkillEvent.SKILL_CHECK_MY);
    }

    private onS21002(data: S21002) {
        var skill: Skill = this.Skills.get(data.SkillId);
        if (skill != null) {
            skill.Lv = data.SkillLv;
        }
        this.event(SSkillEvent.SKILL_UPGRADE, skill);
    }

    private onS21003(data: S21003): void {
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var skill: Skill = this.Skills.get(item.SkillId);
            if (skill != null) {
                skill.Lv = item.SkillLv;
                this.event(SSkillEvent.SKILL_UPGRADE, skill);
            }
        }
    }

    //帮派技能---------------
    private onS40055(data: S40055) {
        this.initGuildSkills();
        for (let i = 0; i < data.item_1.length; i++) {
            var Sdata = data.item_1[i];
            var guildSkill: GuildSkill = this.GuildSkills.get(Sdata.No);
            if (guildSkill != null) {
                guildSkill.Lv = Sdata.Lv;
            }
        }
    }
    private onS40054(data: S40054) {
        var skill: GuildSkill = this.GuildSkills.get(data.No);
        if (skill != null) {
            skill.Lv = data.Lv;
        }
        this.event(SSkillEvent.GUILD_SKILL_UPGRADE, skill);
    }
    private onS40061(data: S40061) {
        for (let i = 0; i < data.item_1.length; i++) {
            var Sdata: S40061_1 = data.item_1[i];
            var guildSkill: GuildSkill = this.GuildSkills.get(Sdata.No);
            if (guildSkill != null) {
                guildSkill.Lv = Sdata.Lv;
            }
            this.event(SSkillEvent.GUILD_SKILL_UPGRADE, guildSkill);
        }
    }
    private onSSSSSSSS(data: S21003): void {
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var skill: Skill = this.GuildSkills.get(item.SkillId);
            if (skill != null) {
                skill.Lv = item.SkillLv;
                this.event(SSkillEvent.GUILD_SKILL_UPGRADE, skill);
            }
        }
    }

    //==========飞升技能======================================================
    public feishengSkillList: S13119_1[] = [];

    private onS13119(data: S13119): void {
        this.feishengSkillList = data.item_1;
        this.event(SSkillEvent.FEISHENG_SKILL_CHANGE);
    }

    private onS13122(data: S13122): void {
        if (data.code == 0) {
            this.feishengSkillList = [];
            this.event(SSkillEvent.FEISHENG_SKILL_CHANGE);
        }
    }

    public get feishengLeftPoint(): number {
        var total = SRoleData.instance.info.Soaring;
        var use = 0;
        for (let i = 0; i < this.feishengSkillList.length; i++) {
            const element = this.feishengSkillList[i];
            if (element.SkillID > 0) {
                use++;
            }
        }
        return total - use;
    }

    public checkFeishengSkillAct(skillId: number): boolean {
        for (let i = 0; i < this.feishengSkillList.length; i++) {
            const element = this.feishengSkillList[i];
            if (element.SkillID == skillId) {
                return true;
            }
        }
        return false;
    }

    //装备技能-----------------------------
    public equipSkillInfo:S15179

    private onS15179(data: S15179) {
        this.equipSkillInfo = data;
        this.event(SSkillEvent.EQUIP_SKILL_CHANGE);
    }

    private onS15178(data: S15178) {
        this.equipSkillInfo.item_2 = data.item_2;
        this.event(SSkillEvent.EQUIP_SKILL_CHANGE);
    }


}


export enum SSkillEvent {
    SKILL_CHECK_MY = "skill_check_my",//查询咨询及已学习的技能信息
    SKILL_UPGRADE = "skill_upgrade",//升级
    GUILD_SKILL_UPGRADE = "guild_skill_upgrade",//升级
    FEISHENG_SKILL_CHANGE = "FEISHENG_SKILL_CHANGE",//飞升技能改变
    EQUIP_SKILL_CHANGE = "EQUIP_SKILL_CHANGE",//装备技能
}