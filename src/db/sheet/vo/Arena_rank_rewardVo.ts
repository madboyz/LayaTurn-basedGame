import { SheetManager } from "../SheetManager";
import { ARENA_RANK_REWARD_BASE } from "../base/ARENA_RANK_REWARD_BASE";

export class Arena_rank_rewardVo extends ARENA_RANK_REWARD_BASE {

  public static get(id: number, index: number = -1): Arena_rank_rewardVo {
    if (this[id]) return this[id];
    var vo: Arena_rank_rewardVo = new Arena_rank_rewardVo();
    this[id] = vo;
    return SheetManager.get("arena_rank_reward", id, this[id], vo.keys(), index);
  }

  public static getByRank(rank: number): Arena_rank_rewardVo {
    var list: Array<Arena_rank_rewardVo> = this.getAll();
    if (rank == 0) {
      return list[list.length - 1];
    } else {
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (rank >= element.begin_ranking && rank <= element.end_ranking) {
          return element;
        }
      }
    }
    return null;
  }

  private static List: Array<Arena_rank_rewardVo>;
  public static getAll(): Array<Arena_rank_rewardVo> {
    if (!this.List) {
      this.List = []
      var list: any = SheetManager.getList("arena_rank_reward");
      var vo: Arena_rank_rewardVo;
      for (var key in list) {
        vo = this.get(parseInt(key));
        this.List.push(vo);
      }
    }
    return this.List;
  }
}