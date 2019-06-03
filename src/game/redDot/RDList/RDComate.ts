import { SComateData } from "../../ui/view/comate/data/SComateData";
import { RedDotBase } from "../RedDotBase";
import { Comate_yuanfen_cfgVo } from "../../../db/sheet/vo/Comate_yuanfen_cfgVo";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { SBagData } from "../../../net/data/SBagData";
import { ComateInfo } from "../../ui/view/comate/data/ComateInfo";
import { Comate_yuanshen_cfgVo } from "../../../db/sheet/vo/Comate_yuanshen_cfgVo";
import { S37001_3 } from "../../../net/pt/pt_37";
import { Comate_yuanshen_skill_cfgVo } from "../../../db/sheet/vo/Comate_yuanshen_skill_cfgVo";
import { Comate_mingge_hole_cfgVo } from "../../../db/sheet/vo/Comate_mingge_hole_cfgVo";

export class RDComateInfo extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE)) {
            return false;
        }
        return SComateData.instance.InfoRed;
    }
}

export class RDComateLv extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE_LVUP)) {
            return false;
        }
        return SComateData.instance.LvRed;
    }
}

export class RDComateStar extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE_STAR)) {
            return false;
        }
        return SComateData.instance.StarRed;
    }
}

export class RDComateTalentLearn extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE_TALENT)) {
            return false;
        }
        return SComateData.instance.TalentRed;
    }
}

export class RDCComateTalentChange extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE_TALENT)) {
            return false;
        }
        return SComateData.instance.TalentChangeRed;
    }
}

export class RDComateYuanfen extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE)) {
            return false;
        }
        var cfgs = Comate_yuanfen_cfgVo.getAll();
        for (let i = 0; i < cfgs.length; i++) {
            var cfg = cfgs[i];
            var isHave = true;//整体是否激活
            var canUp = true;//可以升级
            var itemStar = SComateData.instance.getYuanfenStarLv(cfg.no);
            for (let i = 1; i <= 4; i++) {
                var showId = cfg.unlock_condition[i - 1];
                if (showId > 0) {
                    var cellData = SComateData.instance.getComateByNo(showId);
                    isHave = isHave && cellData.IsHave;
                    canUp = canUp && cellData.StarLv > itemStar;
                }
            }
            if (isHave && canUp) {
                return true;
            }
        }
        return false;
    }
}

export class RDComateTupo extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE)) {
            return false;
        }
        var itemId = ConstVo.get("COMRADE_BREAK_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        if (itemNum > 0) {
            return true;
        }
        return false;
    }
}

export class RDComateYuanshen extends RedDotBase {
    static checkOnePetDianhua(comateInfo: ComateInfo): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE)) {
            return false;
        }
        //有点化道具
        var itemId = ConstVo.get("COMRADE_SPIRIT_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        if (itemNum > 0) {
            return true;
        }
        //有技能可升阶
        var skillCfg = Comate_yuanshen_cfgVo.getSkillCfg();
        if (comateInfo.IsHave) {
            //等级是否够
            var cfgLv = ConstVo.get("COMRADE_SPIRIT_UPGRADE_NEED_LV").val;
            var lvOk = comateInfo.Lv >= cfgLv;
            if (!lvOk) {
                return false;
            }
            for (let i = 0; i < 3; i++) {
                var thisId = skillCfg[i].passive_skill[0];
                // var vo = SkillVo.get(thisId);
                // var skillData = new Skill(thisId);
                if (comateInfo.SpiritLv < skillCfg[i].no) {
                    continue;
                } else {
                    var skillInfo: S37001_3;
                    for (let i = 0; i < comateInfo.item_3.length; i++) {
                        var ele = comateInfo.item_3[i];
                        if (ele.SkillNo == thisId) {
                            skillInfo = ele;
                            break;
                        }
                    }
                    if (!skillInfo) {
                        continue;
                    }
                    //升级，后面没有推新技能过来，应该有的话，自己创界一个
                    var cfg = Comate_yuanshen_skill_cfgVo.getByLv(skillInfo.SkillNo, skillInfo.SkillLv + 1);
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
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE)) {
            return false;
        }
        //有点化道具
        var itemId = ConstVo.get("COMRADE_SPIRIT_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        if (itemNum > 0) {
            return true;
        }
        //有技能可升阶
        var petList = SComateData.instance.allData;
        var skillCfg = Comate_yuanshen_cfgVo.getSkillCfg();
        for (let index = 0; index < petList.length; index++) {
            var comateInfo = petList[index];
            if (comateInfo.IsHave) {
                //等级是否够
                var cfgLv = ConstVo.get("COMRADE_SPIRIT_UPGRADE_NEED_LV").val;
                var lvOk = comateInfo.Lv >= cfgLv;
                if (!lvOk) {
                    continue;
                }
                for (let i = 0; i < 3; i++) {
                    var thisId = skillCfg[i].passive_skill[0];
                    // var vo = SkillVo.get(thisId);
                    // var skillData = new Skill(thisId);
                    if (comateInfo.SpiritLv < skillCfg[i].no) {
                        continue;
                    } else {
                        var skillInfo: S37001_3;
                        for (let i = 0; i < comateInfo.item_3.length; i++) {
                            var ele = comateInfo.item_3[i];
                            if (ele.SkillNo == thisId) {
                                skillInfo = ele;
                                break;
                            }
                        }
                        if (!skillInfo) {
                            continue;
                        }
                        //升级，后面没有推新技能过来，应该有的话，自己创界一个
                        var cfg = Comate_yuanshen_skill_cfgVo.getByLv(skillInfo.SkillNo, skillInfo.SkillLv + 1);
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


export class RDComateEquip extends RedDotBase {
    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE)) {
            return false;
        }
        var allData = SComateData.instance.allData;
        for (let i = 0; i < allData.length; i++) {
            const element = allData[i];
            if (!element.IsHave) {
                continue;
            }
            for (let j = 1; j <= 3; j++) {
                var showBtn = SBagData.instance.comateEquip.checkOneCanEquip(element, j);
                if (showBtn) {
                    return true;
                }
            }
        }
        return false;
    }
}

export class RDComateMingge extends RedDotBase {
    static checkOneMingge(comateInfo: ComateInfo): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE)) {
            return false;
        }
        if (comateInfo.IsHave) {
             //处理列表------------------
             var equipList = SComateData.instance.getOneKeyList(comateInfo);
             var addNum = 0;
             for (let i = 0; i < equipList.length; i++) {
                 if (equipList[i]) {
                     addNum++;
                 }
             }
             // 判断是否解锁
             for (let i = 0; i < 8; i++) {
                 var info = comateInfo.minggeHoleList[i + 1];
                 var showRed: boolean = false;
                 if (info) {
                     //有数据
                     if (equipList[info.cfg.type]) {
                         //有可替换
                         showRed = true;
                         addNum--;
                     }
                 } else {
                     var lvOk: boolean = comateInfo.Lv >= Comate_mingge_hole_cfgVo.get(i + 1).lv;
                     if (lvOk) {
                         showRed = addNum > 0;
                         addNum--;
                     }
                 }
                 if(showRed){
                     return true;
                 }
             }
        }
        return false;
    }


    GetIsActive(): boolean {
        var openFuc = UIManager.instance.fuc;
        if (openFuc && !openFuc.hasOpen(UIID.SYS_COMATE)) {
            return false;
        }
        var allData = SComateData.instance.allData;
        for (let i = 0; i < allData.length; i++) {
            const element = allData[i];
            if (!element.IsHave) {
                continue;
            }
            //处理列表------------------
            var equipList = SComateData.instance.getOneKeyList(element);
            var addNum = 0;
            for (let i = 0; i < equipList.length; i++) {
                if (equipList[i]) {
                    addNum++;
                }
            }
            // 判断是否解锁
            for (let i = 0; i < 8; i++) {
                var info = element.minggeHoleList[i + 1];
                var showRed: boolean = false;
                if (info) {
                    //有数据
                    if (equipList[info.cfg.type]) {
                        //有可替换
                        showRed = true;
                        addNum--;
                    }
                } else {
                    var lvOk: boolean = element.Lv >= Comate_mingge_hole_cfgVo.get(i + 1).lv;
                    if (lvOk) {
                        showRed = addNum > 0;
                        addNum--;
                    }
                }
                if(showRed){
                    return true;
                }
            }

        }
        return false;
    }
}