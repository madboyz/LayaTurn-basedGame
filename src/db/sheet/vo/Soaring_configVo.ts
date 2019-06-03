import { SheetManager } from "../SheetManager";
import { SOARING_CONFIG_BASE } from "../base/SOARING_CONFIG_BASE";

export class Soaring_configVo extends SOARING_CONFIG_BASE{

   public static get(id : number,index : number = -1):Soaring_configVo{
           if(this[id])return this[id];
           var vo : Soaring_configVo = new Soaring_configVo();
             this[id] = vo;
           return SheetManager.get("soaring_config",id,this[id],vo.keys(),index);
    }
}