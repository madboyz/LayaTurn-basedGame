import { SheetManager } from "../SheetManager";
import { MONSTER_BASE } from "../base/MONSTER_BASE";

export class MonsterVo extends MONSTER_BASE{

   public static get(id : number,index : number = -1):MonsterVo{
           if(this[id])return this[id];
           var vo : MonsterVo = new MonsterVo();
             this[id] = vo;
           return SheetManager.get("monster",id,this[id],vo.keys(),index);
    }
}