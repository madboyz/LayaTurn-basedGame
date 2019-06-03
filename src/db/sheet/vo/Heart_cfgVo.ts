import { SheetManager } from "../SheetManager";
import { HEART_CFG_BASE } from "../base/HEART_CFG_BASE";

export class Heart_cfgVo extends HEART_CFG_BASE{

   public static get(id : number,index : number = -1):Heart_cfgVo{
           if(this[id]&&this[id])return this[id];
           var vo : Heart_cfgVo = new Heart_cfgVo();
             this[id] = vo;
           return SheetManager.get("heart_cfg",id,this[id],vo.keys(),index);
    }
    public static getCurrentVoList(currentNo:number):Array<Heart_cfgVo>
    {
      var List = []
      var list: any = SheetManager.getList("heart_cfg");
      for (var key in list) {
        var no = parseInt(key);
        if(no > currentNo)
        {
          break;
        }
        var vo:Heart_cfgVo = this.get(no);
        List.push(vo)
      }
      return List;
    }

    public static getIsMax(no:number):boolean
    {
      var vo:Heart_cfgVo = this.get(no);
      if(vo == null)
      return true;
      var maxLv = this.getClassMax(vo.class);
      if(vo.lv == maxLv)
      return true;
      else
      return false;
    }

    public static getClassByNo(No:number):number
    {
      var classNo = 1;
      var list: any = SheetManager.getList("heart_cfg");
      for (var key in list) {
        var no = parseInt(key);
        var vo:Heart_cfgVo = this.get(no);
        if(vo.no == No)
        {
          classNo = vo.class;
          break;
        }
      }
      return classNo;
    }

    public static getClassMax(classNo:number):number
    {
      var lv = 0;
      var list: any = SheetManager.getList("heart_cfg");
      for (var key in list) {
        var no = parseInt(key);
        var vo:Heart_cfgVo = this.get(no);
        if(vo.class == classNo)
        {
          if(lv < vo.lv)
          lv = vo.lv;
        }
      }
      return lv;
    }
}