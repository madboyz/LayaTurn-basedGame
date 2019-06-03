import { SheetManager } from "../SheetManager";
import { GUILD_CULTIVATE_LEARN_CONFIG_BASE } from "../base/GUILD_CULTIVATE_LEARN_CONFIG_BASE";

export class Guild_cultivate_learn_configVo extends GUILD_CULTIVATE_LEARN_CONFIG_BASE{

   public static get(id : number,index : number = -1):Guild_cultivate_learn_configVo{
           if(this[id])return this[id];
           var vo : Guild_cultivate_learn_configVo = new Guild_cultivate_learn_configVo();
             this[id] = vo;
           return SheetManager.get("guild_cultivate_learn_config",id,this[id],vo.keys(),index);
    }
}