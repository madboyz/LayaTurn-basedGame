import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 27 独步天下协议
// =========================================================
//-define（PT_ARENA_1V1_INFO, 27000）.
// 武道会状态
export class C27000 extends MessageBase{
}
export class S27000 extends MessageBase{
  public WinCount:number;//当天胜利次数
  public LoseCount:number;//当天失败次数
    //-define（PT_ARENA_1V1_JOIN,27001）.
  public static DES : Array<any> =
     [
      ["WinCount",MessageBase.UINT16],
      ["LoseCount",MessageBase.UINT16],

    ]
}
//-define（PT_ARENA_1V1_JOIN, 27001）.
// 参加武道会匹配
export class C27001 extends MessageBase{
}
export class S27001 extends MessageBase{
  public RetCode:number;//0表示成功
    //-define（PT_ARENA_1V1_LEAVE,27002）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//-define（PT_ARENA_1V1_LEAVE, 27002）.
// 取消武道会匹配
export class C27002 extends MessageBase{
}
export class S27002 extends MessageBase{
  public RetCode:number;//0表示取消成功
    //-define（PT_ARENA_1V1_READY,27003）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//-define（PT_ARENA_1V1_READY, 27003）.
// 武道会战斗即将开始
export class C27003 extends MessageBase{
}
export class S27003 extends MessageBase{
  public id:number;//对方ID
  public name:string;//对方名字
  public race:number;//对方种族
  public sex:number;//对方性别
  public lv:number;//对方等级
  public faction:number;//对方门派
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT64],
      ["name",MessageBase.STRING],
      ["race",MessageBase.UINT8],
      ["sex",MessageBase.UINT8],
      ["lv",MessageBase.UINT16],
      ["faction",MessageBase.UINT8],

    ]
}
//==========================================================================
// 3V3比武大会
//==========================================================================
//-define（PT_ARENA_3V3_INFO, 27010）.
// 比武大会状态
export class C27010 extends MessageBase{
}
export class S27010 extends MessageBase{
  public day_wins:number;//日胜利场
  public day_losts:number;//日败场次
  public week_wins:number;//周胜场次
  public week_losts:number;//周败场次
  public jifen:number;//积分
    //-define（PT_ARENA_3V3_JOIN,27011）.
  public static DES : Array<any> =
     [
      ["day_wins",MessageBase.UINT8],
      ["day_losts",MessageBase.UINT8],
      ["week_wins",MessageBase.UINT16],
      ["week_losts",MessageBase.UINT16],
      ["jifen",MessageBase.UINT16],

    ]
}
//-define（PT_ARENA_3V3_JOIN, 27011）.
// 参加比武大会
export class C27011 extends MessageBase{
}
export class S27011 extends MessageBase{
  public code:number;//0表示队长点击匹配，通知队员打开界面;1表示有队员离开，不能继续战斗
    //-define（PT_ARENA_3V3_LEAVE,27012）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
//-define（PT_ARENA_3V3_LEAVE, 27012）.
// 离开比武大会
export class C27012 extends MessageBase{
}
export class S27012 extends MessageBase{
  public code:number;//0表示队长点击取消，通知队员可以关闭界面
    //-define（PT_ARENA_3V3_READY,27013）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
export class C27013_1 extends MessageBase{
}
export class S27013_1 extends MessageBase{
  public id:number;//对方ID
  public name:string;//对方名字
  public race:number;//对方种族
  public sex:number;//对方性别
  public lv:number;//对方等级
  public faction:number;//对方门派
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT64],
      ["name",MessageBase.STRING],
      ["race",MessageBase.UINT8],
      ["sex",MessageBase.UINT8],
      ["lv",MessageBase.UINT16],
      ["faction",MessageBase.UINT8],

    ]
}
//-define（PT_ARENA_3V3_READY, 27013）.
// 战斗即将开始
export class C27013 extends MessageBase{
}
export class S27013 extends MessageBase{
  public teamid:number;//对方队伍ID
  public name:string;//对方队伍名字
   public item_1 : S27013_1[];
    //-define（PT_ARENA_3V3_REPORTS,27014）.
  public static DES : Array<any> =
     [
      ["teamid",MessageBase.UINT64],
      ["name",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S27013_1]],

    ]
}
export class C27014_1 extends MessageBase{
}
export class S27014_1 extends MessageBase{
  public win_id:number;//胜方ID
  public win_name:string;//胜方名字
  public lost_id:number;//负方ID
  public lost_name:string;//负方名字
  public wins:number;//胜方胜利次数
  public time:number;//时间
  public static DES : Array<any> =
     [
      ["win_id",MessageBase.UINT64],
      ["win_name",MessageBase.STRING],
      ["lost_id",MessageBase.UINT64],
      ["lost_name",MessageBase.STRING],
      ["wins",MessageBase.UINT16],
      ["time",MessageBase.UINT32],

    ]
}
//-define（PT_ARENA_3V3_REPORTS, 27014）.
// 战报
export class C27014 extends MessageBase{
  public type:number;//类型（个人1，全局2）
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],

    ]
}
export class S27014 extends MessageBase{
  public type:number;//类型（个人1，全局2）
   public item_1 : S27014_1[];
    //-define（PT_ARENA_3V3_WEEK_TOP,27015）.
  public classC27015
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S27014_1]],

    ]
}
//-define（PT_ARENA_3V3_WEEK_TOP, 27015）.
export class C27015 extends MessageBase{
}
export class S27015 extends MessageBase{
  public playerId:number;//玩家ID
  public playerName:string;//姓名
  public static DES : Array<any> =
     [
      ["playerId",MessageBase.UINT64],
      ["playerName",MessageBase.STRING],

    ]
}
//==========================================================================
// 跨服nvn
//==========================================================================
//-define（PT_ARENA_NVN_INFO, 27101）.
// 比武大会状态
export class C27101 extends MessageBase{
}
export class S27101 extends MessageBase{
  public season:number;//赛季
  public score:number;//积分
  public left_time:number;//本次活动剩余次数
  public reward_state:number;//赛季奖励状态：0不可领取;1可领取;2已领取
  public week:number;//本赛季第几周（4周为一个赛季，0表示赛季还没开始）
    //-define（PT_ARENA_NVN_JOIN,27102）.
  public static DES : Array<any> =
     [
      ["season",MessageBase.UINT32],
      ["score",MessageBase.UINT32],
      ["left_time",MessageBase.UINT8],
      ["reward_state",MessageBase.UINT8],
      ["week",MessageBase.UINT8],

    ]
}
export class C27102_1 extends MessageBase{
}
export class S27102_1 extends MessageBase{
  public PlayerID:number;//
  public code:number;//错误码
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],
      ["code",MessageBase.UINT16],

    ]
}
//-define（PT_ARENA_NVN_JOIN, 27102）.
// 参加
export class C27102 extends MessageBase{
}
export class S27102 extends MessageBase{
   public item_1 : S27102_1[];
    //-define（PT_ARENA_NVN_LEAVE,27103）.
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S27102_1]],

    ]
}
//-define（PT_ARENA_NVN_LEAVE, 27103）.
// 离开比武大会
export class C27103 extends MessageBase{
}
export class S27103 extends MessageBase{
  public code:number;//0表示队长点击取消，通知队员可以关闭界面
    //-define（PT_ARENA_NVN_READY,27104）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
export class C27104_1 extends MessageBase{
}
export class S27104_1 extends MessageBase{
  public id:number;//对方ID
  public name:string;//对方名字
  public race:number;//对方种族
  public sex:number;//对方性别
  public lv:number;//对方等级
  public faction:number;//对方门派
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT64],
      ["name",MessageBase.STRING],
      ["race",MessageBase.UINT8],
      ["sex",MessageBase.UINT8],
      ["lv",MessageBase.UINT16],
      ["faction",MessageBase.UINT8],

    ]
}
//-define（PT_ARENA_NVN_READY, 27104）.
// 战斗即将开始
export class C27104 extends MessageBase{
}
export class S27104 extends MessageBase{
  public teamid:number;//对方队伍ID
  public name:string;//对方队伍名字
   public item_1 : S27104_1[];
    //-define（PT_ARENA_NVN_REPORTS,27105）.
  public static DES : Array<any> =
     [
      ["teamid",MessageBase.UINT64],
      ["name",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S27104_1]],

    ]
}
export class C27105_1_1 extends MessageBase{
}
export class S27105_1_1 extends MessageBase{
    //胜利方信息
  public id:number;//ID
  public name:string;//名字
  public race:number;//种族
  public sex:number;//性别
  public lv:number;//等级
  public faction:number;//门派
  public score:number;//积分
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT64],
      ["name",MessageBase.STRING],
      ["race",MessageBase.UINT8],
      ["sex",MessageBase.UINT8],
      ["lv",MessageBase.UINT16],
      ["faction",MessageBase.UINT8],
      ["score",MessageBase.UINT32],

    ]
}
export class C27105_1_2 extends MessageBase{
}
export class S27105_1_2 extends MessageBase{
    //失败方信息
  public id:number;//ID
  public name:string;//名字
  public race:number;//种族
  public sex:number;//性别
  public lv:number;//等级
  public faction:number;//门派
  public score:number;//积分
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT64],
      ["name",MessageBase.STRING],
      ["race",MessageBase.UINT8],
      ["sex",MessageBase.UINT8],
      ["lv",MessageBase.UINT16],
      ["faction",MessageBase.UINT8],
      ["score",MessageBase.UINT32],

    ]
}
export class C27105_1 extends MessageBase{
}
export class S27105_1 extends MessageBase{
  public time:number;//时间
  public score_change:number;//积分变化（如果自己是胜利方，则显示正数，否则显示负数）
   public item_1 : S27105_1_1[];
   public item_2 : S27105_1_2[];
  public static DES : Array<any> =
     [
      ["time",MessageBase.UINT32],
      ["score_change",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S27105_1_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S27105_1_2]],

    ]
}
//-define（PT_ARENA_NVN_REPORTS, 27105）.
// 战报
export class C27105 extends MessageBase{
}
export class S27105 extends MessageBase{
   public item_1 : S27105_1[];
    //-define（PT_ARENA_NVN_GET_REWARD,27106）.
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S27105_1]],

    ]
}
//-define（PT_ARENA_NVN_GET_REWARD, 27106）.
// 领取赛季奖励
export class C27106 extends MessageBase{
}
export class S27106 extends MessageBase{
}
//返回 PT_ARENA_NVN_INFO
//-define（PT_ARENA_NVN_BT_RESULT, 27107）.
// 排位赛结果
export class C27107 extends MessageBase{
}
export class S27107 extends MessageBase{
  public result:number;//1表示胜利，0表示失败
  public score_change:number;//积分变化（如果自己是胜利方，则显示正数，否则显示负数）
  public static DES : Array<any> =
     [
      ["result",MessageBase.UINT8],
      ["score_change",MessageBase.UINT32],

    ]
}
