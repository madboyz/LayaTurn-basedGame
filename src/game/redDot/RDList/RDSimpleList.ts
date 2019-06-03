import { SActiveRewardData } from "../../ui/view/dayReward/data/SActiveRewardData";
import { RedDotBase } from "../RedDotBase";
import { SSignInData } from "../../ui/view/signIn/data/SSignInData";
import { GameUtils } from "../../utils/GameUtils";
import { SOpenServiceActivityData } from "../../ui/view/openServiceActivity/data/SOpenServiceActivityData";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { Npc_goods_exchangeVo } from "../../../db/sheet/vo/Npc_goods_exchangeVo";
import { SBagData } from "../../../net/data/SBagData";
import { Cost_get_reward_cfgVo } from "../../../db/sheet/vo/Cost_get_reward_cfgVo";

//七天登录奖励
export class RDSevenDayReward extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        return SActiveRewardData.instance.sevenDayRewardRed;
    }
}

//等级奖励红点
export class RDLvReward extends RedDotBase {
    //获取红点是否激活
    GetIsActive(): boolean {
        return SActiveRewardData.instance.lvRewardRed;
    }
}

//签到奖励红点
export class RDSignInReward extends RedDotBase {
    GetIsActive(): boolean {
        if (!SSignInData.instance.monthSignInList) {
            return false;
        }
        var thisDay = (new Date(GameUtils.TimeStamp * 1000).getDate());
        return !SSignInData.instance.monthSignInList[thisDay - 1].sign;
    }
}

//开服兑换
export class RDOSChange extends RedDotBase {
    GetIsActive(): boolean {
        if (!SOpenServiceActivityData.instance.OSChangeIsOpen()) {
            return false;
        }
        var cfgs = ConstVo.get("DUIHUANID").val;
        for (let i = 0; i < cfgs.length; i++) {
            var ele = cfgs[i];
            var timeData = SOpenServiceActivityData.instance.getOSChangeData(ele);
            var cfg = Npc_goods_exchangeVo.get(ele);
            var maxTime = cfg.limit_time;
            var needGood = cfg.need_goods_list;
            var leftTime = maxTime - (timeData ? timeData.Num : 0);
            var canChange = true;
            for (let i = 0; i < needGood.length; i++) {
                var itemCellCfg = needGood[i];
                if (itemCellCfg) {
                    var num = SBagData.instance.prop.getItemCountByGoodsNo(itemCellCfg[0]);
                    canChange = canChange && num >= itemCellCfg[1];
                }
            }
            canChange = canChange && (maxTime == 0 || leftTime > 0);
            if(canChange){
                return true;
            }
        }
        return false;
    }
}

//消耗有礼
export class RDOSCost extends RedDotBase {
    GetIsActive(): boolean {
        if (!SOpenServiceActivityData.instance.OSCostIsOpen()) {
            return false;
        }
        var cfgs = Cost_get_reward_cfgVo.getAll();
        for (let i = 0; i < cfgs.length; i++) {
            var ele = cfgs[i];
            var serverData = SOpenServiceActivityData.instance.getCostDataById(ele.no);
            if(!serverData){
                continue;
            }
            var hadGet = serverData.State == 2;
            var canGet = serverData.Num >=  ele.count;
            if(!hadGet && canGet){
                return true;
            }
        }
        return false;
    }
}
