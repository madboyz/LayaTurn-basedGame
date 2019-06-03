import { MessageBase } from "../../message/messageBase/MessageBase";
export class C37001_1 extends MessageBase{
}
export class S37001_1 extends MessageBase{
    //已分配天赋点
  public No:number;//属性编号（对应配置表）
  public Point:number;//已加点数
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
export class C37001_2 extends MessageBase{
}
export class S37001_2 extends MessageBase{
    //各种需要显示的属性
  public Key:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT16],
      ["NewValue",MessageBase.UINT32],

    ]
}
export class C37001_3 extends MessageBase{
}
export class S37001_3 extends MessageBase{
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
export class C37001_4 extends MessageBase{
}
export class S37001_4 extends MessageBase{
  public HoleNo:number;//孔的编号
  public Id:number;//妖丹唯一id
  public No:number;//妖丹编号
  public Lv:number;//妖丹等级
  public TotalExp:number;//总经验
  public static DES : Array<any> =
     [
      ["HoleNo",MessageBase.UINT64],
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT16],
      ["TotalExp",MessageBase.UINT32],

    ]
}
//-------------------------------------------------------------------
// @author Administrator
// @copyright （C） 2018, <COMPANY>
// @doc
//
// @end
// Created : 28. 六月 2018 14:33
//-------------------------------------------------------------------
//-author（"weson"）.
//--------通知获得伙伴 -------------
//-define（PT_COMRADE_ADD, 37001）.
// 协议号:37001
export class C37001 extends MessageBase{
  public No:number;//编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S37001 extends MessageBase{
  public Id:number;//唯一id
  public No:number;//编号
  public StarLv:number;//星级
  public StarSoul:number;//星魂
  public TalentPoint:number;//可分配天赋点
   public item_1 : S37001_1[];
   public item_2 : S37001_2[];
  public BreakLv:number;//突破等级
  public BreakExp:number;//突破经验
  public SpiritLv:number;//元神等级
  public SpiritExp:number;//元神经验
   public item_3 : S37001_3[];
   public item_4 : S37001_4[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["StarLv",MessageBase.UINT8],
      ["StarSoul",MessageBase.UINT32],
      ["TalentPoint",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37001_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S37001_2]],
      ["BreakLv",MessageBase.UINT16],
      ["BreakExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S37001_3]],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S37001_4]],

    ]
}
//--------启动阵容 -------------
//-define（PT_COMRADE_USE_LINEUP, 37002）.
// 协议号:37002
export class C37002 extends MessageBase{
  public Id:number;//唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT8],

    ]
}
export class S37002 extends MessageBase{
  public Id:number;//唯一id
    //-define（PT_COMRADE_STAR_UP,37003）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT8],

    ]
}
//-define（PT_COMRADE_STAR_UP, 37003）.
// 协议号:37003
export class C37003 extends MessageBase{
  public Id:number;//唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S37003 extends MessageBase{
  public Id:number;//唯一id
  public StarLv:number;//星级
  public StarSoul:number;//星魂
    //-define（PT_COMRADE_TALENTS_CONVERT,37004）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["StarLv",MessageBase.UINT8],
      ["StarSoul",MessageBase.UINT32],

    ]
}
//-define（PT_COMRADE_TALENTS_CONVERT, 37004）.
// 协议号:37004
export class C37004 extends MessageBase{
  public Id:number;//唯一id
  public Point:number;//点数
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Point",MessageBase.UINT32],

    ]
}
export class S37004 extends MessageBase{
  public Id:number;//唯一id
  public CurPoint:number;//可用点数
    //-define（PT_COMRADE_TALENTS_RESET,37005）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["CurPoint",MessageBase.UINT32],

    ]
}
//-define（PT_COMRADE_TALENTS_RESET, 37005）.
// 协议号:37005
export class C37005 extends MessageBase{
  public Id:number;//唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S37005 extends MessageBase{
  public Id:number;//唯一id
  public CurPoint:number;//可用点数
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["CurPoint",MessageBase.UINT32],

    ]
}
export class C37006_1 extends MessageBase{
  public No:number;//属性编号
  public Point:number;//已加点数
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
export class S37006_1 extends MessageBase{
}
export class C37006_2 extends MessageBase{
}
export class S37006_2 extends MessageBase{
  public No:number;//属性编号
  public Point:number;//已加点数
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
// 天赋点分配执行
//-define（PT_COMRADE_TALENTS_ALLOCATE,  37006）.
// 协议号: 37006
export class C37006 extends MessageBase{
  public Id:number;//唯一id
   public item_1 : C37006_1[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C37006_1]],

    ]
}
export class S37006 extends MessageBase{
  public CurPoint:number;//剩余可用点数
  public Id:number;//唯一id
   public item_2 : S37006_2[];
  public static DES : Array<any> =
     [
      ["CurPoint",MessageBase.UINT32],
      ["Id",MessageBase.UINT64],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S37006_2]],

    ]
}
export class C37007_1_1 extends MessageBase{
}
export class S37007_1_1 extends MessageBase{
    //已分配天赋点
  public No:number;//属性编号（对应配置表）
  public Point:number;//已加点数
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
export class C37007_1_2 extends MessageBase{
}
export class S37007_1_2 extends MessageBase{
    //各种需要显示的属性
  public Key:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT16],
      ["NewValue",MessageBase.UINT32],

    ]
}
export class C37007_1_3 extends MessageBase{
}
export class S37007_1_3 extends MessageBase{
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
export class C37007_1_4 extends MessageBase{
}
export class S37007_1_4 extends MessageBase{
  public HoleNo:number;//孔的编号
  public Id:number;//妖丹唯一id
  public No:number;//妖丹编号
  public Lv:number;//妖丹等级
  public TotalExp:number;//总经验
  public static DES : Array<any> =
     [
      ["HoleNo",MessageBase.UINT64],
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT16],
      ["TotalExp",MessageBase.UINT32],

    ]
}
export class C37007_1 extends MessageBase{
}
export class S37007_1 extends MessageBase{
  public Id:number;//唯一id
  public No:number;//编号
  public StarLv:number;//星级
  public StarSoul:number;//星魂
  public TalentPoint:number;//可分配天赋点
   public item_1 : S37007_1_1[];
   public item_2 : S37007_1_2[];
  public BreakLv:number;//突破等级
  public BreakExp:number;//突破经验
  public SpiritLv:number;//元神等级
  public SpiritExp:number;//元神经验
   public item_3 : S37007_1_3[];
   public item_4 : S37007_1_4[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["StarLv",MessageBase.UINT8],
      ["StarSoul",MessageBase.UINT32],
      ["TalentPoint",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37007_1_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S37007_1_2]],
      ["BreakLv",MessageBase.UINT16],
      ["BreakExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S37007_1_3]],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S37007_1_4]],

    ]
}
//--------请求已经获得的伙伴 -------------
//-define（PT_GET_COMRADE_LIST, 37007）.
// 协议号:37007
export class C37007 extends MessageBase{
}
export class S37007 extends MessageBase{
   public item_1 : S37007_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37007_1]],

    ]
}
export class C37008_1 extends MessageBase{
  public ObjNo:number;//玩家/伙伴编号，玩家编号统一为0
  public Pos:number;//位置1到5
  public static DES : Array<any> =
     [
      ["ObjNo",MessageBase.UINT32],
      ["Pos",MessageBase.UINT8],

    ]
}
export class S37008_1 extends MessageBase{
}
export class C37008_2 extends MessageBase{
}
export class S37008_2 extends MessageBase{
  public ObjNo:number;//玩家/伙伴编号，玩家编号统一为0
  public Pos:number;//位置1到5
  public static DES : Array<any> =
     [
      ["ObjNo",MessageBase.UINT32],
      ["Pos",MessageBase.UINT8],

    ]
}
//--------设置阵容信息 -------------
//-define（PT_COMRADE_SET_LINEUP, 37008）.
// 协议号:37008
export class C37008 extends MessageBase{
  public Id:number;//阵容id，从1开始
  public zf_no:number;//阵法编号只能选择已学习阵法
   public item_1 : C37008_1[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT8],
      ["zf_no",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C37008_1]],

    ]
}
export class S37008 extends MessageBase{
  public Id:number;//阵容id，从1开始
  public zf_no:number;//阵法编号只能选择已学习阵法
   public item_2 : S37008_2[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT8],
      ["zf_no",MessageBase.UINT32],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S37008_2]],

    ]
}
export class C37009_1_1 extends MessageBase{
}
export class S37009_1_1 extends MessageBase{
  public ObjNo:number;//玩家/伙伴编号，玩家编号统一为0
  public Pos:number;//位置1到5
  public static DES : Array<any> =
     [
      ["ObjNo",MessageBase.UINT32],
      ["Pos",MessageBase.UINT8],

    ]
}
export class C37009_1 extends MessageBase{
}
export class S37009_1 extends MessageBase{
  public Id:number;//阵容id，从1开始
  public zf_no:number;//阵法编号只能选择已学习阵法
   public item_1 : S37009_1_1[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT8],
      ["zf_no",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37009_1_1]],

    ]
}
//--------阵容信息 -------------
//-define（PT_COMRADE_LINEUP_LIST, 37009）.
// 协议号:37009
export class C37009 extends MessageBase{
}
export class S37009 extends MessageBase{
  public UseId:number;//正在启动中的阵容id
   public item_1 : S37009_1[];
  public static DES : Array<any> =
     [
      ["UseId",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37009_1]],

    ]
}
export class C37010_1 extends MessageBase{
}
export class S37010_1 extends MessageBase{
  public Key:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT16],
      ["NewValue",MessageBase.UINT32],

    ]
}
//----------- 通知客户端：更新伙伴的一个或多个信息 ------------
//-define（PT_PT_COMRADE_INFO_CHANGE,  37010）.
// 协议号：37010
export class C37010 extends MessageBase{
}
export class S37010 extends MessageBase{
  public Id:number;//伙伴唯一id
   public item_1 : S37010_1[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37010_1]],

    ]
}
// --------------------伙伴使用物品---------------
//-define（PT_COMRADE_USE_GOODS, 37011）.
// 协议号：37011
export class C37011 extends MessageBase{
  public Id:number;//伙伴id
  public GoodsId:number;//物品唯一id
  public Count:number;//使用个数
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S37011 extends MessageBase{
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
export class C37012_1 extends MessageBase{
}
export class S37012_1 extends MessageBase{
  public No:number;//缘分组合编号
  public Lv:number;//当前的缘分等级
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],
      ["Lv",MessageBase.UINT8],

    ]
}
// --------------------伙伴缘分信息---------------
//-define（PT_COMRADE_RELATION_INFO, 37012）.
// 协议号：37012
export class C37012 extends MessageBase{
}
export class S37012 extends MessageBase{
   public item_1 : S37012_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37012_1]],

    ]
}
// --------------------伙伴缘分升一级---------------
//-define（PT_COMRADE_RELATION_UPGRADE, 37013）.
// 协议号：37013
export class C37013 extends MessageBase{
  public No:number;//缘分组合编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],

    ]
}
export class S37013 extends MessageBase{
  public No:number;//缘分组合编号
  public Lv:number;//当前的缘分等级
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT16],
      ["Lv",MessageBase.UINT8],

    ]
}
//-------------------------伙伴突破------------------------
//-define（PT_COMRADE_BREAK, 37014）.
// 协议号： 37014
export class C37014 extends MessageBase{
  public Id:number;//伙伴唯一id
  public Count:number;//突破次数
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S37014 extends MessageBase{
  public Id:number;//伙伴唯一id
  public BreakLv:number;//突破等级
  public BreakExp:number;//突破经验
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["BreakLv",MessageBase.UINT16],
      ["BreakExp",MessageBase.UINT16],

    ]
}
//-------------------------伙伴元神------------------------
//-define（PT_COMRADE_SPIRIT, 37015）.
// 协议号： 37015
export class C37015 extends MessageBase{
  public Id:number;//伙伴唯一id
  public Count:number;//次数
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S37015 extends MessageBase{
  public Id:number;//伙伴唯一id
  public SpiritLv:number;//元神等级
  public SpiritExp:number;//元神经验
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],

    ]
}
//-------------------------伙伴元神进阶------------------------
//-define（PT_COMRADE_SPIRIT_UPGRADE, 37016）.
// 协议号： 37016
export class C37016 extends MessageBase{
  public Id:number;//伙伴唯一id
  public SkillNo:number;//技能id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["SkillNo",MessageBase.UINT64],

    ]
}
export class S37016 extends MessageBase{
  public Id:number;//伙伴唯一id
  public SkillNo:number;//技能id
  public SkillLv:number;//技能id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["SkillNo",MessageBase.UINT64],
      ["SkillLv",MessageBase.UINT8],

    ]
}
//-------------------------伙伴重生------------------------
//-define（PT_COMRADE_REBIRTH, 37017）.
// 协议号：37017
export class C37017 extends MessageBase{
  public Id:number;//伙伴唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S37017 extends MessageBase{
  public Id:number;//伙伴唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class C37018_1 extends MessageBase{
}
export class S37018_1 extends MessageBase{
  public GoodsNo:number;//物品编号
  public Count:number;//个数
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT16],

    ]
}
//-------------------------伙伴重生预览------------------------
//-define（PT_COMRADE_REBIRTH_PREVIEW, 37018）.
// 协议号：37018
export class C37018 extends MessageBase{
  public Id:number;//伙伴唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S37018 extends MessageBase{
  public Id:number;//伙伴唯一id
   public item_1 : S37018_1[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37018_1]],

    ]
}
export class C37019_1 extends MessageBase{
}
export class S37019_1 extends MessageBase{
    //已分配天赋点
  public No:number;//属性编号（对应配置表）
  public Point:number;//已加点数
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
export class C37019_2 extends MessageBase{
}
export class S37019_2 extends MessageBase{
    //各种需要显示的属性
  public Key:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT16],
      ["NewValue",MessageBase.UINT32],

    ]
}
export class C37019_3 extends MessageBase{
}
export class S37019_3 extends MessageBase{
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
export class C37019_4 extends MessageBase{
}
export class S37019_4 extends MessageBase{
  public HoleNo:number;//孔的编号
  public Id:number;//妖丹唯一id
  public No:number;//妖丹编号
  public Lv:number;//妖丹等级
  public TotalExp:number;//总经验
  public static DES : Array<any> =
     [
      ["HoleNo",MessageBase.UINT64],
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT16],
      ["TotalExp",MessageBase.UINT32],

    ]
}
//--------请求某个伙伴的信息 -------------
//-define（PT_GET_COMRADE_INFO, 37019）.
// 协议号:37019
export class C37019 extends MessageBase{
  public Id:number;//唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S37019 extends MessageBase{
  public Id:number;//唯一id
  public No:number;//编号
  public StarLv:number;//星级
  public StarSoul:number;//星魂
  public TalentPoint:number;//可分配天赋点
   public item_1 : S37019_1[];
   public item_2 : S37019_2[];
  public BreakLv:number;//突破等级
  public BreakExp:number;//突破经验
  public SpiritLv:number;//元神等级
  public SpiritExp:number;//元神经验
   public item_3 : S37019_3[];
   public item_4 : S37019_4[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["StarLv",MessageBase.UINT8],
      ["StarSoul",MessageBase.UINT32],
      ["TalentPoint",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37019_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S37019_2]],
      ["BreakLv",MessageBase.UINT16],
      ["BreakExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S37019_3]],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S37019_4]],

    ]
}
// 妖丹镶嵌
//-define（PT_COMRADE_INLAY_YAODAN, 37021）.
export class C37021 extends MessageBase{
  public ComradeId:number;//唯一id
  public YaoDanId:number;//妖丹id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["ComradeId",MessageBase.UINT64],
      ["YaoDanId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
export class S37021 extends MessageBase{
  public ComradeId:number;//唯一id
  public YaoDanId:number;//妖丹id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["ComradeId",MessageBase.UINT64],
      ["YaoDanId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
// 妖丹取下
//-define（PT_COMRADE_UNLOAD_YAODAN, 37022）.
export class C37022 extends MessageBase{
  public ComradeId:number;//唯一id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["ComradeId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
export class S37022 extends MessageBase{
  public ComradeId:number;//唯一id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["ComradeId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
// 炼妖
//-define（PT_COMRADE_REFINE_YAODAN, 37023）.
export class C37023 extends MessageBase{
  public No:number;//炼妖编号
  public UseYuanBao:number;//是否使用元宝：1是0否
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["UseYuanBao",MessageBase.UINT8],

    ]
}
export class S37023 extends MessageBase{
}
export class C37024_1 extends MessageBase{
    //当数组为空时表示一键吞噬，非空表示选择吞噬
  public Id:number;//妖丹唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S37024_1 extends MessageBase{
}
//返回 PT_COMRADE_YAODAN_REFINE_INFO
// 一键吞噬/选择吞噬
//-define（PT_COMRADE_UP_LV_YAODAN, 37024）.
export class C37024 extends MessageBase{
  public Quality:number;//该品质及以下
  public YaoDanId:number;//主妖丹ID
  public ComradeId:number;//当选择伙伴身上的妖丹时发送伙伴id，否则为0
   public item_1 : C37024_1[];
  public static DES : Array<any> =
     [
      ["Quality",MessageBase.UINT8],
      ["YaoDanId",MessageBase.UINT64],
      ["ComradeId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C37024_1]],

    ]
}
export class S37024 extends MessageBase{
  public YaoDanId:number;//妖丹ID
  public No:number;//妖丹编号
  public AddExp:number;//获得经验
  public ComradeId:number;//当选择伙伴身上的妖丹时发送伙伴id，否则为0
  public static DES : Array<any> =
     [
      ["YaoDanId",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["AddExp",MessageBase.UINT32],
      ["ComradeId",MessageBase.UINT64],

    ]
}
export class C37025_1 extends MessageBase{
}
export class S37025_1 extends MessageBase{
  public Id:number;//妖丹唯一id
  public No:number;//妖丹编号
  public Lv:number;//妖丹等级
  public TotalExp:number;//总经验
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT16],
      ["TotalExp",MessageBase.UINT32],

    ]
}
// 妖丹列表
//-define（PT_COMRADE_YAODAN_LIST, 37025）.
export class C37025 extends MessageBase{
  public Location:number;//1:包裹；2：仓库；3：炼妖池
  public static DES : Array<any> =
     [
      ["Location",MessageBase.UINT8],

    ]
}
export class S37025 extends MessageBase{
  public Location:number;//1:包裹；2：仓库；3：炼妖池
   public item_1 : S37025_1[];
    //-define（PT_COMRADE_YAODAN_ADD,37026）.
  public static DES : Array<any> =
     [
      ["Location",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37025_1]],

    ]
}
export class C37026_1 extends MessageBase{
}
export class S37026_1 extends MessageBase{
  public Id:number;//妖丹唯一id
  public No:number;//妖丹编号
  public Lv:number;//妖丹等级
  public TotalExp:number;//总经验
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT16],
      ["TotalExp",MessageBase.UINT32],

    ]
}
//-define（PT_COMRADE_YAODAN_ADD, 37026）.
// 协议号:37026
export class C37026 extends MessageBase{
}
export class S37026 extends MessageBase{
  public Location:number;//1:包裹；2：仓库；3：炼妖池
   public item_1 : S37026_1[];
    //-define（PT_COMRADE_YAODAN_DEL,37027）.
  public static DES : Array<any> =
     [
      ["Location",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37026_1]],

    ]
}
export class C37027_1 extends MessageBase{
}
export class S37027_1 extends MessageBase{
  public Id:number;//妖丹唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
//-define（PT_COMRADE_YAODAN_DEL, 37027）.
// 协议号:37027
export class C37027 extends MessageBase{
}
export class S37027 extends MessageBase{
  public Location:number;//1:包裹；2：仓库；3：炼妖池
   public item_1 : S37027_1[];
  public static DES : Array<any> =
     [
      ["Location",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37027_1]],

    ]
}
// 一键拾取炼妖池的妖丹
//-define（PT_COMRADE_YAODAN_PICK, 37028）.
export class C37028 extends MessageBase{
}
export class S37028 extends MessageBase{
}
export class C37029_1 extends MessageBase{
}
export class S37029_1 extends MessageBase{
  public No:number;//激活的炼妖编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
//无
// 炼妖信息
//-define（PT_COMRADE_YAODAN_REFINE_INFO, 37029）.
export class C37029 extends MessageBase{
}
export class S37029 extends MessageBase{
  public LeftCount:number;//剩余炼妖次数
   public item_1 : S37029_1[];
  public static DES : Array<any> =
     [
      ["LeftCount",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37029_1]],

    ]
}
// 炼妖师召唤
//-define（PT_COMRADE_YAODAN_CALL, 37030）.
export class C37030 extends MessageBase{
  public No:number;//激活的炼妖编号，为0表示没有激活的
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S37030 extends MessageBase{
  public No:number;//激活的炼妖编号，为0表示没有激活的
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
// 移动
//-define（PT_COMRADE_YAODAN_MOVE, 37031）.
export class C37031 extends MessageBase{
  public YaoDanId:number;//妖丹唯一Id
  public FromLocation:number;//1:包裹；2：仓库；3：炼妖池
  public ToLocation:number;//1:包裹；2：仓库；3：炼妖池
  public static DES : Array<any> =
     [
      ["YaoDanId",MessageBase.UINT64],
      ["FromLocation",MessageBase.UINT8],
      ["ToLocation",MessageBase.UINT8],

    ]
}
export class S37031 extends MessageBase{
}
//无
//-define（PT_COMRADE_OPEN_YAODAN_HOLE, 37032）.
export class C37032 extends MessageBase{
  public ComradeId:number;//唯一id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["ComradeId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
export class S37032 extends MessageBase{
  public ComradeId:number;//唯一id
  public HoleNo:number;//孔的编号
  public static DES : Array<any> =
     [
      ["ComradeId",MessageBase.UINT64],
      ["HoleNo",MessageBase.UINT8],

    ]
}
// 妖丹分解
//-define（PT_COMRADE_YAODAN_DECOMPOSE, 37033）.
export class C37033 extends MessageBase{
  public YaoDanId:number;//唯一id
  public static DES : Array<any> =
     [
      ["YaoDanId",MessageBase.UINT64],

    ]
}
export class S37033 extends MessageBase{
  public YaoDanId:number;//唯一id
  public static DES : Array<any> =
     [
      ["YaoDanId",MessageBase.UINT64],

    ]
}
export class C37034_1 extends MessageBase{
}
export class S37034_1 extends MessageBase{
    //已分配天赋点
  public No:number;//属性编号（对应配置表）
  public Point:number;//已加点数
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT8],
      ["Point",MessageBase.UINT16],

    ]
}
export class C37034_2 extends MessageBase{
}
export class S37034_2 extends MessageBase{
    //各种需要显示的属性
  public Key:number;//信息代号（详见obj_info_code.hrl的宏OI_CODE_XXXX）
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT16],
      ["NewValue",MessageBase.UINT32],

    ]
}
export class C37034_3 extends MessageBase{
}
export class S37034_3 extends MessageBase{
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
export class C37034_4 extends MessageBase{
}
export class S37034_4 extends MessageBase{
  public HoleNo:number;//孔的编号
  public Id:number;//妖丹唯一id
  public No:number;//妖丹编号
  public Lv:number;//妖丹等级
  public TotalExp:number;//总经验
  public static DES : Array<any> =
     [
      ["HoleNo",MessageBase.UINT64],
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT16],
      ["TotalExp",MessageBase.UINT32],

    ]
}
export class C37034_5 extends MessageBase{
}
export class S37034_5 extends MessageBase{
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
//--------请求其他玩家某个伙伴的信息 -------------
//-define（PT_GET_COMRADE_INFO_OTHER, 37034）.
// 协议号:37034
export class C37034 extends MessageBase{
  public Id:number;//唯一id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S37034 extends MessageBase{
  public Id:number;//唯一id
  public No:number;//编号
  public StarLv:number;//星级
  public StarSoul:number;//星魂
  public TalentPoint:number;//可分配天赋点
   public item_1 : S37034_1[];
   public item_2 : S37034_2[];
  public BreakLv:number;//突破等级
  public BreakExp:number;//突破经验
  public SpiritLv:number;//元神等级
  public SpiritExp:number;//元神经验
   public item_3 : S37034_3[];
   public item_4 : S37034_4[];
   public item_5 : S37034_5[];
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["No",MessageBase.UINT32],
      ["StarLv",MessageBase.UINT8],
      ["StarSoul",MessageBase.UINT32],
      ["TalentPoint",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S37034_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S37034_2]],
      ["BreakLv",MessageBase.UINT16],
      ["BreakExp",MessageBase.UINT16],
      ["SpiritLv",MessageBase.UINT16],
      ["SpiritExp",MessageBase.UINT16],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S37034_3]],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S37034_4]],
        ["item_5",MessageBase.ARRAY,[MessageBase.CLASS,S37034_5]],

    ]
}
