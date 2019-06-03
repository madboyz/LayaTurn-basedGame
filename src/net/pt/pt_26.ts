import { MessageBase } from "../../message/messageBase/MessageBase";
// 市场交易相关协议
// MK: 表示market
//-------- 挂售物品 -------------
//-define（PT_MK_SELL_GOODS,  26001）.
// 协议号:26001
export class C26001 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public Price:number;//挂售价格单价
  public PriceType:number;//挂售价格类型详见common.hrl宏定义
  public SellTime:number;//挂售的持续时间（单位：小时）
  public StackNum:number;//物品堆叠数量
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Price",MessageBase.UINT32],
      ["PriceType",MessageBase.UINT8],
      ["SellTime",MessageBase.UINT8],
      ["StackNum",MessageBase.UINT16],

    ]
}
export class S26001 extends MessageBase{
  public RetCode:number;//挂售成功则返回0
  public GoodsId:number;//物品唯一id
  public SellRecordId:number;//该上架物品对应的挂售记录唯一id（挂售失败时为0）
  public StackNum:number;//物品堆叠数量
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["SellRecordId",MessageBase.UINT64],
      ["StackNum",MessageBase.UINT16],

    ]
}
//-------- 挂售货币 -------------
//-define（PT_MK_SELL_MONEY,  26002）.
// 协议号:26002
export class C26002 extends MessageBase{
  public MoneyToSell:number;//挂售货币的数量
  public MoneyToSellType:number;//挂售货币的类型银子
  public Price:number;//挂售价格
  public SellTime:number;//挂售的持续时间（单位：小时）
  public static DES : Array<any> =
     [
      ["MoneyToSell",MessageBase.UINT32],
      ["MoneyToSellType",MessageBase.UINT8],
      ["Price",MessageBase.UINT32],
      ["SellTime",MessageBase.UINT8],

    ]
}
export class S26002 extends MessageBase{
  public RetCode:number;//挂售成功则返回0
  public MoneyToSell:number;//挂售货币的数量
  public MoneyToSellType:number;//挂售货币的类型
  public SellRecordId:number;//该上架货币对应的挂售记录唯一id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["MoneyToSell",MessageBase.UINT32],
      ["MoneyToSellType",MessageBase.UINT8],
      ["SellRecordId",MessageBase.UINT64],

    ]
}
//-------- 重新挂售过期的上架物品 （续期） -------------
//-define（PT_MK_RESELL_EXPIRED_GOODS,  26003）.
// 协议号:26003
export class C26003 extends MessageBase{
  public SellRecordId:number;//挂售记录唯一id
  public Price:number;//挂售价格
  public PriceType:number;//挂售价格类型
  public SellTime:number;//挂售的持续时间（单位：小时）
  public static DES : Array<any> =
     [
      ["SellRecordId",MessageBase.UINT64],
      ["Price",MessageBase.UINT32],
      ["PriceType",MessageBase.UINT8],
      ["SellTime",MessageBase.UINT8],

    ]
}
export class S26003 extends MessageBase{
  public RetCode:number;//取回成功则返回0，否则返回其他值（见下面定义的失败原因宏）
  public SellRecordId:number;//挂售记录唯一id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["SellRecordId",MessageBase.UINT64],

    ]
}
//-------- 取消挂售物品 -------------
//-define（PT_MK_CANCEL_SELL,  26004）.
// 协议号:26004
export class C26004 extends MessageBase{
  public SellRecordId:number;//要取消的挂售记录唯一id
  public static DES : Array<any> =
     [
      ["SellRecordId",MessageBase.UINT64],

    ]
}
export class S26004 extends MessageBase{
  public RetCode:number;//挂售成功则返回0，否则返回其他值（见下面定义的失败原因宏）
  public SellRecordId:number;//要取消的挂售记录唯一id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["SellRecordId",MessageBase.UINT64],

    ]
}
export class C26005_1 extends MessageBase{
}
export class S26005_1 extends MessageBase{
  public SellRecordId:number;//挂售记录唯一id
  public GoodsId:number;//物品唯一id（若是货币，则为0）
  public GoodsNo:number;//物品编号（若是货币，则为0）
  public StackNum:number;//物品堆叠数量（不可堆叠物品固定为1，对于挂售货币，表示所挂售的货币的数量单位是w）
  public Price:number;//挂售价格
  public PriceType:number;//挂售价格类型（1：游戏币，2：人民币）
  public SellTime:number;//挂售时间（单位：小时）
  public LeftTime:number;//挂售剩余时间（单位：秒），若为0或负数表示挂售时间已到（负数的绝对值表示过期了多少时间）
  public Quality:number;//物品品质
  public Lv:number;//物品等级
  public GoodsType:number;//物品类型详见goods.hrl
  public static DES : Array<any> =
     [
      ["SellRecordId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["StackNum",MessageBase.UINT16],
      ["Price",MessageBase.UINT32],
      ["PriceType",MessageBase.UINT8],
      ["SellTime",MessageBase.UINT8],
      ["LeftTime",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["Lv",MessageBase.UINT8],
      ["GoodsType",MessageBase.UINT8],

    ]
}
//-------- 查看我的上架物品 -------------
//-define（PT_MK_QUERY_MY_SELL_LIST,  26005）.
// 协议号:26005
export class C26005 extends MessageBase{
}
export class S26005 extends MessageBase{
   public item_1 : S26005_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S26005_1]],

    ]
}
export class C26009_1 extends MessageBase{
}
export class S26009_1 extends MessageBase{
  public SellRecordId:number;//挂售记录唯一id
  public GoodsId:number;//物品唯一id（若是货币，则为0）
  public GoodsNo:number;//物品编号（若是货币，则为0）
  public StackNum:number;//物品堆叠数量（不可堆叠物品固定为1，对于挂售货币，表示所挂售的货币的数量）
  public Price:number;//挂售价格
  public PriceType:number;//挂售价格类型
  public SellTime:number;//挂售时间（单位：小时）
  public LeftTime:number;//挂售剩余时间（单位：秒），若为0或负数表示挂售时间已到（负数的绝对值表示过期了多少时间）
  public Quality:number;//物品品质
  public Lv:number;//物品等级
  public GoodsType:number;//物品类型（货币的物品类型为59）
  public static DES : Array<any> =
     [
      ["SellRecordId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["StackNum",MessageBase.UINT16],
      ["Price",MessageBase.UINT32],
      ["PriceType",MessageBase.UINT8],
      ["SellTime",MessageBase.UINT8],
      ["LeftTime",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["Lv",MessageBase.UINT8],
      ["GoodsType",MessageBase.UINT8],

    ]
}
// 查询商家物品 
//-define（PT_MK_QUERY_GOODS,  26009）.
export class C26009 extends MessageBase{
  public GoodsNo:number;//物品编号
  public PageIdx:number;//第几页
  public SortType:number;//价格正反序
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["PageIdx",MessageBase.UINT16],
      ["SortType",MessageBase.UINT8],

    ]
}
export class S26009 extends MessageBase{
  public PageIdx:number;//第几页
  public TotalCount:number;//总物品数
   public item_1 : S26009_1[];
  public static DES : Array<any> =
     [
      ["PageIdx",MessageBase.UINT16],
      ["TotalCount",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S26009_1]],

    ]
}
export class C26006_1 extends MessageBase{
}
export class S26006_1 extends MessageBase{
  public SellRecordId:number;//挂售记录唯一id
  public GoodsId:number;//物品唯一id（若是货币，则为0）
  public GoodsNo:number;//物品编号（若是货币，则为0）
  public StackNum:number;//物品堆叠数量（不可堆叠物品固定为1，对于挂售货币，表示所挂售的货币的数量）
  public Price:number;//挂售价格
  public PriceType:number;//挂售价格类型
  public SellTime:number;//挂售时间（单位：小时）
  public LeftTime:number;//挂售剩余时间（单位：秒），若为0或负数表示挂售时间已到（负数的绝对值表示过期了多少时间）
  public Quality:number;//物品品质
  public Lv:number;//物品等级
  public GoodsType:number;//物品类型（货币的物品类型为59）
  public static DES : Array<any> =
     [
      ["SellRecordId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["StackNum",MessageBase.UINT16],
      ["Price",MessageBase.UINT32],
      ["PriceType",MessageBase.UINT8],
      ["SellTime",MessageBase.UINT8],
      ["LeftTime",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["Lv",MessageBase.UINT8],
      ["GoodsType",MessageBase.UINT8],

    ]
}
//-------- 搜索上架物品（分页返回搜索结果，目前每页有6条记录） -------------
//-define（PT_MK_SEARCH_SELLING_GOODS,  26006）.
// 协议号:26006
export class C26006 extends MessageBase{
}
export class S26006 extends MessageBase{
  public RetCode:number;//搜索成功返回1，否则返回其他值（见下面定义的失败原因宏）
  public PageIdx:number;//页码索引（从0开始）
  public TotalCount:number;//总的搜索结果物品数（客户端据此显示最大页数）
   public item_1 : S26006_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PageIdx",MessageBase.UINT16],
      ["TotalCount",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S26006_1]],

    ]
}
//-------- 购买上架的物品 -------------
//-define（PT_MK_BUY_GOODS,  26007）.
// 协议号:26007
export class C26007 extends MessageBase{
  public SellRecordId:number;//挂售记录唯一id
  public StackNum:number;//物品堆叠数量（不可堆叠物品固定为1，对于挂售货币，表示所挂售的货币的数量）
  public static DES : Array<any> =
     [
      ["SellRecordId",MessageBase.UINT64],
      ["StackNum",MessageBase.UINT16],

    ]
}
export class S26007 extends MessageBase{
  public RetCode:number;//购买成功则返回0
  public SellRecordId:number;//挂售记录唯一id
  public StackNum:number;//物品堆叠数量（不可堆叠物品固定为1，对于挂售货币，表示所挂售的货币的数量）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["SellRecordId",MessageBase.UINT64],
      ["StackNum",MessageBase.UINT16],

    ]
}
//-------- 取回过期的上架物品 -------------
//-define（PT_MK_GET_BACK_EXPIRED_GOODS,  26008）.
// 协议号:26008
export class C26008 extends MessageBase{
  public SellRecordId:number;//挂售记录唯一id
  public static DES : Array<any> =
     [
      ["SellRecordId",MessageBase.UINT64],

    ]
}
export class S26008 extends MessageBase{
  public RetCode:number;//取回成功则返回0
  public SellRecordId:number;//挂售记录唯一id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["SellRecordId",MessageBase.UINT64],

    ]
}
