import { SheetManager } from "../SheetManager";
import { AWARD_CFG_BASE } from "../base/AWARD_CFG_BASE";

export class Award_cfgVo extends AWARD_CFG_BASE{

   public static get(id : number,index : number = -1):Award_cfgVo{
           if(this[id])return this[id];
           var vo : Award_cfgVo = new Award_cfgVo();
             this[id] = vo;
           return SheetManager.get("award_cfg",id,this[id],vo.keys(),index);
    }
}