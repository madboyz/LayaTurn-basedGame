import { SheetManager } from "../SheetManager";
import { CHARGE_REWARD_BASE } from "../base/CHARGE_REWARD_BASE";

export class Charge_rewardVo extends CHARGE_REWARD_BASE{

   public static get(id : number,index : number = -1):Charge_rewardVo{
           if(this[id])return this[id];
           var vo : Charge_rewardVo = new Charge_rewardVo();
             this[id] = vo;
           return SheetManager.get("charge_reward",id,this[id],vo.keys(),index);
    }
}