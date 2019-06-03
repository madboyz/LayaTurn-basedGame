//角色类型
enum BOTYPE {
    PALYER = 1,
    PET = 2,
    NPC = 3,
    MONSTER = 4,
    BOSS = 5,
    EMPLOYMENT_PLAYER = 7,
    WORLD_BOSS = 8,
    COMATE = 11,//伙伴
}

enum DEAD_TYPE {
    NODEAD = 0,//没有死亡
    INVERTED = 1,//倒地
    GHOST = 2,//鬼魂
    DISAPPEAR = 3,//消失
}

enum HIT_ACTION {
    HIT = 1,//受击动作
    NONE = 2,//什么都不做
}

enum ATTSUBTYPE {
    ATTACK = 1,//普通攻击
    BACK_ATTACK = 2,//反击
    CONTINUE_ATTACK = 3,//连击
    PURSUE_ATTACK = 4,//追击
    SPUTTER_ATTACK = 5,//分裂
}
enum ATTACK_RESULT {
    HIT = 1, //命中
    DUCK = 2,//闪避
    CRIT = 3,//暴击
}

enum SKILL_SCENE_EFFECT_TYPE {
    CENTER = 1,//场景中央
    ATTACK_CENTER = 2,//主队中央
    BE_ATTACK_CENTER = 3,//客队中央
}

enum PKType{
    Requset = 1,//切磋
    Force = 2,//强行
}


//特殊图标要展现的
enum SYMBOL_TYPE {
    CRIT = 1,//暴击
    MAGIC_CONTINUE = 2,//法连
    BACK = 3,//反击
    BACK_ANTI = 4,//反震
    SPLIT = 5,//分裂
    RELIVE = 6,//复活
    ATTACK_CONTINUE = 7,//连击
    LMMUNITY = 8,//免疫
    PURSUE = 9,//追杀
}
//新战斗cmdtype类型
enum NEW_BATTLE_CMD_TYPE {
    SKILL = 1,//使用技能
    //SUMMON_PET = 7,//召唤宠物
    NORMAL_ATTACK =  8,//普通攻击
}