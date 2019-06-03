import { MessageBase } from "../../message/messageBase/MessageBase";
export class C14000_1 extends MessageBase{
}
export class S14000_1 extends MessageBase{
  public Id:number;//记录号
  public PlayerId:number;//好友id
  public Online:number;//0表示在线，其他表示上次离线时间
  public Lv:number;//等级
  public Race:number;//种族
  public Faction:number;//门派
  public Sex:number;//性别
  public BattlePower:number;//战斗力
  public Name:string;//名字
  public Intimacy:number;//好友度
  public GiveState:number;//赠送爱心状态，1表示已赠送
  public LoveState:number;//收取爱心状态：0表示未收到;1表示收到未领取;2表示收到已领取
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["PlayerId",MessageBase.UINT64],
      ["Online",MessageBase.UINT32],
      ["Lv",MessageBase.UINT32],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
      ["Intimacy",MessageBase.UINT32],
      ["GiveState",MessageBase.UINT8],
      ["LoveState",MessageBase.UINT8],

    ]
}
// ================ 玩家间信息 =================
// 分类号：14
// 描述：好友信息，黑名单信息
//-define（PT_FRIEND_LIST,  14000）.
// ########### 好友列表 ##############
// 协议号：14000
export class C14000 extends MessageBase{
}
export class S14000 extends MessageBase{
   public item_1 : S14000_1[];
    //-define（PT_REQUEST_ADD_FRIEND,14001）.
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S14000_1]],

    ]
}
export class C14001_1 extends MessageBase{
  public Id:number;//接收方用户ID
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S14001_1 extends MessageBase{
}
export class C14001_2 extends MessageBase{
}
export class S14001_2 extends MessageBase{
  public RetCode:number;//0表示成功30//对方不在线3000//好友人数达到上限3006//对方拒绝加为好友3001//对方已经是你的好友
  public Id:number;//接收方用户ID
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT16],
      ["Id",MessageBase.UINT64],

    ]
}
//-define（PT_REQUEST_ADD_FRIEND,  14001）.
// ########### 发送添加好友请求 ##############
// 协议号：14001
export class C14001 extends MessageBase{
   public item_1 : C14001_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C14001_1]],

    ]
}
export class S14001 extends MessageBase{
   public item_2 : S14001_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S14001_2]],

    ]
}
export class C14002_1 extends MessageBase{
  public Id:number;//发起者用户ID
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S14002_1 extends MessageBase{
}
//
//-define（PT_RESPONSE_ADD_FRIEND,  14002）.
// ########### 回应添加好友请求 ##############
// 协议号：14002
export class C14002 extends MessageBase{
  public Choice:number;//拒绝/接受请求0=>拒绝1=>接受
   public item_1 : C14002_1[];
  public static DES : Array<any> =
     [
      ["Choice",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C14002_1]],

    ]
}
export class S14002 extends MessageBase{
}
//失败用998协议返回错误代码，成功直接返回14005
//
//-define（PT_REMOVE_FRIEND,  14003）.
// ########### 删除好友 当好友被删除时，服务端也主动通过此协议通知玩家 ##############
// 协议号：14003
export class C14003 extends MessageBase{
  public Id:number;//记录号
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S14003 extends MessageBase{
  public Id:number;//记录号
    //-define（PT_ADD_BLACKLIST,14004）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
//-define（PT_ADD_BLACKLIST,  14004）.
// ########### 添加黑名单 （暂时不做） ##############
// 协议号: 14004
export class C14004 extends MessageBase{
  public Id:number;//记录号
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],

    ]
}
export class S14004 extends MessageBase{
  public RetCode:number;//
  public Id:number;//记录号
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Id",MessageBase.UINT64],

    ]
}
//
//-define（PT_PUSH_ADD_SUCCESS,  14005）.
// 服务器主动通知成功添加好友
// 协议号：14005
export class C14005 extends MessageBase{
}
export class S14005 extends MessageBase{
  public Id:number;//记录号
  public PlayerId:number;//好友id
  public Online:number;//0表示在线，其他表示上次离线时间
  public Lv:number;//等级
  public Race:number;//种族
  public Faction:number;//门派
  public Sex:number;//性别
  public BattlePower:number;//战斗力
  public Name:string;//名字
  public GiveState:number;//赠送爱心状态，1表示已赠送
  public LoveState:number;//收取爱心状态：0表示未收到;1表示收到未领取;2表示收到已领取
    //-define（PT_PUSH_ADD_REQUEST,14006）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["PlayerId",MessageBase.UINT64],
      ["Online",MessageBase.UINT32],
      ["Lv",MessageBase.UINT32],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],
      ["Name",MessageBase.STRING],
      ["GiveState",MessageBase.UINT8],
      ["LoveState",MessageBase.UINT8],

    ]
}
//-define（PT_PUSH_ADD_REQUEST,  14006）.
// 服务器主动通知收到加好友请求
// 协议号：14006
export class C14006 extends MessageBase{
}
export class S14006 extends MessageBase{
  public Id:number;//发送方玩家ID
  public Lv:number;//等级
  public Race:number;//种族
  public Faction:number;//门派
  public Sex:number;//性别
  public VipLv:number;//vip等级
  public BattlePower:number;//战斗力
  public Name:string;//发送方角色名
    //-define（PT_MOVE_GROUP,14009）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Lv",MessageBase.UINT32],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["VipLv",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],
      ["Name",MessageBase.STRING],

    ]
}
//-define（PT_MOVE_GROUP,  14009）.
// ########### 移动好友到别的分组 （暂时没有这个功能）#############
// 协议号：14009
export class C14009 extends MessageBase{
}
export class S14009 extends MessageBase{
}
export class C14010_1 extends MessageBase{
}
export class S14010_1 extends MessageBase{
  public PlayerId:number;//角色id
  public Lv:number;//
  public Race:number;//种族
  public Faction:number;//门派
  public Sex:number;//性别
  public BattlePower:number;//战斗力
  public VipLv:number;//vip等级
  public Name:string;//角色名字
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Lv",MessageBase.UINT32],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],
      ["VipLv",MessageBase.UINT8],
      ["Name",MessageBase.STRING],

    ]
}
//int:16 
//0 => 失败
//1 => 成功
//-define（PT_SEARCH_ROLE,  14010）.
// ########### 查找角色 模糊搜索 ####################
// 协议号：14010
export class C14010 extends MessageBase{
  public PageSize:number;//每页个数
  public PageNum:number;//所在页码编号从1开始
  public Name:string;//角色名称，（原:为空则返回同场景的非好友信息;现:返回全服在线玩家）
  public static DES : Array<any> =
     [
      ["PageSize",MessageBase.UINT8],
      ["PageNum",MessageBase.UINT16],
      ["Name",MessageBase.STRING],

    ]
}
export class S14010 extends MessageBase{
  public TotalPage:number;//总页数
  public PageNum:number;//所在页码编号从1开始
   public item_1 : S14010_1[];
    //-define（PT_FRIEND_INFO,14011）.
  public static DES : Array<any> =
     [
      ["TotalPage",MessageBase.UINT16],
      ["PageNum",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S14010_1]],

    ]
}
export class C14011_1 extends MessageBase{
}
export class S14011_1 extends MessageBase{
    //不在数组中则表示没有收到爱心
  public PlayerId:number;//好友ID
  public LoveState:number;//1表示收到未领取;2表示收到已领取
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["LoveState",MessageBase.UINT8],

    ]
}
//-define（PT_FRIEND_INFO,  14011）.
// 获取自己的好友系统信息，当发送变化时，服务端主动通知
// 协议号：14011
export class C14011 extends MessageBase{
}
export class S14011 extends MessageBase{
  public LeftApplyCnt:number;//剩余可申请好友次数
  public LeftGetCount:number;//剩余可收取爱心次数
   public item_1 : S14011_1[];
    //-define（PT_SEND_PRI_MSG,14012）.
  public static DES : Array<any> =
     [
      ["LeftApplyCnt",MessageBase.UINT8],
      ["LeftGetCount",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S14011_1]],

    ]
}
//-define（PT_SEND_PRI_MSG,  14012）.
// ########### 发送私聊 ##############
// 协议号:14012
export class C14012 extends MessageBase{
  public Id:number;//接受方用户ID
  public Msg:string;//内容
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],

    ]
}
export class S14012 extends MessageBase{
  public Id:number;//接受方用户ID
  public Msg:string;//内容
    //-define（PT_GET_PRI_MSG,14013）.
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],

    ]
}
export class C14013_1 extends MessageBase{
}
export class S14013_1 extends MessageBase{
  public Id:number;//发送用户ID
  public Msg:string;//内容
  public Timestamp:number;//
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Msg",MessageBase.STRING],
      ["Timestamp",MessageBase.UINT32],

    ]
}
//-define（PT_GET_PRI_MSG,  14013）.
// 推送 或 获取 私聊消息
// 协议号:14013
export class C14013 extends MessageBase{
}
export class S14013 extends MessageBase{
   public item_1 : S14013_1[];
    //-define（PT_FRIEND_GET_LOVE,14014）.
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S14013_1]],

    ]
}
export class C14014_1 extends MessageBase{
}
export class S14014_1 extends MessageBase{
  public PlayerID:number;//对方玩家ID
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],

    ]
}
//-define（PT_FRIEND_GET_LOVE,  14014）.
// 收取爱心
// 协议号:14014
export class C14014 extends MessageBase{
  public PlayerID:number;//为0则表示一键收取
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],

    ]
}
export class S14014 extends MessageBase{
   public item_1 : S14014_1[];
    //-define（PT_FRIEND_GIVE_LOVE,14015）.
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S14014_1]],

    ]
}
export class C14015_1 extends MessageBase{
}
export class S14015_1 extends MessageBase{
  public PlayerID:number;//对方玩家ID
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],

    ]
}
//-define（PT_FRIEND_GIVE_LOVE,  14015）.
// 赠送爱心
// 协议号:14015
export class C14015 extends MessageBase{
  public PlayerID:number;//为0则表示一键赠送
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],

    ]
}
export class S14015 extends MessageBase{
   public item_1 : S14015_1[];
    //-define（PT_FRIEND_ONLINE_NOTICE,14030）.
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S14015_1]],

    ]
}
//-define（PT_FRIEND_ONLINE_NOTICE,  14030）.
// ########### 好友上下线通知 ############
// 协议号：14030
export class C14030 extends MessageBase{
}
export class S14030 extends MessageBase{
  public Action:number;//0表示下线1表示上线
  public PlayerId:number;//上线好友id
    //-define（PT_RECENT_CONTACTS,14032）.
  public static DES : Array<any> =
     [
      ["Action",MessageBase.UINT8],
      ["PlayerId",MessageBase.UINT64],

    ]
}
export class C14032_1 extends MessageBase{
}
export class S14032_1 extends MessageBase{
  public PlayerId:number;//好友id
  public Online:number;//1表示在线，0表示不在线
  public Lv:number;//等级
  public Race:number;//种族
  public Faction:number;//门派
  public Sex:number;//性别
  public Name:string;//名字
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Online",MessageBase.UINT8],
      ["Lv",MessageBase.UINT32],
      ["Race",MessageBase.UINT8],
      ["Faction",MessageBase.UINT8],
      ["Sex",MessageBase.UINT8],
      ["Name",MessageBase.STRING],

    ]
}
//-define（PT_RECENT_CONTACTS,  14032）.
// ########### 最近联系人列表 （暂时没有要求这个功能） ############
// 协议号：14032
export class C14032 extends MessageBase{
}
export class S14032 extends MessageBase{
   public item_1 : S14032_1[];
    //-define（PT_FRIEND_UPGRADE_NOTICE,14036）.
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S14032_1]],

    ]
}
//-define（PT_FRIEND_UPGRADE_NOTICE,  14036）.
// ########### 好友升级通知 （根据需要添加）############
// 协议号：14036
export class C14036 extends MessageBase{
}
export class S14036 extends MessageBase{
  public PlayerId:number;//好友id
  public Lv:number;//等级
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Lv",MessageBase.UINT32],

    ]
}
export class C14050_1 extends MessageBase{
}
export class S14050_1 extends MessageBase{
  public Id:number;//
  public Code:number;//1已经有结拜关系2还没组队3不同意结拜4队长掉线了5有人金钱不足6不是队长7队员非在队在线状态8一个人不能结拜9
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["Code",MessageBase.UINT8],

    ]
}
// -----------------------------------------结拜相关协议--------------------------------------------
//-define（PT_REQUEST_SWORN,  14050）.
// 发起结拜
// 协议号：14050
export class C14050 extends MessageBase{
  public Type:number;//结拜类型1普通结拜，2，生死结拜
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],

    ]
}
export class S14050 extends MessageBase{
  public RetCode:number;//0表示成功1表示失败
  public Type:number;//结拜类型1普通结拜，2，生死结拜
   public item_1 : S14050_1[];
    //-define（PT_PUSH_SWORN_2_TEAM_MEMBER,14051）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Type",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S14050_1]],

    ]
}
//-define（PT_PUSH_SWORN_2_TEAM_MEMBER,  14051）.
// 发送结拜确认给所有队员
// 协议号：14051
export class C14051 extends MessageBase{
}
export class S14051 extends MessageBase{
  public Type:number;//结拜类型1普通结拜，2，生死结拜
    //-define（PT_RESPONSE_SWORN,14052）.
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],

    ]
}
//-define（PT_RESPONSE_SWORN,  14052）.
// 队员回复是否结拜
// 协议号：14052
export class C14052 extends MessageBase{
  public Type:number;//结拜类型1普通结拜，2，生死结拜
  public Choice:number;//0否1是
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["Choice",MessageBase.UINT8],

    ]
}
export class S14052 extends MessageBase{
}
//无
//-define（PT_BREAK_SWORN,  14053）.
// 删除结拜关系
// 协议号：14053
export class C14053 extends MessageBase{
}
export class S14053 extends MessageBase{
  public RetCode:number;//0表示成功，其他通过998返回
    //-define（PT_CONFIRM_TITLE_PREFIX,14055）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//-define（PT_CONFIRM_TITLE_PREFIX,  14055）.
// 队长确认、修改称号前缀
// 协议号：14055
export class C14055 extends MessageBase{
  public Choice:number;//是否使称号前缀唯一0否1是
  public Prefix:string;//称号
  public static DES : Array<any> =
     [
      ["Choice",MessageBase.UINT8],
      ["Prefix",MessageBase.STRING],

    ]
}
export class S14055 extends MessageBase{
  public RetCode:number;//0表示成功1表示前缀已经被占用2结拜关系已被解除了
    //-define（PT_PUSH_TITLE_PREFIX,14056）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//-define（PT_PUSH_TITLE_PREFIX,  14056）.
// 向全队广播队长确认了称号前缀
// 协议号：14056
export class C14056 extends MessageBase{
}
export class S14056 extends MessageBase{
  public Type:number;//结拜类型0没有结拜，1普通结拜，2，生死结拜
  public Choice:number;//是否使称号前缀唯一0否1是
  public PreFreeCount:number;//剩余免费修改前缀次数队长专用
  public SufFreeCount:number;//剩余免费修改后缀次数
  public Prefix:string;//当前称号前缀
  public Suffix:string;//当前称号后缀
  public SwornId:number;//结拜id
    //-define（PT_TAKE_SWORN_TITLE,14057）.
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["Choice",MessageBase.UINT8],
      ["PreFreeCount",MessageBase.UINT8],
      ["SufFreeCount",MessageBase.UINT8],
      ["Prefix",MessageBase.STRING],
      ["Suffix",MessageBase.STRING],
      ["SwornId",MessageBase.UINT64],

    ]
}
//-define（PT_TAKE_SWORN_TITLE,  14057）.
// 队员领取称号队长修改称号时，队员修改也通过此协议修改
// 协议号：14057
export class C14057 extends MessageBase{
  public Suffix:string;//称号后缀
  public static DES : Array<any> =
     [
      ["Suffix",MessageBase.STRING],

    ]
}
export class S14057 extends MessageBase{
  public RetCode:number;//0表示成功，1表示后缀重复
    //-define（PT_GET_SWORN_TITLE_INFO,14058）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//-define（PT_GET_SWORN_TITLE_INFO,  14058）.
// 获取称号前缀信息
// 协议号：14058
export class C14058 extends MessageBase{
  public Param:number;//
  public static DES : Array<any> =
     [
      ["Param",MessageBase.UINT8],

    ]
}
export class S14058 extends MessageBase{
  public Type:number;//结拜类型0没有结拜，1普通结拜，2，生死结拜
  public Choice:number;//是否使称号前缀唯一0否1是
  public PreFreeCount:number;//剩余免费修改前缀次数队长专用
  public SufFreeCount:number;//剩余免费修改后缀次数
  public Prefix:string;//当前称号前缀
  public Suffix:string;//当前称号后缀
  public Param:number;//客户端用
  public SwornId:number;//结拜id
    //-define（PT_NOTICE_TEAM_MEMBER_WAIT,14059）.
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["Choice",MessageBase.UINT8],
      ["PreFreeCount",MessageBase.UINT8],
      ["SufFreeCount",MessageBase.UINT8],
      ["Prefix",MessageBase.STRING],
      ["Suffix",MessageBase.STRING],
      ["Param",MessageBase.UINT8],
      ["SwornId",MessageBase.UINT64],

    ]
}
//-define（PT_NOTICE_TEAM_MEMBER_WAIT,  14059）.
// 通知组队同结拜成员等待队长修改前缀
// 协议号：14059
export class C14059 extends MessageBase{
}
export class S14059 extends MessageBase{
}
export class C14100_1 extends MessageBase{
  public GoodsId:number;//花的id
  public Count:number;//花的数量
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S14100_1 extends MessageBase{
}
//无
// -------------------------------------------好友度相关协议---------------------------------------------
//-define（PT_GIVE_FLOWERS,  14100）.
// 赠送鲜花
// 协议号：14100
export class C14100 extends MessageBase{
  public PlayerId:number;//目标玩家id
   public item_1 : C14100_1[];
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C14100_1]],

    ]
}
export class S14100 extends MessageBase{
  public GetIntimacy:number;//获得好友度
  public PlayerId:number;//目标玩家id
  public PlayerName:string//目标玩家名字
    //-define（PT_NOTICE_INTIMACY_CHANGE,14101）.
  public static DES : Array<any> =
     [
      ["GetIntimacy",MessageBase.UINT32],
      ["PlayerId",MessageBase.UINT64],
      ["PlayerName",MessageBase.STRING],

    ]
}
//-define（PT_NOTICE_INTIMACY_CHANGE,  14101）.
// 服务端通知玩家之间的好友度变化
// 协议号：14101
export class C14101 extends MessageBase{
}
export class S14101 extends MessageBase{
  public ObjPlayerId:number;//
  public CurIntimacy:number;//当前好友度
  public static DES : Array<any> =
     [
      ["ObjPlayerId",MessageBase.UINT64],
      ["CurIntimacy",MessageBase.UINT32],

    ]
}
export class C14102_1 extends MessageBase{
  public GoodsId:number;//物品id
  public Count:number;//物品数量
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S14102_1 extends MessageBase{
}
// 赠送药品等道具
//-define（PT_GIVE_GIFTS,  14102）.
// 协议号：14102
export class C14102 extends MessageBase{
  public PlayerId:number;//目标玩家id
   public item_1 : C14102_1[];
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C14102_1]],

    ]
}
export class S14102 extends MessageBase{
  public Code:number;//成功或者失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
export class C14103_1 extends MessageBase{
  public GoodsId:number;//物品id
  public Count:number;//物品数量
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT16],

    ]
}
export class S14103_1 extends MessageBase{
}
// 赠送药品等道具
//-define（PT_ADD_ENEMY,  14103）.
// 协议号：14102
export class C14103 extends MessageBase{
  public PlayerId:number;//目标玩家id
   public item_1 : C14103_1[];
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C14103_1]],

    ]
}
export class S14103 extends MessageBase{
  public Code:number;//成功或者失败
    //-define（PT_CHANGE_NAME,14037）.
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
//-define（PT_CHANGE_NAME,  14037）.
// 14037
export class C14037 extends MessageBase{
}
export class S14037 extends MessageBase{
  public PlayerId:number;//好友id
  public Name:string;//名字
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["Name",MessageBase.STRING],

    ]
}
