import { SheetManager } from "../SheetManager";
import { ARENA_CHAL_REWARD_BASE } from "../base/ARENA_CHAL_REWARD_BASE";

export class Arena_chal_rewardVo extends ARENA_CHAL_REWARD_BASE{

   public static get(id : number,index : number = -1):Arena_chal_rewardVo{
           if(this[id])return this[id];
           var vo : Arena_chal_rewardVo = new Arena_chal_rewardVo();
             this[id] = vo;
           return SheetManager.get("arena_chal_reward",id,this[id],vo.keys(),index);
    }
}