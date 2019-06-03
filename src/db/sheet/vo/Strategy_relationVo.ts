import { SheetManager } from "../SheetManager";
import { STRATEGY_RELATION_BASE } from "../base/STRATEGY_RELATION_BASE";

export class Strategy_relationVo extends STRATEGY_RELATION_BASE{

   public static get(id : number,index : number = -1):Strategy_relationVo{
           if(this[id])return this[id];
           var vo : Strategy_relationVo = new Strategy_relationVo();
             this[id] = vo;
           return SheetManager.get("strategy_relation",id,this[id],vo.keys(),index);
    }
}