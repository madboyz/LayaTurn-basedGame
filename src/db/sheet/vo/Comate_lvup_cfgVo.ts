import { SheetManager } from "../SheetManager";
import { COMATE_LVUP_CFG_BASE } from "../base/COMATE_LVUP_CFG_BASE";

export class Comate_lvup_cfgVo extends COMATE_LVUP_CFG_BASE{

   public static get(id : number,index : number = -1):Comate_lvup_cfgVo{
           if(this[id])return this[id];
           var vo : Comate_lvup_cfgVo = new Comate_lvup_cfgVo();
             this[id] = vo;
           return SheetManager.get("comate_lvup_cfg",id,this[id],vo.keys(),index);
    }
}