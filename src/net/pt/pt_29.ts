import { MessageBase } from "../../message/messageBase/MessageBase";
export class C29000_1 extends MessageBase{
}
export class S29000_1 extends MessageBase{
    //事件信息
  public horse_no:number;//马的编号（1，2，3）
  public event_no:number;//事件编号
  public static DES : Array<any> =
     [
      ["horse_no",MessageBase.UINT8],
      ["event_no",MessageBase.UINT8],

    ]
}
// =========================================================
// 29 圣诞活动
// =========================================================
//---------------------------------------------
// 290 跑马场
//---------------------------------------------
//-define（PT_HORSE_RACE_INFO, 29000）.
// 跑马场界面信息
export class C29000 extends MessageBase{
}
export class S29000 extends MessageBase{
  public status:number;//比赛状态（0-竞猜阶段1-比赛阶段2-比赛结束）
  public pass_time:number;//时间（秒）:阶段开始后到当前的秒数
  public rank_type:number;//当前排名类型（0-12，详情见下方解释）
   public item_1 : S29000_1[];
  public reward_horse_no:number;//中奖的马号（1，2，30表示未中奖）
  public reward_num:number;//中奖的购买数量
  public first_horse_no:number;//中奖的马号（1，2，30表示上一轮刚刚开始，没有中奖马号）
  public is_can_gamble:number;//是否可以竞猜（1表示可以，0表示不可以）
  public cur_gamble_num:number;//已经竞猜了多少次（最大不能超过10次）
  public static DES : Array<any> =
     [
      ["status",MessageBase.UINT8],
      ["pass_time",MessageBase.UINT32],
      ["rank_type",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S29000_1]],
      ["reward_horse_no",MessageBase.UINT8],
      ["reward_num",MessageBase.UINT16],
      ["first_horse_no",MessageBase.UINT8],
      ["is_can_gamble",MessageBase.UINT8],
      ["cur_gamble_num",MessageBase.UINT8],

    ]
}
//
// 排名类型
// 0 : 空
// 1 : 1231号马先到，接着2号马，然后3号马
// 2 : 132
// 3 : 213
// 4 : 231
// 5 : 312
// 6 : 321
// 7 : 12
// 8 : 21
// 9 : 13
// 10: 31
// 11: 23
// 12: 32
// 特殊事件
//-define（HORSE_EVENT_WING, 1）.顺丰而行
//-define（HORSE_EVENT_LOSE, 2）.迷失方向
//-define（HORSE_EVENT_SAVE, 3）.养精蓄锐
//-define（HORSE_EVENT_RUSH, 4）.狂野冲锋
//-define（HORSE_EVENT_STRIKE, 5）.罢赛
//-define（PT_HORSE_RACE_GAMBLE, 29001）.
// 跑马场竞猜
export class C29001 extends MessageBase{
  public horse_no:number;//马号
  public num:number;//购买数量（券数）
  public static DES : Array<any> =
     [
      ["horse_no",MessageBase.UINT8],
      ["num",MessageBase.UINT16],

    ]
}
export class S29001 extends MessageBase{
  public code:number;//结果码（0表示成功失败发送错误tips）
    //-define（PT_HORSE_RACE_USE_PROP,29002）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
//-define（PT_HORSE_RACE_USE_PROP, 29002）.
// 跑马场使用道具 （10sCD时间，前端也做一下预判）
export class C29002 extends MessageBase{
  public horse_no:number;//马号
  public type:number;//道具类型（1神奇草料2绊马钉）
  public num:number;//道具份数（对应消耗券数）
  public static DES : Array<any> =
     [
      ["horse_no",MessageBase.UINT8],
      ["type",MessageBase.UINT8],
      ["num",MessageBase.UINT32],

    ]
}
export class S29002 extends MessageBase{
  public code:number;//结果码（0成功，全服广播贴战报;失败发送错误tips）
  public role_name:string;//玩家名字
  public horse_no:number;//马号
  public type:number;//道具类型（1神奇草料2绊马钉）
  public num:number;//道具份数
    //-define（HORSE_PROP_GOOD,1）.神奇草料
    //-define（HORSE_PROP_BAD,2）.绊马钉
    //-define（PT_HORSE_RACE_REWARD,29003）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],
      ["role_name",MessageBase.STRING],
      ["horse_no",MessageBase.UINT8],
      ["type",MessageBase.UINT8],
      ["num",MessageBase.UINT32],

    ]
}
//-define（HORSE_PROP_GOOD, 1）.神奇草料
//-define（HORSE_PROP_BAD, 2）.绊马钉
//-define（PT_HORSE_RACE_REWARD, 29003）.
// 跑马场领取奖励
export class C29003 extends MessageBase{
  public RewardType:number;//奖励类型（1奖励跑马券2奖励绑银）
  public static DES : Array<any> =
     [
      ["RewardType",MessageBase.UINT8],

    ]
}
export class S29003 extends MessageBase{
  public code:number;//结果码（0成功;失败发送错误tips）
    //-define（PT_HORSE_RACE_GET_HOSER_GAMBLE_INFO,29004）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
//-define（PT_HORSE_RACE_GET_HOSER_GAMBLE_INFO, 29004）.
// 获取各马的支持数
export class C29004 extends MessageBase{
}
export class S29004 extends MessageBase{
  public surport_num1:number;//1号马支持数
  public surport_num2:number;//2号马支持数
  public surport_num3:number;//3号马支持数
    //-define（PT_HORSE_RACE_BUY_GOOD,29005）.
  public static DES : Array<any> =
     [
      ["surport_num1",MessageBase.UINT32],
      ["surport_num2",MessageBase.UINT32],
      ["surport_num3",MessageBase.UINT32],

    ]
}
//-define（PT_HORSE_RACE_BUY_GOOD, 29005）.
// 购买跑马卷
export class C29005 extends MessageBase{
  public good_num:number;//跑马卷数量
  public static DES : Array<any> =
     [
      ["good_num",MessageBase.UINT16],

    ]
}
export class S29005 extends MessageBase{
  public code:number;//结果码（0成功;失败发送错误tips）
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
