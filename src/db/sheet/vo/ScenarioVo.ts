import { SheetManager } from "../SheetManager";
import { SCENARIO_BASE } from "../base/SCENARIO_BASE";

export class ScenarioVo extends SCENARIO_BASE{

   public static get(id : number,index : number = -1):ScenarioVo{
           if(this[id])return this[id];
           var vo : ScenarioVo = new ScenarioVo();
             this[id] = vo;
           return SheetManager.get("scenario",id,this[id],vo.keys(),index);
    }
}