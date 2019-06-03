import { MessageBase } from "../../message/messageBase/MessageBase";
// =======================================
// 场景（scene）相关的协议
// 分类号:12
//
// Author: huangjf
// Created: 2013.6.17
// ======================================
// PT: 表示protocol
// 普通NPC：是指静态的、一直在场景中存在的功能NPC
// 动态NPC：目前有两种，一种是定时刷出和消失的与活动相关的NPC，另一种是会走动的NPC（以下统称为“可移动NPC”）
// 注意：为了避免冲突，普通npc的唯一id小于十万，动态npc的唯一id从十万开始！
// 涉及的宏:
//游戏中的对象类型
// -define（OBJ_INVALID,0）.无效类型（用于程序做判定）
// -define（OBJ_PLAYER,1）.玩家
// -define（OBJ_PARTNER,2）.宠物
// -define（OBJ_NPC,3）.NPC
// -define（OBJ_MONSTER,4）.怪物
// AOI信息变化宏定义
// -define（OI_CODE_BACKWEAR, 151）.玩家背饰编号
// -define（OI_CODE_WEAPON, 152）.玩家武器编号
// -define（OI_CODE_GUILDNAME, 153）.帮派名
// -define（OI_CODE_TITLE, 154）.称号
// --------------- 玩家走动 -------------------------
//-define（PT_PLAYER_MOVE, 12001）.
// 协议号:12001
export class C12001 extends MessageBase{
  public SceneId:number;//所在场景的id
  public NewX:number;//新X坐标
  public NewY:number;//新Y坐标
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],
      ["NewX",MessageBase.UINT16],
      ["NewY",MessageBase.UINT16],

    ]
}
export class S12001 extends MessageBase{
  public PlayerId:number;//玩家id
  public NewX:number;//新X坐标
  public NewY:number;//新Y坐标
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["NewX",MessageBase.UINT16],
      ["NewY",MessageBase.UINT16],

    ]
}
export class C12002_1_1 extends MessageBase{
}
export class S12002_1_1 extends MessageBase{
    //当前buff列表
  public BuffNo:number;//
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],

    ]
}
export class C12002_1 extends MessageBase{
}
export class S12002_1 extends MessageBase{
  public Id:number;//玩家id
  public X:number;//X坐标
  public Y:number;//Y坐标
  public Race:number;//种族
  public Faction:number;//门派
  public Lv:number;//等级
  public Sex:number;//性别（1：男，2：女）
  public PlayerName:string;//玩家名字
  public GuildName:string;//帮派名（如果没加入帮派，则固定返回空字符串）
  public GraphTitle:number;//当前的图片称号id（如果没有称号，则固定返回0）
  public TextTitle:number;//当前的文字称号id（如果没有称号，则固定返回0）
  public UserDefTitle:string;//当前的自定义称号（如果没有称号，则固定返回空串）
  public AerocraftNo:number;//飞行器编号0为没有
  public Weapon:number;//武器编号
  public Headwear:number;//头饰编号
  public Clothes:number;//服饰编号
  public PartnerNo:number;//跟随宠物编号
  public ParWeapon:number;//跟随武器编号
  public ParEvolveLv:number;//跟随进化等级
  public CultivateLv:number;//跟随修炼等级
  public CultivateLayer:number;//跟随修炼层数
  public ParQuality:number;//跟随品质
  public ParName:string;//跟随名字
  public ParClothes:number;//跟随画皮即衣服
  public BhvState:number;//玩家行为状态（详见char.hrl的BHV_XXX宏）
  public VipLv:number;//当前vip等级
  public IsLeader:number;//是否队长，1：是，0：否
  public TeamId:number;//队伍id，没有则为0
  public StrenLv:number;//玩家套装最低强化等级，如果没有套装则是0
   public item_1 : S12002_1_1[];
  public SpouseName:string;//配偶名字
  public MagicKeyNo:number;//法宝编号
  public MountNo:number;//坐骑编号
  public MountStep:number;//坐骑阶数
  public Popular:number;//人气值
  public TransfigurationNo:number;//变身编号
  public PaodianType:number;//泡点类型
  public LeaderId:number;//队长id
  public TeamPos:number;//在队伍的位置
  public Grade:number;//排位赛段位
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Sex",MessageBase.UINT8],
      ["PlayerName",MessageBase.STRING],
      ["GuildName",MessageBase.STRING],
      ["GraphTitle",MessageBase.UINT32],
      ["TextTitle",MessageBase.UINT32],
      ["UserDefTitle",MessageBase.STRING],
      ["AerocraftNo",MessageBase.UINT32],
      ["Weapon",MessageBase.UINT32],
      ["Headwear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["PartnerNo",MessageBase.UINT32],
      ["ParWeapon",MessageBase.UINT32],
      ["ParEvolveLv",MessageBase.UINT8],
      ["CultivateLv",MessageBase.UINT8],
      ["CultivateLayer",MessageBase.UINT8],
      ["ParQuality",MessageBase.UINT8],
      ["ParName",MessageBase.STRING],
      ["ParClothes",MessageBase.UINT32],
      ["BhvState",MessageBase.UINT8],
      ["VipLv",MessageBase.UINT8],
      ["IsLeader",MessageBase.UINT8],
      ["TeamId",MessageBase.UINT32],
      ["StrenLv",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12002_1_1]],
      ["SpouseName",MessageBase.STRING],
      ["MagicKeyNo",MessageBase.UINT32],
      ["MountNo",MessageBase.UINT32],
      ["MountStep",MessageBase.UINT8],
      ["Popular",MessageBase.UINT32],
      ["TransfigurationNo",MessageBase.UINT32],
      ["PaodianType",MessageBase.UINT32],
      ["LeaderId",MessageBase.UINT64],
      ["TeamPos",MessageBase.UINT8],
      ["Grade",MessageBase.UINT8],

    ]
}
// --------------- 通知场景玩家：有玩家进入了我的AOI -------------------------
//-define（PT_NOTIFY_PLAYERS_ENTER_MY_AOI, 12002）.
// 协议号: 12002
export class C12002 extends MessageBase{
}
export class S12002 extends MessageBase{
   public item_1 : S12002_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12002_1]],

    ]
}
export class C12003_1 extends MessageBase{
}
export class S12003_1 extends MessageBase{
  public PlayerId:number;//玩家id
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],

    ]
}
// --------------- 通知场景玩家：有玩家离开了我的AOI（主动或者被动离开） -------------------------
//-define（PT_NOTIFY_PLAYERS_LEAVE_MY_AOI, 12003）.
// 协议号: 12003
export class C12003 extends MessageBase{
}
export class S12003 extends MessageBase{
   public item_1 : S12003_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12003_1]],

    ]
}
// --------------- 通知场景玩家：对象（怪物或可移动NPC）走动 -------------------------
//-define（PT_NOTIFY_OBJ_MOVE, 12004）.
// 协议号:12004
export class C12004 extends MessageBase{
}
export class S12004 extends MessageBase{
  public ObjType:number;//对象类型（详见文件开头的宏）
  public ObjId:number;//对象唯一id（怪物或NPC的唯一id）
  public NewX:number;//新X坐标
  public NewY:number;//新Y坐标
  public static DES : Array<any> =
     [
      ["ObjType",MessageBase.UINT8],
      ["ObjId",MessageBase.UINT32],
      ["NewX",MessageBase.UINT16],
      ["NewY",MessageBase.UINT16],

    ]
}
export class C12005_1 extends MessageBase{
}
export class S12005_1 extends MessageBase{
  public ObjType:number;//对象类型（详见文件开头的宏）
  public ObjId:number;//对象唯一id（怪物或NPC的唯一id）
  public ObjNo:number;//对象的编号（怪物或NPC的编号，由策划制定）
  public X:number;//对象的X坐标
  public Y:number;//对象的Y坐标
  public TeamId:number;//对象所属队伍的id（若不属于任何队伍，则固定返回0）对于npc来说，表示称号id，如果没有则为0
  public OwnerId:number;//对象所属玩家的id（若不属于任何玩家，则固定返回0）
  public LeftCanBeKilledTimes:number;//剩余可被杀死的次数，如果不限次数，则返回9999（目前某些怪物有该属性，npc没有，若没有该属性，则固定返回0）
  public BhvState:number;//对象的行为状态（详见char.hrl的BHV_XXX宏）
  public Str_1:string;//aoi显示用的字符串
  public Str_2:string;//aoi显示用的字符串
  public static DES : Array<any> =
     [
      ["ObjType",MessageBase.UINT8],
      ["ObjId",MessageBase.UINT32],
      ["ObjNo",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],
      ["TeamId",MessageBase.UINT32],
      ["OwnerId",MessageBase.UINT64],
      ["LeftCanBeKilledTimes",MessageBase.UINT16],
      ["BhvState",MessageBase.UINT8],
      ["Str_1",MessageBase.STRING],
      ["Str_2",MessageBase.STRING],

    ]
}
// --------------- 通知场景玩家：有对象（怪物或可移动NPC）进入了我的AOI -------------------------
//-define（PT_NOTIFY_OBJS_ENTER_MY_AOI, 12005）.
// 协议号:12005
export class C12005 extends MessageBase{
}
export class S12005 extends MessageBase{
   public item_1 : S12005_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12005_1]],

    ]
}
export class C12006_1 extends MessageBase{
}
export class S12006_1 extends MessageBase{
  public ObjType:number;//对象类型（详见文件开头的宏）
  public ObjId:number;//对象唯一id（怪物或NPC的唯一id）
  public static DES : Array<any> =
     [
      ["ObjType",MessageBase.UINT8],
      ["ObjId",MessageBase.UINT32],

    ]
}
// --------------- 通知场景玩家：有对象（怪物或可移动NPC）离开了我的AOI（主动或者被动离开） -------------------------
//-define（PT_NOTIFY_OBJS_LEAVE_MY_AOI, 12006）.
// 协议号:12006
export class C12006 extends MessageBase{
}
export class S12006 extends MessageBase{
   public item_1 : S12006_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12006_1]],

    ]
}
// --------------- 请求逃离阻挡位置 -------------------------
//-define（PT_REQ_LEAVE_BLOCKED_POS, 12007）.
// 协议号: 12007
export class C12007 extends MessageBase{
}
export class S12007 extends MessageBase{
}
//无
// --------------- 直接传送到目标位置 -------------------------
//-define（PT_FORCE_TELEPORT, 12008）.
// 协议号: 12008
export class C12008 extends MessageBase{
  public SceneId:number;//目标场景id
  public X:number;//X坐标
  public Y:number;//Y坐标
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],

    ]
}
export class S12008 extends MessageBase{
}
//
// 注：若传送成功则直接返回12011协议， 否则返回失败提示消息协议
// --------------- 请求传送 -------------------------
//-define（PT_REQ_TELEPORT, 12009）.
// 协议号: 12009
export class C12009 extends MessageBase{
  public TeleportNo:number;//传送编号
  public static DES : Array<any> =
     [
      ["TeleportNo",MessageBase.UINT32],

    ]
}
export class S12009 extends MessageBase{
}
//
// 注：若传送成功则直接返回12011协议， 否则返回失败提示消息协议
// --------------- 通知客户端：切换到新场景（客户端随后发下面三个协议，以查询相关的信息） -------------------------
//-define（PT_NOTIFY_SWITCH_TO_NEW_SCENE, 12011）.
// 协议号:12011
export class C12011 extends MessageBase{
}
export class S12011 extends MessageBase{
  public NewSceneId:number;//新场景的唯一id
  public NewSceneNo:number;//新场景的编号
  public NewX:number;//玩家在新场景的X坐标
  public NewY:number;//玩家在新场景的Y坐标
  public static DES : Array<any> =
     [
      ["NewSceneId",MessageBase.UINT32],
      ["NewSceneNo",MessageBase.UINT32],
      ["NewX",MessageBase.UINT16],
      ["NewY",MessageBase.UINT16],

    ]
}
export class C12012_1 extends MessageBase{
}
export class S12012_1 extends MessageBase{
  public NpcId:number;//npc唯一id
  public NpcNo:number;//npc编号（由策划制定）
  public X:number;//npc的X坐标
  public Y:number;//npc的Y坐标
  public static DES : Array<any> =
     [
      ["NpcId",MessageBase.UINT32],
      ["NpcNo",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],

    ]
}
// --------------- 加载场景：获取当前所在场景内的动态npc列表（注意：返回的数组中不包括可移动NPC） -------------------------
//-define（PT_GET_SCENE_DYNAMIC_NPC_LIST, 12012）.
// 协议号:12012
export class C12012 extends MessageBase{
  public SceneId:number;//当前所在场景唯一id
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],

    ]
}
export class S12012 extends MessageBase{
   public item_1 : S12012_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12012_1]],

    ]
}
// --------------- 加载场景：获取当前场景AOI范围的信息（服务端返回AOI范围内的玩家、怪物和可移动NPC列表） -------------------------
//-define（PT_GET_SCENE_AOI_INFO, 12013）.
// 协议号:12013
export class C12013 extends MessageBase{
  public SceneId:number;//当前所在场景唯一id
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],

    ]
}
export class S12013 extends MessageBase{
}
export class C12014_1 extends MessageBase{
}
export class S12014_1 extends MessageBase{
  public TeleportNo:number;//动态传送点对应的传送编号
  public X:number;//动态传送点所在的X坐标
  public Y:number;//动态传送点所在的Y坐标
  public static DES : Array<any> =
     [
      ["TeleportNo",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],

    ]
}
//如果AOI范围内没有任何对象，则服务端不返回任何消息
//如果有玩家，则返回12002协议
//如果有怪物，则再返回12005协议（这时协议中的对象类型都是怪物）
//如果有可移动npc，则接着再返回12005协议（这时协议中的对象类型都是npc）
// --------------- 加载场景：获取当前所在场景内的动态传送点列表（注意：如果场景内没有动态传送点，则服务端不返回协议） -------------------------
//-define（PT_GET_SCENE_DYNAMIC_TELEPORTER_LIST, 12014）.
// 协议号: 12014
export class C12014 extends MessageBase{
  public SceneId:number;//当前所在场景唯一id
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],

    ]
}
export class S12014 extends MessageBase{
  public SceneId:number;//当前所在场景唯一id
   public item_1 : S12014_1[];
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12014_1]],

    ]
}
export class C12015_1 extends MessageBase{
}
export class S12015_1 extends MessageBase{
  public ObjType:number;//对象类型（详见文件开头的宏）
  public ObjId:number;//对象唯一id（怪物或NPC的唯一id）
  public ObjNo:number;//对象的编号（怪物或NPC的编号，由策划制定）
  public X:number;//对象的X坐标
  public Y:number;//对象的Y坐标
  public TeamId:number;//对象所属队伍的id（若不属于任何队伍，则固定返回0）对于npc来说，表示称号id，如果没有则为0
  public OwnerId:number;//对象所属玩家的id（若不属于任何玩家，则固定返回0）
  public LeftCanBeKilledTimes:number;//剩余可被杀死的次数，如果不限次数，则返回9999（目前某些怪物有该属性，npc没有，若没有该属性，则固定返回0）
  public BhvState:number;//对象的行为状态（详见char.hrl的BHV_XXX宏）
  public Str_1:string;//aoi显示用的字符串
  public Str_2:string;//aoi显示用的字符串
  public static DES : Array<any> =
     [
      ["ObjType",MessageBase.UINT8],
      ["ObjId",MessageBase.UINT32],
      ["ObjNo",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],
      ["TeamId",MessageBase.UINT32],
      ["OwnerId",MessageBase.UINT64],
      ["LeftCanBeKilledTimes",MessageBase.UINT16],
      ["BhvState",MessageBase.UINT8],
      ["Str_1",MessageBase.STRING],
      ["Str_2",MessageBase.STRING],

    ]
}
// }
// --------------- 通知场景玩家：场景内刷出了新对象（怪物或动态NPC）。比如明雷怪死了然后重新刷出 -------------------------
//-define（PT_NOTIFY_OBJ_SPAWNED, 12015）.
// 协议号: 12015
export class C12015 extends MessageBase{
}
export class S12015 extends MessageBase{
  public classS12015
   public item_1 : S12015_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12015_1]],

    ]
}
// --------------- 通知场景玩家：场景内的对象（怪物或动态NPC）消失了。比如明雷怪死了、对象刷出的时间到期了而导致对象消失 -------------------------
//-define（PT_NOTIFY_OBJ_CLEARED, 12016）.
// 协议号: 12016
export class C12016 extends MessageBase{
}
export class S12016 extends MessageBase{
  public ObjType:number;//对象类型（详见文件开头的宏）
  public ObjId:number;//对象唯一id
  public static DES : Array<any> =
     [
      ["ObjType",MessageBase.UINT8],
      ["ObjId",MessageBase.UINT32],

    ]
}
export class C12017_1 extends MessageBase{
}
export class S12017_1 extends MessageBase{
  public Key:number;//信息代号（详见详见文件obj_info_code.hrl）
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT32],
      ["NewValue",MessageBase.UINT32],

    ]
}
// 玩家/npc/怪物aoi整形信息变化通知
//-define（PT_NOTIFY_OBJ_AOI_INFO_CHANGE1, 12017）.
// 协议号: 12017
export class C12017 extends MessageBase{
}
export class S12017 extends MessageBase{
  public ObjType:number;//对象的类型（见文件开头的宏）
  public ObjId:number;//对象的唯一id
   public item_1 : S12017_1[];
  public static DES : Array<any> =
     [
      ["ObjType",MessageBase.UINT8],
      ["ObjId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12017_1]],

    ]
}
export class C12018_1 extends MessageBase{
}
export class S12018_1 extends MessageBase{
  public Key:number;//信息代号（详见详见文件obj_info_code.hrl）
  public NewInfo:string;//当前的新信息
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT32],
      ["NewInfo",MessageBase.STRING],

    ]
}
// 玩家aoi 字符串 信息变化通知， 如称号 帮派名字等
//-define（PT_NOTIFY_PLAYER_AOI_INFO_CHANGE2, 12018）.
// 协议号: 12018
export class C12018 extends MessageBase{
}
export class S12018 extends MessageBase{
  public PlayerId:number;//玩家唯一id
   public item_1 : S12018_1[];
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12018_1]],

    ]
}
// 主宠物发生变化
//-define（PT_NOTIFY_MAIN_PAR_CHANGE, 12019）.
// 协议号: 12019
export class C12019 extends MessageBase{
}
export class S12019 extends MessageBase{
  public PlayerId:number;//玩家唯一id
  public PartnerNo:number;//主宠物编号
  public ParWeapon:number;//主宠武器编号影响外形
  public EvolveLv:number;//宠物进化等级影响外形
  public CultivateLv:number;//主宠修炼等级
  public CultivateLayer:number;//主宠修炼层数
  public ParQuality:number;//主宠品质
  public PartnerName:string;//主宠物名字
  public ParClothes:number;//主宠画皮即衣服
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["PartnerNo",MessageBase.UINT32],
      ["ParWeapon",MessageBase.UINT32],
      ["EvolveLv",MessageBase.UINT8],
      ["CultivateLv",MessageBase.UINT8],
      ["CultivateLayer",MessageBase.UINT8],
      ["ParQuality",MessageBase.UINT8],
      ["PartnerName",MessageBase.STRING],
      ["ParClothes",MessageBase.UINT32],

    ]
}
// 玩家战斗外buff消失
//-define（PT_NOTIFY_PLAYER_BUFF_VANISH, 12020）.
// 协议号: 12020
export class C12020 extends MessageBase{
}
export class S12020 extends MessageBase{
  public PlayerId:number;//玩家唯一id
  public BuffNo:number;//主宠物编号
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["BuffNo",MessageBase.UINT32],

    ]
}
// 中心服务器|出生服务器切换
//-define（PT_SCENE_SVR_SWITCH, 12021）.
// 协议号: 12021
export class C12021 extends MessageBase{
  public To:number;//0表示切换到出生服务器（创建账号的区号），1表示切换到中心服务器（跨服）
  public static DES : Array<any> =
     [
      ["To",MessageBase.UINT8],

    ]
}
export class S12021 extends MessageBase{
}
// --------------- 通知场景玩家：场景内刷出了动态传送点 -------------------------
//-define（PT_NOTIFY_DYNAMIC_TELEPORTER_SPAWNED, 12025）.
// 协议号: 12025
export class C12025 extends MessageBase{
}
export class S12025 extends MessageBase{
  public SceneId:number;//场景唯一id
  public TeleportNo:number;//动态传送点对应的传送编号
  public X:number;//动态传送点所在的X坐标
  public Y:number;//动态传送点所在的Y坐标
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],
      ["TeleportNo",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],

    ]
}
// --------------- 通知场景玩家：场景内某动态传送点被清除了 -------------------------
//-define（PT_NOTIFY_DYNAMIC_TELEPORTER_CLEARED, 12026）.
// 协议号: 12026
export class C12026 extends MessageBase{
}
export class S12026 extends MessageBase{
  public SceneId:number;//场景唯一id
  public TeleportNo:number;//动态传送点对应的传送编号
  public X:number;//动态传送点所在的X坐标
  public Y:number;//动态传送点所在的Y坐标
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],
      ["TeleportNo",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],

    ]
}
export class C12999_1 extends MessageBase{
}
export class S12999_1 extends MessageBase{
  public MonId:number;//怪物id
  public MonNo:number;//怪物编号
  public X:number;//X坐标
  public Y:number;//Y坐标
  public Lv:number;//等级
  public BMonGroupNo:number;//对应的战斗怪物组编号
  public Name:string;//名字
  public static DES : Array<any> =
     [
      ["MonId",MessageBase.UINT32],
      ["MonNo",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],
      ["Lv",MessageBase.UINT32],
      ["BMonGroupNo",MessageBase.UINT32],
      ["Name",MessageBase.STRING],

    ]
}
// --------------- 仅服务端自己调试用的协议：获取场景内的明雷怪列表。 客户端同事不用理会此协议！ -------------------------
//-define（PT_DBG_GET_SCENE_MON_LIST, 12999）.
// 协议号: 12999
export class C12999 extends MessageBase{
  public SceneId:number;//场景id
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT32],

    ]
}
export class S12999 extends MessageBase{
  public SceneId:number;//场景id
   public item_1 : S12999_1[];
  public static DES : Array<any> =
     [
      ["SceneId",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S12999_1]],

    ]
}
