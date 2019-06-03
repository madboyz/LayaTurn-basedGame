import { SheetManager } from "../SheetManager";
import { COMATE_LIEMING_CFG_BASE } from "../base/COMATE_LIEMING_CFG_BASE";

export class Comate_lieming_cfgVo extends COMATE_LIEMING_CFG_BASE{

   public static get(id : number,index : number = -1):Comate_lieming_cfgVo{
           if(this[id])return this[id];
           var vo : Comate_lieming_cfgVo = new Comate_lieming_cfgVo();
             this[id] = vo;
           return SheetManager.get("comate_lieming_cfg",id,this[id],vo.keys(),index);
    }
}