import { SheetManager } from "../SheetManager";
import { NOTICE_BASE } from "../base/NOTICE_BASE";

export class NoticeVo extends NOTICE_BASE{

   public static get(id : number,index : number = -1):NoticeVo{
           if(this[id])return this[id];
           var vo : NoticeVo = new NoticeVo();
             this[id] = vo;
           return SheetManager.get("notice",id,this[id],vo.keys(),index);
    }
}