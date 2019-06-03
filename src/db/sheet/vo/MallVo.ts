import { SheetManager } from "../SheetManager";
import { MALL_BASE } from "../base/MALL_BASE";

export class MallVo extends MALL_BASE{

   public static get(id : number,index : number = -1):MallVo{
           if(this[id])return this[id];
           var vo : MallVo = new MallVo();
             this[id] = vo;
           return SheetManager.get("mall",id,this[id],vo.keys(),index);
    }

    private static isAll: boolean;
    private static typeList:Array<any> = [];
    private static _shopList:Array<number> = [];
    public static getAll(): void {
      if(!this.isAll)
      {
        this.isAll = true;
        var list: any = SheetManager.getList("mall");
        for (var key in list) {
          var vo: MallVo = this.get(parseInt(key));
          if(this._shopList.indexOf(vo.sell_type) == -1)
          {
            this._shopList.push(vo.sell_type);
          }
          if(this.typeList[vo.sell_type] == null)
          {
            this.typeList[vo.sell_type] = [];
          }
          this.typeList[vo.sell_type].push(vo);
        }
      }
    }

    public static get shopList():Array<number>
    {
      this.getAll();
      return this._shopList;
    }

    public static getTypeList(type:number):Array<MallVo>
    {
        this.getAll();
        return this.typeList[type];
    }

    public static getPriceTypeByShopType(type:number)
    {
      this.getAll();
      var list = this.typeList[type];
      if(list.length > 0)
      return list[0].price_type;
    }
}