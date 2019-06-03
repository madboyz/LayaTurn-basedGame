import { SheetManager } from "../SheetManager";
import { CLIFFORD_REWARD_BASE } from "../base/CLIFFORD_REWARD_BASE";

export class Clifford_rewardVo extends CLIFFORD_REWARD_BASE{

   public static get(id : number,index : number = -1):Clifford_rewardVo{
           if(this[id])return this[id];
           var vo : Clifford_rewardVo = new Clifford_rewardVo();
             this[id] = vo;
           return SheetManager.get("clifford_reward",id,this[id],vo.keys(),index);
    }
}