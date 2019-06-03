import { SheetManager } from "../SheetManager";
import { SLOT_MACHINE_BASE } from "../base/SLOT_MACHINE_BASE";

export class Slot_machineVo extends SLOT_MACHINE_BASE{

   public static get(id : number,index : number = -1):Slot_machineVo{
           if(this[id])return this[id];
           var vo : Slot_machineVo = new Slot_machineVo();
             this[id] = vo;
           return SheetManager.get("slot_machine",id,this[id],vo.keys(),index);
    }
}