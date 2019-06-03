import { SheetManager } from "../SheetManager";
import { SOCIATY_ACTIVITY_BASE } from "../base/SOCIATY_ACTIVITY_BASE";

export class Sociaty_activityVo extends SOCIATY_ACTIVITY_BASE{

   public static get(id : number,index : number = -1):Sociaty_activityVo{
           if(this[id])return this[id];
           var vo : Sociaty_activityVo = new Sociaty_activityVo();
             this[id] = vo;
           return SheetManager.get("sociaty_activity",id,this[id],vo.keys(),index);
    }
}