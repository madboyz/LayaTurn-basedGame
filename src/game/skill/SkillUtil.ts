import { HtmlUtils } from "../utils/HtmlUtils";
import { Skill } from "./Skill";
import { SRoleData } from "../../net/data/SRoleData";
import { PropertyVo } from "../../db/sheet/vo/PropertyVo";
import { PropertyEnumCode } from "../property/RoleProperty";
import { Passive_skillVo } from "../../db/sheet/vo/Passive_skillVo";
import { GuildSkill } from "./GuildSkill";
import { ChatUtil } from "../ui/view/chat/ChatUtil";
import { Guild_skill_up_cons_configVo } from "../../db/sheet/vo/Guild_skill_up_cons_configVo";

export class SkillUtil {
    /**
     * 返回攻击类型描述
     * @param att_type 
     */
    public static GetAttackTypeDes(att_type: number): string {
        var attack = "攻击";
        switch (att_type) {
            case 1:
                attack = "物理攻击";
                break;
            case 2:
                attack = "法术攻击";
                break;
            case 3:
                attack = "无攻击";
            case 4:
                attack = "治疗";
            case 5:
                attack = "毒性攻击";
                break;
        }
        return attack;
    }
    /**
     * 作用类型
     * @param target_type_limit 
     */
    public static GetTargetType(target_type_limit: number): string {
        var target_type = "攻击";
        switch (target_type_limit) {
            case 1:
                target_type = "敌方";
                break;
            case 2:
                target_type = "友方";
                break;
            case 3:
                target_type = "自己";
                break;
            case 4:
                target_type = "非自己";
                break;
            case 5:
                target_type = "死亡";
                break;
            case 6:
                target_type = "非死亡";
                break;
        }
        return target_type;
    }

    public static NewDesc(skill: Skill, htmlColor1: string = "", font: number = 18, htmlColor2: string = ""): string {
        var desc = skill.sheetData.desc as string;
        var displayerLv = skill.Lv;
        if (displayerLv == 0) {
            displayerLv = 1;
        }
        //val1 = Math.floor(((attack_scaling+ lv*attack_scaling_lv)*value_scaling))  (?%)
        //val2 = Math.floor(para * Lv + para2))  (?%)
        /*两种公式value1读的是attack_scaling 百分比不管，根据display_scaling固定相乘 value2被动表*/

        //以前用的显示技能的方法。。。。由于value2，没配，怕有问题，先留着================================
        // if(desc.search("value1") != -1)
        // {
        //     var v =  Math.floor((skill.sheetData.attack_scaling + displayerLv*skill.sheetData.attack_scaling_lv)*skill.sheetData.display_scaling);
        //     var strs = desc.split("value1");
        //     desc = HtmlUtils.addColor(strs[0],htmlColor1,font) +  HtmlUtils.addColor(v.toString(),htmlColor2,font) + HtmlUtils.addColor(strs[1],htmlColor1,font);
        // }
        // else if (desc.search("value2") != -1)
        // {
        //     var index = 0;
        //     var strs = desc.split("value2");
        //     var finalDesc = "";

        //     for (let i = 0; i < strs.length; i++) {
        //         var nomralStr = HtmlUtils.addColor(strs[i],htmlColor1,font);
        //         var valueStr = "";
        //         if(i != strs.length -1)
        //         {
        //             if(skill.sheetData.passive_effs.length > index)
        //             {
        //                 var passiveNo = skill.sheetData.passive_effs[index];
        //                 var passiveVo = Passive_skillVo.get(passiveNo);
        //                 if(passiveVo&&passiveVo.para)
        //                 {
        //                     var v = Math.floor((passiveVo.para * displayerLv + passiveVo.para2)*skill.sheetData.display_scaling);
        //                     valueStr = HtmlUtils.addColor(v.toString(),htmlColor2,font)
        //                     index ++;
        //                 }
        //             }
        //         }
        //         finalDesc += nomralStr + valueStr;
        //     }
        //     desc = finalDesc;
        // }
        // else
        // {
        //     desc = HtmlUtils.addColor(desc,htmlColor1,font);
        // }

        if (desc.search("value") != -1) {
            //value1
            var v = Math.floor((skill.sheetData.attack_scaling + displayerLv * skill.sheetData.attack_scaling_lv) * skill.sheetData.display_scaling);
            desc = desc.replace("[value1]", v + "");
            //value2
            if (skill.sheetData.passive_effs && skill.sheetData.passive_effs.length > 0) {
                for (let i = 0; i < skill.sheetData.passive_effs.length; i++) {
                    var passiveNo = skill.sheetData.passive_effs[i];
                    var passiveVo = Passive_skillVo.get(passiveNo);
                    if (passiveVo && passiveVo.para) {
                        var v = Math.floor((passiveVo.para * displayerLv + passiveVo.para2) * skill.sheetData.display_scaling);
                        // var valueStr = HtmlUtils.addColor(v.toString(), htmlColor2, font)
                    }
                    desc = desc.replace("[value2]", v+"");
                }
            }
            //value3
            var v = Math.floor(skill.sheetData.innate_dam + displayerLv * skill.sheetData.lv_innate_dam);
            desc = desc.replace("[value3]", v + "");

            desc = ChatUtil.getReplaceTips(desc, []);
        }
        else {
            desc = HtmlUtils.addColor(desc, htmlColor1, font);
        }
        return desc;
    }

    public static GuildSkillDesc(skill: GuildSkill, htmlColor1: string = "", font: number = 18, htmlColor2: string = ""): string {
        var desc = skill.sheetDataGS.desc as string;
        var displayerLv = skill.Lv;
        if (displayerLv == 0) {
            displayerLv = 1;
        }
        if (desc.search("value") != -1) {
            var attr = skill.sheetDataGS.attr;
            for (let i = 0; i < attr.length; i++) {
                var index = i + 1;
                try {
                    var attrNum = Math.ceil(attr[i][1] * Guild_skill_up_cons_configVo.get(skill.Lv).coef) + "";
                    desc = desc.replace("[value" + index + "]", attrNum);
                } catch (error) {
                    throw new Error("已有帮派，但帮派技能=====" + skill.Id + "=====没有传过来，或者传过来的为0级");
                }
            }
            desc = ChatUtil.getReplaceTips(desc, []);
            // var v =  Math.floor(skill.sheetDataGS.attr[0][1] * skill.Lv);
            // var strs = desc.split("value");
            // desc = HtmlUtils.addColor(strs[0],htmlColor1,font) +  HtmlUtils.addColor(v.toString(),htmlColor2,font) + HtmlUtils.addColor(strs[1],htmlColor1,font);
        }
        else {
            desc = HtmlUtils.addColor(desc, htmlColor1, font);
        }
        return desc;
    }


    /**
     * 
     * @param target_count 
     * @param desc 
     * @param htmlColor 数值颜色
     * @param font 
     * @param htmlColor1 其他文本颜色
     */
    public static NomralDesc(target_count: number, desc: string, htmlColor: string = "", font: number = 18, htmlColor1: string = ""): string {
        if (desc.search("%target_count") != -1) {
            if (htmlColor != "") {
                var strs = desc.split("%target_count");
                return HtmlUtils.addColor(strs[0], htmlColor1, font) + HtmlUtils.addColor(target_count.toString(), htmlColor, font) + HtmlUtils.addColor(strs[1], htmlColor1, font);
            }
            else {
                return desc.replace("%target_count", target_count.toString());
            }

        }
        else {
            return HtmlUtils.addColor(desc, htmlColor1, font);
        }

    }
    /**
     * 额外技能伤害
     * @param skill 
     * @param htmlColor 数值颜色
     * @param font 
     * @param htmlColor1 其他文本颜色
     */
    public static extAttackDesc(skill: Skill, htmlColor: string = "", font: number = 18, htmlColor1: string = ""): string {
        var str = "";
        if (skill.sheetData == null)
            return str;
        if (SRoleData.instance.info == null)
            return str;
        if (skill.sheetData.att_type != 1 && skill.sheetData.att_type != 2 && skill.sheetData.att_type != 206)
            return str;
        if (skill.sheetData.show_attr_name == "")
            return str;
        str = "额外伤害：造成" + skill.sheetData.show_attr_name;
        if (htmlColor1 != "") {
            str = HtmlUtils.addColor(str, htmlColor1, font);
        }
        /**
         * 显示等级如果0那就1
         */
        var displayerLv = skill.Lv;
        if (displayerLv == 0) {
            displayerLv = 1;
        }

        var v = (skill.sheetData.ext_coef + displayerLv * skill.sheetData.ext_coef_lv) * 100;
        var vStr = v + "%";
        if (htmlColor != "") {
            str += HtmlUtils.addColor(vStr, htmlColor, font);
        }
        else {
            str += vStr;
        }
        var str2 = "的加成";
        if (htmlColor1 != "") {
            str2 = HtmlUtils.addColor(str2, htmlColor1, font);;
        }
        str += str2;
        return str;
    }
    /**
     * 技能加成
     * @param skill 
     * @param htmlColor 数值颜色
     * @param font 
     * @param htmlColor1 其他文本颜色
     */
    public static SkillScale(skill: Skill, font: number = 18, htmlColor1: string = ""): string {
        var str = "";
        if (skill.sheetData == null)
            return str;
        if (SRoleData.instance.info == null)
            return str;
        if (skill.sheetData.att_type != 1 && skill.sheetData.att_type != 2 && skill.sheetData.att_type != 206)
            return str;
        var htmlColor: string = "";
        var attrType = 0;
        var attrValue = 0;
        var str1 = "";
        switch (skill.sheetData.att_type) {
            case 1:
                {
                    attrType = PropertyEnumCode.OI_CODE_PHY_ATT;
                    attrValue = SRoleData.instance.info.PhyAtt;
                    str1 = "点物理攻击";
                    str = "伤害：造成";
                    htmlColor = "Red";
                    break;
                }
            case 2:
                {
                    attrType = PropertyEnumCode.OI_CODE_MAG_ATT;
                    attrValue = SRoleData.instance.info.MagAtt;
                    str1 = "点魔法攻击";
                    str = "伤害：造成";
                    htmlColor = "Blue";
                    break;
                }

            case 206:
                {
                    attrType = PropertyEnumCode.OI_CODE_HEAL_VALUE;
                    attrValue = SRoleData.instance.info.HealValue;
                    str1 = "点医疗效果";
                    str = "医疗：造成";
                    htmlColor = "Green";
                    break;
                }
        }
        var displayerLv = skill.Lv;
        if (displayerLv == 0) {
            displayerLv = 1;
        }
        if (htmlColor1 != "") {
            str = HtmlUtils.addColor(str, htmlColor1, font);
        }
        var data = PropertyVo.get(attrType);
        if (data != null) {
            var v = Math.floor(attrValue / data.ratio * (skill.sheetData.attack_scaling + displayerLv * skill.sheetData.attack_scaling_lv));
            if (htmlColor != "") {
                str += HtmlUtils.addColor(v.toString(), htmlColor, font) + HtmlUtils.addColor(str1, htmlColor1, font);
            }
            else {
                str += v.toString() + str1;
            }
        }
        return str;
    }
}