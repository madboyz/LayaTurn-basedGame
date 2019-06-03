import { MessageBase } from "../../message/messageBase/MessageBase";
export class C16000_1 extends MessageBase{
}
export class S16000_1 extends MessageBase{
  public RetCode:number;//成功则返回0；1:物品不足；2：等级不足;3:进入次数达到上限;4:已经在副本中
  public PlayerName:string;//玩家名字
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PlayerName",MessageBase.STRING],

    ]
}
// =======================================
// pve门派闯关相关的协议
// 分类号:16
//
// ======================================
// PT: 表示protocol
// --------------- 进入三界-------------------------
//-define（PT_TVE_ENTER, 16000）.
// 协议号:16000
export class C16000 extends MessageBase{
  public LvStep:number;//1.无尽试炼2.坐骑试炼
  public IsSkip:number;//是否跳层：1跳0不跳
  public static DES : Array<any> =
     [
      ["LvStep",MessageBase.UINT8],
      ["IsSkip",MessageBase.UINT8],

    ]
}
export class S16000 extends MessageBase{
   public item_1 : S16000_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S16000_1]],

    ]
}
// 显示进入三界确认
//-define（PT_TVE_SHOW_TIPS, 16001）.
// 协议号：16001
export class C16001 extends MessageBase{
}
export class S16001 extends MessageBase{
  public LvStep:number;//1.无尽试炼2.坐骑试炼
  public State:number;//是否要使用物品0:是1:否服务端判断
  public static DES : Array<any> =
     [
      ["LvStep",MessageBase.UINT8],
      ["State",MessageBase.UINT8],

    ]
}
export class C16002_1 extends MessageBase{
}
export class S16002_1 extends MessageBase{
  public Id:number;//点否的玩家id
  public State:number;//0->点否1->使用物品2->不使用物品
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["State",MessageBase.UINT8],

    ]
}
// 进入三界确认
//-define（PT_TVE_REPLY, 16002）.
// 协议号：16002
export class C16002 extends MessageBase{
  public LvStep:number;//1.无尽试炼2.坐骑试炼
  public Flag:number;//0->点否1->使用物品2->不使用物品
  public static DES : Array<any> =
     [
      ["LvStep",MessageBase.UINT8],
      ["Flag",MessageBase.UINT8],

    ]
}
export class S16002 extends MessageBase{
  public LvStep:number;//1.无尽试炼2.坐骑试炼
  public RetCode:number;//0->成功1->失败
   public item_1 : S16002_1[];
  public static DES : Array<any> =
     [
      ["LvStep",MessageBase.UINT8],
      ["RetCode",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S16002_1]],

    ]
}
export class C16003_1 extends MessageBase{
}
export class S16003_1 extends MessageBase{
  public GoodsNo:number;//物品编号详见goods.hrl
  public GoodsCount:number;//数量
  public Quality:number;//品质
  public BindState:number;//绑定状态
  public Flag:number;//物品标识：0表示普通的；1表示vip特有；2表示最后一波怪额外奖励
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsCount",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["BindState",MessageBase.UINT8],
      ["Flag",MessageBase.UINT8],

    ]
}
// 刷新奖励
//-define（PT_TVE_REFRESH_REWARD, 16003）.
// 协议号：16003
export class C16003 extends MessageBase{
}
export class S16003 extends MessageBase{
  public MoneyType:number;//刷新奖励需要的金钱类型
  public MoneyCount:number;//刷新奖励需要的金钱数量
   public item_1 : S16003_1[];
  public static DES : Array<any> =
     [
      ["MoneyType",MessageBase.UINT8],
      ["MoneyCount",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S16003_1]],

    ]
}
export class C16004_1 extends MessageBase{
}
export class S16004_1 extends MessageBase{
  public GoodsNo:number;//物品编号详见goods.hrl
  public GoodsCount:number;//数量
  public Quality:number;//品质
  public BindState:number;//绑定状态
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsCount",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["BindState",MessageBase.UINT8],

    ]
}
//挑战结算信息
//-define（PT_TVE_SHOW_RESULT, 16004）.
// 协议号：16004
export class C16004 extends MessageBase{
}
export class S16004 extends MessageBase{
  public Win:number;//打怪胜利波数
  public Rounds:number;//回合总数
  public MoneyType:number;//刷新奖励需要的金钱类型
  public MoneyCount:number;//刷新奖励需要的金钱数量
   public item_1 : S16004_1[];
  public static DES : Array<any> =
     [
      ["Win",MessageBase.UINT16],
      ["Rounds",MessageBase.UINT16],
      ["MoneyType",MessageBase.UINT8],
      ["MoneyCount",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S16004_1]],

    ]
}
export class C16005_1_1 extends MessageBase{
}
export class S16005_1_1 extends MessageBase{
    //参与者
  public PlayerId:number;//
  public MbName:string;//
  public MbFaction:number;//
  public MbRace:number;//
  public MbSex:number;//
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["MbName",MessageBase.STRING],
      ["MbFaction",MessageBase.UINT8],
      ["MbRace",MessageBase.UINT8],
      ["MbSex",MessageBase.UINT8],

    ]
}
export class C16005_1 extends MessageBase{
}
export class S16005_1 extends MessageBase{
  public Rank:number;//
  public LeaderName:string;//
  public Win:number;//打怪胜利波数
  public Rounds:number;//回合总数
  public LeaderVipLv:number;//队长vip等级
   public item_1 : S16005_1_1[];
  public static DES : Array<any> =
     [
      ["Rank",MessageBase.UINT8],
      ["LeaderName",MessageBase.STRING],
      ["Win",MessageBase.UINT16],
      ["Rounds",MessageBase.UINT16],
      ["LeaderVipLv",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S16005_1_1]],

    ]
}
// 获取门派闯关排名信息
//-define（PT_TVE_GET_RANK, 16005）.
// 协议号：16005
export class C16005 extends MessageBase{
  public LvStep:number;//1.无尽试炼2.坐骑试炼
  public RankCount:number;//排名个数
  public static DES : Array<any> =
     [
      ["LvStep",MessageBase.UINT8],
      ["RankCount",MessageBase.UINT8],

    ]
}
export class S16005 extends MessageBase{
  public LvStep:number;//1.无尽试炼2.坐骑试炼
   public item_1 : S16005_1[];
  public static DES : Array<any> =
     [
      ["LvStep",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S16005_1]],

    ]
}
// 获取玩家当天已经进入副本的次数 次数发生变化时服务器主动推送
//-define（PT_TVE_GET_ENTER_TIMES, 16006）.
// 协议号：16006
export class C16006 extends MessageBase{
}
export class S16006 extends MessageBase{
}
// 领取奖励
//-define（PT_TVE_GET_REWARD, 16007）.
// 协议号：16007
export class C16007 extends MessageBase{
}
export class S16007 extends MessageBase{
  public RetCode:number;//0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 单人退出
//-define（PT_TVE_QUIT, 16008）.
// 协议号：16008
export class C16008 extends MessageBase{
}
export class S16008 extends MessageBase{
}
//无
// 查询跳层
//-define（PT_TVE_GET_SKIP_INFO, 16009）.
// 协议号:16009
export class C16009 extends MessageBase{
  public LvStep:number;//1.无尽试炼2.坐骑试炼
  public static DES : Array<any> =
     [
      ["LvStep",MessageBase.UINT8],

    ]
}
export class S16009 extends MessageBase{
  public MaxWave:number;//历史最大波数
  public SkipWave:number;//跳层目标波数
  public static DES : Array<any> =
     [
      ["MaxWave",MessageBase.UINT16],
      ["SkipWave",MessageBase.UINT16],

    ]
}
