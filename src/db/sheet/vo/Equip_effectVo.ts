import { SheetManager } from "../SheetManager";
import { EQUIP_EFFECT_BASE } from "../base/EQUIP_EFFECT_BASE";

export class Equip_effectVo extends EQUIP_EFFECT_BASE{

   public static get(id : number,index : number = -1):Equip_effectVo{
           if(this[id])return this[id];
           var vo : Equip_effectVo = new Equip_effectVo();
             this[id] = vo;
           return SheetManager.get("equip_effect",id,this[id],vo.keys(),index);
    }
}