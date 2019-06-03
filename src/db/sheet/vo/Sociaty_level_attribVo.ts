import { SheetManager } from "../SheetManager";
import { SOCIATY_LEVEL_ATTRIB_BASE } from "../base/SOCIATY_LEVEL_ATTRIB_BASE";

export class Sociaty_level_attribVo extends SOCIATY_LEVEL_ATTRIB_BASE{

   public static get(id : number,index : number = -1):Sociaty_level_attribVo{
           if(this[id])return this[id];
           var vo : Sociaty_level_attribVo = new Sociaty_level_attribVo();
             this[id] = vo;
           return SheetManager.get("sociaty_level_attrib",id,this[id],vo.keys(),index);
    }
}