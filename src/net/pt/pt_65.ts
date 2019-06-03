import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 65帮战协议
// =========================================================
// 进入第一区域 进入战场
//-define（PT_ENTER1, 65001）.
// 协议号： 65001
export class C65001 extends MessageBase{
}
export class S65001 extends MessageBase{
  public HaltTime:number;//冷却时间
  public static DES : Array<any> =
     [
      ["HaltTime",MessageBase.UINT32],

    ]
}
// 进入区域二读条
//-define（PT_ENTER2, 65002）.
// 协议号： 65002
export class C65002 extends MessageBase{
  public NPCID:number;//or//NPC编号
  public static DES : Array<any> =
     [
      ["NPCID",MessageBase.UINT32],

    ]
}
export class S65002 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 进入区域二读条
//-define（PT_ENTER3, 65003）.
// 协议号： 65003
export class C65003 extends MessageBase{
  public NPCID:number;//or//NPC编号
  public static DES : Array<any> =
     [
      ["NPCID",MessageBase.UINT32],

    ]
}
export class S65003 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 拿取王座
//-define（PT_TAKE, 65004）.
// 协议号： 65004
export class C65004 extends MessageBase{
  public NPCID:number;//or//NPC编号
  public static DES : Array<any> =
     [
      ["NPCID",MessageBase.UINT32],

    ]
}
export class S65004 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 快速清除冷却CD
//-define（PT_QUICK_CLEAR, 65005）.
// 协议号： 65005
export class C65005 extends MessageBase{
}
export class S65005 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 进入区域二读条
//-define（PT_QUICK_ENETR2, 65006）.
// 协议号： 65006
export class C65006 extends MessageBase{
}
export class S65006 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 取消读条
//-define（PT_CANCEL_ENTER, 65007）.
// 协议号： 65006
export class C65007 extends MessageBase{
}
export class S65007 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 帮派战结束战报界面 或者主动查询
//-define（PT_GUILD_END_SEND,65008）.
// 协议号：65008
export class C65008 extends MessageBase{
  public Rounds:number;//帮战轮次
  public static DES : Array<any> =
     [
      ["Rounds",MessageBase.UINT32],

    ]
}
export class S65008 extends MessageBase{
  public Type:number;//是客户端询问还是主动推送0推送1客户端访问
  public Rounds:number;//帮战轮次
  public Join_battle_player_count:number;//参与帮战人数
  public Join_battle_guild_count:number;//参与帮战帮派数
  public Better_fighter_name:string;//最佳战斗王名称
  public Better_fighter_player_id:number;//最佳战斗王id
  public Better_touch_throne_name:string;//最佳偷鸡王
  public Better_touch_throne_player_id:number;//最佳偷鸡王id
  public Better_trouble_name:string;//最佳捣蛋王
  public Better_trouble_player_id:number;//最佳捣蛋王id
  public Better_streak_name:string;//最佳连胜王
  public Better_streak_player_id:number;//最佳连胜王id
  public Better_defend_name:string;//最佳防守王
  public Better_defend_player_id:number;//最佳防守王id
  public Better_try_name:string;//最佳尽力王
  public Better_try_player_id:number;//最佳尽力王id
  public Join_battle_max_rate:number;//最佳参与率帮派参与率
  public Join_battle_max_rate_guild_id:number;//最佳参与率帮派id
  public Join_battle_max_rate_guild_name:string;//最佳参与率帮派名称
  public Join_battle_max_count:number;//参与人数最多帮派人数
  public Join_battle_max_count_guild_id:number;//参与人数最多的帮派id
  public Join_battle_max_count_guild_name:string;//参与人数最多的帮派名字
  public Win_guild_name:string;//获得胜利帮派名称
  public Win_guild_id:number;//获得胜利帮派id
  public Take_throne_player_id:number;//获取王座的玩家id
  public Take_throne_player_name:string;//获取王座的玩家名称
  public Enter1_count:number;//，进入第一区域次数
  public Enter2_count:number;//，进入第二区域次数
  public Enter3_count:number;//，进入第三区域次数
  public Touch_throne:number;//，触摸王座次数
  public Interrupt_load:number;//，打断被人读条次数
  public Battle_win:number;//，战斗胜利次数
  public Battle_lose:number;//，战斗失败次数
  public Max_winning_streak:number;//，最大连胜次数
  public Point:number;//，积分
  public Rank:number;//排名
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["Rounds",MessageBase.UINT32],
      ["Join_battle_player_count",MessageBase.UINT32],
      ["Join_battle_guild_count",MessageBase.UINT32],
      ["Better_fighter_name",MessageBase.STRING],
      ["Better_fighter_player_id",MessageBase.UINT64],
      ["Better_touch_throne_name",MessageBase.STRING],
      ["Better_touch_throne_player_id",MessageBase.UINT64],
      ["Better_trouble_name",MessageBase.STRING],
      ["Better_trouble_player_id",MessageBase.UINT64],
      ["Better_streak_name",MessageBase.STRING],
      ["Better_streak_player_id",MessageBase.UINT64],
      ["Better_defend_name",MessageBase.STRING],
      ["Better_defend_player_id",MessageBase.UINT64],
      ["Better_try_name",MessageBase.STRING],
      ["Better_try_player_id",MessageBase.UINT64],
      ["Join_battle_max_rate",MessageBase.UINT8],
      ["Join_battle_max_rate_guild_id",MessageBase.UINT64],
      ["Join_battle_max_rate_guild_name",MessageBase.STRING],
      ["Join_battle_max_count",MessageBase.UINT8],
      ["Join_battle_max_count_guild_id",MessageBase.UINT64],
      ["Join_battle_max_count_guild_name",MessageBase.STRING],
      ["Win_guild_name",MessageBase.STRING],
      ["Win_guild_id",MessageBase.UINT64],
      ["Take_throne_player_id",MessageBase.UINT64],
      ["Take_throne_player_name",MessageBase.STRING],
      ["Enter1_count",MessageBase.UINT32],
      ["Enter2_count",MessageBase.UINT32],
      ["Enter3_count",MessageBase.UINT32],
      ["Touch_throne",MessageBase.UINT32],
      ["Interrupt_load",MessageBase.UINT32],
      ["Battle_win",MessageBase.UINT32],
      ["Battle_lose",MessageBase.UINT32],
      ["Max_winning_streak",MessageBase.UINT32],
      ["Point",MessageBase.UINT32],
      ["Rank",MessageBase.UINT32],

    ]
}
// 查询当前届的帮战信息
//-define（PT_GET_CUR_GUILD_INFO,65009）.
// 协议号：65009
export class C65009 extends MessageBase{
}
export class S65009 extends MessageBase{
  public Rounds:number;//当前轮次
  public State:number;//当前状态0等待1进行中2结束
  public Time:number;//帮战持续时间或者等待时间状态为等待则是等待时间状态为进行中则是进行时间
  public static DES : Array<any> =
     [
      ["Rounds",MessageBase.UINT32],
      ["State",MessageBase.UINT8],
      ["Time",MessageBase.UINT32],

    ]
}
export class C65010_1 extends MessageBase{
}
export class S65010_1 extends MessageBase{
  public PlayerName:string;//
  public PlayerId:number;//
  public GuildName:string;//
  public GuildId:number;//
  public Enter1_count:number;//进入第1区域次数
  public Enter1_time:number;//进入第1区域时间
  public Enter2_count:number;//进入第2区域次数
  public Enter2_time:number;//进入第2区域时间
  public Enter3_count:number;//进入第3区域次数
  public Enter3_time:number;//进入第3区域时间
  public Touch_throne:number;//触摸王座次数
  public Interrupt_load:number;//打断别人读条
  public Battle_win:number;//战斗胜利次数
  public Battle_lose:number;//战斗失败次数
  public Winning_streak:number;//连胜次数
  public Max_winning_streak:number;//最大连胜次数
  public Point:number;//积分
  public Rank:number;//排名
  public static DES : Array<any> =
     [
      ["PlayerName",MessageBase.STRING],
      ["PlayerId",MessageBase.UINT64],
      ["GuildName",MessageBase.STRING],
      ["GuildId",MessageBase.UINT64],
      ["Enter1_count",MessageBase.UINT32],
      ["Enter1_time",MessageBase.UINT32],
      ["Enter2_count",MessageBase.UINT32],
      ["Enter2_time",MessageBase.UINT32],
      ["Enter3_count",MessageBase.UINT32],
      ["Enter3_time",MessageBase.UINT32],
      ["Touch_throne",MessageBase.UINT32],
      ["Interrupt_load",MessageBase.UINT32],
      ["Battle_win",MessageBase.UINT32],
      ["Battle_lose",MessageBase.UINT32],
      ["Winning_streak",MessageBase.UINT32],
      ["Max_winning_streak",MessageBase.UINT32],
      ["Point",MessageBase.UINT32],
      ["Rank",MessageBase.UINT32],

    ]
}
//查询个人排行
//-define（PT_GET_GUILD_BATTLE_PLAYER_RANK,65010）.
// 协议号：65010
export class C65010 extends MessageBase{
  public Rounds:number;//帮战轮次
  public static DES : Array<any> =
     [
      ["Rounds",MessageBase.UINT32],

    ]
}
export class S65010 extends MessageBase{
  public Rounds:number;//当前轮次
  public PlayerCount:number;//参与人数
  public MyRank:number;//我的排名
   public item_1 : S65010_1[];
  public static DES : Array<any> =
     [
      ["Rounds",MessageBase.UINT32],
      ["PlayerCount",MessageBase.UINT32],
      ["MyRank",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S65010_1]],

    ]
}
export class C65011_1 extends MessageBase{
}
export class S65011_1 extends MessageBase{
  public GuildName:string;//
  public GuildId:number;//
  public Battle_count:number;//战斗胜利次数
  public Battle_win:number;//战斗胜利次数
  public Touch_throne:number;//触摸王座次数
  public Join_battle_player_count:number;//参战人数
  public Point:number;//积分
  public Rank:number;//排名
  public static DES : Array<any> =
     [
      ["GuildName",MessageBase.STRING],
      ["GuildId",MessageBase.UINT64],
      ["Battle_count",MessageBase.UINT32],
      ["Battle_win",MessageBase.UINT32],
      ["Touch_throne",MessageBase.UINT32],
      ["Join_battle_player_count",MessageBase.UINT32],
      ["Point",MessageBase.UINT32],
      ["Rank",MessageBase.UINT32],

    ]
}
//查询帮派排行
//-define（PT_GET_GUILD_BATTLE_GUILD_RANK,65011）.
// 协议号：65011
export class C65011 extends MessageBase{
  public Rounds:number;//帮战轮次
  public static DES : Array<any> =
     [
      ["Rounds",MessageBase.UINT32],

    ]
}
export class S65011 extends MessageBase{
  public Rounds:number;//当前轮次
  public GuildCount:number;//参与人数
  public MyRank:number;//我帮排名
   public item_1 : S65011_1[];
  public static DES : Array<any> =
     [
      ["Rounds",MessageBase.UINT32],
      ["GuildCount",MessageBase.UINT32],
      ["MyRank",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S65011_1]],

    ]
}
//查询帮派排行
//-define（PT_SEND_PLAYER_LV_LIMIT,65012）.
// 协议号：65012
export class C65012 extends MessageBase{
}
export class S65012 extends MessageBase{
  public PlayerId:number;//玩家id
  public PlayerName:string;//玩家名称
  public PlayerLv:number;//玩家等级
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["PlayerName",MessageBase.STRING],
      ["PlayerLv",MessageBase.UINT32],

    ]
}
// 取消读条
//-define（PT_LOAD_TIME, 12027）.
// 协议号： 12027
export class C12027 extends MessageBase{
}
export class S12027 extends MessageBase{
  public PlayerId:number;//玩家id
  public NPCID:number;//读条NPC
  public LoadTime:number;//读条秒数
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["NPCID",MessageBase.UINT8],
      ["LoadTime",MessageBase.UINT16],

    ]
}
