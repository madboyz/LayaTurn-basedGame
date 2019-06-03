import { MessageBase } from "../../message/messageBase/MessageBase";
// 宠物系统相关协议
// 2013.10.31
// @author: zhangwq
// pt: 表示protocol
//--------获取宠物（不包括玩家通过使用宠物蛋获获取的情况，使用宠物蛋服务器会主动通知玩家获得宠物） -------------
//-define（PT_GET_PARTNER, 17000）.
// 协议号:17000
export class C17000 extends MessageBase{
  public PartnerNo:number;//宠物编号
  public static DES : Array<any> =
     [
      ["PartnerNo",MessageBase.UINT32],

    ]
}
export class S17000 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public PartnerNo:number;//宠物编号
  public Name:string;//武将名字
  public Quality:number;//武将品质
  public State:number;//休息or参战状态锁定or非锁定状态100//>休息非锁定101//>休息锁定110//>参战非锁定111//>参战锁定
  public Position:number;//是否主宠：1表示主宠
  public Hp:number;//气血
  public Mp:number;//魔法（法力）
  public Exp:number;//经验
  public HpLim:number;//气血上限
  public MpLim:number;//魔法（法力）上限
  public ExpLim:number;//经验上限
  public Lv:number;//武将等级
  public Follow:number;//1表示跟随0表示不跟随
  public EvolveLv:number;//当前进化等级
  public CultivateLv:number;//修炼等级
  public Layer:number;//修炼层数
  public DianhuaLv:number;//点化等级
  public DianhuaExp:number;//点化层数
  public SpiritLv:number;//兽灵等级
  public SpiritExp:number;//兽灵层数
  public IllustrateLv:number;//图鉴等级
  public IllustrateExp:number;//图鉴层数
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["PartnerNo",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
      ["Quality",MessageBase.UINT8],
      ["State",MessageBase.UINT8],
      ["Position",MessageBase.UINT8],
      ["Hp",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["Exp",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["ExpLim",MessageBase.UINT32],
      ["Lv",MessageBase.UINT16],
      ["Follow",MessageBase.UINT8],
      ["EvolveLv",MessageBase.UINT16],
      ["CultivateLv",MessageBase.UINT16],
      ["Layer",MessageBase.UINT8],
      ["DianhuaLv",MessageBase.UINT16],
      ["DianhuaExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
      ["IllustrateLv",MessageBase.UINT16],
      ["IllustrateExp",MessageBase.UINT16],

    ]
}
//----------------设置宠物出战、休息、锁定 状态-----------------------------
//-define（PT_SET_PARTNER_STATE, 17001）.
// 协议号:17001
export class C17001 extends MessageBase{
  public PartnerId:number;//
  public State:number;//休息or参战状态锁定or非锁定状态100//>休息非锁定101//>休息锁定110//>参战非锁定111//>参战锁定
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["State",MessageBase.UINT8],

    ]
}
export class S17001 extends MessageBase{
  public RetCode:number;//0//成功
  public PartnerId:number;//
  public State:number;//休息or参战状态锁定or非锁定状态100//>休息非锁定101//>休息锁定110//>参战非锁定111//>参战锁定
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["State",MessageBase.UINT8],

    ]
}
//----------------开启宠物携带数量 携带数量：（记在人物表）以通过使用道具女妖栏来扩充此数量，最大上限为8个，初始默认为3个-----------------------
//-define（PT_OPEN_CARRY_PARTNER_NUM, 17002）.
// 协议号:17002
export class C17002 extends MessageBase{
  public Num:number;//要开启的数量
  public static DES : Array<any> =
     [
      ["Num",MessageBase.UINT8],

    ]
}
export class S17002 extends MessageBase{
  public RetCode:number;//0//成功
  public CurNum:number;//当前玩家可携带宠物数量
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["CurNum",MessageBase.UINT8],

    ]
}
//----------------设置宠物为主宠-------------------------
//-define（PT_SET_MAIN_PARTNER, 17003）.
// 协议号:17003
export class C17003 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17003 extends MessageBase{
  public RetCode:number;//0//成功
  public PartnerId:number;//当前玩家主宠id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],

    ]
}
//-----------------洗髓-----------------------------------
//-define（PT_WASH_PARTNER, 17004）.
// 协议号:17004
export class C17004 extends MessageBase{
  public PartnerId:number;//
  public Type:number;//洗髓类型1表示普通洗髓，2表示高级洗髓
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Type",MessageBase.UINT8],

    ]
}
export class S17004 extends MessageBase{
}
//通过本协议返回PT_GET_PARTNER_ATTR_INFO 17009协议的字段
//-----------------培养（暂时没用）-----------------------------------
//-define（PT_TRAIN_PARTNER, 17005）.
// 协议号:17005
export class C17005 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17005 extends MessageBase{
}
//待定
//------------------放生-----------------------------------
//-define（PT_FREE_PARTNER, 17006）.
// 协议号:17006
export class C17006 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17006 extends MessageBase{
  public RetCode:number;//
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],

    ]
}
//-------------------宠物改名 名字的长度最多为6个汉字-------------------------------
//-define（PT_PARTNER_RENAME, 17007）.
// 协议号:17007
export class C17007 extends MessageBase{
  public PartnerId:number;//
  public NewName:string;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["NewName",MessageBase.STRING],

    ]
}
export class S17007 extends MessageBase{
  public RetCode:number;//
  public PartnerId:number;//
  public NewName:string;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["NewName",MessageBase.STRING],

    ]
}
export class C17008_1 extends MessageBase{
}
export class S17008_1 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public PartnerNo:number;//宠物编号
  public Name:string;//武将名字
  public Quality:number;//武将品质
  public State:number;//休息or参战状态锁定or非锁定状态100//>休息非锁定101//>休息锁定110//>参战非锁定111//>参战锁定
  public Position:number;//是否主宠：1表示主宠
  public Hp:number;//气血
  public Mp:number;//魔法（法力）
  public ActSpeedState:number;//宠物精炼属性（速度）在属性计算时的正负状态:0表示正，1表示负
  public HpLim:number;//气血上限
  public MpLim:number;//魔法（法力）上限
  public LoyaltyLim:number;//忠诚度上限
  public Lv:number;//武将等级
  public Follow:number;//1表示跟随0表示不跟随
  public EvolveLv:number;//当前进化等级
  public CultivateLv:number;//修炼等级
  public Layer:number;//修炼层数
  public DianhuaLv:number;//点化等级
  public DianhuaExp:number;//点化层数
  public SpiritLv:number;//兽灵等级
  public SpiritExp:number;//兽灵层数
  public IllustrateLv:number;//图鉴等级
  public IllustrateExp:number;//图鉴层数
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["PartnerNo",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
      ["Quality",MessageBase.UINT8],
      ["State",MessageBase.UINT8],
      ["Position",MessageBase.UINT8],
      ["Hp",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["ActSpeedState",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["LoyaltyLim",MessageBase.UINT32],
      ["Lv",MessageBase.UINT16],
      ["Follow",MessageBase.UINT8],
      ["EvolveLv",MessageBase.UINT16],
      ["CultivateLv",MessageBase.UINT16],
      ["Layer",MessageBase.UINT8],
      ["DianhuaLv",MessageBase.UINT16],
      ["DianhuaExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
      ["IllustrateLv",MessageBase.UINT16],
      ["IllustrateExp",MessageBase.UINT16],

    ]
}
//-------- 获取玩家携带中的武将列表-------------
//-define（PT_GET_PARTNER_LIST,  17008）.
// 协议号:17008
export class C17008 extends MessageBase{
}
export class S17008 extends MessageBase{
   public item_1 : S17008_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17008_1]],

    ]
}
export class C17009_1 extends MessageBase{
}
export class S17009_1 extends MessageBase{
  public SkillType:number;//技能类别：1//先天；2//后天
  public SkillNo:number;//技能编号
  public SkillLv:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillType",MessageBase.UINT8],
      ["SkillNo",MessageBase.UINT32],
      ["SkillLv",MessageBase.UINT16],

    ]
}
export class C17009_2 extends MessageBase{
}
export class S17009_2 extends MessageBase{
  public Code:number;//精炼属性编号
  public Value:number;//精炼属性值
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT16],
      ["Value",MessageBase.UINT32],

    ]
}
export class C17009_3 extends MessageBase{
}
export class S17009_3 extends MessageBase{
    //亲密度属性选择
  public OICode:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public static DES : Array<any> =
     [
      ["OICode",MessageBase.UINT16],

    ]
}
export class C17009_4 extends MessageBase{
}
export class S17009_4 extends MessageBase{
  public SkillType:number;//技能类别：1//先天；2//后天
  public SkillNo:number;//技能编号
  public SkillLv:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillType",MessageBase.UINT8],
      ["SkillNo",MessageBase.UINT32],
      ["SkillLv",MessageBase.UINT16],

    ]
}
//----------获取玩家自己的单个武将的属性信息-------
// 
//-define（PT_GET_PARTNER_ATTR_INFO,  17009）.
// 协议号:17009
export class C17009 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17009 extends MessageBase{
  public PartnerNo:number;//将类编号
  public PartnerId:number;//武将唯一id
  public Lv:number;//武将等级
  public Name:string;//武将名字
  public Quality:number;//品质
  public Exp:number;//武将经验值
  public Hp:number;//武将血量
  public Mp:number;//魔法（法力）
  public PhyAtt:number;//物理攻击
  public PhyDef:number;//物理防御
  public MagAtt:number;//法术攻击
  public MagDef:number;//法术防御
  public ActSpeed:number;//出手速度
  public PhyComboAttProba:number;//物理连击率
  public StrikebackProba:number;//反击率
  public MagComboAttProba:number;//法术连击率
  public ResisHit:number;//封印抗性
  public ResisSeal:number;//封印抗性
  public AbsorbHpCoef:number;//吸血系数
   public item_1 : S17009_1[];
  public ActSpeedState:number;//宠物精炼属性（速度）在属性计算时的正负状态:0表示正，1表示负
  public NatureNo:number;//性格
  public HpLim:number;//武将血量上限
  public MpLim:number;//法力上限
  public Intimacy:number;//亲密度
  public IntimacyLv:number;//亲密度等级
  public EvolveLv:number;//进化等级
  public Cultivate:number;//修炼值
  public CultivateLv:number;//修炼等级
  public BaseGrow:number;//成长基础值
  public BaseHpAptitude:number;//生命资质基础值
  public BaseMagAptitude:number;//法力资质基础值
  public BasePhyAttAptitude:number;//物攻资质基础值
  public BaseMagAttAptitude:number;//法功资质基础值
  public BasePhyDefAptitude:number;//物防资质基础值
  public BaseMagDefAptitude:number;//法防资质基础值
  public BaseSpeedAptitude:number;//速度资质基础值
  public MaxPostnatalSkillSlot:number;//最大后天技能格数
  public Life:number;//当前寿命
  public BattlePower:number;//当前战斗力
  public MoodNo:number;//当前心情编号
  public Evolve:number;//进化值
  public Clothes:number;//画皮编号即衣服
  public Layer:number;//最后的修炼层数
  public Crit:number;//暴击几率
  public Ten:number;//暴击抗性
  public HealValue:number;//治疗强度
  public Str:number;//力量
  public Con:number;//体力
  public Sta:number;//耐力
  public Spi:number;//智力
  public Agi:number;//敏捷
  public FeerPoint:number;//分配点
  public SoaringLv:number;//飞升次数
   public item_2 : S17009_2[];
  public Do_phy_dam_scaling:number;//物理伤害
  public Do_mag_dam_scaling:number;//法术伤害
  public crit_coef:number;//暴击程度
  public Neglect_seal_resis:number;//忽视抗封
  public Neglect_phy_def:number;//忽视物理防御
  public Neglect_mag_def:number;//忽视法术防御
  public Revive_heal_coef:number;//复活治疗
  public Order:number;//支援排序值
   public item_3 : S17009_3[];
  public DianhuaLv:number;//点化等级
  public DianhuaExp:number;//点化层数
  public SpiritLv:number;//兽灵等级
  public SpiritExp:number;//兽灵层数
  public IllustrateLv:number;//图鉴等级
  public IllustrateExp:number;//图鉴层数
   public item_4 : S17009_4[];
  public static DES : Array<any> =
     [
      ["PartnerNo",MessageBase.UINT32],
      ["PartnerId",MessageBase.UINT64],
      ["Lv",MessageBase.UINT16],
      ["Name",MessageBase.STRING],
      ["Quality",MessageBase.UINT8],
      ["Exp",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["PhyAtt",MessageBase.UINT32],
      ["PhyDef",MessageBase.UINT32],
      ["MagAtt",MessageBase.UINT32],
      ["MagDef",MessageBase.UINT32],
      ["ActSpeed",MessageBase.UINT32],
      ["PhyComboAttProba",MessageBase.UINT32],
      ["StrikebackProba",MessageBase.UINT32],
      ["MagComboAttProba",MessageBase.UINT32],
      ["ResisHit",MessageBase.UINT32],
      ["ResisSeal",MessageBase.UINT32],
      ["AbsorbHpCoef",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17009_1]],
      ["ActSpeedState",MessageBase.UINT32],
      ["NatureNo",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Intimacy",MessageBase.UINT32],
      ["IntimacyLv",MessageBase.UINT16],
      ["EvolveLv",MessageBase.UINT16],
      ["Cultivate",MessageBase.UINT32],
      ["CultivateLv",MessageBase.UINT16],
      ["BaseGrow",MessageBase.UINT32],
      ["BaseHpAptitude",MessageBase.UINT32],
      ["BaseMagAptitude",MessageBase.UINT32],
      ["BasePhyAttAptitude",MessageBase.UINT32],
      ["BaseMagAttAptitude",MessageBase.UINT32],
      ["BasePhyDefAptitude",MessageBase.UINT32],
      ["BaseMagDefAptitude",MessageBase.UINT32],
      ["BaseSpeedAptitude",MessageBase.UINT32],
      ["MaxPostnatalSkillSlot",MessageBase.UINT8],
      ["Life",MessageBase.UINT32],
      ["BattlePower",MessageBase.UINT32],
      ["MoodNo",MessageBase.UINT16],
      ["Evolve",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["Layer",MessageBase.UINT8],
      ["Crit",MessageBase.UINT16],
      ["Ten",MessageBase.UINT16],
      ["HealValue",MessageBase.UINT32],
      ["Str",MessageBase.UINT16],
      ["Con",MessageBase.UINT16],
      ["Sta",MessageBase.UINT16],
      ["Spi",MessageBase.UINT16],
      ["Agi",MessageBase.UINT16],
      ["FeerPoint",MessageBase.UINT16],
      ["SoaringLv",MessageBase.UINT16],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17009_2]],
      ["Do_phy_dam_scaling",MessageBase.UINT32],
      ["Do_mag_dam_scaling",MessageBase.UINT32],
      ["crit_coef",MessageBase.UINT32],
      ["Neglect_seal_resis",MessageBase.UINT32],
      ["Neglect_phy_def",MessageBase.UINT32],
      ["Neglect_mag_def",MessageBase.UINT32],
      ["Revive_heal_coef",MessageBase.UINT32],
      ["Order",MessageBase.UINT16],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S17009_3]],
      ["DianhuaLv",MessageBase.UINT16],
      ["DianhuaExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
      ["IllustrateLv",MessageBase.UINT16],
      ["IllustrateExp",MessageBase.UINT16],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S17009_4]],

    ]
}
export class C17011_1 extends MessageBase{
}
export class S17011_1 extends MessageBase{
  public Key:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT16],
      ["NewValue",MessageBase.UINT32],

    ]
}
//----------- 通知客户端：更新宠物的一个或多个信息 ------------
//-define（PT_NOTIFY_PARTNER_INFO_CHANGE,  17011）.
// 协议号：17011
export class C17011 extends MessageBase{
}
export class S17011 extends MessageBase{
  public PartnerId:number;//武将唯一id
   public item_1 : S17011_1[];
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17011_1]],

    ]
}
//------------ 获取武将天赋 （此协议已经没用了）------------------------
//-define（PT_GET_PARTNER_NATURE_ATTR,  17012）.
// 协议号：17012
export class C17012 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17012 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public NatureNo:number;//性格编号百分比之分子
  public PhyAtt:number;//物理攻击百分比之分子
  public MagAtt:number;//法术攻击百分比之分子
  public Speed:number;//速度百分比之分子
  public PhyDef:number;//物理防御百分比之分子
  public Hp:number;//气血百分比之分子
  public MagDef:number;//法术防御百分比之分子
  public Life:number;//生命百分比之分子
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["NatureNo",MessageBase.UINT32],
      ["PhyAtt",MessageBase.UINT8],
      ["MagAtt",MessageBase.UINT8],
      ["Speed",MessageBase.UINT8],
      ["PhyDef",MessageBase.UINT8],
      ["Hp",MessageBase.UINT8],
      ["MagDef",MessageBase.UINT8],
      ["Life",MessageBase.UINT8],

    ]
}
export class C17013_1 extends MessageBase{
  public OICode:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public static DES : Array<any> =
     [
      ["OICode",MessageBase.UINT16],

    ]
}
export class S17013_1 extends MessageBase{
}
export class C17013_2 extends MessageBase{
}
export class S17013_2 extends MessageBase{
  public OICode:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public static DES : Array<any> =
     [
      ["OICode",MessageBase.UINT16],

    ]
}
//----------- 选择亲密度属性 ------------
//-define（PT_NOTIFY_PARTNER_SEL_INTIMACY_ATTR,  17013）.
// 协议号：17013
export class C17013 extends MessageBase{
  public PartnerId:number;//武将唯一id
   public item_1 : C17013_1[];
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C17013_1]],

    ]
}
export class S17013 extends MessageBase{
  public PartnerId:number;//武将唯一id
   public item_2 : S17013_2[];
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17013_2]],

    ]
}
//-----------------进化-----------------------------------
//-define（PT_PARTNER_EVOLVE, 17014）.
// 协议号:17014
export class C17014 extends MessageBase{
  public PartnerId:number;//需要进化的女妖id
  public GoodsCount:number;//物品数量
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["GoodsCount",MessageBase.UINT16],

    ]
}
export class S17014 extends MessageBase{
  public RetCode:number;//0//成功1//失败
  public PartnerId:number;//
  public EvolveLv:number;//当前进化等级
  public Evolve:number;//当前进化值
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["EvolveLv",MessageBase.UINT16],
      ["Evolve",MessageBase.UINT32],

    ]
}
//-----------------修炼-----------------------------------
//-define（PT_PARTNER_CULTIVATE, 17015）.
// 协议号:17015
export class C17015 extends MessageBase{
  public PartnerId:number;//
  public Count:number;//修炼次数
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Count",MessageBase.UINT8],

    ]
}
export class S17015 extends MessageBase{
  public PartnerId:number;//
  public Ret:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Ret",MessageBase.UINT8],

    ]
}
//-----------------请求进化信息-----------------------------------
//-define（PT_PARTNER_EVOLVE_INFO, 17016）.
// 协议号:17016
export class C17016 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17016 extends MessageBase{
  public PartnerId:number;//
  public BattlePower:number;//进化前当前战斗力
  public EvolveLv:number;//进化前进化等级
  public CurGrow:number;//进化前当前成长值
  public AddedGrow:number;//进化前附加成长值
  public BattlePower1:number;//进化后当前战斗力
  public EvolveLv1:number;//进化后进化等级
  public CurGrow1:number;//进化后当前成长值
  public AddedGrow1:number;//进化后附加成长值
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["BattlePower",MessageBase.UINT32],
      ["EvolveLv",MessageBase.UINT16],
      ["CurGrow",MessageBase.UINT32],
      ["AddedGrow",MessageBase.UINT32],
      ["BattlePower1",MessageBase.UINT32],
      ["EvolveLv1",MessageBase.UINT16],
      ["CurGrow1",MessageBase.UINT32],
      ["AddedGrow1",MessageBase.UINT32],

    ]
}
//-----------------------请求可携带数量可出战数量 当可出战数量发生变化时服务端也主动推送这信息----------------------------
//-define（PT_GET_NUM_LIMIT, 17017）.
// 协议号：17017
export class C17017 extends MessageBase{
}
export class S17017 extends MessageBase{
  public CurCarryNum:number;//当前玩家可以携带的最大宠物数
  public CurFightNum:number;//当前玩家可出战的最大宠物数
  public static DES : Array<any> =
     [
      ["CurCarryNum",MessageBase.UINT8],
      ["CurFightNum",MessageBase.UINT8],

    ]
}
// --------------------宠物使用物品---------------
//-define（PT_PARTNER_USE_GOODS, 17018）.
// 协议号：17018
export class C17018 extends MessageBase{
  public PartnerId:number;//宠物id
  public GoodsId:number;//物品唯一id
  public Count:number;//使用个数
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S17018 extends MessageBase{
  public RetCode:number;//若成功则返回0，否则不返回，而是直接发送失败提示消息协议（涉及的失败原因见如下说明）
  public GoodsId:number;//物品唯一id
  public Count:number;//使用个数
  public GoodsNo:number;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],
      ["GoodsNo",MessageBase.UINT32],

    ]
}
//-----------------------改变宠物支援出战排序值----------------------------
//-define（PT_PAR_CHANGE_ORDER, 17019）.
// 协议号：17019
export class C17019 extends MessageBase{
  public PartnerId:number;//宠物id
  public Order:number;//排序值
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Order",MessageBase.UINT16],

    ]
}
export class S17019 extends MessageBase{
  public RetCode:number;//若成功则返回0
  public PartnerId:number;//宠物id
  public Order:number;//排序值
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["Order",MessageBase.UINT16],

    ]
}
//-----------------------获取已经改变宠物心情的次数----------------------------
//-define（PT_GET_CHANGE_MOOD_COUNT, 17020）.
// 协议号：17020
export class C17020 extends MessageBase{
}
export class S17020 extends MessageBase{
  public Count:number;//已经主动更新心情次数
  public static DES : Array<any> =
     [
      ["Count",MessageBase.UINT16],

    ]
}
export class C17021_1 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17021_1 extends MessageBase{
}
export class C17021_2 extends MessageBase{
}
export class S17021_2 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
//------------------批量放生-----------------------------------
//-define（PT_BATCH_FREE_PARTNER, 17021）.
// 协议号:17006
export class C17021 extends MessageBase{
   public item_1 : C17021_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C17021_1]],

    ]
}
export class S17021 extends MessageBase{
  public RetCode:number;//0表示成功其他表示失败原因
   public item_2 : S17021_2[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT16],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17021_2]],

    ]
}
export class C17022_1 extends MessageBase{
}
export class S17022_1 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
//------------------一键放生-----------------------------------
//-define（PT_ONE_KEY_FREE_PARTNER, 17022）.
// 协议号:17006
export class C17022 extends MessageBase{
}
export class S17022 extends MessageBase{
  public RetCode:number;//0表示成功其他表示失败原因
   public item_1 : S17022_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17022_1]],

    ]
}
// ----------------------进入青楼---------------------------废弃
//-define（PT_PAR_ENTER_HOTEL, 17023）.
// 协议号:17023
export class C17023 extends MessageBase{
  public LvStep:number;//等级段编号1//>1-29级。2//>30-49级。3//>50-69级。4//>70-99级。
  public EnterType:number;//进入青楼的类型1表示普通进入；2表示高级进入；3表示免费普通进入
  public static DES : Array<any> =
     [
      ["LvStep",MessageBase.UINT8],
      ["EnterType",MessageBase.UINT8],

    ]
}
export class S17023 extends MessageBase{
  public RetCode:number;//0表示成功失败通过998协议返回
  public EnterType:number;//进入青楼的类型1表示普通进入；2表示高级进入；3表示免费普通进入
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["EnterType",MessageBase.UINT8],

    ]
}
export class C17024_1 extends MessageBase{
  public PartnerId:number;//要放生的女妖id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17024_1 extends MessageBase{
}
export class C17024_2 extends MessageBase{
}
export class S17024_2 extends MessageBase{
  public PartnerId:number;//成功放生的女妖id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
//------------------放生青楼中自己抽取出来的女妖（包括放生与一键放生）-----------------------------------废弃
//-define（PT_PAR_FREE_IN_HOTEL, 17024）.
// 协议号:17024
export class C17024 extends MessageBase{
   public item_1 : C17024_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C17024_1]],

    ]
}
export class S17024 extends MessageBase{
   public item_2 : S17024_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17024_2]],

    ]
}
export class C17025_1 extends MessageBase{
  public PartnerId:number;//要领养的女妖id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17025_1 extends MessageBase{
}
export class C17025_2 extends MessageBase{
}
export class S17025_2 extends MessageBase{
  public PartnerId:number;//成功领养的女妖id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
//------------------领养青楼中自己抽取出来的女妖（包括领养与一键领养）-----------------------------------废弃
//-define（PT_PAR_ADOPT_IN_HOTEL, 17025）.
// 协议号:17025
export class C17025 extends MessageBase{
   public item_1 : C17025_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C17025_1]],

    ]
}
export class S17025 extends MessageBase{
   public item_2 : S17025_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17025_2]],

    ]
}
export class C17026_1 extends MessageBase{
}
export class S17026_1 extends MessageBase{
  public LvStep:number;//
  public Counter:number;//计数器，表示再寻多少个必出紫色女妖
  public static DES : Array<any> =
     [
      ["LvStep",MessageBase.UINT8],
      ["Counter",MessageBase.UINT8],

    ]
}
export class C17026_2 extends MessageBase{
}
export class S17026_2 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public PartnerNo:number;//宠物编号
  public Name:string;//武将名字
  public Quality:number;//武将品质
  public State:number;//休息or参战状态锁定or非锁定状态100//>休息非锁定101//>休息锁定110//>参战非锁定111//>参战锁定
  public Position:number;//是否主宠：1表示主宠
  public Hp:number;//气血
  public Mp:number;//魔法（法力）
  public Loyalty:number;//忠诚度
  public HpLim:number;//气血上限
  public MpLim:number;//魔法（法力）上限
  public LoyaltyLim:number;//忠诚度上限
  public Lv:number;//武将等级
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["PartnerNo",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
      ["Quality",MessageBase.UINT8],
      ["State",MessageBase.UINT8],
      ["Position",MessageBase.UINT8],
      ["Hp",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["Loyalty",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["LoyaltyLim",MessageBase.UINT32],
      ["Lv",MessageBase.UINT16],

    ]
}
// ------------------------获取上次抽取的信息 or 开始寻妖 or 再来一次--------------------------------废弃
//-define（PT_PAR_FIND_PAR_INFO, 17026）.
// 协议号:17026
export class C17026 extends MessageBase{
  public Type:number;//操作类型：0//表示请求上次抽取的信息，1//开始寻妖2//再来一次
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],

    ]
}
export class S17026 extends MessageBase{
  public EnterType:number;//当前进入青楼的类型0表示还没有进入;1表示普通进入；2表示高级进入
  public LastEnterType:number;//上次进入青楼的类型0表示还没有进入;1表示普通进入；2表示高级进入
  public LastFreeEnterTime:number;//上次免费普通进入的青楼的时间戳
  public LvStep:number;//等级段编号1//>1-29级。2//>30-49级。3//>50-69级。4//>70-99级。
   public item_1 : S17026_1[];
   public item_2 : S17026_2[];
  public static DES : Array<any> =
     [
      ["EnterType",MessageBase.UINT8],
      ["LastEnterType",MessageBase.UINT8],
      ["LastFreeEnterTime",MessageBase.UINT32],
      ["LvStep",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17026_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17026_2]],

    ]
}
//-----------------获取青楼中自己抽取的女妖详细信息-----------------------------------废弃
//-define（PT_PAR_GET_ATTR_OF_PAR_HOTEL, 17027）.
// 协议号:17027
export class C17027 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17027 extends MessageBase{
}
export class C17028_1 extends MessageBase{
}
export class S17028_1 extends MessageBase{
  public SkillType:number;//技能类别：1//先天；2//后天
  public SkillNo:number;//技能编号
  public SkillLv:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillType",MessageBase.UINT8],
      ["SkillNo",MessageBase.UINT32],
      ["SkillLv",MessageBase.UINT16],

    ]
}
export class C17028_2 extends MessageBase{
}
export class S17028_2 extends MessageBase{
  public Code:number;//精炼属性编号
  public Value:number;//精炼属性值
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT16],
      ["Value",MessageBase.UINT32],

    ]
}
export class C17028_3 extends MessageBase{
}
export class S17028_3 extends MessageBase{
    //亲密度属性选择
  public OICode:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public static DES : Array<any> =
     [
      ["OICode",MessageBase.UINT16],

    ]
}
export class C17028_4 extends MessageBase{
}
export class S17028_4 extends MessageBase{
  public SkillType:number;//技能类别：1//先天；2//后天
  public SkillNo:number;//技能编号
  public SkillLv:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillType",MessageBase.UINT8],
      ["SkillNo",MessageBase.UINT32],
      ["SkillLv",MessageBase.UINT16],

    ]
}
export class C17028_5 extends MessageBase{
}
export class S17028_5 extends MessageBase{
    //装备信息
  public GoodsId:number;//物品id
  public GoodsNo:number;//物品类型id
  public EquipPos:number;//装备的位置
  public BindState:number;//绑定状态（见本文件开头的宏说明）
  public Quality:number;//品质（见本文件开头的宏说明）
  public StrenLv:number;//强化等级
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["EquipPos",MessageBase.UINT8],
      ["BindState",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["StrenLv",MessageBase.UINT8],

    ]
}
//通过本协议返回PT_GET_PARTNER_ATTR_INFO 17009协议的字段
//----------获取玩家自己的或者别人的单个武将的属性信息-------
// 
//-define（PT_GET_PARTNER_ATTR_INFO1,  17028）.
// 协议号:17028
export class C17028 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17028 extends MessageBase{
  public PartnerNo:number;//将类编号
  public PartnerId:number;//武将唯一id
  public Lv:number;//武将等级
  public Name:string;//武将名字
  public Quality:number;//品质
  public Exp:number;//武将经验值
  public Hp:number;//武将血量
  public Mp:number;//魔法（法力）
  public PhyAtt:number;//物理攻击
  public PhyDef:number;//物理防御
  public MagAtt:number;//法术攻击
  public MagDef:number;//法术防御
  public ActSpeed:number;//出手速度
  public PhyComboAttProba:number;//物理连击率
  public StrikebackProba:number;//反击率
  public MagComboAttProba:number;//法术连击率
  public ResisHit:number;//封印抗性
  public ResisSeal:number;//封印抗性
  public AbsorbHpCoef:number;//吸血系数
   public item_1 : S17028_1[];
  public ActSpeedState:number;//宠物精炼属性（速度）在属性计算时的正负状态:0表示正，1表示负
  public NatureNo:number;//性格
  public HpLim:number;//武将血量上限
  public MpLim:number;//法力上限
  public Intimacy:number;//亲密度
  public IntimacyLv:number;//亲密度等级
  public EvolveLv:number;//进化等级
  public Cultivate:number;//修炼值
  public CultivateLv:number;//修炼等级
  public BaseGrow:number;//成长基础值
  public BaseHpAptitude:number;//生命资质基础值
  public BaseMagAptitude:number;//法力资质基础值
  public BasePhyAttAptitude:number;//物攻资质基础值
  public BaseMagAttAptitude:number;//法功资质基础值
  public BasePhyDefAptitude:number;//物防资质基础值
  public BaseMagDefAptitude:number;//法防资质基础值
  public BaseSpeedAptitude:number;//速度资质基础值
  public MaxPostnatalSkillSlot:number;//最大后天技能格数
  public Life:number;//当前寿命
  public BattlePower:number;//当前战斗力
  public MoodNo:number;//当前心情编号
  public Evolve:number;//进化值
  public Clothes:number;//画皮编号即衣服
  public Layer:number;//最后的修炼层数
  public Crit:number;//暴击几率
  public Ten:number;//暴击抗性
  public HealValue:number;//治疗强度
  public Str:number;//力量
  public Con:number;//体力
  public Sta:number;//耐力
  public Spi:number;//智力
  public Agi:number;//敏捷
  public FeerPoint:number;//分配点
  public SoaringLv:number;//飞升次数
   public item_2 : S17028_2[];
  public Do_phy_dam_scaling:number;//物理伤害
  public Do_mag_dam_scaling:number;//法术伤害
  public crit_coef:number;//暴击程度
  public Neglect_seal_resis:number;//忽视抗封
  public Neglect_phy_def:number;//忽视物理防御
  public Neglect_mag_def:number;//忽视法术防御
  public Revive_heal_coef:number;//复活治疗
  public Order:number;//支援排序值
   public item_3 : S17028_3[];
  public DianhuaLv:number;//点化等级
  public DianhuaExp:number;//点化层数
  public SpiritLv:number;//兽灵等级
  public SpiritExp:number;//兽灵层数
  public IllustrateLv:number;//图鉴等级
  public IllustrateExp:number;//图鉴层数
   public item_4 : S17028_4[];
   public item_5 : S17028_5[];
  public static DES : Array<any> =
     [
      ["PartnerNo",MessageBase.UINT32],
      ["PartnerId",MessageBase.UINT64],
      ["Lv",MessageBase.UINT16],
      ["Name",MessageBase.STRING],
      ["Quality",MessageBase.UINT8],
      ["Exp",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["PhyAtt",MessageBase.UINT32],
      ["PhyDef",MessageBase.UINT32],
      ["MagAtt",MessageBase.UINT32],
      ["MagDef",MessageBase.UINT32],
      ["ActSpeed",MessageBase.UINT32],
      ["PhyComboAttProba",MessageBase.UINT32],
      ["StrikebackProba",MessageBase.UINT32],
      ["MagComboAttProba",MessageBase.UINT32],
      ["ResisHit",MessageBase.UINT32],
      ["ResisSeal",MessageBase.UINT32],
      ["AbsorbHpCoef",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17028_1]],
      ["ActSpeedState",MessageBase.UINT32],
      ["NatureNo",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Intimacy",MessageBase.UINT32],
      ["IntimacyLv",MessageBase.UINT16],
      ["EvolveLv",MessageBase.UINT16],
      ["Cultivate",MessageBase.UINT32],
      ["CultivateLv",MessageBase.UINT16],
      ["BaseGrow",MessageBase.UINT32],
      ["BaseHpAptitude",MessageBase.UINT32],
      ["BaseMagAptitude",MessageBase.UINT32],
      ["BasePhyAttAptitude",MessageBase.UINT32],
      ["BaseMagAttAptitude",MessageBase.UINT32],
      ["BasePhyDefAptitude",MessageBase.UINT32],
      ["BaseMagDefAptitude",MessageBase.UINT32],
      ["BaseSpeedAptitude",MessageBase.UINT32],
      ["MaxPostnatalSkillSlot",MessageBase.UINT8],
      ["Life",MessageBase.UINT32],
      ["BattlePower",MessageBase.UINT32],
      ["MoodNo",MessageBase.UINT16],
      ["Evolve",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["Layer",MessageBase.UINT8],
      ["Crit",MessageBase.UINT16],
      ["Ten",MessageBase.UINT16],
      ["HealValue",MessageBase.UINT32],
      ["Str",MessageBase.UINT16],
      ["Con",MessageBase.UINT16],
      ["Sta",MessageBase.UINT16],
      ["Spi",MessageBase.UINT16],
      ["Agi",MessageBase.UINT16],
      ["FeerPoint",MessageBase.UINT16],
      ["SoaringLv",MessageBase.UINT16],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17028_2]],
      ["Do_phy_dam_scaling",MessageBase.UINT32],
      ["Do_mag_dam_scaling",MessageBase.UINT32],
      ["crit_coef",MessageBase.UINT32],
      ["Neglect_seal_resis",MessageBase.UINT32],
      ["Neglect_phy_def",MessageBase.UINT32],
      ["Neglect_mag_def",MessageBase.UINT32],
      ["Revive_heal_coef",MessageBase.UINT32],
      ["Order",MessageBase.UINT16],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S17028_3]],
      ["DianhuaLv",MessageBase.UINT16],
      ["DianhuaExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
      ["IllustrateLv",MessageBase.UINT16],
      ["IllustrateExp",MessageBase.UINT16],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S17028_4]],
        ["item_5",MessageBase.ARRAY,[MessageBase.CLASS,S17028_5]],

    ]
}
export class C17029_1 extends MessageBase{
}
export class S17029_1 extends MessageBase{
  public GoodsId:number;//物品id
  public GoodsNo:number;//物品类型id
  public EquipPos:number;//装备的位置
  public BindState:number;//绑定状态（见本文件开头的宏说明）
  public Quality:number;//品质（见本文件开头的宏说明）
  public StrenLv:number;//强化等级
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["EquipPos",MessageBase.UINT8],
      ["BindState",MessageBase.UINT8],
      ["Quality",MessageBase.UINT8],
      ["StrenLv",MessageBase.UINT8],

    ]
}
//------------ 获取宠物的装备面板信息 ------------------------
//-define（PT_PAR_GET_EQUIP_INFO,  17029）.
// 17029
export class C17029 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17029 extends MessageBase{
  public PartnerId:number;//
  public ParNo:number;//
  public Quality:number;//
  public Lv:number;//等级
  public EvolveLv:number;//进化等级
  public State:number;//休息or参战状态锁定or非锁定状态100//>休息非锁定101//>休息锁定110//>参战非锁定111//>参战锁定
  public Position:number;//是否主宠：1表示主宠
  public BattlePower:number;//战斗力
  public Name:string;//
  public CultivateLv:number;//最后的修炼等级
  public CultivateLayer:number;//最后的修炼层数
   public item_1 : S17029_1[];
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["ParNo",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["EvolveLv",MessageBase.UINT8],
      ["State",MessageBase.UINT8],
      ["Position",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
      ["CultivateLv",MessageBase.UINT16],
      ["CultivateLayer",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17029_1]],

    ]
}
//----------- 通知客户端：更新宠物的技能信息 ------------
//-define（PT_NOTIFY_PARTNER_SKILL_INFO_CHANGE,  17030）.
// 协议号：17030
export class C17030 extends MessageBase{
}
export class S17030 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public InfoType:number;//信息类型：1表示增加后天技能格子；2表示增加后天技能
  public SkillId:number;//技能id当InfoType=1时，此字段没用
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["InfoType",MessageBase.UINT8],
      ["SkillId",MessageBase.UINT32],

    ]
}
//----------------设置宠物为跟随状态-------------------------
//-define（PT_SET_PARTNER_FOLLOW_STATE, 17031）.
// 协议号:17003
export class C17031 extends MessageBase{
  public PartnerId:number;//
  public Follow:number;//1表示跟随0表示不跟随
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Follow",MessageBase.UINT8],

    ]
}
export class S17031 extends MessageBase{
  public PartnerId:number;//当前宠id
  public Follow:number;//1表示跟随0表示不跟随
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Follow",MessageBase.UINT8],

    ]
}
export class C17032_1 extends MessageBase{
    //被传递的女妖列表
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17032_1 extends MessageBase{
}
export class C17032_2 extends MessageBase{
}
export class S17032_2 extends MessageBase{
    //被传递的女妖列表
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
//------------------女妖传功-----------------------------------
//-define（PT_PAR_TRANSMIT, 17032）.
// 协议号:17032
export class C17032 extends MessageBase{
  public TargetParId:number;//传递目标女妖id
   public item_1 : C17032_1[];
  public static DES : Array<any> =
     [
      ["TargetParId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C17032_1]],

    ]
}
export class S17032 extends MessageBase{
  public TargetParId:number;//传递目标女妖id
   public item_2 : S17032_2[];
  public static DES : Array<any> =
     [
      ["TargetParId",MessageBase.UINT64],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17032_2]],

    ]
}
// -----------------领悟技能--------------------------
//-define（PT_PAR_ADD_SKILL, 17033）.
// 协议号:17033
export class C17033 extends MessageBase{
  public PartnerId:number;//
  public Type:number;//0初级驾奴糕\1中级驾奴糕\2高级驾奴糕\3顶级驾奴糕
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Type",MessageBase.UINT8],

    ]
}
export class S17033 extends MessageBase{
}
//返回 17011 通知技能数据发生变化
// 遗忘技能
//-define（PT_PAR_DEL_SKILL,  17036）.
// 协议号: 17036
export class C17036 extends MessageBase{
  public PartnerId:number;//
  public SkillId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["SkillId",MessageBase.UINT32],

    ]
}
export class S17036 extends MessageBase{
}
// -----------------学习技能,领悟技能和打书合并--------------------------
//-define（PT_PAR_LEARN_SKILL, 17041）.
// 协议号:17041
export class C17041 extends MessageBase{
  public PartnerId:number;//
  public GoodsId:number;//物品编号
    //-define（PT_PAR_ALLOT_FREE_TALENT_POINTS,17034）.
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S17041 extends MessageBase{
}
export class C17034_1 extends MessageBase{
  public TalentType:number;//天赋类型（1：力量，2：体质，3：耐力，4：灵力，5：敏捷）
  public AddPoints:number;//要加的点数
  public static DES : Array<any> =
     [
      ["TalentType",MessageBase.UINT8],
      ["AddPoints",MessageBase.UINT16],

    ]
}
export class S17034_1 extends MessageBase{
}
//-define（PT_PAR_ALLOT_FREE_TALENT_POINTS,  17034）.
// 协议号: 17034
export class C17034 extends MessageBase{
  public PartnerId:number;//
   public item_1 : C17034_1[];
    //-define（PT_PAR_RESET_FREE_TALENT_POINTS,17035）.
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C17034_1]],

    ]
}
export class S17034 extends MessageBase{
}
//-define（PT_PAR_RESET_FREE_TALENT_POINTS,  17035）.
// 协议号: 17035
export class C17035 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17035 extends MessageBase{
}
// 宠物融合
//-define（PT_PAR_MERGE,  17037）.
// 协议号: 17037
export class C17037 extends MessageBase{
  public PartnerIdA:number;//
  public PartnerIdB:number;//
  public Type:number;//
  public static DES : Array<any> =
     [
      ["PartnerIdA",MessageBase.UINT64],
      ["PartnerIdB",MessageBase.UINT64],
      ["Type",MessageBase.UINT16],

    ]
}
export class S17037 extends MessageBase{
  public Ret:number;//
  public PartnerIdA:number;//
  public PartnerIdB:number;//
  public static DES : Array<any> =
     [
      ["Ret",MessageBase.UINT8],
      ["PartnerIdA",MessageBase.UINT64],
      ["PartnerIdB",MessageBase.UINT64],

    ]
}
// 宠物飞升
//-define（PT_PARTNER_SOARING,  17039）.
// 协议号: 17039
export class C17039 extends MessageBase{
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17039 extends MessageBase{
  public Ret:number;//
  public PartnerId:number;//
  public SoaringLv:number;//
  public static DES : Array<any> =
     [
      ["Ret",MessageBase.UINT8],
      ["PartnerId",MessageBase.UINT64],
      ["SoaringLv",MessageBase.UINT16],

    ]
}
export class C17038_1 extends MessageBase{
}
export class S17038_1 extends MessageBase{
  public SkillType:number;//技能类别：1//先天；2//后天
  public SkillNo:number;//技能编号
  public SkillLv:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillType",MessageBase.UINT8],
      ["SkillNo",MessageBase.UINT32],
      ["SkillLv",MessageBase.UINT16],

    ]
}
export class C17038_2 extends MessageBase{
}
export class S17038_2 extends MessageBase{
  public Code:number;//精炼属性编号
  public Value:number;//精炼属性值
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT16],
      ["Value",MessageBase.UINT32],

    ]
}
export class C17038_3 extends MessageBase{
}
export class S17038_3 extends MessageBase{
    //亲密度属性选择
  public OICode:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public static DES : Array<any> =
     [
      ["OICode",MessageBase.UINT16],

    ]
}
// 获得宠物
//-define（PT_GET_PARTNER1, 17038）. 
// 协议号: 17038
export class C17038 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17038 extends MessageBase{
  public PartnerNo:number;//将类编号
  public PartnerId:number;//武将唯一id
  public Lv:number;//武将等级
  public Name:string;//武将名字
  public Quality:number;//品质
  public Exp:number;//武将经验值
  public Hp:number;//武将血量
  public Mp:number;//魔法（法力）
  public PhyAtt:number;//物理攻击
  public PhyDef:number;//物理防御
  public MagAtt:number;//法术攻击
  public MagDef:number;//法术防御
  public ActSpeed:number;//出手速度
  public PhyComboAttProba:number;//物理连击率
  public StrikebackProba:number;//反击率
  public MagComboAttProba:number;//法术连击率
  public ResisHit:number;//封印抗性
  public ResisSeal:number;//封印抗性
  public AbsorbHpCoef:number;//吸血系数
   public item_1 : S17038_1[];
  public ActSpeedState:number;//宠物精炼属性（速度）在属性计算时的正负状态:0表示正，1表示负
  public NatureNo:number;//性格
  public HpLim:number;//武将血量上限
  public MpLim:number;//法力上限
  public Intimacy:number;//亲密度
  public IntimacyLv:number;//亲密度等级
  public EvolveLv:number;//进化等级
  public Cultivate:number;//修炼值
  public CultivateLv:number;//修炼等级
  public BaseGrow:number;//成长基础值
  public BaseHpAptitude:number;//生命资质基础值
  public BaseMagAptitude:number;//法力资质基础值
  public BasePhyAttAptitude:number;//物攻资质基础值
  public BaseMagAttAptitude:number;//法功资质基础值
  public BasePhyDefAptitude:number;//物防资质基础值
  public BaseMagDefAptitude:number;//法防资质基础值
  public BaseSpeedAptitude:number;//速度资质基础值
  public MaxPostnatalSkillSlot:number;//最大后天技能格数
  public Life:number;//当前寿命
  public BattlePower:number;//当前战斗力
  public MoodNo:number;//当前心情编号
  public Evolve:number;//进化值
  public Clothes:number;//画皮编号即衣服
  public Layer:number;//最后的修炼层数
  public PhyCrit:number;//物理暴击几率
  public MagCrit:number;//法术暴击几率
  public PhyTen:number;//物理暴击抗性
  public MagTen:number;//法术暴击抗性
  public HealValue:number;//治疗强度
  public Str:number;//力量
  public Con:number;//体力
  public Sta:number;//耐力
  public Spi:number;//智力
  public Agi:number;//敏捷
  public FeerPoint:number;//分配点
  public SoaringLv:number;//飞升次数
   public item_2 : S17038_2[];
  public Do_phy_dam_scaling:number;//物理伤害
  public Do_mag_dam_scaling:number;//法术伤害
  public Phy_crit_coef:number;//物理暴击程度
  public Mag_crit_coef:number;//法术暴击程度
  public Neglect_seal_resis:number;//忽视抗封
  public Neglect_phy_def:number;//忽视物理防御
  public Neglect_mag_def:number;//忽视法术防御
  public Revive_heal_coef:number;//复活治疗
  public Order:number;//支援排序值
   public item_3 : S17038_3[];
  public DianhuaLv:number;//点化等级
  public DianhuaExp:number;//点化层数
  public SpiritLv:number;//兽灵等级
  public SpiritExp:number;//兽灵层数
  public IllustrateLv:number;//图鉴等级
  public IllustrateExp:number;//图鉴层数
  public static DES : Array<any> =
     [
      ["PartnerNo",MessageBase.UINT32],
      ["PartnerId",MessageBase.UINT64],
      ["Lv",MessageBase.UINT16],
      ["Name",MessageBase.STRING],
      ["Quality",MessageBase.UINT8],
      ["Exp",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["PhyAtt",MessageBase.UINT32],
      ["PhyDef",MessageBase.UINT32],
      ["MagAtt",MessageBase.UINT32],
      ["MagDef",MessageBase.UINT32],
      ["ActSpeed",MessageBase.UINT32],
      ["PhyComboAttProba",MessageBase.UINT32],
      ["StrikebackProba",MessageBase.UINT32],
      ["MagComboAttProba",MessageBase.UINT32],
      ["ResisHit",MessageBase.UINT32],
      ["ResisSeal",MessageBase.UINT32],
      ["AbsorbHpCoef",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17038_1]],
      ["ActSpeedState",MessageBase.UINT32],
      ["NatureNo",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Intimacy",MessageBase.UINT32],
      ["IntimacyLv",MessageBase.UINT16],
      ["EvolveLv",MessageBase.UINT16],
      ["Cultivate",MessageBase.UINT32],
      ["CultivateLv",MessageBase.UINT16],
      ["BaseGrow",MessageBase.UINT32],
      ["BaseHpAptitude",MessageBase.UINT32],
      ["BaseMagAptitude",MessageBase.UINT32],
      ["BasePhyAttAptitude",MessageBase.UINT32],
      ["BaseMagAttAptitude",MessageBase.UINT32],
      ["BasePhyDefAptitude",MessageBase.UINT32],
      ["BaseMagDefAptitude",MessageBase.UINT32],
      ["BaseSpeedAptitude",MessageBase.UINT32],
      ["MaxPostnatalSkillSlot",MessageBase.UINT8],
      ["Life",MessageBase.UINT32],
      ["BattlePower",MessageBase.UINT32],
      ["MoodNo",MessageBase.UINT16],
      ["Evolve",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["Layer",MessageBase.UINT8],
      ["PhyCrit",MessageBase.UINT16],
      ["MagCrit",MessageBase.UINT16],
      ["PhyTen",MessageBase.UINT16],
      ["MagTen",MessageBase.UINT16],
      ["HealValue",MessageBase.UINT32],
      ["Str",MessageBase.UINT16],
      ["Con",MessageBase.UINT16],
      ["Sta",MessageBase.UINT16],
      ["Spi",MessageBase.UINT16],
      ["Agi",MessageBase.UINT16],
      ["FeerPoint",MessageBase.UINT16],
      ["SoaringLv",MessageBase.UINT16],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17038_2]],
      ["Do_phy_dam_scaling",MessageBase.UINT32],
      ["Do_mag_dam_scaling",MessageBase.UINT32],
      ["Phy_crit_coef",MessageBase.UINT32],
      ["Mag_crit_coef",MessageBase.UINT32],
      ["Neglect_seal_resis",MessageBase.UINT32],
      ["Neglect_phy_def",MessageBase.UINT32],
      ["Neglect_mag_def",MessageBase.UINT32],
      ["Revive_heal_coef",MessageBase.UINT32],
      ["Order",MessageBase.UINT16],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S17038_3]],
      ["DianhuaLv",MessageBase.UINT16],
      ["DianhuaExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
      ["IllustrateLv",MessageBase.UINT16],
      ["IllustrateExp",MessageBase.UINT16],

    ]
}
// 宠物精炼（炼化）
//-define（PT_PAR_REFINE,  17040）.
// 协议号: 17037
export class C17040 extends MessageBase{
  public PartnerId:number;//
  public GoodsNo:number;//材料编号
  public AttrName:string;//属性名
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["AttrName",MessageBase.STRING],

    ]
}
export class S17040 extends MessageBase{
  public PartnerId:number;//
  public GoodsNo:number;//
  public AttrName:string;//
  public AddValue:number;//增加的值
  public classS17040
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["AttrName",MessageBase.STRING],
      ["AddValue",MessageBase.UINT32],

    ]
}
export class C17042_1 extends MessageBase{
}
export class S17042_1 extends MessageBase{
  public SkillType:number;//技能类别：1//先天；2//后天
  public SkillNo:number;//技能编号
  public SkillLv:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillType",MessageBase.UINT8],
      ["SkillNo",MessageBase.UINT32],
      ["SkillLv",MessageBase.UINT16],

    ]
}
export class C17042_2 extends MessageBase{
}
export class S17042_2 extends MessageBase{
  public Code:number;//精炼属性编号
  public Value:number;//精炼属性值
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT16],
      ["Value",MessageBase.UINT32],

    ]
}
export class C17042_3 extends MessageBase{
}
export class S17042_3 extends MessageBase{
    //亲密度属性选择
  public OICode:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public static DES : Array<any> =
     [
      ["OICode",MessageBase.UINT16],

    ]
}
//返回 17011 通知技能数据发生变化
//----------获取玩家自己的单个武将的属性信息 竞技模式-------
//-define（PT_GET_PARTNER_ATTR_INFO_SPORT,  17042）.
// 协议号:17042
export class C17042 extends MessageBase{
}
export class S17042 extends MessageBase{
  public PartnerNo:number;//将类编号
  public PartnerId:number;//武将唯一id
  public Lv:number;//武将等级
  public Name:string;//武将名字
  public Quality:number;//品质
  public Exp:number;//武将经验值
  public Hp:number;//武将血量
  public Mp:number;//魔法（法力）
  public PhyAtt:number;//物理攻击
  public PhyDef:number;//物理防御
  public MagAtt:number;//法术攻击
  public MagDef:number;//法术防御
  public ActSpeed:number;//出手速度
  public PhyComboAttProba:number;//物理连击率
  public StrikebackProba:number;//反击率
  public MagComboAttProba:number;//法术连击率
  public ResisHit:number;//封印抗性
  public ResisSeal:number;//封印抗性
   public item_1 : S17042_1[];
  public ActSpeedState:number;//宠物精炼属性（速度）在属性计算时的正负状态:0表示正，1表示负
  public NatureNo:number;//性格
  public HpLim:number;//武将血量上限
  public MpLim:number;//法力上限
  public Intimacy:number;//亲密度
  public IntimacyLv:number;//亲密度等级
  public EvolveLv:number;//进化等级
  public Cultivate:number;//修炼值
  public CultivateLv:number;//修炼等级
  public BaseGrow:number;//成长基础值
  public BaseHpAptitude:number;//生命资质基础值
  public BaseMagAptitude:number;//法力资质基础值
  public BasePhyAttAptitude:number;//物攻资质基础值
  public BaseMagAttAptitude:number;//法功资质基础值
  public BasePhyDefAptitude:number;//物防资质基础值
  public BaseMagDefAptitude:number;//法防资质基础值
  public BaseSpeedAptitude:number;//速度资质基础值
  public MaxPostnatalSkillSlot:number;//最大后天技能格数
  public Life:number;//当前寿命
  public BattlePower:number;//当前战斗力
  public MoodNo:number;//当前心情编号
  public Evolve:number;//进化值
  public Clothes:number;//画皮编号即衣服
  public Layer:number;//最后的修炼层数
  public PhyCrit:number;//物理暴击几率
  public MagCrit:number;//法术暴击几率
  public PhyTen:number;//物理暴击抗性
  public MagTen:number;//法术暴击抗性
  public HealValue:number;//治疗强度
  public Str:number;//力量
  public Con:number;//体力
  public Sta:number;//耐力
  public Spi:number;//智力
  public Agi:number;//敏捷
  public FeerPoint:number;//分配点
  public SoaringLv:number;//飞升次数
   public item_2 : S17042_2[];
  public Do_phy_dam_scaling:number;//物理伤害
  public Do_mag_dam_scaling:number;//法术伤害
  public Phy_crit_coef:number;//物理暴击程度
  public Mag_crit_coef:number;//法术暴击程度
  public Neglect_seal_resis:number;//忽视抗封
  public Neglect_phy_def:number;//忽视物理防御
  public Neglect_mag_def:number;//忽视法术防御
  public Revive_heal_coef:number;//复活治疗
  public Order:number;//支援排序值
   public item_3 : S17042_3[];
  public DianhuaLv:number;//点化等级
  public DianhuaExp:number;//点化层数
  public SpiritLv:number;//兽灵等级
  public SpiritExp:number;//兽灵层数
  public IllustrateLv:number;//图鉴等级
  public IllustrateExp:number;//图鉴层数
  public static DES : Array<any> =
     [
      ["PartnerNo",MessageBase.UINT32],
      ["PartnerId",MessageBase.UINT64],
      ["Lv",MessageBase.UINT16],
      ["Name",MessageBase.STRING],
      ["Quality",MessageBase.UINT8],
      ["Exp",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["PhyAtt",MessageBase.UINT32],
      ["PhyDef",MessageBase.UINT32],
      ["MagAtt",MessageBase.UINT32],
      ["MagDef",MessageBase.UINT32],
      ["ActSpeed",MessageBase.UINT32],
      ["PhyComboAttProba",MessageBase.UINT32],
      ["StrikebackProba",MessageBase.UINT32],
      ["MagComboAttProba",MessageBase.UINT32],
      ["ResisHit",MessageBase.UINT32],
      ["ResisSeal",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17042_1]],
      ["ActSpeedState",MessageBase.UINT32],
      ["NatureNo",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Intimacy",MessageBase.UINT32],
      ["IntimacyLv",MessageBase.UINT16],
      ["EvolveLv",MessageBase.UINT16],
      ["Cultivate",MessageBase.UINT32],
      ["CultivateLv",MessageBase.UINT16],
      ["BaseGrow",MessageBase.UINT32],
      ["BaseHpAptitude",MessageBase.UINT32],
      ["BaseMagAptitude",MessageBase.UINT32],
      ["BasePhyAttAptitude",MessageBase.UINT32],
      ["BaseMagAttAptitude",MessageBase.UINT32],
      ["BasePhyDefAptitude",MessageBase.UINT32],
      ["BaseMagDefAptitude",MessageBase.UINT32],
      ["BaseSpeedAptitude",MessageBase.UINT32],
      ["MaxPostnatalSkillSlot",MessageBase.UINT8],
      ["Life",MessageBase.UINT32],
      ["BattlePower",MessageBase.UINT32],
      ["MoodNo",MessageBase.UINT16],
      ["Evolve",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["Layer",MessageBase.UINT8],
      ["PhyCrit",MessageBase.UINT16],
      ["MagCrit",MessageBase.UINT16],
      ["PhyTen",MessageBase.UINT16],
      ["MagTen",MessageBase.UINT16],
      ["HealValue",MessageBase.UINT32],
      ["Str",MessageBase.UINT16],
      ["Con",MessageBase.UINT16],
      ["Sta",MessageBase.UINT16],
      ["Spi",MessageBase.UINT16],
      ["Agi",MessageBase.UINT16],
      ["FeerPoint",MessageBase.UINT16],
      ["SoaringLv",MessageBase.UINT16],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S17042_2]],
      ["Do_phy_dam_scaling",MessageBase.UINT32],
      ["Do_mag_dam_scaling",MessageBase.UINT32],
      ["Phy_crit_coef",MessageBase.UINT32],
      ["Mag_crit_coef",MessageBase.UINT32],
      ["Neglect_seal_resis",MessageBase.UINT32],
      ["Neglect_phy_def",MessageBase.UINT32],
      ["Neglect_mag_def",MessageBase.UINT32],
      ["Revive_heal_coef",MessageBase.UINT32],
      ["Order",MessageBase.UINT16],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S17042_3]],
      ["DianhuaLv",MessageBase.UINT16],
      ["DianhuaExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
      ["IllustrateLv",MessageBase.UINT16],
      ["IllustrateExp",MessageBase.UINT16],

    ]
}
export class C17043_1 extends MessageBase{
}
export class S17043_1 extends MessageBase{
  public Key:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT16],
      ["NewValue",MessageBase.UINT32],

    ]
}
//----------- 通知客户端：更新宠物的一个或多个信息 竞技模式 ------------
//-define（PT_NOTIFY_PARTNER_INFO_CHANGE_SPORT,  17043）.
// 协议号：17043
export class C17043 extends MessageBase{
}
export class S17043 extends MessageBase{
  public PartnerId:number;//武将唯一id
   public item_1 : S17043_1[];
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17043_1]],

    ]
}
// ---------------------------神技转换--------------------------------
//-define（PT_PAR_SKILL_CONVERT, 17044）.
// 协议号：17044
export class C17044 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public SkillNo:number;//神技编号
  public NewSkillNo:number;//新的神技编号
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["SkillNo",MessageBase.UINT32],
      ["NewSkillNo",MessageBase.UINT32],

    ]
}
export class S17044 extends MessageBase{
}
//返回PT_NOTIFY_PARTNER_INFO_CHANGE
//-------------------------精炼属性速度属性正负转换------------------------
//-define（PT_PAR_ACT_SPEED_CONVERT, 17045）.
// 协议号：17045
export class C17045 extends MessageBase{
  public PartnerId:number;//武将唯一id
  public State:number;//0表示正数，1表示负数
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["State",MessageBase.UINT8],

    ]
}
export class S17045 extends MessageBase{
}
//PT_GET_PARTNER_ATTR_INFO and PT_GET_PARTNER_ATTR_INFO_SPORT
//-------------------------宠物重生------------------------
//-define（PT_PARTNER_REBIRTH, 17046）.
// 协议号：17046
export class C17046 extends MessageBase{
  public PartnerId:number;//宠物唯一id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17046 extends MessageBase{
  public PartnerId:number;//宠物唯一id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class C17047_1 extends MessageBase{
}
export class S17047_1 extends MessageBase{
  public GoodsNo:number;//物品编号
  public Count:number;//使用个数
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT16],

    ]
}
//-------------------------宠物重生预览------------------------
//-define（PT_PARTNER_REBIRTH_PREVIEW, 17047）.
// 协议号：17047
export class C17047 extends MessageBase{
  public PartnerId:number;//宠物唯一id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S17047 extends MessageBase{
  public PartnerId:number;//宠物唯一id
   public item_1 : S17047_1[];
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S17047_1]],

    ]
}
//-------------------------宠物点化------------------------
//-define（PT_PARTNER_DIANHUA, 17048）.
// 协议号： 17048
export class C17048 extends MessageBase{
  public PartnerId:number;//宠物唯一id
  public Count:number;//点化次数
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S17048 extends MessageBase{
  public Code:number;//0成功/1失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
//-------------------------宠物兽灵------------------------
//-define（PT_PARTNER_SPIRIT, 17049）.
// 协议号： 17049
export class C17049 extends MessageBase{
  public PartnerId:number;//宠物唯一id
  public Count:number;//点化次数
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S17049 extends MessageBase{
  public Code:number;//0成功/1失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
//-------------------------宠物图鉴------------------------
//-define（PT_PARTNER_ILLUSTRATE, 17050）.
// 协议号： 17050
export class C17050 extends MessageBase{
  public PartnerId:number;//宠物唯一id
  public Count:number;//次数
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S17050 extends MessageBase{
  public Code:number;//0成功/1失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
//-------------------------宠物点化进阶------------------------
//-define（PT_PAR_DIANHUA_UPGRADE, 17051）.
// 协议号： 17051
export class C17051 extends MessageBase{
  public PartnerId:number;//宠物唯一id
  public SkillNo:number;//技能id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["SkillNo",MessageBase.UINT64],

    ]
}
export class S17051 extends MessageBase{
  public PartnerId:number;//宠物唯一id
  public SkillNo:number;//技能id
  public SkillLv:number;//技能id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],
      ["SkillNo",MessageBase.UINT64],
      ["SkillLv",MessageBase.UINT8],

    ]
}
