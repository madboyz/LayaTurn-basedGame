import { MessageBase } from "../../message/messageBase/MessageBase";
export class C22001_1_1 extends MessageBase{
}
export class S22001_1_1 extends MessageBase{
  public Value:number;//战力/等级/秘境关卡/主线关卡/爬塔层数
  public static DES : Array<any> =
     [
      ["Value",MessageBase.UINT32],

    ]
}
export class C22001_1 extends MessageBase{
}
export class S22001_1 extends MessageBase{
  public Rank:number;//排名
  public PlayerId:number;//玩家ID
  public PlayerName:string//姓名
  public Sex:number;//性别
  public Faction:number;//门派
  public Bp:number;//战力
  public AerocraftNo:number;//飞行器编号
  public Clothes:number;//时装
   public item_1 : S22001_1_1[];
  public static DES : Array<any> =
     [
      ["Rank",MessageBase.UINT16],
      ["PlayerId",MessageBase.UINT64],
      ["PlayerName",MessageBase.STRING],
      ["Sex",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Bp",MessageBase.UINT32],
      ["AerocraftNo",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S22001_1_1]],

    ]
}
// 排行榜相关协议
// 2014.4.11
// @author: mo
// 分类号：22
// pt: 表示protocol
// 排行榜类型对应协议号: 即 1xxx对应 22001, 2xxx对应22002, 类推!
//-----------查询个人排行*（战力/等级/秘境关卡/主线关卡/爬塔/竞技场）------------
//-define（PT_RANK_ROLE, 22001）.
// 协议号：22001
export class C22001 extends MessageBase{
  public RankType:number;//排行榜类型（1001:战力，1002:等级，22001:秘境关卡22002:主线关卡22007:三界副本22008:勇闯天宫）
  public PageSize:number;//每页个数
  public PageIndex:number;//页码编号（第一页从1开始，后面页面第一个都显示排行榜第一位，第二个开始接上一页的最后一位）
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["PageSize",MessageBase.UINT8],
      ["PageIndex",MessageBase.UINT8],

    ]
}
export class S22001 extends MessageBase{
  public RankType:number;//排行榜类型
  public MyRank:number;//我的排名（0显示未上榜）
  public RankCount:number;//排行榜总数
  public PageIndex:number;//
   public item_1 : S22001_1[];
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["MyRank",MessageBase.UINT16],
      ["RankCount",MessageBase.UINT16],
      ["PageIndex",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S22001_1]],

    ]
}
export class C22002_1_1 extends MessageBase{
}
export class S22002_1_1 extends MessageBase{
  public Value:number;//宠物战力，修炼级数/坐骑战力，飞升
  public static DES : Array<any> =
     [
      ["Value",MessageBase.UINT32],

    ]
}
export class C22002_1 extends MessageBase{
}
export class S22002_1 extends MessageBase{
  public Rank:number;//排名
  public PlayerId:number;//玩家ID
  public PlayerName:string//玩家名字
  public PartnerNo:number;//女妖No
   public item_1 : S22002_1_1[];
  public static DES : Array<any> =
     [
      ["Rank",MessageBase.UINT16],
      ["PlayerId",MessageBase.UINT64],
      ["PlayerName",MessageBase.STRING],
      ["PartnerNo",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S22002_1_1]],

    ]
}
//-----------查询非玩家排行*（宠物战力/飞行器战力/伙伴战力）------------
//-define（PT_RANK_NONROLE, 22002）.
// 协议号：22002
export class C22002 extends MessageBase{
  public RankType:number;//排行榜类型（2001:宠物战力，22003:飞行器战力，22006:伙伴战力）
  public PageSize:number;//每页个数
  public PageIndex:number;//页码编号（第一页从1开始，后面页面第一个都显示排行榜第一位，第二个开始接上一页的最后一位）
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["PageSize",MessageBase.UINT8],
      ["PageIndex",MessageBase.UINT8],

    ]
}
export class S22002 extends MessageBase{
  public RankType:number;//排行榜类型
  public MyRank:number;//我的排名（0显示未上榜）
  public RankCount:number;//
  public PageIndex:number;//排行榜总数
   public item_1 : S22002_1[];
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["MyRank",MessageBase.UINT16],
      ["RankCount",MessageBase.UINT16],
      ["PageIndex",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S22002_1]],

    ]
}
export class C22003_1 extends MessageBase{
}
export class S22003_1 extends MessageBase{
  public Rank:number;//排名
  public GoodsId:number;//装备ID
  public GoodsName:string//装备名字
  public Value:number;//战力
  public NickName:string//所属玩家
  public PlayerId:number;//玩家ID
  public Quality:number;//品质
  public VipLv:number;//VIP等级
  public static DES : Array<any> =
     [
      ["Rank",MessageBase.UINT16],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsName",MessageBase.STRING],
      ["Value",MessageBase.UINT32],
      ["NickName",MessageBase.STRING],
      ["PlayerId",MessageBase.UINT64],
      ["Quality",MessageBase.UINT8],
      ["VipLv",MessageBase.UINT8],

    ]
}
//-----------查询装备排行*（战力）------------
//-define（PT_RANK_EQUIP, 22003）.
// 协议号：22003
export class C22003 extends MessageBase{
  public RankType:number;//排行榜类型（3001：战力）
  public Page:number;//分页
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["Page",MessageBase.UINT8],

    ]
}
export class S22003 extends MessageBase{
  public RankType:number;//排行榜类型
  public MyRank:number;//我的排名（0显示未上榜）
  public RankCount:number;//排行榜总数
   public item_1 : S22003_1[];
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["MyRank",MessageBase.UINT16],
      ["RankCount",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S22003_1]],

    ]
}
export class C22004_1 extends MessageBase{
}
export class S22004_1 extends MessageBase{
  public Rank:number;//排名
  public PlayerId:number;//玩家ID
  public NickName:string//姓名
  public Value:number;//积分
  public VipLv:number;//VIP等级
  public Sex:number;//性别
  public Faction:number;//门派
  public static DES : Array<any> =
     [
      ["Rank",MessageBase.UINT16],
      ["PlayerId",MessageBase.UINT64],
      ["NickName",MessageBase.STRING],
      ["Value",MessageBase.UINT32],
      ["VipLv",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],

    ]
}
//-----------查询巅峰比武大会排行*（周）------------
//-define（PT_RANK_ARENA, 22004）.
// 协议号：22001
export class C22004 extends MessageBase{
  public RankType:number;//排行榜类型
  public Page:number;//分页
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["Page",MessageBase.UINT8],

    ]
}
export class S22004 extends MessageBase{
  public RankType:number;//排行榜类型
  public MyRank:number;//我的排名（0显示未上榜）
  public RankCount:number;//排行榜总数
   public item_1 : S22004_1[];
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["MyRank",MessageBase.UINT16],
      ["RankCount",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S22004_1]],

    ]
}
export class C22005_1 extends MessageBase{
}
export class S22005_1 extends MessageBase{
  public Rank:number;//排名
  public PlayerId:number;//排序ID
  public NickName:string//名字
  public Value:number;//排序值
  public P1:string//可变参数字符串
  public P2:number;//可变参数2
  public P3:number;//可变参数3
  public static DES : Array<any> =
     [
      ["Rank",MessageBase.UINT16],
      ["PlayerId",MessageBase.UINT64],
      ["NickName",MessageBase.STRING],
      ["Value",MessageBase.UINT32],
      ["P1",MessageBase.STRING],
      ["P2",MessageBase.UINT32],
      ["P3",MessageBase.UINT64],

    ]
}
// 通用排行榜协议
//-define（PT_RANK_COMMON, 22005）.
// 协议号：22005
export class C22005 extends MessageBase{
  public RankType:number;//排行榜类型
  public Page:number;//分页
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["Page",MessageBase.UINT8],

    ]
}
export class S22005 extends MessageBase{
  public RankType:number;//排行榜类型
  public MyRank:number;//我的排名（0显示未上榜）
  public RankCount:number;//排行榜总数
   public item_1 : S22005_1[];
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["MyRank",MessageBase.UINT16],
      ["RankCount",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S22005_1]],

    ]
}
export class C22006_1 extends MessageBase{
}
export class S22006_1 extends MessageBase{
  public Rank:number;//排名
  public PlayerId:number;//玩家ID
  public NickName:string//姓名
  public Win:number;//胜场数
  public Lose:number;//负场数
  public VipLv:number;//VIP等级
  public Sex:number;//性别
  public Faction:number;//门派
  public static DES : Array<any> =
     [
      ["Rank",MessageBase.UINT16],
      ["PlayerId",MessageBase.UINT64],
      ["NickName",MessageBase.STRING],
      ["Win",MessageBase.UINT16],
      ["Lose",MessageBase.UINT16],
      ["VipLv",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],

    ]
}
//-----------查询3v3比武大会排行*（日/周）------------
//-define（PT_RANK_ARENA_3v3, 22006）.
// 协议号：22006
export class C22006 extends MessageBase{
  public RankType:number;//排行榜类型（6001:日排6002:周排）
  public Page:number;//分页
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["Page",MessageBase.UINT8],

    ]
}
export class S22006 extends MessageBase{
  public RankType:number;//排行榜类型
  public MyRank:number;//我的排名（0显示未上榜）
  public RankCount:number;//排行榜总数
   public item_1 : S22006_1[];
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["MyRank",MessageBase.UINT16],
      ["RankCount",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S22006_1]],

    ]
}
export class C22007_1 extends MessageBase{
}
export class S22007_1 extends MessageBase{
  public Rank:number;//排名
  public MountId:number;//坐骑ID
  public MountName:string//坐骑名字
  public NickName:string//玩家名字
  public Value:number;//战力/等级
  public PlayerId:number;//玩家ID
  public VipLv:number;//VIP等级
  public static DES : Array<any> =
     [
      ["Rank",MessageBase.UINT16],
      ["MountId",MessageBase.UINT64],
      ["MountName",MessageBase.STRING],
      ["NickName",MessageBase.STRING],
      ["Value",MessageBase.UINT32],
      ["PlayerId",MessageBase.UINT64],
      ["VipLv",MessageBase.UINT8],

    ]
}
//-----------查询坐骑排行*（战力/等级）------------
//-define（PT_RANK_MOUNT, 22007）.
// 协议号：22007
export class C22007 extends MessageBase{
  public RankType:number;//排行榜类型（7001：战力，7002：等级）
  public Page:number;//分页
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["Page",MessageBase.UINT8],

    ]
}
export class S22007 extends MessageBase{
  public RankType:number;//排行榜类型
  public MyRank:number;//我的排名（0显示未上榜）
  public RankCount:number;//排行榜总数
   public item_1 : S22007_1[];
  public static DES : Array<any> =
     [
      ["RankType",MessageBase.UINT16],
      ["MyRank",MessageBase.UINT16],
      ["RankCount",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S22007_1]],

    ]
}
//-----------查询装备排行*（战力）------------
//-define（PT_RANK_EQUIP_DETAIL, 22103）.
// 协议号：22003
export class C22103 extends MessageBase{
  public :number;//装备ID
  public static DES : Array<any> =
     [
      ["",MessageBase.UINT64],

    ]
}
export class S22103 extends MessageBase{
  public :number;//装备ID
  public static DES : Array<any> =
     [
      ["",MessageBase.UINT64],

    ]
}
