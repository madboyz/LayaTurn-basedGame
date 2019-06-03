import { SheetManager } from "../SheetManager";
import { UPGRADE_AWARD_BASE } from "../base/UPGRADE_AWARD_BASE";

export class Upgrade_awardVo extends UPGRADE_AWARD_BASE{

   public static get(id : number,index : number = -1):Upgrade_awardVo{
           if(this[id])return this[id];
           var vo : Upgrade_awardVo = new Upgrade_awardVo();
             this[id] = vo;
           return SheetManager.get("upgrade_award",id,this[id],vo.keys(),index);
    }
}