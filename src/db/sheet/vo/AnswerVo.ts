import { SheetManager } from "../SheetManager";
import { ANSWER_BASE } from "../base/ANSWER_BASE";

export class AnswerVo extends ANSWER_BASE{

   public static get(id : number,index : number = -1):AnswerVo{
           if(this[id])return this[id];
           var vo : AnswerVo = new AnswerVo();
             this[id] = vo;
           return SheetManager.get("answer",id,this[id],vo.keys(),index);
    }
}