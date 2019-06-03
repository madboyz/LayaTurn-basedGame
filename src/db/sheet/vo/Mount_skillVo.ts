import { SheetManager } from "../SheetManager";
import { MOUNT_SKILL_BASE } from "../base/MOUNT_SKILL_BASE";

export class Mount_skillVo extends MOUNT_SKILL_BASE{

   public static get(id : number,index : number = -1):Mount_skillVo{
           if(this[id])return this[id];
           var vo : Mount_skillVo = new Mount_skillVo();
             this[id] = vo;
           return SheetManager.get("mount_skill",id,this[id],vo.keys(),index);
    }
}