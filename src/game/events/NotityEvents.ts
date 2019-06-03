enum NotityEvents {
    TESTNOTITY = 1,//测试
    TESTLOGINNOTITY,//登录
    FIGHT_USESKILL,//战斗中使用技能
    FIGHT_USEGOODS,//战斗中使用物品
    FIGHT_PROTECT,//战斗中保护
    FIGHT_CALL,//战斗中召唤
    SURESELECTEQUIPSMELL,//确定选择装备熔炼
    PET_SETTING_FIGHT,//设置宠物出战
    GAME_SCENE_CHANGE,//游戏场景改变
    MOUNT_TRANS,//坐骑幻化
    CHAT_STATE,//聊天框变化
    CHAT_SENDMSG,//发送聊天信息

    //战斗相关
    SKILL_ATTAK,//技能攻击
    RUN,//角色逃跑
    PROTECT,//保护
    DEF,//防御
    Guide_Update,//新手引导更新事件
}