import { SheetManager } from "../SheetManager";
import { COMATE_TUPO_CFG_BASE } from "../base/COMATE_TUPO_CFG_BASE";

export class Comate_tupo_cfgVo extends COMATE_TUPO_CFG_BASE{

   public static get(id : number,index : number = -1):Comate_tupo_cfgVo{
           if(this[id])return this[id];
           var vo : Comate_tupo_cfgVo = new Comate_tupo_cfgVo();
             this[id] = vo;
           return SheetManager.get("comate_tupo_cfg",id,this[id],vo.keys(),index);
    }
}