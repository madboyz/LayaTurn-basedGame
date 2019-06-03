enum LoginError {
    LOGIN_FAIL_AUTH_FAILED = 1,//.验证失败
    LOGIN_FAIL_SERVER_CLOSED = 2,//.服务器未开启
    LOGIN_FAIL_IP_BANNED = 3//.IP被封禁了
}

enum CreateRoleError {
    CR_FAIL_UNKNOWN = 1,//.失败（未知错误）
    CR_FAIL_ROLE_LIST_FULL = 2,//.角色列表满了，不能再创建
    CR_FAIL_NAME_EMPTY = 3,//.角色名不能为空
    CR_FAIL_NAME_TOO_SHORT = 4,//.角色名太短
    CR_FAIL_NAME_TOO_LONG = 5,//.角色名太长
    CR_FAIL_CHAR_ILLEGAL = 6,//.角色名包含非法字符
    CR_FAIL_NAME_CONFLICT = 7,//.角色名已经被使用了，请重新输入名字
    CR_FAIL_FACTION_ERROR = 8//）.门派非法
}


enum RoleType{
    OBJ_INVALID         = 0,//无效类型（用于程序做判定）
    OBJ_PLAYER          = 1,//玩家
    OBJ_PARTNER         = 2,//宠物
    OBJ_NPC             = 3,//NPC
    OBJ_MONSTER         = 4,//怪物
    OBJ_BOSS            = 5,//普通boss
    OBJ_OTHER_PLAYER    = 7,//雇佣玩家
    OBJ_WORLD_BOSS      = 8,//世界boss
}

enum BattleMainType
{
    PVE = 1,
    PVP = 2,
}

enum PvpBattleSubType
{
    Normal = 0,//普通
    OffLineArena = 2,//离线竞技场
    Wudaohui = 3,//武道会
    Dart = 8,//押镖
    Chaos = 10,//龙珠pvp
}

enum PveBattleSubType
{
    HangUp = 1,//挂机
    OffLineArena = 2,//离线竞技场机器人
    Wudaohui = 3,//武道会
    WoldBoss = 7,//世界boss
    Chaos = 11,//龙珠pve
    ThreeDungeon = 12,//无尽副本
    Dungeon = 15,//副本
    BOSS = 16,//主线boss
    Grid = 17,//月之迷宫
    GuildBoss = 18,//帮派BOSS
    ZuoQiShiLian = 19,//坐骑试炼
}

enum AoiAttrCode{
    OI_CODE_WEAPON = 152,//% 玩家武器编号
    OI_CODE_NICKNAME = 154,//% 角色名
    OI_CODE_CLOTHES = 156,//% 玩家服饰编号
    OI_CODE_BHV_STATE = 157,//% 玩家行为状态 AoiBhvCode
    OI_CODE_LEADER_FLAG = 159,//% 玩家的队长标记 1 是队长 0是非队长
    OI_CODE_TEXT_TITLE = 161,//% 文字称号
    OI_CODE_GRAPH_TITLE = 162,//% 图片称号
    OI_CODE_UEER_DEF_TITLE = 163,//% 自定义称号(字符串)
    OI_CODE_AEROCRAFT = 329,//% 飞行器
    OI_CODE_TEAM_ID = 160,//队伍id
    OI_CODE_LV = 164,//等级
    OI_CODE_TEAM_STATE = 328,//火车位置
}

//OI_CODE_BHV_STATE 状态 0空闲状态 2战斗状态 其他
enum AoiBhvCode{
    BHV_IDLE = 0,
    BHV_BATTLING = 2,
}

enum EnterGameError{
    ENTER_GAME_FAIL_UNKNOWN = 1,//.失败（未知错误）
    ENTER_GAME_FAIL_ROLE_BANNED,//..角色被封禁了
    ENTER_GAME_FAIL_SERVER_FULL,//..服务器人满了
    ENTER_GAME_FAIL_SERVER_BUSY,//.）.服务器繁忙，请稍后再试
}

enum ChatType{
    ALL,//全部
    HORN,//喇叭
    SYSTEM,//系统
    WORLD,//世界
    SENCE,//场景
    GUILD,//工会
    TEAM,//队伍
    RACE,//种族
    CROSS,//跨服
    PRIVATE,//私聊
}

enum ChatChannel{
    TEAM,
    WORLD,
    GUILD,
    SYSTEM
}

enum ChatErrorType{
    TYPE_1 = 110011,
    TYPE_2 = 110021,
    TYPE_3 = 110051,
    TYPE_4 = 110061,
    TYPE_5 = 110071,
}

//金钱相关定义
enum MoneyType{
    INVALID =  0,// --无效的钱类型（用于程序做判定）
    GAMEMONEY = 1,//--银币
    BIND_GAMEMONEY = 2,// --绑定银币
    YUANBAO = 3,// --元宝
    BIND_YUANBAO = 4,// --绑定的元宝
    EXP = 5,// --经验
    GUILD_CONTRI = 12,// --帮派贡献度
    LITERARY = 13,// --学分
    ACCOMPLISH_LEVEL = 15,// = 15 --成就等级
    COPPER = 16,// --金币
    VITALITY = 17,// --体力值
    CHIVALROUS = 18,// --功德值
    FORGE = 26,// --巧匠值
    PAY_POINT = 27,// --充值积分
    ACCOMPLISH_POINT = 29,// 16 --成就点
    CREDIT = 30,// --信用
    LOVE = 31,//爱心值
    GOODS = 99,//物品
}

enum goodsType{
    GOODS_T_EQUIP,//    		1).     % 装备类
    GOODS_T_ROLE_CONSUME,//   2).     % 角色消耗品
    GOODS_T_EQ_CONSUME, //    3).     % 装备消耗品
    GOODS_T_PARTNER_PROP,//   4).     % 宠物道具
    GOODS_T_LIFE_MATERIAL,//  5).     % 生活材料
    GOODS_T_TOLLGATE,   //    6).     % 任务和道具关卡
    GOODS_T_FUN_PROP, //      7).     % 功能道具
    GOODS_T_ACTIVITY_PROP,//  8).     % 活动道具
    GOODS_T_VIRTUAL,  //      9).     % 虚拟物品 包括金钱等
    GOODS_T_PAR_EQUIP,//      10).    % 女妖装备类
}

enum GoodsType
{
    EQUIP = 1,          
    ROLE_GOODS = 2 ,
    EQUIP_GOODS = 3,
    PET_GOODS = 4,
    RIDE_GOODS = 5,
    TASK_GOODS = 6,
    METHOD_GOODS = 7,
    ACTIVE_GOODS = 8,
    VOID_GOODS = 9,
    PET_EQUIP = 10,
    COMATE_EQUIP = 11,
    AUTO_GOODS = 12,
    MOUNT_EQUIP = 13,
    //1. 装备
    //2. 角色消耗品
    //3. 装备消耗品
    //4.宠物道具
    //5.坐骑道具
    //6.任务和道具关卡
    //7.功能道具
    //8.活动道具
    //9.虚拟道具
    //10.宠物装备
    //11.伙伴装备
    //12.自动使用道具
    //13.坐骑装备
}

enum CopyType
{
    PERSON = 1,//个人boss
    WORLD = 2,//世界boss
    TEAM = 3,//组队boss
    MATERIAL = 4,//材料副本
    PET = 5,//宠物秘境
    TOWER = 6,//通天塔
    Grid = 7,//月之迷宫
    OPEN_ACTIVITY = 8,//开服活动副本
    THREE_DUN = 9,//无尽试炼
    GUILD_BOSS = 10,//帮派boss
    SUPER_BOSS = 11,//至尊boss
    SANJIE_COPY = 12,//三界副本
    CHUANGTIANGONG = 13,//勇闯天宫
}

enum VGoodType{
    VGOODS_GAMEMONEY = 89000,//).       % 银子
    VGOODS_BIND_GAMEMONEY = 89001,//).  % 绑银对应的虚拟物品的编号 , VGOODS:  virtual goods
    VGOODS_YB = 89002,//).              % 金子
    VGOODS_BIND_YB = 89003,//).         % 绑金
    VGOODS_EXP = 89004,//).
    VGOODS_STR = 89005,//).             	% 力量：str
    VGOODS_CON = 89006,//).             	% 体质：con
    VGOODS_STA = 89007,//).             	% 耐力：sta
    VGOODS_SPI = 89008,//).             	% 灵力：spi
    VGOODS_AGI = 89009,//).             	% 敏捷：agi
    VGOODS_FEAT = 89010,//).            	% 功勋
    VGOODS_CONTRI = 89011,//).          	% 帮派贡献度
    VGOODS_LITERARY = 89016,//).			% 学分
    VGOODS_PAR_EXP = 89017,//).         	% 宠物经验
    VGOODS_SYS_ACTIVITY_TIMES = 89018,//).	% 系统活跃度
    VGOODS_FREE_TALENT_POINTS = 89019,//).  % 自由天赋点（潜能点）
    VGOODS_COPPER = 89020,//).  % 铜币
    VGOODS_VITALITY = 89021,//).  % 体力值
    VGOODS_CHIVALROUS = 89027,//).  % 功德值
    VGOODS_CHIP = 89028,//).  % 欢乐豆
    VGOODS_GAMEMONEY_10000 = 89030,//).  % 银币1W
    VGOODS_COPPER_100 = 89031,//).  % 金币100
    VGOODS_NULL = 89060,//).  % 无道具
    VGOODS_LEANR_SKILL1 = 89055,//).  % 领悟一次技能或者打开格子！
    VGOODS_LEANR_SKILL2 = 89056,//).  % 领悟一次技能或者打开格子，几率开格子几率10倍！
    VGOODS_LEANR_SKILL3 = 89057,//).  % 领悟一次技能或者打开格子，领悟技能几率10倍！
    VGOODS_LEANR_SKILL4 = 89058,//).  % 领悟一次技能或者打开格子，领悟技能开格子几率10倍！
    VGOODS_GUILD_FEAT = 89059,//).  % 巧匠值
    VGOODS_PAY_POINT = 89061,//).  % 充值积分
    VGOODS_ACHIEVE_POINT = 89062,//).  % 成就点
    VGOODS_STORAGE_EXP = 89176,//).    % 存储经验
    VGOODS_CREDIT = 89177,//).         % 信用度
    GOODS_RESET_VERSION = 2,//).  % 金币100
}

/**
 *  角色消耗品子类型
 */
enum RoleGoodsSubType
{
    ROLE_CONSUME_T_DRUG = 1,//药品
    ROLE_CONSUME_T_TRUCK = 2,//杂物
    ROLE_CONSUME_T_TREASURE = 3,//藏宝图
    ROLE_CONSUME_T_CARD = 4,//属性卡
}

/**
 *  装备消耗品子类型
 */
enum EquipGoodsSubType
{
    EQ_CONSUME_T_MINERAL = 1,//矿石
    EQ_CONSUME_T_GEM = 2,//宝石
    EQ_CONSUME_T_STRENGTHEN = 3,//强化石
    EQ_CONSUME_T_OTHER = 4,//其他材料
}

enum PetGoodsSubType
{
    PARTNER_PROP_T_CONSUME = 3,//宠物消耗品
    PARTNER_PROP_T_SKILL_BOOK = 4,//宠物技能书
    PARTNER_PROP_T_OTHER_BOOK = 5,//其他书籍
    PARTNER_PROP_T_BOTTLE = 6,//宠物蛋
}

/**
 *  装备类
 * @enum {number}
 */
enum GOODS_T_EQUIP
{
    EQP_T_LONGSWORD = 1,    //长剑
    EQP_T_WHIP,             //鞭子
    EQP_T_BLADE,            //大刀
    EQP_T_HOOP,             //环
    EQP_T_FAN,              //扇
    EQP_T_WAND,             //法杖
    EQP_T_BRACER,           //防具：护腕
    EQP_T_BARDE,            //防具：策划配置的 衣服 穿在 位置 铠甲上
    EQP_T_SHOES,            //防具：鞋子 
    EQP_T_NECKLACE,         //饰品：项链
    EQP_T_WAISTBAND,        //防具：腰带
    EQP_T_HEADWEAR,         //时装：头部
    EQP_T_CLOTHES,          //时装：身体
    EQP_T_BACKWEAR,         //时装：背部
    EQP_T_MAGIC_KEY,        //法宝
    EQP_T_RING = 21,             //戒指
    EQP_T_BRACERS,          //护腕
    EQP_T_CLOAK,            //披风
    EQP_T_MASK,             //面具
    EQP_T_HEADDRESS,        //头饰
    EQP_T_PENDANT,          //挂件
}

/**
 * 装备子类型（如果是装备就是这个枚举）暂时文案还没定下来
 */
enum EquipSubType
{
    EQ_POS1 = 1,
    EQ_POS2 = 2,
    EQ_POS3 = 3,
    EQ_POS4 = 4,
    EQ_POS5 = 5,
    EQ_POS6 = 6,
    EQ_POS7 = 7,
    EQ_POS8 = 8,
    EQ_POS9 = 9,

    EQ_MAGIC_KEY1 = 15,//法宝

    EQ_JEWELRT_RING = 21,//戒指
    EQ_JEWELRT_BRACERS = 22,//护腕
    EQ_JEWELRT_CLOAK = 23,//披风
    EQ_JEWELRT_MASK = 24,//面具
    EQ_JEWELRT_HEADDRESS = 25,//头饰
    EQ_JEWELRT_PENDANT = 26,//挂件
}

/**
 * 宠物装备子类型
 */
enum PetEquipSubType
{
    PEQP_T_NECKLACE = 1,//项圈
    PEQP_T_AMULET = 2,//护符
    PEQP_T_ARMOR = 3,//护甲
}

/**
 * 伙伴装备子类型
 */
enum ComateEquipSubType
{
    CEQP_T_NECKLACE = 1,//项圈
    CEQP_T_AMULET = 2,//护符
    CEQP_T_ARMOR = 3,//护甲
}

/**
 * 坐骑装备子类型
 */
enum MountEquipSubType
{
    MEQP_T_NECKLACE = 1,//项圈
    MEQP_T_AMULET = 2,//护符
    MEQP_T_ARMOR = 3,//护甲
}

enum BagType{
    LOC_TEMP         = 0 ,//--% 临时缓存
    LOC_BAG_EQ       = 1 ,//--% 装备背包
    LOC_BAG_USABLE   = 2 ,//--% 可使用背包
    LOC_BAG_UNUSABLE = 3 ,//--% 不可使用背包
    LOC_STORAGE      = 4 ,//-% 仓库（玩家自己的私人仓库）
    LOC_PLAYER_EQP   = 5 ,//--% 玩家的装备栏
    LOC_PARTNER_EQP  = 6 ,//--% 宝宝的装备栏
    LOC_MAIL         = 7 ,//--% 虚拟位置：邮件（用于标记邮件中的附件）
    LOC_TEMP_BAG     = 8 ,//--% 临时背包
    LOC_GUILD_STO    = 9 ,//--% 帮派仓库
    LOC_MARKET       = 10,// --% 虚拟位置：市场（用于标记市场中挂售的物品）
    LOC_ACCESSORY    = 11,// --% 配饰装备背包
    LOC_COMRADE_EQP  = 12,// --% 伙伴的装备栏
    LOC_MOUNT_EQP    = 13,// --% 坐骑的装备栏
}

enum GoodsAttrType{
    BASIC = 1,//基础属性
    ADD = 2,//附加属性值
    STR = 3,//强化属性
    BAOTU = 5,//宝图信息
    KA = 23,//启灵
    RE = 33,//精炼
}

enum StrengthType{
    STRENGTH = 1,//强化
    KAILING = 2,//启灵
    REFINE = 3,//精炼
    GEM = 4,//宝石
}

enum PetGradeType{
    TYPE_1 = 0,//普通
    TYPE_2 = 1,//高级
    TYPE_3 = 2,//珍品
    TYPE_4 = 3,//神兽
}
