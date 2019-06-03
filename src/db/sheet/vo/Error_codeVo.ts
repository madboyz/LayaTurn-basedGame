import { SheetManager } from "../SheetManager";
import { ERROR_CODE_BASE } from "../base/ERROR_CODE_BASE";

export class Error_codeVo extends ERROR_CODE_BASE{

   public static get(id : number,index : number = -1):Error_codeVo{
           if(this[id])return this[id];
           var vo : Error_codeVo = new Error_codeVo();
             this[id] = vo;
           return SheetManager.get("error_code",id,this[id],vo.keys(),index);
    }
}