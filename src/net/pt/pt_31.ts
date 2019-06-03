import { MessageBase } from "../../message/messageBase/MessageBase";
// --------------------
// 查询具体运营在线活动
//-define（PT_SYNC_ONLINE_ACTIVITY, 31051）.
// 协议号：31051
export class C31051 extends MessageBase{
  public id:number;//活动ID
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],

    ]
}
export class S31051 extends MessageBase{
  public id:number;//活动ID
  public start_time:number;//图标开始时间
  public end_time:number;//图标关闭时间
  public content:string;//内容
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],
      ["start_time",MessageBase.UINT32],
      ["end_time",MessageBase.UINT32],
      ["content",MessageBase.STRING],

    ]
}
export class C31060_1 extends MessageBase{
}
export class S31060_1 extends MessageBase{
  public id:number;//活动ID
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],

    ]
}
// --------------------
// 查询生效的运营活动2ID列表
//-define（PT_GET_ADMIN_SYS_ACTIVITY_LIST, 31060）.
// 协议号：31060
export class C31060 extends MessageBase{
}
export class S31060 extends MessageBase{
   public item_1 : S31060_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S31060_1]],

    ]
}
// --------------------
// 查询具体活动2内容
//-define（PT_GET_ADMIN_SYS_ACTIVITY_INFO, 31061）.
// 协议号：31061
export class C31061 extends MessageBase{
  public id:number;//活动ID
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],

    ]
}
export class S31061 extends MessageBase{
  public id:number;//活动ID
  public content:string;//内容
  public sys:number;//活动类型
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],
      ["content",MessageBase.STRING],
      ["sys",MessageBase.UINT8],

    ]
}
// --------------------
// 通知活动改变
// 协议号：31062
//-define（PT_NOTIFY_ADMIN_SYS_ACTIVITY_CHANGE, 31062）.
export class C31062 extends MessageBase{
    //-define（PT_NOTIFY_ADMIN_SYS_ACTIVITY_CHANGE,31062）.
}
export class S31062 extends MessageBase{
  public id:number;//活动ID
  public type:number;//0:删除；1:新增
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],
      ["type",MessageBase.UINT8],

    ]
}
// 查询|推送（发生变化时）具体活动进度
// 协议号：31063
//-define（PT_GET_ADMIN_SYS_ACTIVITY_PROGRESS, 31063）.
export class C31063 extends MessageBase{
  public id:number;//活动ID
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],

    ]
}
export class S31063 extends MessageBase{
  public id:number;//活动ID
  public val:number;//当前活动进度
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],
      ["val",MessageBase.UINT32],

    ]
}
export class C31070_1 extends MessageBase{
}
export class S31070_1 extends MessageBase{
  public id:number;//活动ID
  public no:number;//活动编号
  public start_time:number;//开始时间
  public end_time:number;//关闭时间
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],
      ["no",MessageBase.UINT32],
      ["start_time",MessageBase.UINT32],
      ["end_time",MessageBase.UINT32],

    ]
}
// --------------------
// 查询生效的节日活动列表
//-define（PT_SYNC_FESTIVAL_ACTIVITY, 31070）.
// 协议号：31070
export class C31070 extends MessageBase{
}
export class S31070 extends MessageBase{
   public item_1 : S31070_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S31070_1]],

    ]
}
// --------------------
// 通知节日活动改变
//-define（PT_NOTIFY_FESTIVAL_ACTIVITY_CHANGE, 31072）.
// 协议号：31072
export class C31072 extends MessageBase{
}
export class S31072 extends MessageBase{
  public id:number;//活动ID
  public no:number;//活动编号
  public type:number;//0:删除；1:新增
  public start_time:number;//开始时间
  public end_time:number;//关闭时间
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],
      ["no",MessageBase.UINT32],
      ["type",MessageBase.UINT8],
      ["start_time",MessageBase.UINT32],
      ["end_time",MessageBase.UINT32],

    ]
}
export class C31100_1 extends MessageBase{
}
export class S31100_1 extends MessageBase{
    //抽奖项信息
  public no:number;//位置（唯一标识）
  public gid:number;//物品ID
  public num:number;//数量
  public quality:number;//物品品质
  public bind:number;//是否绑定（0绑定1非绑定）
  public get_flag:number;//获取标识（0未获取1已获取）
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT8],
      ["gid",MessageBase.UINT32],
      ["num",MessageBase.UINT32],
      ["quality",MessageBase.UINT8],
      ["bind",MessageBase.UINT8],
      ["get_flag",MessageBase.UINT8],

    ]
}
export class C31100_2 extends MessageBase{
}
export class S31100_2 extends MessageBase{
    //幸运玩家列表
  public name:string;//玩家名字
  public goodsno:number;//物品id
  public quality:number;//物品品质
  public num:number;//数量
  public static DES : Array<any> =
     [
      ["name",MessageBase.STRING],
      ["goodsno",MessageBase.UINT32],
      ["quality",MessageBase.UINT8],
      ["num",MessageBase.UINT32],

    ]
}
// ===========================
// 女妖选美-抽奖活动 相关
// ===========================
// --------------------
// 获取抽奖面板信息
// 协议号：31100
//-define（PT_QRY_GET_BEAUTY_CONTEST,  31100）.
export class C31100 extends MessageBase{
  public act_id:number;//活动ID
  public static DES : Array<any> =
     [
      ["act_id",MessageBase.UINT32],

    ]
}
export class S31100 extends MessageBase{
  public act_id:number;//活动ID
  public next_big_reward_time:number;//下次大奖剩余时间（秒）
  public next_reset_time:number;//下次刷新面板时间（秒）
   public item_1 : S31100_1[];
   public item_2 : S31100_2[];
  public static DES : Array<any> =
     [
      ["act_id",MessageBase.UINT32],
      ["next_big_reward_time",MessageBase.UINT32],
      ["next_reset_time",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S31100_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S31100_2]],

    ]
}
// --------------------
// 抽奖
// 协议号：31101
//-define（PT_QRY_BEAUTY_CONTEST_GAMBLE,  31101）.
export class C31101 extends MessageBase{
  public act_id:number;//活动ID
  public cost_type:number;//消耗类型（1道具消耗2绑金消耗）
  public static DES : Array<any> =
     [
      ["act_id",MessageBase.UINT32],
      ["cost_type",MessageBase.UINT8],

    ]
}
export class S31101 extends MessageBase{
  public act_id:number;//活动ID
  public code:number;//结果（0成功1系统错误2道具不足3绑金不足，4活动未开启5格子空间不足）
  public no:number;//位置（唯一标识）
  public static DES : Array<any> =
     [
      ["act_id",MessageBase.UINT32],
      ["code",MessageBase.UINT8],
      ["no",MessageBase.UINT8],

    ]
}
// --------------------
// 重置抽奖面板
// 协议号：31102
//-define（PT_QRY_RESET_BEAUTY_CONTEST,  31102）.
export class C31102 extends MessageBase{
  public act_id:number;//活动ID
  public static DES : Array<any> =
     [
      ["act_id",MessageBase.UINT32],

    ]
}
export class S31102 extends MessageBase{
  public act_id:number;//活动ID
  public code:number;//结果（0成功1系统错误2绑金不足3活动未开启4CD中）
  public static DES : Array<any> =
     [
      ["act_id",MessageBase.UINT32],
      ["code",MessageBase.UINT8],

    ]
}
export class C31103_1 extends MessageBase{
}
export class S31103_1 extends MessageBase{
  public Rank:number;//排名
  public PlayerId:number;//玩家id
  public PlayerName:string;//玩家名字
  public Count:number;//抽奖次数
  public static DES : Array<any> =
     [
      ["Rank",MessageBase.UINT16],
      ["PlayerId",MessageBase.UINT64],
      ["PlayerName",MessageBase.STRING],
      ["Count",MessageBase.UINT16],

    ]
}
// --------------------
//----------- 查询今天抽奖排行 ------------
//-define（PT_QRY_BEAUTY_RANK,  31103）.
export class C31103 extends MessageBase{
  public act_id:number;//活动ID
  public static DES : Array<any> =
     [
      ["act_id",MessageBase.UINT32],

    ]
}
export class S31103 extends MessageBase{
  public act_id:number;//活动ID
  public MyRank:number;//
  public TotalLen:number;//
   public item_1 : S31103_1[];
  public static DES : Array<any> =
     [
      ["act_id",MessageBase.UINT32],
      ["MyRank",MessageBase.UINT16],
      ["TotalLen",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S31103_1]],

    ]
}
export class C31200_1 extends MessageBase{
}
export class S31200_1 extends MessageBase{
    //消耗信息
  public No:number;//配置表编号
  public Num:number;//数量
  public State:number;//领取状态（0不满足，1满足没领取，2已领取）
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Num",MessageBase.UINT32],
      ["State",MessageBase.UINT8],

    ]
}
// ===========================
// 消耗有利活动 相关
// ===========================
// --------------------
// 获取消耗信息
// 协议号：31200
//-define（PT_GET_CONSUMPTION_ACC_INFO,  31200）.
export class C31200 extends MessageBase{
}
export class S31200 extends MessageBase{
   public item_1 : S31200_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S31200_1]],

    ]
}
// --------------------
// 领取活动奖励
// 协议号：31201
//-define（PT_GET_CONSUMPTION_ACC_REWARD,  31201）.
export class C31201 extends MessageBase{
  public No:number;//配置表编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S31201 extends MessageBase{
  public No:number;//配置表编号
  public State:number;//领取状态
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["State",MessageBase.UINT8],

    ]
}
export class C31300_1 extends MessageBase{
}
export class S31300_1 extends MessageBase{
  public subtype:number;//RMB商城表子类型
  public State:number;//购买状态（0可购买，1已购买）
  public static DES : Array<any> =
     [
      ["subtype",MessageBase.UINT8],
      ["State",MessageBase.UINT8],

    ]
}
// ===========================
// 限时礼包活动 相关
// ===========================
// --------------------
// 获取礼包信息
// 协议号：31300
//-define（PT_GET_FLASH_GIFT_BAG_INFO,  31300）.
export class C31300 extends MessageBase{
}
export class S31300 extends MessageBase{
   public item_1 : S31300_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S31300_1]],

    ]
}
export class C31400_1 extends MessageBase{
}
export class S31400_1 extends MessageBase{
    //只保存已领取的
  public Day:number;//第几天
  public Time:number;//领取时间戳
  public static DES : Array<any> =
     [
      ["Day",MessageBase.UINT8],
      ["Time",MessageBase.UINT32],

    ]
}
// ===========================
// 节日签到活动 相关
// ===========================
// --------------------
// 获取签到信息
// 协议号：31400
//-define（PT_GET_FESTIVAL_SIGN_IN_INFO,  31400）.
export class C31400 extends MessageBase{
  public No:number;//节日活动编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S31400 extends MessageBase{
  public No:number;//节日活动编号
  public IsGet:number;//今天是否领取:0未领取，1已领取
   public item_1 : S31400_1[];
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["IsGet",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S31400_1]],

    ]
}
// --------------------
// 领取签到奖励
// 协议号：31401
//-define（PT_GET_FESTIVAL_SIGN_IN_REWARD,  31401）.
export class C31401 extends MessageBase{
  public No:number;//节日活动编号
  public Day:number;//第几天
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Day",MessageBase.UINT8],

    ]
}
export class S31401 extends MessageBase{
  public No:number;//节日活动编号
  public Day:number;//第几天
  public State:number;//领取结果:0活动未开启，1领取成功，2前面的奖励没领取，3已领取过
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Day",MessageBase.UINT8],
      ["State",MessageBase.UINT8],

    ]
}
