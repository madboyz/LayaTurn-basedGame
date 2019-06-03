import { SheetManager } from "../SheetManager";
import { ACCESSORY_SUIT_BASE } from "../base/ACCESSORY_SUIT_BASE";

export class Accessory_suitVo extends ACCESSORY_SUIT_BASE{

   public static get(id : number,index : number = -1):Accessory_suitVo{
           if(this[id])return this[id];
           var vo : Accessory_suitVo = new Accessory_suitVo();
             this[id] = vo;
           return SheetManager.get("accessory_suit",id,this[id],vo.keys(),index);
    }
}