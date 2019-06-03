import { MessageBase } from "../../message/messageBase/MessageBase";
// =================================
// 战斗系统相关协议
// 2012.4.20---- huangjf
// Modified: 2013.7.29
// =================================
// pt: 表示protocol
// bt: 表示battle
// 策划认为的战场中的位置排布：
//左方右方
//49|94
//27|72
//16|61
//38|83
//510|105
// 程序认为的战场中的位置排布：
//左方右方
//61|16
//72|27
//83|38
//94|49
//105|510
// ---------- 玩家触发战斗：打明雷怪 -----------------
//-define（PT_BT_START_MF1, 20000）.
// 协议号: 20000
export class C20000 extends MessageBase{
}
export class S20000 extends MessageBase{
}
// ---------- 玩家触发战斗：打明雷怪 -----------------
//-define（PT_BT_START_MF, 20001）.
// 协议号: 20001
export class C20001 extends MessageBase{
  public MonId:number;//明雷怪id
  public static DES : Array<any> =
     [
      ["MonId",MessageBase.UINT32],

    ]
}
export class S20001 extends MessageBase{
}
// ---------- 玩家发起PK邀请 -----------------
//-define（PT_BT_START_PK, 20002）.
// 协议号: 20002
export class C20002 extends MessageBase{
  public TargetPlayerId:number;//目标玩家id
  public PK_Type:number;//PK类型（1：切磋，2：强行PK，即决斗）
  public static DES : Array<any> =
     [
      ["TargetPlayerId",MessageBase.UINT64],
      ["PK_Type",MessageBase.UINT8],

    ]
}
export class S20002 extends MessageBase{
  public RetCode:number;//若发起PK邀请成功则返回0，否则不返回，而是直接发送失败提示消息协议
  public TargetPlayerId:number;//目标玩家id
  public PK_Type:number;//PK类型（1：切磋，2：强行PK，即决斗）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TargetPlayerId",MessageBase.UINT64],
      ["PK_Type",MessageBase.UINT8],

    ]
}
// ---------- 询问是否接受PK邀请 -----------------
//-define（PT_BT_ASK_IF_ACCPET_PK, 20065）.
// 协议号: 20065
export class C20065 extends MessageBase{
}
export class S20065 extends MessageBase{
  public FromPlayerId:number;//主动发起PK的玩家id
  public FromPlayerName:string;//主动发起PK的玩家名字
  public PK_Type:number;//PK类型（1：切磋）
  public IsFromPlayerInTeam:number;//发起PK的玩家是否在队伍中（1：是，0：否）
  public FromPlayerCount:number;//发起PK的玩家所在队伍的人数（如果不在队伍，则固定返回1）
  public static DES : Array<any> =
     [
      ["FromPlayerId",MessageBase.UINT64],
      ["FromPlayerName",MessageBase.STRING],
      ["PK_Type",MessageBase.UINT8],
      ["IsFromPlayerInTeam",MessageBase.UINT8],
      ["FromPlayerCount",MessageBase.UINT8],

    ]
}
// ---------- 玩家回复PK邀请 -----------------
//-define（PT_BT_REPLY_PK_INVITE, 20066）.
// 协议号: 20066
export class C20066 extends MessageBase{
  public ReplyCode:number;//回复代号（1：同意，2：拒绝）
  public FromPlayerId:number;//发起PK邀请的玩家id
  public PK_Type:number;//PK类型（1：切磋）
  public static DES : Array<any> =
     [
      ["ReplyCode",MessageBase.UINT8],
      ["FromPlayerId",MessageBase.UINT64],
      ["PK_Type",MessageBase.UINT8],

    ]
}
export class S20066 extends MessageBase{
}
// ---------- 通知客户端：对方拒绝了PK邀请 -----------------
//-define（PT_BT_NOTIFY_PK_INVITE_REFUSED, 20067）.
// 协议号: 20067
export class C20067 extends MessageBase{
}
export class S20067 extends MessageBase{
  public TargetPlayerId:number;//拒绝PK邀请的玩家id
  public TargetPlayerName:string;//拒绝PK邀请的玩家名字
  public PK_Type:number;//PK类型（1：切磋）
  public static DES : Array<any> =
     [
      ["TargetPlayerId",MessageBase.UINT64],
      ["TargetPlayerName",MessageBase.STRING],
      ["PK_Type",MessageBase.UINT8],

    ]
}
// ---------- 通知客户端：战斗开始 -----------------
//-define（PT_BT_NOTIFY_BATTLE_START, 20005）.
// 协议号: 20005
export class C20005 extends MessageBase{
}
export class S20005 extends MessageBase{
}
//无
// ---------- 通知客户端：战斗结束 -----------------
//-define（PT_BT_NOTIFY_BATTLE_FINISH, 20006）.
// 协议号: 20006
export class C20006 extends MessageBase{
}
export class S20006 extends MessageBase{
  public WinSide:number;//胜利方（1:主队，2：客队，0：平局）
  public static DES : Array<any> =
     [
      ["WinSide",MessageBase.UINT8],

    ]
}
export class C20007_1_1 extends MessageBase{
}
export class S20007_1_1 extends MessageBase{
  public BuffNo:number;//buff编号
  public ExpireRound:number;//buff的到期回合（表示到了该回合，buff即消失）
  public ProtectionRound:number;//buff的保护回合在此之前不会被驱散
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],

    ]
}
export class C20007_1 extends MessageBase{
}
export class S20007_1 extends MessageBase{
    //主队的战斗对象信息（打怪时，玩家方是在主队，怪物方是在客队）
  public BoId:number;//战斗对象id
  public BoType:number;//战斗对象类型（1：玩家，2：宠物，3：NPC，4：怪物，5：普通boss，7：雇佣玩家，8：世界boss）
  public OwnerPlayerBoId:number;//所属玩家的boid，目前是用于表明战场上的宠物的归属，对于非宠物bo，统一返回0
  public Pos:number;//战斗位置（1~15）
  public Name:string;//名字
  public Sex:number;//性别（1：男，2：女）
  public Race:number;//种族
  public Faction:number;//门派
  public Lv:number;//等级
  public ParentObjId:number;//父对象id（对于玩家bo，表示对应的玩家id，对于怪物bo，表示对应的战斗怪模板编号，对于宠物bo，表示对应的宠物id）
  public ParentPartnerNo:number;//宠物bo对应的父宠物对象的编号（策划所配置的编号），如果不是宠物bo，则统一返回0
  public Hp:number;//当前血量
  public HpLim:number;//血量上限
  public Mp:number;//当前魔法值
  public MpLim:number;//魔法上限
  public Anger:number;//当前怒气值
  public AngerLim:number;//怒气上限
  public Weapon:number;//武器对应的物品编号（若没有则返回0）
  public HeadWear:number;//头饰对应的物品编号（若没有则返回0）
  public Clothes:number;//服饰对应的物品编号（若没有则返回0）
  public BackWear:number;//背饰对应的物品编号（若没有则返回0）
  public ParCultivateLv:number;//宠物的修炼等级（如果不是宠物，固定返回0）
  public ParCultivateLayer:number;//宠物的修炼层数（如果不是宠物，固定返回0，如果是宠物，但没有修炼过，也返回0）
  public ParEvolveLv:number;//宠物的进化等级（如果不是宠物，固定返回0）
  public ParNature:number;//宠物性格（如果不是宠物，固定返回0）
  public ParQuality:number;//宠物的品质（1：白2:绿3:蓝4:紫5:橙6:红），如果不是宠物，则固定返回0
  public IsMainPar:number;//是否为主宠（1：是，0：否）
  public IsInvisible:number;//是否有隐身状态（1：是，0：否）
  public InvisibleExpireRound:number;//隐身状态的到期回合（表示到了该回合，隐身状态即消失），如果没有隐身状态，则返回0
  public SuitNo:number;//套装编号（若没有则返回0）
  public GraphTitle:number;//当前的图片称号id（若没有则返回0）
  public TextTitle:number;//当前的文字称号id（若没有则返回0）
  public UserDefTitle:string;//当前的自定义称号（若没有则返回空串）
  public OnlineFlag:number;//在线标记（1：在线，2：离线）
  public IsPlotBo:number;//是否剧情bo（1：是，0：否）
  public CanBeCtrled:number;//是否可操控（1：是，0：否），目前仅针对剧情bo，如果不是剧情bo，则统一返回0
   public item_1 : S20007_1_1[];
  public AerocraftNo:number;//飞行器编号0为没有
  public phy_att:number;//
  public mag_att:number;//
  public phy_def:number;//
  public mag_def:number;//
  public heal_value:number;//
  public LookIdx:number;//
  public transfiguration_no:number;//
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["BoType",MessageBase.UINT8],
      ["OwnerPlayerBoId",MessageBase.UINT16],
      ["Pos",MessageBase.UINT8],
      ["Name",MessageBase.STRING],
      ["Sex",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["ParentObjId",MessageBase.UINT64],
      ["ParentPartnerNo",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Anger",MessageBase.UINT32],
      ["AngerLim",MessageBase.UINT32],
      ["Weapon",MessageBase.UINT32],
      ["HeadWear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["BackWear",MessageBase.UINT32],
      ["ParCultivateLv",MessageBase.UINT8],
      ["ParCultivateLayer",MessageBase.UINT8],
      ["ParEvolveLv",MessageBase.UINT8],
      ["ParNature",MessageBase.UINT8],
      ["ParQuality",MessageBase.UINT8],
      ["IsMainPar",MessageBase.UINT8],
      ["IsInvisible",MessageBase.UINT8],
      ["InvisibleExpireRound",MessageBase.UINT16],
      ["SuitNo",MessageBase.UINT8],
      ["GraphTitle",MessageBase.UINT32],
      ["TextTitle",MessageBase.UINT32],
      ["UserDefTitle",MessageBase.STRING],
      ["OnlineFlag",MessageBase.UINT8],
      ["IsPlotBo",MessageBase.UINT8],
      ["CanBeCtrled",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20007_1_1]],
      ["AerocraftNo",MessageBase.UINT32],
      ["phy_att",MessageBase.UINT32],
      ["mag_att",MessageBase.UINT32],
      ["phy_def",MessageBase.UINT32],
      ["mag_def",MessageBase.UINT32],
      ["heal_value",MessageBase.UINT32],
      ["LookIdx",MessageBase.UINT8],
      ["transfiguration_no",MessageBase.UINT32],

    ]
}
export class C20007_2_1 extends MessageBase{
}
export class S20007_2_1 extends MessageBase{
  public BuffNo:number;//buff编号
  public ExpireRound:number;//buff的到期回合（表示到了该回合，buff即消失）
  public ProtectionRound:number;//buff的保护回合在此之前不会被驱散
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],

    ]
}
export class C20007_2 extends MessageBase{
}
export class S20007_2 extends MessageBase{
  public BoId:number;//战斗对象id
  public BoType:number;//战斗对象类型（1：玩家，2：宠物，3：NPC，4：怪物，5：普通boss，7：雇佣玩家，8：世界boss）
  public OwnerPlayerBoId:number;//所属玩家的boid，目前是用于表明战场上的宠物的归属，对于非宠物bo，统一返回0
  public Pos:number;//战斗位置（1~15）
  public Name:string;//名字
  public Sex:number;//性别（1：男，2：女）
  public Race:number;//种族
  public Faction:number;//门派
  public Lv:number;//等级
  public ParentObjId:number;//父对象id（对于玩家bo，表示对应的玩家id，对于怪物bo，表示对应的战斗怪模板编号，对于宠物bo，表示对应的宠物id）
  public ParentPartnerNo:number;//宠物bo对应的父宠物对象的编号（策划所配置的编号），如果不是宠物bo，则统一返回0
  public Hp:number;//当前血量
  public HpLim:number;//血量上限
  public Mp:number;//当前魔法值
  public MpLim:number;//魔法上限
  public Anger:number;//当前怒气值
  public AngerLim:number;//怒气上限
  public Weapon:number;//武器对应的物品编号（若没有则返回0）
  public HeadWear:number;//头饰对应的物品编号（若没有则返回0）
  public Clothes:number;//服饰对应的物品编号（若没有则返回0）
  public BackWear:number;//背饰对应的物品编号（若没有则返回0）
  public ParCultivateLv:number;//宠物的修炼等级（如果不是宠物，固定返回0）
  public ParCultivateLayer:number;//宠物的修炼层数（如果不是宠物，固定返回0，如果是宠物，但没有修炼过，也返回0）
  public ParEvolveLv:number;//宠物的进化等级（如果不是宠物，固定返回0）
  public ParNature:number;//宠物性格（如果不是宠物，固定返回0）
  public ParQuality:number;//宠物的品质（1：白2:绿3:蓝4:紫5:橙6:红），如果不是宠物，则固定返回0
  public IsMainPar:number;//是否为主宠（1：是，0：否）
  public IsInvisible:number;//是否有隐身状态（1：是，0：否）
  public InvisibleExpireRound:number;//隐身状态的到期回合（表示到了该回合，隐身状态即消失），如果没有隐身状态，则返回0
  public SuitNo:number;//套装编号（若没有则返回0）
  public GraphTitle:number;//当前的图片称号id（若没有则返回0）
  public TextTitle:number;//当前的文字称号id（若没有则返回0）
  public UserDefTitle:string;//当前的自定义称号（若没有则返回空串）
  public OnlineFlag:number;//在线标记（1：在线，2：离线）
  public IsPlotBo:number;//是否剧情bo（1：是，0：否）
  public CanBeCtrled:number;//是否可操控（1：是，0：否），目前仅针对剧情bo，如果不是剧情bo，则统一返回0
   public item_1 : S20007_2_1[];
  public AerocraftNo:number;//飞行器编号0为没有
  public phy_att:number;//
  public mag_att:number;//
  public phy_def:number;//
  public mag_def:number;//
  public heal_value:number;//
  public LookIdx:number;//
  public transfiguration_no:number;//
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["BoType",MessageBase.UINT8],
      ["OwnerPlayerBoId",MessageBase.UINT16],
      ["Pos",MessageBase.UINT8],
      ["Name",MessageBase.STRING],
      ["Sex",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["ParentObjId",MessageBase.UINT64],
      ["ParentPartnerNo",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Anger",MessageBase.UINT32],
      ["AngerLim",MessageBase.UINT32],
      ["Weapon",MessageBase.UINT32],
      ["HeadWear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["BackWear",MessageBase.UINT32],
      ["ParCultivateLv",MessageBase.UINT8],
      ["ParCultivateLayer",MessageBase.UINT8],
      ["ParEvolveLv",MessageBase.UINT8],
      ["ParNature",MessageBase.UINT8],
      ["ParQuality",MessageBase.UINT8],
      ["IsMainPar",MessageBase.UINT8],
      ["IsInvisible",MessageBase.UINT8],
      ["InvisibleExpireRound",MessageBase.UINT16],
      ["SuitNo",MessageBase.UINT8],
      ["GraphTitle",MessageBase.UINT32],
      ["TextTitle",MessageBase.UINT32],
      ["UserDefTitle",MessageBase.STRING],
      ["OnlineFlag",MessageBase.UINT8],
      ["IsPlotBo",MessageBase.UINT8],
      ["CanBeCtrled",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20007_2_1]],
      ["AerocraftNo",MessageBase.UINT32],
      ["phy_att",MessageBase.UINT32],
      ["mag_att",MessageBase.UINT32],
      ["phy_def",MessageBase.UINT32],
      ["mag_def",MessageBase.UINT32],
      ["heal_value",MessageBase.UINT32],
      ["LookIdx",MessageBase.UINT8],
      ["transfiguration_no",MessageBase.UINT32],

    ]
}
// ---------- 查询战场描述信息 -----------------
//-define（PT_BT_QRY_BATTLE_FIELD_DESC, 20007）.
// 协议号: 20007
export class C20007 extends MessageBase{
}
export class S20007 extends MessageBase{
  public BattleId:number;//战斗id
  public BattleType:number;//战斗类型
  public BattleSubType:number;//战斗子类型
  public MyBoId:number;//玩家本人的战斗对象id
  public HostZf:number;//主队阵法
  public GuestZf:number;//客队阵法
  public MaxRound:number;//最大回合数
  public NthWave:number;//如果是pve表示这一波是属于第几波
   public item_1 : S20007_1[];
   public item_2 : S20007_2[];
  public static DES : Array<any> =
     [
      ["BattleId",MessageBase.UINT32],
      ["BattleType",MessageBase.UINT8],
      ["BattleSubType",MessageBase.UINT8],
      ["MyBoId",MessageBase.UINT16],
      ["HostZf",MessageBase.UINT32],
      ["GuestZf",MessageBase.UINT32],
      ["MaxRound",MessageBase.UINT16],
      ["NthWave",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20007_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S20007_2]],

    ]
}
//-------- 通知客户端：某战斗对象已经准备好了（即已经下达当前回合的指令了） -------------
//-define（PT_BT_NOTIFY_BO_IS_READY, 20008）.
// 协议号: 20008
export class C20008 extends MessageBase{
}
export class S20008 extends MessageBase{
  public BoId:number;//刚做好准备的战斗对象id
  public CmdType:number;//下达的指令类型（1:使用技能，2:使用物品，3:防御，4：保护，5：逃跑，6：捕捉宠物，7：召唤宠物，8：普通攻击）
  public CmdPara:number;//参数（若是使用技能，表示技能id，若是使用物品，表示所使用物品的编号，若是召唤宠物，表示要召唤的宠物id，其他情况则统一发0）
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["CmdType",MessageBase.UINT8],
      ["CmdPara",MessageBase.UINT64],

    ]
}
// ---------- 通知客户端：当前回合的行动开始（服务端随后会开始发送一系列的战报） -----------------
//-define（PT_BT_NOTIFY_ROUND_ACTION_BEGIN, 20009）.
// 协议号: 20009
export class C20009 extends MessageBase{
}
export class S20009 extends MessageBase{
}
//无
// ---------- 通知客户端：当前回合的行动结束（表明当前回合的战报已发送完毕） -----------------
//-define（PT_BT_NOTIFY_ROUND_ACTION_END, 20010）.
// 协议号: 20010
export class C20010 extends MessageBase{
}
export class S20010 extends MessageBase{
}
//无
// ---------- 通知客户端：新回合开始（如果玩家非自动战斗，则客户端收到此协议后重新显示操作的倒计时，以备玩家下达新回合的指令） -----------------
//-define（PT_BT_NOTIFY_NEW_ROUND_BEGIN, 20011）.
// 协议号: 20011
export class C20011 extends MessageBase{
}
export class S20011 extends MessageBase{
  public NewRoundCounter:number;//新回合的计数（表示当前到了第几回合）
  public static DES : Array<any> =
     [
      ["NewRoundCounter",MessageBase.UINT16],

    ]
}
// !!!!!注：buff结算是在新回合开始后就立即做的!!!!!
// ---------- 通知客户端：buff结算开始（服务端随后会开始发送一系列与buff结算相关的协议） -----------------
//-define（PT_BT_NOTIFY_SETTLE_BUFF_BEGIN, 20012）.
// 协议号: 20012
export class C20012 extends MessageBase{
}
export class S20012 extends MessageBase{
}
//无
// ---------- 通知客户端：buff结算结束 -----------------
//-define（PT_BT_NOTIFY_SETTLE_BUFF_END, 20013）.
// 协议号: 20013
export class C20013 extends MessageBase{
}
export class S20013 extends MessageBase{
}
export class C20014_1_1 extends MessageBase{
}
export class S20014_1_1 extends MessageBase{
  public WhenToTalk:number;//冒对话气泡的时机：1=>回合开始时，2=>实际行动时
  public TalkCont:number;//对话内容的编号
  public static DES : Array<any> =
     [
      ["WhenToTalk",MessageBase.UINT8],
      ["TalkCont",MessageBase.UINT16],

    ]
}
export class C20014_1 extends MessageBase{
}
export class S20014_1 extends MessageBase{
  public BoId:number;//boid
   public item_1 : S20014_1_1[];
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20014_1_1]],

    ]
}
//无
// ---------- 通知客户端：所有bo的当前回合的对话气泡ai的信息（注意：如果全部bo在当前回合都没有对话气泡ai，则服务端不返回此协议） -----------------
//-define（PT_BT_NOTIFY_TALK_AI_INFO, 20014）.
// 协议号: 20014
export class C20014 extends MessageBase{
}
export class S20014 extends MessageBase{
   public item_1 : S20014_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20014_1]],

    ]
}
// ---------- 通知客户端：新回合开始的相关工作已处理完毕 -----------------
//-define（PT_BT_NOTIFY_ON_NEW_ROUND_BEGIN_JOBS_DONE, 20089）.
// 协议号: 20089
export class C20089 extends MessageBase{
}
export class S20089 extends MessageBase{
}
//无
// ---------- 客户端通知服务端：播放战报完毕 -----------------
// C2S: client to server
//-define（PT_BT_C2S_NOTIFY_SHOW_BR_DONE, 20090）.
// 协议号: 20090
export class C20090 extends MessageBase{
}
export class S20090 extends MessageBase{
}
//无
// ---------- 服务端通知客户端：某bo播放战报完毕 -----------------
// S2C: server to client
//-define（PT_BT_S2C_NOTIFY_BO_SHOW_BR_DONE, 20091）.
// 协议号: 20091
export class C20091 extends MessageBase{
}
export class S20091 extends MessageBase{
  public BoId:number;//播放完战报的玩家所对应的战斗对象id
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],

    ]
}
// ---------- 通知客户端：某bo的在线状态改变了 -----------------
//-define（PT_BT_NOTIFY_BO_ONLINE_FLAG_CHANGED, 20092）.
// 协议号: 20092
export class C20092 extends MessageBase{
}
export class S20092 extends MessageBase{
  public BoId:number;//战斗对象id
  public NewFlag:number;//新的在线状态（1：在线，2：离线）
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["NewFlag",MessageBase.UINT8],

    ]
}
export class C20015_1_1 extends MessageBase{
}
export class S20015_1_1 extends MessageBase{
    //攻击者新加的buff列表（通常是增益buff）
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20015_1_2 extends MessageBase{
}
export class S20015_1_2 extends MessageBase{
    //攻击者移除的buff列表
  public AtterBuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["AtterBuffRemoved",MessageBase.UINT32],

    ]
}
export class C20015_1_3 extends MessageBase{
}
export class S20015_1_3 extends MessageBase{
    //防守者新加的buff列表（通常是减益buff）
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20015_1_4 extends MessageBase{
}
export class S20015_1_4 extends MessageBase{
    //防守者移除的buff列表（通常是护盾类buff或增益buff）
  public DeferBuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["DeferBuffRemoved",MessageBase.UINT32],

    ]
}
export class C20015_1_5 extends MessageBase{
}
export class S20015_1_5 extends MessageBase{
    //防守者更新的buff列表（通常是护盾类buff）
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20015_1_6 extends MessageBase{
}
export class S20015_1_6 extends MessageBase{
    //保护者添加的buff列表（通常是因死亡而导致移除的buff）
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20015_1_7 extends MessageBase{
}
export class S20015_1_7 extends MessageBase{
    //保护者移除的buff列表（通常是因死亡而导致移除的buff）
  public ProtectorBuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["ProtectorBuffRemoved",MessageBase.UINT32],

    ]
}
export class C20015_1_8_1 extends MessageBase{
}
export class S20015_1_8_1 extends MessageBase{
    //被溅射者移除的buff列表
  public BeSplashBo_BuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["BeSplashBo_BuffRemoved",MessageBase.UINT32],

    ]
}
export class C20015_1_8 extends MessageBase{
}
export class S20015_1_8 extends MessageBase{
    //溅射伤害信息列表
  public BeSplashBo_Id:number;//被溅射者的boid
  public SplashDam_Hp:number;//溅射伤害值（伤血）
  public SplashDam_Mp:number;//溅射伤害值（伤蓝）
  public SplashDam_Anger:number;//溅射伤害值（减少怒气，负数表示增加怒气）
  public BeSplashBo_HpLeft:number;//被溅射者的剩余血量
  public BeSplashBo_MpLeft:number;//被溅射者的剩余蓝量
  public BeSplashBo_AngerLeft:number;//被溅射者的剩余怒气
  public BeSplashBo_DieStatus:number;//被溅射者的死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失）
  public BeSplashBo_IsApplyReborn:number;//被溅射者是否应用了重生效果（1：是，0：否）
   public item_1 : S20015_1_8_1[];
  public static DES : Array<any> =
     [
      ["BeSplashBo_Id",MessageBase.UINT16],
      ["SplashDam_Hp",MessageBase.UINT32],
      ["SplashDam_Mp",MessageBase.UINT32],
      ["SplashDam_Anger",MessageBase.UINT32],
      ["BeSplashBo_HpLeft",MessageBase.UINT32],
      ["BeSplashBo_MpLeft",MessageBase.UINT32],
      ["BeSplashBo_AngerLeft",MessageBase.UINT32],
      ["BeSplashBo_DieStatus",MessageBase.UINT8],
      ["BeSplashBo_IsApplyReborn",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1_8_1]],

    ]
}
export class C20015_1 extends MessageBase{
}
export class S20015_1 extends MessageBase{
    //战报数组（战报格式见如下说明）
  public ReportType:number;//战报类型（固定为1，表示是bo执行物理攻击）
  public AttSubType:number;//攻击子类型（0:无意义，1:普通攻击，2：反击，3：连击，4：追击）
  public AttResult:number;//攻击结果（1：命中，2：闪避，3：暴击）
  public AtterId:number;//攻击者的boid（boid表示battleobject'sid，即战斗对象的id，下同）
  public DeferId:number;//防守者的boid
  public ProtectorId:number;//保护者的boid，如果没有保护者，则统一返回0
  public DamToDefer:number;//对防守者的伤害值，如果为负数，则表示加血，所加的值为对应的绝对值
  public DamToDefer_Mp:number;//对防守者的伤害值（伤蓝），如果为负数，则表示加蓝，所加的值为对应的绝对值
  public DamToDefer_Anger:number;//对防守者的伤害值（减少怒气），如果为负数，则表示加怒气，所加的值为对应的绝对值
  public DamToProtector:number;//对保护者的伤害值
  public DamToProtector_Anger:number;//对保护者的伤害值（减少怒气），如果为负数，则表示加怒气，所加的值为对应的绝对值
  public RetDam:number;//反弹的伤害值（对攻击者造成伤害），如果没有，则固定为0
  public RetDam_Anger:number;//反弹的伤害值（对攻击者造成伤害），如果没有，则固定为0（减少怒气），如果为负数，则表示加怒气，所加的值为对应的绝对值
  public AbsorbedHp:number;//攻击者吸血的数值（如果没有吸血，则返回0）
  public AtterHpLeft:number;//攻击者的剩余血量
  public AtterMpLeft:number;//攻击者的剩余魔法
  public AtterAngerLeft:number;//攻击者的剩余怒气
  public AtterDieStatus:number;//攻击者的死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失）
  public IsAtterApplyReborn:number;//攻击者是否应用了重生效果（1：是，0：否）
  public DeferHpLeft:number;//防守者的剩余血量
  public DeferMpLeft:number;//防守者的剩余魔法
  public DeferAngerLeft:number;//防守者的剩余怒气
  public DeferDieStatus:number;//防守者的死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失）
  public IsDeferApplyReborn:number;//防守者是否应用了重生效果（1：是，0：否）
  public ProtectorHpLeft:number;//保护者的剩余血量，如果没有保护者，则统一返回0
  public ProtectorAngerLeft:number;//保护者的剩余怒气，如果没有保护者，则统一返回0
  public ProtectorDieStatus:number;//保护者的死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失），如果没有保护者，则统一返回0
  public IsProtectorApplyReborn:number;//保护者是否应用了重生效果（1：是，0：否），如果没有保护者，则统一返回0
   public item_1 : S20015_1_1[];
   public item_2 : S20015_1_2[];
   public item_3 : S20015_1_3[];
   public item_4 : S20015_1_4[];
   public item_5 : S20015_1_5[];
   public item_6 : S20015_1_6[];
   public item_7 : S20015_1_7[];
   public item_8 : S20015_1_8[];
  public static DES : Array<any> =
     [
      ["ReportType",MessageBase.UINT8],
      ["AttSubType",MessageBase.UINT8],
      ["AttResult",MessageBase.UINT8],
      ["AtterId",MessageBase.UINT16],
      ["DeferId",MessageBase.UINT16],
      ["ProtectorId",MessageBase.UINT16],
      ["DamToDefer",MessageBase.UINT32],
      ["DamToDefer_Mp",MessageBase.UINT32],
      ["DamToDefer_Anger",MessageBase.UINT32],
      ["DamToProtector",MessageBase.UINT32],
      ["DamToProtector_Anger",MessageBase.UINT32],
      ["RetDam",MessageBase.UINT32],
      ["RetDam_Anger",MessageBase.UINT32],
      ["AbsorbedHp",MessageBase.UINT32],
      ["AtterHpLeft",MessageBase.UINT32],
      ["AtterMpLeft",MessageBase.UINT32],
      ["AtterAngerLeft",MessageBase.UINT32],
      ["AtterDieStatus",MessageBase.UINT8],
      ["IsAtterApplyReborn",MessageBase.UINT8],
      ["DeferHpLeft",MessageBase.UINT32],
      ["DeferMpLeft",MessageBase.UINT32],
      ["DeferAngerLeft",MessageBase.UINT32],
      ["DeferDieStatus",MessageBase.UINT8],
      ["IsDeferApplyReborn",MessageBase.UINT8],
      ["ProtectorHpLeft",MessageBase.UINT32],
      ["ProtectorAngerLeft",MessageBase.UINT32],
      ["ProtectorDieStatus",MessageBase.UINT8],
      ["IsProtectorApplyReborn",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1_2]],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1_3]],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1_4]],
        ["item_5",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1_5]],
        ["item_6",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1_6]],
        ["item_7",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1_7]],
        ["item_8",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1_8]],

    ]
}
// ---------- 发送战报给客户端：执行物理攻击 -----------------
// BR: battle report
//-define（PT_BT_NOTIFY_BR_DO_PHY_ATT, 20015）.
// 协议号: 20015
export class C20015 extends MessageBase{
}
export class S20015 extends MessageBase{
  public CurActorId:number;//当前行动者的id（战斗对象id）
  public CmdType:number;//实际所执行的指令类型（1:使用技能，2:使用物品，3:防御，4：保护，5：逃跑，6：捕捉宠物，7：召唤宠物，8：普通攻击）
  public CmdPara:number;//实际所执行的指令参数（若为使用技能，则表示技能id，若为使用物品，则表示物品id，其他则统一发0）
  public CurPickTarget:number;//下达指令时所选的目标战斗对象id，没有则发0
   public item_1 : S20015_1[];
  public static DES : Array<any> =
     [
      ["CurActorId",MessageBase.UINT16],
      ["CmdType",MessageBase.UINT8],
      ["CmdPara",MessageBase.UINT64],
      ["CurPickTarget",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20015_1]],

    ]
}
export class C20016_1_1 extends MessageBase{
}
export class S20016_1_1 extends MessageBase{
    //攻击者新加的buff列表（通常是增益buff）
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20016_1_2 extends MessageBase{
}
export class S20016_1_2 extends MessageBase{
    //攻击者移除的buff列表
  public AtterBuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["AtterBuffRemoved",MessageBase.UINT32],

    ]
}
export class C20016_1_3_1 extends MessageBase{
}
export class S20016_1_3_1 extends MessageBase{
    //攻击者新加的buff列表（通常是增益buff）
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20016_1_3_2 extends MessageBase{
}
export class S20016_1_3_2 extends MessageBase{
    //攻击者移除的buff列表
  public AtterBuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["AtterBuffRemoved",MessageBase.UINT32],

    ]
}
export class C20016_1_3_3 extends MessageBase{
}
export class S20016_1_3_3 extends MessageBase{
    //防守者新加的buff列表（通常是减益buff）
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20016_1_3_4 extends MessageBase{
}
export class S20016_1_3_4 extends MessageBase{
    //防守者移除的buff列表（通常是护盾类buff或增益buff）
  public DeferBuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["DeferBuffRemoved",MessageBase.UINT32],

    ]
}
export class C20016_1_3_5 extends MessageBase{
}
export class S20016_1_3_5 extends MessageBase{
    //防守者更新的buff列表（通常是护盾类buff）
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20016_1_3 extends MessageBase{
}
export class S20016_1_3 extends MessageBase{
    //对多个目标的伤害详情列表
  public DeferId:number;//防守者的boid
  public AttResult:number;//攻击结果（1：命中，2：闪避，3：暴击）
  public DamToDefer:number;//对防守者的伤害值，如果为负数，则表示加血，所加的值为对应的绝对值
  public DamToDefer_Mp:number;//对防守者的伤害值（伤蓝），如果为负数，则表示加蓝，所加的值为对应的绝对值
  public DamToDefer_Anger:number;//对防守者的伤害值（伤蓝），如果为负数，则表示加蓝，所加的值为对应的绝对值
  public AtterHpLeft:number;//攻击者的剩余血量
  public AtterMpLeft:number;//攻击者的剩余魔法
  public AtterAngerLeft:number;//攻击者的剩余怒气
  public AtterDieStatus:number;//攻击者的死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失）
  public IsAtterApplyReborn:number;//攻击者是否应用了重生效果（1：是，0：否）
  public RetDam:number;//反弹的伤害值（对攻击者造成伤害），如果没有，则固定为0
  public AbsorbedHp:number;//攻击者吸血的数值（如果没有吸血，则返回0）
  public DeferHpLeft:number;//防守者的剩余血量
  public DeferMpLeft:number;//防守者的剩余魔法
  public DeferAngerLeft:number;//防守者的剩余怒气
  public DeferDieStatus:number;//防守者的死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失）
  public IsDeferApplyReborn:number;//防守者是否应用了重生效果（1：是，0：否）
   public item_1 : S20016_1_3_1[];
   public item_2 : S20016_1_3_2[];
   public item_3 : S20016_1_3_3[];
   public item_4 : S20016_1_3_4[];
   public item_5 : S20016_1_3_5[];
  public static DES : Array<any> =
     [
      ["DeferId",MessageBase.UINT16],
      ["AttResult",MessageBase.UINT8],
      ["DamToDefer",MessageBase.UINT32],
      ["DamToDefer_Mp",MessageBase.UINT32],
      ["DamToDefer_Anger",MessageBase.UINT32],
      ["AtterHpLeft",MessageBase.UINT32],
      ["AtterMpLeft",MessageBase.UINT32],
      ["AtterAngerLeft",MessageBase.UINT32],
      ["AtterDieStatus",MessageBase.UINT8],
      ["IsAtterApplyReborn",MessageBase.UINT8],
      ["RetDam",MessageBase.UINT32],
      ["AbsorbedHp",MessageBase.UINT32],
      ["DeferHpLeft",MessageBase.UINT32],
      ["DeferMpLeft",MessageBase.UINT32],
      ["DeferAngerLeft",MessageBase.UINT32],
      ["DeferDieStatus",MessageBase.UINT8],
      ["IsDeferApplyReborn",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_3_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_3_2]],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_3_3]],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_3_4]],
        ["item_5",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_3_5]],

    ]
}
export class C20016_1_4_1 extends MessageBase{
}
export class S20016_1_4_1 extends MessageBase{
    //被溅射者移除的buff列表
  public BeSplashBo_BuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["BeSplashBo_BuffRemoved",MessageBase.UINT32],

    ]
}
export class C20016_1_4 extends MessageBase{
}
export class S20016_1_4 extends MessageBase{
    //溅射伤害信息列表
  public BeSplashBo_Id:number;//被溅射者的boid
  public SplashDam_Hp:number;//溅射伤害值（伤血）
  public SplashDam_Mp:number;//溅射伤害值（伤蓝）
  public SplashDam_Anger:number;//溅射伤害值（减少怒气，负数表示增加怒气）
  public BeSplashBo_HpLeft:number;//被溅射者的剩余血量
  public BeSplashBo_MpLeft:number;//被溅射者的剩余蓝量
  public BeSplashBo_AngerLeft:number;//被溅射者的剩余怒气
  public BeSplashBo_DieStatus:number;//被溅射者的死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失）
  public BeSplashBo_IsApplyReborn:number;//被溅射者是否应用了重生效果（1：是，0：否）
   public item_1 : S20016_1_4_1[];
  public static DES : Array<any> =
     [
      ["BeSplashBo_Id",MessageBase.UINT16],
      ["SplashDam_Hp",MessageBase.UINT32],
      ["SplashDam_Mp",MessageBase.UINT32],
      ["SplashDam_Anger",MessageBase.UINT32],
      ["BeSplashBo_HpLeft",MessageBase.UINT32],
      ["BeSplashBo_MpLeft",MessageBase.UINT32],
      ["BeSplashBo_AngerLeft",MessageBase.UINT32],
      ["BeSplashBo_DieStatus",MessageBase.UINT8],
      ["BeSplashBo_IsApplyReborn",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_4_1]],

    ]
}
export class C20016_1 extends MessageBase{
}
export class S20016_1 extends MessageBase{
    //战报数组（战报格式见如下说明）
  public ReportType:number;//战报类型（固定为2，表示是bo执行法术攻击）
  public IsComboAtt:number;//此轮攻击是否为连击（1:是，0：否）
  public AtterId:number;//攻击者的boid
   public item_1 : S20016_1_1[];
   public item_2 : S20016_1_2[];
   public item_3 : S20016_1_3[];
   public item_4 : S20016_1_4[];
  public static DES : Array<any> =
     [
      ["ReportType",MessageBase.UINT8],
      ["IsComboAtt",MessageBase.UINT8],
      ["AtterId",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_2]],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_3]],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1_4]],

    ]
}
// 执行物理攻击， 格式如下：
// buff详情的二进制流格式：
// ---------- 发送战报给客户端：执行（一轮）法术攻击 -----------------
// BR: battle report
//-define（PT_BT_NOTIFY_BR_DO_MAG_ATT, 20016）.
// 协议号: 20016
export class C20016 extends MessageBase{
}
export class S20016 extends MessageBase{
  public CurActorId:number;//当前行动者的id（战斗对象id）
  public CmdType:number;//指令类型（1:使用技能，2:使用物品，3:防御，4：保护，5：逃跑，6：捕捉宠物，7:技能第二次效果）
  public CmdPara:number;//指令参数（若为使用技能，则表示技能id，若为使用物品，则表示物品id，其他则统一发0）
  public CurPickTarget:number;//下达指令时所选的目标战斗对象id，没有则发0
   public item_1 : S20016_1[];
  public static DES : Array<any> =
     [
      ["CurActorId",MessageBase.UINT16],
      ["CmdType",MessageBase.UINT8],
      ["CmdPara",MessageBase.UINT64],
      ["CurPickTarget",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20016_1]],

    ]
}
export class C20017_1_1_1 extends MessageBase{
}
export class S20017_1_1_1 extends MessageBase{
    //目标新加的buff列表
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20017_1_1_2 extends MessageBase{
}
export class S20017_1_1_2 extends MessageBase{
    //目标移除的buff列表
  public BuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["BuffRemoved",MessageBase.UINT32],

    ]
}
export class C20017_1_1_3 extends MessageBase{
}
export class S20017_1_1_3 extends MessageBase{
    //目标更新的buff列表
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20017_1_1 extends MessageBase{
}
export class S20017_1_1 extends MessageBase{
    //施法详情
  public TargetBoId:number;//目标boid
   public item_1 : S20017_1_1_1[];
   public item_2 : S20017_1_1_2[];
   public item_3 : S20017_1_1_3[];
  public static DES : Array<any> =
     [
      ["TargetBoId",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20017_1_1_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S20017_1_1_2]],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S20017_1_1_3]],

    ]
}
export class C20017_1 extends MessageBase{
}
export class S20017_1 extends MessageBase{
    //战报数组（战报格式见如下说明）
  public ReportType:number;//战报类型（固定为3，表示是bo释放或驱散buff）
  public CasterId:number;//施法者的boid
  public CastResult:number;//施法结果（0：成功，1：失败）
  public NeedPerfCasting:number;//客户端是否需要做对应的施法表现？（1：是，0：否）
  public CasterHpLeft:number;//施法者的剩余血量
  public CasterMpLeft:number;//施法者的剩余蓝量
  public CasterAngerLeft:number;//施法者的剩余怒气
   public item_1 : S20017_1_1[];
  public static DES : Array<any> =
     [
      ["ReportType",MessageBase.UINT8],
      ["CasterId",MessageBase.UINT16],
      ["CastResult",MessageBase.UINT8],
      ["NeedPerfCasting",MessageBase.UINT8],
      ["CasterHpLeft",MessageBase.UINT32],
      ["CasterMpLeft",MessageBase.UINT32],
      ["CasterAngerLeft",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20017_1_1]],

    ]
}
// ---------- 发送战报给客户端：施法（释放或驱散buff） -----------------
// BR: battle report
//-define（PT_BT_NOTIFY_BR_CAST_BUFFS, 20017）.
// 协议号: 20017
export class C20017 extends MessageBase{
}
export class S20017 extends MessageBase{
  public CurActorId:number;//当前行动者的id（战斗对象id）
  public CmdType:number;//指令类型（1:使用技能，2:使用物品，3:防御，4：保护，5：逃跑，6：捕捉宠物）
  public CmdPara:number;//指令参数（若为使用技能，则表示技能id，若为使用物品，则表示物品id，其他则统一发0）
  public CurPickTarget:number;//下达指令时所选的目标战斗对象id，没有则发0
   public item_1 : S20017_1[];
  public static DES : Array<any> =
     [
      ["CurActorId",MessageBase.UINT16],
      ["CmdType",MessageBase.UINT8],
      ["CmdPara",MessageBase.UINT64],
      ["CurPickTarget",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20017_1]],

    ]
}
export class C20018_1 extends MessageBase{
}
export class S20018_1 extends MessageBase{
    //战报数组（战报格式见如下说明）
  public ReportType:number;//战报类型（固定为7，表示是bo逃跑）
  public BoId:number;//逃跑者的boid
  public Result:number;//逃跑结果（0：成功，1：失败）
  public static DES : Array<any> =
     [
      ["ReportType",MessageBase.UINT8],
      ["BoId",MessageBase.UINT16],
      ["Result",MessageBase.UINT8],

    ]
}
// ---------- 发送战报给客户端：战斗对象逃跑 -----------------\
// BR: battle report
//-define（PT_BT_NOTIFY_BR_ESCAPE, 20018）.
// 协议号: 20018
export class C20018 extends MessageBase{
}
export class S20018 extends MessageBase{
  public CurActorId:number;//当前行动者的id（战斗对象id）
  public CmdType:number;//指令类型（1:使用技能，2:使用物品，3:防御，4：保护，5：逃跑，6：捕捉宠物）
  public CmdPara:number;//指令参数（若为使用技能，则表示技能id，若为使用物品，则表示物品id，其他则统一发0）
  public CurPickTarget:number;//下达指令时所选的目标战斗对象id，没有则发0
   public item_1 : S20018_1[];
  public static DES : Array<any> =
     [
      ["CurActorId",MessageBase.UINT16],
      ["CmdType",MessageBase.UINT8],
      ["CmdPara",MessageBase.UINT64],
      ["CurPickTarget",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20018_1]],

    ]
}
export class C20019_1_1_1 extends MessageBase{
}
export class S20019_1_1_1 extends MessageBase{
    //目标新加的buff列表
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20019_1_1_2 extends MessageBase{
}
export class S20019_1_1_2 extends MessageBase{
    //目标移除的buff列表
  public BuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["BuffRemoved",MessageBase.UINT32],

    ]
}
export class C20019_1_1 extends MessageBase{
}
export class S20019_1_1 extends MessageBase{
  public TargetBoId:number;//目标boid
  public IsCannotBeHeal:number;//目标是否无法被治疗（1：是，0：否）（10扣血血流不止状态13扣血并死亡11扣血并倒地12扣血并灵魂），如果目标无法被治疗，则客户端无视以下返回的信息
  public HealVal:number;//治疗量
  public NewHp:number;//目标新的血量
  public NewMp:number;//目标新的蓝量
  public NewAnger:number;//目标新的怒气
   public item_1 : S20019_1_1_1[];
   public item_2 : S20019_1_1_2[];
  public static DES : Array<any> =
     [
      ["TargetBoId",MessageBase.UINT16],
      ["IsCannotBeHeal",MessageBase.UINT8],
      ["HealVal",MessageBase.UINT32],
      ["NewHp",MessageBase.UINT32],
      ["NewMp",MessageBase.UINT32],
      ["NewAnger",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20019_1_1_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S20019_1_1_2]],

    ]
}
export class C20019_1 extends MessageBase{
}
export class S20019_1 extends MessageBase{
    //战报数组（战报格式见如下说明）
  public ReportType:number;//战报类型（固定为4，表示是bo执行治疗）
  public CasterId:number;//施法者的boid
  public HasReviveEff:number;//是否附带复活效果（1：是，0：否）
  public HealType:number;//治疗类型（1：加血，2：加蓝，3：加血加蓝）
  public CastResult:number;//施法结果（0：成功，1：失败）
  public HealerHpLeft:number;//治疗者（即当前行动者）的剩余血量
  public HealerMpLeft:number;//治疗者（即当前行动者）的剩余蓝量
  public HealerAngerLeft:number;//治疗者（即当前行动者）的剩余怒气
   public item_1 : S20019_1_1[];
  public static DES : Array<any> =
     [
      ["ReportType",MessageBase.UINT8],
      ["CasterId",MessageBase.UINT16],
      ["HasReviveEff",MessageBase.UINT8],
      ["HealType",MessageBase.UINT8],
      ["CastResult",MessageBase.UINT8],
      ["HealerHpLeft",MessageBase.UINT32],
      ["HealerMpLeft",MessageBase.UINT32],
      ["HealerAngerLeft",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20019_1_1]],

    ]
}
// ---------- 发送战报给客户端：治疗 -----------------
// BR: battle report
//-define（PT_BT_NOTIFY_BR_HEAL, 20019）.
// 协议号: 20019
export class C20019 extends MessageBase{
}
export class S20019 extends MessageBase{
  public CurActorId:number;//当前行动者的id（战斗对象id）
  public CmdType:number;//指令类型（1:使用技能，2:使用物品，3:防御，4：保护，5：逃跑，6：捕捉宠物）
  public CmdPara:number;//指令参数（若为使用技能，则表示技能id，若为使用物品，则表示物品id，其他则统一发0）
  public CurPickTarget:number;//下达指令时所选的目标战斗对象id，没有则发0
   public item_1 : S20019_1[];
  public static DES : Array<any> =
     [
      ["CurActorId",MessageBase.UINT16],
      ["CmdType",MessageBase.UINT8],
      ["CmdPara",MessageBase.UINT64],
      ["CurPickTarget",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20019_1]],

    ]
}
export class C20020_1_1 extends MessageBase{
}
export class S20020_1_1 extends MessageBase{
    //目标新加的buff列表
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20020_1_2 extends MessageBase{
}
export class S20020_1_2 extends MessageBase{
    //目标移除的buff列表
  public BuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["BuffRemoved",MessageBase.UINT32],

    ]
}
export class C20020_1_3 extends MessageBase{
}
export class S20020_1_3 extends MessageBase{
    //自己新加的buff列表
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20020_1_4 extends MessageBase{
}
export class S20020_1_4 extends MessageBase{
    //自己移除的buff列表
  public BuffRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["BuffRemoved",MessageBase.UINT32],

    ]
}
export class C20020_1 extends MessageBase{
}
export class S20020_1 extends MessageBase{
    //战报数组（战报格式见如下说明）
  public ReportType:number;//战报类型（固定为9，表示是bo使用物品）
  public CasterId:number;//施法者的boid
  public GoodsId:number;//物品id
  public GoodsNo:number;//物品编号
  public HasReviveEff:number;//是否附带复活效果（1：是，0：否）
  public TargetBoId:number;//目标boid
  public HealVal_Hp:number;//治疗量（hp），如果没有，则返回0
  public HealVal_Mp:number;//治疗量（mp），如果没有，则返回0
  public HealVal_Anger:number;//治疗量（怒气），如果没有，则返回0
  public NewHp:number;//目标新的血量
  public NewMp:number;//目标新的蓝量
  public NewAnger:number;//目标新的怒气值
   public item_1 : S20020_1_1[];
   public item_2 : S20020_1_2[];
   public item_3 : S20020_1_3[];
   public item_4 : S20020_1_4[];
  public static DES : Array<any> =
     [
      ["ReportType",MessageBase.UINT8],
      ["CasterId",MessageBase.UINT16],
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["HasReviveEff",MessageBase.UINT8],
      ["TargetBoId",MessageBase.UINT16],
      ["HealVal_Hp",MessageBase.UINT32],
      ["HealVal_Mp",MessageBase.UINT32],
      ["HealVal_Anger",MessageBase.UINT32],
      ["NewHp",MessageBase.UINT32],
      ["NewMp",MessageBase.UINT32],
      ["NewAnger",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20020_1_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S20020_1_2]],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S20020_1_3]],
        ["item_4",MessageBase.ARRAY,[MessageBase.CLASS,S20020_1_4]],

    ]
}
// ---------- 发送战报给客户端：使用物品 -----------------
// BR: battle report
//-define（PT_BT_NOTIFY_BR_USE_GOODS, 20020）.
// 协议号: 20020
export class C20020 extends MessageBase{
}
export class S20020 extends MessageBase{
  public CurActorId:number;//当前行动者的id（战斗对象id）
  public CmdType:number;//指令类型（1:使用技能，2:使用物品，3:防御，4：保护，5：逃跑，6：捕捉宠物）
  public CmdPara:number;//指令参数（若为使用技能，则表示技能id，若为使用物品，则表示物品id，其他则统一发0）
  public CurPickTarget:number;//下达指令时所选的目标战斗对象id，没有则发0
   public item_1 : S20020_1[];
  public static DES : Array<any> =
     [
      ["CurActorId",MessageBase.UINT16],
      ["CmdType",MessageBase.UINT8],
      ["CmdPara",MessageBase.UINT64],
      ["CurPickTarget",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20020_1]],

    ]
}
export class C20021_1_1_1 extends MessageBase{
}
export class S20021_1_1_1 extends MessageBase{
  public BuffNo:number;//buff编号
  public ExpireRound:number;//buff的到期回合（表示到了该回合，buff即消失）
  public ProtectionRound:number;//buff的保护回合
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],

    ]
}
export class C20021_1_1 extends MessageBase{
}
export class S20021_1_1 extends MessageBase{
  public BoId:number;//新召唤bo的id
  public Side:number;//新召唤bo的所属方（1：主队，2：客队）
  public BoType:number;//新召唤bo的类型（1：玩家，2：宠物，3：npc，4：怪物，5：boss）
  public OwnerPlayerBoId:number;//.........所属玩家的boid，目前是用于表明战场上的宠物的归属，对于非宠物bo，统一返回0
  public Pos:number;//.........位置（1~15）
  public Name:string;//.........名字
  public Sex:number;//.........性别（1：男，2：女）
  public Race:number;//.........种族
  public Faction:number;//.........门派
  public Lv:number;//.........等级
  public ParentObjId:number;//.........父对象id（对于玩家bo，表示对应的玩家id，对于怪物bo，表示对应的战斗怪模板编号，对于宠物bo，表示对应的宠物id）
  public ParentPartnerNo:number;//.........宠物bo对应的父宠物对象的编号（策划所配置的编号），如果不是宠物bo，则统一返回0
  public Hp:number;//.........当前血量
  public HpLim:number;//.........血量上限
  public Mp:number;//.........当前魔法值
  public MpLim:number;//.........魔法上限
  public Anger:number;//.........当前怒气值
  public AngerLim:number;//.........怒气上限
  public ParCultivateLv:number;//新召唤宠物的修炼等级（如果不是宠物，固定返回0）
  public ParCultivateLayer:number;//新召唤宠物的修炼层数（如果不是宠物，固定返回0，如果是宠物，但没有修炼过，也返回0）
  public ParEvolveLv:number;//新召唤宠物的进化等级（如果不是宠物，固定返回0）
  public ParNature:number;//新召唤宠物性格（如果不是宠物，固定返回0）
  public ParQuality:number;//宠物的品质（1：白2:绿3:蓝4:紫5:橙6:红），如果不是宠物，则固定返回0
  public IsMainPar:number;//是否主宠（1：是，0：否）
  public IsInvisible:number;//是否有隐身状态（1：是，0：否）
  public InvisibleExpireRound:number;//隐身状态的到期回合（表示到了该回合，隐身状态即消失），如果没有隐身状态，则返回0
  public Weapon:number;//武器对应的物品编号（若没有则返回0）
  public HeadWear:number;//头饰对应的物品编号（若没有则返回0）
  public Clothes:number;//服饰对应的物品编号（若没有则返回0）
  public BackWear:number;//背饰对应的物品编号（若没有则返回0）
  public phy_att:number;//
  public mag_att:number;//
  public phy_def:number;//
  public mag_def:number;//
  public heal_value:number;//治疗强度
   public item_1 : S20021_1_1_1[];
  public LookIdx:number;//外观参考造型
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["Side",MessageBase.UINT8],
      ["BoType",MessageBase.UINT8],
      ["OwnerPlayerBoId",MessageBase.UINT16],
      ["Pos",MessageBase.UINT8],
      ["Name",MessageBase.STRING],
      ["Sex",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Lv",MessageBase.UINT8],
      ["ParentObjId",MessageBase.UINT64],
      ["ParentPartnerNo",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Anger",MessageBase.UINT32],
      ["AngerLim",MessageBase.UINT32],
      ["ParCultivateLv",MessageBase.UINT8],
      ["ParCultivateLayer",MessageBase.UINT8],
      ["ParEvolveLv",MessageBase.UINT8],
      ["ParNature",MessageBase.UINT8],
      ["ParQuality",MessageBase.UINT8],
      ["IsMainPar",MessageBase.UINT8],
      ["IsInvisible",MessageBase.UINT8],
      ["InvisibleExpireRound",MessageBase.UINT16],
      ["Weapon",MessageBase.UINT32],
      ["HeadWear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["BackWear",MessageBase.UINT32],
      ["phy_att",MessageBase.UINT32],
      ["mag_att",MessageBase.UINT32],
      ["phy_def",MessageBase.UINT32],
      ["mag_def",MessageBase.UINT32],
      ["heal_value",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20021_1_1_1]],
      ["LookIdx",MessageBase.UINT8],

    ]
}
export class C20021_1 extends MessageBase{
}
export class S20021_1 extends MessageBase{
    //战报数组（战报格式见如下说明）
  public ReportType:number;//战报类型（固定为6，表示是召唤bo）
  public CasterId:number;//施法者的boid
  public Result:number;//召唤结果（0：成功，1：失败），如果失败，则后面的数组固定为空数组
   public item_1 : S20021_1_1[];
  public static DES : Array<any> =
     [
      ["ReportType",MessageBase.UINT8],
      ["CasterId",MessageBase.UINT16],
      ["Result",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20021_1_1]],

    ]
}
// ---------- 发送战报给客户端：召唤bo -----------------
// BR: battle report
//-define（PT_BT_NOTIFY_BR_SUMMON, 20021）.
// 协议号: 20021
export class C20021 extends MessageBase{
}
export class S20021 extends MessageBase{
  public CurActorId:number;//当前行动者的id（战斗对象id）
  public CmdType:number;//指令类型（1:使用技能，2:使用物品，3:防御，4：保护，5：逃跑，6：捕捉宠物）
  public CmdPara:number;//指令参数（若为使用技能，则表示技能id，若为使用物品，则表示物品id，其他则统一发0）
  public CurPickTarget:number;//下达指令时所选的目标战斗对象id，没有则发0
   public item_1 : S20021_1[];
  public static DES : Array<any> =
     [
      ["CurActorId",MessageBase.UINT16],
      ["CmdType",MessageBase.UINT8],
      ["CmdPara",MessageBase.UINT64],
      ["CurPickTarget",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20021_1]],

    ]
}
// ---------- 下达指令：空指令（当bo在新回合无法行动，或者因自动战斗等原因而导致不需下达任何指令时，客户端通过发此协议来模拟下达指令，以推动服务端继续执行战斗流程 -----------------
//-define（PT_BT_NOP_CMD, 20029）.
// 协议号: 20029
export class C20029 extends MessageBase{
  public ForBoId:number;//表示是为哪个bo下指令
  public static DES : Array<any> =
     [
      ["ForBoId",MessageBase.UINT16],

    ]
}
export class S20029 extends MessageBase{
  public RetCode:number;//成功则返回0，否则返回对应的失败原因代号（见下面的宏定义）
  public ForBoId:number;//表示是为哪个bo下指令
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ForBoId",MessageBase.UINT16],

    ]
}
// 涉及的失败原因：
// PC: prepare cmd
//-define（PC_FAIL_UNKNOWN, 1）.未知错误
//-define（PC_FAIL_ALRDY_DONE, 2）.已经下过指令了，不需再下达
//-define（PC_FAIL_SKILL_CDING, 3）.技能正在冷却中
//-define（PC_FAIL_SKILL_ID_INVALID, 4）.技能id非法
//-define（PC_FAIL_BATTLE_ALRDY_ENDS, 5）.战斗已经结束，操作无效
//-define（PC_FAIL_SHOULD_NOT_NOP, 6）.不应该下达空指令过来
//-define（PC_FAIL_SHOULD_BE_NOP, 7）.应该下达空指令过来
//-define（PC_FAIL_SERVER_NOT_WAITING_CLIENTS_FOR_PREPARE_CMD_DONE, 8）.服务端当前并不处于等待客户端下指令的状态
//-define（PC_FAIL_TARGET_NOT_EXISTS, 9）.所选的目标不存在（如：所要保护的目标不存在）
//-define（PC_FAIL_WRONG_PROTEGE, 10）.所保护的目标不正确（如：试图保护自己或者敌方的bo）
//-define（PC_FAIL_NO_SUCH_GOODS, 11）. 没有这个物品
//-define（PC_FAIL_GOODS_CANNOT_USE_IN_BATTLE, 12）.物品不能在战斗中使用
//-define（PC_FAIL_WRONG_CAMP_FOR_USE_GOODS, 13）.使用物品时，所选目标的阵营不对（如：物品配置为只能对友方使用，但所选目标是敌方）
//-define（PC_FAIL_WRONG_TARGET_OBJ_TYPE_FOR_USE_GOODS, 14）.使用物品时，所选目标的对象类型不对（如：物品配置为只能对玩家使用，但所选目标是宠物）
//-define（PC_FAIL_NO_SUCH_PARTNER, 15）. 没有这个宠物
//-define（PC_FAIL_PARTNER_ALRDY_JOINED_BATTLE, 16）. 宠物已经出战过了，不能被召唤
//-define（PC_FAIL_HAS_NOT_SUCH_SKILL, 17）. 你没有这个技能
//-define（PC_FAIL_LV_LIMIT_FOR_USE_GOODS, 18）. 使用物品时，等级不够
//-define（PC_FAIL_CANNOT_USE_GOODS_IN_OFFLINE_ARENA, 19）.天梯挑战中不允许使用物品
//-define（PC_FAIL_CANNOT_SUMMON_PAR_IN_OFFLINE_ARENA, 20）.天梯挑战中无法召唤宠物
//-define（PC_FAIL_CANNOT_SUMMON_PAR_IN_HIJACK, 21）.劫镖战斗中无法召唤宠物
//-define（PC_FAIL_CANNOT_SUMMON_PAR_FOR_TIMES_LIMIT, 22）.召唤宠物的次数已达上限（10次）
//-define（PC_FAIL_CANNOT_USE_GOODS_IN_HIJACK, 23）.劫镖战斗中不允许使用物品
// ---------- 下达指令：使用技能 -----------------
//-define（PT_BT_USE_SKILL, 20030）.
// 协议号: 20030
export class C20030 extends MessageBase{
  public ForBoId:number;//表示是为哪个bo下指令
  public SkillId:number;//所选的技能id（为0则表示是普通攻击）
  public TargetBoId:number;//目标战斗对象id（表示攻击或施法的目标）
  public static DES : Array<any> =
     [
      ["ForBoId",MessageBase.UINT16],
      ["SkillId",MessageBase.UINT32],
      ["TargetBoId",MessageBase.UINT16],

    ]
}
export class S20030 extends MessageBase{
  public RetCode:number;//成功则返回0，否则返回对应的失败原因代号（代号详见20029协议）
  public ForBoId:number;//表示是为哪个bo下指令
  public SkillId:number;//所选的技能id（为0则表示是普通攻击）
  public TargetBoId:number;//目标战斗对象id（表示攻击或施法的目标）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ForBoId",MessageBase.UINT16],
      ["SkillId",MessageBase.UINT32],
      ["TargetBoId",MessageBase.UINT16],

    ]
}
// ---------- 下达指令：使用物品 -----------------
//-define（PT_BT_USE_GOODS, 20031）.
// 协议号: 20031
export class C20031 extends MessageBase{
  public ForBoId:number;//表示是为哪个bo下指令
  public GoodsId:number;//所用物品的id
  public TargetBoId:number;//所针对的目标boid
  public static DES : Array<any> =
     [
      ["ForBoId",MessageBase.UINT16],
      ["GoodsId",MessageBase.UINT64],
      ["TargetBoId",MessageBase.UINT16],

    ]
}
export class S20031 extends MessageBase{
  public RetCode:number;//成功则返回0，否则返回对应的失败原因代号（代号详见20029协议）
  public ForBoId:number;//表示是为哪个bo下指令
  public GoodsId:number;//所用物品的id
  public TargetBoId:number;//所针对的目标boid
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ForBoId",MessageBase.UINT16],
      ["GoodsId",MessageBase.UINT64],
      ["TargetBoId",MessageBase.UINT16],

    ]
}
// ---------- 下达指令：保护 -----------------
//-define（PT_BT_PROTECT_OTHERS, 20032）.
// 协议号: 20032
export class C20032 extends MessageBase{
  public ForBoId:number;//表示是为哪个bo下指令
  public TargetBoId:number;//所保护的目标boid
  public static DES : Array<any> =
     [
      ["ForBoId",MessageBase.UINT16],
      ["TargetBoId",MessageBase.UINT16],

    ]
}
export class S20032 extends MessageBase{
  public RetCode:number;//成功则返回0，否则返回对应的失败原因代号（代号详见20029协议）
  public ForBoId:number;//表示是为哪个bo下指令
  public TargetBoId:number;//所保护的目标boid
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ForBoId",MessageBase.UINT16],
      ["TargetBoId",MessageBase.UINT16],

    ]
}
// ---------- 下达指令：逃跑 -----------------
//-define（PT_BT_ESCAPE, 20033）.
// 协议号: 20033
export class C20033 extends MessageBase{
  public ForBoId:number;//表示是为哪个bo下指令
  public static DES : Array<any> =
     [
      ["ForBoId",MessageBase.UINT16],

    ]
}
export class S20033 extends MessageBase{
  public RetCode:number;//下达指令成功则返回0，否则返回对应的失败原因代号（代号详见20029协议）
  public ForBoId:number;//表示是为哪个bo下指令
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ForBoId",MessageBase.UINT16],

    ]
}
// ---------- 下达指令：防御 -----------------
//-define（PT_BT_DEFEND, 20034）.
// 协议号: 20034
export class C20034 extends MessageBase{
  public ForBoId:number;//表示是为哪个bo下指令
  public static DES : Array<any> =
     [
      ["ForBoId",MessageBase.UINT16],

    ]
}
export class S20034 extends MessageBase{
  public RetCode:number;//下达指令成功则返回0，否则返回对应的失败原因代号（代号详见20029协议）
  public ForBoId:number;//表示是为哪个bo下指令
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ForBoId",MessageBase.UINT16],

    ]
}
// ---------- 下达指令：召唤宠物 -----------------
//-define（PT_BT_SUMMON_PARTNER, 20035）.
// 协议号: 20035
export class C20035 extends MessageBase{
  public ForBoId:number;//表示是为哪个bo下指令
  public PartnerId:number;//要召唤的宠物id
  public static DES : Array<any> =
     [
      ["ForBoId",MessageBase.UINT16],
      ["PartnerId",MessageBase.UINT64],

    ]
}
export class S20035 extends MessageBase{
  public RetCode:number;//下达指令成功则返回0，否则返回对应的失败原因代号（代号详见20029协议）
  public ForBoId:number;//表示是为哪个bo下指令
  public PartnerId:number;//要召唤的宠物id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ForBoId",MessageBase.UINT16],
      ["PartnerId",MessageBase.UINT64],

    ]
}
// ---------- 下达指令：请求依据按AI下指令 -----------------
//-define（PT_BT_REQ_PREPARE_CMD_BY_AI, 20036）.
// 协议号: 20036
export class C20036 extends MessageBase{
  public ForBoId:number;//表示是为哪个bo下指令
  public static DES : Array<any> =
     [
      ["ForBoId",MessageBase.UINT16],

    ]
}
export class S20036 extends MessageBase{
  public RetCode:number;//下达指令成功则返回0，否则返回对应的失败原因代号（代号详见20029协议）
  public ForBoId:number;//表示是为哪个bo下指令
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ForBoId",MessageBase.UINT16],

    ]
}
// ---------- 查询bo身上指定buff的信息 -----------------
//-define（PT_BT_QRY_BO_BUFF_INFO, 20040）.
// 协议号: 20040
export class C20040 extends MessageBase{
  public BoId:number;//boid
  public BuffNo:number;//buff编号
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["BuffNo",MessageBase.UINT32],

    ]
}
export class S20040 extends MessageBase{
  public RetCode:number;//成功则返回0，失败则返回1（失败通常是因为bo身上没有对应编号的buff，这也意味着服务端或客户端程序有bug）
  public BoId:number;//boid
  public BuffNo:number;//buff编号
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期）
  public ProtetionRound:number;//受保护的回合数，保护期间将不会被删除驱散
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["BoId",MessageBase.UINT16],
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtetionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],

    ]
}
// ---------- 通知客户端：自身的buff列表有改变（添加了某buff，或者移除了某buff，或者某buff的信息有更新） -----------------
//注：回合结算buff时，会通过此协议通知客户端
//-define（PT_BT_NOTIFY_BO_BUFF_CHANGED, 20041）.
// 协议号: 20041
export class C20041 extends MessageBase{
}
export class S20041 extends MessageBase{
  public BoId:number;//战斗对象id
  public Type:number;//1表示添加，2表示移除，3表示有更新
  public BuffNo:number;//buff编号，如果为0，表明这是为了容错（出bug了，或者buff所属的bo死亡消失了，但要保持协议二进制流格式的正确性）而填充的伪buff详情，客户端应该忽略它
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合即过期），若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
  public ProtectionRound:number;//buff保护回合，不可驱散回合
  public OverlapCount:number;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数如果buff不可叠加，则以下都统一返回0
  public Para1_Type:number;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
  public Para1_Value:number;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
  public Para2_Type:number;//buff参数2的类型
  public Para2_Value:number;//buff参数2的值
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["Type",MessageBase.UINT8],
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],
      ["OverlapCount",MessageBase.UINT8],
      ["Para1_Type",MessageBase.UINT8],
      ["Para1_Value",MessageBase.UINT32],
      ["Para2_Type",MessageBase.UINT8],
      ["Para2_Value",MessageBase.UINT32],

    ]
}
export class C20042_1 extends MessageBase{
}
export class S20042_1 extends MessageBase{
  public AttrCode:number;//属性代号（见下面的说明）
  public ChangeValue:number;//增加或减少的值（如果是减少，则返回负值），用于客户端做显示
  public NewValue:number;//新的值
  public static DES : Array<any> =
     [
      ["AttrCode",MessageBase.UINT8],
      ["ChangeValue",MessageBase.UINT32],
      ["NewValue",MessageBase.UINT32],

    ]
}
// ---------- 通知客户端：某bo的属性有改变 -----------------
//注：回合结算HOT, DOT类buff时，会通过此协议通知客户端。处理回合行动时，部分情况下也会发此协议给客户端，当做战报
//-define（PT_BT_NOTIFY_BO_ATTR_CHANGED, 20042）.
// 协议号: 20042
export class C20042 extends MessageBase{
}
export class S20042 extends MessageBase{
  public BoId:number;//战斗对象id
  public DieStatus:number;//死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失）
   public item_1 : S20042_1[];
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["DieStatus",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20042_1]],

    ]
}
export class C20043_1_1 extends MessageBase{
}
export class S20043_1_1 extends MessageBase{
    //移除的buff列表
  public BuffsRemoved:number;//buff编号
  public static DES : Array<any> =
     [
      ["BuffsRemoved",MessageBase.UINT32],

    ]
}
export class C20043_1 extends MessageBase{
}
export class S20043_1 extends MessageBase{
  public BoId:number;//战斗对象id
  public DieStatus:number;//死亡状态（1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失）
   public item_1 : S20043_1_1[];
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["DieStatus",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20043_1_1]],

    ]
}
// 代号代表的属性
// ---------------------------
//1当前hp
//2当前mp
//3当前anger
//4当前 ?ATTR_PHY_ATT
//5当前 ?ATTR_MAG_ATT
//6当前 ?ATTR_PHY_DEF
//7当前 ?ATTR_MAG_DEF
//其他（后续按需添加）。。
// ---------- 通知客户端：一或多个bo死亡了 -----------------
//注：回合结算DOT类buff时，如果DOT导致bo死亡，则会通过此协议通知客户端。处理回合行动时，部分情况下（如使用技能后强行死亡）也会发此协议给客户端，当做战报
//-define（PT_BT_NOTIFY_BO_DIED, 20043）.
// 协议号: 20043
export class C20043 extends MessageBase{
}
export class S20043 extends MessageBase{
   public item_1 : S20043_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20043_1]],

    ]
}
// ---------- 通知客户端：bo复活 -----------------
// 注：回合结算倒地、鬼魂状态时，如果bo复活了，则会通过此协议通知客户端
//-define（PT_BT_NOTIFY_BO_REVIVE, 20044）.
// 协议号: 20044
export class C20044 extends MessageBase{
}
export class S20044 extends MessageBase{
  public BoId:number;//复活的战斗对象id
  public NewHp:number;//复活后的血量
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["NewHp",MessageBase.UINT32],

    ]
}
// ---------------- 请求自动战斗 -------------------
//-define（PT_BT_REQ_AUTO_BATTLE, 20045）.
// 协议号: 20045
export class C20045 extends MessageBase{
}
export class S20045 extends MessageBase{
  public RetCode:number;//如果成功，则返回0，否则不返回，而是直接发送失败提示消息的协议
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// ---------------- 取消自动战斗 -------------------
//-define（PT_BT_CANCEL_AUTO_BATTLE, 20046）.
// 协议号: 20046
export class C20046 extends MessageBase{
}
export class S20046 extends MessageBase{
  public RetCode:number;//如果成功，则返回0，否则不返回，而是直接发送失败提示消息的协议
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C20050_1 extends MessageBase{
}
export class S20050_1 extends MessageBase{
  public SkillId:number;//技能id
  public IsUsable:number;//1：可使用，0：不可使用
  public LeftCDRounds:number;//剩余的冷却回合数，如果不在冷却中，则返回0
  public LV:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],
      ["IsUsable",MessageBase.UINT8],
      ["LeftCDRounds",MessageBase.UINT8],
      ["LV",MessageBase.UINT32],

    ]
}
// ---------------- 查询自己可操控的bo的技能可使用情况 -------------------
//-define（PT_BT_QUERY_SKILL_USABLE_INFO, 20050）.
// 协议号: 20050
export class C20050 extends MessageBase{
  public BoId:number;//boid
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],

    ]
}
export class S20050 extends MessageBase{
  public BoId:number;//boid
   public item_1 : S20050_1[];
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20050_1]],

    ]
}
export class C20051_1 extends MessageBase{
}
export class S20051_1 extends MessageBase{
    //buff列表
  public BuffNo:number;//buff编号
  public ExpireRound:number;//buff的到期回合（表示buff到了该回合，即消失）
  public ProtectionRound:number;//buff保护时间
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],

    ]
}
export class C20051_2 extends MessageBase{
}
export class S20051_2 extends MessageBase{
    //玩家的已经出战过的宠物id列表（对于非玩家bo，固定返回空数组）
  public PartnerId:number;//宠物id
  public static DES : Array<any> =
     [
      ["PartnerId",MessageBase.UINT64],

    ]
}
// ---------------- 回归战斗后查询bo的某些信息 -------------------
//-define（PT_BT_QUERY_BO_INFO_AFTER_BACK_TO_BATTLE, 20051）.
// 协议号: 20051
export class C20051 extends MessageBase{
  public TargetBoId:number;//目标boid
  public static DES : Array<any> =
     [
      ["TargetBoId",MessageBase.UINT16],

    ]
}
export class S20051 extends MessageBase{
  public TargetBoId:number;//目标boid
  public DieStatus:number;//死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态，3：死亡并且直接消失）
  public OnlineFlag:number;//在线标记（1：在线，2：离线）
  public AccSummonParTimes:number;//累计已召唤宠物的次数
   public item_1 : S20051_1[];
   public item_2 : S20051_2[];
  public static DES : Array<any> =
     [
      ["TargetBoId",MessageBase.UINT16],
      ["DieStatus",MessageBase.UINT8],
      ["OnlineFlag",MessageBase.UINT8],
      ["AccSummonParTimes",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20051_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S20051_2]],

    ]
}
// ---------------- （断线重连后）尝试回归战斗 -------------------
//-define（PT_BT_TRY_GO_BACK_TO_BATTLE, 20052）.
// 协议号: 20052
export class C20052 extends MessageBase{
}
export class S20052 extends MessageBase{
  public RetCode:number;//如果可以回归战斗，则返回0，否则，返回1（表明不可回归战斗）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C20055_1 extends MessageBase{
}
export class S20055_1 extends MessageBase{
  public ToBoId:number;//提示信息所针对的boid，如果不具体针对某个bo，则统一发0
  public TipsCode:number;//提示信息的代号（详见如下说明）
  public Para1:number;//提示信息的参数1，若无意义，则统一发0
  public Para2:number;//提示信息的参数2，若无意义，则统一发0
  public static DES : Array<any> =
     [
      ["ToBoId",MessageBase.UINT16],
      ["TipsCode",MessageBase.UINT32],
      ["Para1",MessageBase.UINT32],
      ["Para2",MessageBase.UINT32],

    ]
}
// ---------------- 战斗提示（一或多个） -------------------
//-define（PT_BT_TIPS, 20055）.
// 协议号: 20055
export class C20055 extends MessageBase{
}
export class S20055 extends MessageBase{
   public item_1 : S20055_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20055_1]],

    ]
}
// 
//代号参数1参数2所代表的含义
// ----------------------------------------------------------------------------------------
//1无意义无意义当前无法行动
//2所用技能的id无意义使用技能失败：原因不明（表明程序有bug）
//3所用技能的id无意义使用技能失败：血量不足
//4所用技能的id无意义使用技能失败：蓝量不足
//5所用技能的id无意义使用技能失败：怒气不足
//6所用技能的id无意义使用技能失败：技能在冷却中
//7所用技能的id无意义使用技能失败：当前血量比例太高
//8所用技能的id无意义使用技能失败：当前血量比例太低
//9所用技能的id无意义使用技能失败：当前处于隐身状态中
//10所用技能的id无意义使用技能失败：当前处于特殊状态中
//11不肯出战的宠物id无意义宠物因忠诚度不够而不肯出战
//15所使用物品的编号目标bo id使用物品失败：原因不明（表明程序有bug，此时参数1固定返回0）
//16所使用物品的编号目标bo id使用物品失败：目标不存在
//17所使用物品的编号目标bo id使用物品失败：目标已死亡
//18所使用物品的编号目标bo id使用物品失败：目标无法被治疗
//19所使用物品的编号目标bo id使用物品失败：目标灵魂已被禁锢
//20所用技能的id无意义使用技能失败：银子不足
// ---------- 客户端通知服务端：客户端战斗结束 ----------------
//-define（PT_BT_C2S_NOTIFY_BATTLE_END, 20060）.
// 协议号: 20060
export class C20060 extends MessageBase{
}
export class S20060 extends MessageBase{
}
//无
// ---------- 通知客户端：不需回归战斗 ----------------
//-define（PT_BT_NOTIFY_NOT_NEED_BACK_TO_BATTLE, 20061）.
// 协议号: 20061
export class C20061 extends MessageBase{
}
export class S20061 extends MessageBase{
}
export class C20062_1 extends MessageBase{
}
export class S20062_1 extends MessageBase{
  public BuffNo:number;//buff编号
  public ExpireRound:number;//buff的到期回合（表示到了该回合，buff即消失）
  public ProtectionRound:number;//buff的保护回合在此之前不会被驱散
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],

    ]
}
//无
// ---------- 通知客户端：新的bo刷出了 -----------------
//-define（PT_BT_NOTIFY_NEW_BO_SPAWNED, 20062）.
// 协议号: 20062
export class C20062 extends MessageBase{
}
export class S20062 extends MessageBase{
  public Side:number;//所属方（1：主队，2：客队）
  public BoId:number;//战斗对象id
  public BoType:number;//战斗对象类型（1：玩家，2：宠物，3：NPC，4：怪物，5：普通boss，7：雇佣玩家，8：世界boss）
  public OwnerPlayerBoId:number;//所属玩家的boid，目前是用于表明战场上的宠物的归属，对于非宠物bo，统一返回0
  public Pos:number;//战斗位置（1~15）
  public Name:string;//名字
  public Sex:number;//性别（1：男，2：女）
  public Race:number;//种族
  public Faction:number;//门派
  public Lv:number;//等级
  public ParentObjId:number;//父对象id（对于玩家bo，表示对应的玩家id，对于怪物bo，表示对应的战斗怪模板编号，对于宠物bo，表示对应的宠物id）
  public ParentPartnerNo:number;//宠物bo对应的父宠物对象的编号（策划所配置的编号），如果不是宠物bo，则统一返回0
  public Hp:number;//当前血量
  public HpLim:number;//血量上限
  public Mp:number;//当前魔法值
  public MpLim:number;//魔法上限
  public Anger:number;//当前怒气值
  public AngerLim:number;//怒气上限
  public Weapon:number;//武器对应的物品编号（若没有则返回0）
  public HeadWear:number;//头饰对应的物品编号（若没有则返回0）
  public Clothes:number;//服饰对应的物品编号（若没有则返回0）
  public BackWear:number;//背饰对应的物品编号（若没有则返回0）
  public ParCultivateLv:number;//宠物的修炼等级（如果不是宠物，固定返回0）
  public ParCultivateLayer:number;//宠物的修炼层数（如果不是宠物，固定返回0，如果是宠物，但没有修炼过，也返回0）
  public ParEvolveLv:number;//宠物的进化等级（如果不是宠物，固定返回0）
  public ParNature:number;//宠物性格（如果不是宠物，固定返回0）
  public ParQuality:number;//宠物的品质（1：白2:绿3:蓝4:紫5:橙6:红），如果不是宠物，则固定返回0
  public IsMainPar:number;//是否为主宠（1：是，0：否）
  public IsInvisible:number;//是否有隐身状态（1：是，0：否）
  public InvisibleExpireRound:number;//隐身状态的到期回合（表示到了该回合，隐身状态即消失），如果没有隐身状态，则返回0
  public SuitNo:number;//套装编号（若没有则返回0）
  public GraphTitle:number;//当前的图片称号id（若没有则返回0）
  public TextTitle:number;//当前的文字称号id（若没有则返回0）
  public UserDefTitle:string;//当前的自定义称号（若没有则返回空串）
  public OnlineFlag:number;//在线标记（1：在线，2：离线）
  public IsPlotBo:number;//是否剧情bo（1：是，0：否）
  public CanBeCtrled:number;//是否可操控（1：是，0：否），目前仅针对剧情bo，如果不是剧情bo，则统一返回0
   public item_1 : S20062_1[];
  public AerocraftNo:number;//飞行器编号0为没有
  public phy_att:number;//
  public mag_att:number;//
  public phy_def:number;//
  public mag_def:number;//
  public heal_value:number;//
  public LookIdx:number;//
  public transfiguration_no:number;//
  public static DES : Array<any> =
     [
      ["Side",MessageBase.UINT8],
      ["BoId",MessageBase.UINT16],
      ["BoType",MessageBase.UINT8],
      ["OwnerPlayerBoId",MessageBase.UINT16],
      ["Pos",MessageBase.UINT8],
      ["Name",MessageBase.STRING],
      ["Sex",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["ParentObjId",MessageBase.UINT64],
      ["ParentPartnerNo",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Anger",MessageBase.UINT32],
      ["AngerLim",MessageBase.UINT32],
      ["Weapon",MessageBase.UINT32],
      ["HeadWear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["BackWear",MessageBase.UINT32],
      ["ParCultivateLv",MessageBase.UINT8],
      ["ParCultivateLayer",MessageBase.UINT8],
      ["ParEvolveLv",MessageBase.UINT8],
      ["ParNature",MessageBase.UINT8],
      ["ParQuality",MessageBase.UINT8],
      ["IsMainPar",MessageBase.UINT8],
      ["IsInvisible",MessageBase.UINT8],
      ["InvisibleExpireRound",MessageBase.UINT16],
      ["SuitNo",MessageBase.UINT8],
      ["GraphTitle",MessageBase.UINT32],
      ["TextTitle",MessageBase.UINT32],
      ["UserDefTitle",MessageBase.STRING],
      ["OnlineFlag",MessageBase.UINT8],
      ["IsPlotBo",MessageBase.UINT8],
      ["CanBeCtrled",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20062_1]],
      ["AerocraftNo",MessageBase.UINT32],
      ["phy_att",MessageBase.UINT32],
      ["mag_att",MessageBase.UINT32],
      ["phy_def",MessageBase.UINT32],
      ["mag_def",MessageBase.UINT32],
      ["heal_value",MessageBase.UINT32],
      ["LookIdx",MessageBase.UINT8],
      ["transfiguration_no",MessageBase.UINT32],

    ]
}
export class C20063_1_1 extends MessageBase{
}
export class S20063_1_1 extends MessageBase{
  public BuffNo:number;//buff编号
  public ExpireRound:number;//buff的到期回合（表示到了该回合，buff即消失）
  public ProtectionRound:number;//buff的保护回合在此之前不会被驱散
  public static DES : Array<any> =
     [
      ["BuffNo",MessageBase.UINT32],
      ["ExpireRound",MessageBase.UINT16],
      ["ProtectionRound",MessageBase.UINT16],

    ]
}
export class C20063_1 extends MessageBase{
}
export class S20063_1 extends MessageBase{
    //新刷出的
  public BoId:number;//战斗对象id
  public BoType:number;//战斗对象类型（1：玩家，2：宠物，3：NPC，4：怪物，5：普通boss，7：雇佣玩家，8：世界boss）
  public OwnerPlayerBoId:number;//所属玩家的boid，目前是用于表明战场上的宠物的归属，对于非宠物bo，统一返回0
  public Pos:number;//战斗位置（1~15）
  public Name:string;//名字
  public Sex:number;//性别（1：男，2：女）
  public Race:number;//种族
  public Faction:number;//门派
  public Lv:number;//等级
  public ParentObjId:number;//父对象id（对于玩家bo，表示对应的玩家id，对于怪物bo，表示对应的战斗怪模板编号，对于宠物bo，表示对应的宠物id）
  public ParentPartnerNo:number;//宠物bo对应的父宠物对象的编号（策划所配置的编号），如果不是宠物bo，则统一返回0
  public Hp:number;//当前血量
  public HpLim:number;//血量上限
  public Mp:number;//当前魔法值
  public MpLim:number;//魔法上限
  public Anger:number;//当前怒气值
  public AngerLim:number;//怒气上限
  public Weapon:number;//武器对应的物品编号（若没有则返回0）
  public HeadWear:number;//头饰对应的物品编号（若没有则返回0）
  public Clothes:number;//服饰对应的物品编号（若没有则返回0）
  public BackWear:number;//背饰对应的物品编号（若没有则返回0）
  public ParCultivateLv:number;//宠物的修炼等级（如果不是宠物，固定返回0）
  public ParCultivateLayer:number;//宠物的修炼层数（如果不是宠物，固定返回0，如果是宠物，但没有修炼过，也返回0）
  public ParEvolveLv:number;//宠物的进化等级（如果不是宠物，固定返回0）
  public ParNature:number;//宠物性格（如果不是宠物，固定返回0）
  public ParQuality:number;//宠物的品质（1：白2:绿3:蓝4:紫5:橙6:红），如果不是宠物，则固定返回0
  public IsMainPar:number;//是否为主宠（1：是，0：否）
  public IsInvisible:number;//是否有隐身状态（1：是，0：否）
  public InvisibleExpireRound:number;//隐身状态的到期回合（表示到了该回合，隐身状态即消失），如果没有隐身状态，则返回0
  public SuitNo:number;//套装编号（若没有则返回0）
  public GraphTitle:number;//当前的图片称号id（若没有则返回0）
  public TextTitle:number;//当前的文字称号id（若没有则返回0）
  public UserDefTitle:string;//当前的自定义称号（若没有则返回空串）
  public OnlineFlag:number;//在线标记（1：在线，2：离线）
  public IsPlotBo:number;//是否剧情bo（1：是，0：否）
  public CanBeCtrled:number;//是否可操控（1：是，0：否），目前仅针对剧情bo，如果不是剧情bo，则统一返回0
   public item_1 : S20063_1_1[];
  public AerocraftNo:number;//飞行器编号0为没有
  public phy_att:number;//
  public mag_att:number;//
  public phy_def:number;//
  public mag_def:number;//
  public heal_value:number;//
  public LookIdx:number;//
  public transfiguration_no:number;//
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["BoType",MessageBase.UINT8],
      ["OwnerPlayerBoId",MessageBase.UINT16],
      ["Pos",MessageBase.UINT8],
      ["Name",MessageBase.STRING],
      ["Sex",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["ParentObjId",MessageBase.UINT64],
      ["ParentPartnerNo",MessageBase.UINT32],
      ["Hp",MessageBase.UINT32],
      ["HpLim",MessageBase.UINT32],
      ["Mp",MessageBase.UINT32],
      ["MpLim",MessageBase.UINT32],
      ["Anger",MessageBase.UINT32],
      ["AngerLim",MessageBase.UINT32],
      ["Weapon",MessageBase.UINT32],
      ["HeadWear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["BackWear",MessageBase.UINT32],
      ["ParCultivateLv",MessageBase.UINT8],
      ["ParCultivateLayer",MessageBase.UINT8],
      ["ParEvolveLv",MessageBase.UINT8],
      ["ParNature",MessageBase.UINT8],
      ["ParQuality",MessageBase.UINT8],
      ["IsMainPar",MessageBase.UINT8],
      ["IsInvisible",MessageBase.UINT8],
      ["InvisibleExpireRound",MessageBase.UINT16],
      ["SuitNo",MessageBase.UINT8],
      ["GraphTitle",MessageBase.UINT32],
      ["TextTitle",MessageBase.UINT32],
      ["UserDefTitle",MessageBase.STRING],
      ["OnlineFlag",MessageBase.UINT8],
      ["IsPlotBo",MessageBase.UINT8],
      ["CanBeCtrled",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20063_1_1]],
      ["AerocraftNo",MessageBase.UINT32],
      ["phy_att",MessageBase.UINT32],
      ["mag_att",MessageBase.UINT32],
      ["phy_def",MessageBase.UINT32],
      ["mag_def",MessageBase.UINT32],
      ["heal_value",MessageBase.UINT32],
      ["LookIdx",MessageBase.UINT8],
      ["transfiguration_no",MessageBase.UINT32],

    ]
}
// ---------- 通知客户端：下一波怪刷出了 ----------------
//-define（PT_BT_NOTIFY_NEXT_BMON_GROUP_SPAWNED, 20063）.
// 协议号: 20063
export class C20063 extends MessageBase{
}
export class S20063 extends MessageBase{
  public ForRound:number;//表示怪是在哪一个回合刷出（目前都是在当前回合的下一个回合）
  public ForSide:number;//表示怪是在哪一方刷出（目前都是客队方）
  public NthWave:number;//表示这一波是属于第几波
   public item_1 : S20063_1[];
  public static DES : Array<any> =
     [
      ["ForRound",MessageBase.UINT16],
      ["ForSide",MessageBase.UINT8],
      ["NthWave",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S20063_1]],

    ]
}
// ---------- 查询战斗的开始时间（unix时间戳） ----------------
//-define（PT_BT_QUERY_BATTLE_START_TIME, 20064）.
// 协议号: 20064
export class C20064 extends MessageBase{
}
export class S20064 extends MessageBase{
  public RetCode:number;//查询成功则返回0，失败则返回1
  public StartTime:number;//战斗的开始时间（unix时间戳），如果查询失败，则固定返回0
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["StartTime",MessageBase.UINT32],

    ]
}
// ---------- 强行退出战斗， 仅用于调试 -----------------
//-define（PT_BT_DBG_FORCE_QUIT_BATTLE, 20998）.
// 协议号: 20998
export class C20998 extends MessageBase{
}
export class S20998 extends MessageBase{
}
//无
// ---------- 获取战斗对象的信息，此协议仅仅用于调试！ -----------------
//-define（PT_BT_DBG_GET_BO_INFO, 20999）.
// 协议号: 20999
export class C20999 extends MessageBase{
  public BoId:number;//要查询的战斗对象的id
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],

    ]
}
export class S20999 extends MessageBase{
}
//战斗对象信息的字符串格式化形式的数据
// ---------- 通知客户端：捕捉宠物 -----------------
//-define（PT_BT_CAPTURE_PARTNER, 20100）.
// 协议号: 20100
export class C20100 extends MessageBase{
}
export class S20100 extends MessageBase{
  public BoId:number;//战斗对象id
  public TargetBoId:number;//被捕捉对象id
  public Result:number;//结果（1成功，0失败）
  public static DES : Array<any> =
     [
      ["BoId",MessageBase.UINT16],
      ["TargetBoId",MessageBase.UINT16],
      ["Result",MessageBase.UINT8],

    ]
}
// ---------- 下达指令：捕捉宠物 -----------------
//-define（PT_BT_CMD_CAPTURE_PARTNER, 20101）.
// 协议号: 20101
export class C20101 extends MessageBase{
  public ForBoId:number;//表示是为哪个bo下指令
  public TargetBoId:number;//所保护的目标boid
  public static DES : Array<any> =
     [
      ["ForBoId",MessageBase.UINT16],
      ["TargetBoId",MessageBase.UINT16],

    ]
}
export class S20101 extends MessageBase{
  public RetCode:number;//成功则返回0，否则返回对应的失败原因代号（代号详见20029协议）
  public ForBoId:number;//表示是为哪个bo下指令
  public TargetBoId:number;//所保护的目标boid
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ForBoId",MessageBase.UINT16],
      ["TargetBoId",MessageBase.UINT16],

    ]
}
// ---------- 指挥系统：下达指令指挥 -----------------
//-define（PT_BT_COMMAND_TARGER, 20102）.
// 协议号: 20102
export class C20102 extends MessageBase{
  public TargetBoId:number;//所保护的目标boid
  public Command:string;//所选目标的指令
  public static DES : Array<any> =
     [
      ["TargetBoId",MessageBase.UINT16],
      ["Command",MessageBase.STRING],

    ]
}
export class S20102 extends MessageBase{
  public TargetBoId:number;//表示是为哪个bo下指令
  public Command:string;//所选目标的指令
  public static DES : Array<any> =
     [
      ["TargetBoId",MessageBase.UINT16],
      ["Command",MessageBase.STRING],

    ]
}
// ---------- 观战 -----------------
//-define（PT_BT_WATCH_BATTLE, 20103）.
// 协议号: 20103
export class C20103 extends MessageBase{
  public PlayerId:number;//观战玩家id
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],

    ]
}
export class S20103 extends MessageBase{
  public RetCode:number;//状态、成功0、失败1
  public Side:number;//观战的阵营视角
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Side",MessageBase.UINT8],

    ]
}
// ---------- 退出观战 -----------------
//-define（PT_BT_EXIT_WATCH, 20104）.
// 协议号: 20104
export class C20104 extends MessageBase{
}
export class S20104 extends MessageBase{
  public RetCode:number;//状态、成功0
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
