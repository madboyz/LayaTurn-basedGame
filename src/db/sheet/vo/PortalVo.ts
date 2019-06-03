import { SheetManager } from "../SheetManager";
import { PORTAL_BASE } from "../base/PORTAL_BASE";

export class PortalVo extends PORTAL_BASE{

   public static get(id : number,index : number = -1):PortalVo{
           if(this[id])return this[id];
           var vo : PortalVo = new PortalVo();
             this[id] = vo;
           return SheetManager.get("portal",id,this[id],vo.keys(),index);
    }
    /**
     * 根据场景编号返回传送
     * @param sceneNo 
     */
    public static getBySceneNo(sceneNo:number):PortalVo {
      var vo:PortalVo = null;
      var list: any = SheetManager.getList("portal");
      for (var key in list) {
        if(key != null)
        {
          var data = this.get(parseInt(key));
          if(data != null && data.target_scene_no == sceneNo)
          {
            vo = data;
            break;
          }
        }
      }
      return vo;
    }
}