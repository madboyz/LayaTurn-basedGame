import { SheetManager } from "../SheetManager";
import { TRANSFIGURATION_BASE } from "../base/TRANSFIGURATION_BASE";

export class TransfigurationVo extends TRANSFIGURATION_BASE{

   public static get(id : number,index : number = -1):TransfigurationVo{
           if(this[id])return this[id];
           var vo : TransfigurationVo = new TransfigurationVo();
             this[id] = vo;
           return SheetManager.get("transfiguration",id,this[id],vo.keys(),index);
    }
}