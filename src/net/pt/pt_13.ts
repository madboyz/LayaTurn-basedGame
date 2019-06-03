import { MessageBase } from "../../message/messageBase/MessageBase";
export class C13001_1 extends MessageBase{
}
export class S13001_1 extends MessageBase{
    //当前buff列表
  public BuffNo:number;//
  public LeftTime:number;//buff剩余时间单位是秒
  public OpenState:number;//0//不开启1//开启
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["LeftTime",MessageBase.UINT32],
      ["OpenState",MessageBase.UINT8],

    ]
}
// 玩家信息相关协议
// Created: 2013.6.9
// @author: huangjf
// pt: 表示protocol，plyr: 表示player
//----------- 获取玩家自己的简要信息（角色进入游戏成功后，客户端通过发此协议来查询角色的简要信息） ------------
//-define（PT_PLYR_GET_MY_BRIEF,  13001）.
// 协议号：13001
export class C13001 extends MessageBase{
}
export class S13001 extends MessageBase{
  public SceneId:number;//所在场景唯一ID
  public SceneNo:number;//所在场景编号
  public X:number;//X坐标
  public Y:number;//Y坐标
  public Hp:number;//血量
  public HpLim:number;//血量上限
  public Mp:number;//魔法值
  public MpLim:number;//魔法值上限
  public Exp:number;//当前经验
  public ExpLim:number;//经验上限
  public Yuanbao:number;//元宝
  public BindYuanbao:number;//绑定的元宝
  public GameMoney:number;//游戏币
  public BindGameMoney:number;//绑定的游戏币
  public Feat:number;//功勋值
  public MoveSpeed:number;//移动速度
  public GuildName:string;//所属帮派的名字（如果没有加入帮派，则返回空字符串）
  public GraphTitle:number;//图片称号
  public TextTitle:number;//文字称号
  public UserDefTitle:string;//自定义称号
  public GraphTitleAttr:number;//图片称号属性
  public TextTitleAttr:number;//文字称号属性
  public BackWear:number;//背饰编号
  public Weapon:number;//武器编号
  public Headwear:number;//头饰编号
  public Clothes:number;//服饰编号
  public PartnerNo:number;//主宠物编号
  public ParWeapon:number;//主宠武器编号影响外形
  public EvolveLv:number;//宠物进化等级影响外形
  public CultivateLv:number;//主宠修炼等级
  public CultivateLayer:number;//主宠修炼层数
  public ParQuality:number;//主宠品质
  public ParClothes:number;//主宠画皮即衣服
   public item_1 : S13001_1[];
  public GuildContri:number;//当前帮派贡献度
  public PartnerName:string;//主宠物名字
  public CurBattleId:number;//当前的战斗id（如果不在战斗中，则返回0）
  public VipLv:number;//当前vip等级
  public Literary:number;//学分
  public IsLeader:number;//是否是队长1是0不是
  public TeamId:number;//队伍id，没有则为0
  public FPartnerNo:number;//跟随宠物编号
  public FParWeapon:number;//跟随武器编号
  public FParEvolveLv:number;//跟随进化等级
  public FParCultivateLv:number;//跟随修炼等级
  public FParCultivateLayer:number;//跟随修炼等级
  public FParQuality:number;//跟随品质
  public FParName:string;//跟随名字
  public FParClothes:number;//跟随画皮即衣服
  public PrivLv:number;//权限级别（0：普通玩家，1：指导员，2：GM）
  public GuildChiefId:number;//所在帮派帮主id，如果还没有加入帮派则为0
  public SpouseId:number;//配偶id（玩家id）
  public SpouseName:string;//配偶名字
  public FreeStrenCnt:number;//今天剩余免费强化装备次数
  public Contri:number;//玩家成就功绩值最大值
  public MagicKeyNo:number;//法宝编号
  public MountNo:number;//坐骑编号
  public MountStep:number;//坐骑阶数
  public Copper:number;//铜币
  public Vitality:number;//体力值
  public Chivalrous:number;//功德值
  public Popular:number;//人气值
  public Chip:number;//筹码
  public Soaring:number;//飞升次数
  public TransfigurationNo:number;//变身卡
  public GuildFeat:number;//巧匠值
  public PaodianType:number;//泡点类型
  public TransfigurationP:number;//变身卡点数
  public PayPoint:number;//充值积分
  public CurAchieve:number;//玩家当前剩余成就功绩值
  public TimeStamp:number;//unix时间戳
  public Credit:number;//信用
  public StoreExp:number;//存储经验
  public Love:number;//爱心值
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],
      ["SceneNo",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],
      ["Hp",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Exp",MessageBase.UINT32],
      ["ExpLim",MessageBase.UINT32],
      ["Yuanbao",MessageBase.UINT32],
      ["BindYuanbao",MessageBase.UINT32],
      ["GameMoney",MessageBase.UINT32],
      ["BindGameMoney",MessageBase.UINT32],
      ["Feat",MessageBase.UINT32],
      ["MoveSpeed",MessageBase.UINT16],
      ["GuildName",MessageBase.STRING],
      ["GraphTitle",MessageBase.UINT32],
      ["TextTitle",MessageBase.UINT32],
      ["UserDefTitle",MessageBase.STRING],
      ["GraphTitleAttr",MessageBase.UINT32],
      ["TextTitleAttr",MessageBase.UINT32],
      ["BackWear",MessageBase.UINT32],
      ["Weapon",MessageBase.UINT32],
      ["Headwear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["PartnerNo",MessageBase.UINT32],
      ["ParWeapon",MessageBase.UINT32],
      ["EvolveLv",MessageBase.UINT8],
      ["CultivateLv",MessageBase.UINT8],
      ["CultivateLayer",MessageBase.UINT8],
      ["ParQuality",MessageBase.UINT8],
      ["ParClothes",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13001_1]],
      ["GuildContri",MessageBase.UINT32],
      ["PartnerName",MessageBase.STRING],
      ["CurBattleId",MessageBase.UINT32],
      ["VipLv",MessageBase.UINT8],
      ["Literary",MessageBase.UINT32],
      ["IsLeader",MessageBase.UINT8],
      ["TeamId",MessageBase.UINT32],
      ["FPartnerNo",MessageBase.UINT32],
      ["FParWeapon",MessageBase.UINT32],
      ["FParEvolveLv",MessageBase.UINT8],
      ["FParCultivateLv",MessageBase.UINT8],
      ["FParCultivateLayer",MessageBase.UINT8],
      ["FParQuality",MessageBase.UINT8],
      ["FParName",MessageBase.STRING],
      ["FParClothes",MessageBase.UINT32],
      ["PrivLv",MessageBase.UINT8],
      ["GuildChiefId",MessageBase.UINT64],
      ["SpouseId",MessageBase.UINT64],
      ["SpouseName",MessageBase.STRING],
      ["FreeStrenCnt",MessageBase.UINT8],
      ["Contri",MessageBase.UINT32],
      ["MagicKeyNo",MessageBase.UINT32],
      ["MountNo",MessageBase.UINT32],
      ["MountStep",MessageBase.UINT8],
      ["Copper",MessageBase.UINT32],
      ["Vitality",MessageBase.UINT32],
      ["Chivalrous",MessageBase.UINT32],
      ["Popular",MessageBase.UINT32],
      ["Chip",MessageBase.UINT32],
      ["Soaring",MessageBase.UINT16],
      ["TransfigurationNo",MessageBase.UINT32],
      ["GuildFeat",MessageBase.UINT32],
      ["PaodianType",MessageBase.UINT32],
      ["TransfigurationP",MessageBase.UINT32],
      ["PayPoint",MessageBase.UINT32],
      ["CurAchieve",MessageBase.UINT32],
      ["TimeStamp",MessageBase.UINT32],
      ["Credit",MessageBase.UINT32],
      ["StoreExp",MessageBase.UINT64],
      ["Love",MessageBase.UINT32],

    ]
}
//----------- 获取指定玩家的信息详情（只支持获取在线的玩家） ------------
//-define（PT_PLYR_GET_INFO_DETAILS,  13002）.
// 协议号：13002
export class C13002 extends MessageBase{
  public PlayerId:number;//玩家id（如果玩家是查自己，则发自己的id）
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],

    ]
}
export class S13002 extends MessageBase{
  public PlayerId:number;//玩家id
  public Race:number;//种族
  public Faction:number;//门派
  public Sex:number;//性别
  public Lv:number;//等级
  public Exp:number;//当前经验
  public ExpLim:number;//经验上限
  public Hp:number;//血量
  public HpLim:number;//血量上限
  public Mp:number;//魔法值
  public MpLim:number;//魔法值上限
  public PhyAtt:number;//物理攻击
  public MagAtt:number;//法术攻击
  public PhyDef:number;//物理防御
  public MagDef:number;//法术防御
  public Hit:number;//命中
  public Dodge:number;//闪避
  public Crit:number;//暴击
  public Ten:number;//坚韧（抗暴击）
  public Anger:number;//怒气
  public AngerLim:number;//怒气上限
  public Luck:number;//幸运
  public ActSpeed:number;//战斗中的出手速度
  public MoveSpeed:number;//移动速度
  public Talent_Str:number;//力量（strength）
  public Talent_Con:number;//体质（constitution）
  public Talent_Sta:number;//耐力（stamina）
  public Talent_Spi:number;//灵力（spirit）
  public Talent_Agi:number;//敏捷（agility）
  public FreeTalentPoints:number;//自由（未分配的）天赋点数
  public BattlePower:number;//战斗力
  public GuildId:number;//帮派id，如果还没有加入帮派则为0
  public SealHit:number;//封印命中
  public SealResis:number;//封印抗性
  public Contri:number;//玩家成就功绩值
  public FrozenHit:number;//隔绝命中
  public FrozenResis:number;//隔绝抗性
  public ChaosHit:number;//混乱命中
  public ChaosResis:number;//混乱抗性
  public TranceHit:number;//昏睡命中
  public TranceResis:number;//昏睡抗性
  public PhyCrit:number;//物理暴击
  public PhyTen:number;//抗物理暴击
  public MagCrit:number;//法术暴击
  public MagTen:number;//抗法术暴击
  public PhyCritCoef:number;//物理暴击程度
  public MagCritCoef:number;//法术暴击程度
  public HealValue:number;//治疗强度
  public DO_PHY_DAM_SCALING:number;//物理伤害
  public DO_MAG_DAM_SCALING:number;//法术伤害
  public NEGLECT_SEAL_RESIS:number;//忽视抗封
  public NEGLECT_PHY_DEF:number;//忽视物理防御
  public NEGLECT_MAG_DEF:number;//忽视法术防御
  public REVIVE_HEAL_COEF:number;//复活治疗
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Exp",MessageBase.UINT32],
      ["ExpLim",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["PhyAtt",MessageBase.UINT32],
      ["MagAtt",MessageBase.UINT32],
      ["PhyDef",MessageBase.UINT32],
      ["MagDef",MessageBase.UINT32],
      ["Hit",MessageBase.UINT32],
      ["Dodge",MessageBase.UINT32],
      ["Crit",MessageBase.UINT32],
      ["Ten",MessageBase.UINT32],
      ["Anger",MessageBase.UINT32],
      ["AngerLim",MessageBase.UINT32],
      ["Luck",MessageBase.UINT32],
      ["ActSpeed",MessageBase.UINT32],
      ["MoveSpeed",MessageBase.UINT16],
      ["Talent_Str",MessageBase.UINT16],
      ["Talent_Con",MessageBase.UINT16],
      ["Talent_Sta",MessageBase.UINT16],
      ["Talent_Spi",MessageBase.UINT16],
      ["Talent_Agi",MessageBase.UINT16],
      ["FreeTalentPoints",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],
      ["GuildId",MessageBase.UINT64],
      ["SealHit",MessageBase.UINT32],
      ["SealResis",MessageBase.UINT32],
      ["Contri",MessageBase.UINT32],
      ["FrozenHit",MessageBase.UINT32],
      ["FrozenResis",MessageBase.UINT32],
      ["ChaosHit",MessageBase.UINT32],
      ["ChaosResis",MessageBase.UINT32],
      ["TranceHit",MessageBase.UINT32],
      ["TranceResis",MessageBase.UINT32],
      ["PhyCrit",MessageBase.UINT32],
      ["PhyTen",MessageBase.UINT32],
      ["MagCrit",MessageBase.UINT32],
      ["MagTen",MessageBase.UINT32],
      ["PhyCritCoef",MessageBase.UINT32],
      ["MagCritCoef",MessageBase.UINT32],
      ["HealValue",MessageBase.UINT32],
      ["DO_PHY_DAM_SCALING",MessageBase.UINT32],
      ["DO_MAG_DAM_SCALING",MessageBase.UINT32],
      ["NEGLECT_SEAL_RESIS",MessageBase.UINT32],
      ["NEGLECT_PHY_DEF",MessageBase.UINT32],
      ["NEGLECT_MAG_DEF",MessageBase.UINT32],
      ["REVIVE_HEAL_COEF",MessageBase.UINT32],

    ]
}
//----------- 获取指定玩家累积充值 ------------
//-define（PT_PLYR_GET_ACCUM_RECHARGE,  13003）.
// 协议号：13003
export class C13003 extends MessageBase{
  public type:number;//（1终生累计充值金额（目前是人民币）；3:累计充值额度6:银子7:所有银子8:金子9:所有金子14每日累计充值额度）
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],

    ]
}
export class S13003 extends MessageBase{
  public type:number;//
  public amount:number;//
  public static DES : Array<any> =
     [
      ["type",MessageBase.UINT8],
      ["amount",MessageBase.UINT32],

    ]
}
//----------- 设置玩家身份 ------------
//-define（PT_PLYR_SET_PRIV_LV,  13004）.
// 规定：数值越大，权限越高
//-define（PRIV_NOR_PLAYER, 0）.普通玩家
//-define（PRIV_INSTRUCTOR, 1）.指导员
//-define（PRIV_GM, 2）.GM
// 协议号：13004
export class C13004 extends MessageBase{
  public Lv:number;//
  public static DES : Array<any> =
     [
      ["Lv",MessageBase.UINT8],

    ]
}
export class S13004 extends MessageBase{
  public Lv:number;//
  public static DES : Array<any> =
     [
      ["Lv",MessageBase.UINT8],

    ]
}
export class C13008_1 extends MessageBase{
  public TalentType:number;//天赋类型（1体质2力量3敏捷4灵力5耐力）
  public AddPoints:number;//要加的点数
  public static DES : Array<any> =
     [
      ["TalentType",MessageBase.UINT8],
      ["AddPoints",MessageBase.UINT16],

    ]
}
export class S13008_1 extends MessageBase{
}
// ----------------- 分配自由天赋点（手动加天赋点） ---------------------------
//-define（PT_PLYR_ALLOT_FREE_TALENT_POINTS,  13008）.
// 协议号: 13008
export class C13008 extends MessageBase{
   public item_1 : C13008_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C13008_1]],

    ]
}
export class S13008 extends MessageBase{
  public RetCode:number;//0表示加点成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 洗点
//-define（PT_PLYR_RESET_FREE_TALENT_POINTS,  13112）.
// 协议号: 13112
export class C13112 extends MessageBase{
}
export class S13112 extends MessageBase{
  public RetCode:number;//0表示加点成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// -------------------------------------------------------------------------------
//
// 飞升分配执行
//-define（PT_SOARING,  13117）.
// 协议号: 13117
export class C13117 extends MessageBase{
}
export class S13117 extends MessageBase{
  public Code:number;//
  public SoaringLv:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],
      ["SoaringLv",MessageBase.UINT16],

    ]
}
// ----------------- 手动升级 ---------------------------
//-define（PT_PLYR_MANUAL_UPGRADE,  13009）.
// 协议号: 13009
export class C13009 extends MessageBase{
}
export class S13009 extends MessageBase{
}
//无
// ----------------- 通知客户端：玩家升级了 ---------------------------
//-define（PT_PLYR_NOTIFY_UPGRADE,  13010）.
// 协议号: 13010
export class C13010 extends MessageBase{
}
export class S13010 extends MessageBase{
  public PlayerId:number;//玩家id
  public NewLv:number;//最新等级
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["NewLv",MessageBase.UINT32],

    ]
}
//----------- 通知客户端：更新玩家的金钱信息 ------------
//-define（PT_PLYR_NOTIFY_MONEY_CHANGE,  13011）.
// 协议号：13011
export class C13011 extends MessageBase{
}
export class S13011 extends MessageBase{
  public MoneyType:number;//钱的类型（详见common.hrl中的宏MNY_T_XXX）
  public NewNum:number;//当前的新值
  public static DES : Array<any> =
     [
      ["MoneyType",MessageBase.UINT8],
      ["NewNum",MessageBase.UINT32],

    ]
}
export class C13012_1 extends MessageBase{
}
export class S13012_1 extends MessageBase{
  public Key:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT16],
      ["NewValue",MessageBase.UINT64],

    ]
}
//----------- 通知客户端：更新玩家的一个或多个信息 ------------
//-define（PT_PLYR_NOTIFY_INFO_CHANGE,  13012）.
// 协议号：13012
export class C13012 extends MessageBase{
}
export class S13012 extends MessageBase{
   public item_1 : S13012_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13012_1]],

    ]
}
//------------- 玩家加入门派 ---------------------------------
//-define（PT_PLYR_JOIN_FACTION, 13013）.
// 协议号：13013
export class C13013 extends MessageBase{
  public Faction:number;//
  public static DES : Array<any> =
     [
      ["Faction",MessageBase.UINT8],

    ]
}
export class S13013 extends MessageBase{
  public RetCode:number;//
  public Faction:number;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],

    ]
}
//------------- 玩家转换门派 ---------------------------------
//-define（PT_PLYR_TRANSFORM_FACTION, 13120）.
// 协议号：13120
export class C13120 extends MessageBase{
  public Faction:number;//
  public Sex:number;//
  public Race:number;//
  public static DES : Array<any> =
     [
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],

    ]
}
export class S13120 extends MessageBase{
  public RetCode:number;//
  public Faction:number;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],

    ]
}
//------------- 获取最后一次转换日期 ---------------------------------
//-define（PT_PLYR_GET_LAST_TRANSFORM_TIME, 13121）.
// 协议号：13121
export class C13121 extends MessageBase{
}
export class S13121 extends MessageBase{
  public LastTransformTime:number;//
  public static DES : Array<any> =
     [
      ["LastTransformTime",MessageBase.UINT32],

    ]
}
// -----------------玩家获得东西 包括（ 非装备 装备 等）发送提示给客户端 --------------------
//-define（PT_PLYR_NOTIFY_GAIN_ITEM, 13014）.
// 协议号：13014
export class C13014 extends MessageBase{
}
export class S13014 extends MessageBase{
  public Type:number;//获得的东西类型：1.装备...详见goods.hrl宏定义
  public Id:number;//如果是物品则表示物品唯一id
  public No:number;//编号
  public Count:number;//获得的数量
  public Delay:number;//1：收到后延迟提示（如在战斗中不提示），其他立即提示
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],
      ["Delay",MessageBase.UINT8],

    ]
}
//----------- 查询某个玩家是否在线 ------------
//-define（PT_PLYR_QUERY_OL_STATE,  13016）.
// 协议号：13016
export class C13016 extends MessageBase{
  public PlayerId:number;//玩家id（如果玩家是查自己，则发自己的id）
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],

    ]
}
export class S13016 extends MessageBase{
  public PlayerId:number;//
  public OLState:number;//0表示不在线，1表示在线
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["OLState",MessageBase.UINT8],

    ]
}
export class C13017_1 extends MessageBase{
}
export class S13017_1 extends MessageBase{
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
export class C13017_2 extends MessageBase{
}
export class S13017_2 extends MessageBase{
    //携带的女妖列表
  public PartnerId:number;//
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
//------------ 获取玩家的装备面板信息 ------------------------
//-define（PT_PLYR_GET_EQUIP_INFO,  13017）.
// 协议号：13017
export class C13017 extends MessageBase{
  public PlayerId:number;//唯一id
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],

    ]
}
export class S13017 extends MessageBase{
  public PlayerId:number;//武将唯一id
  public Lv:number;//等级
  public Race:number;//
  public Sex:number;//
  public Faction:number;//
  public BattlePower:number;//战斗力
  public Name:string;//
   public item_1 : S13017_1[];
   public item_2 : S13017_2[];
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Lv",MessageBase.UINT32],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13017_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S13017_2]],

    ]
}
// ----------------------获取玩家气血库与魔法库信息-----------------------
//-define（PT_PLYR_GET_STOR_HP_MP, 13018）.
// 协议号：13018
export class C13018 extends MessageBase{
}
export class S13018 extends MessageBase{
  public IsAutoAddHpMp:number;//玩家是否开启使用物品自动补给血库和魔法库1//是，0//否
  public StoreHp:number;//
  public StoreMp:number;//
  public StoreHpMpMax:number;//血和魔法包上限
  public IsAutoAddParHpMp:number;//玩家是否开启使用物品自动补给宠物血库和宠物魔法库1//是，0//否
  public StoreParHp:number;//
  public StoreParMp:number;//
  public StoreParHpMpMax:number;//宠物血和魔法包上限
  public static DES : Array<any> =
     [
      ["IsAutoAddHpMp",MessageBase.UINT8],
      ["StoreHp",MessageBase.UINT32],
      ["StoreMp",MessageBase.UINT32],
      ["StoreHpMpMax",MessageBase.UINT32],
      ["IsAutoAddParHpMp",MessageBase.UINT8],
      ["StoreParHp",MessageBase.UINT32],
      ["StoreParMp",MessageBase.UINT32],
      ["StoreParHpMpMax",MessageBase.UINT32],

    ]
}
// ---------------------- 设置自动补血补蓝 -----------------------
//-define（PT_PLYR_SET_AUTO_ADD_HP_MP_STATE, 13019）.
// 协议号：13019
export class C13019 extends MessageBase{
  public Type:number;//1//>设置玩家的2//>设置玩家宠物用的
  public State:number;//是否开启使用物品自动补给血库和魔法库1//是，0//否
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["State",MessageBase.UINT8],

    ]
}
export class S13019 extends MessageBase{
  public Type:number;//1//>设置玩家的2//>设置玩家宠物用的
  public State:number;//是否开启使用物品自动补给血库和魔法库1//是，0//否
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["State",MessageBase.UINT8],

    ]
}
// 通知客户端buff的变化：新增 删除 时间变化等
//-define（PT_PLYR_BUFF_CHANGE, 13020）.
// 协议号：13020
export class C13020 extends MessageBase{
}
export class S13020 extends MessageBase{
  public BuffNo:number;//
  public LeftTime:number;//buff剩余时间单位是秒当为0的时候，客户端自动把这个buff删除
  public OpenState:number;//0//不开启1//开启
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["LeftTime",MessageBase.UINT32],
      ["OpenState",MessageBase.UINT8],

    ]
}
// 玩家设置buff状态：开启与关闭
//-define（PT_PLYR_SET_BUFF_STATE, 13021）.
// 协议号：13021
export class C13021 extends MessageBase{
  public BuffNo:number;//
  public OpenState:number;//0//不开启1//开启
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["OpenState",MessageBase.UINT8],

    ]
}
export class S13021 extends MessageBase{
  public RetCode:number;//0//成功
  public BuffNo:number;//
  public OpenState:number;//0//不开启1//开启
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["BuffNo",MessageBase.UINT32],
      ["OpenState",MessageBase.UINT8],

    ]
}
// 购买buff（激活，续费）
//-define（PT_PLYR_BUY_BUFF, 13033）.
// 协议号：13033
export class C13033 extends MessageBase{
  public BuffNo:number;//
  public Day:number;//
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["Day",MessageBase.UINT8],

    ]
}
export class S13033 extends MessageBase{
}
//如购买成功，返回：PT_PLYR_BUFF_CHANGE
// ---------------------- 设置是否允许被请求担任队长 -----------------------
//-define（PT_PLYR_SET_CAN_BE_LEADER_STATE, 13022）.
// 协议号：13022
export class C13022 extends MessageBase{
  public State:number;//是否允许被请求担任队长0//允许，1//不允许
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
export class S13022 extends MessageBase{
  public State:number;//是否允许被请求担任队长0//允许，1//不允许
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
// ---------------------- 设置是否接收加入队伍邀请 -----------------------
//-define（PT_PLYR_SET_TEAM_INVITE_STATE, 13023）.
// 协议号：13023
export class C13023 extends MessageBase{
  public State:number;//是否接收加入队伍邀请0//接收，1//不接收
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
export class S13023 extends MessageBase{
  public State:number;//是否接收加入队伍邀请0//接收，1//不接收
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
// ---------------------- 设置是否接收加为好友请求 -----------------------
//-define（PT_PLYR_SET_RELA_STATE, 13024）.
// 协议号：13024
export class C13024 extends MessageBase{
  public State:number;//是否接收加为好友请求0//接收，1//不接收
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
export class S13024 extends MessageBase{
  public State:number;//是否接收加为好友请求0//接收，1//不接收
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
export class C13025_1 extends MessageBase{
}
export class S13025_1 extends MessageBase{
  public Type:number;//1->被请求担任队长设置；2->是否接收加入队伍邀请3->是否接收加为好友请求4->是否接受pk邀请5->女妖画皮6->角色面具，7->角色时装，8->角色背饰
  public SetState:number;//0//允许，1//不允许或0//接收，1//不接收0->展示，1不展示
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["SetState",MessageBase.UINT8],

    ]
}
// -----------------------获取玩家的系统设置-----------------
//-define（PT_PLYR_GET_SYS_SET, 13025）.
// 协议号：13025
export class C13025 extends MessageBase{
}
export class S13025 extends MessageBase{
   public item_1 : S13025_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13025_1]],

    ]
}
// ---------------------- 设置是否接受pk邀请 -----------------------
//-define（PT_PLYR_SET_ACCEPT_PK_STATE, 13026）.
// 协议号：13024
export class C13026 extends MessageBase{
  public State:number;//是否接受pk邀请0//接收，1//不接收
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
export class S13026 extends MessageBase{
  public State:number;//是否接受pk邀请0//接收，1//不接收
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
// ---------------------- 设置玩家或女妖某些部位是否显示在场景中 -----------------------
//-define（PT_PLYR_SET_SHOWING_EQUIP, 13027）.
// 协议号：13027
export class C13027 extends MessageBase{
  public Type:number;//5->女妖画皮6->角色面具，7->角色时装，8->角色背饰
  public State:number;//是否展示0//展示，1//不展示
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["State",MessageBase.UINT8],

    ]
}
export class S13027 extends MessageBase{
  public Type:number;//5->女妖画皮6->角色面具，7->角色时装，8->角色背饰
  public State:number;//是否展示0//展示，1//不展示
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["State",MessageBase.UINT8],

    ]
}
// ---------------------- 设置泡点方式 -----------------------
//-define（PT_PLYR_SET_PAODIAN_TYPE, 13028）.
// 协议号：13028
export class C13028 extends MessageBase{
  public State:number;//0//普通1-N泡点方式
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT32],

    ]
}
export class S13028 extends MessageBase{
  public State:number;//0//普通1-N泡点方式
    //-define（PT_PLYR_GET_PAODIAN_TYPE,13029）.
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT32],

    ]
}
//-define（PT_PLYR_GET_PAODIAN_TYPE, 13029）.
// 协议号：13029 返回13028
export class C13029 extends MessageBase{
  public State:number;//0//普通1-N泡点方式
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
export class S13029 extends MessageBase{
}
export class C13030_1 extends MessageBase{
}
export class S13030_1 extends MessageBase{
  public titleID:number;//称号ID
  public expireTime:number;//过期时间戳，0表示不会过期
  public static DES : Array<any> =
     [
      ["titleID",MessageBase.UINT32],
      ["expireTime",MessageBase.UINT32],

    ]
}
export class C13030_2 extends MessageBase{
}
export class S13030_2 extends MessageBase{
  public id:number;//ID
  public titleName:string;//自定义称号
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],
      ["titleName",MessageBase.STRING],

    ]
}
// ---------------------- 自己拥有的所有称号列表 -----------------------
//-define（PT_PLYR_ALL_TITLE, 13030）.
// 协议号：13030
export class C13030 extends MessageBase{
}
export class S13030 extends MessageBase{
   public item_1 : S13030_1[];
   public item_2 : S13030_2[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13030_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S13030_2]],

    ]
}
// ---------------------- 使用称号 -----------------------
//-define（PT_PLYR_USE_TITLE, 13031）.
// 协议号：13031
export class C13031 extends MessageBase{
  public Type:number;//类型：1称号显示0称号属性2同时显示和使用属性
  public Num:number;//
  public Pos:number;//位置1、2（称号显示时无用，属性时表示是1、2最多带个属性）
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["Num",MessageBase.UINT32],
      ["Pos",MessageBase.UINT8],

    ]
}
export class S13031 extends MessageBase{
}
// ---------------------- 不使用称号 -----------------------
//-define（PT_PLYR_NO_USE_TITLE, 13032）.
// 协议号：13032
export class C13032 extends MessageBase{
  public Type:number;//类型：1称号显示0称号属性
  public Num:number;//
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["Num",MessageBase.UINT32],

    ]
}
export class S13032 extends MessageBase{
}
// 服务端主动推送
//-define（PT_PLYR_SYNC_TITLE, 13034）.
// 协议号：13034
export class C13034 extends MessageBase{
}
export class S13034 extends MessageBase{
  public SyncType:number;//1新增，0删除
  public TitleID:number;//称号ID，配置表
  public expireTime:number;//过期时间戳，0表示不会过期
  public static DES : Array<any> =
     [
      ["SyncType",MessageBase.UINT8],
      ["TitleID",MessageBase.UINT32],
      ["expireTime",MessageBase.UINT32],

    ]
}
export class C13035_1 extends MessageBase{
}
export class S13035_1 extends MessageBase{
    //所有阵法列表
  public Matrix:number;//
  public static DES : Array<any> =
     [
      ["Matrix",MessageBase.UINT32],

    ]
}
//--------------------玩家获得自己已学习的阵法列表--------------------------
//-define（PT_PLYR_ALL_ZF, 13035）.
// 协议号: 13035
export class C13035 extends MessageBase{
}
export class S13035 extends MessageBase{
   public item_1 : S13035_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13035_1]],

    ]
}
//--------------------玩家学习阵法--------------------------
//-define（PT_PLYR_LEARN_ZF, 13036）.
// 协议号: 13036
export class C13036 extends MessageBase{
  public No:number;//阵法编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S13036 extends MessageBase{
  public Code:number;//成功返回0，否则，直接发送失败提示消息
  public No:number;//阵法编号
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],
      ["No",MessageBase.UINT32],

    ]
}
//　经脉，心法 相关协议 （13041~13044 旧版）
// -------------------------------------------------------------------------------
// 兑换经脉分配点
//-define（PT_PLYR_JINGMAI_EXCHANGE,  13041）.
// 协议号: 13041
export class C13041 extends MessageBase{
}
export class S13041 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 经脉分配点洗点
//-define（PT_PLYR_RESET_JINGMAI_POINT,  13042）.
// 协议号: 13042
export class C13042 extends MessageBase{
}
export class S13042 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
export class C13043_1 extends MessageBase{
}
export class S13043_1 extends MessageBase{
  public JingMaiClass:number;//经脉类别
  public Point:number;//经脉已加点数
  public static DES : Array<any> =
     [
      ["JingMaiClass",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
// 经脉分配查询
//-define（PT_PLYR_GET_JINGMAI,  13043）.
// 协议号: 13043
export class C13043 extends MessageBase{
}
export class S13043 extends MessageBase{
  public CurMaxPoint:number;//当前已经兑换最大点数
  public LeftPoint:number;//剩余可分配点
   public item_1 : S13043_1[];
  public static DES : Array<any> =
     [
      ["CurMaxPoint",MessageBase.UINT16],
      ["LeftPoint",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13043_1]],

    ]
}
export class C13044_1 extends MessageBase{
  public JingMaiClass:number;//经脉类别
  public Point:number;//经脉增加点数
  public static DES : Array<any> =
     [
      ["JingMaiClass",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
export class S13044_1 extends MessageBase{
}
// 经脉分配执行
//-define（PT_PLYR_SET_JINGMAI,  13044）.
// 协议号: 13116
export class C13044 extends MessageBase{
   public item_1 : C13044_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C13044_1]],

    ]
}
export class S13044 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 打通经脉
//-define（PT_PLYR_OPEN_JINGMAI,  13045）.
// 协议号: 13045
export class C13045 extends MessageBase{
  public No:number;//配置表编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S13045 extends MessageBase{
  public No:number;//配置表编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
// 查询经脉
//-define（PT_PLYR_QRY_JINGMAI,  13046）.
// 协议号: 13046
export class C13046 extends MessageBase{
}
export class S13046 extends MessageBase{
  public No:number;//配置表编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
// 查询心法
//-define（PT_PLYR_QRY_XINFA,  13047）.
// 协议号: 13047
export class C13047 extends MessageBase{
}
export class S13047 extends MessageBase{
  public No:number;//配置表编号
  public CurExp:number;//当前经验
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["CurExp",MessageBase.UINT32],

    ]
}
// 升级一次
//-define（PT_PLYR_UPGRADE_XINFA,  13048）.
// 协议号: 13048
export class C13048 extends MessageBase{
}
export class S13048 extends MessageBase{
  public No:number;//配置表编号
  public CurExp:number;//当前经验
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["CurExp",MessageBase.UINT32],

    ]
}
//　经脉，心法相关协议 结束（）
// ----------------- 每日签到 -----------------------
//-define（PT_PLYR_SIGN_IN, 13050）.
// 协议号：13050
export class C13050 extends MessageBase{
}
export class S13050 extends MessageBase{
  public RetCode:number;//如果签到成功，则返回0，否则，直接发送失败提示消息
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// ----------------- 查询本月的每日签到以及奖励领取情况 -----------------------
//-define（PT_PLYR_GET_SIGN_IN_INFO, 13051）.
// 协议号：13051
export class C13051 extends MessageBase{
}
export class S13051 extends MessageBase{
  public SignInfo:number;//整数的低31位（二进制位），分别对应本月的签到情况，1表示当天有签到，0表示当天没有签到，从右边算起
  public RewardInfo:number;//整数的低31位（二进制位），分别对应本月签到n次的奖励情况，右边算起第n位是1表示签到n次的奖励已经领取，0表示还没有领取
  public static DES : Array<any> =
     [
      ["SignInfo",MessageBase.UINT32],
      ["RewardInfo",MessageBase.UINT32],

    ]
}
// ----------------- 领取每日签到的奖励 -----------------------
//-define（PT_PLYR_ASK_FOR_SIGN_IN_REWARD, 13052）.
// 协议号：13052
export class C13052 extends MessageBase{
  public No:number;//奖励编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S13052 extends MessageBase{
  public RetCode:number;//领取成功则返回0，否则，直接发送失败提示消息
  public No:number;//已经领取的奖励编号
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["No",MessageBase.UINT32],

    ]
}
// ----------------- 查询当前的在线奖励情况 -----------------------
//-define（PT_PLYR_GET_ONLINE_REWARD_INFO, 13053）.
// 协议号：13053
export class C13053 extends MessageBase{
}
export class S13053 extends MessageBase{
  public CurNo:number;//当前奖励编号可能是可以领取的，也可能是还不能领取的，客户端根据上次领取时间，判断是否可以领取了
  public LastGetTime:number;//今天上次领取在线奖励时间，如果当天还没有领取过在线奖励，则该时间为0
  public LastLogoutTime:number;//上次下线时间
  public static DES : Array<any> =
     [
      ["CurNo",MessageBase.UINT32],
      ["LastGetTime",MessageBase.UINT32],
      ["LastLogoutTime",MessageBase.UINT32],

    ]
}
// ----------------- 领取当前的在线奖励 -----------------------
//-define（PT_PLYR_GET_ONLINE_REWARD, 13054）.
// 协议号：13054
export class C13054 extends MessageBase{
  public CurNo:number;//当前可以领取的奖励编号
  public static DES : Array<any> =
     [
      ["CurNo",MessageBase.UINT32],

    ]
}
export class S13054 extends MessageBase{
  public RetCode:number;//领取成功则返回0，否则，直接发送失败提示消息
  public NextNo:number;//相对于刚领取的奖励，下一个奖励编号可能是可以领取的，也可能是还不能领取的，客户端根据上次领取时间，判断是否可以领取了
  public LastGetTime:number;//今天上次领取在线奖励时间，如果当天还没有领取过在线奖励，则该时间为0
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["NextNo",MessageBase.UINT32],
      ["LastGetTime",MessageBase.UINT32],

    ]
}
// ----------------- 查询当前的7天礼包奖励情况 -----------------------
//-define（PT_PLYR_GET_SEVEN_DAY_REWARD_INFO, 13055）.
// 协议号：13055
export class C13055 extends MessageBase{
}
export class S13055 extends MessageBase{
  public AccLoginDay:number;//累计登陆天数
  public SevenDayReward:number;//整数的低7位（二进制位），对应创号8天礼包的领取情况，0表示还没有领取，1表示已经领取
  public static DES : Array<any> =
     [
      ["AccLoginDay",MessageBase.UINT8],
      ["SevenDayReward",MessageBase.UINT16],

    ]
}
// ----------------- 领取当前的7天登陆奖励 -----------------------
//-define（PT_PLYR_GET_SEVEN_DAY_REWARD, 13056）.
// 协议号：13056
export class C13056 extends MessageBase{
  public CurNo:number;//当前奖励编号
  public static DES : Array<any> =
     [
      ["CurNo",MessageBase.UINT32],

    ]
}
export class S13056 extends MessageBase{
  public RetCode:number;//领取成功则返回0，否则，直接发送失败提示消息
  public SevenDayReward:number;//整数的低7位（二进制位），对应创号8天礼包的领取情况，0表示还没有领取，1表示已经领取
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["SevenDayReward",MessageBase.UINT16],

    ]
}
export class C13057_1 extends MessageBase{
}
export class S13057_1 extends MessageBase{
  public No:number;//奖励编号
  public Left:number;//剩余次数
  public IsReward:number;//领取状态1领取0未领取
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Left",MessageBase.UINT32],
      ["IsReward",MessageBase.UINT8],

    ]
}
// --------------- 查询当前的等级奖励情况 ---------------------
//-define（PT_PLYR_GET_LV_REWARD_INFO, 13057）.
// 协议号：13057
export class C13057 extends MessageBase{
}
export class S13057 extends MessageBase{
   public item_1 : S13057_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13057_1]],

    ]
}
// ----------------- 领取等级奖励 -----------------------
//-define（PT_PLYR_GET_LV_REWARD, 13058）.
// 协议号：13058
export class C13058 extends MessageBase{
  public No:number;//成功领取的等级奖励编号如果领取不成功则通过998返回
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],

    ]
}
export class S13058 extends MessageBase{
  public No:number;//成功领取的等级奖励编号如果领取不成功则通过998返回
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],

    ]
}
// ----------------- 领取初始奖励 -----------------------
//-define（PT_PLYR_GET_START_REWARD, 13059）.
// 协议号：13056
export class C13059 extends MessageBase{
  public No:number;//奖励编号
  public IsGet:number;//操作状态（1领取，0查询）
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["IsGet",MessageBase.UINT8],

    ]
}
export class S13059 extends MessageBase{
  public RetCode:number;//领取成功或查询到未领取则返回0，已领取过了则返回1
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C13060_1 extends MessageBase{
}
export class S13060_1 extends MessageBase{
  public GoodsId:number;//
  public GoodsNo:number;//
  public GoodsNum:number;//
  public GoodsQua:number;//
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsNum",MessageBase.UINT32],
      ["GoodsQua",MessageBase.UINT8],

    ]
}
//=========================
//玩家战斗反馈发送客户端的相关信息
//-define（PT_PLYR_NOTIFY_BTL_FEEDBACK, 13060）.
//协议号：13060
export class C13060 extends MessageBase{
}
export class S13060 extends MessageBase{
  public WinState:number;//0表示失败，1表示成功
  public MonId:number;//所打明雷怪的id，如果不是打明雷怪，则为0
  public MonLeftCanBeKilledTimes:number;//明雷怪的剩余可被杀死次数，如果不是打明雷怪，则固定返回0
   public item_1 : S13060_1[];
  public static DES : Array<any> =
     [
      ["WinState",MessageBase.UINT8],
      ["MonId",MessageBase.UINT32],
      ["MonLeftCanBeKilledTimes",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13060_1]],

    ]
}
export class C13070_1 extends MessageBase{
}
export class S13070_1 extends MessageBase{
  public SysCode:number;//系统代号（详见如下说明）
  public RewardState:number;//1表示已经领取，其他未领取
  public static DES : Array<any> =
     [
      ["SysCode",MessageBase.UINT8],
      ["RewardState",MessageBase.UINT8],

    ]
}
// --------------- 查询自身的已开放的系统列表 ---------------------
//-define（PT_PLYR_QRY_MY_OPENED_SYS_LIST, 13070）.
// 协议号：13070
export class C13070 extends MessageBase{
}
export class S13070 extends MessageBase{
   public item_1 : S13070_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13070_1]],

    ]
}
// ----------------- 通知客户端：新系统开放 -----------------------
//-define（PT_PLYR_NOTIFY_NEW_SYS_OPEN, 13071）.
// 协议号：13071
export class C13071 extends MessageBase{
}
export class S13071 extends MessageBase{
  public SysCode:number;//系统代号（详见如下说明）
  public static DES : Array<any> =
     [
      ["SysCode",MessageBase.UINT16],

    ]
}
// --------------- 领取已开放的系统奖励 ---------------------
//-define（PT_PLYR_GET_OPENED_SYS_REWARD, 13072）.
// 协议号：13072
export class C13072 extends MessageBase{
  public SysCode:number;//系统代号（详见如下说明）
  public static DES : Array<any> =
     [
      ["SysCode",MessageBase.UINT16],

    ]
}
export class S13072 extends MessageBase{
  public SysCode:number;//系统代号（详见如下说明）
  public static DES : Array<any> =
     [
      ["SysCode",MessageBase.UINT16],

    ]
}
// -------------查询新手引导信息------------------
//-define（PT_PLYR_GUIDANCE_INFO, 13075）.
// 协议号：13075
export class C13075 extends MessageBase{
}
export class S13075 extends MessageBase{
  public No:number;//编号
  public State:number;//状态
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],
      ["State",MessageBase.UINT8],

    ]
}
// -------------设置新手引导信息------------------
//-define（PT_PLYR_GUIDANCE_SET, 13076）.
// 协议号：13076
export class C13076 extends MessageBase{
  public No:number;//编号
  public State:number;//状态
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],
      ["State",MessageBase.UINT8],

    ]
}
export class S13076 extends MessageBase{
  public No:number;//编号
  public State:number;//状态
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],
      ["State",MessageBase.UINT8],

    ]
}
// ----------------- 通知客户端：VIP信息 -----------------------
//-define（PT_PLYR_NOTIFY_VIP, 13081）.
// 协议号：13081
export class C13081 extends MessageBase{
}
export class S13081 extends MessageBase{
  public VipLv:number;//VIP等级
  public VipExp:number;//VIP经验
  public static DES : Array<any> =
     [
      ["VipLv",MessageBase.UINT8],
      ["VipExp",MessageBase.UINT32],

    ]
}
// ----------------- 激活VIP-----------------------
//-define（PT_PLYR_VIP_ACTIVED, 13082）.
// 协议号：13082
export class C13082 extends MessageBase{
}
export class S13082 extends MessageBase{
  public VipLv:number;//VIP等级
  public static DES : Array<any> =
     [
      ["VipLv",MessageBase.UINT8],

    ]
}
// ----------------- 体验VIP-----------------------
//-define（PT_PLYR_VIP_EXPERIENCE, 13083）.
// 协议号：13082
export class C13083 extends MessageBase{
}
export class S13083 extends MessageBase{
  public State:number;//0=结束，1=开启
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
// ----------------- 请求离线挂机状态 -----------------------
//-define（PT_PLYR_OFFLINE_AWARD_INFO, 13090）.
// 协议号：13090
export class C13090 extends MessageBase{
}
export class S13090 extends MessageBase{
}
//只发协议号
// ----------------- 开始离线挂机 -----------------------
//-define（PT_PLYR_OFFLINE_AWARD_BEGIN, 13091）.
// 协议号：13091
export class C13091 extends MessageBase{
}
export class S13091 extends MessageBase{
}
//只发协议号
// ----------------- 结束离线挂机 -----------------------
//-define（PT_PLYR_OFFLINE_AWARD_END, 13092）.
// 协议号：13092
export class C13092 extends MessageBase{
}
export class S13092 extends MessageBase{
}
export class C13093_1 extends MessageBase{
}
export class S13093_1 extends MessageBase{
  public GoodsNo:number;//物品编号
  public Count:number;//数量
  public Quality:number;//品质
  public BindState:number;//绑定状态
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["BindState",MessageBase.UINT8],

    ]
}
//只发协议号
// ----------------- 离线挂机状态 -----------------------
//-define（PT_PLYR_OFFLINE_AWARD_STATE, 13093）.
// 协议号：13093
export class C13093 extends MessageBase{
}
export class S13093 extends MessageBase{
  public State:number;//1=离线挂机中
  public Second:number;//离线挂机时长（秒）
  public Exp:number;//获得经验
  public Money:number;//获得银币
   public item_1 : S13093_1[];
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],
      ["Second",MessageBase.UINT32],
      ["Exp",MessageBase.UINT32],
      ["Money",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13093_1]],

    ]
}
// ----------------- 领取月卡每天返利 -----------------------
//-define（PT_PLYR_GET_MONTH_CARD_REWARD, 13094）.
// 协议号：13094
export class C13094 extends MessageBase{
  public No:number;//商品编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S13094 extends MessageBase{
  public No:number;//商品编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class C13095_1 extends MessageBase{
}
export class S13095_1 extends MessageBase{
  public No:number;//充值编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],

    ]
}
export class C13095_2 extends MessageBase{
}
export class S13095_2 extends MessageBase{
  public No:number;//月卡编号
  public state:number;//是否显示（0:否1:是）
  public days:number;//剩余天数
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],
      ["state",MessageBase.UINT8],
      ["days",MessageBase.UINT16],

    ]
}
// ----------------- 充值各档次首充状态 -----------------------
//-define（PT_PLYR_RECHARGE_STATE, 13095）.
// 协议号：13095
export class C13095 extends MessageBase{
}
export class S13095 extends MessageBase{
   public item_1 : S13095_1[];
   public item_2 : S13095_2[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13095_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S13095_2]],

    ]
}
// ----------------- 领取首充礼包状态 -----------------------
//-define（PT_PLYR_RECHARGE_REWARD_STATE, 13096）.
// 协议号：13096
export class C13096 extends MessageBase{
}
export class S13096 extends MessageBase{
  public State:number;//0->不可领取1->可领取2->已领取
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
// ----------------- 领取首充礼包 -----------------------
//-define（PT_PLYR_RECHARGE_REWARD, 13097）.
// 协议号：13097
export class C13097 extends MessageBase{
}
export class S13097 extends MessageBase{
}
export class C13098_1 extends MessageBase{
}
export class S13098_1 extends MessageBase{
  public No:number;//月卡编号
  public Bought:number;//是否已经购买（0:否1:是）
  public Rewarded:number;//今天是否已经领取过奖励（0:否1:是）
  public ExpiredTime:number;//过期时间戳（没有购买则为0或一个小于当前时间戳的正数）
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Bought",MessageBase.UINT8],
      ["Rewarded",MessageBase.UINT8],
      ["ExpiredTime",MessageBase.UINT32],

    ]
}
// ----------------- 月卡状态-----------------------
//-define（PT_PLYR_MONTH_CARD_STATE, 13098）.
// 协议号：13098
export class C13098 extends MessageBase{
}
export class S13098 extends MessageBase{
   public item_1 : S13098_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13098_1]],

    ]
}
// ----------------- 报名参加巡游活动 -----------------------
//-define（PT_PLYR_REQ_JOIN_CRUISE, 13100）.
// 协议号：13100
export class C13100 extends MessageBase{
}
export class S13100 extends MessageBase{
  public RetCode:number;//如果报名成功则返回0，否则不返回，而是直接发送失败提示消息协议
  public DiffTime:number;//距离开始巡游的时间（单位：秒）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["DiffTime",MessageBase.UINT16],

    ]
}
// ----------------- 中断巡游活动 -----------------------
//-define（PT_PLYR_STOP_CRUISE, 13101）.
// 协议号：13101
export class C13101 extends MessageBase{
}
export class S13101 extends MessageBase{
  public RetCode:number;//如果中断成功则返回0，否则不返回，而是直接发送失败提示消息协议
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// ----------------- 通知客户端：巡游结束（到终点了） -----------------------
//-define（PT_PLYR_NOTIFY_CRUISE_FINISH, 13102）.
// 协议号：13102
export class C13102 extends MessageBase{
}
export class S13102 extends MessageBase{
}
//无
// ----------------- 通知客户端：巡游事件触发了 -----------------------
//-define（PT_PLYR_NOTIFY_CRUISE_EVENT_TRIGGERED, 13103）.
// 协议号：13103
export class C13103 extends MessageBase{
}
export class S13103 extends MessageBase{
  public NpcId:number;//Npc的id
  public EventNo:number;//事件编号
  public QuestionNo:number;//题目编号（如果不是互动答题事件，则固定返回0）
  public X:number;//触发事件地点的X坐标
  public Y:number;//触发事件地点的Y坐标
  public static DES : Array<any> =
     [
      ["NpcId",MessageBase.UINT32],
      ["EventNo",MessageBase.UINT16],
      ["QuestionNo",MessageBase.UINT16],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],

    ]
}
// ----------------- 客户端通知服务端：巡游活动互动答题的结果 -----------------------
//-define（PT_PLYR_C2S_NOTIFY_CRUISE_QUIZ_RES, 13104）.
// 协议号：13104
export class C13104 extends MessageBase{
  public Result:number;//1表示回答正确，0表示回答错误
  public static DES : Array<any> =
     [
      ["Result",MessageBase.UINT8],

    ]
}
export class S13104 extends MessageBase{
}
// ----------------- 客户端通知服务端：剧情播放状态 -----------------------
//-define（PT_PLYR_C2S_LOG_PLOT, 13110）.
// 协议号：13110
export class C13110 extends MessageBase{
  public state:number;//0->跳过剧情，1->完整看剧情
  public static DES : Array<any> =
     [
      ["state",MessageBase.UINT8],

    ]
}
export class S13110 extends MessageBase{
}
export class C13118_1 extends MessageBase{
}
export class S13118_1 extends MessageBase{
  public TransfigurationNo:number;//变身编号
  public LeftPoint:number;//变身卡剩余点数
  public InUse:number;//是否正在使用中，1是，其他否
  public static DES : Array<any> =
     [
      ["TransfigurationNo",MessageBase.UINT32],
      ["LeftPoint",MessageBase.UINT32],
      ["InUse",MessageBase.UINT8],

    ]
}
// ----------------- 变身信息同步，（玩家登陆自己请求 | 发生变化时服务器推送） -----------------------
//-define（PT_PLYR_TRANSFIGURATION, 13118）.
// 13118
export class C13118 extends MessageBase{
}
export class S13118 extends MessageBase{
   public item_1 : S13118_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13118_1]],

    ]
}
// ----------------- 取消变身 -----------------------
//-define（PT_PLYR_TRANSFIGURATION_CANCEL, 13124）.
export class C13124 extends MessageBase{
  public TransfigurationNo:number;//变身编号
  public static DES : Array<any> =
     [
      ["TransfigurationNo",MessageBase.UINT32],

    ]
}
export class S13124 extends MessageBase{
  public TransfigurationNo:number;//变身编号
  public static DES : Array<any> =
     [
      ["TransfigurationNo",MessageBase.UINT32],

    ]
}
// ----------------- 使用变身卡 -----------------------
//-define（PT_PLYR_TRANSFIGURATION_USE, 13200）.
// 13200
export class C13200 extends MessageBase{
  public TransfigurationNo:number;//变身编号
  public static DES : Array<any> =
     [
      ["TransfigurationNo",MessageBase.UINT32],

    ]
}
export class S13200 extends MessageBase{
  public TransfigurationNo:number;//变身编号
  public static DES : Array<any> =
     [
      ["TransfigurationNo",MessageBase.UINT32],

    ]
}
export class C13119_1 extends MessageBase{
}
export class S13119_1 extends MessageBase{
  public SkillID:number;//按数组顺序分别表示n飞的技能
  public static DES : Array<any> =
     [
      ["SkillID",MessageBase.UINT32],

    ]
}
// 查询飞升的强化信息
//-define（PT_SOARING_INFO,  13119）.
// 协议号: 13119
export class C13119 extends MessageBase{
}
export class S13119 extends MessageBase{
   public item_1 : S13119_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13119_1]],

    ]
}
// 重置飞升的强化信息
//-define（PT_WASH_SOARING_INFO,  13122）.
// 协议号: 13122
export class C13122 extends MessageBase{
}
export class S13122 extends MessageBase{
  public code:number;//成功失败（0成功1当前没有加点2系统错误3没有足够的钱）
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
export class C13123_1 extends MessageBase{
  public No:number;//配置编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S13123_1 extends MessageBase{
}
// 设置飞升信息
//-define（PT_SET_SOARING_INFO,  13123）.
// 协议号: 13123
export class C13123 extends MessageBase{
   public item_1 : C13123_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C13123_1]],

    ]
}
export class S13123 extends MessageBase{
  public Code:number;//
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 查询下载奖励的领取状态
//-define（PT_GET_DOWNLOAD_REWARD_STATE,  13126）.
// 协议号: 13126
export class C13126 extends MessageBase{
}
export class S13126 extends MessageBase{
  public State:number;//
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
// 领取下载奖励的领取状态
//-define（PT_GET_DOWNLOAD_REWARD,  13125）.
// 协议号: 13125
export class C13125 extends MessageBase{
}
export class S13125 extends MessageBase{
  public State:number;//
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
// ----------------- 获取世界等级相关信息 -----------------------
//-define（PT_GET_SERVER_MAX_LV, 13127）.
// 协议号：13127
export class C13127 extends MessageBase{
}
export class S13127 extends MessageBase{
  public lv:number;//当前服务器最高等级
  public static DES : Array<any> =
     [
      ["lv",MessageBase.UINT16],

    ]
}
export class C13128_1 extends MessageBase{
}
export class S13128_1 extends MessageBase{
  public Lv:number;//等级
  public State:number;//是否已经领取过奖励（0:否1:是）
  public static DES : Array<any> =
     [
      ["Lv",MessageBase.UINT16],
      ["State",MessageBase.UINT8],

    ]
}
// 投资计划相关协议
// ----------------- 获取投资计划信息 -----------------------
//-define（PT_GET_INVESTMENT_PLAN_STATE, 13128）.
// 协议号：13128
export class C13128 extends MessageBase{
}
export class S13128 extends MessageBase{
  public Bought:number;//是否已经购买（0:否1:是）
   public item_1 : S13128_1[];
  public static DES : Array<any> =
     [
      ["Bought",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13128_1]],

    ]
}
// ----------------- 领取投资计划返利 -----------------------
//-define（PT_GET_INVESTMENT_PLAN_REWARD, 13129）.
// 协议号：13129
export class C13129 extends MessageBase{
  public Lv:number;//等级编号
  public static DES : Array<any> =
     [
      ["Lv",MessageBase.UINT16],

    ]
}
export class S13129 extends MessageBase{
  public Lv:number;//等级编号
  public static DES : Array<any> =
     [
      ["Lv",MessageBase.UINT16],

    ]
}
export class C13130_1 extends MessageBase{
}
export class S13130_1 extends MessageBase{
  public No:number;//编号
  public State:number;//是否已经领取过奖励（0:否1:是）
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],
      ["State",MessageBase.UINT8],

    ]
}
// 充值礼包常驻活动相关协议
// ----------------- 获取充值信息 -----------------------
//-define（PT_GET_RECHARGE_BAG_STATE, 13130）.
// 协议号：13130
export class C13130 extends MessageBase{
}
export class S13130 extends MessageBase{
  public RechargeAcc:number;//累计充值人民币
   public item_1 : S13130_1[];
  public static DES : Array<any> =
     [
      ["RechargeAcc",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13130_1]],

    ]
}
// ----------------- 领取充值礼包 -----------------------
//-define（PT_GET_RECHARGE_BAG_REWARD, 13131）.
// 协议号：13131
export class C13131 extends MessageBase{
  public No:number;//编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],

    ]
}
export class S13131 extends MessageBase{
  public No:number;//编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],

    ]
}
//　巅峰点相关协议 （13141~13160）
// -------------------------------------------------------------------------------
// 经验注入，进度满则自动兑换，且清空当前注入的经验
//-define（PT_PLYR_PEAK_EXP_ADD,  13141）.
// 协议号: 13141
export class C13141 extends MessageBase{
  public Exp:number;//
  public static DES : Array<any> =
     [
      ["Exp",MessageBase.UINT64],

    ]
}
export class S13141 extends MessageBase{
  public CurExp:number;//当前已经注入经验
  public LeftPoint:number;//剩余可分配点
  public static DES : Array<any> =
     [
      ["CurExp",MessageBase.UINT64],
      ["LeftPoint",MessageBase.UINT16],

    ]
}
// 巅峰分配点洗点
//-define（PT_PLYR_RESET_PEAK_POINT,  13142）.
// 协议号: 13142
export class C13142 extends MessageBase{
}
export class S13142 extends MessageBase{
  public LeftPoint:number;//剩余可分配点
  public static DES : Array<any> =
     [
      ["LeftPoint",MessageBase.UINT16],

    ]
}
export class C13143_1 extends MessageBase{
}
export class S13143_1 extends MessageBase{
  public No:number;//属性编号
  public Point:number;//已加点数
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
// 巅峰点分配查询
//-define（PT_PLYR_SYNC_PEAK,  13143）.
// 协议号: 13143
export class C13143 extends MessageBase{
}
export class S13143 extends MessageBase{
  public LeftPoint:number;//剩余可分配点
  public CurExp:number;//当前已经注入经验
   public item_1 : S13143_1[];
  public static DES : Array<any> =
     [
      ["LeftPoint",MessageBase.UINT16],
      ["CurExp",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13143_1]],

    ]
}
export class C13144_1 extends MessageBase{
  public No:number;//属性编号
  public Point:number;//已加点数
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
export class S13144_1 extends MessageBase{
}
// 巅峰点分配执行
//-define（PT_PLYR_SET_PEAK,  13144）.
// 协议号: 13144
export class C13144 extends MessageBase{
   public item_1 : C13144_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C13144_1]],

    ]
}
export class S13144 extends MessageBase{
  public Code:number;//0表示成功
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 套装属性选择
//-define（PT_PLYR_SUIT_PLAN,  13145）.
// 协议号: 13145
export class C13145 extends MessageBase{
  public Plan:number;//方案（1-6）
  public static DES : Array<any> =
     [
      ["Plan",MessageBase.UINT8],

    ]
}
export class S13145 extends MessageBase{
  public Plan:number;//方案（1-6）
  public static DES : Array<any> =
     [
      ["Plan",MessageBase.UINT8],

    ]
}
//　巅峰点相关协议 结束
// -------------------------------------------------------------------------------
//　竞技世界相关协议 start（13161~）
// 重置
//-define（PT_PLYR_RESET_ALLOT_ATTRS,  13161）.
// 协议号: 13161
export class C13161 extends MessageBase{
  public No:number;//方案N
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],

    ]
}
export class S13161 extends MessageBase{
}
export class C13162_1 extends MessageBase{
}
export class S13162_1 extends MessageBase{
  public No:number;//属性编号
  public Val:number;//属性值
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Val",MessageBase.UINT32],

    ]
}
//返回PT_PLYR_SYNC_ALLOT_ATTRS协议
// 战力分配查询
//-define（PT_PLYR_SYNC_ALLOT_ATTRS,  13162）.
// 协议号: 13162
export class C13162 extends MessageBase{
  public No:number;//方案N
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],

    ]
}
export class S13162 extends MessageBase{
  public No:number;//方案N
  public LeftBp:number;//剩余可分配战力
   public item_1 : S13162_1[];
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["LeftBp",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13162_1]],

    ]
}
export class C13163_1 extends MessageBase{
  public No:number;//属性编号
  public Val:number;//属性值
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Val",MessageBase.UINT32],

    ]
}
export class S13163_1 extends MessageBase{
}
export class C13163_2 extends MessageBase{
}
export class S13163_2 extends MessageBase{
  public No:number;//属性编号
  public Val:number;//属性值
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Val",MessageBase.UINT32],

    ]
}
// 战力分配执行
//-define（PT_PLYR_ALLOT_ATTRS,  13163）.
// 协议号: 13163
export class C13163 extends MessageBase{
  public No:number;//方案N
   public item_1 : C13163_1[];
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C13163_1]],

    ]
}
export class S13163 extends MessageBase{
  public No:number;//方案N
  public LeftBp:number;//剩余可分配战力
   public item_2 : S13163_2[];
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["LeftBp",MessageBase.UINT32],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S13163_2]],

    ]
}
// 使用战力分配属性方案
//-define（PT_PLYR_ALLOT_ATTRS_USE,  13164）.
export class C13164 extends MessageBase{
  public No:number;//方案N
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],

    ]
}
export class S13164 extends MessageBase{
  public No:number;//方案N
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],

    ]
}
// 查询（同步）使用战力分配属性方案
//-define（PT_SYNC_ALLOT_ATTRS_USE,  13165）.
export class C13165 extends MessageBase{
}
export class S13165 extends MessageBase{
  public No:number;//方案N
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],

    ]
}
export class C13166_1 extends MessageBase{
}
export class S13166_1 extends MessageBase{
  public Key:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public Value:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT16],
      ["Value",MessageBase.UINT32],

    ]
}
//----------- 同步竞技属性 ------------
//-define（PT_SYNC_SPORT_ATTRS,  13166）.
// 协议号：13166
export class C13166 extends MessageBase{
}
export class S13166 extends MessageBase{
   public item_1 : S13166_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13166_1]],

    ]
}
export class C13300_1 extends MessageBase{
}
export class S13300_1 extends MessageBase{
  public FashionID:number;//ID
  public ExpireTime:number;//过期时间戳，0表示不会过期
  public static DES : Array<any> =
     [
      ["FashionID",MessageBase.UINT32],
      ["ExpireTime",MessageBase.UINT32],

    ]
}
//　竞技世界相关协议 end （13161~）
// ------------时装协议-------------------------
// ---------------------- 自己拥有的所有时装列表 -----------------------
//-define（PT_PLYR_ALL_FASHION, 13300）.
// 协议号：13300
export class C13300 extends MessageBase{
}
export class S13300 extends MessageBase{
  public UsingFashion:number;//正在使用的时装
   public item_1 : S13300_1[];
  public static DES : Array<any> =
     [
      ["UsingFashion",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S13300_1]],

    ]
}
// ---------------------- 使用、停用时装 -----------------------
//-define（PT_PLYR_FASHION_CTL, 13301）.
// 协议号：13301
export class C13301 extends MessageBase{
  public id:number;//为0表示取消使用当前在显示的时装
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],

    ]
}
export class S13301 extends MessageBase{
  public id:number;//
  public static DES : Array<any> =
     [
      ["id",MessageBase.UINT32],

    ]
}
// 服务端主动推送
//-define（PT_PLYR_SYNC_FASHION, 13302）.
// 协议号：13302
export class C13302 extends MessageBase{
}
export class S13302 extends MessageBase{
  public SyncType:number;//1新增，0删除
  public FashionID:number;//ID，配置表
  public ExpireTime:number;//新增时表示，过期时间戳，0表示不会过期，删除时无用
  public static DES : Array<any> =
     [
      ["SyncType",MessageBase.UINT8],
      ["FashionID",MessageBase.UINT32],
      ["ExpireTime",MessageBase.UINT32],

    ]
}
