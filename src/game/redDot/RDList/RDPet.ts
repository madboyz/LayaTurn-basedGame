import { RedDotBase } from "../RedDotBase";
import { SPetData } from "../../../net/data/SPetData";
import { Pet_tujian_cfgVo } from "../../../db/sheet/vo/Pet_tujian_cfgVo";
import { SBagData } from "../../../net/data/SBagData";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { Pet_dianhua_cfgVo } from "../../../db/sheet/vo/Pet_dianhua_cfgVo";
import { SkillVo } from "../../../db/sheet/vo/SkillVo";
import { Pet_dianhua_skill_cfgVo } from "../../../db/sheet/vo/Pet_dianhua_skill_cfgVo";
import { S17009_4 } from "../../../net/pt/pt_17";
import { PetInfo } from "../../ui/compent/data/PetInfo";

export class RDPetAddPoint extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.PET)) {
            return false;
        }
        return SPetData.instance.canAddPoint;
    }
}

export class RDPetCanActive extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.PET)) {
            return false;
        }
        var petList = SPetData.instance.allData;
        for (let index = 0; index < petList.length; index++) {
            var ele = petList[index];
            if (ele.canActive) {
                return true;
            }
        }
        return false;
    }
}

export class RDPetTujian extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.PET)) {
            return false;
        }
        var petList = SPetData.instance.allData;
        for (let index = 0; index < petList.length; index++) {
            var ele = petList[index];
            if (ele.active) {
                var cfg = Pet_tujian_cfgVo.getByLv(ele.PartnerNo, 1);
                var itemId = cfg.cost[0];
                var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
                if (itemNum > 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

export class RDPetDianhua extends RedDotBase {
    static checkOnePetDianhua(petinfo: PetInfo): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_PET_DIANHUA)) {
            return false;
        }
        //有点化道具
        var itemId = ConstVo.get("PARTNER_DIANHUA_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        if (itemNum > 0) {
            return true;
        }
        //有技能可升阶
        var skillCfg = Pet_dianhua_cfgVo.getSkillCfg();
        if (petinfo.active) {
            //等级是否够
            var cfgLv = ConstVo.get("PAR_DIANHUA_UPGRADE_NEED_LV").val;
            var lvOk = petinfo.Lv >= cfgLv;
            if (!lvOk) {
                return false;
            }
            for (let i = 0; i < 3; i++) {
                var thisId = skillCfg[i].passive_skill[0];
                // var vo = SkillVo.get(thisId);
                // var skillData = new Skill(thisId);
                if (petinfo.DianhuaLv < skillCfg[i].no) {
                    continue;
                } else {
                    var skillInfo: S17009_4;
                    for (let i = 0; i < petinfo.item_4.length; i++) {
                        var ele = petinfo.item_4[i];
                        if (ele.SkillNo == thisId) {
                            skillInfo = ele;
                            break;
                        }
                    }
                    if (!skillInfo) {
                        continue;
                    }
                    //升级，后面没有推新技能过来，应该有的话，自己创界一个
                    var cfg = Pet_dianhua_skill_cfgVo.getByLv(skillInfo.SkillNo, skillInfo.SkillLv + 1);
                    var isFull = cfg == null;
                    if (isFull) {
                        continue;
                    }
                    var costItem = cfg.cost[0];
                    var iHave = SBagData.instance.prop.getItemCountByGoodsNo(costItem[0]);
                    var enough = iHave >= costItem[1];
                    if (enough) {
                        return true;
                    }
                }
            }
        }
        return false;
    }


    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_PET_DIANHUA)) {
            return false;
        }
        //有点化道具
        var itemId = ConstVo.get("PARTNER_DIANHUA_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        if (itemNum > 0) {
            return true;
        }
        //有技能可升阶
        var petList = SPetData.instance.allData;
        var skillCfg = Pet_dianhua_cfgVo.getSkillCfg();
        for (let index = 0; index < petList.length; index++) {
            var petinfo = petList[index];
            if (petinfo.active) {
                //等级是否够
                var cfgLv = ConstVo.get("PAR_DIANHUA_UPGRADE_NEED_LV").val;
                var lvOk = petinfo.Lv >= cfgLv;
                if (!lvOk) {
                    continue;
                }
                for (let i = 0; i < 3; i++) {
                    var thisId = skillCfg[i].passive_skill[0];
                    // var vo = SkillVo.get(thisId);
                    // var skillData = new Skill(thisId);
                    if (petinfo.DianhuaLv < skillCfg[i].no) {
                        continue;
                    } else {
                        var skillInfo: S17009_4;
                        for (let i = 0; i < petinfo.item_4.length; i++) {
                            var ele = petinfo.item_4[i];
                            if (ele.SkillNo == thisId) {
                                skillInfo = ele;
                                break;
                            }
                        }
                        if (!skillInfo) {
                            continue;
                        }
                        //升级，后面没有推新技能过来，应该有的话，自己创界一个
                        var cfg = Pet_dianhua_skill_cfgVo.getByLv(skillInfo.SkillNo, skillInfo.SkillLv + 1);
                        var isFull = cfg == null;
                        if (isFull) {
                            continue;
                        }
                        var costItem = cfg.cost[0];
                        var iHave = SBagData.instance.prop.getItemCountByGoodsNo(costItem[0]);
                        var enough = iHave >= costItem[1];
                        if (enough) {
                            return true;
                        }
                    }
                }
            }
        }



        return false;
    }
}

export class RDPetShouling extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_PET_SHOULING)) {
            return false;
        }
        var itemId = ConstVo.get("PARTNER_SPIRIT_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        if (itemNum > 0) {
            return true;
        }
        return false;
    }
}

export class RDPetEquip extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.PET)) {
            return false;
        }
        var allData = SPetData.instance.allData;
        for (let i = 0; i < allData.length; i++) {
            const element = allData[i];
            if (!element.active) {
                continue;
            }
            for (let j = 1; j <= 3; j++) {
                var showBtn = SBagData.instance.petEquip.checkOneCanEquip(element, j);
                if (showBtn) {
                    return true;
                }
            }
        }
        return false;
    }
}

export class RDPetLevel extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.PET_UPGRADE)) {
            return false;
        }
        return SPetData.instance.canLevel;
    }
}

export class RDPetTrain extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.PET_XIULIAN)) {
            return false;
        }
        return SPetData.instance.canTrain;
    }
}

export class RDPetRefine extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.PET_LIANHUA)) {
            return false;
        }
        return SPetData.instance.canRefine;
    }
}


export class RDPetSkill extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.PET_SKILL)) {
            return false;
        }
        return SPetData.instance.canLearnSkill;
    }
}