import { MessageBase } from "../../message/messageBase/MessageBase";
export class C57001_1 extends MessageBase{
}
export class S57001_1 extends MessageBase{
  public Id:number;//玩家id
  public state:number;//状态0->失败/未知错误1->成功/可进入2->等级不足3->人数/队伍限制4->前置难度没通关5->cd6->副本次数用光7->没有副本道具消耗
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["state",MessageBase.UINT8],

    ]
}
// =========================================================
// 57 副本
// =========================================================
// =========================
// 创建并进入副本
//-define（PT_COPY_CREATE_ENTER, 57001）.
// 协议号：57001
export class C57001 extends MessageBase{
  public no:number;//副本编号
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],

    ]
}
export class S57001 extends MessageBase{
  public no:number;//副本编号
   public item_1 : S57001_1[];
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57001_1]],

    ]
}
// =========================
// 退出副本
//-define（PT_COPY_QUIT, 57002）.
// 协议号：57002
export class C57002 extends MessageBase{
}
export class S57002 extends MessageBase{
  public state:number;//状态
  public static DES : Array<any> =
     [
      ["state",MessageBase.UINT8],

    ]
}
export class C57003_1 extends MessageBase{
  public no:number;//副本编号
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],

    ]
}
export class S57003_1 extends MessageBase{
}
export class C57003_2 extends MessageBase{
}
export class S57003_2 extends MessageBase{
  public no:number;//副本编号
  public state:number;//状态0->失败/未知错误1->成功/可进入2->等级不足3->人数/队伍限制4->前置难度没通关5->cd6->副本次数用光7->没有副本道具消耗
  public times:number;//已通关次数
  public left_times:number;//剩余次数
  public time_stamp:number;//上次次数回复unix时间戳
  public pass:number;//通关状态1表示通关
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],
      ["state",MessageBase.UINT8],
      ["times",MessageBase.UINT16],
      ["left_times",MessageBase.UINT16],
      ["time_stamp",MessageBase.UINT32],
      ["pass",MessageBase.UINT8],

    ]
}
// =========================
// 查询副本
//-define（PT_COPY_QRY_INFO, 57003）.
// 协议号：57003
export class C57003 extends MessageBase{
   public item_1 : C57003_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C57003_1]],

    ]
}
export class S57003 extends MessageBase{
   public item_2 : S57003_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S57003_2]],

    ]
}
export class C57004_1 extends MessageBase{
}
export class S57004_1 extends MessageBase{
  public Id:number;//点否的玩家id
  public state:number;//是否要使用英雄令1:否2:是
  public static DES : Array<any> =
     [
      ["Id",MessageBase.UINT64],
      ["state",MessageBase.UINT8],

    ]
}
// =========================
// 进入副本确认
//-define（PT_COPY_CONFIRM, 57004）.
// 协议号：57004
export class C57004 extends MessageBase{
  public flag:number;//0->否1->是2->不使用英雄令
  public static DES : Array<any> =
     [
      ["flag",MessageBase.UINT8],

    ]
}
export class S57004 extends MessageBase{
  public flag:number;//0->进入副本失败1->成功
   public item_1 : S57004_1[];
  public static DES : Array<any> =
     [
      ["flag",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57004_1]],

    ]
}
// =========================
// 显示进入副本确认
//-define（PT_COPY_SHOW_CONFIRM, 57005）.
// 协议号：57005
export class C57005 extends MessageBase{
}
export class S57005 extends MessageBase{
  public No:number;//副本编号
  public state:number;//是否要使用英雄令0:是1:否
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["state",MessageBase.UINT8],

    ]
}
// =========================
// 通知客户端进入副本
//-define（PT_COPY_NOTIFY_ENTER, 57006）.
// 协议号：57006
export class C57006 extends MessageBase{
}
export class S57006 extends MessageBase{
  public no:number;//副本编号
  public time:number;//剩余时间
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],
      ["time",MessageBase.UINT32],

    ]
}
// =========================
// 通知副本通关，需要评分的情况用
//-define（PT_COPY_RESULT, 57007）.
// 协议号：57007
export class C57007 extends MessageBase{
}
export class S57007 extends MessageBase{
  public lv:number;//评分等级
  public bout:number;//回合数
  public bout_points:number;//回合分数
  public dead:number;//死亡数
  public dead_points:number;//死亡分数
  public static DES : Array<any> =
     [
      ["lv",MessageBase.UINT8],
      ["bout",MessageBase.UINT16],
      ["bout_points",MessageBase.UINT32],
      ["dead",MessageBase.UINT16],
      ["dead_points",MessageBase.UINT32],

    ]
}
// =========================
// 副本奖励再来一箱
//-define（PT_COPY_ONE_MORE_BOX, 57008）.
// 协议号：57008
export class C57008 extends MessageBase{
}
export class S57008 extends MessageBase{
  public state:number;//状态
  public quality:number;//箱子品质（1->钻;2->金;3->银;4->铜）
  public static DES : Array<any> =
     [
      ["state",MessageBase.UINT8],
      ["quality",MessageBase.UINT8],

    ]
}
// =========================
//-define（PT_COPY_CD, 57009）.
// 回复CD
// 协议号：57009
export class C57009 extends MessageBase{
}
export class S57009 extends MessageBase{
  public group:number;//副本所属组
  public times:number;//次数
  public left_times:number;//剩余次数
  public time_stamp:number;//上次次数回复unix时间戳
  public static DES : Array<any> =
     [
      ["group",MessageBase.UINT16],
      ["times",MessageBase.UINT16],
      ["left_times",MessageBase.UINT16],
      ["time_stamp",MessageBase.UINT32],

    ]
}
// =========================
// 通知副本时间到期
//-define（PT_COPY_TIMEOUT, 57010）.
// 协议号：57010
export class C57010 extends MessageBase{
}
export class S57010 extends MessageBase{
}
// =========================
// 爬塔副本进入下一层
//-define（PT_COPY_TOWER_NEXT, 57011）.
// 协议号：57011
export class C57011 extends MessageBase{
}
export class S57011 extends MessageBase{
}
// =========================
// 通知等待队员确认进入副本
//-define（PT_COPY_WAIT_MEMBER, 57012）.
// 协议号：57012
export class C57012 extends MessageBase{
}
export class S57012 extends MessageBase{
}
export class C57013_1 extends MessageBase{
}
export class S57013_1 extends MessageBase{
  public itemNo:number;//物品编号
  public num:number;//数量
  public quality:number;//品质
  public GoodsId:number;//物品ID
  public bind:number;//绑定状态
  public static DES : Array<any> =
     [
      ["itemNo",MessageBase.UINT32],
      ["num",MessageBase.UINT16],
      ["quality",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],
      ["bind",MessageBase.UINT8],

    ]
}
// =========================
// 领取箱子奖励暂无需求
//-define（PT_COPY_BOX_REWARD, 57013）.
// 协议号：57013
export class C57013 extends MessageBase{
}
export class S57013 extends MessageBase{
   public item_1 : S57013_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57013_1]],

    ]
}
export class C57014_1 extends MessageBase{
}
export class S57014_1 extends MessageBase{
  public GoodsId:number;//物品ID（临时id）
  public GoodsNo:number;//
  public GoodsNum:number;//
  public Quality:number;//
  public bind:number;//绑定状态
  public static DES : Array<any> =
     [
      ["GoodsId",MessageBase.UINT64],
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsNum",MessageBase.UINT16],
      ["Quality",MessageBase.UINT8],
      ["bind",MessageBase.UINT8],

    ]
}
//=========================
//精英副本公共奖励列表
//-define（PT_COPY_COMMON_REWARD, 57014）.
//协议号：57014
export class C57014 extends MessageBase{
}
export class S57014 extends MessageBase{
   public item_1 : S57014_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57014_1]],

    ]
}
//精英副本公共奖励选择
//-define（PT_COPY_REWARD_SEL, 57015）.
//协议号：57015
export class C57015 extends MessageBase{
  public Select:number;//0不需要，1需要
  public GoodsId:number;//物品ID（临时id）
  public static DES : Array<any> =
     [
      ["Select",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class S57015 extends MessageBase{
  public SelectPoint:number;//点数
  public GoodsId:number;//物品ID（临时id）
  public static DES : Array<any> =
     [
      ["SelectPoint",MessageBase.UINT8],
      ["GoodsId",MessageBase.UINT64],

    ]
}
export class C57016_1 extends MessageBase{
}
export class S57016_1 extends MessageBase{
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
// 普通副本结束 | 一键扫荡 反馈
//-define（PT_COPY_END, 57016）.
//协议号：57016
export class C57016 extends MessageBase{
}
export class S57016 extends MessageBase{
  public RetCode:number;//0表示成功，1挑战失败
   public item_1 : S57016_1[];
  public static DES : Array<any> =
     [
      ["RetCode",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57016_1]],

    ]
}
// 普通副本扫荡
//-define（PT_COPY_SWEEP, 57017）.
//协议号：59017
export class C57017 extends MessageBase{
  public no:number;//副本编号
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],

    ]
}
export class S57017 extends MessageBase{
  public no:number;//副本编号
  public state:number;//状态0->失败/未知错误1->成功/可进入2->等级不足3->人数/队伍限制4->前置难度没通关5->cd6->副本次数用光7->没有副本道具消耗9->副本没有通关
  public times:number;//已通关次数
  public left_times:number;//剩余次数
  public time_stamp:number;//上次次数回复unix时间戳
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],
      ["state",MessageBase.UINT8],
      ["times",MessageBase.UINT16],
      ["left_times",MessageBase.UINT16],
      ["time_stamp",MessageBase.UINT32],

    ]
}
// 秘境章节副本进度查询,当前可以挑战的未通关的章节和副本编号
//-define（PT_COPY_SECRET_INDEX, 57018）.
export class C57018 extends MessageBase{
}
export class S57018 extends MessageBase{
  public ChapterID:number;//章节
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],
      ["DunNo",MessageBase.UINT32],

    ]
}
export class C57019_1 extends MessageBase{
}
export class S57019_1 extends MessageBase{
  public no:number;//副本编号
  public state:number;//状态0->失败/未知错误1->成功/可进入2->等级不足3->人数/队伍限制4->前置难度没通关5->cd6->副本次数用光7->没有副本道具消耗
  public times:number;//已参与次数
  public pass:number;//通关状态1表示通关
  public Star:number;//历史最高星数
  public static DES : Array<any> =
     [
      ["no",MessageBase.UINT32],
      ["state",MessageBase.UINT8],
      ["times",MessageBase.UINT16],
      ["pass",MessageBase.UINT8],
      ["Star",MessageBase.UINT8],

    ]
}
export class C57019_2 extends MessageBase{
}
export class S57019_2 extends MessageBase{
    //章节星级奖励领取状态数组为空表示没领取过
  public Star:number;//星级
  public RwdState:number;//3表示已经领取
  public static DES : Array<any> =
     [
      ["Star",MessageBase.UINT8],
      ["RwdState",MessageBase.UINT8],

    ]
}
// 秘境章节副本信息查询
//-define（PT_COPY_SECRET_INFO, 57019）.
export class C57019 extends MessageBase{
  public ChapterID:number;//章节
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],

    ]
}
export class S57019 extends MessageBase{
  public ChapterID:number;//章节
   public item_1 : S57019_1[];
   public item_2 : S57019_2[];
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57019_1]],
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S57019_2]],

    ]
}
// 秘境章节扫荡,扫荡后返回 PT_COPY_SECRET_INFO
//-define（PT_COPY_SECRET_SWEEP, 57020）.
export class C57020 extends MessageBase{
  public ChapterID:number;//章节
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],

    ]
}
export class S57020 extends MessageBase{
}
// 领取章节星级奖励
//-define（PT_COPY_GET_STAR_REWARD, 57021）.
export class C57021 extends MessageBase{
  public ChapterID:number;//章节
  public Star:number;//星级
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],
      ["Star",MessageBase.UINT8],

    ]
}
export class S57021 extends MessageBase{
  public ChapterID:number;//章节
  public Star:number;//星级
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],
      ["Star",MessageBase.UINT8],

    ]
}
// （个人boss/材料副本/宠物秘境/至尊boss/三界副本）一键扫荡,扫荡后返回 57017/57019
//-define（PT_DUNGEON_SWEEP, 57022）.
export class C57022 extends MessageBase{
  public Type:number;//副本类型
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],

    ]
}
export class S57022 extends MessageBase{
  public Type:number;//副本类型
  public RetCode:number;//0成功
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["RetCode",MessageBase.UINT8],

    ]
}
// 至尊boss副本进度查询,当前可以挑战的未通关的章节和副本编号
//-define（PT_SUPREMACY_BOSS_INDEX, 57023）.
export class C57023 extends MessageBase{
}
export class S57023 extends MessageBase{
  public ChapterID:number;//章节
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],
      ["DunNo",MessageBase.UINT32],

    ]
}
export class C57024_1 extends MessageBase{
  public ChapterID:number;//章节
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],

    ]
}
export class S57024_1 extends MessageBase{
}
export class C57024_2_1 extends MessageBase{
}
export class S57024_2_1 extends MessageBase{
  public DunNo:number;//副本编号
  public state:number;//状态0->失败/未知错误1->成功/可进入2->等级不足3->人数/队伍限制4->前置难度没通关5->cd6->副本次数用光7->没有副本道具消耗
  public times:number;//已参与次数
  public pass:number;//通关状态1表示通关
  public RwdState:number;//宝箱开启状态:3表示已经领取
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],
      ["state",MessageBase.UINT8],
      ["times",MessageBase.UINT16],
      ["pass",MessageBase.UINT8],
      ["RwdState",MessageBase.UINT8],

    ]
}
export class C57024_2 extends MessageBase{
}
export class S57024_2 extends MessageBase{
  public ChapterID:number;//章节
  public FirstKillName:string;//首通人名字
  public FKState:number;//首通奖励领取状态:1已领取
   public item_1 : S57024_2_1[];
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],
      ["FirstKillName",MessageBase.STRING],
      ["FKState",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57024_2_1]],

    ]
}
// 至尊boss副本信息查询
//-define（PT_SUPREMACY_BOSS_INFO, 57024）.
export class C57024 extends MessageBase{
   public item_1 : C57024_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C57024_1]],

    ]
}
export class S57024 extends MessageBase{
   public item_2 : S57024_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S57024_2]],

    ]
}
// 至尊boss扫荡,扫荡后返回 57024
//-define（PT_SUPREMACY_BOSS_SWEEP, 57025）.
export class C57025 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57025 extends MessageBase{
}
// 开启至尊boss宝箱奖励
//-define（PT_GET_SUPREMACY_BOSS_REWARD, 57026）.
export class C57026 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57026 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
// 领取至尊boss首通奖励
//-define（PT_GET_SUPREMACY_BOSS_FIRST_KILL_REWARD, 57027）.
export class C57027 extends MessageBase{
  public ChapterID:number;//章节
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],

    ]
}
export class S57027 extends MessageBase{
  public ChapterID:number;//章节
  public static DES : Array<any> =
     [
      ["ChapterID",MessageBase.UINT32],

    ]
}
// 三界副本进度查询,当前可以挑战的未通关副本编号
//-define（PT_THREE_REALMS_INDEX, 57028）.
export class C57028 extends MessageBase{
}
export class S57028 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class C57029_1 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57029_1 extends MessageBase{
}
export class C57029_2 extends MessageBase{
}
export class S57029_2 extends MessageBase{
  public DunNo:number;//副本编号
  public state:number;//状态0->失败/未知错误1->成功/可进入2->等级不足3->人数/队伍限制4->前置难度没通关5->cd6->副本次数用光7->没有副本道具消耗
  public times:number;//已参与次数
  public pass:number;//通关状态1表示通关
  public RwdState:number;//宝箱开启状态:3表示已经领取
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],
      ["state",MessageBase.UINT8],
      ["times",MessageBase.UINT16],
      ["pass",MessageBase.UINT8],
      ["RwdState",MessageBase.UINT8],

    ]
}
// 三界副本信息查询
//-define（PT_THREE_REALMS_INFO, 57029）.
export class C57029 extends MessageBase{
   public item_1 : C57029_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C57029_1]],

    ]
}
export class S57029 extends MessageBase{
   public item_2 : S57029_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S57029_2]],

    ]
}
// 三界副本扫荡,扫荡后返回 57028
//-define（PT_THREE_REALMS_SWEEP, 57030）.
export class C57030 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57030 extends MessageBase{
}
// 开启三界副本宝箱奖励
//-define（PT_GET_THREE_REALMS_REWARD, 57031）.
export class C57031 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57031 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
// 勇闯天宫副本进度查询,当前可以挑战的未通关副本编号
//-define（PT_RUSH_WELKIN_INDEX, 57032）.
export class C57032 extends MessageBase{
}
export class S57032 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class C57033_1 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57033_1 extends MessageBase{
}
export class C57033_2 extends MessageBase{
}
export class S57033_2 extends MessageBase{
  public DunNo:number;//副本编号
  public state:number;//状态0->失败/未知错误1->成功/可进入2->等级不足3->人数/队伍限制4->前置难度没通关5->cd6->副本次数用光7->没有副本道具消耗
  public times:number;//已参与次数
  public pass:number;//通关状态1表示通关
  public RwdState:number;//宝箱开启状态:3表示已经领取
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],
      ["state",MessageBase.UINT8],
      ["times",MessageBase.UINT16],
      ["pass",MessageBase.UINT8],
      ["RwdState",MessageBase.UINT8],

    ]
}
// 勇闯天宫副本信息查询
//-define（PT_RUSH_WELKIN_INFO, 57033）.
export class C57033 extends MessageBase{
   public item_1 : C57033_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C57033_1]],

    ]
}
export class S57033 extends MessageBase{
   public item_2 : S57033_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S57033_2]],

    ]
}
// 勇闯天宫副本扫荡,扫荡后返回 57033
//-define（PT_RUSH_WELKIN_SWEEP, 57034）.
export class C57034 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57034 extends MessageBase{
}
// 开启勇闯天宫副本宝箱奖励
//-define（PT_GET_RUSH_WELKIN_REWARD, 57035）.
export class C57035 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57035 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
// =========================
// 副本内世界BOSS血条
//-define（PT_COPY_WORLD_BOSS_HP, 57101）.
// 57101
export class C57101 extends MessageBase{
}
export class S57101 extends MessageBase{
  public DunNo:number;//副本编号
  public maxHp:number;//Boss最大血量
  public curHp:number;//Boss当前血量
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],
      ["maxHp",MessageBase.UINT32],
      ["curHp",MessageBase.UINT32],

    ]
}
export class C57102_1 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57102_1 extends MessageBase{
}
export class C57102_2 extends MessageBase{
}
export class S57102_2 extends MessageBase{
  public dun_no:number;//副本编号
  public state:number;//BOSS状态0已击杀；1可挑战
  public join_num:number;//参与人数
  public max_hp:number;//Boss最大血量
  public cur_hp:number;//Boss当前血量
  public reborn_time:number;//BOSS重生时间戳，可挑战状态时，该时间戳小于当前时间戳
  public draw_state:number;//能否翻牌0能翻，1不能
  public draw_times:number;//翻牌次数
  public static DES : Array<any> =
     [
      ["dun_no",MessageBase.UINT32],
      ["state",MessageBase.UINT8],
      ["join_num",MessageBase.UINT32],
      ["max_hp",MessageBase.UINT32],
      ["cur_hp",MessageBase.UINT32],
      ["reborn_time",MessageBase.UINT32],
      ["draw_state",MessageBase.UINT8],
      ["draw_times",MessageBase.UINT8],

    ]
}
// =========================
// 世界BOSS信息
//-define（PT_COPY_WORLD_BOSS_INFO, 57102）.
// 57102
export class C57102 extends MessageBase{
   public item_1 : C57102_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,C57102_1]],

    ]
}
export class S57102 extends MessageBase{
   public item_2 : S57102_2[];
  public static DES : Array<any> =
     [
        ["item_2",MessageBase.ARRAY,[MessageBase.CLASS,S57102_2]],

    ]
}
export class C57103_1 extends MessageBase{
}
export class S57103_1 extends MessageBase{
  public roleId:number;//
  public roleName:string;//
  public damage:number;//伤害值
  public static DES : Array<any> =
     [
      ["roleId",MessageBase.UINT64],
      ["roleName",MessageBase.STRING],
      ["damage",MessageBase.UINT32],

    ]
}
// =========================
// 世界BOSS 排名信息
//-define（PT_COPY_RANK, 57103）.
// 57103
export class C57103 extends MessageBase{
  public DunNo:number;//
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57103 extends MessageBase{
  public DunNo:number;//
  public TotalDamage:number;//总伤害量
   public item_1 : S57103_1[];
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],
      ["TotalDamage",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57103_1]],

    ]
}
export class C57104_1 extends MessageBase{
}
export class S57104_1 extends MessageBase{
  public roleId:number;//
  public roleName:string;//名字
  public Bp:number;//战力
  public TimeStamp:number;//击杀时间戳
  public static DES : Array<any> =
     [
      ["roleId",MessageBase.UINT64],
      ["roleName",MessageBase.STRING],
      ["Bp",MessageBase.UINT32],
      ["TimeStamp",MessageBase.UINT32],

    ]
}
// 世界BOSS击杀信息
//-define（PT_COPY_WORLD_BOSS_KILL_INFO, 57104）.
// 57104
export class C57104 extends MessageBase{
  public DunNo:number;//副本编号
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],

    ]
}
export class S57104 extends MessageBase{
  public DunNo:number;//副本编号
   public item_1 : S57104_1[];
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57104_1]],

    ]
}
export class C57105_1 extends MessageBase{
}
export class S57105_1 extends MessageBase{
  public GoodsNo:number;//
  public GoodsNum:number;//
  public Quality:number;//
  public static DES : Array<any> =
     [
      ["GoodsNo",MessageBase.UINT32],
      ["GoodsNum",MessageBase.UINT32],
      ["Quality",MessageBase.UINT8],

    ]
}
// 帮派boss翻牌
//-define（PT_COPY_GUILD_BOSS_DRAW_CARD, 57105）.
// 57105
export class C57105 extends MessageBase{
  public DunNo:number;//副本编号
  public DrawTimes:number;//第几次翻牌
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],
      ["DrawTimes",MessageBase.UINT8],

    ]
}
export class S57105 extends MessageBase{
  public DunNo:number;//副本编号
  public DrawTimes:number;//第几次翻牌
   public item_1 : S57105_1[];
  public static DES : Array<any> =
     [
      ["DunNo",MessageBase.UINT32],
      ["DrawTimes",MessageBase.UINT8],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57105_1]],

    ]
}
export class C57200_1 extends MessageBase{
}
export class S57200_1 extends MessageBase{
  public GridNo:number;//
  public EventNo:number;//
  public static DES : Array<any> =
     [
      ["GridNo",MessageBase.UINT8],
      ["EventNo",MessageBase.UINT32],

    ]
}
// *********************格子副本******************************************
// 格子副本 格子信息
//-define（PT_DUN_GRID_INFO, 57200）.
export class C57200 extends MessageBase{
    //-define（PT_DUN_GRID_INFO,57200）.
}
export class S57200 extends MessageBase{
   public item_1 : S57200_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57200_1]],

    ]
}
// 摇骰子
//-define（PT_DUN_ROLL, 57201）.
export class C57201 extends MessageBase{
}
export class S57201 extends MessageBase{
  public Point:number;//
  public static DES : Array<any> =
     [
      ["Point",MessageBase.UINT8],

    ]
}
export class C57202_1 extends MessageBase{
}
export class S57202_1 extends MessageBase{
  public OptionNo:number;//选项编号
  public OptionContent:string;//选择内容
  public static DES : Array<any> =
     [
      ["OptionNo",MessageBase.UINT8],
      ["OptionContent",MessageBase.STRING],

    ]
}
// 副本答题 问题
//-define（PT_DUN_ANSWER_QUESTION, 57202）.
export class C57202 extends MessageBase{
    //-define（PT_DUN_ANSWER_QUESTION,57202）.
}
export class S57202 extends MessageBase{
  public No:number;//题目编号
  public Content:string;//题目内容
   public item_1 : S57202_1[];
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["Content",MessageBase.STRING],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57202_1]],

    ]
}
// 副本答题 回答
//-define（PT_DUN_ANSWER_REPLY, 57203）.
export class C57203 extends MessageBase{
  public No:number;//题目编号
  public OptionNo:number;//选项编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
      ["OptionNo",MessageBase.UINT8],

    ]
}
export class S57203 extends MessageBase{
}
export class C57204_1 extends MessageBase{
}
export class S57204_1 extends MessageBase{
  public PlayerID:number;//
  public OptionNo:number;//选项编号
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],
      ["OptionNo",MessageBase.UINT8],

    ]
}
// 同步队员回答选项
//-define（PT_DUN_SYNC_ANSWER, 57204）.
export class C57204 extends MessageBase{
    //-define（PT_DUN_SYNC_ANSWER,57204）.
}
export class S57204 extends MessageBase{
  public No:number;//题目编号
   public item_1 : S57204_1[];
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57204_1]],

    ]
}
// 帮助回答（暂无用）
//-define（PT_DUN_HELP_ANSWER_REPLY, 57205）.
export class C57205 extends MessageBase{
  public PlayerID:number;//帮助对象
  public static DES : Array<any> =
     [
      ["PlayerID",MessageBase.UINT64],

    ]
}
export class S57205 extends MessageBase{
}
// 求助回答（暂无用）
//-define（PT_DUN_ASK_ANSWER_HELP, 57206）.
export class C57206 extends MessageBase{
  public No:number;//题目编号
  public static DES : Array<any> =
     [
      ["No",MessageBase.UINT32],

    ]
}
export class S57206 extends MessageBase{
}
// 收到求助（暂无用）
//-define（PT_DUN_GET_ASK_HELP, 57207）.
export class C57207 extends MessageBase{
    //-define（PT_DUN_GET_ASK_HELP,57207）.
}
export class S57207 extends MessageBase{
  public FromPlayerID:number;//来自哪个玩家
  public static DES : Array<any> =
     [
      ["FromPlayerID",MessageBase.UINT64],

    ]
}
// 同步当前所在的格子
//-define（PT_DUN_SYNC_PASS_GRID, 57208）.
export class C57208 extends MessageBase{
    //-define（PT_DUN_SYNC_PASS_GRID,57208）.
}
export class S57208 extends MessageBase{
  public GridNo:number;//已通过格子数
  public static DES : Array<any> =
     [
      ["GridNo",MessageBase.UINT8],

    ]
}
// 同步摇骰子状态
//-define（PT_DUN_SYNC_ROLL_STATE, 57209）.
export class C57209 extends MessageBase{
    //-define（PT_DUN_SYNC_ROLL_STATE,57209）.
}
export class S57209 extends MessageBase{
  public State:number;//1表示需要摇
  public static DES : Array<any> =
     [
      ["State",MessageBase.UINT8],

    ]
}
// 通知服务端事件可以开始
//-define（PT_DUN_NOTIFY_CAN_START_EVENT, 57210）.
export class C57210 extends MessageBase{
}
export class S57210 extends MessageBase{
}
//无
// 通知谁帮我回答（暂无用）
//-define（PT_DUN_NOTIFY_WHO_HELP_ME, 57211）.
export class C57211 extends MessageBase{
    //-define（PT_DUN_NOTIFY_WHO_HELP_ME,57211）.
}
export class S57211 extends MessageBase{
  public FromPlayerID:number;//哪个玩家ID
  public static DES : Array<any> =
     [
      ["FromPlayerID",MessageBase.UINT64],

    ]
}
export class C57212_1 extends MessageBase{
}
export class S57212_1 extends MessageBase{
  public GridNo:number;//
  public Score:number;//
  public static DES : Array<any> =
     [
      ["GridNo",MessageBase.UINT8],
      ["Score",MessageBase.UINT32],

    ]
}
// 增量或者全部同步事件分数,断线重连全部同步
//-define（PT_DUN_GRID_EVENT_SCORE, 57212）.
export class C57212 extends MessageBase{
    //-define（PT_DUN_GRID_EVENT_SCORE,57212）.
}
export class S57212 extends MessageBase{
   public item_1 : S57212_1[];
  public static DES : Array<any> =
     [
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57212_1]],

    ]
}
export class C57213_1 extends MessageBase{
}
export class S57213_1 extends MessageBase{
  public GoodsNo:number;//包括虚拟物品积分
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
// 格子副本结算信息
//-define（PT_DUN_GRID_END, 57213）.
export class C57213 extends MessageBase{
    //-define（PT_DUN_GRID_END,57213）.
}
export class S57213 extends MessageBase{
  public Score:number;//分数
   public item_1 : S57213_1[];
  public static DES : Array<any> =
     [
      ["Score",MessageBase.UINT32],
        ["item_1",MessageBase.ARRAY,[MessageBase.CLASS,S57213_1]],

    ]
}
// =========================
// 副本调试信息显示
//-define（PT_COPY_DEBUG, 57900）.
// 协议号：57900
export class C57900 extends MessageBase{
}
export class S57900 extends MessageBase{
  public msg:string;//调试信息
  public static DES : Array<any> =
     [
      ["msg",MessageBase.STRING],

    ]
}
