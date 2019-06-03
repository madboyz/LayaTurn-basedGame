import { SheetManager } from "../SheetManager";
import { ARENA_HONOR_REWARD_BASE } from "../base/ARENA_HONOR_REWARD_BASE";

export class Arena_honor_rewardVo extends ARENA_HONOR_REWARD_BASE{

   public static get(id : number,index : number = -1):Arena_honor_rewardVo{
           if(this[id])return this[id];
           var vo : Arena_honor_rewardVo = new Arena_honor_rewardVo();
             this[id] = vo;
           return SheetManager.get("arena_honor_reward",id,this[id],vo.keys(),index);
    }
}