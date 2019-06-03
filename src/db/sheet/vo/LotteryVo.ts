import { SheetManager } from "../SheetManager";
import { LOTTERY_BASE } from "../base/LOTTERY_BASE";

export class LotteryVo extends LOTTERY_BASE{

   public static get(id : number,index : number = -1):LotteryVo{
           if(this[id])return this[id];
           var vo : LotteryVo = new LotteryVo();
             this[id] = vo;
           return SheetManager.get("lottery",id,this[id],vo.keys(),index);
    }
}