import { SheetManager } from "../SheetManager";
import { SHOW_TEXT_BASE } from "../base/SHOW_TEXT_BASE";

export class Show_textVo extends SHOW_TEXT_BASE{

   public static get(id : number,index : number = -1):Show_textVo{
           if(this[id])return this[id];
           var vo : Show_textVo = new Show_textVo();
             this[id] = vo;
           return SheetManager.get("show_text",id,this[id],vo.keys(),index);
    }
}