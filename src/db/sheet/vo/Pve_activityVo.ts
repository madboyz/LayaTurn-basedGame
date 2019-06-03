import { SheetManager } from "../SheetManager";
import { PVE_ACTIVITY_BASE } from "../base/PVE_ACTIVITY_BASE";

export class Pve_activityVo extends PVE_ACTIVITY_BASE{
  private static dataObj:object;
   public static get(id : number,index : number = -1):Pve_activityVo{
           if(this[id])return this[id];
           var vo : Pve_activityVo = new Pve_activityVo();
             this[id] = vo;
           return SheetManager.get("pve_activity",id,this[id],vo.keys(),index);
    }

    public static getnoByDunNo(dunNo:number):Pve_activityVo
    {
      if(!this.dataObj)
      {
        this.dataObj = SheetManager.getList("pve_activity");
      }

      var vo:Pve_activityVo;
        for (const key in this.dataObj) {
          if (this.dataObj.hasOwnProperty(key)) {
            vo = this.get(Number(key));
            if(dunNo == vo.dungeon_no)
            {
              return vo;
            }
          }
        }
        return null;
    }
}