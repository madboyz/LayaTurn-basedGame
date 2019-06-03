import { SheetManager } from "../SheetManager";
import { PASSIVE_SKILL_BASE } from "../base/PASSIVE_SKILL_BASE";

export class Passive_skillVo extends PASSIVE_SKILL_BASE{

   public static get(id : number,index : number = -1):Passive_skillVo{
           if(this[id])return this[id];
           var vo : Passive_skillVo = new Passive_skillVo();
             this[id] = vo;
           return SheetManager.get("passive_skill",id,this[id],vo.keys(),index);
    }
}