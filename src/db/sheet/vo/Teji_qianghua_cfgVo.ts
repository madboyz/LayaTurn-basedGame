import { SheetManager } from "../SheetManager";
import { TEJI_QIANGHUA_CFG_BASE } from "../base/TEJI_QIANGHUA_CFG_BASE";

export class Teji_qianghua_cfgVo extends TEJI_QIANGHUA_CFG_BASE{

   public static get(id : number,index : number = -1):Teji_qianghua_cfgVo{
           if(this[id])return this[id];
           var vo : Teji_qianghua_cfgVo = new Teji_qianghua_cfgVo();
             this[id] = vo;
           return SheetManager.get("teji_qianghua_cfg",id,this[id],vo.keys(),index);
    }
}