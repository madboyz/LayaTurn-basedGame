import { SheetManager } from "../SheetManager";
import { SKILL_COST_BASE } from "../base/SKILL_COST_BASE";

export class Skill_costVo extends SKILL_COST_BASE{

   public static get(id : number,index : number = -1):Skill_costVo{
           if(this[id])return this[id];
           var vo : Skill_costVo = new Skill_costVo();
             this[id] = vo;
           return SheetManager.get("skill_cost",id,this[id],vo.keys(),index);
    }
}