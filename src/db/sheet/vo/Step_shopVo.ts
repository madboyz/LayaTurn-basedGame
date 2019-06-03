import { SheetManager } from "../SheetManager";
import { STEP_SHOP_BASE } from "../base/STEP_SHOP_BASE";

export class Step_shopVo extends STEP_SHOP_BASE{

   public static get(id : number,index : number = -1):Step_shopVo{
           if(this[id])return this[id];
           var vo : Step_shopVo = new Step_shopVo();
             this[id] = vo;
           return SheetManager.get("step_shop",id,this[id],vo.keys(),index);
    }
}