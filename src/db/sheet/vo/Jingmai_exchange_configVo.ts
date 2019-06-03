import { SheetManager } from "../SheetManager";
import { JINGMAI_EXCHANGE_CONFIG_BASE } from "../base/JINGMAI_EXCHANGE_CONFIG_BASE";

export class Jingmai_exchange_configVo extends JINGMAI_EXCHANGE_CONFIG_BASE{

   public static get(id : number,index : number = -1):Jingmai_exchange_configVo{
           if(this[id])return this[id];
           var vo : Jingmai_exchange_configVo = new Jingmai_exchange_configVo();
             this[id] = vo;
           return SheetManager.get("jingmai_exchange_config",id,this[id],vo.keys(),index);
    }
}