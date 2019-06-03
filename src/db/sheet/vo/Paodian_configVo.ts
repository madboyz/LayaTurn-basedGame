import { SheetManager } from "../SheetManager";
import { PAODIAN_CONFIG_BASE } from "../base/PAODIAN_CONFIG_BASE";

export class Paodian_configVo extends PAODIAN_CONFIG_BASE{

   public static get(id : number,index : number = -1):Paodian_configVo{
           if(this[id])return this[id];
           var vo : Paodian_configVo = new Paodian_configVo();
             this[id] = vo;
           return SheetManager.get("paodian_config",id,this[id],vo.keys(),index);
    }
}