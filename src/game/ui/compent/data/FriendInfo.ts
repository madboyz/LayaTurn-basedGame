import { S14000_1, S14005, S14006, S14010_1 } from "../../../../net/pt/pt_14";
import { TimerUtil } from "../../../utils/TimerUtil";

export class FriendInfo {
    public Id:number;//记录号
    public PlayerId:number;//好友id
    public Online:number;//0表示在线，其他表示上次离线时间
    public Lv:number;//等级
    public VipLv:number;//vip等级
    public Race:number;//种族
    public Faction:number;//门派
    public Sex:number;//性别
    public BattlePower:number;//战斗力
    public Name:string = "";//名字
    public Intimacy:number = 0;//好友度
    public GiveState:number;//赠送爱心状态，1表示已赠送
    public LoveState:number;//收取爱心状态：0表示未收到;1表示收到未领取;2表示收到已领取
    constructor() {
        
    }

    /**
     * 初始化好友信息
     * @param {S14000_1} data
     * @memberof FriendInfo
     */
    public initData(data:S14000_1|S14005|S14006|S14010_1):void
    {
        if(data instanceof S14000_1)
        {
            this.Id = data.Id;
            this.PlayerId = data.PlayerId;
            this.Online = data.Online;
            this.Lv = data.Lv;
            this.Race = data.Race;
            this.Faction = data.Faction;
            this.Sex = data.Sex;
            this.BattlePower = data.BattlePower;
            this.Name = data.Name;
            this.Intimacy = data.Intimacy;
            this.GiveState = data.GiveState;
            this.LoveState = data.LoveState;
        }
        else if(data instanceof S14005)
        {
            this.Id = data.Id;
            this.PlayerId = data.PlayerId;
            this.Online = data.Online;
            this.Lv = data.Lv;
            this.Race = data.Race;
            this.Faction = data.Faction;
            this.Sex = data.Sex;
            this.BattlePower = data.BattlePower;
            this.Name = data.Name;
            this.Intimacy = 0;
            this.GiveState = data.GiveState;
            this.LoveState = data.LoveState;
        }
        else if(data instanceof S14006)
        {
            this.PlayerId = data.Id;
            this.Lv = data.Lv;
            this.Race = data.Race;
            this.Faction = data.Faction;
            this.Sex = data.Sex;
            this.BattlePower = data.BattlePower;
            this.Name = data.Name;
        }
        else if(data instanceof S14010_1)
        {
            this.PlayerId = data.PlayerId;
            this.Lv = data.Lv;
            this.VipLv = data.VipLv;
            this.Race = data.Race;
            this.Faction = data.Faction;
            this.Sex = data.Sex;
            this.BattlePower = data.BattlePower;
            this.Name = data.Name;
        }
    }

    /**
     * 离线描述
     * @readonly
     * @type {string}
     * @memberof FriendInfo
     */
    public get offLineStr():string
    {
        var leftTime:number = (Date.now()/1000) - this.Online;
        var str:string = TimerUtil.getOffLineTime(leftTime);
        return str;
    }
}