import { MessageBase } from "../../message/messageBase/MessageBase";
export class C30001_1 extends MessageBase{
}
export class S30001_1 extends MessageBase{
  public TaskId:number;//
  public State:number;//任务状态（1or3）
  public NpcId:number;//
  public sceneID:number;//
  public setp:number;//当前环任务的步数
  public ring:number;//当前环数
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["State",MessageBase.UINT16],
      ["NpcId",MessageBase.UINT32],
      ["sceneID",MessageBase.UINT32],
      ["setp",MessageBase.UINT8],
      ["ring",MessageBase.UINT8],

    ]
}
// =========================================================
// 30任务协议
// =========================================================
// 可触发任务（）
//-define（PT_CAN_TRIGGER_TASK, 30001）.
// 协议号：30001
export class C30001 extends MessageBase{
}
export class S30001 extends MessageBase{
   public item_1 : S30001_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S30001_1]],

    ]
}
export class C30002_1_1 extends MessageBase{
}
export class S30002_1_1 extends MessageBase{
    //每项子任务状态
  public event:number;//事件类型
  public state:number;//完成状态（0->未完成;1->完成）
  public sceneId:number;//场景ID
  public dungeonId:number;//副本ID
  public npcId:number;//
  public targetId:number;//任务目标Id，如monId，itemId等
  public curNum:number;//当前计数
  public tolNum:number;//总计数
  public static DES : Array<any> =
     [
      ["event",MessageBase.UINT16],
      ["state",MessageBase.UINT8],
      ["sceneId",MessageBase.UINT32],
      ["dungeonId",MessageBase.UINT32],
      ["npcId",MessageBase.UINT32],
      ["targetId",MessageBase.UINT32],
      ["curNum",MessageBase.UINT16],
      ["tolNum",MessageBase.UINT16],

    ]
}
export class C30002_1 extends MessageBase{
}
export class S30002_1 extends MessageBase{
  public TaskId:number;//
  public State:number;//任务状态
  public NpcId:number;//接任务的NPC
  public sceneID:number;//接任务NPC所在场景
  public setp:number;//当前环任务的步数
  public ring:number;//当前环数
  public timestamp:number;//接取的时间戳
   public item_1 : S30002_1_1[];
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["State",MessageBase.UINT16],
      ["NpcId",MessageBase.UINT32],
      ["sceneID",MessageBase.UINT32],
      ["setp",MessageBase.UINT8],
      ["ring",MessageBase.UINT8],
      ["timestamp",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S30002_1_1]],

    ]
}
// =========================
// 已接任务
//-define（PT_HAS_TASK, 30002）.
// 协议号：30002
export class C30002 extends MessageBase{
}
export class S30002 extends MessageBase{
   public item_1 : S30002_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S30002_1]],

    ]
}
// =========================
// 接任务
//-define（PT_GET_TASK, 30003）.
// 协议号：30003
export class C30003 extends MessageBase{
  public TaskId:number;//任务ID
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class S30003 extends MessageBase{
  public TaskId:number;//任务ID
  public State:number;//
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["State",MessageBase.UINT8],

    ]
}
export class C30004_1 extends MessageBase{
  public itemId:number;//物品id
  public num:number;//数量
  public static DES : Array<any> =
     [
      ["itemId",MessageBase.UINT64],
      ["num",MessageBase.UINT16],

    ]
}
export class S30004_1 extends MessageBase{
}
// =========================
// 提交任务
//-define（PT_COMMIT_TASK, 30004）.
// 协议号：30004
export class C30004 extends MessageBase{
  public TaskId:number;//任务ID
   public item_1 : C30004_1[];
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C30004_1]],

    ]
}
export class S30004 extends MessageBase{
  public TaskId:number;//任务ID
  public State:number;//-define（ERROR，0）.错误代号;-define（SUCCESS，1）.成功代号-define（FAIL，3）.失败代号
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["State",MessageBase.UINT8],

    ]
}
// =========================
// 放弃任务
//-define（PT_CANCEL_TASK, 30005）.
// 协议号：30005
export class C30005 extends MessageBase{
  public TaskId:number;//任务ID
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class S30005 extends MessageBase{
  public TaskId:number;//任务ID
  public State:number;//-define（ERROR，0）.错误代号;-define（SUCCESS，1）.成功代号-define（FAIL，3）.失败代号
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["State",MessageBase.UINT8],

    ]
}
export class C30006_1 extends MessageBase{
}
export class S30006_1 extends MessageBase{
    //每项子任务状态
  public event:number;//事件类型
  public state:number;//完成状态（0->未完成;1->完成）
  public sceneId:number;//场景ID
  public dungeonId:number;//副本ID
  public npcId:number;//
  public targetId:number;//任务目标Id，如monId，itemId等
  public curNum:number;//当前计数
  public tolNum:number;//总计数
  public static DES : Array<any> =
     [
      ["event",MessageBase.UINT16],
      ["state",MessageBase.UINT8],
      ["sceneId",MessageBase.UINT32],
      ["dungeonId",MessageBase.UINT32],
      ["npcId",MessageBase.UINT32],
      ["targetId",MessageBase.UINT32],
      ["curNum",MessageBase.UINT16],
      ["tolNum",MessageBase.UINT16],

    ]
}
// =========================
// 更新某一任务
//-define（PT_UPDATE_TASK, 30006）.
// 协议号：30006
export class C30006 extends MessageBase{
  public TaskId:number;//任务ID
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class S30006 extends MessageBase{
  public TaskId:number;//
  public State:number;//任务状态
  public NpcId:number;//接任务的NPC
  public sceneID:number;//接任务NPC所在场景
  public setp:number;//当前环任务的步数
  public ring:number;//当前环数
  public timestamp:number;//接取的时间戳
   public item_1 : S30006_1[];
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["State",MessageBase.UINT16],
      ["NpcId",MessageBase.UINT32],
      ["sceneID",MessageBase.UINT32],
      ["setp",MessageBase.UINT8],
      ["ring",MessageBase.UINT8],
      ["timestamp",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S30006_1]],

    ]
}
// =========================
// 自动触发的任务
//-define（PT_AUTO_TRIGGER_TASK, 30007）.
// 协议号：30007
export class C30007 extends MessageBase{
}
export class S30007 extends MessageBase{
  public TaskId:number;//任务ID
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class C30008_1 extends MessageBase{
}
export class S30008_1 extends MessageBase{
  public TaskId:number;//
  public State:number;//任务状态（1or3）
  public NpcId:number;//
  public sceneID:number;//
  public setp:number;//当前环任务的步数
  public ring:number;//当前环数
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["State",MessageBase.UINT16],
      ["NpcId",MessageBase.UINT32],
      ["sceneID",MessageBase.UINT32],
      ["setp",MessageBase.UINT8],
      ["ring",MessageBase.UINT8],

    ]
}
// =========================
// 查询某NPC可触发任务
//-define（PT_CAN_TRIGGER_TASK_BY_NPC, 30008）.
// 协议号：30008
export class C30008 extends MessageBase{
  public npcId:number;//
  public static DES : Array<any> =
     [
      ["npcId",MessageBase.UINT32],

    ]
}
export class S30008 extends MessageBase{
   public item_1 : S30008_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S30008_1]],

    ]
}
// =========================
// 客户端主动推送任务信息
//-define（PT_PUSH_TASK_STATE, 30009）.
// 协议号：30009
export class C30009 extends MessageBase{
  public state:number;//（1->探索类任务）
  public static DES : Array<any> =
     [
      ["state",MessageBase.UINT8],

    ]
}
export class S30009 extends MessageBase{
}
// =========================
// 寻路查询
//-define（PT_TASK_FIND_TARGET, 30010）.
// 协议号：30010
export class C30010 extends MessageBase{
  public TaskId:number;//
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class S30010 extends MessageBase{
  public TaskId:number;//任务ID
  public sceneId:number;//
  public X:number;//
  public Y:number;//
  public 怪物id:number;//
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["sceneId",MessageBase.UINT32],
      ["X",MessageBase.UINT16],
      ["Y",MessageBase.UINT16],
      ["怪物id",MessageBase.UINT64],

    ]
}
// =========================
// 组队状态下队长准备提交任务
//-define（PT_TEAM_COMMIT_TASK, 30011）.
// 协议号：30011
export class C30011 extends MessageBase{
  public TaskId:number;//
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class S30011 extends MessageBase{
  public TaskId:number;//
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class C30012_1 extends MessageBase{
}
export class S30012_1 extends MessageBase{
  public RoleId:number;//玩家ID
  public state:number;//失败状态
  public static DES : Array<any> =
     [
      ["RoleId",MessageBase.UINT64],
      ["state",MessageBase.UINT8],

    ]
}
// =========================
// 组队任务接取/提交失败反馈
//-define（PT_TEAM_COMMIT_TASK_RES, 30012）.
// 协议号：30012
export class C30012 extends MessageBase{
}
export class S30012 extends MessageBase{
  public TaskId:number;//
   public item_1 : S30012_1[];
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S30012_1]],

    ]
}
export class C30013_1 extends MessageBase{
}
export class S30013_1 extends MessageBase{
    //每项子任务状态
  public event:number;//事件类型
  public state:number;//完成状态（0->未完成;1->完成）
  public sceneId:number;//场景ID
  public dungeonId:number;//副本ID
  public npcId:number;//
  public targetId:number;//任务目标Id，如monId，itemId等
  public curNum:number;//当前计数
  public tolNum:number;//总计数
  public static DES : Array<any> =
     [
      ["event",MessageBase.UINT16],
      ["state",MessageBase.UINT8],
      ["sceneId",MessageBase.UINT32],
      ["dungeonId",MessageBase.UINT32],
      ["npcId",MessageBase.UINT32],
      ["targetId",MessageBase.UINT32],
      ["curNum",MessageBase.UINT16],
      ["tolNum",MessageBase.UINT16],

    ]
}
// =========================
// 接取某一任务后推送客户端
//-define（PT_GET_TASK_INFO, 30013）.
// 协议号：30013
export class C30013 extends MessageBase{
}
export class S30013 extends MessageBase{
  public TaskId:number;//
  public State:number;//任务状态
  public NpcId:number;//接任务的NPC
  public sceneID:number;//接任务NPC所在场景
  public setp:number;//当前环任务的步数
  public ring:number;//当前环数
  public timestamp:number;//接取的时间戳
   public item_1 : S30013_1[];
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["State",MessageBase.UINT16],
      ["NpcId",MessageBase.UINT32],
      ["sceneID",MessageBase.UINT32],
      ["setp",MessageBase.UINT8],
      ["ring",MessageBase.UINT8],
      ["timestamp",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S30013_1]],

    ]
}
// =========================
// 取得某一任务的状态
//-define（PT_GET_TASK_STATE, 30014）.
// 协议号：30014
export class C30014 extends MessageBase{
  public TaskId:number;//
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class S30014 extends MessageBase{
  public TaskId:number;//
  public State:number;//任务状态1->未接2->已接3->已提交
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["State",MessageBase.UINT16],

    ]
}
// 快速完成某个任务,会通过 PT_UPDATE_TASK 更新任务状态
//-define（PT_TASK_QUICK_STATE, 30015）.
// 协议号：30015
export class C30015 extends MessageBase{
  public TaskId:number;//
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class S30015 extends MessageBase{
  public TaskId:number;//
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
// 请求或者推送任务星数
//-define（PT_TASK_SYNC_STAR, 30016）.
// 协议号：30016
export class C30016 extends MessageBase{
  public TaskId:number;//
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],

    ]
}
export class S30016 extends MessageBase{
  public TaskId:number;//
  public Star:number;//
    //-define（PT_TASK_REFRESH_STAR,30017）.
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["Star",MessageBase.UINT8],

    ]
}
//-define（PT_TASK_REFRESH_STAR, 30017）.
// 协议号：30017
export class C30017 extends MessageBase{
  public TaskId:number;//
  public Count:number;//次数，0表示一键满星
  public static DES : Array<any> =
     [
      ["TaskId",MessageBase.UINT32],
      ["Count",MessageBase.UINT8],

    ]
}
export class S30017 extends MessageBase{
}
export class C30100_1 extends MessageBase{
}
export class S30100_1 extends MessageBase{
  public IssueId:number;//悬赏唯一Id
  public RoleId:number;//发布者Id
  public RoleName:string;//发布者昵称（空则表示匿名）
  public IssueTaskLv:number;//发布任务的等级段
  public Num:number;//剩余次数
  public Time:number;//剩余时间（s）
  public static DES : Array<any> =
     [
      ["IssueId",MessageBase.UINT32],
      ["RoleId",MessageBase.UINT64],
      ["RoleName",MessageBase.STRING],
      ["IssueTaskLv",MessageBase.UINT16],
      ["Num",MessageBase.UINT8],
      ["Time",MessageBase.UINT32],

    ]
}
// ====================================================
// 悬赏任务相关协议 pt30100 ~ pt30199 issue_task
// ====================================================
//-define（PT_GET_XS_TASK_INFO, 30100）.
// ======== 悬赏任务面板信息 ========
// 协议号：30100
export class C30100 extends MessageBase{
  public filt_flag:number;//是否过滤掉不可领取任务（0否1是）
  public page:number;//页数
  public static DES : Array<any> =
     [
      ["filt_flag",MessageBase.UINT8],
      ["page",MessageBase.UINT16],

    ]
}
export class S30100 extends MessageBase{
  public page:number;//页数
  public all_page:number;//总页数
   public item_1 : S30100_1[];
  public receive_num:number;//今日可领取次数
    //-define（PT_ISSUE_XS_TASK,30101）.
  public static DES : Array<any> =
     [
      ["page",MessageBase.UINT16],
      ["all_page",MessageBase.UINT16],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S30100_1]],
      ["receive_num",MessageBase.UINT8],

    ]
}
//-define（PT_ISSUE_XS_TASK, 30101）.
// ======== 发布悬赏任务 ========
// 协议号：30101
export class C30101 extends MessageBase{
  public issue_num:number;//发布次数
  public is_anonymity:number;//是否匿名（0不匿名1匿名）
  public static DES : Array<any> =
     [
      ["issue_num",MessageBase.UINT16],
      ["is_anonymity",MessageBase.UINT8],

    ]
}
export class S30101 extends MessageBase{
  public code:number;//结果码（0成功发布成功，并开着面板自行刷新面板1失败服务端发提示信息）
  public left_issue_num:number;//剩余发布次数
  public issue_num:number;//今天已经发布次数
    //-define（PT_RECEIVE_XS_TASK,30102）.
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],
      ["left_issue_num",MessageBase.UINT8],
      ["issue_num",MessageBase.UINT8],

    ]
}
//-define（PT_RECEIVE_XS_TASK, 30102）.
// ======= 领取悬赏任务 ========
// 协议号：30102
export class C30102 extends MessageBase{
  public IssueId:number;//悬赏唯一Id
  public static DES : Array<any> =
     [
      ["IssueId",MessageBase.UINT32],

    ]
}
export class S30102 extends MessageBase{
  public code:number;//结果码（0成功领取成功，并开着面板自行刷新面板）
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
//（1失败 刷新面板-可能剩余次数剩余时间刚好为0）
//-define（PT_GET_LEFT_ISSUE_NUM, 30103）.
// ======= 获取剩余发布数量 ========
// 协议号：30103
export class C30103 extends MessageBase{
}
export class S30103 extends MessageBase{
  public left_issue_num:number;//剩余发布次数
  public issue_num:number;//今天已经发布次数
    //-define（PT_IS_CAN_RECEIVE_XS_TASK,30104）.
  public static DES : Array<any> =
     [
      ["left_issue_num",MessageBase.UINT8],
      ["issue_num",MessageBase.UINT8],

    ]
}
//-define（PT_IS_CAN_RECEIVE_XS_TASK, 30104）.
// ======= 是否可以领取悬赏任务 ========
// 协议号：30104
export class C30104 extends MessageBase{
}
export class S30104 extends MessageBase{
  public code:number;//结果码（0成功，有可以领取的任务）
  public static DES : Array<any> =
     [
      ["code",MessageBase.UINT8],

    ]
}
