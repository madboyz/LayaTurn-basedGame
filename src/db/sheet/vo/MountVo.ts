import { SheetManager } from "../SheetManager";
import { MOUNT_BASE } from "../base/MOUNT_BASE";

export class MountVo extends MOUNT_BASE{

   public static get(id : number,index : number = -1):MountVo{
           if(this[id])return this[id];
           var vo : MountVo = new MountVo();
             this[id] = vo;
           return SheetManager.get("mount",id,this[id],vo.keys(),index);
    }

  private static petList: MountVo[];
  public static get getAll(): MountVo[] {
    if(!this.petList)
    {
      this.petList = []
      var list: any = SheetManager.getList("mount");
      for (var key in list) {
        this.petList.push(this.get(parseInt(key)));
      }
    }
    return this.petList;
  }
}