import { SheetManager } from "../SheetManager";
import { ARENA_WS_REWARD_BASE } from "../base/ARENA_WS_REWARD_BASE";

export class Arena_ws_rewardVo extends ARENA_WS_REWARD_BASE{

   public static get(id : number,index : number = -1):Arena_ws_rewardVo{
           if(this[id])return this[id];
           var vo : Arena_ws_rewardVo = new Arena_ws_rewardVo();
             this[id] = vo;
           return SheetManager.get("arena_ws_reward",id,this[id],vo.keys(),index);
    }
}