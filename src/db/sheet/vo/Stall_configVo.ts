import { SheetManager } from "../SheetManager";
import { STALL_CONFIG_BASE } from "../base/STALL_CONFIG_BASE";

export class Stall_configVo extends STALL_CONFIG_BASE{

   public static get(id : number,index : number = -1):Stall_configVo{
           if(this[id])return this[id];
           var vo : Stall_configVo = new Stall_configVo();
             this[id] = vo;
           return SheetManager.get("stall_config",id,this[id],vo.keys(),index);
    }
}