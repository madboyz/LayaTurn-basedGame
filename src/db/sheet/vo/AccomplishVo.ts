import { SheetManager } from "../SheetManager";
import { ACCOMPLISH_BASE } from "../base/ACCOMPLISH_BASE";

export class AccomplishVo extends ACCOMPLISH_BASE{

   public static get(id : number,index : number = -1):AccomplishVo{
           if(this[id])return this[id];
           var vo : AccomplishVo = new AccomplishVo();
             this[id] = vo;
           return SheetManager.get("accomplish",id,this[id],vo.keys(),index);
    }
    private static Accomplish: AccomplishVo[];
    public static get getAll(): AccomplishVo[] {
      if(!this.Accomplish)
      {
        this.Accomplish = []
        var list: any = SheetManager.getList("accomplish");
        for (var key in list) {
          var data:AccomplishVo = this.get(parseInt(key));
          if(data.type>1)
          this.Accomplish.push(data);
        }
      }
      return this.Accomplish;
    }
}