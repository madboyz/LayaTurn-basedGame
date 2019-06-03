import { SheetManager } from "../SheetManager";
import { COMATE_MINGGE_CFG_BASE } from "../base/COMATE_MINGGE_CFG_BASE";

export class Comate_mingge_cfgVo extends COMATE_MINGGE_CFG_BASE{

   public static get(id : number,index : number = -1):Comate_mingge_cfgVo{
           if(this[id])return this[id];
           var vo : Comate_mingge_cfgVo = new Comate_mingge_cfgVo();
             this[id] = vo;
           return SheetManager.get("comate_mingge_cfg",id,this[id],vo.keys(),index);
    }
}