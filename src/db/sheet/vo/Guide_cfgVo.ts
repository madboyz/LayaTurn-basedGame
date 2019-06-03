import { SheetManager } from "../SheetManager";
import { GUIDE_CFG_BASE } from "../base/GUIDE_CFG_BASE";

export class Guide_cfgVo extends GUIDE_CFG_BASE{

   public static get(id : number,index : number = -1):Guide_cfgVo{
           if(this[id])return this[id];
           var vo : Guide_cfgVo = new Guide_cfgVo();
             this[id] = vo;
           return SheetManager.get("guide_cfg",id,this[id],vo.keys(),index);
    }
    /**
     * 根据任务id查找引导
     * @param taskId 
     */
    public static getGuideByTaskId(taskId:number)
    {
      var currentVo:Guide_cfgVo = null;
      var list: any = SheetManager.getList("guide_cfg");
      for (var key in list) {
        var no = parseInt(key);
        var vo:Guide_cfgVo = this.get(no);
        if(vo.task_no == taskId)
        {
          currentVo = vo;
          break;
        }
      }
      return currentVo;
    }
}