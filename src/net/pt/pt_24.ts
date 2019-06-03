import { MessageBase } from "../../message/messageBase/MessageBase";
export class C24000_1 extends MessageBase{
}
export class S24000_1 extends MessageBase{
    //当前队伍可用的阵法编号列表
  public No:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
//================ 组队系统协议 ===================
// PT: protocol
// TM: team
//----------------- 创建or修改队伍 -----------------------
//-define（PT_TM_CREATE,  24000）.
// 协议号：24000
export class C24000 extends MessageBase{
  public TeamId:number;//队伍唯一id，创建新队伍默认发送0，修改队伍发送队伍id
  public SceneNo:number;//场景的编号，即战斗地图0//任意
  public TeamActivityType:number;//队伍活动类型：0:任意，1:任务，2：副本，3：日常，4：活动
  public Condition1:number;//条件1任务类型（【任意】:0，捕星:1，【帮派】:2、【挂机】:3）或副本难度（0:任意，1：简单，2：普通，3：困难）编号
  public Condition2:number;//条件2怪物等级（0:任意，1:0~9级，2:10~19级，3:20~29级，4:30~39级，5:40~49，6:50~59，7:60~69，8:70~79，9:80~89，10:90~99）或副本编号
  public TeamMinLv:number;//队伍最低等级要求
  public TeamMaxLv:number;//队伍最高等级要求
  public TeamName:string;//队伍名字
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],
      ["SceneNo",MessageBase.UINT32],
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["TeamMinLv",MessageBase.UINT32],
      ["TeamMaxLv",MessageBase.UINT32],
      ["TeamName",MessageBase.STRING],

    ]
}
export class S24000 extends MessageBase{
  public RetCode:number;//创建成功返回0
  public TeamId:number;//队伍唯一id
  public SceneNo:number;//场景的编号，即战斗地图
  public TeamActivityType:number;//队伍活动类型：0:任意，1:任务，2：副本，3：日常，4：活动
  public Condition1:number;//条件1
  public Condition2:number;//条件2
  public InitPos:number;//队长在阵型中的初始位置
  public CurUseTroop:number;//队伍当前启用的阵法编号
  public TeamMinLv:number;//队伍最低等级要求
  public TeamMaxLv:number;//队伍最高等级要求
  public TeamName:string;//
   public item_1 : S24000_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TeamId",MessageBase.UINT32],
      ["SceneNo",MessageBase.UINT32],
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["InitPos",MessageBase.UINT8],
      ["CurUseTroop",MessageBase.UINT32],
      ["TeamMinLv",MessageBase.UINT32],
      ["TeamMaxLv",MessageBase.UINT32],
      ["TeamName",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24000_1]],

    ]
}
//-------队长交换两个队员的位置---------------------------
//-define（PT_TM_CHANGE_POS, 24001）.
// 协议号：24001
export class C24001 extends MessageBase{
  public PlayerId1:number;//
  public PlayerId2:number;//
  public static DES : Array<any> =
     [
      ["PlayerId1",MessageBase.UINT64],
      ["PlayerId2",MessageBase.UINT64],

    ]
}
export class S24001 extends MessageBase{
}
//通过24002协议通知交换了站位
// -----------------服务器主动通知所有队员更新某两个队员的站位-------------------
//-define（PT_TM_NOTIFY_MEMBER_CHANGE_POS, 24002）.
// 协议号：24002
export class C24002 extends MessageBase{
}
export class S24002 extends MessageBase{
  public PlayerId1:number;//
  public PlayerId2:number;//
  public static DES : Array<any> =
     [
      ["PlayerId1",MessageBase.UINT64],
      ["PlayerId2",MessageBase.UINT64],

    ]
}
// -----------------服务器主动通知所有队员某个队员暂离队伍-------------------
//-define（PT_TM_NOTIFY_MEMBER_TEMP_LEAVE, 24003）.
// 协议号：24003
export class C24003 extends MessageBase{
}
export class S24003 extends MessageBase{
  public PlayerId:number;//
  public SwornType:number;//队伍结拜类型0没有结拜，1普通结拜，2，生死结拜（此字段暂时没用）
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["SwornType",MessageBase.UINT8],

    ]
}
//------------------ 暂离队伍 -----------------------
//-define（PT_TM_TEM_LEAVE,  24004）.
// 协议号：24004
export class C24004 extends MessageBase{
}
export class S24004 extends MessageBase{
    //返回-define（PT_TM_NOTIFY_MEMBER_TEMP_LEAVE,24003）.
}
//返回 -define（PT_TM_NOTIFY_MEMBER_TEMP_LEAVE, 24003）.
//------------------ 退出队伍 -----------------------
// 注：退出成功后，如果队伍还有人: 则服务端会向队伍的人发送有人离队的通知（即24011协议），
//若是队长退出，则还会向队伍余下的人发送队长已更改的通知（即24012协议）;
//-define（PT_TM_QUIT,  24005）.
// 协议号：24005
export class C24005 extends MessageBase{
}
export class S24005 extends MessageBase{
}
//通过 24011 PT_TM_NOTIFY_MEMBER_QUIT 
//------------------ 邀请他人加入队伍 -----------------------
//-define（PT_TM_INVITE_OTHERS,  24006）.
// 协议号：24006
export class C24006 extends MessageBase{
  public ObjPlayerId:number;//被邀请人id
  public static DES : Array<any> =
     [
      ["ObjPlayerId",MessageBase.UINT64],

    ]
}
export class S24006 extends MessageBase{
  public RetCode:number;//发出邀请成功则返回0
  public ObjPlayerId:number;//被邀请人id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ObjPlayerId",MessageBase.UINT64],

    ]
}
//------------------ 被邀请人收到入队邀请 服务器主动发给队员------------
//-define（PT_TM_GOT_INVITE,  24007）.
// 协议号:24007
export class C24007 extends MessageBase{
}
export class S24007 extends MessageBase{
  public FromPlayerId:number;//发邀请的玩家id
  public FromPlayerName:string;//发邀请的玩家名字
  public FromPlayerLv:number;//发邀请的玩家等级
  public TeamActivityType:number;//队伍活动类型：0:任意，1:任务，2：副本，3：日常，4：活动
  public SceneNo:number;//场景的编号，即战斗地图0//任意
  public Condition1:number;//条件1
  public Condition2:number;//条件2
  public TeamBp:number;//队伍所有成功战力和
  public static DES : Array<any> =
     [
      ["FromPlayerId",MessageBase.UINT64],
      ["FromPlayerName",MessageBase.STRING],
      ["FromPlayerLv",MessageBase.UINT16],
      ["TeamActivityType",MessageBase.UINT8],
      ["SceneNo",MessageBase.UINT32],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["TeamBp",MessageBase.UINT32],

    ]
}
//--------------------- 踢出队伍（队长权限） --------------------------
// 注：踢出成功后，会向队伍的所有人（包括被踢的人）发送有人离队的通知（即24024协议）
//-define（PT_TM_KICK_OUT, 24009）.
// 协议号：24009
export class C24009 extends MessageBase{
  public ObjPlayerId:number;//被踢队员id
  public static DES : Array<any> =
     [
      ["ObjPlayerId",MessageBase.UINT64],

    ]
}
export class S24009 extends MessageBase{
}
export class C24010_1 extends MessageBase{
}
export class S24010_1 extends MessageBase{
    //数组第一个是队长
  public Id:number;//队员id
  public Level:number;//队员等级
  public Name:string;//队员名字
  public TroopPos:number;//在队伍阵型中的位置（1~9）
  public TrainPos:number;//拖火车位置
  public Faction:number;//门派
  public Sex:number;//性别（1：男，2：女）
  public SceneId:number;//场景id
  public State:number;//玩家状态：1暂离，2在队在线3在队离线
  public SceneNo:number;//场景编号
  public Race:number;//种族
  public Weapon:number;//武器
  public BackWear:number;//背部装饰
  public SwornId:number;//结拜唯一标识
  public SwornType:number;//队伍结拜类型0没有结拜，1普通结拜，2，生死结拜
  public StrenLv:number;//玩家套装最低强化等级，如果没有套装则是0
  public Headwear:number;//头饰编号
  public Clothes:number;//服饰编号
  public MagicKey:number;//法宝编号
  public BtPower:number;//战斗力
  public Grade:number;//排位赛段位
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Level",MessageBase.UINT16],
      ["Name",MessageBase.STRING],
      ["TroopPos",MessageBase.UINT8],
      ["TrainPos",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["SceneId",MessageBase.UINT32],
      ["State",MessageBase.UINT8],
      ["SceneNo",MessageBase.UINT32],
      ["Race",MessageBase.UINT8],
      ["Weapon",MessageBase.UINT32],
      ["BackWear",MessageBase.UINT32],
      ["SwornId",MessageBase.UINT64],
      ["SwornType",MessageBase.UINT8],
      ["StrenLv",MessageBase.UINT8],
      ["Headwear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["MagicKey",MessageBase.UINT32],
      ["BtPower",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
export class C24010_2 extends MessageBase{
}
export class S24010_2 extends MessageBase{
    //当前队伍可用的阵法编号列表
  public No:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
//无
//----------------- 查询自己所在队伍的信息 -------------------
//-define（PT_TM_QRY_MY_TEAM_INFO, 24010）.
// 协议号：24010
export class C24010 extends MessageBase{
}
export class S24010 extends MessageBase{
  public TeamId:number;//队伍id
   public item_1 : S24010_1[];
  public TeamName:string;//
  public TeamActivityType:number;//队伍活动类型：
  public Condition1:number;//条件1
  public Condition2:number;//条件2
  public TeamMinLv:number;//队伍最低等级要求
  public TeamMaxLv:number;//队伍最高等级要求
   public item_2 : S24010_2[];
  public CurUseTroop:number;//队伍当前启用的阵法编号
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24010_1]],
      ["TeamName",MessageBase.STRING],
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["TeamMinLv",MessageBase.UINT32],
      ["TeamMaxLv",MessageBase.UINT32],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S24010_2]],
      ["CurUseTroop",MessageBase.UINT32],

    ]
}
//------------------ 玩家主动离队，通知队伍成员：有人离队了（服务端主动通知） ------------------
//-define（PT_TM_NOTIFY_MEMBER_QUIT, 24011）.
// 协议号: 24011
export class C24011 extends MessageBase{
}
export class S24011 extends MessageBase{
  public PlayerId:number;//离队队员id
  public NewLeaderId:number;//新队长id，如果队长没有变化则为0
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["NewLeaderId",MessageBase.UINT64],

    ]
}
//------------------ 提升队员为队长（队长权限），需要被提升的队员确认，提升成功后原队长变为普通队员 ----------------
// 注：提升成功后队伍的所有人会收到队长更改的通知（即协议24012）
//-define（PT_TM_PROMOTE_MEMBER, 24012）.
// 协议号：24012
export class C24012 extends MessageBase{
  public ObjPlayerId:number;//提升目标id
  public static DES : Array<any> =
     [
      ["ObjPlayerId",MessageBase.UINT64],

    ]
}
export class S24012 extends MessageBase{
  public RetCode:number;//发送提升请求成功返回0
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 被提升队员确认或拒绝被提升为队长
//-define（PT_TM_HANDLE_PROMOTE, 24013）.
// 协议号：24013
export class C24013 extends MessageBase{
  public Action:number;//0为同意，1为拒绝
  public TeamId:number;//
  public LeaderId:number;//发送请求的队长id
  public static DES : Array<any> =
     [
      ["Action",MessageBase.UINT8],
      ["TeamId",MessageBase.UINT32],
      ["LeaderId",MessageBase.UINT64],

    ]
}
export class S24013 extends MessageBase{
}
//------------------ 通知队伍：队长换了（服务端主动通知） --------------------
//-define（PT_TM_NOTIFY_LEADER_CHANGED, 24014）.
// 协议号：24014
export class C24014 extends MessageBase{
}
export class S24014 extends MessageBase{
  public NewLeaderId:number;//新队长id
  public static DES : Array<any> =
     [
      ["NewLeaderId",MessageBase.UINT64],

    ]
}
// 队员收到信息：现任队长提升你为新队长，服务器主动发给队员
//-define（PT_TM_PROMOTE_YOU, 24015）.
export class C24015 extends MessageBase{
}
export class S24015 extends MessageBase{
  public TeamId:number;//
  public LeaderId:number;//
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],
      ["LeaderId",MessageBase.UINT64],

    ]
}
// 
// --------------------服务器主动发送：XXX申请成为队长 给队长--------------------------
//-define（PT_TM_MEM_APPLY_FOR_LEADER, 24016）.
export class C24016 extends MessageBase{
}
export class S24016 extends MessageBase{
  public PlayerId:number;//申请玩家Id
  public Name:string;//玩家名
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Name",MessageBase.STRING],

    ]
}
export class C24017_1 extends MessageBase{
}
export class S24017_1 extends MessageBase{
  public PlayerId:number;//
  public Sex:number;//
  public Name:string;//
  public Lv:number;//
  public Faction:number;//门派
  public GuildName:string;//帮派
  public SceneNo:number;//场景的编号，即战斗地图
  public TeamActivityType:number;//队伍活动类型：0:任意，1:任务，2：副本，3：日常，4：活动
  public Condition1:number;//条件1
  public Condition2:number;//条件2
  public VipLv:number;//Vip等级
  public Race:number;//
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Sex",MessageBase.UINT8],
      ["Name",MessageBase.STRING],
      ["Lv",MessageBase.UINT32],
      ["Faction",MessageBase.UINT8],
      ["GuildName",MessageBase.STRING],
      ["SceneNo",MessageBase.UINT32],
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["VipLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],

    ]
}
// 邀请玩家加入队伍时，获取落单玩家信息列表
//-define（PT_TM_GET_ALONE_PLAYER_LIST, 24017）.
// 协议号: 24017
export class C24017 extends MessageBase{
}
export class S24017 extends MessageBase{
  public RetCode:number;//返回0表示成功
   public item_1 : S24017_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24017_1]],

    ]
}
//-------------------------玩家申请当队长-------------------------
//-define（PT_TM_APPLY_FOR_LEADER, 24018）.
// 协议号：24018
export class C24018 extends MessageBase{
}
export class S24018 extends MessageBase{
  public RetCode:number;//返回0表示成功
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// -------------------队长同意或拒绝队员申请为队长的请求-----------------
//-define（PT_TM_HANDLE_APPLY_FOR, 24019）.
// 协议号：
export class C24019 extends MessageBase{
  public Action:number;//同意还是拒绝0表示拒绝，1表示同意
  public ObjPlayerId:number;//同意或拒绝目标玩家id
  public static DES : Array<any> =
     [
      ["Action",MessageBase.UINT8],
      ["ObjPlayerId",MessageBase.UINT64],

    ]
}
export class S24019 extends MessageBase{
  public RetCode:number;//拒绝成功返回0，同意则返回PT_TM_NOTIFY_LEADER_CHANGED协议
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//---------------------落单玩家同意或者拒绝队长的入队邀请--------------------------
//-define（PT_TM_HANDLE_INVITE, 24021）.
// 协议号：24021
export class C24021 extends MessageBase{
  public Action:number;//同意还是拒绝0表示拒绝，1表示同意
  public LeaderId:number;//队长id，即担任队长的玩家id
  public static DES : Array<any> =
     [
      ["Action",MessageBase.UINT8],
      ["LeaderId",MessageBase.UINT64],

    ]
}
export class S24021 extends MessageBase{
  public RetCode:number;//
  public LeaderId:number;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["LeaderId",MessageBase.UINT64],

    ]
}
// ------------------------服务器通知队长邀请玩家入队结果-------------------
//-define（PT_TM_NOTIFY_LEADER_INVITE_RESULT, 24022）.
// 协议号：24022
export class C24022 extends MessageBase{
}
export class S24022 extends MessageBase{
  public Result:number;//0表示拒绝，1表示同意
  public Name:string;//玩家名
  public static DES : Array<any> =
     [
      ["Result",MessageBase.UINT8],
      ["Name",MessageBase.STRING],

    ]
}
//----------------- 目前是有人新加入队伍后，服务端会主动通知队伍信息给队伍的所有人（包括新加入的人） -------------------
//-define（PT_TM_NOTIFY_MEMBER_JOIN, 24023）.
// 协议号：24023
export class C24023 extends MessageBase{
}
export class S24023 extends MessageBase{
  public PlayerId:number;//队员id
  public Level:number;//队员等级
  public Name:string;//队员名字
  public TroopPos:number;//在队伍阵型中的位置（1~9）
  public TrainPos:number;//在地图拖火车位置
  public Faction:number;//门派
  public Sex:number;//性别（1：男，2：女）
  public SceneId:number;//场景id
  public State:number;//玩家状态：1暂离，2在队在线3在队离线
  public SceneNo:number;//场景编号
  public Race:number;//种族
  public Weapon:number;//武器
  public BackWear:number;//背部装饰
  public SwornId:number;//结拜唯一标识
  public SwornType:number;//队伍结拜类型0没有结拜，1普通结拜，2，生死结拜
  public StrenLv:number;//玩家套装最低强化等级，如果没有套装则是0
  public Headwear:number;//头饰编号
  public Clothes:number;//服饰编号
  public MagicKey:number;//法宝编号
  public BtPower:number;//战斗力
  public Grade:number;//排位赛段位
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Level",MessageBase.UINT16],
      ["Name",MessageBase.STRING],
      ["TroopPos",MessageBase.UINT8],
      ["TrainPos",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["SceneId",MessageBase.UINT32],
      ["State",MessageBase.UINT8],
      ["SceneNo",MessageBase.UINT32],
      ["Race",MessageBase.UINT8],
      ["Weapon",MessageBase.UINT32],
      ["BackWear",MessageBase.UINT32],
      ["SwornId",MessageBase.UINT64],
      ["SwornType",MessageBase.UINT8],
      ["StrenLv",MessageBase.UINT8],
      ["Headwear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["MagicKey",MessageBase.UINT32],
      ["BtPower",MessageBase.UINT32],
      ["Grade",MessageBase.UINT8],

    ]
}
//------------------ 通知队伍成员：有人被请离队了（服务端主动通知） ------------------
//-define（PT_TM_NOTIFY_KICK_OUT_MEMBER, 24024）.
// 协议号: 24024
export class C24024 extends MessageBase{
}
export class S24024 extends MessageBase{
  public PlayerId:number;//离队队员id
  public SwornType:number;//队伍结拜类型0没有结拜，1普通结拜，2，生死结拜（此字段暂时没用）
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["SwornType",MessageBase.UINT8],

    ]
}
//--------------------服务器通知队长：XX拒绝了你的提升队长申请-------------------------
//-define（PT_TM_NOTIFY_PROMOTE_RESULT, 24025）.
// 协议号：24025
export class C24025 extends MessageBase{
}
export class S24025 extends MessageBase{
  public Result:number;//0表示同意，1表示拒绝目前只有拒绝
  public Name:string;//发起同意或拒绝动作的玩家名字
  public static DES : Array<any> =
     [
      ["Result",MessageBase.UINT8],
      ["Name",MessageBase.STRING],

    ]
}
//------------------ 通知队伍成员：有人归队了（服务端主动通知） ------------------
//-define（PT_TM_NOTIFY_MEMBER_RETURN, 24026）.
// 协议号: 24026
export class C24026 extends MessageBase{
}
export class S24026 extends MessageBase{
  public PlayerId:number;//归队队员id
  public SwornType:number;//队伍结拜类型0没有结拜，1普通结拜，2，生死结拜（此字段暂时没用）
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["SwornType",MessageBase.UINT8],

    ]
}
//------------------ 通知队伍成员：有人离线了（服务端主动通知） ------------------
//-define（PT_TM_NOTIFY_MEMBER_OFFLINE, 24027）.
// 协议号: 24027
export class C24027 extends MessageBase{
}
export class S24027 extends MessageBase{
  public PlayerId:number;//离线队员id
  public SwornType:number;//队伍结拜类型0没有结拜，1普通结拜，2，生死结拜（此字段暂时没用）
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["SwornType",MessageBase.UINT8],

    ]
}
// ----------------玩家设置组队目的------------------------------
//-define（PT_TM_SET_JOIN_AIM, 24028）.
// 协议号：24028
export class C24028 extends MessageBase{
  public TeamActivityType:number;//队伍活动类型：0:任意，1:任务，2：副本，3：日常，4：活动
  public Condition1:number;//条件1
  public Condition2:number;//条件2
  public TeamMinLv:number;//队伍最低等级要求
  public TeamMaxLv:number;//队伍最高等级要求
  public static DES : Array<any> =
     [
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["TeamMinLv",MessageBase.UINT32],
      ["TeamMaxLv",MessageBase.UINT32],

    ]
}
export class S24028 extends MessageBase{
  public RetCode:number;//
  public TeamActivityType:number;//队伍活动类型：0:任意，1:任务，2：副本，3：日常，4：活动
  public Condition1:number;//条件1
  public Condition2:number;//条件2
  public TeamMinLv:number;//队伍最低等级要求
  public TeamMaxLv:number;//队伍最高等级要求
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["TeamMinLv",MessageBase.UINT32],
      ["TeamMaxLv",MessageBase.UINT32],

    ]
}
// ------------------玩家查询获取自己的组队目的--------------------
//-define（PT_TM_GET_JOIN_AIM, 24029）.
// 协议号：24029
export class C24029 extends MessageBase{
}
export class S24029 extends MessageBase{
  public TeamActivityType:number;//队伍活动类型：0:任意，1:任务，2：副本，3：日常，4：活动
  public Condition1:number;//条件1
  public Condition2:number;//条件2
  public TeamMinLv:number;//队伍最低等级要求
  public TeamMaxLv:number;//队伍最高等级要求
  public static DES : Array<any> =
     [
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["TeamMinLv",MessageBase.UINT32],
      ["TeamMaxLv",MessageBase.UINT32],

    ]
}
export class C24030_1 extends MessageBase{
}
export class S24030_1 extends MessageBase{
    //当前队伍可用的阵法编号列表
  public No:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
// -------------------------服务器通知所有队员（包括队长）队伍信息发生变化:如队伍名字等------------------------
//-define（PT_TM_NOTIFY_TEAM_INFO_CHANGE, 24030）.
export class C24030 extends MessageBase{
    //-define（PT_TM_NOTIFY_TEAM_INFO_CHANGE,24030）.
}
export class S24030 extends MessageBase{
  public TeamId:number;//队伍唯一id
  public SceneNo:number;//场景的编号，即战斗地图
  public TeamActivityType:number;//队伍活动类型：
  public Condition1:number;//条件1
  public Condition2:number;//条件2
  public TeamMinLv:number;//队伍最低等级要求
  public TeamMaxLv:number;//队伍最高等级要求
  public CurUseTroop:number;//队伍当前启用的阵法编号
  public TeamName:string;//
   public item_1 : S24030_1[];
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],
      ["SceneNo",MessageBase.UINT32],
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["TeamMinLv",MessageBase.UINT32],
      ["TeamMaxLv",MessageBase.UINT32],
      ["CurUseTroop",MessageBase.UINT32],
      ["TeamName",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24030_1]],

    ]
}
export class C24031_1 extends MessageBase{
}
export class S24031_1 extends MessageBase{
  public PlayerId:number;//
  public Faction:number;//
  public Lv:number;//
  public Rela:number;//1好友；2同帮派好基友
  public VipLv:number;//
  public Race:number;//
  public Sex:number;//
  public Name:string;//
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Faction",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Rela",MessageBase.UINT8],
      ["VipLv",MessageBase.UINT8],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Name",MessageBase.STRING],

    ]
}
// 获取在线好友和在线同帮派成员列表
//-define（PT_TM_GET_ONLINE_RELA_PLAYERS, 24031）.
// 协议号：24031
export class C24031 extends MessageBase{
  public PageSize:number;//每页显示个数
  public PageIndex:number;//页码编号从1开始
  public static DES : Array<any> =
     [
      ["PageSize",MessageBase.UINT8],
      ["PageIndex",MessageBase.UINT16],

    ]
}
export class S24031 extends MessageBase{
  public TotalPage:number;//总页数
  public PageIndex:number;//页码编号从1开始
   public item_1 : S24031_1[];
  public static DES : Array<any> =
     [
      ["TotalPage",MessageBase.UINT16],
      ["PageIndex",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24031_1]],

    ]
}
// 自动匹配（队长则匹配落单玩家,落单玩家匹配队伍）
//-define（PT_TM_AUTO_MATCH, 24032）.
// 协议号：24032
export class C24032 extends MessageBase{
  public ActivityType:number;//队伍活动类型：0:任意，1:任务，2：副本，3：日常，4：活动
  public TeamMinLv:number;//队伍最低等级要求
  public TeamMaxLv:number;//队伍最高等级要求
  public static DES : Array<any> =
     [
      ["ActivityType",MessageBase.UINT8],
      ["TeamMinLv",MessageBase.UINT32],
      ["TeamMaxLv",MessageBase.UINT32],

    ]
}
export class S24032 extends MessageBase{
}
//-define（PT_TM_CANCEL_MATCH, 24033）.
// 协议号：24033
export class C24033 extends MessageBase{
}
export class S24033 extends MessageBase{
}
export class C24050_1 extends MessageBase{
}
export class S24050_1 extends MessageBase{
  public TeamId:number;//队伍唯一id
  public MemberCount:number;//队伍人数
  public LeaderId:number;//队长id
  public TeamActivityType:number;//队伍活动类型：
  public Condition1:number;//条件1
  public Condition2:number;//条件2
  public TeamMinLv:number;//队伍最低等级要求
  public TeamMaxLv:number;//队伍最高等级要求
  public SceneNo:number;//队伍所属普通场景编号
  public TeamName:string;//队伍名字
  public LeaderName:string;//队长名字
  public LeaderVipLv:number;//队长vip等级
  public Faction:number;//门派
  public Sex:number;//性别
  public Level:number;//等级
  public CreateTime:number;//
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],
      ["MemberCount",MessageBase.UINT8],
      ["LeaderId",MessageBase.UINT64],
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["TeamMinLv",MessageBase.UINT32],
      ["TeamMaxLv",MessageBase.UINT32],
      ["SceneNo",MessageBase.UINT32],
      ["TeamName",MessageBase.STRING],
      ["LeaderName",MessageBase.STRING],
      ["LeaderVipLv",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Level",MessageBase.UINT32],
      ["CreateTime",MessageBase.UINT32],

    ]
}
//无
//S >> C:
//无
//------------------ 查询场景中的队伍列表 -----------------------
//-define（PT_TM_QRY_TEAM_LIST,  24050）.
// 协议号：24050
export class C24050 extends MessageBase{
  public PageSize:number;//每页显示个数
  public PageIndex:number;//页码编号从1开始
  public TeamActivityType:number;//队伍活动类型：0:任意，1:任务，2：副本，3：日常，4：活动
  public Condition1:number;//队伍条件限制1
  public Condition2:number;//队伍条件限制2
  public SceneNo:number;//队伍所属普通场景编号
  public static DES : Array<any> =
     [
      ["PageSize",MessageBase.UINT8],
      ["PageIndex",MessageBase.UINT16],
      ["TeamActivityType",MessageBase.UINT8],
      ["Condition1",MessageBase.UINT8],
      ["Condition2",MessageBase.UINT32],
      ["SceneNo",MessageBase.UINT32],

    ]
}
export class S24050 extends MessageBase{
  public TotalPage:number;//总页数
  public PageIndex:number;//页码编号从1开始
   public item_1 : S24050_1[];
  public static DES : Array<any> =
     [
      ["TotalPage",MessageBase.UINT16],
      ["PageIndex",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24050_1]],

    ]
}
//------------------ 申请加入队伍 -----------------------
// 申请加入队伍
//-define（PT_TM_APPLY_JOIN, 24051）.
// 协议号： 24051
export class C24051 extends MessageBase{
  public LeaderId:number;//队长唯一id
  public static DES : Array<any> =
     [
      ["LeaderId",MessageBase.UINT64],

    ]
}
export class S24051 extends MessageBase{
  public RetCode:number;//申请成功返回0
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 允许加入队伍
//-define（PT_TM_ALLOW_JOIN, 24052）.
// 协议号：24052
export class C24052 extends MessageBase{
  public PlayerId:number;//允许对象（玩家）的id
  public TeamId:number;//允许加入的队伍id
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["TeamId",MessageBase.UINT32],

    ]
}
export class S24052 extends MessageBase{
}
//向全队发送PT_TM_NOTIFY_MEMBER_JOIN协议
// 玩家归队
//-define（PT_TM_RETURN_TEAM, 24053）.
// 协议号：24053
export class C24053 extends MessageBase{
  public TeamId:number;//允许加入的队伍id
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],

    ]
}
export class S24053 extends MessageBase{
  public RetCode:number;//0//成功其他失败
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// 队长邀请玩家归队
//-define（PT_TM_INVITE_RETURN, 24054）.
// 协议号：24054
export class C24054 extends MessageBase{
  public PlayerId:number;//邀请对象（玩家）的id
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],

    ]
}
export class S24054 extends MessageBase{
  public RetCode:number;//成功返回0
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//------------------- 队长拒绝玩家加入队伍 -------------
//-define（PT_TM_REFUSE_JOIN, 24055）.
// 协议号: 24055
export class C24055 extends MessageBase{
  public ObjPlayerId:number;//拒绝目标玩家id
  public static DES : Array<any> =
     [
      ["ObjPlayerId",MessageBase.UINT64],

    ]
}
export class S24055 extends MessageBase{
  public RetCode:number;//成功返回0
  public ObjPlayerId:number;//拒绝目标玩家id
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["ObjPlayerId",MessageBase.UINT64],

    ]
}
export class C24056_1 extends MessageBase{
}
export class S24056_1 extends MessageBase{
  public PlayerId:number;//申请玩家id
  public Name:string;//申请玩家姓名
  public Lv:number;//等级
  public Race:number;//职业
  public Sex:number;//性别（1：男，2：女）
  public Faction:number;//门派
  public Weapon:number;//武器
  public BackWear:number;//背部装饰
  public StrenLv:number;//玩家套装最低强化等级，如果没有套装则是0
  public Headwear:number;//头饰编号
  public Clothes:number;//服饰编号
  public MagicKey:number;//法宝编号
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Name",MessageBase.STRING],
      ["Lv",MessageBase.UINT16],
      ["Race",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Weapon",MessageBase.UINT32],
      ["BackWear",MessageBase.UINT32],
      ["StrenLv",MessageBase.UINT8],
      ["Headwear",MessageBase.UINT32],
      ["Clothes",MessageBase.UINT32],
      ["MagicKey",MessageBase.UINT32],

    ]
}
//------------------- 查询队伍的申请列表----------------------
//-define（PT_TM_QRY_APPLY_LIST, 24056）.
// 协议号: 24077
export class C24056 extends MessageBase{
  public TeamId:number;//
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],

    ]
}
export class S24056 extends MessageBase{
   public item_1 : S24056_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24056_1]],

    ]
}
//------------------------服务器向玩家发送归队信息--------------------------
//-define（PT_TM_INVITE_YOU_RETURN, 24057）.
// 协议号：24057
export class C24057 extends MessageBase{
}
export class S24057 extends MessageBase{
  public TeamId:number;//
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],

    ]
}
//------------------- 队长清空队伍的申请列表----------------------
//-define（PT_TM_CLEAR_APPLY_LIST, 24058）.
// 协议号: 24077
export class C24058 extends MessageBase{
  public TeamId:number;//
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],

    ]
}
export class S24058 extends MessageBase{
  public RetCode:number;//成功返回0
  public TeamId:number;//
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["TeamId",MessageBase.UINT32],

    ]
}
export class C24059_1 extends MessageBase{
}
export class S24059_1 extends MessageBase{
  public PlayerId:number;//玩家id
  public SceneNo:number;//场景编号
  public X:number;//所在场景的坐标x
  public Y:number;//所在场景的坐标y
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["SceneNo",MessageBase.UINT32],
      ["X",MessageBase.UINT32],
      ["Y",MessageBase.UINT32],

    ]
}
// 查询队伍成员（不包括玩家自己）的位置信息
//-define（PT_TM_GET_MEMBER_POS, 24059）.
// 协议号: 24059
export class C24059 extends MessageBase{
}
export class S24059 extends MessageBase{
   public item_1 : S24059_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24059_1]],

    ]
}
// 查询队长的位置信息
//-define（PT_TM_GET_LEADER_POS, 24060）.
// 协议号: 24060
export class C24060 extends MessageBase{
}
export class S24060 extends MessageBase{
  public PlayerId:number;//玩家id
  public SceneNo:number;//场景编号
  public X:number;//所在场景的坐标x
  public Y:number;//所在场景的坐标y
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["SceneNo",MessageBase.UINT32],
      ["X",MessageBase.UINT32],
      ["Y",MessageBase.UINT32],

    ]
}
export class C24061_1 extends MessageBase{
}
export class S24061_1 extends MessageBase{
  public Key:number;//信息代号1//>等级
  public NewValue:number;//当前的新值
  public static DES : Array<any> =
     [
      ["Key",MessageBase.UINT8],
      ["NewValue",MessageBase.UINT32],

    ]
}
//----------- 通知队伍成员：更新玩家的一个或多个信息 ------------
//-define（PT_TM_NOTIFY_MB_INFO_CHANGE,  24061）.
// 协议号：24061
export class C24061 extends MessageBase{
}
export class S24061 extends MessageBase{
  public PlayerId:number;//
   public item_1 : S24061_1[];
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24061_1]],

    ]
}
export class C24062_1 extends MessageBase{
}
export class S24062_1 extends MessageBase{
  public Id:number;//队员id
  public State:number;//玩家状态：1暂离，2在队在线3在队离线
  public Name:string;//队员名字
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["State",MessageBase.UINT8],
      ["Name",MessageBase.STRING],

    ]
}
//----------------- 查询某个队伍的简要信息 -------------------
//-define（PT_TM_QRY_TEAM_BRIEF_INFO, 24062）.
// 协议号：24062
export class C24062 extends MessageBase{
  public TeamId:number;//队伍id
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],

    ]
}
export class S24062 extends MessageBase{
  public TeamId:number;//队伍id
  public TeamName:string;//
  public LeaderId:number;//
   public item_1 : S24062_1[];
  public static DES : Array<any> =
     [
      ["TeamId",MessageBase.UINT32],
      ["TeamName",MessageBase.STRING],
      ["LeaderId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S24062_1]],

    ]
}
// 通知队伍玩家自己的结拜信息变化
//-define（PT_TM_NOTIFY_SWORN_INFO_CHANGE, 24063）.
// 协议号：24063
export class C24063 extends MessageBase{
}
export class S24063 extends MessageBase{
  public PlayerId:number;//
  public SwornId:number;//
  public SwornType:number;//
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["SwornId",MessageBase.UINT64],
      ["SwornType",MessageBase.UINT8],

    ]
}
// 队长使用阵法
//-define（PT_TM_USE_ZF, 24064）.
// 协议号：24064
export class C24064 extends MessageBase{
  public No:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S24064 extends MessageBase{
  public No:number;//
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class C24065_1 extends MessageBase{
  public PlayerId:number;//
  public Pos:number;//（1到5）
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Pos",MessageBase.UINT8],

    ]
}
export class S24065_1 extends MessageBase{
}
export class C24065_2 extends MessageBase{
}
export class S24065_2 extends MessageBase{
  public PlayerId:number;//
  public Pos:number;//（1到5）
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Pos",MessageBase.UINT8],

    ]
}
// 队长设置阵法位置
//-define（PT_TM_SET_ZF_POS, 24065）.
// 协议号：24065
export class C24065 extends MessageBase{
   public item_1 : C24065_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C24065_1]],

    ]
}
export class S24065 extends MessageBase{
   public item_2 : S24065_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S24065_2]],

    ]
}
