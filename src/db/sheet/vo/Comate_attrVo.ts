import { SheetManager } from "../SheetManager";
import { COMATE_ATTR_BASE } from "../base/COMATE_ATTR_BASE";

export class Comate_attrVo extends COMATE_ATTR_BASE{

   public static get(id : number,index : number = -1):Comate_attrVo{
           if(this[id])return this[id];
           var vo : Comate_attrVo = new Comate_attrVo();
             this[id] = vo;
           return SheetManager.get("comate_attr",id,this[id],vo.keys(),index);
    }
    /**
     * 伙伴天赋点
     */
    public static getComateAttr(no:number):Array<Comate_attrVo>
    {
      var len: number = SheetManager.getComplexLength("comate_attr", no);
      var currentVo:Array<Comate_attrVo> = new Array<Comate_attrVo>();
      for (var i: number = 0; i < len; i++) {
        var vo: Comate_attrVo = new Comate_attrVo();
        vo = SheetManager.get("comate_attr",no,vo,vo.keys(),i);;
        currentVo.push(vo);
      }
      return currentVo;
    }

    public static getComateAttrByAttrId(comateNo:number , attrNo:number):Comate_attrVo
    {
      var len: number = SheetManager.getComplexLength("comate_attr", comateNo);
      var currentVo:Comate_attrVo = null;
      for (var i: number = 0; i < len; i++) {
        var vo: Comate_attrVo = new Comate_attrVo();
        vo = SheetManager.get("comate_attr",comateNo,vo,vo.keys(),i);
        if(vo.attr_no == attrNo)
        {
          currentVo = vo;
          break;
        }
      }
      return currentVo;
    }
}

