import { SheetManager } from "../SheetManager";
import { RMB_SHOP_BASE } from "../base/RMB_SHOP_BASE";

export class Rmb_shopVo extends RMB_SHOP_BASE{

   public static get(id : number,index : number = -1):Rmb_shopVo{
           if(this[id])return this[id];
           var vo : Rmb_shopVo = new Rmb_shopVo();
             this[id] = vo;
           return SheetManager.get("rmb_shop",id,this[id],vo.keys(),index);
    }
}