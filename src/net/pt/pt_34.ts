import { MessageBase } from "../../message/messageBase/MessageBase";
// ################################################
// pt_34.hrl
// 节日运营活动相关协议
// ################################################
//-define（PT_AD_GET_GOODS, 34000）.
// 通过活动领取物品
export class C34000 extends MessageBase{
}
export class S34000 extends MessageBase{
  public RetCode:number;//结果码（0成功，并向对方发送求婚协议）
    //-define（PT_AD_GIVE_GIFT,34001）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//-define（PT_AD_GIVE_GIFT, 34001）.
// 给好友赠送礼物
export class C34001 extends MessageBase{
  public PlayerId:number;//目标玩家id
  public BlessingNo:number;//祝福语编号
  public Type:number;//发送方式（1普通发送；2诚意发送）
  public static DES : Array<any> =
     [
      ["PlayerId",MessageBase.UINT64],
      ["BlessingNo",MessageBase.UINT32],
      ["Type",MessageBase.UINT8],

    ]
}
export class S34001 extends MessageBase{
  public RetCode:number;//结果码（0成功，并向对方发送求婚协议）
  public Type:number;//发送方式（1普通发送；2诚意发送）
    //-define（PT_AD_GET_GIFT,34002）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
      ["Type",MessageBase.UINT8],

    ]
}
//-define（PT_AD_GET_GIFT, 34002）.
// 领取好友赠送的礼物
export class C34002 extends MessageBase{
}
export class S34002 extends MessageBase{
  public RetCode:number;//结果码（0成功，并向对方发送求婚协议）
    //-define（PT_AD_SHOW_BRESS,34003）.
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
//-define（PT_AD_SHOW_BRESS, 34003）.
// 使用祝福礼包，祝福语提示
export class C34003 extends MessageBase{
}
export class S34003 extends MessageBase{
  public BlessingNo:number;//祝福语编号
  public FromPlayerId:number;//来自玩家id
  public FromPlayerName:string;//来自玩家名字
  public No:number;//编号
  public Quality:number;//品质
  public Count:number;//数量
  public Id:number;//唯一编号
  public static DES : Array<any> =
     [
      ["BlessingNo",MessageBase.UINT32],
      ["FromPlayerId",MessageBase.UINT64],
      ["FromPlayerName",MessageBase.STRING],
      ["No",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["Count",MessageBase.UINT16],
      ["Id",MessageBase.UINT64],

    ]
}
export class C34021_1 extends MessageBase{
}
export class S34021_1 extends MessageBase{
  public OptionNo:number;//选项编号
  public OptionContent:string;//选择内容
  public static DES : Array<any> =
     [
      ["OptionNo",MessageBase.UINT8],
      ["OptionContent",MessageBase.STRING],

    ]
}
// 世界答题 问题
//-define（PT_ACT_GRAB_ANSWER_QUESTION, 34021）.
export class C34021 extends MessageBase{
    //-define（PT_ACT_GRAB_ANSWER_QUESTION,34021）.
}
export class S34021 extends MessageBase{
  public No:number;//题目编号
  public Content:string;//题目内容
   public item_1 : S34021_1[];
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Content",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S34021_1]],

    ]
}
// 世界答题 回答
//-define（PT_ACT_GRAB_ANSWER_REPLY, 34022）.
export class C34022 extends MessageBase{
  public No:number;//题目编号
  public OptionNo:number;//选项编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["OptionNo",MessageBase.UINT8],

    ]
}
export class S34022 extends MessageBase{
}
