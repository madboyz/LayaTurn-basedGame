import { MessageBase } from "../../message/messageBase/MessageBase";
// 年夜饭相关协议
// 2015.01.07
// @author: liufang
// 分类号：36
// pt: 表示protocol
//-define（PT_NEWYEAR_BANQUET_ENTER_SCENE, 36001）.
// 进入新年宴会场景
export class C36001 extends MessageBase{
}
export class S36001 extends MessageBase{
}
//仅发协议号
//-define（PT_NEWYEAR_BANQUET_LEAVE_SCENE, 36002）.
// 退出新年宴会场景
export class C36002 extends MessageBase{
}
export class S36002 extends MessageBase{
}
export class C36003_1 extends MessageBase{
}
export class S36003_1 extends MessageBase{
    //加菜排行榜
  public playerId:number;//玩家id
  public name:string;//玩家名字
  public dish1_num:number;//[粗茶淡饭]已经加菜次数
  public dish2_num:number;//[大鱼大肉]已经加菜次数
  public dish3_num:number;//[鲍参翅肚]已经加菜次数
  public static DES : Array<any> =
     [
      ["playerId",MessageBase.UINT64],
      ["name",MessageBase.STRING],
      ["dish1_num",MessageBase.UINT8],
      ["dish2_num",MessageBase.UINT8],
      ["dish3_num",MessageBase.UINT8],

    ]
}
export class C36003_2 extends MessageBase{
}
export class S36003_2 extends MessageBase{
    //加菜列表
  public playerId:number;//玩家id
  public name:string;//玩家名字
  public dish_no:number;//加菜类型（1粗茶淡饭2大鱼大肉3鲍参翅肚）
  public static DES : Array<any> =
     [
      ["playerId",MessageBase.UINT64],
      ["name",MessageBase.STRING],
      ["dish_no",MessageBase.UINT8],

    ]
}
//仅发协议号
//-----------年夜宴会信息------------
//-define（PT_GET_NEWYEAR_BANQUET, 36003）.
// 协议号：36003
export class C36003 extends MessageBase{
}
export class S36003 extends MessageBase{
  public banquet_lv:number;//宴会档次（最大为5）
  public banquet_exp:number;//宴会当前经验值
  public refresh_time:number;//最近刷新时间
  public my_dish_num1:number;//[粗茶淡饭]已经加菜次数
  public my_dish_num2:number;//[大鱼大肉]已经加菜次数
  public my_dish_num3:number;//[鲍参翅肚]已经加菜次数
   public item_1 : S36003_1[];
   public item_2 : S36003_2[];
  public static DES : Array<any> =
     [
      ["banquet_lv",MessageBase.UINT8],
      ["banquet_exp",MessageBase.UINT32],
      ["refresh_time",MessageBase.UINT32],
      ["my_dish_num1",MessageBase.UINT8],
      ["my_dish_num2",MessageBase.UINT8],
      ["my_dish_num3",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S36003_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S36003_2]],

    ]
}
// 年夜宴会加菜
//-define（PT_ADD_NEWYEAR_DISHES, 36004）.
//协议号：36004
export class C36004 extends MessageBase{
  public DishesNo:number;//菜的编号
  public Num:number;//数量
  public static DES : Array<any> =
     [
      ["DishesNo",MessageBase.UINT8],
      ["Num",MessageBase.UINT16],

    ]
}
export class S36004 extends MessageBase{
  public banquet_lv:number;//宴会档次（最大为5）
  public banquet_exp:number;//宴会当前经验值
  public static DES : Array<any> =
     [
      ["banquet_lv",MessageBase.UINT8],
      ["banquet_exp",MessageBase.UINT32],

    ]
}
// 通知前端已刷新可加菜次数
//-define（PT_NEWYEAR_BANQUET_REFRESH_ADD_DISH, 36005）.
// 协议号：36005
export class C36005 extends MessageBase{
}
export class S36005 extends MessageBase{
}
//
// 日常充值幸运转盘活动协议
// 幸运转盘信息
//-define（PT_ERNIE_INFO, 36100）.
// 协议号：36100
export class C36100 extends MessageBase{
}
export class S36100 extends MessageBase{
}
// 幸运转盘抽奖
//-define（PT_ERNIE_GET, 36101）.
// 协议号：36101
export class C36101 extends MessageBase{
}
export class S36101 extends MessageBase{
}
// 通知前端有幸运转盘抽奖次数
//-define（PT_ERNIE_NOTIFY, 36102）.
// 协议号：36102
export class C36102 extends MessageBase{
}
export class S36102 extends MessageBase{
}
