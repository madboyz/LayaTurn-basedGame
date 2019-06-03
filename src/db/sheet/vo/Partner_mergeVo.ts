import { SheetManager } from "../SheetManager";
import { PARTNER_MERGE_BASE } from "../base/PARTNER_MERGE_BASE";

export class Partner_mergeVo extends PARTNER_MERGE_BASE{

   public static get(id : number,index : number = -1):Partner_mergeVo{
           if(this[id])return this[id];
           var vo : Partner_mergeVo = new Partner_mergeVo();
             this[id] = vo;
           return SheetManager.get("partner_merge",id,this[id],vo.keys(),index);
    }
}