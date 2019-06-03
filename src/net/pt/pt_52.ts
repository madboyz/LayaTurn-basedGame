import { MessageBase } from "../../message/messageBase/MessageBase";
// 商城相关协议
// 2014.2.17
// @author: zhangwq
// 分类号：52
// pt: 表示protocol
//-----------商店--向商城购买物品---------
//-define（PT_BUY_GOODS_FROM_SHOP, 52001）.
// 协议号: 52001
export class C52001 extends MessageBase{
  public No:number;//购买物品的No
  public Count:number;//数量
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],

    ]
}
export class S52001 extends MessageBase{
  public RetCode:number;//若成功则返回0，1//该物品已经卖光，2//超过限制的购买数量
  public No:number;//购买物品的No
  public Count:number;//数量
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["No",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],

    ]
}
export class C52002_1 extends MessageBase{
}
export class S52002_1 extends MessageBase{
  public No:number;//购买物品的No
  public Quality:number;//品质
  public PriceType:number;//1.银子2.金子3.绑银4.绑金
  public Price:number;//
  public DiscountPrice:number;//
  public BuyLimit:number;//1//限购的0//不限购
  public NumberLimit:number;//当BuyLimit=1且物品是终身限购时表示玩家限制购买该物品的个数
  public GoodsType:number;//0：表示普通商品1：表示限时物品，无限个物品x时间下架2：表示限量物品，上架x个;3：某个时间段内限制购买的商品
  public LeftCount:number;//当GoodsType=2时表示：该编号的物品当前剩余个数；当GoodsType=3时表示：这个时间段玩家还可以购买多少个
  public ExpireTime:number;//到期时间
  public BindState:number;//绑定状态
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["PriceType",MessageBase.UINT16],
      ["Price",MessageBase.UINT32],
      ["DiscountPrice",MessageBase.UINT32],
      ["BuyLimit",MessageBase.UINT8],
      ["NumberLimit",MessageBase.UINT32],
      ["GoodsType",MessageBase.UINT8],
      ["LeftCount",MessageBase.UINT32],
      ["ExpireTime",MessageBase.UINT32],
      ["BindState",MessageBase.UINT8],

    ]
}
//-----------查询可以购买的动态物品列表---------
//-define（PT_QUERY_DYNAMIC_GOODS_IN_SHOP, 52002）.
// 协议号: 52002
export class C52002 extends MessageBase{
}
export class S52002 extends MessageBase{
   public item_1 : S52002_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S52002_1]],

    ]
}
//-----------商店--在运营后台商城购买物品---------
//-define（PT_BUY_GOODS_FROM_OP_SHOP, 52003）.
// 协议号: 52003
export class C52003 extends MessageBase{
  public GoodsNo:number;//购买物品编号
  public Count:number;//数量
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT16],

    ]
}
export class S52003 extends MessageBase{
  public RetCode:number;//若成功则返回0，1//该物品已经卖光，2//超过限制的购买数量
  public GoodsNo:number;//购买物品编号
  public Count:number;//数量
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT16],

    ]
}
export class C52004_1 extends MessageBase{
}
export class S52004_1 extends MessageBase{
  public GoodsNo:number;//
  public Quality:number;//品质
  public PriceType:number;//1.银子2.金子3.绑银4.绑金
  public Price:number;//
  public Discount:number;//折扣率
  public GoodsType:number;//0：表示普通商品1：表示限时物品，无限个物品x时间下架2：表示限量物品，上架x个;3：某个时间段内限制购买的商品
  public LeftCount:number;//当GoodsType=2时表示：该编号的物品当前剩余个数；当GoodsType=3时表示：这个时间段玩家还可以购买多少个
  public ExpireTime:number;//到期时间
  public BindState:number;//绑定状态
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["PriceType",MessageBase.UINT8],
      ["Price",MessageBase.UINT32],
      ["Discount",MessageBase.UINT8],
      ["GoodsType",MessageBase.UINT8],
      ["LeftCount",MessageBase.UINT32],
      ["ExpireTime",MessageBase.UINT32],
      ["BindState",MessageBase.UINT8],

    ]
}
//-----------查询可以购买的运营后台商店物品列表---------
//-define（PT_QUERY_GOODS_IN_OP_SHOP, 52004）.
// 协议号: 52004
export class C52004 extends MessageBase{
}
export class S52004 extends MessageBase{
   public item_1 : S52004_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S52004_1]],

    ]
}
export class C52005_1_1 extends MessageBase{
}
export class S52005_1_1 extends MessageBase{
  public GoodsNo:number;//物品编号
  public BuyState:number;//1：可购买；2：已购买；
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["BuyState",MessageBase.UINT8],

    ]
}
export class C52005_1_2 extends MessageBase{
}
export class S52005_1_2 extends MessageBase{
  public RewardNo:number;//奖励ID
  public GetState:number;//奖励领取情况：1可领取；2已经领取；其他未达标
  public static DES : Array<any> =
     [
      ["RewardNo",MessageBase.UINT32],
      ["GetState",MessageBase.UINT8],

    ]
}
export class C52005_1 extends MessageBase{
}
export class S52005_1 extends MessageBase{
  public StepNo:number;//阶
  public UnLock:number;//1已经解锁
   public item_1 : S52005_1_1[];
   public item_2 : S52005_1_2[];
  public static DES : Array<any> =
     [
      ["StepNo",MessageBase.UINT8],
      ["UnLock",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S52005_1_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S52005_1_2]],

    ]
}
// ****************************************************
// 阶梯商店
// ****************************************************
//-----------查询阶梯商店购买\奖励领取情况---------
//-define（PT_QRY_STEP_SHOP_BUY_AWARD_INFO, 52005）.
// 协议号: 52005
export class C52005 extends MessageBase{
}
export class S52005 extends MessageBase{
   public item_1 : S52005_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S52005_1]],

    ]
}
//-----------阶梯商店购买物品---------
//-define（PT_BUY_GOODS_FROM_STEP_SHOP, 52006）.
// 协议号: 52006
export class C52006 extends MessageBase{
  public Step:number;//阶
  public GoodsNo:number;//购买物品编号
  public Count:number;//数量
  public static DES : Array<any> =
     [
      ["Step",MessageBase.UINT8],
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],

    ]
}
export class S52006 extends MessageBase{
  public Step:number;//阶
  public GoodsNo:number;//购买物品编号
  public Count:number;//数量
  public static DES : Array<any> =
     [
      ["Step",MessageBase.UINT8],
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],

    ]
}
//-----------领取阶梯商店购买奖励---------
//-define（PT_GET_STEP_SHOP_REWARD, 52007）.
// 协议号: 52007
export class C52007 extends MessageBase{
  public Step:number;//阶
  public RewardNo:number;//奖励编号
  public static DES : Array<any> =
     [
      ["Step",MessageBase.UINT8],
      ["RewardNo",MessageBase.UINT32],

    ]
}
export class S52007 extends MessageBase{
  public Step:number;//阶
  public RewardNo:number;//奖励编号
  public static DES : Array<any> =
     [
      ["Step",MessageBase.UINT8],
      ["RewardNo",MessageBase.UINT32],

    ]
}
