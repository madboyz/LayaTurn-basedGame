import { SheetManager } from "../SheetManager";
import { XINFA_ADD_BASE } from "../base/XINFA_ADD_BASE";

export class Xinfa_addVo extends XINFA_ADD_BASE{

   public static get(id : number,index : number = -1):Xinfa_addVo{
           if(this[id])return this[id];
           var vo : Xinfa_addVo = new Xinfa_addVo();
             this[id] = vo;
           return SheetManager.get("xinfa_add",id,this[id],"no,hp_lim,mp_lim,phy_att,mag_att,phy_def,mag_def,act_speed,seal_hit,seal_resis,crit,ten,hit,dodge",index);
    }
}