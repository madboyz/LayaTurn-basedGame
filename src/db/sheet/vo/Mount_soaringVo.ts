import { SheetManager } from "../SheetManager";
import { MOUNT_SOARING_BASE } from "../base/MOUNT_SOARING_BASE";

export class Mount_soaringVo extends MOUNT_SOARING_BASE{

   public static get(id : number,index : number = -1):Mount_soaringVo{
           if(this[id])return this[id];
           var vo : Mount_soaringVo = new Mount_soaringVo();
             this[id] = vo;
           return SheetManager.get("mount_soaring",id,this[id],vo.keys(),index);
    }
}