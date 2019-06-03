import { MessageBase } from "../../message/messageBase/MessageBase";
// =========================================================
// 62恶梦爬塔
// =========================================================
// =========================
// 恶梦爬塔信息
//-define（PT_TOWER, 62001）.
// 协议号：62001
export class C62001 extends MessageBase{
}
export class S62001 extends MessageBase{
  public tower_no:number;//当前副本编号[100002，100003，100004]，0表示没有进入过任何噩梦爬塔
  public cur_floor:number;//当前层数
  public max_floor:number;//总层数
  public chal_times:number;//恶梦爬塔剩余挑战次数
  public best_floor:number;//最好进度层数
  public static DES : Array<any> =
     [
      ["tower_no",MessageBase.UINT32],
      ["cur_floor",MessageBase.UINT16],
      ["max_floor",MessageBase.UINT16],
      ["chal_times",MessageBase.UINT8],
      ["best_floor",MessageBase.UINT16],

    ]
}
//
//=========================
//恶梦爬塔副本内界面信息
//-define（PT_TOWER,62002）.
//协议号：62002
export class C62002 extends MessageBase{
}
export class S62002 extends MessageBase{
  public tower_no:number;//当前副本编号[100002，100003，100004]，0表示没有进入过任何噩梦爬塔
  public cur_floor:number;//当前层数
  public chal_times:number;//当前BOSS挑战次数
  public max_chal_times:number;//最大BOSS挑战次数
  public buy_times:number;//当前购买次数
  public max_buy_times:number;//最大购买次数
  public static DES : Array<any> =
     [
      ["tower_no",MessageBase.UINT32],
      ["cur_floor",MessageBase.UINT16],
      ["chal_times",MessageBase.UINT8],
      ["max_chal_times",MessageBase.UINT8],
      ["buy_times",MessageBase.UINT8],
      ["max_buy_times",MessageBase.UINT8],

    ]
}
//
//=========================
//进入恶梦爬塔副本
//-define（PT_TOWER,62003）.
//协议号：62003
export class C62003 extends MessageBase{
  public tower_no:number;//当前副本编号[100002，100003，100004]0
  public cur_floor:number;//当前层数
  public state:number;//0:不取跨层经验1：取
  public static DES : Array<any> =
     [
      ["tower_no",MessageBase.UINT32],
      ["cur_floor",MessageBase.UINT16],
      ["state",MessageBase.UINT8],

    ]
}
export class S62003 extends MessageBase{
  public flag:number;//状态
    //-define（DEFAULT_STATE,0）.
    //-define（ERROR,0）.
    //-define（SUCCESS,1）.
    //-define（LV_NOT_ENGOUTH,2）.
    //-define（TEAM_LIMIT,3）.
    //-define（DUN_LIMIT,4）.
    //-define（CD_LIMIT,5）.
    //-define（VIP_LIMIT,6）.
    //-define（FLOOR_NOT_REACH,7）.未通关此层
  public static DES : Array<any> =
     [
      ["flag",MessageBase.UINT8],

    ]
}
// -define（DEFAULT_STATE, 0）.
// -define（ERROR, 0）.
// -define（SUCCESS, 1）.
// -define（LV_NOT_ENGOUTH, 2）.
// -define（TEAM_LIMIT, 3）.
// -define（DUN_LIMIT, 4）.
// -define（CD_LIMIT, 5）.
// -define（VIP_LIMIT,6）.
// -define（FLOOR_NOT_REACH,7）. 未通关此层
//=========================
//清除进度
//-define（PT_TOWER,62004）.
//协议号：62004 
export class C62004 extends MessageBase{
}
export class S62004 extends MessageBase{
  public flag:number;//状态
  public chal_times:number;//恶梦爬塔剩余挑战次数
  public static DES : Array<any> =
     [
      ["flag",MessageBase.UINT8],
      ["chal_times",MessageBase.UINT8],

    ]
}
//
//
//=========================
//添加挑战次数
//-define（PT_TOWER,62005）.
//协议号：62005
export class C62005 extends MessageBase{
  public flag:number;//1->是；0->否
  public static DES : Array<any> =
     [
      ["flag",MessageBase.UINT8],

    ]
}
export class S62005 extends MessageBase{
}
//=========================
//恶梦爬塔战斗失败
//-define（PT_TOWER, 62006）.
//协议号：62006
export class C62006 extends MessageBase{
}
export class S62006 extends MessageBase{
}
export class C62007_1 extends MessageBase{
}
export class S62007_1 extends MessageBase{
  public GoodsId:number;//
  public GoodsNo:number;//
  public GoodsNum:number;//
  public GoodsQua:number;//
  public bind:number;//绑定状态
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsNum",MessageBase.UINT32],
      ["GoodsQua",MessageBase.UINT8],
      ["bind",MessageBase.UINT8],

    ]
}
// 
//=========================
//恶梦爬塔奖励反馈
//-define（PT_TOWER,62007）.
//协议号：62007
export class C62007 extends MessageBase{
}
export class S62007 extends MessageBase{
   public item_1 : S62007_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S62007_1]],

    ]
}
//=========================
//恶梦爬塔重置提示
//-define（PT_TOWER,62008）.
//协议号：62008
export class C62008 extends MessageBase{
}
export class S62008 extends MessageBase{
}
