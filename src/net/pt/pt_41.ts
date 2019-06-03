import { MessageBase } from "../../message/messageBase/MessageBase";
export class C41001_1 extends MessageBase{
}
export class S41001_1 extends MessageBase{
  public Id:number;//玩家id
  public Name:string;//玩家名字
  public Lv:number;//
  public Faction:number;//
  public BattlePower:number;//战斗力
  public LeftTime:number;//剩余次数
  public Price:number;//价格：绑银
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Name",MessageBase.STRING],
      ["Lv",MessageBase.UINT16],
      ["Faction",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],
      ["LeftTime",MessageBase.UINT8],
      ["Price",MessageBase.UINT32],

    ]
}
// 雇佣系统相关协议
// 2013.12.31
// @author: zhangwq
// 分类号：41
// pt: 表示protocol
// -define（FACTION_NONE, 0）.无门派
// -define（FACTION_XMD, 1）.须弥殿
// -define（FACTION_WJM, 2）.万剑门
// -define（FACTION_YHD, 3）.烟火岛
// -define（FACTION_YMC, 4）.幽冥城
// -define（FACTION_XBG, 5）.玄冰谷
// -define（FACTION_JHG, 6）.九华宫
// -define（FACTION_MIN, 1）.最小门派代号，仅用于程序做判定
// -define（FACTION_MAX, 6）.最大门派代号，仅用于程序做判定
// ----------------获取天将列表信息------------------------
//-define（GET_HIRE_LIST, 41001）.
// 协议号：41001
export class C41001 extends MessageBase{
  public Faction:number;//门派要求
  public StartIndex:number;//数据起点从1开始
  public EndIndex:number;//数据终点服务器比较是否超过最大记录数，如果大于最大记录数，则返回最大记录数
  public SortType:number;//排序规则1->战斗力降序，2->战斗力升序，3->价格降序，4->价格升序
  public static DES : Array<any> =
     [
      ["Faction",MessageBase.UINT8],
      ["StartIndex",MessageBase.UINT32],
      ["EndIndex",MessageBase.UINT32],
      ["SortType",MessageBase.UINT8],

    ]
}
export class S41001 extends MessageBase{
  public RetCode:number;//成功返回0
  public TotalCount:number;//总数据条数
   public item_1 : S41001_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TotalCount",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S41001_1]],

    ]
}
// ----------------------------雇佣天将-----------------------------
//-define（HIRE_PLAYER, 41002）.
// 协议号：41002
export class C41002 extends MessageBase{
  public PlayerId:number;//被雇佣玩家的id
  public Count:number;//雇佣次数
  public Price:number;//雇佣单价
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Count",MessageBase.UINT8],
      ["Price",MessageBase.UINT32],

    ]
}
export class S41002 extends MessageBase{
  public RetCode:number;//成功返回0；次数不足或次数已经发生变化返回1；雇佣价格已被修改请重新雇佣返回2
  public PlayerId:number;//被雇佣玩家的id
  public Count:number;//雇佣次数
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PlayerId",MessageBase.UINT64],
      ["Count",MessageBase.UINT8],

    ]
}
export class C41003_1 extends MessageBase{
}
export class S41003_1 extends MessageBase{
  public PlayerId:number;//雇佣的玩家id
  public Name:string;//雇佣的玩家名字
  public Count:number;//雇佣次数
  public Income:number;//收益
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Name",MessageBase.STRING],
      ["Count",MessageBase.UINT8],
      ["Income",MessageBase.UINT32],

    ]
}
// --------------------获取我的被雇佣信息-------------------------------
//-define（GET_PLAYER_HIRED_INFO, 41003）.
// 协议号：41003
export class C41003 extends MessageBase{
}
export class S41003 extends MessageBase{
  public IsSignUp:number;//是否已经报名1//已经报名0//还没报名
  public LeftTime:number;//今天剩余次数
  public Price:number;//我的雇佣价格
  public SumIncome:number;//税后可以领取的总收益
  public TaxRate:number;//随率百分数如60则用60表示
  public LeftChange:number;//当天剩余修改价格次数
   public item_1 : S41003_1[];
  public static DES : Array<any> =
     [
      ["IsSignUp",MessageBase.UINT8],
      ["LeftTime",MessageBase.UINT8],
      ["Price",MessageBase.UINT32],
      ["SumIncome",MessageBase.UINT32],
      ["TaxRate",MessageBase.UINT8],
      ["LeftChange",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S41003_1]],

    ]
}
//----------------------------报名------------------------------------------------
//-define（SIGN_UP, 41004）.
// 协议号：41004
export class C41004 extends MessageBase{
  public Price:number;//单次被雇佣的价格
  public static DES : Array<any> =
     [
      ["Price",MessageBase.UINT32],

    ]
}
export class S41004 extends MessageBase{
  public RetCode:number;//0报名成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// -----------------------------领取收益-------------------------------------------
//-define（GET_INCOME, 41005）.
// 协议号：41005
export class C41005 extends MessageBase{
}
export class S41005 extends MessageBase{
  public RetCode:number;//领取成功返回0
  public Income:number;//领取的数量绑银
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Income",MessageBase.UINT32],

    ]
}
export class C41006_1 extends MessageBase{
}
export class S41006_1 extends MessageBase{
  public Id:number;//宠物id
  public No:number;//宠物编号
  public Name:string;//雇佣的名字
  public Lv:number;//等级
  public BattlePower:number;//战力
  public Weapon:number;//宠物武器
  public EvolveLv:number;//宠物进化等级
  public ParQuality:number;//宠物品质
  public ParClothes:number;//宠物画皮
  public Position:number;//是否主宠：1表示主宠
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
      ["Lv",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],
      ["Weapon",MessageBase.UINT32],
      ["EvolveLv",MessageBase.UINT8],
      ["ParQuality",MessageBase.UINT8],
      ["ParClothes",MessageBase.UINT32],
      ["Position",MessageBase.UINT8],

    ]
}
// ---------------------获取我的天将信息----------------------------------
//-define（GET_MY_HIRE, 41006）.
// 协议号：41006
export class C41006 extends MessageBase{
}
export class S41006 extends MessageBase{
  public RetCode:number;//0表示成功
  public LeftTime:number;//剩余助战次数
  public IsFight:number;//是否出战1表示出战
  public PlayerId:number;//被雇佣的玩家id
  public PlayerName:string;//名字
  public PlayerLv:number;//等级
  public Sex:number;//性别
  public Faction:number;//
  public Race:number;//
  public PlayerBattlePower:number;//战力
  public Weapon:number;//影响玩家外形的装备编号武器、
  public Headwear:number;//影响玩家外形的装备编号头饰，
  public Clothes:number;//影响玩家外形的装备编号服饰、
  public Backwear:number;//影响玩家外形的装备编号背饰
  public StrenLv:number;//玩家套装最低强化等级，如果没有套装则是0
   public item_1 : S41006_1[];
  public MagicKey:number;//法宝编号
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["LeftTime",MessageBase.UINT8],
      ["IsFight",MessageBase.UINT8],
      ["PlayerId",MessageBase.UINT64],
      ["PlayerName",MessageBase.STRING],
      ["PlayerLv",MessageBase.UINT16],
      ["Sex",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["PlayerBattlePower",MessageBase.UINT32],
      ["Weapon",MessageBase.UINT32],
      ["Headwear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["Backwear",MessageBase.UINT32],
      ["StrenLv",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S41006_1]],
      ["MagicKey",MessageBase.UINT32],

    ]
}
// ---------------------出战天将----------------------------------
//-define（FIGHT_MY_HIRE, 41007）.
// 协议号：41007
export class C41007 extends MessageBase{
}
export class S41007 extends MessageBase{
  public RetCode:number;//0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// ---------------------解雇天将----------------------------------
//-define（FIRE_MY_HIRE, 41008）.
// 协议号：41008
export class C41008 extends MessageBase{
}
export class S41008 extends MessageBase{
  public RetCode:number;//0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// -----------------服务器主动通知客户端 我的天将 剩余助战次数 发生变化-----------------------
//-define（NOTIFY_MY_HIRE_INFO_CHANGE, 41009）.
// 协议号：41009
export class C41009 extends MessageBase{
}
export class S41009 extends MessageBase{
  public LeftTime:number;//剩余助战次数
  public static DES : Array<any> =
     [
      ["LeftTime",MessageBase.UINT8],

    ]
}
// --------------------天将修改被雇佣的价格--------------------------
//-define（HIRE_CHANGE_PRICE, 41010）.
// 协议号：41010
export class C41010 extends MessageBase{
  public Price:number;//
  public static DES : Array<any> =
     [
      ["Price",MessageBase.UINT32],

    ]
}
export class S41010 extends MessageBase{
  public RetCode:number;//
  public NewPrice:number;//
  public LeftCount:number;//剩余可修改价格次数
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["NewPrice",MessageBase.UINT32],
      ["LeftCount",MessageBase.UINT8],

    ]
}
// ---------------------休息天将----------------------------------
//-define（REST_MY_HIRE, 41011）.
// 协议号：41011
export class C41011 extends MessageBase{
}
export class S41011 extends MessageBase{
  public RetCode:number;//0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
