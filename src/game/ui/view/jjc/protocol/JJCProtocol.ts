import { BaseProtocol } from "../../../../../net/protocol/BaseProtocol";
import { C23001, C23005, C23010, S23005_1, C23008, C23013, C23002 } from "../../../../../net/pt/pt_23";
import { SCopyData } from "../../../../../net/data/SCopyData";
import { MsgManager } from "../../../manager/MsgManager";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { SChaosBattleData } from "../../../../activity/data/SChaosBattleData";

export class JJCProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 请求竞技场的基本信息
     */
    public send23001(): void {
        var msg:C23001 = new C23001();
        this.send(msg);
    }

    /**
     * 请求竞技场的对手信息
     */
    public send23005(): void {
        var msg:C23005 = new C23005();
        this.send(msg);
    }

    /**
     * 请求竞技场的进行对战
     */
    public send23010(data:S23005_1): void {
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
        var msg:C23010 = new C23010();
        msg.id = data.id;
        msg.rank = data.rank;
        this.send(msg);
    }

    /**
     * 请求竞技场的排名奖励
     */
    public send23018(): void {
        var msg:C23008 = new C23008();
        this.send(msg);
    }
    
    /**
     * 请求竞技场购买次数
     */
    public send23013(): void {
        var msg:C23013 = new C23013();
        this.send(msg);
    }
    
    /**
     * 请求竞技场记录的数据
     */
    public send23002(): void {
        var msg:C23002 = new C23002();
        this.send(msg);
    }

}