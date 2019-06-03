import { SheetManager } from "../SheetManager";
import { BEHAVIOR_BASE } from "../base/BEHAVIOR_BASE";

export class BehaviorVo extends BEHAVIOR_BASE{

   public static get(id : number,index : number = -1):BehaviorVo{
           if(this[id])return this[id];
           var vo : BehaviorVo = new BehaviorVo();
             this[id] = vo;
           return SheetManager.get("behavior",id,this[id],vo.keys(),index);
    }
    public static get7DayReward():Array<BehaviorVo>
    {
      var List = []
      var list: any = SheetManager.getList("behavior");
      for (var key in list) {
        var no = parseInt(key);
        var vo:BehaviorVo = this.get(no);
        if(vo.type == 3)
        List.push(vo)
      }
      return List;
    }

}