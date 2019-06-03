import { SheetManager } from "../SheetManager";
import { NPC_BASE } from "../base/NPC_BASE";

export class NpcVo extends NPC_BASE{

   public static get(id : number,index : number = -1):NpcVo{
           if(this[id])return this[id];
           var vo : NpcVo = new NpcVo();
             this[id] = vo;
           return SheetManager.get("npc",id,this[id],vo.keys(),index);
    }
}