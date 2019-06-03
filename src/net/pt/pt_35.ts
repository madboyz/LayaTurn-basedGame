import { MessageBase } from "../../message/messageBase/MessageBase";
export class C35000_1 extends MessageBase{
}
export class S35000_1 extends MessageBase{
    //我的被推广人列表（即已接受我的推广的被推广人列表）
  public SprdeeId:number;//被推广人的id
  public SprdeeRace:number;//被推广人的种族
  public SprdeeSex:number;//被推广人的性别
  public SprdeeName:string;//被推广人的名字
  public SprdeeLv:number;//被推广人的等级
  public static DES : Array<any> =
     [
      ["SprdeeId",MessageBase.UINT64],
      ["SprdeeRace",MessageBase.UINT8],
      ["SprdeeSex",MessageBase.UINT8],
      ["SprdeeName",MessageBase.STRING],
      ["SprdeeLv",MessageBase.UINT8],

    ]
}
// 推广系统的相关协议
// 2014.8.4
// @author: huangjf
// 分类号：35
// pt: protocol
// sprd: spread（推广）
// sprd rela: spread relation（推广关系）
// sprder: 推广人
// sprdee: 被推广人
// 
//----------- 查询我的推广信息 ------------
//-define（PT_QRY_MY_SPRD_INFO,  35000）.
// 协议号：35000
export class C35000 extends MessageBase{
}
export class S35000 extends MessageBase{
   public item_1 : S35000_1[];
  public MySprdCode:string;//我的推广码
  public MySprderId:number;//我的推广人（即我主动请求与之建立推广关系的人）的id，若没有则返回0
  public MySprderRace:number;//我的推广人的种族，若没有则返回0
  public MySprderSex:number;//我的推广人的性别，若没有则返回0
  public MySprderName:string;//我的推广人的名字，若没有则返回空字串
  public MySprderLv:number;//我的推广人的等级，若没有则返回0
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S35000_1]],
      ["MySprdCode",MessageBase.STRING],
      ["MySprderId",MessageBase.UINT64],
      ["MySprderRace",MessageBase.UINT8],
      ["MySprderSex",MessageBase.UINT8],
      ["MySprderName",MessageBase.STRING],
      ["MySprderLv",MessageBase.UINT8],

    ]
}
//----------- 请求建立推广关系 ------------
//-define（PT_REQ_BUILD_SPRD_RELA,  35001）.
// 协议号：35001
export class C35001 extends MessageBase{
}
export class S35001 extends MessageBase{
  public RetCode:number;//如果成功则返回0，否则不返回，而是直接发送失败提示消息协议
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//----------- 通知推广关系双方：新的推广关系建立了 ------------
//-define（PT_NOTIFY_NEW_SPRD_RELA_BUILDED,  35002）.
// 协议号：35002
export class C35002 extends MessageBase{
}
export class S35002 extends MessageBase{
  public SprderId:number;//推广人的id
  public SprderRace:number;//推广人的种族
  public SprderSex:number;//推广人的性别
  public SprderName:string;//推广人的名字
  public SprderLv:number;//推广人的等级
  public SprdeeId:number;//被推广人的id
  public SprdeeRace:number;//被推广人的种族
  public SprdeeSex:number;//被推广人的性别
  public SprdeeName:string;//被推广人的名字
  public SprdeeLv:number;//被推广人的等级
  public static DES : Array<any> =
     [
      ["SprderId",MessageBase.UINT64],
      ["SprderRace",MessageBase.UINT8],
      ["SprderSex",MessageBase.UINT8],
      ["SprderName",MessageBase.STRING],
      ["SprderLv",MessageBase.UINT8],
      ["SprdeeId",MessageBase.UINT64],
      ["SprdeeRace",MessageBase.UINT8],
      ["SprdeeSex",MessageBase.UINT8],
      ["SprdeeName",MessageBase.STRING],
      ["SprdeeLv",MessageBase.UINT8],

    ]
}
