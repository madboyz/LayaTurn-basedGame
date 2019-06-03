import { SheetManager } from "../SheetManager";
import { VIP_LEVEL_BASE } from "../base/VIP_LEVEL_BASE";

export class Vip_levelVo extends VIP_LEVEL_BASE{

   public static get(id : number,index : number = -1):Vip_levelVo{
           if(this[id])return this[id];
           var vo : Vip_levelVo = new Vip_levelVo();
             this[id] = vo;
           return SheetManager.get("vip_level",id,this[id],vo.keys(),index);
    }
}