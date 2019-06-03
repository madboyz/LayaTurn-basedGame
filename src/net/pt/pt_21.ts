import { MessageBase } from "../../message/messageBase/MessageBase";
export class C21001_1 extends MessageBase{
}
export class S21001_1 extends MessageBase{
  public SkillId:number;//技能id
  public SkillLv:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],
      ["SkillLv",MessageBase.UINT32],

    ]
}
// =================================
// 技能系统相关协议
// 2018.6.14---- weson
// =================================
// pt: 表示protocol
// ---------- 查询自己的已学习的技能信息 -----------------
//-define（PT_SKILL_QUERY_INFO, 21001）.
// 协议号: 21001
export class C21001 extends MessageBase{
}
export class S21001 extends MessageBase{
   public item_1 : S21001_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S21001_1]],

    ]
}
// ---------- 升级 -----------------
//-define（PT_SKILL_UPGRADE, 21002）.
// 协议号: 21002
export class C21002 extends MessageBase{
  public SkillId:number;//技能id
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],

    ]
}
export class S21002 extends MessageBase{
  public SkillId:number;//技能id
  public SkillLv:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],
      ["SkillLv",MessageBase.UINT32],

    ]
}
export class C21003_1 extends MessageBase{
}
export class S21003_1 extends MessageBase{
  public SkillId:number;//技能id
  public SkillLv:number;//技能等级
  public static DES : Array<any> =
     [
      ["SkillId",MessageBase.UINT32],
      ["SkillLv",MessageBase.UINT32],

    ]
}
// ---------- 一键升级 -----------------
//-define（PT_SKILL_UPGRADE_ONE_KEY, 21003）.
// 协议号: 21003
export class C21003 extends MessageBase{
}
export class S21003 extends MessageBase{
   public item_1 : S21003_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S21003_1]],

    ]
}
