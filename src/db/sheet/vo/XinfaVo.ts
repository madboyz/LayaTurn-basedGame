import { SheetManager } from "../SheetManager";
import { XINFA_BASE } from "../base/XINFA_BASE";

export class XinfaVo extends XINFA_BASE{

   public static get(id : number,index : number = -1):XinfaVo{
           if(this[id])return this[id];
           var vo : XinfaVo = new XinfaVo();
             this[id] = vo;
           return SheetManager.get("xinfa",id,this[id],"no,name,desc,icon,is_master,faction,unlock_lv,add_attrs,skill1,skill1_unlock_lv,skill2,skill2_unlock_lv,skill3,skill3_unlock_lv",index);
    }
}