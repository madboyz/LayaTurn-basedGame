import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 19邮件协议
// =========================================================
//=========================
// 发邮件
//-define（PT_SEND_EMAIL, 19001）.
// 协议号： 19001
export class C19001 extends MessageBase{
  public RecvName:string//收件人姓名
  public Title:string//标题
  public Content:string//内容
  public static DES : Array<any> =
     [
      ["RecvName",MessageBase.STRING],
      ["Title",MessageBase.STRING],
      ["Content",MessageBase.STRING],

    ]
}
export class S19001 extends MessageBase{
  public State:number;//1->成功0->失败
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
export class C19002_1 extends MessageBase{
}
export class S19002_1 extends MessageBase{
  public MailId:number;//邮件ID
  public Title:string//标题
  public State:number;//0->未读，1->已读
  public StartStamp:number;//开始时间戳
  public SndStamp:number;//到期时间戳
  public Attach_Flag:number;//是否有附件（0->无1->有）
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],
      ["Title",MessageBase.STRING],
      ["State",MessageBase.UINT8],
      ["StartStamp",MessageBase.UINT32],
      ["SndStamp",MessageBase.UINT32],
      ["Attach_Flag",MessageBase.UINT8],

    ]
}
//
//=========================
// 查看邮件列表简要信息
//-define（PT_CHECK_EMAIL_BRIEF, 19002）.
// 协议号： 19002
export class C19002 extends MessageBase{
  public Type:number;//邮件类型1->系统2->私人
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],

    ]
}
export class S19002 extends MessageBase{
  public Type:number;//邮件类型1->系统2->私人
   public item_1 : S19002_1[];
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S19002_1]],

    ]
}
export class C19003_1 extends MessageBase{
}
export class S19003_1 extends MessageBase{
  public GoodsId:number;//物品ID
  public GoodsNo:number;//物品编号
  public Num:number;//数量
  public Quality:number;//质量
  public Bind:number;//绑定状态
  public BattlePower:number;//装备战斗力对于非装备则为0
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["Num",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["Bind",MessageBase.UINT8],
      ["BattlePower",MessageBase.UINT32],

    ]
}
//
//
//=========================
// 查看具体邮件
//-define（PT_CHECK_EMAIL_SPECIFIC, 19003）.
// 协议号： 19003
export class C19003 extends MessageBase{
  public MailId:number;//邮件ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],

    ]
}
export class S19003 extends MessageBase{
  public MailId:number;//邮件ID
  public SendName:string//发件人姓名
  public Content:string//内容
   public item_1 : S19003_1[];
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],
      ["SendName",MessageBase.STRING],
      ["Content",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S19003_1]],

    ]
}
//
//
//=========================
// 收取附件
//-define（PT_GET_EMAIL, 19004）.
// 协议号： 19004
export class C19004 extends MessageBase{
  public MailId:number;//邮件ID
  public GoodsId:number;//物品ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S19004 extends MessageBase{
  public MailId:number;//邮件ID
  public GoodsId:number;//物品ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class C19005_1 extends MessageBase{
  public MailId:number;//邮件ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],

    ]
}
export class S19005_1 extends MessageBase{
}
export class C19005_2 extends MessageBase{
}
export class S19005_2 extends MessageBase{
  public MailId:number;//成功提取附件的邮件ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],

    ]
}
export class C19005_3 extends MessageBase{
}
export class S19005_3 extends MessageBase{
  public MailId:number;//失败提取附件的邮件ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],

    ]
}
//=========================
// 批量收取附件
//-define（PT_BATCH_GET_EMAIL, 19005）.
// 协议号： 19005
export class C19005 extends MessageBase{
   public item_1 : C19005_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C19005_1]],

    ]
}
export class S19005 extends MessageBase{
   public item_2 : S19005_2[];
   public item_3 : S19005_3[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S19005_2]],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S19005_3]],

    ]
}
//
//
//=========================
// 删除邮件
//-define（PT_DELETE_EMAIL, 19006）.
// 协议号： 19006
export class C19006 extends MessageBase{
  public MailId:number;//邮件ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],

    ]
}
export class S19006 extends MessageBase{
  public MailId:number;//邮件ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],

    ]
}
export class C19007_1 extends MessageBase{
  public MailId:number;//邮件ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],

    ]
}
export class S19007_1 extends MessageBase{
}
export class C19007_2 extends MessageBase{
}
export class S19007_2 extends MessageBase{
  public MailId:number;//成功删除的邮件ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],

    ]
}
export class C19007_3 extends MessageBase{
}
export class S19007_3 extends MessageBase{
  public MailId:number;//失败删除的邮件ID
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],

    ]
}
//
//
//=========================
// 批量删除邮件
//-define（PT_BATCH_DELETE_EMAIL, 19007）.
// 协议号： 19007
export class C19007 extends MessageBase{
   public item_1 : C19007_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C19007_1]],

    ]
}
export class S19007 extends MessageBase{
   public item_2 : S19007_2[];
   public item_3 : S19007_3[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S19007_2]],
        ["item_3",MessageBase.ARRAY,[MessageBase.CLASS,S19007_3]],

    ]
}
//
//=========================
// 新邮件提示
//-define（PT_NEW_EMAIL, 19008）.
// 协议号： 19008
export class C19008 extends MessageBase{
}
export class S19008 extends MessageBase{
  public MailId:number;//邮件ID
  public Type:number;//邮件类型
  public Title:string//标题
  public TimeStamp:number;//发送时间戳
  public ExpireTime:number;//到期时间戳
  public Attach_Flag:number;//是否有附件（0->无1->有）
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],
      ["Type",MessageBase.UINT8],
      ["Title",MessageBase.STRING],
      ["TimeStamp",MessageBase.UINT32],
      ["ExpireTime",MessageBase.UINT32],
      ["Attach_Flag",MessageBase.UINT8],

    ]
}
//=========================
// 删除邮件候补的旧邮件
//-define（PT_DELETE_BACKUP_OLD_EMAIL, 19010）.
// 协议号： 19010
export class C19010 extends MessageBase{
}
export class S19010 extends MessageBase{
  public MailId:number;//邮件ID
  public Type:number;//邮件类型
  public Title:string//标题
  public TimeStamp:number;//到期时间戳
  public Attach_Flag:number;//是否有附件（0->无1->有）
  public State:number;//0->未读，1->已读
  public static DES : Array<any> =
     [
      ["MailId",MessageBase.UINT64],
      ["Type",MessageBase.UINT8],
      ["Title",MessageBase.STRING],
      ["TimeStamp",MessageBase.UINT32],
      ["Attach_Flag",MessageBase.UINT8],
      ["State",MessageBase.UINT8],

    ]
}
export class C19009_1 extends MessageBase{
}
export class S19009_1 extends MessageBase{
  public Name:string;//名字
  public static DES : Array<any> =
     [
      ["Name",MessageBase.STRING],

    ]
}
//=========================
// 历史收件人（废弃）
//-define（PT_HISTORY_RECEIVER, 19009）.
// 协议号： 19009
export class C19009 extends MessageBase{
}
export class S19009 extends MessageBase{
   public item_1 : S19009_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S19009_1]],

    ]
}
