import { SheetManager } from "../SheetManager";
import { PARTNER_LV_ATTRS_BASE } from "../base/PARTNER_LV_ATTRS_BASE";

export class Partner_lv_attrsVo extends PARTNER_LV_ATTRS_BASE{

   public static get(id : number,index : number = -1):Partner_lv_attrsVo{
           if(this[id])return this[id];
           var vo : Partner_lv_attrsVo = new Partner_lv_attrsVo();
             this[id] = vo;
           return SheetManager.get("partner_lv_attrs",id,this[id],vo.keys(),index);
    }
}