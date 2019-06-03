/**
 * UI层级 数字越大层级越高
 */
enum UILEVEL {
    //TODO:层级不够可以继续增加
    POP_1 = 1,  // hudMainUI， 公共底板
    POP_1_1 = 2,//聊天框
    POP_1_5 = 3,//主城ui
    POP_2 = 4, // 各个系统模块层
    POP_3 = 5, // 提示层
    POP_4 = 6, // 弹框层
    POP_5 = 7, // 飘动层
}

enum UIID {
    TEST = 0,
    LOADING = 996,//loading
    GUIDE_MASK = 997,//新手引导唯一id
    START_GAME = 998,//sdk登录后的接口；
    SERVER_LIST = 999,//服务器列表
    TEST_LOGIN = 1000,//用于测试登录界面（非sdk）
    CREATE_ROLE = 1001,//创角
    SELECT_ROLE = 1002,//选角
    HUD_MAIN = 1003,//主ui
    CHAT = 1004,//聊天
    FIGHT_MAIN = 1005,//战斗主界面
    SMELL = 1006,//分解
    SELECTSMELL = 1007,//选择分解
    BUYCONTENT = 1008,//购买容量
    CHAO_HUD = 1009,//大乱斗场景hud
    CHAO_PLAYER_LIST = 1010,//大乱斗玩家列表
    WORLD_BOSS_HUD = 1011,//世界bosshud
    SYS_SKILL = 1,//技能
    SYS_ONFLINE_GUAJI = 3,//在线挂机
    SYS_FIND_PAR = 11,//酒会招募
    SYS_BAG = 15,//背包
    SYS_MAIL = 17,//邮件
    SYS_SHOP = 19,//商城
    SYS_ARENA_1V1 = 27,//竞技场
    SYS_EQUIP_DUNGEON = 28,//装备副本
    SYS_STRENTHEN_EQUIP = 35,//装备强化
    SYS_ARENA_3V3 = 51,//华山论剑
    ROLE = 68,//角色
    SYS_MAIN = 71,//主城
    SYS_OFFLINE_GUAJI = 2000,//离线挂机

    PET = 73,//宠物
    PET_UPGRADE = 74,//宠物升级
    SYS_COPY_STUFF = 25,//材料副本 (因为第一个页签为宠物秘境，所以宠物秘境也用这个)
    SYS_COPY_BOSS = 80,//个人boss副本
    SYS_WORLD_BOSS = 81,//世界boss副本
    SYS_MOUNT = 52,//坐骑
    SYS_MATERIAL_DUNGEON = 82,//材料副本(第二个页签);
    SYS_EQ_QILING = 72,//装备启灵
    PET_SKILL = 33,//宠物技能
    PET_XIULIAN = 31,//宠物修炼
    SYS_EQ_BAOSHI = 36,//装备宝石
    SYS_RELATION = 16,//好友
    SYS_MOUNT_STAR = 78,//坐骑升星
    SYS_ROLE_JINGMAI = 61,//人物经脉
    SYS_COMATE = 83,//伙伴
    SYS_COMATE_LVUP = 84,//伙伴升级
    SYS_TOWER = 24,//通天塔
    SYS_ACTIVITY = 5,//活动
    SYS_DAY_TASK = 14,//日常任务界面
    SYS_TEAM = 7,//组队主面板
    SYS_COMATE_STAR = 85,//伙伴升星
    SYS_PET_DIANHUA = 76,//宠物点化
    SYS_RANK = 12,//排行榜
    PET_LIANHUA = 75,//宠物炼化
    SYS_MOUNT_FEISHENG = 79,//坐骑飞升
    SYS_ROLE_XINGFA = 69,//人物心法
    SYS_PET_SHOULING = 77,//宠物兽灵
    SYS_COMATE_TALENT = 86,//伙伴天赋
    SYS_OFFLINE_ARENA = 26,//竞技场面板
    SYS_DIG_TASK = 89,//挖宝任务
    SYS_GUILD = 9,//帮会

    //方便策划配置，将一些功能性的行为，也写在了这边
    FUNC_GOTO_SCENE = 4000,//进入某个场景
    FUNC_GOTO_LUANDOU,//进入欢乐大乱斗
    FUNC_GOTO_YZMG,//进入月之迷宫
    FUNC_GOTO_GUILD,//进入帮派
    FUNC_SHOW_WORD,//显示提示
    FUNC_GOTO_WJSL,//无尽试炼
    FUNC_GOTO_WJSL2,//无尽试炼2

    FORGING = 2001,//锻造
    SYS_HIRE,//雇佣
    SYS_MARKET,//拍卖
    SYS_TASK,//主线任务
    SYS_SETTING,//设置
    SYS_SIGN_IN,//签到
    SYS_REWARD,//等级礼包
    SYS_ALLOT_FREE_TALENT,//角色洗点
    SYS_PK,//切磋
    SYS_PAR_DUNGEON,//宝宝副本
    SYS_FREE_PARTNER,//宝宝放生
    SYS_EVOLVE_PARTNER,//宝宝进化
    SYS_CULTIVATE_PARTNER,//宝宝修炼
    SYS_WASH_PARTNER,//宝宝洗髓
    SYS_PAR_CHANGE_SKILL,//宝宝技能学习
    SYS_INLAY_GEMSTONE,//宝石镶嵌
    SYS_COMPOSE_GOODS,//道具合成
    SYS_ANSWER,//答题
    SYS_CRUISE,//休闲活动
    SYS_FORCE_PK,//强行pk
    SYS_SWORN,//结拜
    SYS_TRANSPORT,//镖行天下
    SYS_DIG_TREASURE,//挖宝
    SYS_EQ_UPGRADE_QUALITY,//装备品质提升
    SYS_EQ_UPGRADE_LV,//装备升级
    SYS_EQ_XILIAN,//装备洗练
    SYS_EQ_STREN_TRS,//强化转移
    SYS_FORGE,//打造
    SYS_EVERYDAY_DO,//每日必做
    SYS_SEVENDAY,//七日盛典
    SYS_WORLD_CHAT,//世界聊天
    SYS_SEVENDAY_REWARD,//奖励
    SYS_ONLINE_REWARD,//在线奖励
    SYS_GUILD_SKILL,//帮派技能
    SYS_GUILD_CULTIVATE,//帮派点修
    SYS_JINGMAI,//经脉
    SYS_TISHENG,//提升
    SYS_OFFLINE_DATA,//离线数据
    SYS_NVN,//排位赛
    SYS_PEAK,//巅峰点数系统
    SYS_SPORT,//竞技属性
    SYS_PAR_EQ,//宠物装备
    SKILL_PANEL,//技能操作面板，战斗中....
    SYS_PET_ADDPOINT,//宠物加点
    SYS_PET_FIGHTSETTING,//宠物出战配置
    SYS_GETWAY,//获取途径
    SYS_ROLE_ADDPOINT,//角色加点
    SYS_CHAPTER_MAP,//章节地图
    SYS_CHAPTER_SELECT_MAP,//章节选择地图
    SYS_CHALLENGE_BOSS,//挑战boss
    SYS_CHALLENGE_RESULT,//挑战结果
    SYS_TEAM_REQUEST,//邀请队员
    SYS_TEAM_BEREQUEST,//被邀请
    SYS_COPY_PETRANK,//星级排名
    SYS_COPY_STARREWARD,//星级奖励
    SYS_PET_RELIVE,//宠物重生
    SYS_READMAIL,//读邮件
    SYS_LOOKPROP,//查看属性
    SYS_WORLD_BOSS_DAMAGE_RANK,//世界boss伤害排行
    SYS_WORLD_BOSS_NOTICE,//世界boss通知
    SYS_WORLD_BOSS_KILL,//世界boss击杀记录
    SYS_COMATE_INFO,//伙伴总览
    COMATE_CHANGE_TALENT,//兑换天赋点
    COMATE_TALENT_INFO,//天赋点详情
    SYS_BUYGODDS,//购买物品
    SYS_ROLE_SOAR,//角色飞升
    SYS_LOGIN_REWARD,//登录领奖
    SYS_FUNC_OPEN,//系统开启界面
    SYS_TTT_RANK,//通天塔排行榜
    COM_SHOW_REWARD,//通用的奖励展示面板
    COM_SHOW_IMAGE,//通用的展示图片面板
    COM_POP_REWARD,//通用的弹窗奖励展示
    SYS_JJC_RECORD,//竞技场挑战记录面板
    SYS_JJC_RESULT,//竞技场结果面板
    BATTLE_POWER_PANEL,//战力变化
    SYS_ANSWERQUESTION_PANEL,//世界答题活动
    SYS_ACTIVITY_AQ_PANEL,//活动答题
    SYS_BESTRONGER_PANEL,//我要变强
    SYS_PETCHOUJIANG_PANEL,//宠物抽奖
    SYS_PETTUJIANENTER_PANEL,//宠物图鉴入口
    SYS_PETTUJIAN_PANEL,//宠物图鉴
    SELECT_SCENE_OBJ,//点击场景obj
    SYS_GOODS_SELL,//出售物品
    SYS_LOCAL_PLAYER_PANEL,//本地玩家
    SYS_CHANGE_CODE_PANEL,//兑换码界面
    SYS_GRID_HUD_PANEL,//格子副本hud
    SYS_COPY_SELECT_PANEL,//副本难度选择
    WABAO_ACTION_PANEL,//挖宝行为面板
    GUILD_LIST_PANEL,//帮派列表面板
    GUILD_CREAT_PANEL,//帮派创建面板
    GUILD_MAIN_PANEL,//帮派主面板
    GUILD_MENBER_HANDLE_PANEL,//帮派成员处理面板
    GUILD_HUD,//帮派场景的一级界面
    SYS_ACHIEVEN_PANEL,//成就面板
    SYS_TITLE_PANEL,//称号
    SYS_FAHSHION_PANEL,//时装
    FIRST_RECHARGE_PANEL,//首冲面板
    RECHARGE_PANEL,//充值面板
    FULI_MAIN_PANEL,//福利中心
    OPEN_SERVICE_ACTIVITY_PANEL,//开服活动
    GOD_PET_COMING_DETAIL_PANEL,//神宠来临细节面板
    GONGGAO_PANEL,//公告面板
    COMATE_YUANFEN_PANEL,//伙伴缘分面板
    COMATE_TUPO_PANEL,//伙伴突破面板
    WUDAOHUI_PANEL,//武道会面板
    MOUNT_TUJIANENTER_PANEL,//坐骑图鉴入口
    MOUNT_TUJIAN_PANEL,//坐骑图鉴
    PET_SKILL_TUJIAN_PANEL,//宠物技能图鉴
    DART_PANEL,//押镖
    DART_INFO_PANEl,//押镖详情
    DART_LOG_PANEL,//押镖记录
    CATCH_PET_PANEL,//抓宠界面
    CHANGE_EQUIP_PANEL,//更换装备面板
    CHANGE_FABAO_PANEL,//更换法宝面板
    GOODS_HECHENG_PANEL,//合成物品
    GUILD_BOSS_PANEL,//帮派BOSS面板
    GUILD_BOSS_SELECTCARD_PANEL,//帮派BOSS抽卡面板
    MOUNT_LINGJING_PANEL,//坐骑灵境面板
    MOUNT_BIANYI_PANEL,//坐骑变异面板
    COMATE_YUANSHEN_PANEL,//伙伴元神面板
    COMATE_RELIVE,//伙伴重生
    YUEKA_PANEL,//月卡
    TOUZIJIHUA_PANEL,//投资计划
    RECHARGE_REWARD_PANEL,//充值礼包
    YY_GIVEBACK_PANEL,//运营返利活动
    YY_RANK_PANEL,//运营冲榜活动
    YY_LIBAO_PANEL,//运营礼包活动
    SUPER_BOSS_CHAP_PANEL,//至尊BOSS章节面板
    CHAT_EMOTION_PANEL,//聊天表情面板
    SANJIE_RANK_PANEL,//三界副本排行榜
    CHUANGTIANGONG_RANK_PANEL,//勇闯天宫排行榜
    WUJINSHILIAN_ENTER_PANEL,//无尽试炼入口
    COMATE_MINGGE_PANEL,//伙伴命格
    COMATE_LIEMING_PANEL,//猎命
    MINGGE_CHANGE_PANEL,//命格替换
    MINGGE_EAT_PANEL,//命格吞噬
    OTHER_PETINFO_PANEL,//其他人宠物面板
    OTHER_COMATE_PANEL,//其他人伙伴面板
    FABAO_PANEL,//法宝面板
    TEJI_QIANGHUA_PANEL,//特技强化面板
    TEJI_QIANGHUA_SELECT_PANEL,//特技强化选择面板
    YY_LOGIN_DAY_REWARD_PANEL,//节日签到
}