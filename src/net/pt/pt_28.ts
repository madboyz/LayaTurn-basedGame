import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 28 女妖乱斗活动
// =========================================================
//-define（PT_MELEE_APPLY, 28001）.
// 乱斗活动报名
export class C28001 extends MessageBase{
}
export class S28001 extends MessageBase{
  public code:number;//结果码（0表示成功，成功则弹窗选择是否立即前往；失败情况不返回，直接发错误信息协议）
    //-define（PT_MELEE_ENTER_SCENE,28002）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
export class C28002_1 extends MessageBase{
}
export class S28002_1 extends MessageBase{
  public PlayerID:number;//
  public code:number;//错误码
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],
      ["code",MessageBase.UINT16],

    ]
}
//-define（PT_MELEE_ENTER_SCENE, 28002）.
// 进入乱斗场景
export class C28002 extends MessageBase{
}
export class S28002 extends MessageBase{
  public StartTime:number;//活动时间开始的时间戳
  public EndTime:number;//活动时间结束的时间戳
   public item_1 : S28002_1[];
    //-define（PT_MELEE_LEAVE_SCENE,28003）.
  public static DES : Array<any> =
     [
      ["StartTime",MessageBase.UINT32],
      ["EndTime",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S28002_1]],

    ]
}
//-define（PT_MELEE_LEAVE_SCENE, 28003）.
// 退出乱斗场景 （上缴龙珠也发这条）
export class C28003 extends MessageBase{
}
export class S28003 extends MessageBase{
  public code:number;//结果码（0表示主动退出，1表示活动结束踢出）
    //-define（PT_MELEE_GET_BALL_NUM,28004）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
export class C28004_1 extends MessageBase{
  public id:number;//玩家Id
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT64],

    ]
}
export class S28004_1 extends MessageBase{
}
export class C28004_2 extends MessageBase{
}
export class S28004_2 extends MessageBase{
  public id:number;//玩家Id
  public ball_num:number;//龙珠数量
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT64],
      ["ball_num",MessageBase.UINT8],

    ]
}
//-define（PT_MELEE_GET_BALL_NUM, 28004）.
// 获取玩家龙珠数量
export class C28004 extends MessageBase{
   public item_1 : C28004_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C28004_1]],

    ]
}
export class S28004 extends MessageBase{
   public item_2 : S28004_2[];
    //-define（PT_MELEE_PLUNDER_BALL_NUM,28005）.
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S28004_2]],

    ]
}
//-define（PT_MELEE_PLUNDER_BALL_NUM, 28005）.
// 掠夺龙珠数量-- 客户端同步增加或者扣除数量，是自己的变化则并弹提示信息“您（得到）失去x个龙珠”
export class C28005 extends MessageBase{
}
export class S28005 extends MessageBase{
  public id:number;//玩家id（是自己的话要弹提示）
  public type:number;//掠夺类型（1掠夺2被掠夺3从怪物身上掠夺）
  public ball_num:number;//龙珠数量
    //-define（PT_MELEE_GET_PK_FORCE_PRE_INFO,28006）.
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT64],
      ["type",MessageBase.UINT8],
      ["ball_num",MessageBase.UINT8],

    ]
}
export class C28006_1 extends MessageBase{
}
export class S28006_1 extends MessageBase{
    //队伍中持有龙珠数量
  public ball_num:number;//龙珠数量
  public static DES : Array<any> =
     [
      ["ball_num",MessageBase.UINT8],

    ]
}
//-define（PT_MELEE_GET_PK_FORCE_PRE_INFO, 28006）.
// 决斗前获取对方队伍信息（龙珠数量）
export class C28006 extends MessageBase{
  public target_player_id:number;//目标玩家Id
  public static DES : Array<any> =
     [
      ["target_player_id",MessageBase.UINT64],

    ]
}
export class S28006 extends MessageBase{
  public target_player_id:number;//目标玩家Id
   public item_1 : S28006_1[];
  public rate:number;//掠夺成功概率（0-100）
    //-define（PT_MELEE_SET_BATTLE_STATUS,28007）.
  public static DES : Array<any> =
     [
      ["target_player_id",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S28006_1]],
      ["rate",MessageBase.UINT8],

    ]
}
//-define（PT_MELEE_SET_BATTLE_STATUS, 28007）.
// 进入乱斗场景后，设置玩家的遇敌状态
export class C28007 extends MessageBase{
  public Status:number;//遇敌状态（0可遇敌，1不可遇敌）
  public static DES : Array<any> =
     [
      ["Status",MessageBase.UINT8],

    ]
}
export class S28007 extends MessageBase{
  public Status:number;//遇敌状态（0可遇敌，1不可遇敌）
  public static DES : Array<any> =
     [
      ["Status",MessageBase.UINT8],

    ]
}
