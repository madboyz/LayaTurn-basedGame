import { MessageBase } from "../../message/messageBase/MessageBase";
//------------------------------------
// @author 严利宏 <542430172@qq.com> and zhangwq
// @copyright UCweb 2014.12.9
// @doc 结婚系统协议设计.
// @end
//------------------------------------
//-define（PT_COUPLE_APPLY_MARRIAGE, 33000）.
// 申请结婚 
export class C33000 extends MessageBase{
  public type:number;//结婚类型（）
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],

    ]
}
export class S33000 extends MessageBase{
  public code:number;//结果码（0成功，并向对方发送求婚协议）
    //-define（PT_COUPLE_ASK_MARRIAGE,33001）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
//-define（PT_COUPLE_ASK_MARRIAGE, 33001）.
// 求婚
export class C33001 extends MessageBase{
}
export class S33001 extends MessageBase{
  public ObjPlayerName:string;//对方名字
    //-define（PT_COUPLE_RESPOND_MARRIAGE,33002）.
  public static DES : Array<any> =
     [
      ["ObjPlayerName",MessageBase.STRING],

    ]
}
//-define（PT_COUPLE_RESPOND_MARRIAGE, 33002）.
// 回应求婚
export class C33002 extends MessageBase{
  public respond:number;//（1-yes2-no）
    //-define（YES_I_DO,1）.同意求婚
    //-define（YOU_ARE_A_GOOD_PERSON,2）.拒绝求婚（你是个好人）
    //-define（PT_COUPLE_MARRIAGE_BROADCAST,33003）.
  public static DES : Array<any> =
     [
      ["respond",MessageBase.UINT8],

    ]
}
export class S33002 extends MessageBase{
}
//-define（YES_I_DO, 1）.同意求婚
//-define（YOU_ARE_A_GOOD_PERSON, 2）.拒绝求婚（你是个好人）
//-define（PT_COUPLE_MARRIAGE_BROADCAST, 33003）.
// 结婚广播 （只发给结婚当事人）
export class C33003 extends MessageBase{
}
export class S33003 extends MessageBase{
  public Type:number;//婚礼类型读表
  public id1:number;//Id1
  public id2:number;//Id2
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["id1",MessageBase.UINT64],
      ["id2",MessageBase.UINT64],

    ]
}
export class C33005_1 extends MessageBase{
}
export class S33005_1 extends MessageBase{
  public SkillId:number;//id
  public State:number;//状态0表示未学习，1表示已经学习
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],
      ["State",MessageBase.UINT8],

    ]
}
// ---------- 查询夫妻技能 （如果没有结婚,则返回空）-----------------
//-define（PT_COUPLE_QUERY_SKILL_INFO, 33005）.
// 协议号: 33005
export class C33005 extends MessageBase{
}
export class S33005 extends MessageBase{
   public item_1 : S33005_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S33005_1]],

    ]
}
// ---------- 学习夫妻技能 -----------------
//-define（PT_COUPLE_LEARN_SKILL, 33006）.
// 协议号: 33006
export class C33006 extends MessageBase{
  public SkillId:number;//id
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],

    ]
}
export class S33006 extends MessageBase{
  public RetCode:number;//0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//
//-define（PT_COUPLE_APPLY_CRUISE, 33007）.
// 夫妻申请花车巡游
export class C33007 extends MessageBase{
  public type:number;//花车类型1普通;2豪华;3奢华
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],

    ]
}
export class S33007 extends MessageBase{
}
//无
// 服务器通知巡游开始 （只发送给结婚当事人）
//-define（PT_COUPLE_NOTIFY_CRUISE_BEGIN, 33008）.
export class C33008 extends MessageBase{
}
export class S33008 extends MessageBase{
  public type:number;//花车类型1普通;2豪华;3奢华
  public NpcId:number;//
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],
      ["NpcId",MessageBase.UINT32],

    ]
}
// 服务器通知巡游结束 （暂时没用）
//-define（PT_COUPLE_NOTIFY_CRUISE_END, 33009）.
export class C33009 extends MessageBase{
}
export class S33009 extends MessageBase{
  public type:number;//花车类型1普通;2豪华;3奢华
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],

    ]
}
// 夫妻放烟花
//-define（PT_COUPLE_FIREWORKS, 33010）.
export class C33010 extends MessageBase{
}
export class S33010 extends MessageBase{
}
//无
// 烟花表现（在花车aoi范围内的玩家收到此协议）
//-define（PT_COUPLE_SHOW_FIREWORKS, 33004）.
export class C33004 extends MessageBase{
}
export class S33004 extends MessageBase{
  public Type:number;//烟花类型
  public SceneId:number;//场景编号
  public X:number;//
  public Y:number;//
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["SceneId",MessageBase.UINT32],
      ["X",MessageBase.UINT32],
      ["Y",MessageBase.UINT32],

    ]
}
// ----------------- 参加花车巡游 -----------------------
//-define（PT_COUPLE_REQ_JOIN_CRUISE, 33011）.
// 协议号：33011
export class C33011 extends MessageBase{
}
export class S33011 extends MessageBase{
  public RetCode:number;//如果报名成功则返回0，否则不返回，而是直接发送失败提示消息协议
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// ----------------- 中断花车巡游活动 -----------------------
//-define（PT_COUPLE_REQ_STOP_CRUISE, 33012）.
// 协议号：33012
export class C33012 extends MessageBase{
}
export class S33012 extends MessageBase{
  public RetCode:number;//如果中断成功则返回0，否则不返回，而是直接发送失败提示消息协议
  public Type:number;//1手动中断；2系统中断
    //-define（PT_COUPLE_APPLY_DEVORCE,33013）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Type",MessageBase.UINT8],

    ]
}
//-define（PT_COUPLE_APPLY_DEVORCE, 33013）.
// 申请离婚
export class C33013 extends MessageBase{
  public type:number;//（1协议离婚2强制离婚3单方申请离婚）
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],

    ]
}
export class S33013 extends MessageBase{
  public RetCode:number;//0表示申请成功
  public type:number;//（1协议离婚2强制离婚3单方申请离婚）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["type",MessageBase.UINT8],

    ]
}
// 协议离婚 求离婚
//-define（PT_COUPLE_ASK_DEVORCE, 33014）.
export class C33014 extends MessageBase{
    //-define（PT_COUPLE_ASK_DEVORCE,33014）.
}
export class S33014 extends MessageBase{
  public ObjPlayerName:string;//对方名字（其实就是队长向你求离婚）
  public static DES : Array<any> =
     [
      ["ObjPlayerName",MessageBase.STRING],

    ]
}
// 协议离婚 回应离婚
//-define（PT_COUPLE_RESPOND_DEVORCE, 33015）.
export class C33015 extends MessageBase{
  public respond:number;//（1-yes2-no）60秒内无操作视为“不同意”
  public static DES : Array<any> =
     [
      ["respond",MessageBase.UINT8],

    ]
}
export class S33015 extends MessageBase{
}
// 通知双方离婚成功
//-define（PT_COUPLE_DEVORCE_OK, 33016）.
export class C33016 extends MessageBase{
    //-define（PT_COUPLE_DEVORCE_OK,33016）.
}
export class S33016 extends MessageBase{
}
//无
// ----------------- 花车巡游活动开始（只发送给结婚当事人以外且符合条件的在线玩家）-----------------------
//-define（PT_COUPLE_BROADCAST_CRUISE_BEGIN, 33017）.
// 协议号：33017
export class C33017 extends MessageBase{
}
export class S33017 extends MessageBase{
  public PlayerName1:string;//
  public PlayerName2:string;//
  public static DES : Array<any> =
     [
      ["PlayerName1",MessageBase.STRING],
      ["PlayerName2",MessageBase.STRING],

    ]
}
// 查询婚车的位置信息
//-define（PT_COUPLE_CAR_POS, 33018）.
// 协议号: 33018
export class C33018 extends MessageBase{
}
export class S33018 extends MessageBase{
  public NpcId:number;//Npcid
  public SceneId:number;//场景id
  public X:number;//所在场景的坐标x
  public Y:number;//所在场景的坐标y
  public static DES : Array<any> =
     [
      ["NpcId",MessageBase.UINT32],
      ["SceneId",MessageBase.UINT32],
      ["X",MessageBase.UINT32],
      ["Y",MessageBase.UINT32],

    ]
}
// 夫妻双方上线通知处于花车巡游状态
//-define（PT_COUPLE_CRUISE_STATE, 33019）.
export class C33019 extends MessageBase{
    //-define（PT_COUPLE_CRUISE_STATE,33019）.
}
export class S33019 extends MessageBase{
}
