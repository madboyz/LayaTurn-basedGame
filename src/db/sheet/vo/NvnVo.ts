import { SheetManager } from "../SheetManager";
import { NVN_BASE } from "../base/NVN_BASE";

export class NvnVo extends NVN_BASE{

   public static get(id : number,index : number = -1):NvnVo{
           if(this[id])return this[id];
           var vo : NvnVo = new NvnVo();
             this[id] = vo;
           return SheetManager.get("nvn",id,this[id],vo.keys(),index);
    }
}