import { SheetManager } from "../SheetManager";
import { SIGN_BASE } from "../base/SIGN_BASE";

export class SignVo extends SIGN_BASE{

   public static get(id : number,index : number = -1):SignVo{
           if(this[id])return this[id];
           var vo : SignVo = new SignVo();
             this[id] = vo;
           return SheetManager.get("sign",id,this[id],vo.keys(),index);
    }
}