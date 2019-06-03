import { SheetManager } from "../SheetManager";
import { UPGRADE_QUALITY_BASE } from "../base/UPGRADE_QUALITY_BASE";

export class Upgrade_qualityVo extends UPGRADE_QUALITY_BASE{

   public static get(id : number,index : number = -1):Upgrade_qualityVo{
           if(this[id])return this[id];
           var vo : Upgrade_qualityVo = new Upgrade_qualityVo();
             this[id] = vo;
           return SheetManager.get("upgrade_quality",id,this[id],vo.keys(),index);
    }
}