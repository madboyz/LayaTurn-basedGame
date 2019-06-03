import { SheetManager } from "../SheetManager";
import { LEVEL_CFG_BASE } from "../base/LEVEL_CFG_BASE";

export class Level_cfgVo extends LEVEL_CFG_BASE{

   public static get(id : number,index : number = -1):Level_cfgVo{
           if(this[id])return this[id];
           var vo : Level_cfgVo = new Level_cfgVo();
             this[id] = vo;
           return SheetManager.get("level_cfg",id,this[id],vo.keys(),index);
    }
}