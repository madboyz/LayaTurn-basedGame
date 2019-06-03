import { SheetManager } from "../SheetManager";
import { EQUIP_REQUIRE_CFG_BASE } from "../base/EQUIP_REQUIRE_CFG_BASE";

export class Equip_require_cfgVo extends EQUIP_REQUIRE_CFG_BASE{

   public static get(id : number,index : number = -1):Equip_require_cfgVo{
           if(this[id])return this[id];
           var vo : Equip_require_cfgVo = new Equip_require_cfgVo();
             this[id] = vo;
           return SheetManager.get("equip_require_cfg",id,this[id],vo.keys(),index);
    }
}