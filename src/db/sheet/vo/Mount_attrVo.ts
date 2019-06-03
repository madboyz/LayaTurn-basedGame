import { SheetManager } from "../SheetManager";
import { MOUNT_ATTR_BASE } from "../base/MOUNT_ATTR_BASE";

export class Mount_attrVo extends MOUNT_ATTR_BASE{

   public static get(id : number,index : number = -1):Mount_attrVo{
           if(this[id])return this[id];
           var vo : Mount_attrVo = new Mount_attrVo();
             this[id] = vo;
           return SheetManager.get("mount_attr",id,this[id],vo.keys(),index);
    }
}