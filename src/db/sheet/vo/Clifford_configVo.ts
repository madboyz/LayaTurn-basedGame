import { SheetManager } from "../SheetManager";
import { CLIFFORD_CONFIG_BASE } from "../base/CLIFFORD_CONFIG_BASE";

export class Clifford_configVo extends CLIFFORD_CONFIG_BASE{

   public static get(id : number,index : number = -1):Clifford_configVo{
           if(this[id])return this[id];
           var vo : Clifford_configVo = new Clifford_configVo();
             this[id] = vo;
           return SheetManager.get("clifford_config",id,this[id],vo.keys(),index);
    }
}