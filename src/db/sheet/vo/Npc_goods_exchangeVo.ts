import { SheetManager } from "../SheetManager";
import { NPC_GOODS_EXCHANGE_BASE } from "../base/NPC_GOODS_EXCHANGE_BASE";

export class Npc_goods_exchangeVo extends NPC_GOODS_EXCHANGE_BASE{

   public static get(id : number,index : number = -1):Npc_goods_exchangeVo{
           if(this[id])return this[id];
           var vo : Npc_goods_exchangeVo = new Npc_goods_exchangeVo();
             this[id] = vo;
           return SheetManager.get("npc_goods_exchange",id,this[id],vo.keys(),index);
    }
}