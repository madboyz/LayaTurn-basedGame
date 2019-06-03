import { SheetManager } from "../SheetManager";
import { PROPERTY_BASE } from "../base/PROPERTY_BASE";

export class PropertyVo extends PROPERTY_BASE{

   public static get(id : number,index : number = -1):PropertyVo{
           if(this[id])return this[id];
           var vo : PropertyVo = new PropertyVo();
             this[id] = vo;
           return SheetManager.get("property",id,this[id],vo.keys(),index);
    }

  private static datas:Array<PropertyVo>;
  public static getAll(): void {
    if(!this.datas)
    {
      this.datas = [];
      var list: any = SheetManager.getList("property");
      for (var key in list) {
        var vo: PropertyVo = this.get(parseInt(key));
        this.datas.push(vo);
      }
    }
  }

  public static getByInfo(str:string): PropertyVo {
    this.getAll();
    for (let index = 0; index < this.datas.length; index++) {
      var element =  this.datas[index];
      if(element.sys_name == str)
      {
        return element;
      }
    }
    return null;
  }
}