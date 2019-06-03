import { SheetManager } from "../SheetManager";
import { MOUNT_LINGJING_CFG_BASE } from "../base/MOUNT_LINGJING_CFG_BASE";

export class Mount_lingjing_cfgVo extends MOUNT_LINGJING_CFG_BASE{

   public static get(id : number,index : number = -1):Mount_lingjing_cfgVo{
           if(this[id])return this[id];
           var vo : Mount_lingjing_cfgVo = new Mount_lingjing_cfgVo();
             this[id] = vo;
           return SheetManager.get("mount_lingjing_cfg",id,this[id],vo.keys(),index);
    }
}