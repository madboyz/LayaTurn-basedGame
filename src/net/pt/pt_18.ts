import { MessageBase } from "../../message/messageBase/MessageBase";
export class C18000_1_1 extends MessageBase{
}
export class S18000_1_1 extends MessageBase{
  public SkillNo:number;//技能编号
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT32],

    ]
}
export class C18000_1_2 extends MessageBase{
}
export class S18000_1_2 extends MessageBase{
  public AttributeNo1:number;//
  public AttributeNo2:number;//
  public AttributeNo3:number;//
  public AttributeAdd1:number;//
  public AttributeAdd2:number;//
  public AttributeSub:number;//
  public BattlePower:number;//
  public static DES : Array<any> =
     [
      ["AttributeNo1",MessageBase.UINT8],
      ["AttributeNo2",MessageBase.UINT8],
      ["AttributeNo3",MessageBase.UINT8],
      ["AttributeAdd1",MessageBase.UINT16],
      ["AttributeAdd2",MessageBase.UINT16],
      ["AttributeSub",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],

    ]
}
export class C18000_1 extends MessageBase{
}
export class S18000_1 extends MessageBase{
  public MountId:number;//坐骑id
  public MountNo:number;//坐骑编号
  public Name:string;//坐骑名字
  public Type:number;//坐骑类型
  public Quality:number;//坐骑品质
  public Level:number;//坐骑等级
  public Soaring:number;//飞升次数
  public Exp:number;//成长值
  public SkillNum:number;//坐骑技能格子数
   public item_1 : S18000_1_1[];
  public AttributeNo1:number;//坐骑属性编号1
  public AttributeNo2:number;//坐骑属性编号1
  public AttributeNo3:number;//坐骑属性编号1
  public Attribute_add1:number;//增益比率（8~12）
  public Attribute_add2:number;//增益比率（8~12）
  public Attribute_sub:number;//减益比率（5~8）
   public item_2 : S18000_1_2[];
  public Step:number;//阶数
  public StepValue:number;//阶数经验值
  public Status:number;//是否骑乘（0表示否，1表示是）
  public PartnerNum:number;//关联宠物数量
  public Partner1:number;//关联宠物1（0表示没有关联）
  public Partner2:number;//关联宠物2
  public Feed:number;//可喂养次数
  public FeedTimestamp:number;//最后一次喂养时间
  public BattlePower:number;//坐骑战斗力
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["MountNo",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
      ["Type",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["Level",MessageBase.UINT16],
      ["Soaring",MessageBase.UINT16],
      ["Exp",MessageBase.UINT16],
      ["SkillNum",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S18000_1_1]],
      ["AttributeNo1",MessageBase.UINT8],
      ["AttributeNo2",MessageBase.UINT8],
      ["AttributeNo3",MessageBase.UINT8],
      ["Attribute_add1",MessageBase.UINT16],
      ["Attribute_add2",MessageBase.UINT16],
      ["Attribute_sub",MessageBase.UINT16],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S18000_1_2]],
      ["Step",MessageBase.UINT8],
      ["StepValue",MessageBase.UINT16],
      ["Status",MessageBase.UINT8],
      ["PartnerNum",MessageBase.UINT8],
      ["Partner1",MessageBase.UINT64],
      ["Partner2",MessageBase.UINT64],
      ["Feed",MessageBase.UINT32],
      ["FeedTimestamp",MessageBase.UINT32],
      ["BattlePower",MessageBase.UINT32],

    ]
}
// 坐骑系统相关协议
// 2015.05.05
// @author: lf
//-------- 打开坐骑界面----------------------------------------------------
//-define（PT_GET_MOUNT, 18000）.
//协议号：18000
export class C18000 extends MessageBase{
}
export class S18000 extends MessageBase{
  public MountNum:number;//坐骑数量（0表示没有坐骑）
   public item_1 : S18000_1[];
  public static DES : Array<any> =
     [
      ["MountNum",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S18000_1]],

    ]
}
//---------骑乘/卸下------------------------------------
//-define（PT_ONOFF_MOUNT, 18001）.
// 协议号：18001
export class C18001 extends MessageBase{
  public MountId:number;//坐骑唯一id
  public IsOn:number;//0表示卸下，1表示骑乘
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["IsOn",MessageBase.UINT8],

    ]
}
export class S18001 extends MessageBase{
  public IsOn:number;//结果码（0表示卸下，1表示骑乘）
  public OldMountId:number;//表示之前骑乘的坐骑id
  public MountId:number;//
  public static DES : Array<any> =
     [
      ["IsOn",MessageBase.UINT8],
      ["OldMountId",MessageBase.UINT64],
      ["MountId",MessageBase.UINT64],

    ]
}
//---------坐骑改名 名字的长度最多为6个汉字-------------------------------
//-define（PT_RENAME_MOUNT, 18002）.
// 协议号:18002
export class C18002 extends MessageBase{
  public MountId:number;//
  public NewName:string;//
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["NewName",MessageBase.STRING],

    ]
}
export class S18002 extends MessageBase{
  public RetCode:number;//
  public MountId:number;//
  public NewName:string;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["MountId",MessageBase.UINT64],
      ["NewName",MessageBase.STRING],

    ]
}
export class C18003_1 extends MessageBase{
}
export class S18003_1 extends MessageBase{
  public AttributeNo1:number;//重修编号
  public AttributeNo2:number;//重修编号
  public AttributeNo3:number;//重修编号
  public AttributeAddRatio1:number;//重修增益比率（300~1000）
  public AttributeAddRatio2:number;//重修增益比率（300~1000）
  public AttributeSubRatio:number;//重修减益比率（200~300）
  public BattlePower:number;//评分
  public static DES : Array<any> =
     [
      ["AttributeNo1",MessageBase.UINT8],
      ["AttributeNo2",MessageBase.UINT8],
      ["AttributeNo3",MessageBase.UINT8],
      ["AttributeAddRatio1",MessageBase.UINT16],
      ["AttributeAddRatio2",MessageBase.UINT16],
      ["AttributeSubRatio",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],

    ]
}
//----------坐骑重修----------------
//-define（PT_RESET_ATTR_MOUNT, 18003）.
// 协议号：18003
export class C18003 extends MessageBase{
  public MountId:number;//
  public ResetType:number;//重修类型（0银子，1金子）
  public Times:number;//重修次数（1重修1次，8重修8次）
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["ResetType",MessageBase.UINT8],
      ["Times",MessageBase.UINT8],

    ]
}
export class S18003 extends MessageBase{
  public MountId:number;//
  public Len:number;//重修长度（1，8）
   public item_1 : S18003_1[];
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["Len",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S18003_1]],

    ]
}
//----------重修替换--------------------
//-define（PT_SET_ATTR_MOUNT, 18004）.
// 协议号：18004
export class C18004 extends MessageBase{
  public MountId:number;//
  public AttributeNo1:number;//重修编号
  public AttributeNo2:number;//重修编号
  public AttributeNo3:number;//重修编号
  public AttributeAddRatio1:number;//
  public AttributeAddRatio2:number;//
  public AttributeSubRatio:number;//
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["AttributeNo1",MessageBase.UINT8],
      ["AttributeNo2",MessageBase.UINT8],
      ["AttributeNo3",MessageBase.UINT8],
      ["AttributeAddRatio1",MessageBase.UINT16],
      ["AttributeAddRatio2",MessageBase.UINT16],
      ["AttributeSubRatio",MessageBase.UINT16],

    ]
}
export class S18004 extends MessageBase{
}
// 
//---------喂养----------------------
//-define（PT_FEED_MOUNT, 18005）.
// 协议号：18005
export class C18005 extends MessageBase{
  public MountId:number;//
  public Feed:number;//喂养类型（0表示道具1，1表示道具2）
  public FeedCount:number;//喂养次数
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["Feed",MessageBase.UINT8],
      ["FeedCount",MessageBase.UINT32],

    ]
}
export class S18005 extends MessageBase{
  public MountId:number;//
  public RemainFeed:number;//剩余喂养次数
  public Level:number;//坐骑等级
  public Exp:number;//成长值
  public BattlePower:number;//
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["RemainFeed",MessageBase.UINT32],
      ["Level",MessageBase.UINT8],
      ["Exp",MessageBase.UINT32],
      ["BattlePower",MessageBase.UINT32],

    ]
}
//----------进阶-----------------
//-define（PT_STREN_MOUNT, 18006）.
// 协议号：18006
export class C18006 extends MessageBase{
  public MountId:number;//
  public GoodsId:number;//碎片或瓶子物品的id
  public Num:number;//数量
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],
      ["Num",MessageBase.UINT8],

    ]
}
export class S18006 extends MessageBase{
  public MountId:number;//
  public Step:number;//进阶阶数
  public StepValue:number;//进阶进阶值
  public BattlePower:number;//
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["Step",MessageBase.UINT8],
      ["StepValue",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],

    ]
}
export class C18007_1 extends MessageBase{
}
export class S18007_1 extends MessageBase{
  public SkillId:number;//技能id
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],

    ]
}
//---------打开技能---------------
//-define（PT_OPEN_MOUNT_SKILL, 18007）.
// 协议号：18007
export class C18007 extends MessageBase{
  public MountId:number;//
  public Order:number;//坐骑技能第几个格子
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["Order",MessageBase.UINT8],

    ]
}
export class S18007 extends MessageBase{
  public MountId:number;//
  public Order:number;//
   public item_1 : S18007_1[];
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["Order",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S18007_1]],

    ]
}
//--------选择觉醒技能-----------------
//-define（PT_LERAN_MOUNT_SKILL, 18008）.
// 协议号：18008
export class C18008 extends MessageBase{
  public MountId:number;//
  public SkillId:number;//
  public Order:number;//坐骑技能第几个格子（1，2，3，4）
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["SkillId",MessageBase.UINT32],
      ["Order",MessageBase.UINT8],

    ]
}
export class S18008 extends MessageBase{
  public Code:number;//结果
  public MountId:number;//
  public SkillId:number;//
  public Order:number;//坐骑技能第几个格子（1，2，3，4）
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],
      ["MountId",MessageBase.UINT64],
      ["SkillId",MessageBase.UINT32],
      ["Order",MessageBase.UINT8],

    ]
}
//---------升级技能---------
//-define（PT_UP_MOUNT_SKILL, 18009）.
// 协议号：18009
export class C18009 extends MessageBase{
  public MountId:number;//
  public SkillId:number;//
  public Order:number;//
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["SkillId",MessageBase.UINT32],
      ["Order",MessageBase.UINT8],

    ]
}
export class S18009 extends MessageBase{
  public MountId:number;//
  public Order:number;//
  public NewSkillId:number;//
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["Order",MessageBase.UINT8],
      ["NewSkillId",MessageBase.UINT32],

    ]
}
//----------关联/取消关联宠物---------
//-define（PT_CONNECT_PARTNER, 18010）.
// 协议号：18010
export class C18010 extends MessageBase{
  public MountId:number;//
  public PartnerId:number;//宠物的id
  public IsConnect:number;//是否关联（0否1是）
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["PartnerId",MessageBase.UINT64],
      ["IsConnect",MessageBase.UINT8],

    ]
}
export class S18010 extends MessageBase{
  public IsConnect:number;//
  public MountId:number;//
  public PartnerId:number;//
    //-define（PT_DELETE_MOUNT_SKILL,18011）.
  public static DES : Array<any> =
     [
      ["IsConnect",MessageBase.UINT8],
      ["MountId",MessageBase.UINT64],
      ["PartnerId",MessageBase.UINT64],

    ]
}
//-define（PT_DELETE_MOUNT_SKILL, 18011）.
// 协议号：18011
export class C18011 extends MessageBase{
  public MountId:number;//
  public Order:number;//坐骑技能第几个格子（1，2，3，4）
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["Order",MessageBase.UINT8],

    ]
}
export class S18011 extends MessageBase{
  public Code:number;//结果
  public MountId:number;//
  public Order:number;//坐骑技能第几个格子（1，2，3，4）
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],
      ["MountId",MessageBase.UINT64],
      ["Order",MessageBase.UINT8],

    ]
}
//---------喂养----------------------
//-define（PT_INHERITANCE_MOUNT, 18012）.
// 协议号：18005
export class C18012 extends MessageBase{
  public Type:number;//吞噬类型1付费2免费
  public LeftMountId:number;//吞噬者id
  public RightMountId:number;//被吞噬者id
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["LeftMountId",MessageBase.UINT64],
      ["RightMountId",MessageBase.UINT64],

    ]
}
export class S18012 extends MessageBase{
  public Type:number;//吞噬类型1付费2免费
  public MountId:number;//吞噬者id
  public RemainFeed:number;//吞噬者剩余喂养次数
  public Level:number;//吞噬者坐骑等级
  public Exp:number;//吞噬者成长值
  public BattlePower:number;//吞噬者战力
  public BMountId:number;//被吞噬者ID
  public BRemainFeed:number;//被吞噬者剩余喂养次数
  public BLevel:number;//被吞噬者坐骑等级
  public BExp:number;//被吞噬者成长值
  public BBattlePower:number;//被吞噬者战力
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["MountId",MessageBase.UINT64],
      ["RemainFeed",MessageBase.UINT8],
      ["Level",MessageBase.UINT8],
      ["Exp",MessageBase.UINT32],
      ["BattlePower",MessageBase.UINT32],
      ["BMountId",MessageBase.UINT64],
      ["BRemainFeed",MessageBase.UINT8],
      ["BLevel",MessageBase.UINT8],
      ["BExp",MessageBase.UINT32],
      ["BBattlePower",MessageBase.UINT32],

    ]
}
export class C18013_1 extends MessageBase{
}
export class S18013_1 extends MessageBase{
  public SkillNo:number;//技能编号
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT32],

    ]
}
export class C18013_2 extends MessageBase{
}
export class S18013_2 extends MessageBase{
  public AttributeNo1:number;//
  public AttributeNo2:number;//
  public AttributeNo3:number;//
  public AttributeAdd1:number;//
  public AttributeAdd2:number;//
  public AttributeSub:number;//
  public BattlePower:number;//
  public static DES : Array<any> =
     [
      ["AttributeNo1",MessageBase.UINT8],
      ["AttributeNo2",MessageBase.UINT8],
      ["AttributeNo3",MessageBase.UINT8],
      ["AttributeAdd1",MessageBase.UINT16],
      ["AttributeAdd2",MessageBase.UINT16],
      ["AttributeSub",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],

    ]
}
//-------- 查询坐骑详情----------------------------------------------------
//-define（PT_GET_MOUNT2, 18013）.
//协议号：18013
export class C18013 extends MessageBase{
  public MountId:number;//坐骑id
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],

    ]
}
export class S18013 extends MessageBase{
  public MountId:number;//坐骑id
  public MountNo:number;//坐骑编号
  public Name:string;//坐骑名字
  public Type:number;//坐骑类型
  public Quality:number;//坐骑品质
  public Level:number;//坐骑等级
  public Soaring:number;//飞升次数
  public Exp:number;//成长值
  public SkillNum:number;//坐骑技能格子数
   public item_1 : S18013_1[];
  public AttributeNo1:number;//坐骑属性编号1
  public AttributeNo2:number;//坐骑属性编号1
  public AttributeNo3:number;//坐骑属性编号1
  public Attribute_add1:number;//增益比率（8~12）
  public Attribute_add2:number;//增益比率（8~12）
  public Attribute_sub:number;//减益比率（5~8）
   public item_2 : S18013_2[];
  public Step:number;//阶数
  public StepValue:number;//阶数经验值
  public Status:number;//是否骑乘（0表示否，1表示是）
  public PartnerNum:number;//关联宠物数量
  public Partner1:number;//关联宠物1（0表示没有关联）
  public Partner2:number;//关联宠物2
  public Feed:number;//可喂养次数
  public FeedTimestamp:number;//最后一次喂养时间
  public BattlePower:number;//坐骑战斗力
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["MountNo",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
      ["Type",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["Level",MessageBase.UINT16],
      ["Soaring",MessageBase.UINT16],
      ["Exp",MessageBase.UINT16],
      ["SkillNum",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S18013_1]],
      ["AttributeNo1",MessageBase.UINT8],
      ["AttributeNo2",MessageBase.UINT8],
      ["AttributeNo3",MessageBase.UINT8],
      ["Attribute_add1",MessageBase.UINT16],
      ["Attribute_add2",MessageBase.UINT16],
      ["Attribute_sub",MessageBase.UINT16],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S18013_2]],
      ["Step",MessageBase.UINT8],
      ["StepValue",MessageBase.UINT16],
      ["Status",MessageBase.UINT8],
      ["PartnerNum",MessageBase.UINT8],
      ["Partner1",MessageBase.UINT64],
      ["Partner2",MessageBase.UINT64],
      ["Feed",MessageBase.UINT32],
      ["FeedTimestamp",MessageBase.UINT32],
      ["BattlePower",MessageBase.UINT32],

    ]
}
//-------- 坐骑飞升----------------------------------------------------
//-define（PT_MOUNT_SOARING, 18014）.
//协议号：18014
export class C18014 extends MessageBase{
  public MountId:number;//坐骑id
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],

    ]
}
export class S18014 extends MessageBase{
  public MountId:number;//坐骑id
  public RetCode:number;//操作成功失败
  public Soaring:number;//飞升等级
  public static DES : Array<any> =
     [
      ["MountId",MessageBase.UINT64],
      ["RetCode",MessageBase.UINT8],
      ["Soaring",MessageBase.UINT16],

    ]
}
