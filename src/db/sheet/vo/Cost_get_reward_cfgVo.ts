import { SheetManager } from "../SheetManager";
import { COST_GET_REWARD_CFG_BASE } from "../base/COST_GET_REWARD_CFG_BASE";

export class Cost_get_reward_cfgVo extends COST_GET_REWARD_CFG_BASE{

   public static get(id : number,index : number = -1):Cost_get_reward_cfgVo{
           if(this[id])return this[id];
           var vo : Cost_get_reward_cfgVo = new Cost_get_reward_cfgVo();
             this[id] = vo;
           return SheetManager.get("cost_get_reward_cfg",id,this[id],vo.keys(),index);
    }

    private static datas: Array<Cost_get_reward_cfgVo>;
    public static getAll(): Array<Cost_get_reward_cfgVo> {
      if (!this.datas) {
        this.datas = [];
        var list: any = SheetManager.getList("cost_get_reward_cfg");
        for (var key in list) {
          var vo: Cost_get_reward_cfgVo = this.get(parseInt(key));
          this.datas.push(vo);
        }
      }
      return this.datas;
    }

}