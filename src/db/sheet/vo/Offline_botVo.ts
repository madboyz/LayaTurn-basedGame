import { SheetManager } from "../SheetManager";
import { OFFLINE_BOT_BASE } from "../base/OFFLINE_BOT_BASE";

export class Offline_botVo extends OFFLINE_BOT_BASE{

   public static get(id : number,index : number = -1):Offline_botVo{
           if(this[id])return this[id];
           var vo : Offline_botVo = new Offline_botVo();
             this[id] = vo;
           return SheetManager.get("offline_bot",id,this[id],vo.keys(),index);
    }
}