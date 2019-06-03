import { SheetManager } from "../SheetManager";
import { COMATE_CFG_BASE } from "../base/COMATE_CFG_BASE";

export class Comate_cfgVo extends COMATE_CFG_BASE{

   public static get(id : number,index : number = -1):Comate_cfgVo{
           if(this[id])return this[id];
           var vo : Comate_cfgVo = new Comate_cfgVo();
             this[id] = vo;
           return SheetManager.get("comate_cfg",id,this[id],vo.keys(),index);
    }

    private static ComateList: Comate_cfgVo[];
    public static get getAll(): Comate_cfgVo[] {
      if(!this.ComateList)
      {
        this.ComateList = []
        var list: any = SheetManager.getList("comate_cfg");
        for (var key in list) {
          this.ComateList.push(this.get(parseInt(key)));
        }
      }
      return this.ComateList;
    }
}