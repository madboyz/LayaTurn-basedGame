import { SheetManager } from "../SheetManager";
import { RANK_REWARD_CFG_BASE } from "../base/RANK_REWARD_CFG_BASE";

export class Rank_reward_cfgVo extends RANK_REWARD_CFG_BASE{

   public static get(id : number,index : number = -1):Rank_reward_cfgVo{
           if(this[id])return this[id];
           var vo : Rank_reward_cfgVo = new Rank_reward_cfgVo();
             this[id] = vo;
           return SheetManager.get("rank_reward_cfg",id,this[id],vo.keys(),index);
    }
}