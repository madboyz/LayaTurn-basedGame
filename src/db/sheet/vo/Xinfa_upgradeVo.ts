import { SheetManager } from "../SheetManager";
import { XINFA_UPGRADE_BASE } from "../base/XINFA_UPGRADE_BASE";

export class Xinfa_upgradeVo extends XINFA_UPGRADE_BASE{

   public static get(id : number,index : number = -1):Xinfa_upgradeVo{
           if(this[id])return this[id];
           var vo : Xinfa_upgradeVo = new Xinfa_upgradeVo();
             this[id] = vo;
           return SheetManager.get("xinfa_upgrade",id,this[id],"no,exp,gamemoney",index);
    }
}