import { SheetManager } from "../SheetManager";
import { FIGHTING_MONSTER_BASE } from "../base/FIGHTING_MONSTER_BASE";

export class Fighting_monsterVo extends FIGHTING_MONSTER_BASE{

   public static get(id : number,index : number = -1):Fighting_monsterVo{
           if(this[id])return this[id];
           var vo : Fighting_monsterVo = new Fighting_monsterVo();
             this[id] = vo;
           return SheetManager.get("fighting_monster",id,this[id],vo.keys(),index);
    }
}