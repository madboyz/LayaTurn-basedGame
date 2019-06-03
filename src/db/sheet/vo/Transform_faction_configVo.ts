import { SheetManager } from "../SheetManager";
import { TRANSFORM_FACTION_CONFIG_BASE } from "../base/TRANSFORM_FACTION_CONFIG_BASE";

export class Transform_faction_configVo extends TRANSFORM_FACTION_CONFIG_BASE{

   public static get(id : number,index : number = -1):Transform_faction_configVo{
           if(this[id])return this[id];
           var vo : Transform_faction_configVo = new Transform_faction_configVo();
             this[id] = vo;
           return SheetManager.get("transform_faction_config",id,this[id],vo.keys(),index);
    }
}