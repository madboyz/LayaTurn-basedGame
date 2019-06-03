import { Recharge_reward_cfgVo } from "../../../db/sheet/vo/Recharge_reward_cfgVo";
import { SRoleData } from "../../../net/data/SRoleData";
import { SRechargeData } from "../../ui/view/recharge/data/SRechargeData";
import { GameUtils } from "../../utils/GameUtils";
import { RedDotBase } from "../RedDotBase";
import { Rmb_shopVo } from "../../../db/sheet/vo/Rmb_shopVo";

export class RDYueka extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        // var openFuc = UIManager.instance.fuc;
        // if (openFuc && !openFuc.hasOpen(UIID.SYS_TOWER)) {
        //     return false;
        // }
        var info = SRechargeData.instance.yuekaData;
        if (info && info.Bought == 1 && info.ExpiredTime > GameUtils.TimeStamp && info.Rewarded == 0) {
            return true;
        }
        return false;
    }
}

export class RDTouzijihua extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        // var openFuc = UIManager.instance.fuc;
        // if (openFuc && !openFuc.hasOpen(UIID.SYS_TOWER)) {
        //     return false;
        // }
        var info = SRechargeData.instance.touzijihuaDetail;
        if (info && info.Bought == 1) {
            var cfgList = Rmb_shopVo.get(2).extra;
            for (let i = 0; i < cfgList.length; i++) {
                var cfg = cfgList[i];
                if(SRoleData.instance.info.Lv < cfg[0]){
                    continue;
                }
                var hadGet = SRechargeData.instance.touzijihuaLvGet(cfg[0]);
                if (hadGet) {
                    continue;
                }else{
                    return true;
                }
            }
        }
        return false;
    }
}

export class RDRechargeReward extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        // var openFuc = UIManager.instance.fuc;
        // if (openFuc && !openFuc.hasOpen(UIID.SYS_TOWER)) {
        //     return false;
        // }
        var info = SRechargeData.instance.rechargeReward;
        if (info) {
            var cfgList = Recharge_reward_cfgVo.getAll();
            for (let i = 0; i < cfgList.length; i++) {
                var cfg = cfgList[i];
                if(info.RechargeAcc < cfg.need_pay){
                    continue;
                }
                var hadGet = SRechargeData.instance.rechargeRewardGet(cfg.no);
                if (hadGet) {
                    continue;
                }else{
                    return true;
                }
            }
        }
        return false;
    }
}
