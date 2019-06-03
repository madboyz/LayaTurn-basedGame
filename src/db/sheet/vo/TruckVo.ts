import { SheetManager } from "../SheetManager";
import { TRUCK_BASE } from "../base/TRUCK_BASE";

export class TruckVo extends TRUCK_BASE{

   public static get(id : number,index : number = -1):TruckVo{
           if(this[id])return this[id];
           var vo : TruckVo = new TruckVo();
             this[id] = vo;
           return SheetManager.get("truck",id,this[id],vo.keys(),index);
    }
}