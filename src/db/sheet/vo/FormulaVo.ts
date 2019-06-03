import { SheetManager } from "../SheetManager";
import { FORMULA_BASE } from "../base/FORMULA_BASE";

export class FormulaVo extends FORMULA_BASE{

   public static get(id : number,index : number = -1):FormulaVo{
           if(this[id])return this[id];
           var vo : FormulaVo = new FormulaVo();
             this[id] = vo;
           return SheetManager.get("formula",id,this[id],vo.keys(),index);
    }
}