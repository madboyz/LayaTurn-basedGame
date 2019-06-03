import { SheetManager } from "../SheetManager";
import { REFINE_BASE } from "../base/REFINE_BASE";

export class RefineVo extends REFINE_BASE{

   public static get(id : number,index : number = -1):RefineVo{
           if(this[id])return this[id];
           var vo : RefineVo = new RefineVo();
             this[id] = vo;
           return SheetManager.get("refine",id,this[id],vo.keys(),index);
    }

    private static isAll: boolean;
    public static getAll(): void {
      if(!this.isAll)
      {
        this.isAll = true;
        var ids: string = "refine";
        var list: any = SheetManager.getList("refine");
        for (var key in list) {
          this[ids] = null;
          var vo: RefineVo = this.get(parseInt(key));
          this[ids + "_" + vo.no] = vo;
        }
      }
    }

    public static getByLv(lv: number,id:string = "refine"): RefineVo {
      this.getAll();
      var key: string = id + "_" + lv;
      return this[key];
    }
}