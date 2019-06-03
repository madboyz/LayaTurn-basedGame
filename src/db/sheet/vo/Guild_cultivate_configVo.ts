import { SheetManager } from "../SheetManager";
import { GUILD_CULTIVATE_CONFIG_BASE } from "../base/GUILD_CULTIVATE_CONFIG_BASE";

export class Guild_cultivate_configVo extends GUILD_CULTIVATE_CONFIG_BASE{

   public static get(id : number,index : number = -1):Guild_cultivate_configVo{
           if(this[id])return this[id];
           var vo : Guild_cultivate_configVo = new Guild_cultivate_configVo();
             this[id] = vo;
           return SheetManager.get("guild_cultivate_config",id,this[id],"no,need_point,price_type,price,do_phy_dam_scaling,do_mag_dam_scaling,heal_value,seal_hit,seal_resis_rate,seal_resis,be_phy_dam_reduce_coef,be_phy_dam_shrink,be_mag_dam_reduce_coef,be_mag_dam_shrink",index);
    }
}