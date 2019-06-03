import { SheetManager } from "../SheetManager";
import { BUSINESS_CONFIG_BASE } from "../base/BUSINESS_CONFIG_BASE";

export class Business_configVo extends BUSINESS_CONFIG_BASE{

   public static get(id : number,index : number = -1):Business_configVo{
           if(this[id])return this[id];
           var vo : Business_configVo = new Business_configVo();
             this[id] = vo;
           return SheetManager.get("business_config",id,this[id],vo.keys(),index);
    }
}