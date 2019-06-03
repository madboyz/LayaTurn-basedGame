import { SheetManager } from "../SheetManager";
import { EQUIP_ADDI_ATTR_BASE } from "../base/EQUIP_ADDI_ATTR_BASE";

export class Equip_addi_attrVo extends EQUIP_ADDI_ATTR_BASE{

   public static get(id : number,index : number = -1):Equip_addi_attrVo{
           if(this[id])return this[id];
           var vo : Equip_addi_attrVo = new Equip_addi_attrVo();
             this[id] = vo;
           return SheetManager.get("equip_addi_attr",id,this[id],vo.keys(),index);
    }
}