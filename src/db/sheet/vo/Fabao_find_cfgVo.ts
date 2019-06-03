import { SheetManager } from "../SheetManager";
import { FABAO_FIND_CFG_BASE } from "../base/FABAO_FIND_CFG_BASE";

export class Fabao_find_cfgVo extends FABAO_FIND_CFG_BASE{

   public static get(id : number,index : number = -1):Fabao_find_cfgVo{
           if(this[id])return this[id];
           var vo : Fabao_find_cfgVo = new Fabao_find_cfgVo();
             this[id] = vo;
           return SheetManager.get("fabao_find_cfg",id,this[id],vo.keys(),index);
    }
}