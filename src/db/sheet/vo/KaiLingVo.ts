import { SheetManager } from "../SheetManager";
import { KAILING_BASE } from "../base/KAILING_BASE";

export class KaiLingVo extends KAILING_BASE{

   public static get(id : number,index : number = -1):KaiLingVo{
           if(this[id])return this[id];
           var vo : KaiLingVo = new KaiLingVo();
             this[id] = vo;
           return SheetManager.get("kaiLing",id,this[id],vo.keys(),index);
    }

    private static isAll: boolean;
  public static getAll(): void {
    if(!this.isAll)
    {
      this.isAll = true;
      var ids: string = "kaiLing";
      var list: any = SheetManager.getList("kaiLing");
      for (var key in list) {
        this[ids] = null;
        var vo: KaiLingVo = this.get(parseInt(key));
        this[ids + "_" + vo.no] = vo;
      }
    }
  }

  public static getByLv(lv: number,id:string = "kaiLing"): KaiLingVo {
    this.getAll();
    var key: string = id + "_" + lv;
    return this[key];
  }
}