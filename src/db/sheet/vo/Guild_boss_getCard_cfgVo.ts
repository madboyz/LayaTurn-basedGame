import { SheetManager } from "../SheetManager";
import { GUILD_BOSS_GETCARD_CFG_BASE } from "../base/GUILD_BOSS_GETCARD_CFG_BASE";

export class Guild_boss_getCard_cfgVo extends GUILD_BOSS_GETCARD_CFG_BASE{

   public static get(id : number,index : number = -1):Guild_boss_getCard_cfgVo{
           if(this[id])return this[id];
           var vo : Guild_boss_getCard_cfgVo = new Guild_boss_getCard_cfgVo();
             this[id] = vo;
           return SheetManager.get("guild_boss_getCard_cfg",id,this[id],vo.keys(),index);
    }
}