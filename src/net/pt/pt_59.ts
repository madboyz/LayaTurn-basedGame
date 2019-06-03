import { MessageBase } from "../../message/messageBase/MessageBase";
export class C59001_1 extends MessageBase{
}
export class S59001_1 extends MessageBase{
    //章节奖励领取状态数组为空表示没领取过
  public PassCount:number;//关卡数量
  public RwdState:number;//1表示已经领取
  public static DES : Array<any> =
     [
      ["PassCount",MessageBase.UINT32],
      ["RwdState",MessageBase.UINT8],

    ]
}
// =========================================================
// 59 章节关卡|最强数据
// =========================================================
// =========================
// 查看|推送章节关卡信息
//-define（PT_CHAPTER_SYNC_INFO, 59001）.
// 协议号：59001
export class C59001 extends MessageBase{
}
export class S59001 extends MessageBase{
  public Id:number;//当前章节Id若已通关全部章节，则为最大章节id+1
  public PassId:number;//当前关卡Id若已通关全部章节全部关卡，则为最大关卡id+1
  public PassTime:number;//上个关卡通关时间戳
  public PassCounter:number;//当前章节已通关关卡数
   public item_1 : S59001_1[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT32],
      ["PassId",MessageBase.UINT32],
      ["PassTime",MessageBase.UINT32],
      ["PassCounter",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S59001_1]],

    ]
}
// 领取章节进度奖励
//-define（PT_CHAPTER_GET_REWARD, 59002）.
// 协议号：59002
export class C59002 extends MessageBase{
}
export class S59002 extends MessageBase{
}
//无
// 挑战
//-define（PT_CHAPTER_BATTLE, 59003）.
// 协议号：59003
export class C59003 extends MessageBase{
  public Id:number;//章节Id
  public PassId:number;//关卡Id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT32],
      ["PassId",MessageBase.UINT32],

    ]
}
export class S59003 extends MessageBase{
  public RetCode:number;//0成功1失败
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C59004_1 extends MessageBase{
}
export class S59004_1 extends MessageBase{
  public GoodsNo:number;//
  public GoodsNum:number;//
  public Quality:number;//
  public BindState:number;//绑定状态
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsNum",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["BindState",MessageBase.UINT8],

    ]
}
// 关卡挑战奖励反馈
//-define（PT_CHAPTER_PASS_REWARD, 59004）.
//协议号：59004
export class C59004 extends MessageBase{
}
export class S59004 extends MessageBase{
  public RetCode:number;//0表示成功，其他失败
   public item_1 : S59004_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S59004_1]],

    ]
}
export class C59101_1 extends MessageBase{
}
export class S59101_1 extends MessageBase{
  public dunNo:number;//副本编号
  public pass:number;//1->通关0->未通关
  public times:number;//剩余领取奖励次数
  public dun_times:number;//副本剩余次数
  public static DES : Array<any> =
     [
      ["dunNo",MessageBase.UINT32],
      ["pass",MessageBase.UINT8],
      ["times",MessageBase.UINT16],
      ["dun_times",MessageBase.UINT16],

    ]
}
// 副本剧情目标信息
//-define（PT_ACHIEVE_DUN, 59101）.
// 协议号：59101
export class C59101 extends MessageBase{
}
export class S59101 extends MessageBase{
   public item_1 : S59101_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S59101_1]],

    ]
}
export class C59201_1 extends MessageBase{
}
export class S59201_1 extends MessageBase{
  public no:number;//成就编号
  public cur_num:number;//当前计数
  public state:number;//成就状态
  public time:number;//达成时间戳，如果没有达成则为0
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],
      ["cur_num",MessageBase.UINT32],
      ["state",MessageBase.UINT8],
      ["time",MessageBase.UINT32],

    ]
}
// ****************************** 新成就协议*********************
// 通知成就状态数据 数据变化 | 玩家登陆同步
//-define（AT_UN_FINISH, 1）.成就未完成
//-define（AT_FINISH_BUT_NOT_RWD, 2）.成就完成，奖励未领取
//-define（AT_GET_RWD, 3）.成就完成，奖励领取
//-define（PT_ACHIEVE_SYNC, 59201）.
// 协议号：59201
export class C59201 extends MessageBase{
}
export class S59201 extends MessageBase{
   public item_1 : S59201_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S59201_1]],

    ]
}
// =========================
// 领取成就奖励
//-define（PT_ACHIEVE_REWARD, 59202）.
// 协议号：59202
export class C59202 extends MessageBase{
  public no:number;//成就编号
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],

    ]
}
export class S59202 extends MessageBase{
}
export class C59203_1 extends MessageBase{
}
export class S59203_1 extends MessageBase{
  public no:number;//成就编号
  public PlayerID:number;//玩家ID
  public Name:string;//玩家名字
  public time:number;//达成时间戳，如果没有达成则为0
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],
      ["PlayerID",MessageBase.UINT64],
      ["Name",MessageBase.STRING],
      ["time",MessageBase.UINT32],

    ]
}
//领取成功则返回59201
// ========================
// 全服第一个达成信息
// 数据变化 | 玩家登陆同步
//-define（PT_ACHIEVE_FIRST, 59203）.
// 协议号：59203
export class C59203 extends MessageBase{
}
export class S59203 extends MessageBase{
   public item_1 : S59203_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S59203_1]],

    ]
}
// 查看某个玩家的成就数据
//-define（PT_ACHIEVE_LOOK, 59204）.
// 协议号：59204
export class C59204 extends MessageBase{
  public PlayerID:number;//
  public no:number;//成就编号
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],
      ["no",MessageBase.UINT16],

    ]
}
export class S59204 extends MessageBase{
  public no:number;//成就编号
  public ReachTime:number;//达成时间戳（0表示未完成）
  public race:number;//种族
  public sex:number;//性别
  public Lv:number;//等级
  public name:string;//名字
  public Faction:number;//门派
  public Grade:number;//排位赛段位
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT16],
      ["ReachTime",MessageBase.UINT32],
      ["race",MessageBase.UINT8],
      ["sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT16],
      ["name",MessageBase.STRING],
      ["Faction",MessageBase.UINT8],
      ["Grade",MessageBase.UINT8],

    ]
}
export class C59301_1 extends MessageBase{
}
export class S59301_1 extends MessageBase{
  public RankID:number;//排行榜id
  public MyTopVal:number;//我的历史最高值
  public MyTopRank:number;//我的历史最前排名（0为榜外）
  public MyTopTime:number;//我的达成时间
  public SvrTopVal:number;//服务器历史最高值
  public static DES : Array<any> =
     [
      ["RankID",MessageBase.UINT16],
      ["MyTopVal",MessageBase.UINT32],
      ["MyTopRank",MessageBase.UINT16],
      ["MyTopTime",MessageBase.UINT32],
      ["SvrTopVal",MessageBase.UINT32],

    ]
}
// ******************************最强数据********************************
// 请求最强数据，打开界面请求，不主动推送刷新
//-define（PT_ACHIEVE_TOP, 59301）.
// 协议号：59301
export class C59301 extends MessageBase{
}
export class S59301 extends MessageBase{
   public item_1 : S59301_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S59301_1]],

    ]
}
// 查看某个玩家的最强数据
//-define（PT_ACHIEVE_LOOK_TOP, 59302）.
// 协议号：59302
export class C59302 extends MessageBase{
  public PlayerID:number;//
  public RankID:number;//
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],
      ["RankID",MessageBase.UINT16],

    ]
}
export class S59302 extends MessageBase{
  public RankID:number;//排行榜ID
  public PlyTopVal:number;//我的最强数据
  public SvrTopVal:number;//服务器最强数据
  public Rank:number;//排名
  public race:number;//种族
  public sex:number;//性别
  public Lv:number;//等级
  public name:string;//名字
  public Faction:number;//门派
  public Grade:number;//排位赛段位
  public static DES : Array<any> =
     [
      ["RankID",MessageBase.UINT16],
      ["PlyTopVal",MessageBase.UINT32],
      ["SvrTopVal",MessageBase.UINT32],
      ["Rank",MessageBase.UINT16],
      ["race",MessageBase.UINT8],
      ["sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT16],
      ["name",MessageBase.STRING],
      ["Faction",MessageBase.UINT8],
      ["Grade",MessageBase.UINT8],

    ]
}
