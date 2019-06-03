import { SheetManager } from "../SheetManager";
import { UPGRADE_LV_BASE } from "../base/UPGRADE_LV_BASE";

export class Upgrade_lvVo extends UPGRADE_LV_BASE{

   public static get(id : number,index : number = -1):Upgrade_lvVo{
           if(this[id])return this[id];
           var vo : Upgrade_lvVo = new Upgrade_lvVo();
             this[id] = vo;
           return SheetManager.get("upgrade_lv",id,this[id],vo.keys(),index);
    }
}