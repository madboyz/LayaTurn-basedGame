import { SheetManager } from "../SheetManager";
import { MOUNT_RES_BASE } from "../base/MOUNT_RES_BASE";

export class Mount_resVo extends MOUNT_RES_BASE{

   public static get(id : number,index : number = -1):Mount_resVo{
           if(this[id])return this[id];
           var vo : Mount_resVo = new Mount_resVo();
             this[id] = vo;
           return SheetManager.get("mount_res",id,this[id],vo.keys(),index);
    }
}