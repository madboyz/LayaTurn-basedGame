import { MessageBase } from "../../message/messageBase/MessageBase";
export class C15000_1 extends MessageBase{
}
export class S15000_1 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public GoodsNo:number;//物品编号（由策划制定的编号）
  public Slot:number;//物品所在格子
  public Count:number;//物品叠加数量
  public BindState:number;//绑定状态（见本文件开头的宏说明）
  public Quality:number;//品质（见本文件开头的宏说明）
  public UsableTimes:number;//当前剩余的可使用次数（不可使用物品固定为0，可无限使用的物品则为-1，有限次数的可使用物品则为具体的次数）
  public BattlePower:number;//装备战斗力对于非装备则为0
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["Slot",MessageBase.UINT16],
      ["Count",MessageBase.UINT32],
      ["BindState",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["UsableTimes",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],

    ]
}
// 物品系统相关协议
// 2013.5.15
// @author: huangjf, zhangwq
// pt: 表示protocol
// ============== 所涉及的宏 ===================
//物品所在地（LOC：表示location）
// -define（LOC_INVALID,0）.无效所在地（仅用于程序做判定）
// -define（LOC_BAG_EQ,1）.装备背包
// -define（LOC_BAG_USABLE,2）.可使用物品背包
// -define（LOC_BAG_UNUSABLE,3）.不可使用物品背包
// -define（LOC_STORAGE,4）.仓库（玩家自己的私人仓库）
// -define（LOC_PLAYER_EQP,5）.玩家的装备栏
// -define（LOC_PARTNER_EQP,6）.宠物的装备栏
// -define（LOC_MAIL,7）.虚拟位置：邮件（用于标记邮件中的附件）
// -define（LOC_TEMP_BAG,8）.临时背包
// -define（LOC_GUILD_STO,9）.帮派仓库
// -define（LOC_MARKET,10）.虚拟位置：市场（用于标记市场中挂售的物品）
// -define（LOC_ACCESSORY,11）.配饰装备背包
// 绑定状态
// -define（BIND_ALREADY,1）.已绑定
// -define（BIND_NEVER,2）.永不绑定
// -define（BIND_ON_GET,3）.获取即绑定
// -define（BIND_ON_USE,4）.使用后绑定
// -define（QUALITY_INVALID,0）.无效品质（用于程序做判定）
// -define（QUALITY_WHITE,1）.白
// -define（QUALITY_GREEN,2）.绿
// -define（QUALITY_BLUE,3）.蓝
// -define（QUALITY_PURPLE,4）.紫
// -define（QUALITY_ORANGE,5）.橙
// -define（QUALITY_RED,6）.红
// -define（QUALITY_MIN,1）.品质的最小有效值
// -define（QUALITY_MAX,6）.品质的最大有效值
//----------- 查询物品栏信息（服务端会返回物品列表） ------------
//-define（PT_QRY_INVENTORY,  15000）.
// 协议号：15000
export class C15000 extends MessageBase{
  public Type:number;//装备对象:1-玩家或宠物，2-伙伴
  public PartnerId:number;//宠物唯一id，如果是获取玩家的，则此字段是0
  public Location:number;//物品所在地（见本文件开头的宏说明）
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["Location",MessageBase.UINT8],

    ]
}
export class S15000 extends MessageBase{
  public Type:number;//装备对象:1-玩家或宠物，2-伙伴
  public PartnerId:number;//宠物唯一id，如果是获取玩家的，则此字段是0
  public Location:number;//物品所在地
  public Capacity:number;//背包或仓库当前容量
   public item_1 : S15000_1[];
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["Location",MessageBase.UINT8],
      ["Capacity",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15000_1]],

    ]
}
export class C15001_1 extends MessageBase{
}
export class S15001_1 extends MessageBase{
    //物品属性相关
  public InfoType:number;//（1//基础属性、2//附加属性值、3//强化属性，4//过期时间、5//挖宝区域信息、6//附加属性精炼等级（注意：2和6的顺序需要一样且从小到大）8//物品商会信息、9//额外信息、11//基础属性-没替换、12//附加属性-没替换、13//携带要求编号相关信息，23//启灵属性，33//精炼属性）
  public ObjInfoCode:number;//表示信息代号（如：攻击属性加成，防御属性加成，强化等级，过期时间戳等，用数值代号表示，详见obj_info_code.hrl中的宏）
  public Value:number;//对应的值
  public static DES : Array<any> =
     [
      ["InfoType",MessageBase.UINT8],
      ["ObjInfoCode",MessageBase.UINT16],
      ["Value",MessageBase.UINT32],

    ]
}
export class C15001_2 extends MessageBase{
}
export class S15001_2 extends MessageBase{
    //宝石镶嵌
  public HoleNo:number;//已经开启的宝石孔编号没有开启的不列在内
  public GoodsId:number;//宝石物品唯一id为0时表示没有镶嵌宝石
  public GoodsNo:number;//宝石物品编号（由策划制定的编号）为0时表示没有镶嵌宝石
  public static DES : Array<any> =
     [
      ["HoleNo",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],

    ]
}
export class C15001_3 extends MessageBase{
}
export class S15001_3 extends MessageBase{
    //装备特技（新）
  public SkillNo:number;//技能编号
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT64],

    ]
}
//----------- 获取（自己或者其他玩家的）物品详细信息（注：当物品信息有改变时，服务端会通过此协议主动通知客户端） ------------
//-define（PT_GET_GOODS_DETAIL,  15001）.
// 协议号：15001
export class C15001 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15001 extends MessageBase{
  public ComradeId:number;//伙伴id
  public PartnerId:number;//宠物唯一id，如果是获取玩家的，则此字段是0
  public Location:number;//物品所在地如果是镶嵌在装备上的宝石的话，该字段是?LOC_PLAYER_EQP
  public GoodsId:number;//物品唯一id
  public GoodsNo:number;//物品编号
  public Slot:number;//新的格子位置（从1开始算起）如果是宝石的话Slot=0
  public Count:number;//新的叠加数量
  public BindState:number;//新的绑定状态
  public Quality:number;//品质
  public UsableTimes:number;//当前剩余的可使用次数（不可使用物品固定为0，可无限使用的物品则为-1，有限次数的可使用物品则为具体的次数）
  public BattlePower:number;//装备战斗力对于非装备则为0
  public MakerName:string//制作者名字
   public item_1 : S15001_1[];
   public item_2 : S15001_2[];
  public EquipEffNo:number;//特效编号
  public SkillNo:number;//特技编号
  public EquipRequireNo:number;//装备需求配置编号
  public LastEquipRequireNo:number;//洗练装备需求配置编号
  public LastEquipSkillNo:number;//最后洗练的特技编号
  public LastEquipEffNo:number;//最后洗练的特效编号
  public CanWashCount:number;//最大可洗练次数（特技）
  public WashCount:number;//已经洗练次数（特技）
  public AccessoryLv:number;//法宝（配饰）淬炼等级
  public AccessoryExp:number;//法宝（配饰）淬炼经验
   public item_3 : S15001_3[];
  public Luck:number;//装备特技强化幸运值
  public static DES : Array<any> =
     [
      ["ComradeId",MessageBase.UINT64],
      ["PartnerId",MessageBase.UINT64],
      ["Location",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["Slot",MessageBase.UINT16],
      ["Count",MessageBase.UINT32],
      ["BindState",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["UsableTimes",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],
      ["MakerName",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15001_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S15001_2]],
      ["EquipEffNo",MessageBase.UINT32],
      ["SkillNo",MessageBase.UINT32],
      ["EquipRequireNo",MessageBase.UINT32],
      ["LastEquipRequireNo",MessageBase.UINT32],
      ["LastEquipSkillNo",MessageBase.UINT32],
      ["LastEquipEffNo",MessageBase.UINT32],
      ["CanWashCount",MessageBase.UINT32],
      ["WashCount",MessageBase.UINT32],
      ["AccessoryLv",MessageBase.UINT32],
      ["AccessoryExp",MessageBase.UINT32],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S15001_3]],
      ["Luck",MessageBase.UINT16],

    ]
}
export class C15201_1 extends MessageBase{
}
export class S15201_1 extends MessageBase{
    //物品属性相关
  public InfoType:number;//（1//基础属性、2//附加属性值、3//强化相关、4//过期时间、5//挖宝区域信息、6//附加属性精炼等级（注意：2和6的顺序需要一样且从小到大）、7//法宝信息、8//物品商会信息、9//额外信息、11//基础属性-没替换、12//附加属性-没替换、13//携带要求编号相关信息）
  public ObjInfoCode:number;//表示信息代号（如：攻击属性加成，防御属性加成，强化等级，剩余有效时间等，用数值代号表示，详见obj_info_code.hrl中的宏）
  public Value:number;//对应的值
  public static DES : Array<any> =
     [
      ["InfoType",MessageBase.UINT8],
      ["ObjInfoCode",MessageBase.UINT16],
      ["Value",MessageBase.UINT32],

    ]
}
export class C15201_2 extends MessageBase{
}
export class S15201_2 extends MessageBase{
    //宝石镶嵌
  public HoleNo:number;//已经开启的宝石孔编号没有开启的不列在内
  public GoodsId:number;//宝石物品唯一id为0时表示没有镶嵌宝石
  public GoodsNo:number;//宝石物品编号（由策划制定的编号）为0时表示没有镶嵌宝石
  public static DES : Array<any> =
     [
      ["HoleNo",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],

    ]
}
export class C15201_3 extends MessageBase{
}
export class S15201_3 extends MessageBase{
    //装备特技（新）
  public SkillNo:number;//技能编号
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT64],

    ]
}
// 排行榜物品信息
//-define（PT_GET_GOODS_DETAIL_ON_RANK,  15201）.
// 协议号：15201
export class C15201 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15201 extends MessageBase{
  public ComradeId:number;//伙伴id
  public PartnerId:number;//宠物唯一id，如果是获取玩家的，则此字段是0
  public Location:number;//物品所在地如果是镶嵌在装备上的宝石的话，该字段是?LOC_PLAYER_EQP
  public GoodsId:number;//物品唯一id
  public GoodsNo:number;//物品编号
  public Slot:number;//新的格子位置（从1开始算起）如果是宝石的话Slot=0
  public Count:number;//新的叠加数量
  public BindState:number;//新的绑定状态
  public Quality:number;//品质
  public UsableTimes:number;//当前剩余的可使用次数（不可使用物品固定为0，可无限使用的物品则为-1，有限次数的可使用物品则为具体的次数）
  public BattlePower:number;//装备战斗力对于非装备则为0
  public MakerName:string//制作者名字
   public item_1 : S15201_1[];
   public item_2 : S15201_2[];
  public EquipEffNo:number;//特效编号
  public SkillNo:number;//特技编号
  public EquipRequireNo:number;//装备需求配置编号
  public LastEquipRequireNo:number;//洗练装备需求配置编号
  public LastEquipSkillNo:number;//最后洗练的特技编号
  public LastEquipEffNo:number;//最后洗练的特效编号
  public CanWashCount:number;//最大可洗练次数（特技）
  public WashCount:number;//已经洗练次数（特技）
  public AccessoryLv:number;//法宝（配饰）淬炼等级
  public AccessoryExp:number;//法宝（配饰）淬炼经验
   public item_3 : S15201_3[];
  public Luck:number;//装备特技强化幸运值
  public static DES : Array<any> =
     [
      ["ComradeId",MessageBase.UINT64],
      ["PartnerId",MessageBase.UINT64],
      ["Location",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["Slot",MessageBase.UINT16],
      ["Count",MessageBase.UINT32],
      ["BindState",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["UsableTimes",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],
      ["MakerName",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15201_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S15201_2]],
      ["EquipEffNo",MessageBase.UINT32],
      ["SkillNo",MessageBase.UINT32],
      ["EquipRequireNo",MessageBase.UINT32],
      ["LastEquipRequireNo",MessageBase.UINT32],
      ["LastEquipSkillNo",MessageBase.UINT32],
      ["LastEquipEffNo",MessageBase.UINT32],
      ["CanWashCount",MessageBase.UINT32],
      ["WashCount",MessageBase.UINT32],
      ["AccessoryLv",MessageBase.UINT32],
      ["AccessoryExp",MessageBase.UINT32],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S15201_3]],
      ["Luck",MessageBase.UINT16],

    ]
}
// --------------------从背包出售物品--------------------------
//-define（PT_SELL_GOODS_FROM_BAG, 15002）.
// 协议号：15002
export class C15002 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public SellCount:number;//物品数量
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["SellCount",MessageBase.UINT16],

    ]
}
export class S15002 extends MessageBase{
}
//如果把物品堆叠的数量全部卖出则返回 define（PT_NOTIFY_INV_GOODS_DESTROYED,15061）.
//如果仅卖出部分 则 返回 -define（PT_GET_GOODS_DETAIL,15001）.
// 从临时背包一键出售物品
//-define（PT_SELL_ALL_GOODS_FROM_TEMP_BAG, 15003）.
// 协议号：15003
export class C15003 extends MessageBase{
}
export class S15003 extends MessageBase{
  public RetCode:number;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 从临时背包一键获取物品
//-define（PT_GET_ALL_GOODS_FROM_TEMP_BAG, 15004）.
// 协议号：15004
export class C15004 extends MessageBase{
}
export class S15004 extends MessageBase{
  public RetCode:number;//0表示成功，失败通过998协议返回
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C15005_1_1 extends MessageBase{
}
export class S15005_1_1 extends MessageBase{
  public Sys:number;//1:强化;2:启灵;3:精炼
  public StrLv:number;//强化等级
  public StrExp:number;//当前强化经验
  public static DES : Array<any> =
     [
      ["Sys",MessageBase.UINT8],
      ["StrLv",MessageBase.UINT16],
      ["StrExp",MessageBase.UINT32],

    ]
}
export class C15005_1 extends MessageBase{
}
export class S15005_1 extends MessageBase{
  public Slot:number;//1~6
   public item_1 : S15005_1_1[];
  public GenLv:number;//4个孔的宝石总等级
  public static DES : Array<any> =
     [
      ["Slot",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15005_1_1]],
      ["GenLv",MessageBase.UINT32],

    ]
}
// 请求装备栏格子宝石镶嵌、强化信息
//-define（PT_GET_EQ_SLOT_INFO, 15005）.
// 协议号：15005
export class C15005 extends MessageBase{
}
export class S15005 extends MessageBase{
   public item_1 : S15005_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15005_1]],

    ]
}
export class C15006_1 extends MessageBase{
}
export class S15006_1 extends MessageBase{
  public Sys:number;//1:强化;2:启灵;3:精炼
  public StrLv:number;//强化等级
  public StrExp:number;//当前强化经验
  public static DES : Array<any> =
     [
      ["Sys",MessageBase.UINT8],
      ["StrLv",MessageBase.UINT16],
      ["StrExp",MessageBase.UINT32],

    ]
}
// 推送 装备栏格子宝石镶嵌、强化信息
//-define（PT_SYNC_EQ_SLOT_INFO, 15006）.
// 协议号：15006
export class C15006 extends MessageBase{
}
export class S15006 extends MessageBase{
  public Slot:number;//1~6
   public item_1 : S15006_1[];
  public GenLv:number;//4个孔的宝石总等级
  public static DES : Array<any> =
     [
      ["Slot",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15006_1]],
      ["GenLv",MessageBase.UINT32],

    ]
}
// 一键镶嵌,单格子总等级最多升级4级
//-define（PT_GEN_LV_UP, 15007）.
// 协议号：15007
export class C15007 extends MessageBase{
  public Slot:number;//1~6
  public static DES : Array<any> =
     [
      ["Slot",MessageBase.UINT8],

    ]
}
export class S15007 extends MessageBase{
  public Slot:number;//1~6
  public GenLv:number;//4个孔的宝石总等级
  public static DES : Array<any> =
     [
      ["Slot",MessageBase.UINT8],
      ["GenLv",MessageBase.UINT32],

    ]
}
//----------- 扩充背包或仓库的容量 也就是解锁物品框------------
//-define（PT_EXTEND_CAPACITY, 15022）.
// 协议号：15022
export class C15022 extends MessageBase{
  public Location:number;//扩充位置（表示是扩充背包还是仓库）
  public ExtendNum:number;//扩充的格子数量
  public static DES : Array<any> =
     [
      ["Location",MessageBase.UINT8],
      ["ExtendNum",MessageBase.UINT8],

    ]
}
export class S15022 extends MessageBase{
  public RetCode:number;//若成功则返回0，否则不返回，而是直接发送失败提示消息协议（涉及的失败原因见如下说明）
  public Location:number;//扩充位置
  public ExtendNum:number;//扩充的格子数量
  public NewCapacity:number;//新的容量（格子总数）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Location",MessageBase.UINT8],
      ["ExtendNum",MessageBase.UINT8],
      ["NewCapacity",MessageBase.UINT16],

    ]
}
//-----------穿装备------------
//-define（PT_PUTON_EQUIP,  15030）.
// 协议号：15030
export class C15030 extends MessageBase{
  public Type:number;//装备对象:1-玩家或宠物，2-伙伴，3-飞行器
  public PartnerId:number;//宠物唯一id，如果是获取玩家的，则此字段是0
  public GoodsId:number;//物品唯一id（指明穿的是哪一件装备）
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15030 extends MessageBase{
  public Type:number;//装备对象:1-玩家或宠物，2-伙伴，3-飞行器
  public RetCode:number;//若成功则返回0，否则不返回，而是直接发送失败提示消息协议（涉及的失败原因见如下说明）
  public PartnerId:number;//宠物唯一id，如果是获取玩家的，则此字段是0
  public GoodsId:number;//物品唯一id（指明穿的是哪一件装备）
  public ToSlot:number;//新格子（从1开始算起）
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["RetCode",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],
      ["ToSlot",MessageBase.UINT16],

    ]
}
// 失败原因：（宏定义在prompt_msg_code.hrl）
// PM_UNKNOWN_ERR -- 未知错误
// PM_GOODS_NOT_EXISTS -- 物品不存在
// PM_LV_LIMIT -- 等级不够
// PM_CAREER_LIMIT -- 职业不符合
//-----------脱装备------------
//-define（PT_TAKEOFF_EQUIP,  15031）.
// 协议号：15031
export class C15031 extends MessageBase{
  public Type:number;//装备对象:1-玩家或宠物，2-伙伴，3-飞行器
  public PartnerId:number;//宠物唯一id，如果是获取玩家的，则此字段是0
  public EquipPos:number;//装备的位置（指明脱的是哪一件装备，EquipPos的宏见goods.hrl）
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["EquipPos",MessageBase.UINT8],

    ]
}
export class S15031 extends MessageBase{
  public Type:number;//装备对象:1-玩家或宠物，2-伙伴，3-飞行器
  public RetCode:number;//若成功则返回0，否则不返回，而是直接发送提示消息的协议（涉及的失败原因见如下说明）
  public PartnerId:number;//宠物唯一id，如果是获取玩家的，则此字段是0
  public GoodsId:number;//物品唯一id
  public NewSlot:number;//装备脱下后在背包所处的格子
  public EquipPos:number;//装备的位置（指明脱的是哪一件装备，EquipPos的宏见goods.hrl）
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["RetCode",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],
      ["NewSlot",MessageBase.UINT16],
      ["EquipPos",MessageBase.UINT8],

    ]
}
// 失败原因：（宏定义在prompt_msg_code.hrl）
// PM_UNKNOWN_ERR -- 未知错误
// PM_BAG_FULL -- 背包满了
// TODO: 其他失败原因.....
// --------------------批量使用物品：是使用可叠加 但只可使用一次的物品---------------
//-define（PT_BATCH_USE_GOODS, 15049）.
// 协议号：15049
export class C15049 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public Count:number;//使用个数
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT32],

    ]
}
export class S15049 extends MessageBase{
  public RetCode:number;//若成功则返回0，否则不返回，而是直接发送失败提示消息协议（涉及的失败原因见如下说明）
  public GoodsId:number;//物品唯一id
  public Count:number;//使用个数
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT32],

    ]
}
//-----------使用单个物品（战斗外使用，并且是玩家为自己而使用），至于战斗内使用物品、为其他对象（如宠物）使用物品之类的，则用另外相应的独立协议------------
//-define（PT_USE_GOODS,  15050）.
// 协议号：15050
export class C15050 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15050 extends MessageBase{
  public RetCode:number;//若成功则返回0，否则不返回，而是直接发送失败提示消息协议（涉及的失败原因见如下说明）
  public GoodsId:number;//物品唯一id
  public GoodsNo:number;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],

    ]
}
//-----------使用单个物品（战斗外使用，并且是玩家为自己而使用），至于战斗内使用物品、为其他对象（如宠物）使用物品之类的，则用另外相应的独立协议------------
//-define（PT_USE_GOODS1,  15054）.
// 协议号：15054
export class C15054 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public EffNo:number;//效果编号
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["EffNo",MessageBase.UINT32],

    ]
}
export class S15054 extends MessageBase{
  public RetCode:number;//若成功则返回0，否则不返回，而是直接发送失败提示消息协议（涉及的失败原因见如下说明）
  public GoodsId:number;//物品唯一id
  public GoodsNo:number;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],

    ]
}
// 失败原因：
// PM_NO_SUCH_GOODS-- 物品不存在
// PM_LV_LIMIT-- 等级不够
// PM_CAREER_LIMIT -- 职业不符合
// ..其他原因。。。
// ...
//-----------丢弃物品------------
//-define（PT_DISCARD_GOODS,  15051）.
// 协议号：15051
export class C15051 extends MessageBase{
  public Location:number;//物品所在地
  public GoodsId:number;//物品唯一id
  public static DES : Array<any> =
     [
      ["Location",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15051 extends MessageBase{
  public RetCode:number;//若成功则返回0，若失败则不返回，而是直接发送失败提示消息协议（涉及的失败原因见如下说明）
  public Location:number;//物品所在地
  public GoodsId:number;//物品唯一id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Location",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
// 失败原因：
// PM_CAN_NOT_DISCARD_GOODS -- 该物品不能丢弃
//-----------拖动物品（从原来格子到另一个格子,同在背包或同在仓库内）------------
//-define（PT_DRAG_GOODS,  15052）.
// 协议号：15052
export class C15052 extends MessageBase{
  public Location:number;//物品所在地（背包或仓库）
  public GoodsId:number;//物品唯一id
  public ToSlot:number;//新格子（从1开始算起，下同），表示拖到哪一格
  public static DES : Array<any> =
     [
      ["Location",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["ToSlot",MessageBase.UINT16],

    ]
}
export class S15052 extends MessageBase{
  public RetCode:number;//若成功则返回0，否则不返回
  public Location:number;//物品所在地（背包或仓库）
  public GoodsId:number;//物品唯一id
  public ToSlot:number;//新格子（从1开始算起）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Location",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["ToSlot",MessageBase.UINT16],

    ]
}
//-----------搬移物品（从背包移到仓库，或从仓库移到背包）------------
//-define（PT_MOVE_GOODS,  15053）.
// 协议号：15053
export class C15053 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public Count:number;//物品数量
  public ToLocation:number;//目标所在地（指明要搬移到哪里：仓库或背包）
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT32],
      ["ToLocation",MessageBase.UINT8],

    ]
}
export class S15053 extends MessageBase{
  public RetCode:number;//若成功则返回0，否则不返回，而是直接发送失败提示消息协议（涉及的失败原因见如下说明）
  public GoodsId:number;//物品唯一id
  public Count:number;//物品数量
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT32],

    ]
}
//----------- 玩家获得物品（放到背包）后，通知客户端（服务端主动通知）------------
// 注：如果有需要服务端主动通知的话，则可以使用该协议。
//-define（PT_NOTIFY_INV_GOODS_ADDED,  15060）.
// 协议号：15060
export class C15060 extends MessageBase{
}
export class S15060 extends MessageBase{
  public ComradeId:number;//伙伴id
  public PartnerId:number;//宠物id
  public Location:number;//物品所在地（背包或仓库）
  public GoodsId:number;//物品唯一id
  public GoodsNo:number;//物品编号
  public Slot:number;//所在格子位置
  public Count:number;//叠加数量
  public BindState:number;//绑定状态：绑定状态（见本文件开头的宏说明）
  public Quality:number;//品质
  public UsableTimes:number;//当前剩余的可使用次数（不可使用物品固定为0，可无限使用的物品则为-1，有限次数的可使用物品则为具体的次数）
  public BattlePower:number;//装备战斗力对于非装备则为0
  public static DES : Array<any> =
     [
      ["ComradeId",MessageBase.UINT64],
      ["PartnerId",MessageBase.UINT64],
      ["Location",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["Slot",MessageBase.UINT16],
      ["Count",MessageBase.UINT32],
      ["BindState",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["UsableTimes",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],

    ]
}
//----------- 通知客户端：背包或仓库中的物品被销毁了（服务端主动通知）------------
// 注：如果有需要服务端主动通知的话，则可以使用该协议。
//-define（PT_NOTIFY_INV_GOODS_DESTROYED,  15061）.
// 协议号：15061
export class C15061 extends MessageBase{
}
export class S15061 extends MessageBase{
  public Location:number;//物品所在地（背包或仓库）
  public GoodsId:number;//物品唯一id
  public static DES : Array<any> =
     [
      ["Location",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
//-----------整理背包------------
//-define（PT_ARRANGE_BAG,  15070）.
// 协议号：15070
export class C15070 extends MessageBase{
}
export class S15070 extends MessageBase{
  public RetCode:number;//返回0表示成功，返回1表示已经整理过，无需再整理。
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C15071_1 extends MessageBase{
}
export class S15071_1 extends MessageBase{
    //结果列表
  public RetCode:number;//0//成功其他如：PM_PAR_LV_LIMIT见prompt_msg_code.hrl
  public StrenLv:number;//当前强化等级
  public StrenExp:number;//当前强化经验
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT16],
      ["StrenLv",MessageBase.UINT8],
      ["StrenExp",MessageBase.UINT32],

    ]
}
//如果成功，客户端收到回复后，则发送查询物品栏（背包）信息的协议，即15000协议，以更新背包
//-----------装备强化------------
//-define（PT_STRENTHEN_EQUIP,  15071）.
// 协议号：15071
export class C15071 extends MessageBase{
  public Slot:number;//装备栏格子编号
  public Count:number;//强化次数0//表示一键升级
  public UseBindStone:number;//是否使用绑定的强化石0//不使用1//使用2混合使用
  public Sys:number;//1:强化;2:启灵;3:精炼
  public static DES : Array<any> =
     [
      ["Slot",MessageBase.UINT8],
      ["Count",MessageBase.UINT8],
      ["UseBindStone",MessageBase.UINT8],
      ["Sys",MessageBase.UINT8],

    ]
}
export class S15071 extends MessageBase{
  public Slot:number;//装备栏格子编号
  public Count:number;//强化次数0//表示一键升级
  public UseBindStone:number;//是否使用绑定的强化石0//不使用1//使用2混合使用（已经无用）
  public Sys:number;//1:强化;2:启灵;3:精炼
   public item_1 : S15071_1[];
  public static DES : Array<any> =
     [
      ["Slot",MessageBase.UINT8],
      ["Count",MessageBase.UINT8],
      ["UseBindStone",MessageBase.UINT8],
      ["Sys",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15071_1]],

    ]
}
//--------------道具合成与提炼------------------
//-define（PT_COMPOSE_GOODS, 15072）.
// 协议号：15072
export class C15072 extends MessageBase{
  public GoodsNo:number;//物品编号
  public Count:number;//合成or提炼次数
  public UseBindGoods:number;//是否使用绑定的物品0//不使用1//使用2优先使用非绑定，3优先使用绑定
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],
      ["UseBindGoods",MessageBase.UINT8],

    ]
}
export class S15072 extends MessageBase{
  public RetCode:number;//返回0表示成功
  public GoodsNo:number;//物品编号
  public Count:number;//合成or提炼次数
  public OpNo:number;//操作类型
  public UseBindGoods:number;//是否使用绑定的物品0//不使用1//使用2优先使用非绑定，3优先使用绑定
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],
      ["OpNo",MessageBase.UINT8],
      ["UseBindGoods",MessageBase.UINT8],

    ]
}
//--------------道具转换------------------
//-define（PT_CHANGE_GOODS, 15084）.
// 协议号：15084
export class C15084 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public ChangeToGoodsNo:number;//要转换为物品编号
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["ChangeToGoodsNo",MessageBase.UINT32],

    ]
}
export class S15084 extends MessageBase{
  public RetCode:number;//返回0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//--------------装备打造-----------------
//-define（PT_EQUIP_BUILD, 15085）.
// 协议号：15085
export class C15085 extends MessageBase{
  public GoodsNo:number;//物品编号
  public GoodsId:number;//基础材料id
  public Type:number;//打造类型
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsId",MessageBase.UINT64],
      ["Type",MessageBase.UINT8],

    ]
}
export class S15085 extends MessageBase{
  public GoodsId:number;//物品id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class C15073_1 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15073_1 extends MessageBase{
}
export class C15073_2 extends MessageBase{
}
export class S15073_2 extends MessageBase{
  public GoodsId:number;//物品唯一id（分解成功的）
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
//--------------装备分解------------------
//-define（PT_EQUIP_DECOMPOSE, 15073）.
// 协议号：15073
export class C15073 extends MessageBase{
   public item_1 : C15073_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C15073_1]],

    ]
}
export class S15073 extends MessageBase{
   public item_2 : S15073_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S15073_2]],

    ]
}
// ----------------------开宝石孔--------------
//-define（PT_EQ_OPEN_GEMSTONE, 15074）.
// 协议号：15074
export class C15074 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
export class S15074 extends MessageBase{
  public GoodsId:number;//物品唯一id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
// ----------------------宝石镶嵌--------------
//-define（PT_EQ_INLAY_GEMSTONE, 15075）.
// 协议号：15075
export class C15075 extends MessageBase{
  public EqGoodsId:number;//装备物品唯一id（改成装备栏格子）
  public GemGoodsId:number;//宝石物品id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["EqGoodsId",MessageBase.UINT64],
      ["GemGoodsId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
export class S15075 extends MessageBase{
  public EqGoodsId:number;//装备物品唯一id（改成装备栏格子）
  public GemGoodsId:number;//宝石物品id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["EqGoodsId",MessageBase.UINT64],
      ["GemGoodsId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
// ----------------------摘下宝石--------------
//-define（PT_EQ_UNLOAD_GEMSTONE, 15076）.
// 协议号：15076
export class C15076 extends MessageBase{
  public EqGoodsId:number;//装备物品唯一id（（改成装备栏格子））
  public GemGoodsId:number;//宝石物品id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["EqGoodsId",MessageBase.UINT64],
      ["GemGoodsId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
export class S15076 extends MessageBase{
  public EqGoodsId:number;//装备物品唯一id（（改成装备栏格子）
  public GemGoodsId:number;//宝石物品id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["EqGoodsId",MessageBase.UINT64],
      ["GemGoodsId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
//-----------整理仓库------------
//-define（PT_ARRANGE_STORAGE,  15077）.
// 协议号：15077
export class C15077 extends MessageBase{
}
export class S15077 extends MessageBase{
  public RetCode:number;//返回0表示成功，返回1表示已经整理过，无需再整理。
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//如果成功，客户端收到回复后，则发送查询物品栏（背包）信息的协议，即15000协议，以更新仓库
// ----------------装备品质提升-------------------------
//-define（PT_EQ_UPGRADE_QUALITY, 15079）.
// 协议号：15079
export class C15079 extends MessageBase{
  public GoodsId:number;//装备id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15079 extends MessageBase{
  public RetCode:number;//0表示成功
  public GoodsId:number;//装备id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
// ----------------装备重铸-------------------------
//-define（PT_EQ_RECAST, 15080）.
// 协议号：15080
export class C15080 extends MessageBase{
  public GoodsId:number;//装备id
  public Type:number;//0重铸附加属性1重铸基础属性2重铸武器类型
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Type",MessageBase.UINT8],

    ]
}
export class S15080 extends MessageBase{
  public RetCode:number;//0表示成功
  public GoodsId:number;//装备id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
// ----------------装备精炼-------------------------
//-define（PT_EQ_REFINE, 15081）.
// 协议号：15080
export class C15081 extends MessageBase{
  public GoodsId:number;//装备id
  public Count:number;//次数
  public Index:number;//第几天属性
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT8],
      ["Index",MessageBase.UINT8],

    ]
}
export class S15081 extends MessageBase{
  public RetCode:number;//0表示成功
  public GoodsId:number;//装备id
  public Count:number;//次数
  public Index:number;//第几条属性
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT8],
      ["Index",MessageBase.UINT8],

    ]
}
// ----------------装备升级-------------------------
//-define（PT_EQ_UPGRADE_LV, 15082）.
// 协议号：15082
export class C15082 extends MessageBase{
  public GoodsId:number;//装备id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15082 extends MessageBase{
  public RetCode:number;//0表示成功
  public GoodsId:number;//装备id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class C15083_1 extends MessageBase{
  public GoodsNo:number;//消耗的物品编号
  public BindState:number;//
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["BindState",MessageBase.UINT8],

    ]
}
export class S15083_1 extends MessageBase{
}
//--------------物品熔炼------------------
//-define（PT_GOODS_SMELT, 15083）.
// 协议号：15083
export class C15083 extends MessageBase{
   public item_1 : C15083_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C15083_1]],

    ]
}
export class S15083 extends MessageBase{
  public RetCode:number;//返回0表示成功
  public OpNo:number;//操作类型
  public GoodsId:number;//熔炼处理的物品id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["OpNo",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
//--------------领取遗失的宝石------------------
//-define（PT_GOODS_RESET_REWARD, 15086）.
// 协议号：15086
export class C15086 extends MessageBase{
}
export class S15086 extends MessageBase{
  public RetCode:number;//返回0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// ----------------装备重铸（新的可以选择是否保存属性）-------------------------
//-define（PT_EQ_RECAST_NEW, 15087）.
// 协议号：15080
export class C15087 extends MessageBase{
  public GoodsId:number;//装备id
  public Type:number;//0重铸附加属性1重铸基础属性2重铸特技3重铸特效
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Type",MessageBase.UINT8],

    ]
}
export class S15087 extends MessageBase{
  public Type:number;//0重铸附加属性1重铸基础属性2重铸特技3重铸特效
  public GoodsId:number;//装备id
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
// 是否选择重铸后的属性
//-define（PT_EQ_RECAST_SAVE, 15088）.
// 协议号：15080
export class C15088 extends MessageBase{
  public GoodsId:number;//装备id
  public Type:number;//0附加属性1基础属性2特技3特效
  public Action:number;//0放弃1替换
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Type",MessageBase.UINT8],
      ["Action",MessageBase.UINT8],

    ]
}
export class S15088 extends MessageBase{
  public RetCode:number;//0表示成功
  public GoodsId:number;//装备id
  public Action:number;//0放弃1替换
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["Action",MessageBase.UINT8],

    ]
}
// 打开箱子
//-define（PT_OPEN_BOX, 15089）.
// 协议号：15089
export class C15089 extends MessageBase{
  public Type:number;//0金箱子1银箱子
  public No:number;//祈福奖励编号
  public NpcId:number;//
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["No",MessageBase.UINT16],
      ["NpcId",MessageBase.UINT32],

    ]
}
export class S15089 extends MessageBase{
  public RetCode:number;//0表示成功
  public RewardNo:number;//奖励编号
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["RewardNo",MessageBase.UINT16],

    ]
}
//--------------道具合成------------------
//-define（PT_COMPOSE_GOODS_NEW, 15090）.
// 15090
export class C15090 extends MessageBase{
  public GoodsNo:number;//道具编号
  public Count:number;//合成数量
  public Type:number;//配方类型
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],
      ["Type",MessageBase.UINT8],

    ]
}
export class S15090 extends MessageBase{
  public RetCode:number;//返回0表示成功
  public GoodsId:number;//返回物品id失败则是0
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
// 重铸武器类型
//-define（PT_EQ_RECAST_TYPE, 15091）.
// 协议号：15080
export class C15091 extends MessageBase{
  public GoodsId:number;//装备id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15091 extends MessageBase{
  public RetCode:number;//0表示成功
  public GoodsId:number;//装备id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class C15101_1 extends MessageBase{
}
export class S15101_1 extends MessageBase{
  public goods_no:number;//物品编号
  public num:number;//物品数量
  public static DES : Array<any> =
     [
      ["goods_no",MessageBase.UINT32],
      ["num",MessageBase.UINT32],

    ]
}
// ----------------------挖宝结果--------------
//-define（PT_DIG_TREASURE_RESULT, 15101）.
export class C15101 extends MessageBase{
    //-define（PT_DIG_TREASURE_RESULT,15101）.
}
export class S15101 extends MessageBase{
  public Type:number;//事件类型
   public item_1 : S15101_1[];
  public scene_id:number;//场景ID
  public goods_no:number;//物品编号
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15101_1]],
      ["scene_id",MessageBase.UINT32],
      ["goods_no",MessageBase.UINT32],

    ]
}
//---------------------特技、特效转换、魂属性------------------------------
// 特技转换
//-define（PT_GOODS_STUNT_CONVERT, 15102）.
// 协议号：15102
export class C15102 extends MessageBase{
  public GoodsId:number;//装备id
  public SkillNo:number;//特技编号
  public NewSkillNo:number;//新的特技编号
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["SkillNo",MessageBase.UINT32],
      ["NewSkillNo",MessageBase.UINT32],

    ]
}
export class S15102 extends MessageBase{
  public GoodsId:number;//装备id
  public NewSkillNo:number;//新的特技编号
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["NewSkillNo",MessageBase.UINT32],

    ]
}
// 特效转换
//-define（PT_GOODS_EFFECT_CONVERT, 15103）.
// 协议号：15103
export class C15103 extends MessageBase{
  public GoodsId:number;//装备id
  public EffectNo:number;//特效果编号
  public NewEffectNo:number;//新的特效编号
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["EffectNo",MessageBase.UINT32],
      ["NewEffectNo",MessageBase.UINT32],

    ]
}
export class S15103 extends MessageBase{
  public GoodsId:number;//装备id
  public NewEffectNo:number;//新的特效编号
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["NewEffectNo",MessageBase.UINT32],

    ]
}
export class C15104_1 extends MessageBase{
  public ObjInfoCode:number;//表示信息代号（详见obj_info_code.hrl中的宏）
  public static DES : Array<any> =
     [
      ["ObjInfoCode",MessageBase.UINT16],

    ]
}
export class S15104_1 extends MessageBase{
}
// 魂属性最高
//-define（PT_GOODS_SOUL_ATTR_SET, 15104）.
// 协议号：15104
export class C15104 extends MessageBase{
  public GoodsId:number;//装备id
   public item_1 : C15104_1[];
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C15104_1]],

    ]
}
export class S15104 extends MessageBase{
}
export class C15150_1 extends MessageBase{
  public GoodsId:number;//法宝id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15150_1 extends MessageBase{
}
//返回：PT_GET_GOODS_DETAIL
//-----------------------------------法宝相关-----------------------------
// 品质强化
//-define（PT_MAGIC_KEY_QUALITY_UPGRADE, 15150）.
// 协议号:15150
export class C15150 extends MessageBase{
  public GoodsId:number;//要强化的法宝id
   public item_1 : C15150_1[];
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C15150_1]],

    ]
}
export class S15150 extends MessageBase{
  public GoodsId:number;//要强化的法宝id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class C15151_1 extends MessageBase{
  public SkillId:number;//锁定的技能id
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],

    ]
}
export class S15151_1 extends MessageBase{
}
// 法宝洗练
//-define（PT_MAGIC_KEY_XILIAN, 15151）.
// 协议号:15151
export class C15151 extends MessageBase{
  public GoodsId:number;//要强化的法宝id
   public item_1 : C15151_1[];
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C15151_1]],

    ]
}
export class S15151 extends MessageBase{
  public GoodsId:number;//要洗练的法宝id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
// 法宝技能升级
//-define（PT_MAGIC_KEY_SKILL_LV_UP, 15152）.
// 协议号:15152
export class C15152 extends MessageBase{
  public GoodsId:number;//法宝id
  public SkillId:number;//准备升级的技能id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["SkillId",MessageBase.UINT32],

    ]
}
export class S15152 extends MessageBase{
  public GoodsId:number;//法宝id
  public SkillId:number;//升级后的技能id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["SkillId",MessageBase.UINT32],

    ]
}
//-----------一键装备强化--------------------------------
//-define（PT_STRENTHEN_EQUIP1,  15171）.
// 协议号：15171
export class C15171 extends MessageBase{
}
export class S15171 extends MessageBase{
  public RetCode:number;//0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// ----------------一键装备品质提升---------------------
//-define（PT_EQ_UPGRADE_QUALITY1, 15172）.
// 协议号：15172
export class C15172 extends MessageBase{
}
export class S15172 extends MessageBase{
  public RetCode:number;//0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// ----------------一键装备升级-------------------------
//-define（PT_EQ_UPGRADE_LV1, 15173）.
// 协议号：15173
export class C15173 extends MessageBase{
}
export class S15173 extends MessageBase{
  public RetCode:number;//0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C15174_1 extends MessageBase{
  public GoodsId:number;//消耗的宠物装备id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15174_1 extends MessageBase{
}
// 宠物装备经验增加
//-define（PT_PAR_EQ_ADD_EXP, 15174）.
// 协议号:15174
export class C15174 extends MessageBase{
  public GoodsId:number;//要增加经验的装备id
   public item_1 : C15174_1[];
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C15174_1]],

    ]
}
export class S15174 extends MessageBase{
  public GoodsId:number;//要增加经验的装备id
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
// 法宝（配饰）淬炼
//-define（PT_ACCESSORY_UPGRADE, 15175）.
// 协议号： 15175
export class C15175 extends MessageBase{
  public GoodsId:number;//
  public Count:number;//次数
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT32],

    ]
}
export class S15175 extends MessageBase{
  public Lv:number;//
  public Exp:number;//
  public static DES : Array<any> =
     [
      ["Lv",MessageBase.UINT32],
      ["Exp",MessageBase.UINT32],

    ]
}
export class C15176_1 extends MessageBase{
}
export class S15176_1 extends MessageBase{
  public GoodsId:number;//获得法宝
  public GoodsNo:number;//
  public Quality:number;//品质
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],

    ]
}
// 法宝（配饰）探宝
//-define（PT_ACCESSORY_SEEK, 15176）.
// 协议号： 15176
export class C15176 extends MessageBase{
  public SeekId:number;//探宝ID
  public static DES : Array<any> =
     [
      ["SeekId",MessageBase.UINT32],

    ]
}
export class S15176 extends MessageBase{
   public item_1 : S15176_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15176_1]],

    ]
}
export class C15177_1 extends MessageBase{
}
export class S15177_1 extends MessageBase{
  public SkillNo:number;//技能编号
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT64],

    ]
}
// 装备特技强化
//-define（PT_EQ_STUNT_INTENSIFY, 15177）.
// 协议号：15177
export class C15177 extends MessageBase{
  public GoodsId:number;//
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S15177 extends MessageBase{
  public GoodsId:number;//
  public Luck:number;//幸运值
   public item_1 : S15177_1[];
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Luck",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15177_1]],

    ]
}
export class C15178_1 extends MessageBase{
  public SkillNo:number;//技能编号
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT64],

    ]
}
export class S15178_1 extends MessageBase{
}
export class C15178_2 extends MessageBase{
}
export class S15178_2 extends MessageBase{
  public SkillNo:number;//技能编号
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT64],

    ]
}
// 启动装备特技
//-define（PT_START_EQ_STUNT, 15178）.
// 协议号：15178
export class C15178 extends MessageBase{
   public item_1 : C15178_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C15178_1]],

    ]
}
export class S15178 extends MessageBase{
   public item_2 : S15178_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S15178_2]],

    ]
}
export class C15179_1 extends MessageBase{
}
export class S15179_1 extends MessageBase{
  public StuntNo:number;//可启动技能编号
  public static DES : Array<any> =
     [
      ["StuntNo",MessageBase.UINT64],

    ]
}
export class C15179_2 extends MessageBase{
}
export class S15179_2 extends MessageBase{
  public SkillNo:number;//已启动技能编号
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT64],

    ]
}
// 查询已启动的装备特技
//-define（PT_GET_EQ_STUNT_INFO, 15179）.
// 协议号：15179
export class C15179 extends MessageBase{
}
export class S15179 extends MessageBase{
   public item_1 : S15179_1[];
   public item_2 : S15179_2[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S15179_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S15179_2]],

    ]
}
