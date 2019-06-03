import { SheetManager } from "../SheetManager";
import { FB_SCENARIO_BASE } from "../base/FB_SCENARIO_BASE";

export class Fb_scenarioVo extends FB_SCENARIO_BASE{

   public static get(id : number,index : number = -1):Fb_scenarioVo{
           if(this[id])return this[id];
           var vo : Fb_scenarioVo = new Fb_scenarioVo();
             this[id] = vo;
           return SheetManager.get("fb_scenario",id,this[id],vo.keys(),index);
    }
}