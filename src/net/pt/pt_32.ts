import { MessageBase } from "../../message/messageBase/MessageBase";
export class C32000_1 extends MessageBase{
}
export class S32000_1 extends MessageBase{
    //功能列表
  public FuncCode:number;//功能代号
  public FuncArg:number;//功能参数（参数意义见下面说明）
  public static DES : Array<any> =
     [
      ["FuncCode",MessageBase.UINT8],
      ["FuncArg",MessageBase.UINT32],

    ]
}
// NPC、明雷怪的相关协议
// 2013.7.15
// @author: huangjf
// 分类号：32
// pt: 表示protocol
// 
// ================================ NPC相关的协议 =============================================
//----------- 查询npc的功能列表 ------------
//-define（PT_QRY_NPC_FUNC_LIST,  32000）.
// 协议号：32000
export class C32000 extends MessageBase{
}
export class S32000 extends MessageBase{
  public NpcId:number;//npc唯一id
   public item_1 : S32000_1[];
  public NpcNo:number;//
  public static DES : Array<any> =
     [
      ["NpcId",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S32000_1]],
      ["NpcNo",MessageBase.UINT32],

    ]
}
export class C32002_1 extends MessageBase{
}
export class S32002_1 extends MessageBase{
  public SkillId:number;//技能id
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],

    ]
}
//----------- 查询npc的教授技能列表 ------------
//-define（PT_QRY_NPC_TEACH_SKILL_LIST,  32002）.
// 协议号：32002
export class C32002 extends MessageBase{
}
export class S32002 extends MessageBase{
  public NpcId:number;//npc唯一id
   public item_1 : S32002_1[];
  public static DES : Array<any> =
     [
      ["NpcId",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S32002_1]],

    ]
}
//-----------商店--向NPC购买物品---------
//-define（PT_BUY_GOODS_FROM_NPC, 32003）.
// 协议号: 32003
export class C32003 extends MessageBase{
  public GoodsNo:number;//购买物品编号
  public Count:number;//数量
  public ShopNo:number;//商店编号
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT8],
      ["ShopNo",MessageBase.UINT32],

    ]
}
export class S32003 extends MessageBase{
  public RetCode:number;//若成功则返回0，1//该物品已经卖光，2//超过限制的购买数量
  public GoodsNo:number;//购买物品编号
  public Count:number;//数量
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT8],

    ]
}
export class C32004_1 extends MessageBase{
}
export class S32004_1 extends MessageBase{
  public GoodsNo:number;//
  public Quality:number;//品质
  public PriceType:number;//1.游戏币2.元宝3.绑定的游戏币4.绑定的元宝
  public Price:number;//
  public BuyLimit:number;//1//限购的0//不限购
  public NumberLimit:number;//当BuyLimit=1时表示玩家限制购买该物品的个数
  public GoodsType:number;//0：表示普通商品1：表示限时物品，无限个物品x时间下架2：表示限量物品，上架x个
  public LeftCount:number;//该编号的物品当前剩余个数
  public ExpireTime:number;//到期时间
  public BindState:number;//绑定状态
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["PriceType",MessageBase.UINT8],
      ["Price",MessageBase.UINT32],
      ["BuyLimit",MessageBase.UINT8],
      ["NumberLimit",MessageBase.UINT32],
      ["GoodsType",MessageBase.UINT8],
      ["LeftCount",MessageBase.UINT32],
      ["ExpireTime",MessageBase.UINT32],
      ["BindState",MessageBase.UINT8],

    ]
}
//-----------根据NPC查询可以购买的物品列表（目前是发动态商品）---------
//-define（PT_QUERY_GOODS_BY_NPC, 32004）.
// 协议号: 32004
export class C32004 extends MessageBase{
  public ShopNo:number;//商店编号
  public static DES : Array<any> =
     [
      ["ShopNo",MessageBase.UINT32],

    ]
}
export class S32004 extends MessageBase{
  public ShopNo:number;//商店编号
   public item_1 : S32004_1[];
  public static DES : Array<any> =
     [
      ["ShopNo",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S32004_1]],

    ]
}
export class C32005_1 extends MessageBase{
}
export class S32005_1 extends MessageBase{
  public GoodsId:number;//物品唯一id（注意此id是玩家在回购列表的唯一id）
  public GoodsNo:number;//物品编号（由策划制定的编号）
  public Count:number;//物品叠加数量
  public BindState:number;//绑定状态
  public Quality:number;//品质
  public UsableTimes:number;//当前剩余的可使用次数（不可使用物品固定为0，可无限使用的物品则为-1，有限次数的可使用物品则为具体的次数）
  public SellTime:number;//卖出时间
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT16],
      ["BindState",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["UsableTimes",MessageBase.UINT16],
      ["SellTime",MessageBase.UINT32],

    ]
}
//----------- 查询回购物品信息（服务端会返回物品列表） ------------
//-define（PT_QRY_BUY_BACK_LIST,  32005）.
// 协议号：32005
export class C32005 extends MessageBase{
}
export class S32005 extends MessageBase{
   public item_1 : S32005_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S32005_1]],

    ]
}
// 从回购列表回购物品 购买成功物品添加到背包，会另外通知客户端
//-define（PT_BUY_BACK, 32006）.
// 协议号：32006
export class C32006 extends MessageBase{
}
export class S32006 extends MessageBase{
  public RetCode:number;//0//成功
  public GoodsId:number;//物品唯一id（注意此id是玩家在回购列表的唯一id）
  public StackCount:number;//回购数量
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["StackCount",MessageBase.UINT16],

    ]
}
//----------- 玩家加物品到回购列表后，通知客户端（服务端主动通知）------------
//-define（PT_NOTIFY_BUY_BACK_GOODS_ADDED, 32007）.
// 协议号：32007
export class C32007 extends MessageBase{
}
export class S32007 extends MessageBase{
  public GoodsId:number;//物品唯一id（注意此id是玩家在回购列表的唯一id）
  public GoodsNo:number;//物品编号
  public Count:number;//叠加数量
  public BindState:number;//绑定状态：0未绑定；1已绑定
  public Quality:number;//品质
  public UsableTimes:number;//当前剩余的可使用次数（不可使用物品固定为0，可无限使用的物品则为-1，有限次数的可使用物品则为具体的次数）
  public SellTime:number;//卖出时间
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT16],
      ["BindState",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["UsableTimes",MessageBase.UINT16],
      ["SellTime",MessageBase.UINT32],

    ]
}
//----------- 通知客户端：回购列表中的物品被销毁了（服务端主动通知）------------
// 注：如果有需要服务端主动通知的话，则可以使用该协议。
//-define（PT_NOTIFY_BUY_BACK_GOODS_DESTROYED,  32008）.
// 协议号：32008
export class C32008 extends MessageBase{
}
export class S32008 extends MessageBase{
  public GoodsId:number;//物品唯一id（注意此id是玩家在回购列表的唯一id）
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
// 玩家跑任务去npc采集完毕，向服务器发送采集完毕协议
//-define（PT_COLLECT_OK, 32009）.
// 协议号：32009
export class C32009 extends MessageBase{
  public NpcId:number;//npc唯一id
  public static DES : Array<any> =
     [
      ["NpcId",MessageBase.UINT32],

    ]
}
export class S32009 extends MessageBase{
}
//无
//-----------NPC物品兑换---------
//-define（PT_EXCHANGE_GOODS_FROM_NPC, 32010）.
// 协议号: 32010
export class C32010 extends MessageBase{
  public NpcId:number;//NPCID，不是通过NPC入口，则发0
  public No:number;//物品兑换编号
  public static DES : Array<any> =
     [
      ["NpcId",MessageBase.UINT32],
      ["No",MessageBase.UINT32],

    ]
}
export class S32010 extends MessageBase{
  public RetCode:number;//若成功则返回1
  public No:number;//物品兑换编号
  public Num:number;//物品已兑换次数，0表示无数量限制
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT32],
      ["No",MessageBase.UINT32],
      ["Num",MessageBase.UINT16],

    ]
}
export class C32011_1 extends MessageBase{
}
export class S32011_1 extends MessageBase{
  public No:number;//物品兑换编号
  public Num:number;//物品已兑换次数，0表示无数量限制
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Num",MessageBase.UINT16],

    ]
}
//-----------节日物品兑换数量查询---------
//-define（PT_GET_EXCHANGE_GOODS, 32011）.
// 协议号: 32011
export class C32011 extends MessageBase{
}
export class S32011 extends MessageBase{
   public item_1 : S32011_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S32011_1]],

    ]
}
// ---------- 通过对话NPC直接打指定编号的怪物组 -----------------
//-define（PT_START_MF_BY_TALK_TO_NPC, 32015）.
// 协议号: 32015
export class C32015 extends MessageBase{
  public NpcId:number;//关联的npcid
  public BMonGroupNo:number;//怪物组编号
  public static DES : Array<any> =
     [
      ["NpcId",MessageBase.UINT32],
      ["BMonGroupNo",MessageBase.UINT32],

    ]
}
export class S32015 extends MessageBase{
}
export class C32050_1 extends MessageBase{
}
export class S32050_1 extends MessageBase{
  public Condition:number;//不符条件，返回条件信息
  public static DES : Array<any> =
     [
      ["Condition",MessageBase.UINT64],

    ]
}
// ================================ 明雷怪相关的协议 =============================================
//----------- 对话明雷怪 ---------
//-define（PT_TALK_TO_MON, 32050）.
// 协议号: 32050
export class C32050 extends MessageBase{
  public MonId:number;//明雷怪id
  public static DES : Array<any> =
     [
      ["MonId",MessageBase.UINT32],

    ]
}
export class S32050 extends MessageBase{
  public RetCode:number;//若符合触发战斗的条件，则返回0，否则返回不符合条件的原因代号
   public item_1 : S32050_1[];
  public MonId:number;//明雷怪id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S32050_1]],
      ["MonId",MessageBase.UINT32],

    ]
}
