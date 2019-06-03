import { SheetManager } from "../SheetManager";
import { ANSWER_REWARD_BASE } from "../base/ANSWER_REWARD_BASE";

export class Answer_rewardVo extends ANSWER_REWARD_BASE{

   public static get(id : number,index : number = -1):Answer_rewardVo{
           if(this[id])return this[id];
           var vo : Answer_rewardVo = new Answer_rewardVo();
             this[id] = vo;
           return SheetManager.get("answer_reward",id,this[id],vo.keys(),index);
    }
}