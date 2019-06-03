import { RedDotBase } from "../RedDotBase";
import { SBagData } from "../../../net/data/SBagData";
import { SSkillData } from "../../skill/SSkillData";
import { SRoleData } from "../../../net/data/SRoleData";
import { SChapterData } from "../../chapter/SChapterData";
import { ItemData } from "../../ui/compent/data/ItemData";

//人物装备红点
export class RDRoleEquip extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        return (SBagData.instance.equip.equipList.length > 0)
    }
}

//人物是否可以加点
export class RDRoleAddpoint extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        return (SRoleData.instance.info.FreeTalentPoints > 0)
    }
}

//人物个人技能红点
export class RDRoleBaseSkill extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        return SSkillData.instance.SkillRedUpdate();
    }
}

//人物帮派红点
export class RDRoleGuildSkill extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        return SSkillData.instance.GuildSkillRed() ;
    }
}

//人物经脉红点
export class RDRoleJinMai extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ROLE_JINGMAI)) {
            return false;
        }
        return SRoleData.instance.JinMaiRed;
    }
}

//人物心法红点
export class RDRoleXingFa extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ROLE_XINGFA)) {
            return false;
        }
        return SRoleData.instance.HearMethodRed;
    }
}

//人物成就红点
export class RDRoleAchievement extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        return SChapterData.instance.RoleAchievementRed;
    }
}

export class RDPetAchievement extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        return SChapterData.instance.PetAchievementRed;
    }
}

export class RDRideAchievement extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        return SChapterData.instance.RideAchievementRed;
    }
}

export class RDComateAchievement extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        return SChapterData.instance.ComateAchievementRed;
    }
}

export class RDOtherAchievement extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_ACHIEVEN_PANEL)) {
            return false;
        }
        return SChapterData.instance.OtherAchievementRed;
    }
}

export class RDFabao extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        // return (SBagData.instance.fabao.equipList.length > 0)
        var noEquioType = [];
        for (let i = EquipSubType.EQ_JEWELRT_RING; i <= EquipSubType.EQ_JEWELRT_PENDANT; i++) {
            noEquioType.push(i);
        }
        var equipList: ItemData[] = SBagData.instance.role.allItems;
        for (let i = 0; i < equipList.length; i++) {
            const element = equipList[i];
            var typeIndex = noEquioType.indexOf(element.equipPos);
            if (typeIndex >= 0) {
                noEquioType.splice(typeIndex, 1);
            }
        }
        var arr: Array<ItemData> = SBagData.instance.fabao.equipList;
        if (arr.length > 0) {
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (noEquioType.indexOf(element.equipPos) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
}
