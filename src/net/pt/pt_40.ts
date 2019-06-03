import { MessageBase } from "../../message/messageBase/MessageBase";
// 帮会相关协议
// 2013.9.25
// @author: zhangwq
// 分类号：40
// pt: 表示protocol
// 帮派职位（pos： 表示position ）
// -define（GUILD_POS_INVALID,0）.无效职位（用于程序做非法判定）
// -define（GUILD_POS_CHIEF,1）.帮主
// -define（GUILD_POS_COUNSELLOR,2）.军师
// -define（GUILD_POS_SHAOZHANG,3）.哨长
// -define（GUILD_POS_NORMAL_MEMBER,4）.喽啰 普通成员
//----------- 帮会创建 ------------
//-define（PT_CREATE_GUILD, 40001）.
// 协议号：40001
export class C40001 extends MessageBase{
  public Lv:number;//帮派等级
  public GuildName:string;//
  public Brief:string;//帮会简介
  public static DES : Array<any> =
     [
      ["Lv",MessageBase.UINT8],
      ["GuildName",MessageBase.STRING],
      ["Brief",MessageBase.STRING],

    ]
}
export class S40001 extends MessageBase{
  public RetCode:number;//创建成功返回0
  public GuildId:number;//帮会ID
  public GuildName:string;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["GuildId",MessageBase.UINT64],
      ["GuildName",MessageBase.STRING],

    ]
}
//---------------申请解散帮会---------------
//-define（PT_DISBAND_GUILD, 40002）.
// 协议号: 40002
export class C40002 extends MessageBase{
  public GuildId:number;//申请帮会的ID
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],

    ]
}
export class S40002 extends MessageBase{
}
//---------------申请加入帮会---------------
//-define（PT_APPLY_JOIN_GUILD, 40003）.
// 协议号: 40003
export class C40003 extends MessageBase{
  public GuildId:number;//申请帮会的ID
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],

    ]
}
export class S40003 extends MessageBase{
  public RetCode:number;//返回结果：0//成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//---------------审批处理本帮会申请人员---------------
//-define（PT_HANDLE_APPLY, 40004）.
// 协议号: 40004
export class C40004 extends MessageBase{
  public PlayerId:number;//玩家ID，如果是批量操作统一发0
  public Choise:number;//选择结果：0-拒绝，1-允许，2-全部拒绝，3-全部允许
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Choise",MessageBase.UINT8],

    ]
}
export class S40004 extends MessageBase{
  public PlayerId:number;//玩家ID
  public Choise:number;//选择结果：0-拒绝，1-允许，2-全部拒绝，3-全部允许
  public RetCode:number;//返回结果：0//成功1//失败
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Choise",MessageBase.UINT8],
      ["RetCode",MessageBase.UINT8],

    ]
}
//---------------邀请加入帮派---------------
//-define（PT_INVITE_JOIN_GUILD, 40005）.
// 协议号: 40005
export class C40005 extends MessageBase{
  public PlayerId:number;//邀请对象
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],

    ]
}
export class S40005 extends MessageBase{
  public RetCode:number;//返回结果：0-成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//---------------回复帮会邀请---------------
//-define（PT_REPLY_INVITE, 40006）.
// 协议号: 40006
export class C40006 extends MessageBase{
  public GuildId:number;//帮派ID
  public Choise:number;//选择：0-拒绝，1-同意
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["Choise",MessageBase.UINT8],

    ]
}
export class S40006 extends MessageBase{
  public RetCode:number;//返回结果：0-成功表示已经加入帮派了
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//---------------开除帮会成员---------------
//-define（PT_KICK_OUT_FROM_GUILD, 40007）.
// 协议号: 40007
export class C40007 extends MessageBase{
  public GuildId:number;//帮派ID
  public PlayerId:number;//角色ID
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["PlayerId",MessageBase.UINT64],

    ]
}
export class S40007 extends MessageBase{
  public PlayerId:number;//角色ID
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],

    ]
}
//
//---------------退出帮派---------------
//-define（PT_QUIT_GUILD, 40008）.
// 协议号: 40008
export class C40008 extends MessageBase{
  public GuildId:number;//帮派ID
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],

    ]
}
export class S40008 extends MessageBase{
  public RetCode:number;//返回结果：0成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C40009_1 extends MessageBase{
}
export class S40009_1 extends MessageBase{
  public GuildId:number;//帮会ID
  public GuildName:string;//帮会名称
  public Lv:number;//帮会等级
  public ChiefId:number;//帮主ID
  public ChiefName:string;//帮主名称
  public Rank:number;//帮会排名
  public CurMbCount:number;//当前帮会人数
  public MbCapacity:number;//帮会人数容纳上限
  public Brief:string;//帮会简介
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["GuildName",MessageBase.STRING],
      ["Lv",MessageBase.UINT16],
      ["ChiefId",MessageBase.UINT64],
      ["ChiefName",MessageBase.STRING],
      ["Rank",MessageBase.UINT16],
      ["CurMbCount",MessageBase.UINT16],
      ["MbCapacity",MessageBase.UINT16],
      ["Brief",MessageBase.STRING],

    ]
}
//
//---------------获取帮会列表---------------（此协议不用，用40017代替）------------
//-define（PT_GET_GUILD_LIST, 40009）.
// 协议号: 40009
export class C40009 extends MessageBase{
  public PageSize:number;//帮会每页个数
  public PageNum:number;//帮会所在页码编号从1开始
  public static DES : Array<any> =
     [
      ["PageSize",MessageBase.UINT8],
      ["PageNum",MessageBase.UINT16],

    ]
}
export class S40009 extends MessageBase{
  public RetCode:number;//返回结果：0成功
  public TotalPage:number;//帮会总页数
  public PageNum:number;//帮会所在页码编号从1开始
   public item_1 : S40009_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TotalPage",MessageBase.UINT16],
      ["PageNum",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40009_1]],

    ]
}
export class C40010_1 extends MessageBase{
}
export class S40010_1 extends MessageBase{
  public PlayerId:number;//玩家ID
  public Name:string;//玩家名称
  public Lv:number;//玩家等级
  public Sex:number;//性别
  public Race:number;//玩家种族
  public Faction:number;//玩家门派
  public Contri:number;//贡献度
  public title_id:number;//帮派称号id
  public Position:number;//官职见文件头部
  public BattlePower:number;//战斗力
  public Online:number;//是否在线非0//上次离线时间，0//在线
  public VipLv:number;//vip等级
  public JoinTime:number;//加入帮派时间戳
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Name",MessageBase.STRING],
      ["Lv",MessageBase.UINT16],
      ["Sex",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Contri",MessageBase.UINT32],
      ["title_id",MessageBase.UINT8],
      ["Position",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],
      ["Online",MessageBase.UINT32],
      ["VipLv",MessageBase.UINT8],
      ["JoinTime",MessageBase.UINT32],

    ]
}
//---------------获取帮会成员列表---------------
//-define（PT_GET_GUILD_MB_LIST, 40010）.
// 协议号: 40010
export class C40010 extends MessageBase{
  public GuildId:number;//帮派ID
  public PageSize:number;//帮会成员每页个数
  public PageNum:number;//帮会成员所在页码编号从1开始
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["PageSize",MessageBase.UINT8],
      ["PageNum",MessageBase.UINT16],

    ]
}
export class S40010 extends MessageBase{
  public GuildId:number;//帮会ID
  public MemberCount:number;//帮会总人数
  public OnlineCount:number;//帮会在线人数
  public TotalPage:number;//帮会成员总页数
  public PageNum:number;//帮会成员所在页码编号从1开始
   public item_1 : S40010_1[];
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["MemberCount",MessageBase.UINT32],
      ["OnlineCount",MessageBase.UINT32],
      ["TotalPage",MessageBase.UINT16],
      ["PageNum",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40010_1]],

    ]
}
export class C40011_1 extends MessageBase{
}
export class S40011_1 extends MessageBase{
  public PlayerId:number;//玩家ID
  public Name:string;//玩家姓名
  public Lv:number;//玩家等级
  public Sex:number;//玩家性别
  public Race:number;//玩家种族
  public Faction:number;//玩家门派
  public BattlePower:number;//战斗力
  public VipLv:number;//vip等级
  public Time:number;//申请时间
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Name",MessageBase.STRING],
      ["Lv",MessageBase.UINT16],
      ["Sex",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],
      ["VipLv",MessageBase.UINT8],
      ["Time",MessageBase.UINT32],

    ]
}
//---------------获取帮会的申请列表---------------
//-define（PT_GET_REQ_JOIN_LIST, 40011）.
// 协议号: 40011
export class C40011 extends MessageBase{
  public GuildId:number;//帮派ID
  public PageSize:number;//帮会申请列表每页个数
  public PageNum:number;//帮会所在页码编号从1开始
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["PageSize",MessageBase.UINT8],
      ["PageNum",MessageBase.UINT16],

    ]
}
export class S40011 extends MessageBase{
  public RetCode:number;//返回结果：0-成功
  public TotalPage:number;//帮会总页数
  public PageNum:number;//帮会所在页码编号从1开始
   public item_1 : S40011_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TotalPage",MessageBase.UINT16],
      ["PageNum",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40011_1]],

    ]
}
export class C40012_1 extends MessageBase{
}
export class S40012_1 extends MessageBase{
    //当天贡献值前三的玩家名字当天贡献度是否vip当vipLv是0表示非vip
  public PlayerName:string;//
  public ContriToday:number;//
  public VipLv:number;//
  public static DES : Array<any> =
     [
      ["PlayerName",MessageBase.STRING],
      ["ContriToday",MessageBase.UINT32],
      ["VipLv",MessageBase.UINT8],

    ]
}
//---------------帮会基本信息---------------
//-define（PT_BASE_GUILD_INFO, 40012）.
// 协议号: 40012
export class C40012 extends MessageBase{
  public GuildId:number;//帮会ID
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],

    ]
}
export class S40012 extends MessageBase{
  public GuildId:number;//帮会ID
  public GuildName:string;//帮会名称
  public Lv:number;//帮会等级
  public Notice:string;//帮会公告（简述）
  public ChiefId:number;//帮主ID
  public ChiefName:string;//帮主名称
  public Rank:number;//帮会排名
  public CurMbCount:number;//当前帮会人数
  public MbCapacity:number;//帮会人数容纳上限
  public Contri:number;//帮会贡献
  public CurProsper:number;//当前繁荣度
  public MaxProsper:number;//当前等级帮派繁荣度上限
  public Fund:number;//资金
  public State:number;//状态帮派状态0//>正常状态1//>非活跃状态2//>冻结状态
   public item_1 : S40012_1[];
  public Liveness:number;//当日活跃度
  public LivenesSD:number;//当日标准活跃度
  public BattlePower:number;//帮派战力
  public HandleApplyState:number;//帮派申请处理状态0//>无需审核入帮1//>正常申请入帮2//>禁止申请入帮
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["GuildName",MessageBase.STRING],
      ["Lv",MessageBase.UINT16],
      ["Notice",MessageBase.STRING],
      ["ChiefId",MessageBase.UINT64],
      ["ChiefName",MessageBase.STRING],
      ["Rank",MessageBase.UINT16],
      ["CurMbCount",MessageBase.UINT16],
      ["MbCapacity",MessageBase.UINT16],
      ["Contri",MessageBase.UINT32],
      ["CurProsper",MessageBase.UINT32],
      ["MaxProsper",MessageBase.UINT32],
      ["Fund",MessageBase.UINT32],
      ["State",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40012_1]],
      ["Liveness",MessageBase.UINT32],
      ["LivenesSD",MessageBase.UINT32],
      ["BattlePower",MessageBase.UINT32],
      ["HandleApplyState",MessageBase.UINT8],

    ]
}
//---------------修改帮派宗旨（公告）---------------
//-define（MODIFY_GUILD_TENET, 40013）.
// 协议号: 40013
export class C40013 extends MessageBase{
  public GuildId:number;//帮会ID
  public Tenet:string;//帮会宗旨
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["Tenet",MessageBase.STRING],

    ]
}
export class S40013 extends MessageBase{
  public RetCode:number;//返回结果：0-成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//
//---------------帮会授予官职---------------
//-define（APPOINT_GUILD_POSITION, 40014）.
// 协议号: 40014
export class C40014 extends MessageBase{
  public PlayerId:number;//玩家ID
  public Position:number;//授予的官职
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Position",MessageBase.UINT8],

    ]
}
export class S40014 extends MessageBase{
  public RetCode:number;//返回结果：0-成功
  public PlayerId:number;//玩家ID
  public Position:number;//授予的官职
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["PlayerId",MessageBase.UINT64],
      ["Position",MessageBase.UINT8],

    ]
}
//
//------------------ 被邀请人收到加入帮派的邀请 服务器主动发给玩家------------
//-define（PT_GOT_INVITE,  40015）.
// 协议号:40015
export class C40015 extends MessageBase{
}
export class S40015 extends MessageBase{
  public FromPlayerId:number;//发邀请的玩家id
  public FromPlayerName:string;//发邀请的玩家名字
  public GuildId:number;//帮派ID
  public GuildName:string;//帮派名字
  public Lv:number;//帮会等级
  public static DES : Array<any> =
     [
      ["FromPlayerId",MessageBase.UINT64],
      ["FromPlayerName",MessageBase.STRING],
      ["GuildId",MessageBase.UINT64],
      ["GuildName",MessageBase.STRING],
      ["Lv",MessageBase.UINT16],

    ]
}
//---------------个人帮会信息---------------
//-define（PT_GET_PLAYER_GUILD_INFO, 40016）.
// 协议号：40016
export class C40016 extends MessageBase{
}
export class S40016 extends MessageBase{
  public Position:number;//授予的官职
  public LeftContri:number;//当前剩余贡献度
  public TotalContri:number;//累计贡献度
  public static DES : Array<any> =
     [
      ["Position",MessageBase.UINT8],
      ["LeftContri",MessageBase.UINT32],
      ["TotalContri",MessageBase.UINT32],

    ]
}
export class C40017_1 extends MessageBase{
}
export class S40017_1 extends MessageBase{
  public GuildId:number;//帮会ID
  public GuildName:string;//帮会名称
  public Lv:number;//帮会等级
  public ChiefId:number;//帮主ID
  public ChiefName:string;//帮主名称
  public Rank:number;//帮会排名
  public CurMbCount:number;//当前帮会人数
  public MbCapacity:number;//帮会人数容纳上限
  public Brief:string;//帮会简介
  public HasApplied:number;//获取列表的玩家是否已经申请加入该帮派0表示没有申请，1表示已经申请
  public VipLv:number;//帮主vip等级
  public GuildBP:number;//帮派战力
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["GuildName",MessageBase.STRING],
      ["Lv",MessageBase.UINT16],
      ["ChiefId",MessageBase.UINT64],
      ["ChiefName",MessageBase.STRING],
      ["Rank",MessageBase.UINT16],
      ["CurMbCount",MessageBase.UINT16],
      ["MbCapacity",MessageBase.UINT16],
      ["Brief",MessageBase.STRING],
      ["HasApplied",MessageBase.UINT8],
      ["VipLv",MessageBase.UINT8],
      ["GuildBP",MessageBase.UINT64],

    ]
}
//---------------搜索帮会列表---------------
//-define（PT_SEARCH_GUILD_LIST, 40017）.
// 协议号: 40017
export class C40017 extends MessageBase{
  public PageSize:number;//帮会每页个数
  public PageNum:number;//帮会所在页码编号从1开始
  public NotFull:number;//1表示显示未满帮派，0表示没有限制
  public SearchName:string;//名字匹配（没有则为空字符串）
  public static DES : Array<any> =
     [
      ["PageSize",MessageBase.UINT8],
      ["PageNum",MessageBase.UINT16],
      ["NotFull",MessageBase.UINT8],
      ["SearchName",MessageBase.STRING],

    ]
}
export class S40017 extends MessageBase{
  public RetCode:number;//返回结果：0成功
  public TotalPage:number;//帮会总页数
  public PageNum:number;//帮会所在页码编号从1开始
   public item_1 : S40017_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TotalPage",MessageBase.UINT16],
      ["PageNum",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40017_1]],

    ]
}
export class C40018_1 extends MessageBase{
}
export class S40018_1 extends MessageBase{
  public Position:number;//官职详见guild.hrl宏定义
  public CurNum:number;//该职位当前人数
  public MaxNum:number;//该职位允许的人数
  public static DES : Array<any> =
     [
      ["Position",MessageBase.UINT8],
      ["CurNum",MessageBase.UINT8],
      ["MaxNum",MessageBase.UINT8],

    ]
}
//---------------获取帮会各个职位当前人数和最大人数---------------
//-define（PT_GET_GUILD_POS_INFO, 40018）.
// 协议号: 40018
export class C40018 extends MessageBase{
  public GuildId:number;//帮会ID
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],

    ]
}
export class S40018 extends MessageBase{
  public GuildId:number;//帮会ID
   public item_1 : S40018_1[];
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40018_1]],

    ]
}
// ------------加入帮派 通知所有帮派成员，包括帮主-------------------
//-define（PT_NOTIFY_JOINED_GUILD, 40019）.
// 协议号: 40019
export class C40019 extends MessageBase{
}
export class S40019 extends MessageBase{
  public GuildId:number;//
  public PlayerName:string;//加入的玩家名字
  public GuildName:string;//帮派名字
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["PlayerName",MessageBase.STRING],
      ["GuildName",MessageBase.STRING],

    ]
}
// ------------------解散帮派，通知所有帮派成员，包括帮主-----------------
//-define（PT_NOTIFY_GUILD_DISBANDED, 40020）.      
// 协议号: 40020
export class C40020 extends MessageBase{
}
export class S40020 extends MessageBase{
  public GuildId:number;//
  public PlayerName:string;//寨主名字
  public GuildName:string;//帮派名字
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["PlayerName",MessageBase.STRING],
      ["GuildName",MessageBase.STRING],

    ]
}
// -----------------任命，通知所有帮派成员----------------
// 【职位】【操作者名】将【被操作者名】从【前职位】提升到【现职位】
// 【职位】【操作者名】将【被操作者名】从【前职位】降职到【现职位】
//-define（PT_NOTIFY_MEMBER_POS_CHANGE, 40021）.
// 协议号: 40021
export class C40021 extends MessageBase{
}
export class S40021 extends MessageBase{
  public OpPos:number;//操作者职位
  public OpName:string;//操作者名字
  public OpedName:string;//被操作者名字
  public OpedPrePos:number;//被操作者前职位
  public OpedNowPos:number;//被操作者现在职位
  public static DES : Array<any> =
     [
      ["OpPos",MessageBase.UINT8],
      ["OpName",MessageBase.STRING],
      ["OpedName",MessageBase.STRING],
      ["OpedPrePos",MessageBase.UINT8],
      ["OpedNowPos",MessageBase.UINT8],

    ]
}
// ------------退出帮派 通知所有帮派成员，包括帮主 不包括主动退出的成员 -------------------
//-define（PT_NOTIFY_QUIT_GUILD, 40022）.
// 协议号: 40022
export class C40022 extends MessageBase{
}
export class S40022 extends MessageBase{
  public GuildId:number;//
  public PlayerName:string;//退出的玩家名字
  public GuildName:string;//帮派名字
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["PlayerName",MessageBase.STRING],
      ["GuildName",MessageBase.STRING],

    ]
}
// ------------踢出帮派 通知所有帮派成员，包括帮主 -------------------
//-define（PT_NOTIFY_KICK_OUT_GUILD, 40023）.
// 协议号: 40023
export class C40023 extends MessageBase{
}
export class S40023 extends MessageBase{
  public GuildId:number;//
  public OpPos:number;//操作者职位
  public OpName:string;//操作者名字
  public OpedName:string;//被操作者名字
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["OpPos",MessageBase.UINT8],
      ["OpName",MessageBase.STRING],
      ["OpedName",MessageBase.STRING],

    ]
}
export class C40024_1 extends MessageBase{
}
export class S40024_1 extends MessageBase{
  public Type:number;//1，2，3，4分别表示：基本工资，职位薪资，贡献度薪资，贡献度排行薪资
  public State:number;//1已经领取，0还没有领取
  public Count:number;//工资数量
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["State",MessageBase.UINT8],
      ["Count",MessageBase.UINT32],

    ]
}
//-----------------------查询自己的帮派工资-----------------------------
//-define（PT_QUERY_GUILD_PAY, 40024）.
// 协议号: 40024
export class C40024 extends MessageBase{
}
export class S40024 extends MessageBase{
   public item_1 : S40024_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40024_1]],

    ]
}
//-----------------------领取自己的帮派工资-----------------------------
//-define（PT_GET_GUILD_PAY, 40025）.
// 协议号: 40025
export class C40025 extends MessageBase{
  public Type:number;//1，2，3，4分别表示：基本工资，职位薪资，贡献度薪资，贡献度排行薪资
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],

    ]
}
export class S40025 extends MessageBase{
  public RetCode:number;//0//>成功返回0
  public Type:number;//1，2，3，4分别表示：基本工资，职位薪资，贡献度薪资，贡献度排行薪资
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Type",MessageBase.UINT8],

    ]
}
export class C40026_1 extends MessageBase{
}
export class S40026_1 extends MessageBase{
  public Key:number;//信息代号1//帮派等级
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT8],
      ["NewValue",MessageBase.UINT32],

    ]
}
//----------- 通知客户端：更新帮派一个或多个信息 ------------
//-define（PT_NOTIFY_GUILD_INFO_CHANGE,  40026）.
// 协议号：40026
export class C40026 extends MessageBase{
}
export class S40026 extends MessageBase{
   public item_1 : S40026_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40026_1]],

    ]
}
export class C40027_1 extends MessageBase{
}
export class S40027_1 extends MessageBase{
    //奖励
  public GoodsId:number;//
  public GoodsNo:number;//
  public GoodsNum:number;//
  public GoodsQua:number;//
  public BindState:number;//
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsNum",MessageBase.UINT32],
      ["GoodsQua",MessageBase.UINT8],
      ["BindState",MessageBase.UINT8],

    ]
}
//=========================
//帮派每一层副本结束发送客户端的相关信息
//-define（PT_GUILD_NOTIFY_DUNGEON_RET, 40027）.
//协议号：40027
export class C40027 extends MessageBase{
}
export class S40027 extends MessageBase{
  public WinState:number;//0表示失败，1表示成功
   public item_1 : S40027_1[];
  public static DES : Array<any> =
     [
      ["WinState",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40027_1]],

    ]
}
// 查询副本内界面信息
//-define（PT_GUILD_GET_DUNGEON_INFO, 40028）.
//协议号：40028
export class C40028 extends MessageBase{
}
export class S40028 extends MessageBase{
  public Floor:number;//当前层数
  public LeftTime:number;//通关剩余时间，单位是s
  public CurPoint:number;//当前总副本点数
  public NeedPoint:number;//通关需要总副本点数当前进度=CurPoint/NeedPoint
  public Collect:number;//当前资源采集数
  public KillMon:number;//当前杀怪数
  public static DES : Array<any> =
     [
      ["Floor",MessageBase.UINT16],
      ["LeftTime",MessageBase.UINT32],
      ["CurPoint",MessageBase.UINT32],
      ["NeedPoint",MessageBase.UINT32],
      ["Collect",MessageBase.UINT32],
      ["KillMon",MessageBase.UINT32],

    ]
}
// 帮派副本进入
//-define（PT_GUILD_DUNGEON_ENTER, 40029）.
//协议号：40029
export class C40029 extends MessageBase{
}
export class S40029 extends MessageBase{
}
// 帮派宴会加菜
//-define（PT_GUILD_ADD_DISHES, 40030）.
//协议号：40030
export class C40030 extends MessageBase{
  public DishesNo:number;//菜的编号
  public static DES : Array<any> =
     [
      ["DishesNo",MessageBase.UINT8],

    ]
}
export class S40030 extends MessageBase{
  public RetCode:number;//成功返回0，失败通过998返回
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C40060_1 extends MessageBase{
}
export class S40060_1 extends MessageBase{
  public No:number;//加菜编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
// 推送帮派加菜信息变化
//-define（PT_GUILD_GET_DISHES, 40060）.
//协议号：40060
export class C40060 extends MessageBase{
}
export class S40060 extends MessageBase{
   public item_1 : S40060_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40060_1]],

    ]
}
// 玩家主动退出帮派副本此协议没用，现在退出副本用退出普通副本协议
//-define（PT_GUILD_DUNGEON_QUIT, 40031）.
//协议号：40031
export class C40031 extends MessageBase{
}
export class S40031 extends MessageBase{
  public RetCode:number;//成功返回0，失败通过998返回
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 玩家在帮派副本采集资源
//-define（PT_GUILD_DUNGEON_COLLECT, 40032）.
//协议号：40032
export class C40032 extends MessageBase{
  public NpcId:number;//
  public static DES : Array<any> =
     [
      ["NpcId",MessageBase.UINT32],

    ]
}
export class S40032 extends MessageBase{
  public RetCode:number;//成功返回0，失败通过998返回
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C40033_1 extends MessageBase{
}
export class S40033_1 extends MessageBase{
  public RetCode:number;//0//成功，1//成功暴击其他如：见prompt_msg_code.hrl
  public AddCultivate:number;//本次增加的值
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT16],
      ["AddCultivate",MessageBase.UINT32],

    ]
}
//-----------------修炼-----------------------------------
//-define（PT_GUILD_CULTIVATE, 40033）.
// 协议号:40033
export class C40033 extends MessageBase{
  public ObjInfoCode:number;//属性代号根据obj_info_code.hrl文件
  public Count:number;//修炼次数
  public Type:number;//1表示使用银子和帮贡；2表示使用人物经验和帮贡
  public static DES : Array<any> =
     [
      ["ObjInfoCode",MessageBase.UINT8],
      ["Count",MessageBase.UINT8],
      ["Type",MessageBase.UINT8],

    ]
}
export class S40033 extends MessageBase{
   public item_1 : S40033_1[];
  public Cultivate:number;//最后的修炼值
  public CultivateLv:number;//最后的修炼等级
  public ObjInfoCode:number;//属性代号根据obj_info_code.hrl文件
  public Type:number;//1表示使用银子和帮贡；2表示使用人物经验和帮贡
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40033_1]],
      ["Cultivate",MessageBase.UINT32],
      ["CultivateLv",MessageBase.UINT16],
      ["ObjInfoCode",MessageBase.UINT8],
      ["Type",MessageBase.UINT8],

    ]
}
// 使用神功丸
//-define（PT_GUILD_USE_GOODS, 40034）.
// 协议号:40034
export class C40034 extends MessageBase{
  public ObjInfoCode:number;//属性代号根据obj_info_code.hrl文件
  public GoodsNo:number;//物品编号
  public Count:number;//数量
  public static DES : Array<any> =
     [
      ["ObjInfoCode",MessageBase.UINT8],
      ["GoodsNo",MessageBase.UINT32],
      ["Count",MessageBase.UINT8],

    ]
}
export class S40034 extends MessageBase{
  public Cultivate:number;//最后的修炼值
  public CultivateLv:number;//最后的修炼等级
  public ObjInfoCode:number;//属性代号根据obj_info_code.hrl文件
  public static DES : Array<any> =
     [
      ["Cultivate",MessageBase.UINT32],
      ["CultivateLv",MessageBase.UINT16],
      ["ObjInfoCode",MessageBase.UINT8],

    ]
}
// 返回40037或998
//-define（PT_GUILD_DONATE, 40035）.
// 协议号:40035
export class C40035 extends MessageBase{
  public IsPay:number;//是否花费元宝捐赠1-是，0-否
  public static DES : Array<any> =
     [
      ["IsPay",MessageBase.UINT8],

    ]
}
export class S40035 extends MessageBase{
}
export class C40036_1 extends MessageBase{
}
export class S40036_1 extends MessageBase{
  public ObjInfoCode:number;//属性代号根据obj_info_code.hrl文件
  public Lv:number;//该属性点修等级
  public Value:number;//该属性点修值
  public static DES : Array<any> =
     [
      ["ObjInfoCode",MessageBase.UINT8],
      ["Lv",MessageBase.UINT8],
      ["Value",MessageBase.UINT32],

    ]
}
//无
// 获取点修信息
//-define（PT_GUILD_GET_CULTIVATE_INFO, 40036）.
// 协议号:40036
export class C40036 extends MessageBase{
}
export class S40036 extends MessageBase{
  public GuildLv:number;//所在帮派的等级
  public Contri:number;//玩家可用贡献度数量
   public item_1 : S40036_1[];
  public static DES : Array<any> =
     [
      ["GuildLv",MessageBase.UINT8],
      ["Contri",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40036_1]],

    ]
}
// 获取捐献信息
//-define（PT_GUILD_GET_DONATE_INFO, 40037）.
// 协议号:40037
export class C40037 extends MessageBase{
  public IsRefresh:number;//是否花费元宝刷新1-是，0-否
  public static DES : Array<any> =
     [
      ["IsRefresh",MessageBase.UINT8],

    ]
}
export class S40037 extends MessageBase{
  public DonateNo:number;//捐献编号
  public DonateToday:number;//今日捐献次数
  public static DES : Array<any> =
     [
      ["DonateNo",MessageBase.UINT32],
      ["DonateToday",MessageBase.UINT32],

    ]
}
// 服务端通知大当家和军师有人申请加入帮派，收到此信息后，如果玩家点击这个消息则请求帮派申请列表信息
//-define（PT_GUILD_NOTIFY_PLAYER_APPLY, 40038）.
// 协议号:40038
export class C40038 extends MessageBase{
}
export class S40038 extends MessageBase{
}
//无
// 帮派战报名
//-define（PT_GUILD_BID_FOR_BATTLE, 40039）.
// 协议号:40039
export class C40039 extends MessageBase{
  public Money:number;//
  public static DES : Array<any> =
     [
      ["Money",MessageBase.UINT32],

    ]
}
export class S40039 extends MessageBase{
  public RetCode:number;//0表示成功，其他通过998协议返回
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C40040_1 extends MessageBase{
}
export class S40040_1 extends MessageBase{
  public PlayerId:number;//
  public Pos:number;//职位
  public Money:number;//总投标金额
  public Name:string;//玩家名字
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Pos",MessageBase.UINT8],
      ["Money",MessageBase.UINT32],
      ["Name",MessageBase.STRING],

    ]
}
// 获取成员投标帮派战列表
//-define（PM_GUILD_GET_BID_LIST, 40040）.
// 协议号:40040
export class C40040 extends MessageBase{
}
export class S40040 extends MessageBase{
  public TotalMoney:number;//总投标价格
  public MinNeedMoney:number;//中标至少投标值（金钱）上一次比赛第四名帮派总出价的一半
   public item_1 : S40040_1[];
  public static DES : Array<any> =
     [
      ["TotalMoney",MessageBase.UINT32],
      ["MinNeedMoney",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40040_1]],

    ]
}
export class C40041_1 extends MessageBase{
}
export class S40041_1 extends MessageBase{
  public Round:number;//
  public StartTime:number;//开始时间戳
  public static DES : Array<any> =
     [
      ["Round",MessageBase.UINT8],
      ["StartTime",MessageBase.UINT32],

    ]
}
export class C40041_2 extends MessageBase{
}
export class S40041_2 extends MessageBase{
  public Slot:number;//赛场格子编号
  public GuildId:number;//帮派id如果该赛场没有帮派参加，则为0
  public GuildName:string;//帮派名字
  public static DES : Array<any> =
     [
      ["Slot",MessageBase.UINT8],
      ["GuildId",MessageBase.UINT64],
      ["GuildName",MessageBase.STRING],

    ]
}
// 获取帮派争夺站分组规则
//-define（PM_GUILD_BATTLE_GROUP, 40041）.
// 协议号：40041
export class C40041 extends MessageBase{
}
export class S40041 extends MessageBase{
  public Round:number;//下场比赛轮数（总共4轮）当处于报名阶段则为0
   public item_1 : S40041_1[];
  public FirstGuildName:string;//上届冠军
   public item_2 : S40041_2[];
  public static DES : Array<any> =
     [
      ["Round",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40041_1]],
      ["FirstGuildName",MessageBase.STRING],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S40041_2]],

    ]
}
//签到 帮派争夺战签到即进入：帮派战准备区
//-define（PM_GUILD_SIGN_IN_FOR_GB, 40042）.
// 协议号:40042
export class C40042 extends MessageBase{
}
export class S40042 extends MessageBase{
  public RetCode:number;//0表示成功，其他通过998协议返回
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 获取 在 帮派争夺战准备副本里面自己的信息，进入时，玩家自己请求，有变化时，服务端推送
//-define（PM_GUILD_GET_INFO_BEFORE_GB, 40043）.
// 协议号:40043
export class C40043 extends MessageBase{
}
export class S40043 extends MessageBase{
  public CurPhyPower:number;//当前体力
  public AllPhyPower:number;//总体力
  public CurPlayer:number;//当前到场人数
  public StartTime:number;//开始时间戳
  public static DES : Array<any> =
     [
      ["CurPhyPower",MessageBase.UINT32],
      ["AllPhyPower",MessageBase.UINT32],
      ["CurPlayer",MessageBase.UINT32],
      ["StartTime",MessageBase.UINT32],

    ]
}
// 获取 在 帮派争夺战战斗副本里面自己的信息，进入时，玩家自己请求，有变化时，服务端推送
//-define（PM_GUILD_GET_INFO_IN_GB, 40044）.
// 协议号:40044
export class C40044 extends MessageBase{
}
export class S40044 extends MessageBase{
  public CurPhyPower:number;//当前体力
  public AllPhyPower:number;//总体力
  public SelfPlayer:number;//本方人数
  public OtherPlayer:number;//对方人数
  public LeftTime:number;//剩余时间（单位s）
  public OtherGuildName:string;//对方帮派名字
  public static DES : Array<any> =
     [
      ["CurPhyPower",MessageBase.UINT32],
      ["AllPhyPower",MessageBase.UINT32],
      ["SelfPlayer",MessageBase.UINT32],
      ["OtherPlayer",MessageBase.UINT32],
      ["LeftTime",MessageBase.UINT32],
      ["OtherGuildName",MessageBase.STRING],

    ]
}
export class C40045_1 extends MessageBase{
}
export class S40045_1 extends MessageBase{
    //奖励
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
//帮派战结束发送客户端的相关信息
//-define（PT_GUILD_NOTIFY_GB_RET, 40045）.
//协议号：40045
export class C40045 extends MessageBase{
}
export class S40045 extends MessageBase{
  public WinState:number;//0表示失败，1表示成功
   public item_1 : S40045_1[];
  public static DES : Array<any> =
     [
      ["WinState",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40045_1]],

    ]
}
// 在帮派争夺战中向其他玩家发起挑战
//-define（PT_GUILD_START_WAR_PK, 40046）.
// 协议号：40046
export class C40046 extends MessageBase{
}
export class S40046 extends MessageBase{
}
//无
// 退出：帮派战准备区
//-define（PM_GUILD_QUIT_PRE_WAR, 40047）.
// 协议号:40047
export class C40047 extends MessageBase{
}
export class S40047 extends MessageBase{
  public RetCode:number;//0表示成功，其他通过998协议返回
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 获取当前是否能够报名帮派争霸赛
//-define（PM_GUILD_QRY_SIGE_IN_STATE, 40048）.
// 协议号:40048
export class C40048 extends MessageBase{
}
export class S40048 extends MessageBase{
  public CanSignIn:number;//1表示可以报名，其他不可以报名
  public static DES : Array<any> =
     [
      ["CanSignIn",MessageBase.UINT8],

    ]
}
// 退出：帮派战战斗区
//-define（PM_GUILD_QUIT_WAR, 40049）.
// 协议号:40049
export class C40049 extends MessageBase{
}
export class S40049 extends MessageBase{
  public RetCode:number;//0表示成功，其他通过998协议返回
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 服务端通知 每个参赛成员 比赛结果
//-define（PM_GUILD_WAR_RET, 40050）.
// 协议号:40050
export class C40050 extends MessageBase{
}
export class S40050 extends MessageBase{
  public RetCode:number;//0表示胜利，1表示失败
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// --------------- 修改帮派名字 -------------------------
//-define（PT_MODIFY_GUILD_NAME,  40051）.
// 协议号:40051
export class C40051 extends MessageBase{
  public GoodsId:number;//消耗的物品id
  public Name:string;//名字
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Name",MessageBase.STRING],

    ]
}
export class S40051 extends MessageBase{
}
//PT_NOTIFY_PLAYER_AOI_INFO_CHANGE2 （12018协议）
// --------------- 查看帮派洗点价格 -------------------------
//-define（PT_GUILD_GET_WASH_CONS, 40052）.
// 协议号:40052
export class C40052 extends MessageBase{
}
export class S40052 extends MessageBase{
  public NeedGameMoney:number;//需要的金额
  public static DES : Array<any> =
     [
      ["NeedGameMoney",MessageBase.UINT32],

    ]
}
// --------------- 帮派点修洗点 -------------------------
//-define（PT_GUILD_DO_WASH, 40053）.
// 协议号:40053
export class C40053 extends MessageBase{
}
export class S40053 extends MessageBase{
  public RetCode:number;//0表示成功，1表示失败
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// --------------- 帮派技能升级 -------------------------
//-define（PT_GUILD_SKILL_LEVEL_UP, 40054）.
// 协议号:40054
export class C40054 extends MessageBase{
  public No:number;//技能编号
  public Count:number;//升级几次
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],

    ]
}
export class S40054 extends MessageBase{
  public No:number;//
  public Lv:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT32],

    ]
}
export class C40055_1 extends MessageBase{
}
export class S40055_1 extends MessageBase{
  public No:number;//
  public Lv:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT32],

    ]
}
// 获取技能信息
//-define（PT_GUILD_GET_ALL_SKILL, 40055）.
// 协议号:40055
export class C40055 extends MessageBase{
}
export class S40055 extends MessageBase{
   public item_1 : S40055_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40055_1]],

    ]
}
// --------------- 帮派技能使用 -------------------------
//-define（PT_GUILD_SKILL_USE, 40056）.
// 协议号:40056
export class C40056 extends MessageBase{
  public No:number;//技能编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S40056 extends MessageBase{
  public No:number;//
  public GoodsId:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class C40057_1 extends MessageBase{
}
export class S40057_1 extends MessageBase{
  public No:number;//
  public Lv:number;//
  public Point:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT32],
      ["Point",MessageBase.UINT32],

    ]
}
// 获取技能信息
//-define（PT_GET_ALL_CULTIVATE_SKILL, 40057）.
// 协议号:40057
export class C40057 extends MessageBase{
}
export class S40057 extends MessageBase{
   public item_1 : S40057_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40057_1]],

    ]
}
// --------------- 点修技能升级 -------------------------
//-define（PT_CULTIVATE_SKILL_LEVEL_UP, 40058）.
// 协议号:40054
export class C40058 extends MessageBase{
  public No:number;//技能编号
  public Count:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Count",MessageBase.UINT8],

    ]
}
export class S40058 extends MessageBase{
  public No:number;//
  public Lv:number;//
  public Point:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT32],
      ["Point",MessageBase.UINT32],

    ]
}
// --------------- 帮派技能升级 -------------------------
//-define（PT_GUILD_CULTIVATE_USE_GOODS, 40059）.
// 协议号:40054
export class C40059 extends MessageBase{
  public No:number;//技能编号
  public Count:number;//使用几个
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],

    ]
}
export class S40059 extends MessageBase{
  public No:number;//
  public Lv:number;//
  public Point:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT32],
      ["Point",MessageBase.UINT32],

    ]
}
export class C40061_1 extends MessageBase{
}
export class S40061_1 extends MessageBase{
  public No:number;//
  public Lv:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Lv",MessageBase.UINT32],

    ]
}
// ---------- 一键升级 -----------------
//-define（PT_GUILD_SKILL_LEVEL_UP_ONE_KEY, 40061）.
// 协议号: 40061
export class C40061 extends MessageBase{
}
export class S40061 extends MessageBase{
   public item_1 : S40061_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S40061_1]],

    ]
}
// --------------- 帮派申请处理状态切换 -------------------------
//-define（PT_GUILD_HANDLE_APPLY_STATE_CHANGE, 40062）.
// 协议号:40062
export class C40062 extends MessageBase{
  public GuildId:number;//帮会ID
  public HandleApplyState:number;//帮派申请处理状态0//>无需审核入帮1//>正常申请入帮2//>禁止申请入帮
  public static DES : Array<any> =
     [
      ["GuildId",MessageBase.UINT64],
      ["HandleApplyState",MessageBase.UINT8],

    ]
}
export class S40062 extends MessageBase{
  public HandleApplyState:number;//帮派申请处理状态0//>无需审核入帮1//>正常申请入帮2//>禁止申请入帮
  public static DES : Array<any> =
     [
      ["HandleApplyState",MessageBase.UINT8],

    ]
}
