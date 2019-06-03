import { SheetManager } from "../SheetManager";
import { STEP_SHOP_GOODS_BASE } from "../base/STEP_SHOP_GOODS_BASE";

export class Step_shop_goodsVo extends STEP_SHOP_GOODS_BASE{

   public static get(id : number,index : number = -1):Step_shop_goodsVo{
           if(this[id])return this[id];
           var vo : Step_shop_goodsVo = new Step_shop_goodsVo();
             this[id] = vo;
           return SheetManager.get("step_shop_goods",id,this[id],vo.keys(),index);
    }
}