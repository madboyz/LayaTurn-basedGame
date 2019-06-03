import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 64老虎机协议
// =========================================================
// 获取老虎机详情
//-define（PT_SLOTMACHINE_INFO, 64001）.
// 协议号： 64001
export class C64001 extends MessageBase{
}
export class S64001 extends MessageBase{
  public CurRounds:number;//当前轮次
  public LeftTime:number;//剩余开奖时间
  public Change:number;//我购买的大盘跌涨平
  public Value:number;//大盘购买量0未购买
  public static DES : Array<any> =
     [
      ["CurRounds",MessageBase.UINT32],
      ["LeftTime",MessageBase.UINT32],
      ["Change",MessageBase.UINT16],
      ["Value",MessageBase.UINT32],

    ]
}
// 下注期货
//-define（PT_SLOTMACHINE_BUY_1, 64002）.
// 协议号： 64002
export class C64002 extends MessageBase{
}
export class S64002 extends MessageBase{
}
// 返回 64001
// 下注大盘
//-define（PT_SLOTMACHINE_BUY_2, 64003）.
// 协议号： 64003
export class C64003 extends MessageBase{
  public Change:number;//我购买的大盘跌涨平
  public Value:number;//大盘购买量0未购买
  public static DES : Array<any> =
     [
      ["Change",MessageBase.UINT8],
      ["Value",MessageBase.UINT32],

    ]
}
export class S64003 extends MessageBase{
  public Code:number;//成功失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
// 返回 64001
// 客户端定期发改协议更新界面 如果界面处于打开状态的话
//-define（PT_SLOTMACHINE_SERVER_INFO, 64004）.
// 协议号： 64004刷新全服购买信息
export class C64004 extends MessageBase{
}
export class S64004 extends MessageBase{
  public CurRounds:number;//当前轮次
  public LeftTime:number;//剩余开奖时间
  public static DES : Array<any> =
     [
      ["CurRounds",MessageBase.UINT32],
      ["LeftTime",MessageBase.UINT32],

    ]
}
// 在线玩家接收到此协议后弹出开奖界面开始转圈圈
//-define（PT_SLOTMACHINE_LOTTERY_OPEN, 64005）.
// 协议号： 64005推送开奖
export class C64005 extends MessageBase{
}
export class S64005 extends MessageBase{
  public CurRounds:number;//当前轮次
  public No:number;//开奖编号
  public Change:number;//大盘涨跌
  public MyChange:number;//我购买的大盘跌涨平
  public Value:number;//大盘购买量0未购买
  public static DES : Array<any> =
     [
      ["CurRounds",MessageBase.UINT32],
      ["No",MessageBase.UINT32],
      ["Change",MessageBase.UINT16],
      ["MyChange",MessageBase.UINT8],
      ["Value",MessageBase.UINT32],

    ]
}
// 客户端定期发改协议更新界面 如果界面处于打开状态的话
//-define（PT_SCRATCHCARD, 64006）.
// 协议号： 64006
export class C64006 extends MessageBase{
}
export class S64006 extends MessageBase{
  public Code:number;//状态
  public Number1:number;//开奖的百位数
  public Number2:number;//开奖的十位数
  public Number3:number;//开奖的个位数
  public Number4:number;//倍率
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],
      ["Number1",MessageBase.UINT8],
      ["Number2",MessageBase.UINT8],
      ["Number3",MessageBase.UINT8],
      ["Number4",MessageBase.UINT8],

    ]
}
