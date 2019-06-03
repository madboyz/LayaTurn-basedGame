import { MsgManager } from './../../../game/ui/manager/MsgManager';
import { SGameData } from './../../../net/data/SGameData';
import { SRoleData } from './../../../net/data/SRoleData';
import { SheetManager } from "../SheetManager";
import { SYS_OPEN_BASE } from "../base/SYS_OPEN_BASE";

export class Sys_openVo extends SYS_OPEN_BASE {

  public static get(id: number, index: number = -1): Sys_openVo {
    if (this[id]) return this[id];
    var vo: Sys_openVo = new Sys_openVo();
    this[id] = vo;
    return SheetManager.get("sys_open", id, this[id], vo.keys(), index);
  }

  private static allFuncCfgs: Sys_openVo[];
  public static getAllFuncCfgs(): Sys_openVo[] {
    if (!this.allFuncCfgs) {
      this.allFuncCfgs = []
      var list: any = SheetManager.getList("sys_open");
      for (var key in list) {
        var vo: Sys_openVo = this.get(parseInt(key));
        if (vo.tips && vo.tips > 0) {
          this.allFuncCfgs.push(vo);
        }
      }
      this.allFuncCfgs.sort((a: Sys_openVo, b: Sys_openVo) => {
        return a.lv_need < b.lv_need ? -1 : 1;
      });
    }
    return this.allFuncCfgs;
  }

  public static nextFuncCfg(playerLv: number): Sys_openVo {
    var cfgs = this.getAllFuncCfgs();
    for (let i = 0; i < cfgs.length; i++) {
      var cfg = cfgs[i] as Sys_openVo;
      if (cfg.lv_need > playerLv) {
        return cfg;
      }
    }
    return null;
  }

  public static getFuncCfg(sysid: number): Sys_openVo {
    var cfgs = this.getAllFuncCfgs();
    for (let i = 0; i < cfgs.length; i++) {
      var cfg = cfgs[i] as Sys_openVo;
      if (cfg.no == sysid) {
        return cfg;
      }
    }
    return null;
  }

}