import { SheetManager } from "../SheetManager";
import { VIP_JURISDICTION_BASE } from "../base/VIP_JURISDICTION_BASE";

export class Vip_jurisdictionVo extends VIP_JURISDICTION_BASE{

   public static get(id : number,index : number = -1):Vip_jurisdictionVo{
           if(this[id])return this[id];
           var vo : Vip_jurisdictionVo = new Vip_jurisdictionVo();
             this[id] = vo;
           return SheetManager.get("vip_jurisdiction",id,this[id],vo.keys(),index);
    }
}