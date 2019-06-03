import { SheetManager } from "../SheetManager";
import { ACHIEVE_BASE } from "../base/ACHIEVE_BASE";

export class AchieveVo extends ACHIEVE_BASE{

   public static get(id : number,index : number = -1):AchieveVo{
           if(this[id])return this[id];
           var vo : AchieveVo = new AchieveVo();
             this[id] = vo;
           return SheetManager.get("achieve",id,this[id],vo.keys(),index);
    }

    private static titles: AchieveVo[];
    public static get getAll(): AchieveVo[] {
      if(!this.titles)
      {
        this.titles = []
        var list: any = SheetManager.getList("achieve");
        for (var key in list) {
          var data:AchieveVo = this.get(parseInt(key));
          if(data.type==1)
          this.titles.push(data);
        }
      }
      return this.titles;
    }
}