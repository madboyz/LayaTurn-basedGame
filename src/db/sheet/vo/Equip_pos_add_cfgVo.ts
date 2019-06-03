import { SheetManager } from "../SheetManager";
import { EQUIP_POS_ADD_CFG_BASE } from "../base/EQUIP_POS_ADD_CFG_BASE";

export class Equip_pos_add_cfgVo extends EQUIP_POS_ADD_CFG_BASE{

   public static get(id : number,index : number = -1):Equip_pos_add_cfgVo{
           if(this[id])return this[id];
           var vo : Equip_pos_add_cfgVo = new Equip_pos_add_cfgVo();
             this[id] = vo;
           return SheetManager.get("equip_pos_add_cfg",id,this[id],vo.keys(),index);
    }
}