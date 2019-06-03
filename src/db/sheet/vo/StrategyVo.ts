import { SheetManager } from "../SheetManager";
import { STRATEGY_BASE } from "../base/STRATEGY_BASE";

export class StrategyVo extends STRATEGY_BASE{

   public static get(id : number,index : number = -1):StrategyVo{
           if(this[id])return this[id];
           var vo : StrategyVo = new StrategyVo();
             this[id] = vo;
           return SheetManager.get("strategy",id,this[id],vo.keys(),index);
    }
}