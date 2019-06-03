import { BattleUtil } from "../BattleUtil";
import { FightInfo } from "../../battle/model/FightInfo";
import { Move } from "../action/Move";
import { SNewBattleData } from "../../../net/data/SNewBattleData";

export enum ReportType
{
    INVALID = 0,//不是战报
    PHYSICAL_ATTACK = 1,//物理攻击
    MAGIC_ATTACK = 2,//法术攻击
    BUFF = 3,//buff20017
    HEAl = 4,//医疗
    SUMMON = 5,//召唤
    ROUND_END = 6,//回合结束
    BATTLE_END = 7,//20006结束了
    RUN = 8,//逃跑战报

    
    BUFF_UPDATE = 101,//20041
    ATTR_UPDATE = 102,//20042
    BO_DIE_UPDATE = 103,//20043
    BO_REVIVE_UPDATE = 104,//20044
    BO_NEW_ADD = 105,//20062
    NEW_BOS_ADD = 106,//20063
}

export enum ReportState
{
    INVALID = 0,//战报还没开始
    ATTACKER_START = 1,//攻击者开始行动
    ATTACKER_END,//攻击者行动完毕
}


export class NewBaseReport {
    public CurActorId: number;// 当前行动者的id（战斗对象id）
    public CmdType: number;//指令类型（1:使用技能，2: 使用物品， 3:防御，4：保护，5：逃跑，6：捕捉宠物）
    public CmdPara: number;//指令参数（若为使用技能，则表示技能id， 若为使用物品，则表示物品id，其他则统一发0）
    public CurPickTarget: number;//下达指令时所选的目标战斗对象id，没有则发0
    public AllAction:any[] = [];//战报数组行动
    public reportType = ReportType.PHYSICAL_ATTACK;
    protected notice: Notice = new Notice();
    
    /**
     * 解析战报
     */
    public Parse(data:any , report:ReportType)
    {
        this.AllAction = [];
        this.reportType = report;
        switch(report)
        {
            case ReportType.PHYSICAL_ATTACK:
            {
                this.CurActorId = data.CurActorId;
                this.CmdType = data.CmdType;
                this.CmdPara = data.CmdPara;
                this.CurPickTarget = data.CurPickTarget;
                this.AllAction = BattleUtil.parse20015Action(data);
                break;
            }
            case ReportType.MAGIC_ATTACK:
            {
                this.CurActorId = data.CurActorId;
                this.CmdType = data.CmdType;
                this.CmdPara = data.CmdPara;
                this.CurPickTarget = data.CurPickTarget;
                this.AllAction = BattleUtil.parse20016Action(data);
                break;
            }
            case ReportType.BUFF:
            {
                this.CurActorId = data.CurActorId;
                this.CmdType = data.CmdType;
                this.CmdPara = data.CmdPara;
                this.CurPickTarget = data.CurPickTarget;
                this.AllAction =  BattleUtil.parse20017Action(data);
                break;
            }
            case ReportType.SUMMON:
            { 
                this.CurActorId = data.CurActorId;
                this.CmdType = data.CmdType;
                this.CmdPara = data.CmdPara;
                this.CurPickTarget = data.CurPickTarget;
                this.AllAction =  [BattleUtil.parse20021Action(data)];
                break;
            }
            case ReportType.HEAl:
            {
                this.CurActorId = data.CurActorId;
                this.CmdType = data.CmdType;
                this.CmdPara = data.CmdPara;
                this.CurPickTarget = data.CurPickTarget;
                this.AllAction =  BattleUtil.parse20019Action(data);
                break;
            }
            case ReportType.BO_NEW_ADD://有可能62会在普通战报里面
            {
                this.CurActorId = 0;
                this.CmdType = 0;
                this.CmdPara = 0;
                this.CurPickTarget = 0;
                this.AllAction.push(data);
                break;
            }
            case ReportType.ROUND_END://回合结束
            {
                break;
            }
            case ReportType.BATTLE_END://20006战斗结束
            {
                this.AllAction.push(data);
                break;
            }
            
            case ReportType.RUN://逃跑
            {
                this.CurActorId = data.CurActorId;
                this.CmdType = data.CmdType;
                this.CmdPara = data.CmdPara;
                this.CurPickTarget = data.CurPickTarget;
                this.AllAction = [data];
                break;
            }

        }

        
    }

    public dispose():void {
        this.AllAction = [];
        Laya.Pool.recover("NewBaseReport", this);
    }
}