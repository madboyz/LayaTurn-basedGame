import { SheetManager } from "../SheetManager";
import { PVE_ACT_RANK_AWARD_BASE } from "../base/PVE_ACT_RANK_AWARD_BASE";

export class Pve_act_rank_awardVo extends PVE_ACT_RANK_AWARD_BASE{

   public static get(id : number,index : number = -1):Pve_act_rank_awardVo{
           if(this[id])return this[id];
           var vo : Pve_act_rank_awardVo = new Pve_act_rank_awardVo();
             this[id] = vo;
           return SheetManager.get("pve_act_rank_award",id,this[id],vo.keys(),index);
    }
}