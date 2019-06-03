import { SheetManager } from "../SheetManager";
import { CHAPTER_DUN_BASE } from "../base/CHAPTER_DUN_BASE";

export class Chapter_dunVo extends CHAPTER_DUN_BASE{

   public static get(id : number,index : number = -1):Chapter_dunVo{
           if(this[id])return this[id];
           var vo : Chapter_dunVo = new Chapter_dunVo();
             this[id] = vo;
           return SheetManager.get("chapter_dun",id,this[id],vo.keys(),index);
    }

    private static List: Array<Chapter_dunVo>;
    public static getAll(): Array<Chapter_dunVo>{
      if(!this.List)
      {
        this.List = []
        var list: any = SheetManager.getList("chapter_dun");
        var vo:Chapter_dunVo;
        for (var key in list) {
          vo = this.get(parseInt(key));
          this.List.push(vo);
        }
      }
      return this.List;
    }
}