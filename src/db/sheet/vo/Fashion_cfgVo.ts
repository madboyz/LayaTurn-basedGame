import { SheetManager } from "../SheetManager";
import { FASHION_CFG_BASE } from "../base/FASHION_CFG_BASE";

export class Fashion_cfgVo extends FASHION_CFG_BASE{

   public static get(id : number,index : number = -1):Fashion_cfgVo{
           if(this[id])return this[id];
           var vo : Fashion_cfgVo = new Fashion_cfgVo();
             this[id] = vo;
           return SheetManager.get("fashion_cfg",id,this[id],vo.keys(),index);
    }
    private static list: Fashion_cfgVo[];
    public static getAllBySex(sex:number): Fashion_cfgVo[] {
      if(!this.list)
      {
        this.list = []
        var list: any = SheetManager.getList("fashion_cfg");
        for (var key in list) {
          var data:Fashion_cfgVo = this.get(parseInt(key));
          if((data.sex==sex||data.sex == 0)&&data.is_need_show == 0)
          this.list.push(data);
        }
      }
      return this.list;
    }
     
}