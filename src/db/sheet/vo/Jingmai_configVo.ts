import { SheetManager } from "../SheetManager";
import { JINGMAI_CONFIG_BASE } from "../base/JINGMAI_CONFIG_BASE";

export class Jingmai_configVo extends JINGMAI_CONFIG_BASE{

   public static get(id : number,index : number = -1):Jingmai_configVo{
           if(this[id])return this[id];
           var vo : Jingmai_configVo = new Jingmai_configVo();
             this[id] = vo;
           return SheetManager.get("jingmai_config",id,this[id],vo.keys(),index);
    }

    public static getCurrentVoList(currentNo:number):Array<Jingmai_configVo>
    {
      var List = []
      var list: any = SheetManager.getList("jingmai_config");
      for (var key in list) {
        var no = parseInt(key);
        if(no > currentNo)
        {
          break;
        }
        var vo:Jingmai_configVo = this.get(no);
        List.push(vo)
      }
      return List;
    }

    public static getIsMax(no:number):boolean
    {
      if(no == 0){
        return false;
      }
      var vo:Jingmai_configVo = this.get(no);
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
      var list: any = SheetManager.getList("jingmai_config");
      for (var key in list) {
        var no = parseInt(key);
        var vo:Jingmai_configVo = this.get(no);
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
      var list: any = SheetManager.getList("jingmai_config");
      for (var key in list) {
        var no = parseInt(key);
        var vo:Jingmai_configVo = this.get(no);
        if(vo.class == classNo)
        {
          if(lv < vo.lv)
          lv = vo.lv;
        }
      }
      return lv;
    }
}