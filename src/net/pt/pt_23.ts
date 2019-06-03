import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 23 独步天下协议
// =========================================================
//=========================
//JJC面板基本信息
//-define（PT_OA_ALL_INFO, 23000）.
//协议号：23000
export class C23000 extends MessageBase{
}
export class S23000 extends MessageBase{
}
//返回23001, 23002, 23005
//=========================
//JJC个人基本信息
//-define（PT_OA_MY_INFO, 23001）.
//协议号：23001
export class C23001 extends MessageBase{
}
export class S23001 extends MessageBase{
  public group:number;//组别
  public rank:number;//名次
  public buy_times:number;//当天购买挑战次数
  public left_times:number;//剩余挑战次数
  public win_streak:number;//连胜场次
  public get_ws_no:number;//已经取得哪一场连胜场次的礼包
  public refresh_CD:number;//刷新排名到期时间戳
  public reward_flag:number;//排名奖励是否可领1->Y，0->N，2->已领取
  public chal_CD:number;//挑战按钮到期时间戳
  public chal_times:number;//当天已挑战次数
  public get_ct_no:number;//已经取得哪一挑战场次的礼包
  public his_max_ws_no:number;//历史最大连胜场次
  public his_group:number;//当天凌晨组别
  public his_rank:number;//当天凌晨名次
  public his_max_rank:number;//历史最高排名
  public timestamp:number;//战报时间戳
  public static DES : Array<any> =
     [
      ["group",MessageBase.UINT8],
      ["rank",MessageBase.UINT32],
      ["buy_times",MessageBase.UINT32],
      ["left_times",MessageBase.UINT32],
      ["win_streak",MessageBase.UINT8],
      ["get_ws_no",MessageBase.UINT8],
      ["refresh_CD",MessageBase.UINT32],
      ["reward_flag",MessageBase.UINT8],
      ["chal_CD",MessageBase.UINT32],
      ["chal_times",MessageBase.UINT32],
      ["get_ct_no",MessageBase.UINT16],
      ["his_max_ws_no",MessageBase.UINT16],
      ["his_group",MessageBase.UINT8],
      ["his_rank",MessageBase.UINT32],
      ["his_max_rank",MessageBase.UINT32],
      ["timestamp",MessageBase.UINT32],

    ]
}
export class C23002_1 extends MessageBase{
}
export class S23002_1 extends MessageBase{
  public timestamp:number;//战报时间戳
  public chanllanger:string;//被挑战者名字
  public combat_type:number;//战斗类型0->主动挑战，1->被挑战
  public result:number;//战斗结果0->lose，1->win
  public state:number;//状态0->不变，1->上升，2->下降
  public rank_change:number;//排名变化
  public rank:number;//排名
  public team:number;//所在组
  public combat_ID:number;//战报ID
  public exceptState:number;//异常状态0:正常，1:异常
  public static DES : Array<any> =
     [
      ["timestamp",MessageBase.UINT32],
      ["chanllanger",MessageBase.STRING],
      ["combat_type",MessageBase.UINT8],
      ["result",MessageBase.UINT8],
      ["state",MessageBase.UINT8],
      ["rank_change",MessageBase.UINT32],
      ["rank",MessageBase.UINT32],
      ["team",MessageBase.UINT8],
      ["combat_ID",MessageBase.UINT64],
      ["exceptState",MessageBase.UINT8],

    ]
}
//=========================
//JJC个人战报信息列表
//-define（PT_OA_BATTLE_REPORT, 23002）.
//协议号：23002
export class C23002 extends MessageBase{
}
export class S23002 extends MessageBase{
   public item_1 : S23002_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S23002_1]],

    ]
}
export class C23003_1 extends MessageBase{
}
export class S23003_1 extends MessageBase{
    //战斗获得奖励
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
export class C23003_2 extends MessageBase{
}
export class S23003_2 extends MessageBase{
    //历史最高排名攀升奖励
  public GoodsNo:number;//
  public GoodsNum:number;//
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsNum",MessageBase.UINT32],

    ]
}
//=========================
//JJC个人战报信息单条更新
//-define（PT_OA_BATTLE_REPORT_UPDATE, 23003）.
//协议号：23003
export class C23003 extends MessageBase{
}
export class S23003 extends MessageBase{
  public timestamp:number;//战报时间戳
  public chanllanger:string;//被挑战者名字
  public combat_type:number;//战斗类型0->主动挑战，1->被挑战
  public result:number;//战斗结果0->lose，1->win
  public state:number;//状态0->不变，1->上升，2->下降
  public rank_change:number;//排名变化
  public rank:number;//排名
  public team:number;//所在组
  public combat_ID:number;//战报ID
  public exceptState:number;//异常状态0:正常，1:异常
   public item_1 : S23003_1[];
   public item_2 : S23003_2[];
  public static DES : Array<any> =
     [
      ["timestamp",MessageBase.UINT32],
      ["chanllanger",MessageBase.STRING],
      ["combat_type",MessageBase.UINT8],
      ["result",MessageBase.UINT8],
      ["state",MessageBase.UINT8],
      ["rank_change",MessageBase.UINT32],
      ["rank",MessageBase.UINT32],
      ["team",MessageBase.UINT8],
      ["combat_ID",MessageBase.UINT64],
      ["exceptState",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S23003_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S23003_2]],

    ]
}
export class C23005_1 extends MessageBase{
}
export class S23005_1 extends MessageBase{
  public rank:number;//名次
  public id:number;//玩家ID
  public name:string;//名字
  public race:number;//种族
  public lv:number;//等级
  public faction:number;//门派
  public power:number;//战斗力
  public sex:number;//性别
  public aerocraftNo:number;//飞行器
  public clothes:number;//服饰编号
  public bmonNo:number;//怪物编号
  public static DES : Array<any> =
     [
      ["rank",MessageBase.UINT32],
      ["id",MessageBase.UINT64],
      ["name",MessageBase.STRING],
      ["race",MessageBase.UINT8],
      ["lv",MessageBase.UINT16],
      ["faction",MessageBase.UINT8],
      ["power",MessageBase.UINT32],
      ["sex",MessageBase.UINT8],
      ["aerocraftNo",MessageBase.UINT32],
      ["clothes",MessageBase.UINT32],
      ["bmonNo",MessageBase.UINT32],

    ]
}
//=========================
//JJC挑战列表排名
//-define（PT_OA_CHALLENGE_LIST, 23005）.
//协议号：23005
export class C23005 extends MessageBase{
}
export class S23005 extends MessageBase{
   public item_1 : S23005_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S23005_1]],

    ]
}
//=========================
//领取连胜奖励
//-define（PT_OA_CONTINUE_WIN_REWARD, 23007）.
//协议号：23007
export class C23007 extends MessageBase{
  public type:number;//领取奖励类型1->连胜奖励2->战斗场数奖励
  public Index:number;//连胜/场次编号
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],
      ["Index",MessageBase.UINT32],

    ]
}
export class S23007 extends MessageBase{
  public type:number;//领取奖励类型1->连胜奖励2->战斗场数奖励
  public flag:number;//状态1->success0->error
  public WinStreak:number;//当前连胜/挑战场数
  public times:number;//已拿的连胜/挑战场数
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],
      ["flag",MessageBase.UINT8],
      ["WinStreak",MessageBase.UINT8],
      ["times",MessageBase.UINT8],

    ]
}
//=========================
//领取奖励
//-define（PT_OA_RANK_REWARD, 23008）.
//协议号：23008
export class C23008 extends MessageBase{
}
export class S23008 extends MessageBase{
}
//=========================
//刷新可挑战选手
//-define（PT_OA_REFRESH_CHALLENGE_LIST, 23009）.
//协议号：23009
export class C23009 extends MessageBase{
}
export class S23009 extends MessageBase{
  public CD:number;//到期时间戳
  public static DES : Array<any> =
     [
      ["CD",MessageBase.UINT32],

    ]
}
//=========================
//挑战玩家
//-define（PT_OA_CHALLENGE, 23010）.
//协议号：23010
export class C23010 extends MessageBase{
  public id:number;//玩家ID
  public rank:number;//名次
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT64],
      ["rank",MessageBase.UINT32],

    ]
}
export class S23010 extends MessageBase{
  public Flag:number;//状态：0错误，1成功，2错误角色，3次数不足，4正在战斗，5秒杀
  public static DES : Array<any> =
     [
      ["Flag",MessageBase.UINT8],

    ]
}
//=========================
//战斗前后排名变更反馈
//-define（PT_OA_RANK_UPDATE, 23011）.
//协议号：23011
export class C23011 extends MessageBase{
}
export class S23011 extends MessageBase{
  public myRank:number;//
  public myNewRank:number;//
  public rivalRank:number;//
  public rivalNewRank:number;//
  public static DES : Array<any> =
     [
      ["myRank",MessageBase.UINT32],
      ["myNewRank",MessageBase.UINT32],
      ["rivalRank",MessageBase.UINT32],
      ["rivalNewRank",MessageBase.UINT32],

    ]
}
// ==================
// 购买挑战次数
//-define（PT_OA_BUY_TIMES, 23013）.
// 协议号：23013
export class C23013 extends MessageBase{
}
export class S23013 extends MessageBase{
}
// ==================
// 膜拜
//-define（PT_OA_WORSHIP, 23014）.
// 协议号：23014
export class C23014 extends MessageBase{
  public ObjPlayerId:number;//
  public static DES : Array<any> =
     [
      ["ObjPlayerId",MessageBase.UINT64],

    ]
}
export class S23014 extends MessageBase{
  public ObjPlayerId:number;//
  public static DES : Array<any> =
     [
      ["ObjPlayerId",MessageBase.UINT64],

    ]
}
