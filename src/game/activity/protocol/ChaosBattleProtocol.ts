
import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C28002, C28003, C28004, C28006, C28007, C28004_1, C28001 } from "../../../net/pt/pt_28";
import { SRoleData } from "../../../net/data/SRoleData";
import { MsgManager } from "../../ui/manager/MsgManager";
import { SChaosBattleData } from "../data/SChaosBattleData";
import { SCopyData } from "../../../net/data/SCopyData";
export class ChaosBattleProtocol extends BaseProtocol {
    public send28007(status:number)
    {
        var msg:C28007 = new C28007();
        msg.Status = status;
        this.send(msg);
    }
    //报名
    public send28001()
    {
        if(SRoleData.instance.info.TeamId != 0)
        {
            MsgManager.instance.showRollTipsMsg("组队中无法进行该操作");
            return;
        }
        if(SChaosBattleData.instance.isChaoScene())
        {
            MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            return;
        }
        if(SCopyData.instance.isInCopy)
        {
            MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            return;
        }
        var msg:C28001 = new C28001();
        this.send(msg);
    }

    /**
     * 进入乱斗场景
     */
    public send28002()
    {
        var msg:C28002 = new C28002();
        this.send(msg);
    }
    /**
     * 退出乱斗场景 （上缴龙珠也发这条）
     */
    public send28003()
    {
        var msg:C28003 = new C28003();
        this.send(msg);
    }
    /**
     * 获取玩家龙珠数量
     * @param playerId 
     */
    public send28004(playerIds:Array<number>)
    {
        var msg:C28004 = new C28004();
        msg.item_1 = new Array<C28004_1>();
        for (let i = 0; i < playerIds.length; i++) {
            const element = playerIds[i];
            var _data:C28004_1 = new C28004_1();
            _data.id = element;
            msg.item_1.push(_data);
        }
        this.send(msg);
    }
    /**
     * 决斗前获取对方队伍信息（龙珠数量）
     * @param playerId 
     */
    public send28006(playerId:number)
    {
        var msg:C28006 = new C28006();
        msg.target_player_id = playerId;
        this.send(msg);
    }
}