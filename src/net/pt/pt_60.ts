import { MessageBase } from "../../message/messageBase/MessageBase";
export class C60001_1 extends MessageBase{
}
export class S60001_1 extends MessageBase{
  public AttrCode:number;//属性类型
  public AttrValue:number;//属性值
  public static DES : Array<any> =
     [
      ["AttrCode",MessageBase.UINT16],
      ["AttrValue",MessageBase.UINT32],

    ]
}
export class C60001_2 extends MessageBase{
}
export class S60001_2 extends MessageBase{
  public Skins:number;//可幻化皮肤列表
  public static DES : Array<any> =
     [
      ["Skins",MessageBase.UINT16],

    ]
}
export class C60001_3 extends MessageBase{
}
export class S60001_3 extends MessageBase{
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
// =========================================================
// 60飞行器协议
// =========================================================
// 登录游戏后查询属性 或者属性变化时推送
//-define（PT_GET_AEROCRAFT_INFO, 60001）.
// 协议号： 66001
export class C60001 extends MessageBase{
}
export class S60001 extends MessageBase{
  public AerocraftNo:number;//星级
  public AerocraftExp:number;//当前经验
  public AerocraftLv:number;//等级
  public AerocraftSoaring:number;//飞升次数
  public TodayAddExp:number;//今日获得经验值
  public ShowNo:number;//当前的幻化坐骑
  public BattlePower:number;//战力
   public item_1 : S60001_1[];
   public item_2 : S60001_2[];
  public SpiritLv:number;//灵境等级
  public SpiritExp:number;//灵境经验
  public VariationLv:number;//变异等级
  public VariationExp:number;//变异经验
   public item_3 : S60001_3[];
  public static DES : Array<any> =
     [
      ["AerocraftNo",MessageBase.UINT32],
      ["AerocraftExp",MessageBase.UINT32],
      ["AerocraftLv",MessageBase.UINT32],
      ["AerocraftSoaring",MessageBase.UINT32],
      ["TodayAddExp",MessageBase.UINT32],
      ["ShowNo",MessageBase.UINT16],
      ["BattlePower",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S60001_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S60001_2]],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
      ["VariationLv",MessageBase.UINT16],
      ["VariationExp",MessageBase.UINT16],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S60001_3]],

    ]
}
// 升星 
// 有变化会额外返回66001
//-define（PT_STAR_AEROCRAFT, 60002）.
// 协议号： 66002
export class C60002 extends MessageBase{
}
export class S60002 extends MessageBase{
  public Code:number;//成功/失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 飞升 
// 有变化会额外返回66001
//-define（PT_SOARING_AEROCRAFT, 60003）.
// 协议号： 66003
export class C60003 extends MessageBase{
}
export class S60003 extends MessageBase{
  public Code:number;//成功/失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 喂养坐骑 
// 有变化会额外返回66001
//-define（PT_FEED_AEROCRAFT, 60004）.
// 协议号： 66004
export class C60004 extends MessageBase{
  public Count:number;//喂养次数
  public static DES : Array<any> =
     [
      ["Count",MessageBase.UINT32],

    ]
}
export class S60004 extends MessageBase{
  public Code:number;//成功/失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 幻化坐骑 使用后影响 场景中显示的飞行器造型影响AOI 可使用的编号为 小于等于 AerocraftNo的配置表所有编号 Code
//-define（PT_CHANGE_AEROCRAFT, 60005）.
// 协议号： 66005
export class C60005 extends MessageBase{
  public No:number;//坐骑编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S60005 extends MessageBase{
  public No:number;//幻化后的编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
//-------------------------飞行器灵境------------------------
//-define（PT_AEROCRAFT_SPIRIT, 60006）.
// 协议号： 60006
export class C60006 extends MessageBase{
  public Count:number;//次数
  public static DES : Array<any> =
     [
      ["Count",MessageBase.UINT16],

    ]
}
export class S60006 extends MessageBase{
  public Code:number;//0成功/1失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
//-------------------------飞行器变异------------------------
//-define（PT_AEROCRAFT_VARIATION, 60007）.
// 协议号： 60007
export class C60007 extends MessageBase{
  public Count:number;//次数
  public static DES : Array<any> =
     [
      ["Count",MessageBase.UINT16],

    ]
}
export class S60007 extends MessageBase{
  public Code:number;//0成功/1失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
//-------------------------飞行器变异进阶------------------------
//-define（PT_AEROCRAFT_VARIATION_UPGRADE, 60008）.
// 协议号： 60008
export class C60008 extends MessageBase{
  public SkillNo:number;//技能id
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT64],

    ]
}
export class S60008 extends MessageBase{
  public SkillNo:number;//技能id
  public SkillLv:number;//技能id
  public static DES : Array<any> =
     [
      ["SkillNo",MessageBase.UINT64],
      ["SkillLv",MessageBase.UINT8],

    ]
}
