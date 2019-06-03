import { SheetManager } from "../SheetManager";
import { STRENTHEN_BASE } from "../base/STRENTHEN_BASE";

export class StrenthenVo extends STRENTHEN_BASE{

   public static get(id : any,index : number = -1):any{
           if(this[id])return this[id];
           var vo : StrenthenVo = new StrenthenVo();
             this[id] = vo;
           return SheetManager.get("strenthen",id,this[id],vo.keys(),index);
  }

  private static isAll: boolean;
  public static getAll(): void {
    if(!this.isAll)
    {
      this.isAll = true;
      var ids: string = "strenthen";
      var list: any = SheetManager.getList("strenthen");
      for (var key in list) {
        this[ids] = null;
        var vo: StrenthenVo = this.get(parseInt(key));
        this[ids + "_" + vo.no] = vo;
      }
    }
  }

  public static getByLv(lv: number,id:string = "strenthen"): StrenthenVo {
    this.getAll();
    var key: string = id + "_" + lv;
    return this[key];
  }

}