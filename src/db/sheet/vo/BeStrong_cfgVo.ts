import { SheetManager } from "../SheetManager";
import { BESTRONG_CFG_BASE } from "../base/BESTRONG_CFG_BASE";

export class BeStrong_cfgVo extends BESTRONG_CFG_BASE {

  public static get(id: number, index: number = -1): BeStrong_cfgVo {
    if (this[id]) return this[id];
    var vo: BeStrong_cfgVo = new BeStrong_cfgVo();
    this[id] = vo;
    return SheetManager.get("beStrong_cfg", id, this[id], vo.keys(), index);
  }

  private static typeDic: Laya.Dictionary;
  public static getListByType(index: number): Array<BeStrong_cfgVo> {
    if (!this.typeDic) {
      this.typeDic = new Laya.Dictionary;
      var list: any = SheetManager.getList("beStrong_cfg");
      for (var key in list) {
        var vo: BeStrong_cfgVo = this.get(parseInt(key));
        var indexList:Array<BeStrong_cfgVo> = this.typeDic.get(vo.type);
        if (!indexList) {
          indexList = new Array<BeStrong_cfgVo>();
          this.typeDic.set(vo.type, indexList);
        }
        indexList.push(vo);
      }
    }
    var showList:Array<BeStrong_cfgVo> = this.typeDic.get(index);
    showList.sort(this.sortFunc);
    return showList;
  }
  
  private static sortFunc(a: BeStrong_cfgVo, b: BeStrong_cfgVo): number {
    if(a.star > b.star){
      return -1
    }else if (a.star < b.star){
      return 1;
    }else{
      return a.no - b.no;
    }
}

}