import { SheetManager } from "../SheetManager";
import { NPC_SHOP_BASE } from "../base/NPC_SHOP_BASE";

export class Npc_shopVo extends NPC_SHOP_BASE{

   public static get(id : number,index : number = -1):Npc_shopVo{
           if(this[id])return this[id];
           var vo : Npc_shopVo = new Npc_shopVo();
             this[id] = vo;
           return SheetManager.get("npc_shop",id,this[id],vo.keys(),index);
    }
}