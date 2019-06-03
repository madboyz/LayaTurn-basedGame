import { SheetManager } from "../SheetManager";
import { DUN_EVENT_BASE } from "../base/DUN_EVENT_BASE";

export class Dun_eventVo extends DUN_EVENT_BASE{

   public static get(id : number,index : number = -1):Dun_eventVo{
           if(this[id])return this[id];
           var vo : Dun_eventVo = new Dun_eventVo();
             this[id] = vo;
           return SheetManager.get("dun_event",id,this[id],vo.keys(),index);
    }
}