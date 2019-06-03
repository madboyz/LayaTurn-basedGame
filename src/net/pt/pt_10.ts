import { MessageBase } from "../../message/messageBase/MessageBase";
// =======================================
// 账户，登录相关的协议
// 分类号:10
//
// Author: huangjf
// Created: 2013.5.30
// ======================================
// PT: 表示protocol
// 注：登录的正确流程是： 请求登录 -> 获取角色列表 -> 创建或删除角色（可选） -> 选择角色进入游戏。
//流程不要有错，否则服务端会检验并断开与客户端的连接。
// --------------- 请求登录 -------------------------
//-define（PT_LOGIN_REQ, 10000）.
// 协议号:10000
export class C10000 extends MessageBase{
  public Account:string;//账户名
  public Md5Auth:string;//后台发给客户端的Md5登录验证字符串，格式:时间戳|随机数|sign（后台md5计算结果）
  public PhoneModel:string;//手机型号
  public PhoneMAC:string;//手机MAC地址
  public FromServerId:number;//表示是从哪个服登录（合服之后，有必要知道此信息），FromServerId=平台号*10000+平台下的服务器流水编号，比如：10001
  public static DES : Array<any> =
     [
      ["Account",MessageBase.STRING],
      ["Md5Auth",MessageBase.STRING],
      ["PhoneModel",MessageBase.STRING],
      ["PhoneMAC",MessageBase.STRING],
      ["FromServerId",MessageBase.UINT32],

    ]
}
export class S10000 extends MessageBase{
  public RetCode:number;//成功则返回0，否则返回下面定义的失败原因值（//表示无符号的8位整型，下同）
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
export class C10002_1 extends MessageBase{
}
export class S10002_1 extends MessageBase{
  public Id:number;//角色ID（全局唯一）
  public LocalId:number;//角色在服务器内部的流水id（不具备全局唯一性），仅用于客户端在面板做显示给玩家看，不做他用！
  public IsBanned:number;//是否被封禁了（1：是，0：否）
  public Race:number;//种族（1：人，2：魔，3：仙，4：妖）
  public Faction:number;//门派（1~6分别代表6个门派，门派名待定）
  public Sex:number;//性别（1：男，2：女）
  public Lv:number;//等级
  public Name:string;//名字
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["LocalId",MessageBase.UINT32],
      ["IsBanned",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Lv",MessageBase.UINT8],
      ["Name",MessageBase.STRING],

    ]
}
//
//-define（LOGIN_FAIL_AUTH_FAILED, 1）.验证失败
//-define（LOGIN_FAIL_SERVER_CLOSED, 2）.服务器未开启
//-define（LOGIN_FAIL_IP_BANNED , 3）.IP被封禁了
// --------------- 获取角色列表 -------------------------
//-define（PT_GET_ACC_ROLE_LIST,  10002）.
// 协议号:10002
export class C10002 extends MessageBase{
}
export class S10002 extends MessageBase{
  public RetCode:number;//获取成功返回0，失败则返回1
   public item_1 : S10002_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S10002_1]],

    ]
}
// --------------- 创建角色 -------------------------
//-define（PT_CREATE_ROLE,  10003）.
// 协议号:10003
export class C10003 extends MessageBase{
  public Race:number;//种族（1：人，2：魔，3：仙，4：妖）
  public Sex:number;//性别（1：男，2：女）
  public Faction:number;//门派（1\2\3\4\5\6）
  public Name:string;//名字
  public Channel:string;//渠道
  public UserID:string;//渠道唯一账号
  public static DES : Array<any> =
     [
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Name",MessageBase.STRING],
      ["Channel",MessageBase.STRING],
      ["UserID",MessageBase.STRING],

    ]
}
export class S10003 extends MessageBase{
  public RetCode:number;//成功则返回0，否则返回下面定义的失败原因值
  public NewRoleId:number;//新建角色的id，全局唯一（若创建失败，则该值无效，固定返回0）
  public NewRoleLocalId:number;//新建角色的服务器内部流水id，不具备全局唯一性，仅用于客户端在面板做显示给玩家看，不做他用（若创建失败，则该值无效，固定返回0）
  public Race:number;//种族
  public Sex:number;//性别
  public Faction:number;//门派（1\2\3\4\5\6）
  public Name:string;//名字
  public TimeStamp:number;//unix时间戳
    //-define（CR_FAIL_UNKNOWN,1）.失败（未知错误）
    //-define（CR_FAIL_ROLE_LIST_FULL,2）.角色列表满了，不能再创建
    //-define（CR_FAIL_NAME_EMPTY,3）.角色名不能为空
    //-define（CR_FAIL_NAME_TOO_SHORT,4）.角色名太短
    //-define（CR_FAIL_NAME_TOO_LONG,5）.角色名太长
    //-define（CR_FAIL_CHAR_ILLEGAL,6）.角色名包含非法字符
    //-define（CR_FAIL_NAME_CONFLICT,7）.角色名已经被使用了，请重新输入名字
    //-define（CR_FAIL_FACTION_ERROR,8）.门派非法
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["NewRoleId",MessageBase.UINT64],
      ["NewRoleLocalId",MessageBase.UINT32],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Name",MessageBase.STRING],
      ["TimeStamp",MessageBase.UINT32],

    ]
}
//-define（CR_FAIL_UNKNOWN,1）.失败（未知错误）
//-define（CR_FAIL_ROLE_LIST_FULL,2）.角色列表满了，不能再创建
//-define（CR_FAIL_NAME_EMPTY,3）.角色名不能为空
//-define（CR_FAIL_NAME_TOO_SHORT,4）.角色名太短
//-define（CR_FAIL_NAME_TOO_LONG,5）.角色名太长
//-define（CR_FAIL_CHAR_ILLEGAL,6）.角色名包含非法字符
//-define（CR_FAIL_NAME_CONFLICT,7）.角色名已经被使用了，请重新输入名字
//-define（CR_FAIL_FACTION_ERROR,8）.门派非法
// --------------- 请求进入游戏 -------------------------
//-define（PT_ENTER_GAME, 10004）.
// 协议号:10004
export class C10004 extends MessageBase{
  public Id:number;//角色id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S10004 extends MessageBase{
  public RetCode:number;//成功则返回0，否则返回下面定义的失败原因值（若成功，则客户端随后发13001协议查询玩家信息，然后开始加载场景）
  public Id:number;//角色id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Id",MessageBase.UINT64],

    ]
}
//
//-define（ENTER_GAME_FAIL_UNKNOWN,1）.失败（未知错误）
//-define（ENTER_GAME_FAIL_ROLE_BANNED,2）.角色被封禁了
//-define（ENTER_GAME_FAIL_SERVER_FULL,3）.服务器人满了
//-define（ENTER_GAME_FAIL_SERVER_BUSY,4）.服务器繁忙，请稍后再试
// --------------- 删除角色 -------------------------
//-define（PT_DISCARD_ROLE, 10005）.
// 协议号:10005
export class C10005 extends MessageBase{
  public Id:number;//角色id
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S10005 extends MessageBase{
  public RetCode:number;//删除成功返回0，失败返回1
  public Id:number;//角色id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Id",MessageBase.UINT64],

    ]
}
// --------------- 心跳包 -------------------------
//-define（PT_CONNECTION_HEARTBEAT, 10006）.
// 协议号:10006
export class C10006 extends MessageBase{
}
export class S10006 extends MessageBase{
}
//无（只发协议号）
// --------------- 通知客户端：账号在别处登录了 -------------------------
//-define（PT_NOTIFY_ACC_RELOGIN, 10007）.
// 协议号:10007
export class C10007 extends MessageBase{
}
export class S10007 extends MessageBase{
}
//无（只发协议号）
// --------------- 查询服务器的时间戳 -------------------------
//-define（PT_QUERY_SERVER_TIMESTAMP, 10008）.
// 协议号:10008
export class C10008 extends MessageBase{
}
export class S10008 extends MessageBase{
  public TimeStamp:number;//unix时间戳
  public static DES : Array<any> =
     [
      ["TimeStamp",MessageBase.UINT32],

    ]
}
export class C10009 extends MessageBase{
}
export class S10009 extends MessageBase{
}
// --------------- 客户端通知服务端：客户端已初始化完毕 -------------------------
//-define（PT_C2S_NOTIFY_INIT_DONE, 10009）.
// --------------- 通知客户端：即将被服务器强行断开 -------------------------
//-define（PT_NOTIFY_WILL_BE_FORCE_DISCONN_SOON, 10010）.
// 协议号:10010
export class C10010 extends MessageBase{
}
export class S10010 extends MessageBase{
  public Reason:number;//被强行断开的原因（见下面的说明）
  public static DES : Array<any> =
     [
      ["Reason",MessageBase.UINT8],

    ]
}
// 原因：
// 1 => 涉嫌使用加速外挂
// 0 => 服务器停服维护
// --------------- 修改角色 -------------------------
//-define（PT_MODIFY_ROLE_NAME,  10011）.
// 协议号:10011
export class C10011 extends MessageBase{
  public GoodsId:number;//消耗的物品id
  public Name:string;//名字
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Name",MessageBase.STRING],

    ]
}
export class S10011 extends MessageBase{
}
// --------------- 查看开服时间 -------------------------
//-define（PT_OPEN_STAMP,  10012）.
// 协议号:10012
export class C10012 extends MessageBase{
}
export class S10012 extends MessageBase{
  public Timestamp:number;//
  public static DES : Array<any> =
     [
      ["Timestamp",MessageBase.UINT32],

    ]
}
// --------------- 服务器通知客户端强行更新补丁 -------------------------
//-define（PT_NOTIFY_UPDATE_CLIENT,  10013）.
// 协议号:10013
export class C10013 extends MessageBase{
}
export class S10013 extends MessageBase{
}
