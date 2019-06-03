import { SheetManager } from "../SheetManager";
import { PET_REFINE_BASE } from "../base/PET_REFINE_BASE";
import { SBagData } from "../../../net/data/SBagData";
import { PropertyVo } from "./PropertyVo";

export class Pet_refineVo extends PET_REFINE_BASE{

   public static get(id : number,index : number = -1):Pet_refineVo{
          //  if(this[id])return this[id];
           var vo : Pet_refineVo = new Pet_refineVo();
             this[id] = vo;
           return SheetManager.get("pet_refine",id,this[id],vo.keys(),index);
    }

  private static datas: Pet_refineVo[];
  private static getAll(): Pet_refineVo[] {
    if(!this.datas)
    {
      this.datas = []
      var list: any = SheetManager.getList("pet_refine");
      for (var key in list) {
        var arr:Array<Pet_refineVo> = list[key];
        var vo:Pet_refineVo;
        if(arr[0] instanceof Array)
        {
          for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            vo = Pet_refineVo.get(parseInt(key),index);
            this.datas.push(vo);
          }
        }
        else
        {
            vo = Pet_refineVo.get(parseInt(key));
            this.datas.push(vo);
        }
      }
    }
    return this.datas;
  }

  private static _attrNameList:Array<any>;
  public static get atrrNameList():Array<any>
  {
    if(!this._attrNameList)
    {
      this._attrNameList = [];
      this.getAll();
      for (let index = 0; index < this.datas.length; index++) {
        const element = this.datas[index];
        if(!this._attrNameList[element.attr_name])
        {
          this._attrNameList[element.attr_name] = [];
        }
        this._attrNameList[element.attr_name].push(element);
      }
    }
    return this._attrNameList;
  }

  public static getMListByName(name:string):Array<any>
  {
      this.getAll();
      var arr:Array<Pet_refineVo> = this.atrrNameList[name];
      var list:Array<any> = [];
      var obj:object;
      for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
          const element = arr[key];
          obj = {};
          obj["ele"] = element;
          obj["num"] = SBagData.instance.prop.getItemCountByGoodsNo(element.no);
          list.push(obj);
        }
      }
      return list;
  }

  public static getTypeAttrNames(type:string):Array<Pet_refineVo>
  {
    return this.atrrNameList[type];
  }
}