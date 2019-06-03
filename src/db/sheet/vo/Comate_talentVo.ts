import { SheetManager } from "../SheetManager";
import { COMATE_TALENT_BASE } from "../base/COMATE_TALENT_BASE";

export class Comate_talentVo extends COMATE_TALENT_BASE{

   public static get(id : number,index : number = -1):Comate_talentVo{
           if(this[id])return this[id];
           var vo : Comate_talentVo = new Comate_talentVo();
             this[id] = vo;
           return SheetManager.get("comate_talent",id,this[id],vo.keys(),index);
    }
}