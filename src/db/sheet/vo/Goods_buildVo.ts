import { SheetManager } from "../SheetManager";
import { GOODS_BUILD_BASE } from "../base/GOODS_BUILD_BASE";

export class Goods_buildVo extends GOODS_BUILD_BASE{

   public static get(id : number,index : number = -1):Goods_buildVo{
           if(this[id])return this[id];
           var vo : Goods_buildVo = new Goods_buildVo();
             this[id] = vo;
           return SheetManager.get("goods_build",id,this[id],vo.keys(),index);
    }
}