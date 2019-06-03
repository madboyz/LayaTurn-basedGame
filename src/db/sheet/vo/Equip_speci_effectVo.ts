import { SheetManager } from "../SheetManager";
import { EQUIP_SPECI_EFFECT_BASE } from "../base/EQUIP_SPECI_EFFECT_BASE";

export class Equip_speci_effectVo extends EQUIP_SPECI_EFFECT_BASE{

   public static get(id : number,index : number = -1):Equip_speci_effectVo{
           if(this[id])return this[id];
           var vo : Equip_speci_effectVo = new Equip_speci_effectVo();
             this[id] = vo;
           return SheetManager.get("equip_speci_effect",id,this[id],vo.keys(),index);
    }
}