import { MessageBase } from "../../message/messageBase/MessageBase";
export class C42001_1 extends MessageBase{
}
export class S42001_1 extends MessageBase{
    //镖车信息
  public role_id:number;//
  public role_name:string;//
  public role_lv:number;//人物等级
  public truck_lv:number;//镖车等级
  public employ:number;//0:无雇佣1:雇佣
  public cur_hijack:number;//当前被劫镖次数
  public max_hijack:number;//最大劫镖次数
  public stage:number;//阶段，默认为0
  public stage_time:number;//阶段开始时间
  public static DES : Array<any> =
     [
      ["role_id",MessageBase.UINT64],
      ["role_name",MessageBase.STRING],
      ["role_lv",MessageBase.UINT16],
      ["truck_lv",MessageBase.UINT8],
      ["employ",MessageBase.UINT8],
      ["cur_hijack",MessageBase.UINT8],
      ["max_hijack",MessageBase.UINT8],
      ["stage",MessageBase.UINT8],
      ["stage_time",MessageBase.UINT32],

    ]
}
// =========================================================
// 42 运镖协议
// =========================================================
// =========================
// 查询护送界面信息
//-define（PT_ESCORT_INFO, 42001）.
// 协议号：42001
export class C42001 extends MessageBase{
}
export class S42001 extends MessageBase{
   public item_1 : S42001_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S42001_1]],

    ]
}
export class C42002_1 extends MessageBase{
}
export class S42002_1 extends MessageBase{
    //截获或损失物品列表
  public GoodsNo:number;//
  public GoodsNum:number;//
  public Quality:number;//
  public BindState:number;//绑定状态
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsNum",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["BindState",MessageBase.UINT8],

    ]
}
// =========================
// 运镖记录推送
//-define（PT_ESCORT_NEWS, 42002）.
// 协议号：42002
export class C42002 extends MessageBase{
}
export class S42002 extends MessageBase{
  public news_type:number;//新闻类型1:劫镖2：被劫镖
  public timestamp:number;//发生时间戳
  public role_id:number;//新闻主角玩家ID
  public name:string;//新闻主角玩家名字
   public item_1 : S42002_1[];
  public static DES : Array<any> =
     [
      ["news_type",MessageBase.UINT8],
      ["timestamp",MessageBase.UINT32],
      ["role_id",MessageBase.UINT64],
      ["name",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S42002_1]],

    ]
}
export class C42003_1_1 extends MessageBase{
}
export class S42003_1_1 extends MessageBase{
    //截获或损失物品列表
  public GoodsNo:number;//
  public GoodsNum:number;//
  public Quality:number;//
  public BindState:number;//绑定状态
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsNum",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],
      ["BindState",MessageBase.UINT8],

    ]
}
export class C42003_1 extends MessageBase{
}
export class S42003_1 extends MessageBase{
  public news_type:number;//新闻类型1:劫镖2：被劫镖
  public timestamp:number;//发生时间戳
  public role_id:number;//新闻主角玩家ID
  public name:string;//新闻主角玩家名字
   public item_1 : S42003_1_1[];
  public static DES : Array<any> =
     [
      ["news_type",MessageBase.UINT8],
      ["timestamp",MessageBase.UINT32],
      ["role_id",MessageBase.UINT64],
      ["name",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S42003_1_1]],

    ]
}
// =========================
// 运镖记录
//-define（PT_ESCORT_ALL_NEWS, 42003）.
// 协议号：42003
export class C42003 extends MessageBase{
}
export class S42003 extends MessageBase{
   public item_1 : S42003_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S42003_1]],

    ]
}
// =========================
// 查询单辆车信息
//-define（PT_ESCORT_TRUCK_INFO, 42004）.
// 协议号：42004
export class C42004 extends MessageBase{
  public role_id:number;//
  public static DES : Array<any> =
     [
      ["role_id",MessageBase.UINT64],

    ]
}
export class S42004 extends MessageBase{
  public role_id:number;//如果镖车已存在，则返回0
  public role_name:string;//
  public role_lv:number;//人物等级
  public truck_lv:number;//镖车等级，即星级
  public employ:number;//0:无雇佣1:雇佣
  public cur_hijack:number;//当前被劫镖次数
  public max_hijack:number;//最大劫镖次数
  public stage:number;//阶段，默认为0
  public stage_time:number;//阶段开始时间
  public static DES : Array<any> =
     [
      ["role_id",MessageBase.UINT64],
      ["role_name",MessageBase.STRING],
      ["role_lv",MessageBase.UINT16],
      ["truck_lv",MessageBase.UINT8],
      ["employ",MessageBase.UINT8],
      ["cur_hijack",MessageBase.UINT8],
      ["max_hijack",MessageBase.UINT8],
      ["stage",MessageBase.UINT8],
      ["stage_time",MessageBase.UINT32],

    ]
}
// =========================
// 请求个人运镖信息
//-define（PT_ESCORT_MY_INFO, 42005）.
// 协议号：42005
export class C42005 extends MessageBase{
}
export class S42005 extends MessageBase{
  public cur_trunk:number;//当前镖车等级
  public cur_transp:number;//当前运镖次数
  public cur_hijack:number;//当前劫镖次数
  public state:number;//0=没开始1=正在押镖2=等待领奖
  public start_time:number;//如果在运镖，表示镖车发车时间戳
  public be_hijack:number;//表示被劫镖次数
  public static DES : Array<any> =
     [
      ["cur_trunk",MessageBase.UINT8],
      ["cur_transp",MessageBase.UINT8],
      ["cur_hijack",MessageBase.UINT8],
      ["state",MessageBase.UINT8],
      ["start_time",MessageBase.UINT32],
      ["be_hijack",MessageBase.UINT8],

    ]
}
// =========================
// 开始押镖
//-define（PT_ESCORT_TRANSPORT, 42006）.
// 协议号：42006
export class C42006 extends MessageBase{
}
export class S42006 extends MessageBase{
  public state:number;//0:成功1:失败
  public static DES : Array<any> =
     [
      ["state",MessageBase.UINT8],

    ]
}
// 领取押镖奖励
//-define（PT_ESCORT_GET_REWARD, 42007）.
// 协议号：42007
export class C42007 extends MessageBase{
}
export class S42007 extends MessageBase{
}
//返回PT_ESCORT_MY_INFO
// =========================
// 用物品进阶镖车
//-define（PT_ESCORT_STAR_UP, 42008）.
// 协议号：42008
export class C42008 extends MessageBase{
}
export class S42008 extends MessageBase{
  public truck_lv:number;//镖车等级
  public static DES : Array<any> =
     [
      ["truck_lv",MessageBase.UINT8],

    ]
}
// =========================
// 直接召唤进阶到最大星
//-define（PT_ESCORT_STAR_UP_TOP, 42009）.
// 协议号：42009
export class C42009 extends MessageBase{
}
export class S42009 extends MessageBase{
  public truck_lv:number;//镖车等级
  public static DES : Array<any> =
     [
      ["truck_lv",MessageBase.UINT8],

    ]
}
// =========================
// 劫镖
//-define（PT_ESCORT_ROB, 42010）.
// 协议号：42010
export class C42010 extends MessageBase{
  public role_id:number;//
  public static DES : Array<any> =
     [
      ["role_id",MessageBase.UINT64],

    ]
}
export class S42010 extends MessageBase{
  public RetCode:number;//0成功；1失败
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],

    ]
}
// =========================
// 刷新镖车
//-define（PT_ESCORT_REFRESH, 42011）.
// 协议号：42011
export class C42011 extends MessageBase{
}
export class S42011 extends MessageBase{
}
