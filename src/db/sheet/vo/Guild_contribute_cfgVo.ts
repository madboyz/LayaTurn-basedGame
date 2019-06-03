import { SheetManager } from "../SheetManager";
import { GUILD_CONTRIBUTE_CFG_BASE } from "../base/GUILD_CONTRIBUTE_CFG_BASE";

export class Guild_contribute_cfgVo extends GUILD_CONTRIBUTE_CFG_BASE{

   public static get(id : number,index : number = -1):Guild_contribute_cfgVo{
           if(this[id])return this[id];
           var vo : Guild_contribute_cfgVo = new Guild_contribute_cfgVo();
             this[id] = vo;
           return SheetManager.get("guild_contribute_cfg",id,this[id],vo.keys(),index);
    }
}