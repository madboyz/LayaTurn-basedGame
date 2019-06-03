import { SheetManager } from "../SheetManager";
import { RANK_BASE } from "../base/RANK_BASE";

export class RankVo extends RANK_BASE{

   public static get(id : number,index : number = -1):RankVo{
           if(this[id])return this[id];
           var vo : RankVo = new RankVo();
             this[id] = vo;
           return SheetManager.get("rank",id,this[id],vo.keys(),index);
    }
}