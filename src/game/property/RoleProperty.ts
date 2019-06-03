import { PropertyVo } from "../../db/sheet/vo/PropertyVo";
import { PropertyUtil } from "./PropertyUtil";

export enum PropertyEnumCode{
    OI_CODE_HP =  1,
    OI_CODE_HP_LIM =  2,
    OI_CODE_MP =  3,
    OI_CODE_MP_LIM =  4,
    OI_CODE_PHY_ATT =  5,
    OI_CODE_MAG_ATT =  6,
    OI_CODE_PHY_DEF =  7,
    OI_CODE_MAG_DEF =  8,
    OI_CODE_HIT =  9,
    OI_CODE_DODGE =  10,
    OI_CODE_CRIT =  11,
    OI_CODE_TEN =  12,
    OI_CODE_TALENT_STR =  13,
    OI_CODE_TALENT_CON =  14,
    OI_CODE_TALENT_STA =  15,
    OI_CODE_TALENT_SPI =  16,
    OI_CODE_TALENT_AGI =  17,
    OI_CODE_ANGER =  18,
    OI_CODE_ANGER_LIM =  19,
    OI_CODE_ACT_SPEED =  20,
    OI_CODE_LUCK =  21,
    OI_CODE_FROZEN_RESIS =  22,
    OI_CODE_FROZEN_RESIS_LIM =  23,
    OI_CODE_TRANCE_RESIS =  24,
    OI_CODE_TRANCE_RESIS_LIM =  25,
    OI_CODE_RESIS_CHAOS =  26,
    OI_CODE_RESIS_CHAOS_LIM =  27,
    OI_CODE_FROZEN_HIT =  28,
    OI_CODE_FROZEN_HIT_LIM =  29,
    OI_CODE_TRANCE_HIT =  30,
    OI_CODE_TRANCE_HIT_LIM =  31,
    OI_CODE_CHAOS_HIT =  32,
    OI_CODE_CHAOS_HIT_LIM =  33,
    OI_CODE_SEAL_HIT =  34,
    OI_CODE_SEAL_RESIS =  35,
    OI_CODE_PHY_COMBO_ATT_PROBA =  36,
    OI_CODE_MAG_COMBO_ATT_PROBA = 37,
    OI_CODE_STRIKEBACK_PROBA =  38,
    OI_CODE_PURSUE_ATT_PROBA =  39,
    //OI_CODE_DAM_SCALING =  40,
    OI_CODE_LEFT_VALID_TIME =  40,
    OI_CODE_STREN_LV =  41,
    OI_CODE_STREN_EXP = 42, //          % 当前强化经验
    OI_CODE_DIG_SCENO_NO = 43, //       % 挖宝场景编号
    OI_CODE_DIG_SCENO_X = 44, //        % 挖宝场景X坐标
    OI_CODE_DIG_SCENO_Y = 45, //        % 挖宝场景Y坐标
    OI_CODE_UP_EXP = 46,//        %表示宠物装备当前经验，品质字段表示宠物装备等级
    OI_CODE_EDUCABLE_COUNT = 47, //         % 宠物装备当天可培养次数，-1表示不可培养
    OI_CODE_EXP = 60,
    OI_FREE_TALENT_POINTS = 61,
    OI_CODE_BATTLE_POWER = 62,
    OI_CODE_DO_PHY_DAM_SCALING = 63, //-- % 物理伤害放缩系数（传给客户端的是一个放大了100倍的整数）
    OI_CODE_DO_MAG_DAM_SCALING = 64, //-- % 法术伤害放缩系数（传给客户端的是一个放大了100倍的整数）
    OI_CODE_CRIT_COEF = 65,  //--     % 暴击系数（传给客户端的是一个放大了100倍的整数）
    OI_CODE_RET_DAM_PROBA = 66, // --% 震（即反弹）概率（传给客户端的是一个放大了1000倍的整数，
    OI_CODE_RET_DAM_COEF = 67,//--% 反震（即反弹）系数（传给客户端的是一个放大了100倍的整数）
    OI_CODE_BE_HEAL_EFF_COEF = 68,//--  % 被治疗效果系数（传给客户端的是一个放大了100倍的整数）
    OI_CODE_BE_PHY_DAM_REDUCE_COEF = 69, //-- % 物理伤害减免系数（传给客户端的是一个放大了100倍的整数）
    OI_CODE_BE_MAG_DAM_REDUCE_COEF = 70, //-- % 法术伤害减免系数（传给客户端的是一个放大了100倍的整数）
    OI_CODE_ABSORB_HP_COEF = 71, //--     % 吸血系数（传给客户端的是一个放大了100倍的整数）
    OI_CODE_BE_PHY_DAM_SHRINK = 78,    //--% （受）物理伤害缩小值
    OI_CODE_BE_MAG_DAM_SHRINK = 79,    //--% （受）法术伤害缩小值
    OI_CODE_PAR_LV = 100,
    OI_CODE_PAR_LOYALTY = 101,
    OI_CODE_PAR_EXP = 102,
    OI_CODE_PAR_INTIMACY = 103,
    OI_CODE_PAR_INTIMACY_LV = 104,
    OI_CODE_PAR_CULTIVATE = 105,
    OI_CODE_PAR_CULTIVATE_LV = 106,
    OI_CODE_PAR_LIFE = 107,//).                 % 女妖寿命
    OI_CODE_PAR_POSTNATAL_SKILL_SLOT = 108,//)//. % 女妖后天已经开启的技能格数 (已经没用)
    OI_CODE_PAR_ADD_SKILL = 109,//).            % 女妖增加技能
    OI_CODE_PAR_DEL_SKILL = 110,//).            % 女妖删除技能
    OI_CODE_PAR_MOOD_NO = 111,//).              % 女妖心情编号
    OI_CODE_PAR_STATE = 112,//).                % 宠物状态
    OI_CODE_PAR_CLOTHES = 113,//).              % 宠物画皮
    OI_CODE_PAR_EVOLVE = 114,//).            	% 女妖进化值
    OI_CODE_PAR_EVOLVE_LV = 115,//).         	% 女妖进化等级
    OI_CODE_PAR_FOLLOW = 116,//).               % 宠物跟随状态
    OI_CODE_MP_LIM_RATE = 84,
    OI_CODE_PHY_ATT_RATE = 85,
    OI_CODE_MAG_ATT_RATE = 86,
    OI_CODE_PHY_DEF_RATE = 87,
    OI_CODE_MAG_DEF_RATE = 88,
    OI_CODE_HIT_RATE = 89,
    OI_CODE_DODGE_RATE = 90,
    OI_CODE_CRIT_RATE = 91,
    OI_CODE_TEN_RATE = 92,
    OI_CODE_ACT_SPEED_RATE = 93,
    OI_CODE_SEAL_HIT_RATE = 94,
    OI_CODE_SEAL_RESIS_RATE = 95,
    OI_CODE_lv = 164,                    //--玩家等级
    OI_CODE_PHY_CRIT = 200,              //--物理暴击
    OI_CODE_PHY_TEN = 201,                //--物理坚韧
    OI_CODE_MAG_CRIT = 202,               //--法术暴击
    OI_CODE_MAG_TEN = 203,               // --法术坚韧
    OI_CODE_PHY_CRIT_COEF = 204,          //--物理暴击程度
    OI_CODE_MAG_CRIT_COEF = 205,          //--法术暴击程度
    OI_CODE_HEAL_VALUE = 206,             //--治疗强度
    OI_CODE_FREE_POINT =211,//).       		% 属性点
    OI_BE_CHAOS_ATT_TEAM_PAOBA = 301,                  //-- 被混乱后攻击队友几率
    OI_BE_CHAOS_ATT_TEAM_PHY_DAM = 302,                //-- 被混乱后攻击队友攻击加成
    OI_NEGLECT_SEAL_RESIS = 303,                       //-- 忽视封印抗性
    OI_SEAL_HIT_TO_PARTNER = 304,                      //-- 封印宝宝加成
    OI_SEAL_HIT_TO_MON = 305,                          //-- 封印怪物加成
    OI_PHY_DAM_TO_PARTNER = 306,                       //-- 物理攻击宝宝加成
    OI_PHY_DAM_TO_MON = 307,                           //-- 物理攻击怪物加成
    OI_MAG_DAM_TO_PARTNER = 308,                     // -- 法术攻击宝宝加成
    OI_MAG_DAM_TO_MON = 309,                           //-- 法术攻击怪物加成
    OI_BE_CHAOS_ROUND_REPAIR = 310,                    //-- 被混乱回合减少
    OI_CHAOS_ROUND_REPAIR = 311,                       //-- 混乱回合增加
    OI_BE_FROZE_ROUND_REPAIR = 312,                   //-- 被冰冻回合减少
    OI_FROZE_ROUND_REPAIR = 313,                       //-- 冰冻回合增加
    OI_NEGLECT_PHY_DEF = 314,                          //-- 忽视物理防御
    OI_NEGLECT_MAG_DEF = 315,                          //-- 忽视法术防御
    OI_PHY_DAM_TO_SPEED_1 = 316,                       //-- 物理攻击快速单位加成
    OI_PHY_DAM_TO_SPEED_2 = 317,                       //-- 物理攻击慢速单位加成
    OI_MAG_DAM_TO_SPEED_1 = 318,                       //-- 法术攻击快速单位加成
    OI_MAG_DAM_TO_SPEED_2 = 319,                       //-- 法术攻击慢速单位加成
    OI_SEAL_HIT_TO_SPEED = 320,                        //-- 封印快速单位加成
    OI_REVIVE_HEAL_COEF = 321,                         //-- 封印快速单位加成
    OI_NEGLECT_PHY_DEF_LIM = 329,                       //--忽视物防上限
    OI_NEGLECT_MAG_DEF_LIM = 330,                       //--忽视法防上限
    OI_NEGLECT_SEAL_RESIS_LIM = 331,                    //--忽视抗封上限
    OI_REVIVE_HEAL_COEF_LIM = 332,                      //--复活治疗上限
    OI_CODE_GEM_1   =   1001,
    OI_CODE_GEM_2   =   1002,
    OI_CODE_GEM_3   =   1003,
    OI_CODE_GEM_4   =   1004,
    OI_CODE_GEM_5   =   1005,
    OI_CODE_GEM_6   =   1006,
    OI_CODE_GEM_7   =   1007,
    OI_CODE_GEM_8   =   1008,
    OI_CODE_GEM_9   =   1009,
    OI_CODE_CLIENT_USER_DEFINED = 9999,
}
export class Attribute{
    constructor(id?:number , value?:number){
        this.Id = id;
        this.value = value;
        //读表
        var attributeVo = PropertyVo.get(id);
        this.name = attributeVo.name;
        this.atrrName = attributeVo.sys_name;
        this.des = attributeVo.desc;
        this.isPercent = attributeVo.is_percent == 0? false:true;
        this.ratio = attributeVo.ratio;
    }
    public name = "";
    public des = "";
    public Id = 0;
    public value = 0;
    public isPercent:boolean = false;
    public ratio:number = 10000;
    public atrrName:string = "";
    /**
     * 格式化值
     */
    public get FormatValue():string
    {
        return PropertyUtil.GetPropertyDec(this.Id,this.value);
        // var v:number = this.value/this.ratio;
        // var str:string; 
        // if(this.isPercent)
        // {
        //     str = Math.floor(v*100) + "%";
        // }
        // else
        // {
        //     str = v.toString();
        // }
        // return str;
    }
}

export class RoleProperty {
    private attribute = {};
    constructor(){
    }

    public AddAttribute(id:number , value:number)
    {
        var attributeVo = PropertyVo.get(id);
        if(attributeVo == null)
        return;

        var attr = this.attribute[id];
        if(attr == null)
        {
            attr = new Attribute(id,value);
        }
        attr.value = value;
    }

    public GetAttribute(id:number):Attribute
    {
        var attr = this.attribute[id];
        return attr;
    }

    
}

