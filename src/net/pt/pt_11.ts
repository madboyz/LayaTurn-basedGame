import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 分类号:11
// 描述:聊天
// =========================================================
//-define（PT_WORLD, 11001）.
// ########### 世界 ##############
// 协议号:11001
export class C11001 extends MessageBase{
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["Msg",MessageBase.STRING],

    ]
}
export class S11001 extends MessageBase{
  public Id:number;//用户ID
  public Msg:string;//内容
  public identity:number;//身份
  public name:string;//名字
  public PrivLv:number;//权限级别（0：普通玩家，1：指导员，2：GM）
  public Race:number;//种族
  public Sex:number;//职业
  public Lv:number;//等级
  public Grade:number;//排位赛段位
    //-define（PT_PERSONAL,11002）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],
      ["identity",MessageBase.UINT8],
      ["name",MessageBase.STRING],
      ["PrivLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
//-define（PT_PERSONAL, 11002）.
// ########### 发送私聊 ##############
// 协议号:11002
export class C11002 extends MessageBase{
  public ToId:number;//接受方用户ID
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["ToId",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],

    ]
}
export class S11002 extends MessageBase{
  public FromId:number;//发送方用户ID
  public Msg:string;//内容
  public identity:number;//身份
  public name:string;//名字
  public ToId:number;//接受方用户ID
  public FromPrivLv:number;//发送方的权限级别（0：普通玩家，1：指导员，2：GM）
  public Race:number;//种族
  public Sex:number;//职业
  public Lv:number;//等级
  public Grade:number;//排位赛段位
    //-define（PT_CURRENT,11003）.
  public static DES : Array<any> =
     [
      ["FromId",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],
      ["identity",MessageBase.UINT8],
      ["name",MessageBase.STRING],
      ["ToId",MessageBase.UINT64],
      ["FromPrivLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
//-define（PT_CURRENT, 11003）.
// ########### 场景 ##############
// 协议号:11003
export class C11003 extends MessageBase{
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["Msg",MessageBase.STRING],

    ]
}
export class S11003 extends MessageBase{
  public Id:number;//用户ID
  public Msg:string;//内容
  public identity:number;//身份
  public name:string;//名字
  public PrivLv:number;//权限级别（0：普通玩家，1：指导员，2：GM）
  public Race:number;//种族
  public Sex:number;//职业
  public Lv:number;//等级
  public Grade:number;//排位赛段位
    //-define（PT_SYS,11004）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],
      ["identity",MessageBase.UINT8],
      ["name",MessageBase.STRING],
      ["PrivLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
//-define（PT_SYS, 11004）.
// ########### 系统信息 ##############
// 协议号:11004
export class C11004 extends MessageBase{
}
export class S11004 extends MessageBase{
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["Msg",MessageBase.STRING],

    ]
}
//
//-define（PT_GUILD, 11005）.
// ########### 帮派 ##############
// 协议号:11005
export class C11005 extends MessageBase{
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["Msg",MessageBase.STRING],

    ]
}
export class S11005 extends MessageBase{
  public Id:number;//用户ID
  public Msg:string;//内容
  public identity:number;//身份
  public name:string;//名字
  public PrivLv:number;//权限级别（0：普通玩家，1：指导员，2：GM）
  public Race:number;//种族
  public Sex:number;//职业
  public Pos:number;//职位
  public Lv:number;//等级
  public Grade:number;//排位赛段位
    //-define（PT_TEAM,11006）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],
      ["identity",MessageBase.UINT8],
      ["name",MessageBase.STRING],
      ["PrivLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Pos",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
//-define（PT_TEAM, 11006）.
// ########### 队伍 ##############
// 协议号:11006
export class C11006 extends MessageBase{
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["Msg",MessageBase.STRING],

    ]
}
export class S11006 extends MessageBase{
  public Id:number;//用户ID
  public Msg:string;//内容
  public identity:number;//身份
  public name:string;//名字
  public PrivLv:number;//权限级别（0：普通玩家，1：指导员，2：GM）
  public Race:number;//种族
  public Sex:number;//职业
  public Lv:number;//等级
  public Grade:number;//排位赛段位
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],
      ["identity",MessageBase.UINT8],
      ["name",MessageBase.STRING],
      ["PrivLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
//
//-define（PT_HORN, 11007）.
// ########### 喇叭喊话聊天 ##############
// 协议号：11007
export class C11007 extends MessageBase{
  public SId:number;//样式id
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["SId",MessageBase.UINT16],
      ["Msg",MessageBase.STRING],

    ]
}
export class S11007 extends MessageBase{
  public Id:number;//用户ID
  public Msg:string;//内容
  public identity:number;//身份
  public name:string;//名字
  public PrivLv:number;//权限级别（0：普通玩家，1：指导员，2：GM）
  public Race:number;//种族
  public Sex:number;//职业
  public SId:number;//样式id
  public Lv:number;//等级
  public Grade:number;//排位赛段位
    //-define（PT_FACTION,11008）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],
      ["identity",MessageBase.UINT8],
      ["name",MessageBase.STRING],
      ["PrivLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["SId",MessageBase.UINT16],
      ["Lv",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
//-define（PT_FACTION, 11008）.
// ########### 种族聊天 ##############
// 协议号：11008
export class C11008 extends MessageBase{
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["Msg",MessageBase.STRING],

    ]
}
export class S11008 extends MessageBase{
  public Id:number;//用户ID
  public Msg:string;//内容
  public identity:number;//身份
  public name:string;//名字
  public PrivLv:number;//权限级别（0：普通玩家，1：指导员，2：GM）
  public Race:number;//种族
  public Sex:number;//职业
  public Lv:number;//等级
  public Grade:number;//排位赛段位
    //-define（PT_GET_ROLE_INFO,11009）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],
      ["identity",MessageBase.UINT8],
      ["name",MessageBase.STRING],
      ["PrivLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
//-define（PT_GET_ROLE_INFO, 11009）.
// ########### 获取玩家聊天相关信息 ##############
// 协议号：11009
export class C11009 extends MessageBase{
  public Id:number;//用户ID
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S11009 extends MessageBase{
  public Id:number;//用户ID
  public race:number;//种族
  public sex:number;//性别
  public Lv:number;//等级
  public name:string;//名字
  public Faction:number;//
  public VipLv:number;//
  public Bp:number;//
  public BanChat:number;//
  public GuildName:string;//
  public AchievePoint:number;//成就点
    //-define（PT_CHAT_BAN,11010）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["race",MessageBase.UINT8],
      ["sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT16],
      ["name",MessageBase.STRING],
      ["Faction",MessageBase.UINT8],
      ["VipLv",MessageBase.UINT8],
      ["Bp",MessageBase.UINT32],
      ["BanChat",MessageBase.UINT8],
      ["GuildName",MessageBase.STRING],
      ["AchievePoint",MessageBase.UINT32],

    ]
}
//-define（PT_CHAT_BAN, 11010）.
// ########### 禁言 ##############
// 协议号：11010
export class C11010 extends MessageBase{
}
export class S11010 extends MessageBase{
  public time:number;//禁言结束时间长度（sec，0->永久禁言）
  public reason:string;//原因
    //-define（PT_ARENA,11011）.
  public static DES : Array<any> =
     [
      ["time",MessageBase.UINT32],
      ["reason",MessageBase.STRING],

    ]
}
//-define（PT_ARENA, 11011）.
// ########### 跨服竞技频道 ##############
// 协议号:11011
export class C11011 extends MessageBase{
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["Msg",MessageBase.STRING],

    ]
}
export class S11011 extends MessageBase{
  public Id:number;//用户ID
  public Msg:string;//内容
  public identity:number;//身份
  public name:string;//名字
  public PrivLv:number;//权限级别（0：普通玩家，1：指导员，2：GM）
  public Race:number;//种族
  public Sex:number;//职业
  public Lv:number;//等级
  public Grade:number;//排位赛段位
    //-define（PT_STATE,11100）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],
      ["identity",MessageBase.UINT8],
      ["name",MessageBase.STRING],
      ["PrivLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
//-define（PT_STATE, 11100）.
// ########### 聊天状态返回 ##############
// 协议号：11100
export class C11100 extends MessageBase{
}
export class S11100 extends MessageBase{
  public cmd:number;//协议号
  public state:number;//状态（0:消息过长other:）
  public static DES : Array<any> =
     [
      ["cmd",MessageBase.UINT16],
      ["state",MessageBase.UINT8],

    ]
}
export class C11201_1 extends MessageBase{
}
export class S11201_1 extends MessageBase{
  public Id:number;//id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT32],

    ]
}
//协议对应失败原因
//110011:CD未到
//110021:对方不在线
//110051:没有帮派
//110061:没有队伍
//110071:没有喇叭
//-define（PT_GET_BACKGROUND_ID_LIST, 11201）.
// ########### 玩家进入游戏后获取当前用到的广播id列表 ##############
// 协议号：11201
export class C11201 extends MessageBase{
}
export class S11201 extends MessageBase{
   public item_1 : S11201_1[];
    //-define（PT_GET_DETAIL_OF_BROADCAST,11202）.
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S11201_1]],

    ]
}
export class C11202_1 extends MessageBase{
  public Id:number;//id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT32],

    ]
}
export class S11202_1 extends MessageBase{
}
export class C11202_2 extends MessageBase{
}
export class S11202_2 extends MessageBase{
  public Id:number;//id
  public Type:number;//公告类型1.后台运营走马灯2.系统走马灯3.聊天框信息4.私聊信息
  public Interval:number;//间隔（sec）
  public StartTime:number;//开始时间当type=3时，表示每天从0点开始经过StartTime秒后开始显示
  public EndTime:number;//结束时间当type=3时，表示每天从0点开始经过EndTime-StartTime秒后结束显示
  public Priority:number;//优先级
  public Content:string;//公告内容
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT32],
      ["Type",MessageBase.UINT8],
      ["Interval",MessageBase.UINT32],
      ["StartTime",MessageBase.UINT32],
      ["EndTime",MessageBase.UINT32],
      ["Priority",MessageBase.UINT8],
      ["Content",MessageBase.STRING],

    ]
}
//-define（PT_GET_DETAIL_OF_BROADCAST, 11202）.
// ########### 玩家获取运营后台广播信息详细信息 ##############
// 协议号：11202
export class C11202 extends MessageBase{
   public item_1 : C11202_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C11202_1]],

    ]
}
export class S11202 extends MessageBase{
   public item_2 : S11202_2[];
    //-define（PT_DEL_BROADCAST,11203）.
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S11202_2]],

    ]
}
//-define（PT_DEL_BROADCAST, 11203）.
// ########### 删除某条运营后台广播信息 ##############
// 协议号：11203
export class C11203 extends MessageBase{
}
export class S11203 extends MessageBase{
  public Id:number;//
    //-define（PT_ADD_BROADCAST,11204）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT32],

    ]
}
//-define（PT_ADD_BROADCAST, 11204）.
// ########### 新增运营后台广播信息 ##############
// 协议号：11204
export class C11204 extends MessageBase{
}
export class S11204 extends MessageBase{
  public Id:number;//id
  public Type:number;//公告类型1.后台运营走马灯2.系统走马灯3.聊天框信息4.私聊信息
  public Interval:number;//间隔（sec）
  public StartTime:number;//开始时间
  public EndTime:number;//结束时间
  public Priority:number;//优先级（1：立即，2：高，3：低）
  public Content:string;//公告内容
    //-define（PT_SEND_SYS_BROADCAST,11205）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT32],
      ["Type",MessageBase.UINT8],
      ["Interval",MessageBase.UINT32],
      ["StartTime",MessageBase.UINT32],
      ["EndTime",MessageBase.UINT32],
      ["Priority",MessageBase.UINT8],
      ["Content",MessageBase.STRING],

    ]
}
export class C11205_1 extends MessageBase{
}
export class S11205_1 extends MessageBase{
  public Value:string;//字符串参数
  public static DES : Array<any> =
     [
      ["Value",MessageBase.STRING],

    ]
}
//-define（PT_SEND_SYS_BROADCAST, 11205）.
// ########### 发送系统广播信息（包括个人提示、队伍与全服提示信息） ##############
// 协议号：11205
export class C11205 extends MessageBase{
}
export class S11205 extends MessageBase{
  public No:number;//
   public item_1 : S11205_1[];
    //-define（PT_BAN_CHAT,11300）.
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S11205_1]],

    ]
}
//-define（PT_BAN_CHAT, 11300）.
// ########### 使某人禁言 ##############
// 协议号：11300
export class C11300 extends MessageBase{
  public TargetPlayerId:number;//目标玩家id
  public BanReason:string//禁言原因
  public BanTime:number;//禁言时间
  public static DES : Array<any> =
     [
      ["TargetPlayerId",MessageBase.UINT64],
      ["BanReason",MessageBase.STRING],
      ["BanTime",MessageBase.UINT32],

    ]
}
export class S11300 extends MessageBase{
  public RetCode:number;//禁言成功则返回0，否则不返回，而是直接发送失败提示消息协议
  public TargetPlayerId:number;//目标玩家id
    //-define（PT_CANCEL_BAN_CHAT,11301）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TargetPlayerId",MessageBase.UINT64],

    ]
}
//-define（PT_CANCEL_BAN_CHAT, 11301）.
// ########### 解除某人的禁言 ##############
// 协议号：11301
export class C11301 extends MessageBase{
  public TargetPlayerId:number;//目标玩家id
  public static DES : Array<any> =
     [
      ["TargetPlayerId",MessageBase.UINT64],

    ]
}
export class S11301 extends MessageBase{
  public RetCode:number;//解除成功则返回0，否则不返回，而是直接发送失败提示消息协议
  public TargetPlayerId:number;//目标玩家id
    //-define（PT_SHOW_GUILD_TITLE,11401）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TargetPlayerId",MessageBase.UINT64],

    ]
}
//-define（PT_SHOW_GUILD_TITLE, 11401）.
// ########### 宣传帮派宗旨 ##############
// 协议号：11401
export class C11401 extends MessageBase{
}
export class S11401 extends MessageBase{
}
