import { MessageBase } from "../../message/messageBase/MessageBase";
export class C58001_1 extends MessageBase{
}
export class S58001_1 extends MessageBase{
  public sys:number;//系统编号
  public acti_times:number;//活跃度次数
  public times:number;//当前参与次数
  public max_times:number;//总次数
  public state:number;//2->完结1->进行中
  public static DES : Array<any> =
     [
      ["sys",MessageBase.UINT16],
      ["acti_times",MessageBase.UINT16],
      ["times",MessageBase.UINT16],
      ["max_times",MessageBase.UINT16],
      ["state",MessageBase.UINT8],

    ]
}
// =========================================================
// 58 系统活跃度
// =========================================================
// =========================
// 查看系统活跃度信息
//-define（PT_SYSTEM, 58001）.
// 协议号：58001
export class C58001 extends MessageBase{
}
export class S58001 extends MessageBase{
   public item_1 : S58001_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S58001_1]],

    ]
}
export class C58002_1 extends MessageBase{
}
export class S58002_1 extends MessageBase{
  public reward_index:number;//奖励序号
  public reward_id:number;//奖励ID
  public point:number;//领取该奖励需要的活跃点数
  public state:number;//0->未领取1->已领取
  public static DES : Array<any> =
     [
      ["reward_index",MessageBase.UINT16],
      ["reward_id",MessageBase.UINT32],
      ["point",MessageBase.UINT16],
      ["state",MessageBase.UINT8],

    ]
}
// =========================
// 查看奖励信息
//-define（PT_SYSTEM, 58002）.
// 协议号：58002
export class C58002 extends MessageBase{
}
export class S58002 extends MessageBase{
   public item_1 : S58002_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S58002_1]],

    ]
}
// =========================
// 领取奖励
//-define（PT_SYSTEM, 58003）.
// 协议号：58003
export class C58003 extends MessageBase{
  public reward_index:number;//奖励序号
  public static DES : Array<any> =
     [
      ["reward_index",MessageBase.UINT16],

    ]
}
export class S58003 extends MessageBase{
}
// =========================
// 活跃变化
//-define（PT_SYSTEM, 58004）.
// 协议号：58004 
export class C58004 extends MessageBase{
}
export class S58004 extends MessageBase{
  public sys:number;//系统编号
  public times:number;//活跃度次数
  public curtimes:number;//当前次数
  public static DES : Array<any> =
     [
      ["sys",MessageBase.UINT16],
      ["times",MessageBase.UINT16],
      ["curtimes",MessageBase.UINT16],

    ]
}
export class C58005_1 extends MessageBase{
}
export class S58005_1 extends MessageBase{
  public sys:number;//系统编号
  public state:number;//开启状态0->新开启1->继续2->结束
  public type:number;//0:正常开启1:升级开启
  public static DES : Array<any> =
     [
      ["sys",MessageBase.UINT16],
      ["state",MessageBase.UINT8],
      ["type",MessageBase.UINT8],

    ]
}
// =========================
// 活动开启
//-define（PT_SYSTEM, 58005）.
// 协议号：58005 
export class C58005 extends MessageBase{
}
export class S58005 extends MessageBase{
   public item_1 : S58005_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S58005_1]],

    ]
}
