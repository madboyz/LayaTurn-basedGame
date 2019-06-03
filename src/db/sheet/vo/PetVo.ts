import { SheetManager } from "../SheetManager";
import { PET_BASE } from "../base/PET_BASE";

export class PetVo extends PET_BASE {

  public static get(id: number, index: number = -1): PetVo {
    if (this[id]) return this[id];
    var vo: PetVo = new PetVo();
    this[id] = vo;
    return SheetManager.get("pet", id, this[id], vo.keys(), index);
  }

  private static petList: PetVo[];
  public static get getAll(): PetVo[] {
    if(!this.petList)
    {
      this.petList = []
      var list: any = SheetManager.getList("pet");
      for (var key in list) {
        this.petList.push(this.get(parseInt(key)));
      }
    }
    return this.petList;
  }
}