import { SheetManager } from "../SheetManager";
import { FABAO_LVUP_CFG_BASE } from "../base/FABAO_LVUP_CFG_BASE";

export class Fabao_lvup_cfgVo extends FABAO_LVUP_CFG_BASE{

   public static get(id : number,index : number = -1):Fabao_lvup_cfgVo{
           if(this[id])return this[id];
           var vo : Fabao_lvup_cfgVo = new Fabao_lvup_cfgVo();
             this[id] = vo;
           return SheetManager.get("fabao_lvup_cfg",id,this[id],vo.keys(),index);
    }
}