import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C22001, C22002 } from "../../../../../net/pt/pt_22";
import { RankType } from "../panel/RankMainPanel";

export  class RankMainProrocol extends BaseProtocol {
    public RequsetRank(rankType:number , pageSize:number , pageIndex:number)
    {
        var msg = null;
        if(rankType == RankType.PET||rankType == RankType.RIDE||rankType == RankType.COMATE)
        {
            msg = new C22002();
        }
        else
        {
            msg = new C22001();
        }
        msg.RankType = rankType;
        msg.PageSize = pageSize;
        msg.PageIndex = pageIndex;
        this.send(msg);
    }
}

export enum SRankEvent {
    RANK_PAGE_LIST = "rank_page_list",//请求排行榜
    RANK_PET_MIJING = "rank_pet_mijing",//请求宠物秘境排行榜
    RANK_TTT = "rank_ttt",//请求通天塔排行榜
    RANK_PET_COPY = "rank_pet_copy",//请求宠物秘境排行榜
}