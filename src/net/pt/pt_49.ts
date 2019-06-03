import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 49爬塔
// =========================================================
// =========================
// 爬塔信息，支持请求或变化时服务端推送
//-define（PT_TOWER_INFO, 49001）.
// 协议号：49001
export class C49001 extends MessageBase{
}
export class S49001 extends MessageBase{
  public cur_floor:number;//当前已通关层数
  public left_times:number;//爬塔剩余挑战总次数
  public buy_times:number;//当天购买次数
  public recover_time:number;//上次恢复次数时间戳
  public static DES : Array<any> =
     [
      ["cur_floor",MessageBase.UINT32],
      ["left_times",MessageBase.UINT8],
      ["buy_times",MessageBase.UINT8],
      ["recover_time",MessageBase.UINT32],

    ]
}
//
//=========================
//进入爬塔副本
//-define（PT_TOWER_ENTER, 49002）.
//协议号：49003
export class C49002 extends MessageBase{
  public cur_floor:number;//层数
  public static DES : Array<any> =
     [
      ["cur_floor",MessageBase.UINT32],

    ]
}
export class S49002 extends MessageBase{
  public cur_floor:number;//层数
  public static DES : Array<any> =
     [
      ["cur_floor",MessageBase.UINT32],

    ]
}
//
//
//=========================
// 购买挑战次数
//-define（PT_TOWER_BUY, 49003）.
//协议号：49003
export class C49003 extends MessageBase{
}
export class S49003 extends MessageBase{
}
