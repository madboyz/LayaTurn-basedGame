import { SheetManager } from "../SheetManager";
import { XINFA_NORMAL_BASE } from "../base/XINFA_NORMAL_BASE";

export class Xinfa_normalVo extends XINFA_NORMAL_BASE{

   public static get(id : number,index : number = -1):Xinfa_normalVo{
           if(this[id])return this[id];
           var vo : Xinfa_normalVo = new Xinfa_normalVo();
             this[id] = vo;
           return SheetManager.get("xinfa_normal",id,this[id],"no,hp,mp,phy_att,mag_att,phy_def,mag_def,act_speed,seal_hit,seal_resis,crit,ten,hit,dodge",index);
    }
}