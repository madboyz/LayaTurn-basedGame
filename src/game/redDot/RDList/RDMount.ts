import { RedDotBase } from "../RedDotBase";
import { SMountData } from "../../../net/data/SmountData";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { SBagData } from "../../../net/data/SBagData";
import { Mount_bianyi_cfgVo } from "../../../db/sheet/vo/Mount_bianyi_cfgVo";
import { SkillVo } from "../../../db/sheet/vo/SkillVo";
import { S60001_3 } from "../../../net/pt/pt_60";
import { Mount_bianyi_skill_cfgVo } from "../../../db/sheet/vo/Mount_bianyi_skill_cfgVo";


export class RDMountZonglan extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_MOUNT)) {
            return false;
        }
        return SMountData.instance.canLevel;
    }
}

export class RDMountLevel extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_MOUNT)) {
            return false;
        }
        return SMountData.instance.canLevel;
    }
}

export class RDMountBianyi extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_MOUNT)) {
            return false;
        }
        //道具红点
        var itemId = ConstVo.get("AEROCRAFT_VARIATION_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        if (itemNum > 0) {
            return true;
        }
        //技能升级
        var mountinfo = SMountData.instance.curInfo;
        var skillCfg = Mount_bianyi_cfgVo.getSkillCfg();
        for (let i = 0; i < 3; i++) {
            //等级是否够
            var cfgLv = ConstVo.get("AEROCRAFT_VARIATION_UPGRADE_NEED_LV").val;
            var lvOk = mountinfo && mountinfo.AerocraftLv >= cfgLv;
            if (!lvOk) {
                return false;
            }
            for (let i = 0; i < 3; i++) {
                var thisId = skillCfg[i].passive_skill[0];
                if (mountinfo.VariationLv < skillCfg[i].no) {
                    continue;
                } else {
                    var skillInfo: S60001_3;
                    for (let i = 0; i < mountinfo.item_3.length; i++) {
                        var ele = mountinfo.item_3[i];
                        if (ele.SkillNo == thisId) {
                            skillInfo = ele;
                            break;
                        }
                    }
                    if (!skillInfo) {
                        continue;
                    }
                    //升级，后面没有推新技能过来，应该有的话，自己创界一个
                    var cfg = Mount_bianyi_skill_cfgVo.getByLv(skillInfo.SkillNo, skillInfo.SkillLv + 1);
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
}

export class RDMountLingjing extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_MOUNT)) {
            return false;
        }
        //道具升级
        var itemId = ConstVo.get("AEROCRAFT_SPIRIT_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        if (itemNum > 0) {
            return true;
        }
        for (let j = 1; j <= 3; j++) {
            var showBtn = SBagData.instance.mountEquip.checkOneCanEquip(j);
            if (showBtn) {
                return true;
            }
        }
        return false;
    }
}

export class RDMountStar extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_MOUNT_STAR)) {
            return false;
        }
        return SMountData.instance.canStar;
    }
}

export class RDMountFly extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_MOUNT_FEISHENG)) {
            return false;
        }
        return SMountData.instance.canFly;
    }
}