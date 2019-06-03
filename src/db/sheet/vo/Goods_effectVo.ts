import { SheetManager } from "../SheetManager";
import { GOODS_EFFECT_BASE } from "../base/GOODS_EFFECT_BASE";

export class Goods_effectVo extends GOODS_EFFECT_BASE{

   public static get(id : number,index : number = -1):Goods_effectVo{
           if(this[id])return this[id];
           var vo : Goods_effectVo = new Goods_effectVo();
             this[id] = vo;
           return SheetManager.get("goods_effect",id,this[id],vo.keys(),index);
    }
}