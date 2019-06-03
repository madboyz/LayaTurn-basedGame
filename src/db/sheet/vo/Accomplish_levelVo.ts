import { SheetManager } from "../SheetManager";
import { ACCOMPLISH_LEVEL_BASE } from "../base/ACCOMPLISH_LEVEL_BASE";

export class Accomplish_levelVo extends ACCOMPLISH_LEVEL_BASE{

  private static dataObj:object;
   public static get(id : number,index : number = -1):Accomplish_levelVo{
           if(this[id])return this[id];
           var vo : Accomplish_levelVo = new Accomplish_levelVo();
             this[id] = vo;
           return SheetManager.get("accomplish_level",id,this[id],vo.keys(),index);
    }

    public static getData(value:number):Accomplish_levelVo
    {
      if(!this.dataObj)
      {
        this.dataObj = SheetManager.getList("accomplish_level");
      }

      var vo:Accomplish_levelVo;
        for (const key in this.dataObj) {
          if (this.dataObj.hasOwnProperty(key)) {
            vo = this.get(Number(key));
            if(value <= vo.min || (value >= vo.min && value <= vo.max))
            {
              return vo;
            }
          }
        }
        return null;
    }
}