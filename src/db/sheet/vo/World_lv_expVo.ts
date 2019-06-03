import { SheetManager } from "../SheetManager";
import { WORLD_LV_EXP_BASE } from "../base/WORLD_LV_EXP_BASE";

export class World_lv_expVo extends WORLD_LV_EXP_BASE{

   public static get(id : number,index : number = -1):World_lv_expVo{
           if(this[id])return this[id];
           var vo : World_lv_expVo = new World_lv_expVo();
             this[id] = vo;
           return SheetManager.get("world_lv_exp",id,this[id],vo.keys(),index);
    }
}