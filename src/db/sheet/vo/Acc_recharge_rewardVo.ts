import { SheetManager } from "../SheetManager";
import { ACC_RECHARGE_REWARD_BASE } from "../base/ACC_RECHARGE_REWARD_BASE";

export class Acc_recharge_rewardVo extends ACC_RECHARGE_REWARD_BASE{

   public static get(id : number,index : number = -1):Acc_recharge_rewardVo{
           if(this[id])return this[id];
           var vo : Acc_recharge_rewardVo = new Acc_recharge_rewardVo();
             this[id] = vo;
           return SheetManager.get("acc_recharge_reward",id,this[id],vo.keys(),index);
    }
}