import { SheetManager } from "../SheetManager";
import { ALLOT_TITLE_BASE } from "../base/ALLOT_TITLE_BASE";

export class Allot_titleVo extends ALLOT_TITLE_BASE{

   public static get(id : number,index : number = -1):Allot_titleVo{
           if(this[id])return this[id];
           var vo : Allot_titleVo = new Allot_titleVo();
             this[id] = vo;
           return SheetManager.get("allot_title",id,this[id],vo.keys(),index);
    }
}