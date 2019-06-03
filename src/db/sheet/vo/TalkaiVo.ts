import { SheetManager } from "../SheetManager";
import { TALKAI_BASE } from "../base/TALKAI_BASE";

export class TalkaiVo extends TALKAI_BASE{

   public static get(id : number,index : number = -1):TalkaiVo{
           if(this[id])return this[id];
           var vo : TalkaiVo = new TalkaiVo();
             this[id] = vo;
           return SheetManager.get("talkai",id,this[id],vo.keys(),index);
    }
}