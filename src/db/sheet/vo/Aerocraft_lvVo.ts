import { SheetManager } from "../SheetManager";
import { AEROCRAFT_LV_BASE } from "../base/AEROCRAFT_LV_BASE";

export class Aerocraft_lvVo extends AEROCRAFT_LV_BASE{

   public static get(id : number,index : number = -1):Aerocraft_lvVo{
           if(this[id])return this[id];
           var vo : Aerocraft_lvVo = new Aerocraft_lvVo();
             this[id] = vo;
           return SheetManager.get("aerocraft_lv",id,this[id],vo.keys(),index);
    }

    private static List: Aerocraft_lvVo[];
    public static get getAll(): Aerocraft_lvVo[] {
      if(!this.List)
      {
        this.List = []
        var list: any = SheetManager.getList("aerocraft_lv");
        var vo:Aerocraft_lvVo;
        for (var key in list) {
          vo = this.get(parseInt(key));
          this.List.push(vo);
        }
      }
      return this.List;
    }

    public static getAllExp(lv:number):number
    {
      var len:number = this.getAll.length;
      var exp:number = 0;
      for (let index = 0; index < len; index++) {
        var element = this.getAll[index];
        if(element.no <= lv)
        {
          exp += element.exp_lim;
        }
      }
      return exp;
    }
}