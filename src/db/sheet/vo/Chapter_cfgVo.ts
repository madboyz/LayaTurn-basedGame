import { SheetManager } from "../SheetManager";
import { CHAPTER_CFG_BASE } from "../base/CHAPTER_CFG_BASE";

export class Chapter_cfgVo extends CHAPTER_CFG_BASE{

   public static get(id : number,index : number = -1):Chapter_cfgVo{
           if(this[id])return this[id];
           var vo : Chapter_cfgVo = new Chapter_cfgVo();
             this[id] = vo;
           return SheetManager.get("chapter_cfg",id,this[id],vo.keys(),index);
    }
    /**
     * 根据场景编号返回vo
     * @param SceneNo 
     * @param index 
     */
    public static getBySceneNo(SceneNo:number,index : number = -1):Chapter_cfgVo{
      var vo:Chapter_cfgVo = null;
      var list: any = SheetManager.getList("chapter_cfg");
      for (var key in list) {
        if(key != null)
        {
          var data = this.get(parseInt(key));
          if(data != null && data.scene_no == SceneNo)
          {
            vo = data;
            break;
          }
        }
      }
      return vo;
    }

    private static List: Chapter_cfgVo[];

    public static getAll(): Chapter_cfgVo[] {
      if(!this.List)
      {
        this.List = []
        var list: any = SheetManager.getList("chapter_cfg");
        for (var key in list) {
          this.List.push(this.get(parseInt(key)));
        }
      }
      return this.List;
    }
}