import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 63商会协议
// =========================================================
//=========================
// 获取商会信息
//-define（PT_GET_BUSINESS_ALL_INFO, 63001）.
// 协议号： 63001
export class C63001 extends MessageBase{
  public Type:number;//
  public SubType:number;//
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["SubType",MessageBase.UINT8],

    ]
}
export class S63001 extends MessageBase{
  public Type:number;//
  public SubType:number;//
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["SubType",MessageBase.UINT8],

    ]
}
//
//=========================
// 购买物品
//-define（PT_BUY_BUSINESS_GOODS, 63002）.
// 协议号： 63002
export class C63002 extends MessageBase{
  public No:number;//配置编号
  public Count:number;//购买数量
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Count",MessageBase.UINT32],

    ]
}
export class S63002 extends MessageBase{
  public Code:number;//成功失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
//
//=========================
// 出售物品
//-define（PT_SELL_BUSINESS_GOODS, 63003）.
// 协议号： 63003
export class C63003 extends MessageBase{
  public GoodsId:number;//配置Id
  public Count:number;//出售数量
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["Count",MessageBase.UINT32],

    ]
}
export class S63003 extends MessageBase{
  public Code:number;//成功失败
  public static DES : Array<any> =
     [
      ["Code",MessageBase.UINT8],

    ]
}
//=========================
// 获取商会信息
//-define（PT_GET_BUSINESS_SINGLE_INFO, 63004）.
// 协议号： 63004
export class C63004 extends MessageBase{
  public No:number;//配置编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S63004 extends MessageBase{
}
