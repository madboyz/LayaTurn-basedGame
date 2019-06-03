import { SheetManager } from "../SheetManager";
import { STRENTHEN_LV_ATTRIBUTE_BASE } from "../base/STRENTHEN_LV_ATTRIBUTE_BASE";

export class Strenthen_lv_attributeVo extends STRENTHEN_LV_ATTRIBUTE_BASE{

   public static get(id : number,index : number = -1):Strenthen_lv_attributeVo{
           if(this[id])return this[id];
           var vo : Strenthen_lv_attributeVo = new Strenthen_lv_attributeVo();
             this[id] = vo;
           return SheetManager.get("strenthen_lv_attribute",id,this[id],vo.keys(),index);
    }
}