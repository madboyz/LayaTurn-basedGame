import { SheetManager } from "../SheetManager";
import { MOUNT_LV_BASE } from "../base/MOUNT_LV_BASE";

export class Mount_lvVo extends MOUNT_LV_BASE{

   public static get(id : number,index : number = -1):Mount_lvVo{
           if(this[id])return this[id];
           var vo : Mount_lvVo = new Mount_lvVo();
             this[id] = vo;
           return SheetManager.get("mount_lv",id,this[id],vo.keys(),index);
    }
}