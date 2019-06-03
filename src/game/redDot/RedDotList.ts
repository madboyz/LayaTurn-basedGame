import { RDBag, RDBagFull } from "./RDList/RDBag";
import { RDCityActive } from "./RDList/RDCityActive";
import { RDPersonBoss, RDWorldBoss } from "./RDList/RDCityBoss";
import { RDCComateTalentChange, RDComateInfo, RDComateLv, RDComateStar, RDComateTalentLearn, RDComateYuanfen, RDComateTupo, RDComateEquip, RDComateYuanshen, RDComateMingge } from "./RDList/RDComate";
import { RDDayTask } from "./RDList/RDDayTask";
import { RDForgingGem, RDForgingKailing, RDForgingRefine, RDForgingStrength } from "./RDList/RDForging";
import { RDGuildManage, RDGuildContribute, RDGuildTask, RDGuildBoss } from "./RDList/RDGuild";
import { RDJJC } from "./RDList/RDJJC";
import { RDMaterilCopy } from "./RDList/RDMaterilCopy";
import { RDMountFly, RDMountLevel, RDMountStar, RDMountBianyi, RDMountLingjing } from "./RDList/RDMount";
import { RDPetAddPoint, RDPetCanActive, RDPetDianhua, RDPetLevel, RDPetRefine, RDPetShouling, RDPetSkill, RDPetTrain, RDPetTujian, RDPetEquip } from "./RDList/RDPet";
import { RDPetCopy } from "./RDList/RDPetCopy";
import { RDComateAchievement, RDOtherAchievement, RDPetAchievement, RDRideAchievement, RDRoleAchievement, RDRoleAddpoint, RDRoleEquip, RDRoleJinMai, RDRoleXingFa, RDRoleBaseSkill, RDRoleGuildSkill, RDFabao } from "./RDList/RDRole";
import { RDLvReward, RDSevenDayReward, RDSignInReward, RDOSChange, RDOSCost } from "./RDList/RDSimpleList";
import { RDTTT } from "./RDList/RDTTT";
import { RedDotParent } from "./RedDotParent";
import { RDFriendApply, RDFriendLove } from "./RDList/RDFriend";
import { RDYueka, RDTouzijihua, RDRechargeReward } from "./RDList/RDRecharge";

export class RedDotList {
    //------------------------------------------------------------------------------------------
    initList() {
        var redDot: any;
        //主界面上相关=============================================================================
        redDot = new RDDayTask();
        this.redDotList.set(RedDotType.RDDayTask, redDot);
        redDot = new RDBag();
        this.redDotList.set(RedDotType.RDBag, redDot);
        redDot = new RDBagFull();
        this.redDotList.set(RedDotType.RDBagFull, redDot);

        //人物相关==================================================================================
        redDot = new RDRoleEquip();
        this.redDotList.set(RedDotType.RDRoleEquip, redDot);
        redDot = new RDFabao();
        this.redDotList.set(RedDotType.RDFabao, redDot);
        redDot = new RDRoleAddpoint();
        this.redDotList.set(RedDotType.RDRoleAddpoint, redDot);
        //称号
        redDot = new RDRoleAchievement();
        this.redDotList.set(RedDotType.RDRoleAchievement, redDot);
        redDot = new RDPetAchievement();
        this.redDotList.set(RedDotType.RDPetAchievement, redDot);
        redDot = new RDRideAchievement();
        this.redDotList.set(RedDotType.RDRideAchievement, redDot);
        redDot = new RDComateAchievement();
        this.redDotList.set(RedDotType.RDComateAchievement, redDot);
        redDot = new RDOtherAchievement();
        this.redDotList.set(RedDotType.RDOtherAchievement, redDot);
        redDot = new RedDotParent([RedDotType.RDRoleAchievement, RedDotType.RDPetAchievement, RedDotType.RDRideAchievement, RedDotType.RDComateAchievement, RedDotType.RDOtherAchievement]);
        this.redDotList.set(RedDotType.RDAchievements, redDot);
        redDot = new RedDotParent([RedDotType.RDRoleEquip, RedDotType.RDFabao, RedDotType.RDRoleAddpoint, RedDotType.RDAchievements]);//人物总览红点
        this.redDotList.set(RedDotType.RDRoleInfo, redDot);

        redDot = new RDRoleBaseSkill();
        this.redDotList.set(RedDotType.RDRoleBaseSkill, redDot);
        redDot = new RDRoleGuildSkill();
        this.redDotList.set(RedDotType.RDRoleGuildSkill, redDot);
        redDot = new RedDotParent([RedDotType.RDRoleBaseSkill, RedDotType.RDRoleGuildSkill]);//人物技能红点
        this.redDotList.set(RedDotType.RDRoleSkill, redDot);
        redDot = new RDRoleJinMai();
        this.redDotList.set(RedDotType.RDRoleJinMai, redDot);
        redDot = new RDRoleXingFa();
        this.redDotList.set(RedDotType.RDRoleXingFa, redDot);
        redDot = new RedDotParent([RedDotType.RDRoleInfo, RedDotType.RDRoleSkill, RedDotType.RDRoleJinMai, RedDotType.RDRoleXingFa]);//人物红点
        this.redDotList.set(RedDotType.RDRole, redDot);

        //主城=====================================================================================
        //主城-副本相关---------------------
        redDot = new RDPetCopy();//宠物秘境
        this.redDotList.set(RedDotType.RDPetCopy, redDot);
        redDot = new RDMaterilCopy();//材料副本
        this.redDotList.set(RedDotType.RDMaterilCopy, redDot);
        redDot = new RDTTT();//通天塔
        this.redDotList.set(RedDotType.RDTTT, redDot);
        redDot = new RedDotParent([RedDotType.RDPetCopy, RedDotType.RDMaterilCopy, RedDotType.RDTTT]);//主城-副本
        this.redDotList.set(RedDotType.RDFB, redDot);
        //主城-活动---------------------------
        redDot = new RDCityActive();//主城-活动
        this.redDotList.set(RedDotType.RDCityActive, redDot);
        //主城-好友---------------------------
        redDot = new RDFriendApply();
        this.redDotList.set(RedDotType.RDFriendApply, redDot);
        redDot = new RDFriendLove();
        this.redDotList.set(RedDotType.RDFriendLove, redDot);
        redDot = new RedDotParent([RedDotType.RDFriendApply, RedDotType.RDFriendLove]);
        this.redDotList.set(RedDotType.RDFriend, redDot);
        //主城-竞技场---------------------------
        redDot = new RDJJC();
        this.redDotList.set(RedDotType.RDJJC, redDot);
        //主城-BOSS---------------------------
        redDot = new RDPersonBoss();
        this.redDotList.set(RedDotType.RDPersonBoss, redDot);
        redDot = new RDWorldBoss();
        this.redDotList.set(RedDotType.RDWorldBoss, redDot);
        redDot = new RedDotParent([RedDotType.RDPersonBoss, RedDotType.RDWorldBoss]);
        this.redDotList.set(RedDotType.RDCityBoss, redDot);
        //主城-伙伴---------------------------
        redDot = new RDComateInfo();
        this.redDotList.set(RedDotType.RDComateInfo, redDot);
        redDot = new RDComateYuanfen();
        this.redDotList.set(RedDotType.RDComateYuanfen, redDot);
        redDot = new RDComateTupo();
        this.redDotList.set(RedDotType.RDComateTupo, redDot);
        redDot = new RDComateYuanshen();
        this.redDotList.set(RedDotType.RDComateYuanshen, redDot);
        redDot = new RDComateEquip();
        this.redDotList.set(RedDotType.RDComateEquip, redDot);
        redDot = new RDComateMingge();
        this.redDotList.set(RedDotType.RDComateMingge, redDot);
        redDot = new RedDotParent([RedDotType.RDComateInfo, RedDotType.RDComateYuanfen, RedDotType.RDComateTupo, RedDotType.RDComateYuanshen, RedDotType.RDComateEquip, RedDotType.RDComateMingge]);
        this.redDotList.set(RedDotType.RDComateZonglan, redDot);//伙伴总览
        redDot = new RDComateLv();
        this.redDotList.set(RedDotType.RDComateLv, redDot);
        redDot = new RDComateStar();
        this.redDotList.set(RedDotType.RDComateStar, redDot);
        redDot = new RDComateTalentLearn();
        this.redDotList.set(RedDotType.RDComateTalentLearn, redDot);
        redDot = new RDCComateTalentChange();
        this.redDotList.set(RedDotType.RDComateTalentChange, redDot);
        redDot = new RedDotParent([RedDotType.RDComateTalentLearn, RedDotType.RDComateTalentChange]);
        this.redDotList.set(RedDotType.RDComateTalent, redDot);
        redDot = new RedDotParent([RedDotType.RDComateZonglan, RedDotType.RDComateLv, RedDotType.RDComateStar, RedDotType.RDComateTalent]);
        this.redDotList.set(RedDotType.RDCityComate, redDot);
        //主城-菜单列表--------------------------
        redDot = new RDLvReward();
        this.redDotList.set(RedDotType.RDLvReward, redDot);
        redDot = new RDSignInReward();
        this.redDotList.set(RedDotType.RDSignInReward, redDot);
        redDot = new RDSevenDayReward();
        this.redDotList.set(RedDotType.RDSevenDayReward, redDot);
        redDot = new RedDotParent([RedDotType.RDLvReward, RedDotType.RDSignInReward, RedDotType.RDSevenDayReward]);
        this.redDotList.set(RedDotType.RDFuli, redDot);//福利中心
        redDot = new RDOSChange();
        this.redDotList.set(RedDotType.RDOSChange, redDot);
        redDot = new RDOSCost();
        this.redDotList.set(RedDotType.RDOSCost, redDot);
        redDot = new RedDotParent([RedDotType.RDOSChange, RedDotType.RDOSCost]);
        this.redDotList.set(RedDotType.RDOSActivity, redDot);//开服活动
        redDot = new RDYueka();
        this.redDotList.set(RedDotType.RDYueka, redDot);//月卡
        redDot = new RDTouzijihua();
        this.redDotList.set(RedDotType.RDTouzijihua, redDot);//投资计划
        redDot = new RDRechargeReward();
        this.redDotList.set(RedDotType.RDRechargeReward, redDot);//充值回馈
        //主城-帮派--------------------------
        redDot = new RDGuildBoss();
        this.redDotList.set(RedDotType.RDGuildBoss, redDot);
        redDot = new RDGuildTask();
        this.redDotList.set(RedDotType.RDGuildTask, redDot);
        redDot = new RedDotParent([RedDotType.RDGuildTask, RedDotType.RDGuildBoss]);
        this.redDotList.set(RedDotType.RDGuildZonglan, redDot);//帮派总览
        redDot = new RDGuildManage();
        this.redDotList.set(RedDotType.RDGuildManage, redDot);
        redDot = new RDGuildContribute();
        this.redDotList.set(RedDotType.RDGuildContribute, redDot);
        redDot = new RedDotParent([RedDotType.RDGuildManage, RedDotType.RDGuildZonglan, RedDotType.RDGuildContribute]);
        this.redDotList.set(RedDotType.RDGuild, redDot);//帮派
        //主城---------------------------
        redDot = new RedDotParent([RedDotType.RDFB, RedDotType.RDCityActive, RedDotType.RDFriend, RedDotType.RDJJC, RedDotType.RDCityBoss, RedDotType.RDCityComate,
        RedDotType.RDFuli, RedDotType.RDGuild, RedDotType.RDYueka, RedDotType.RDTouzijihua, RedDotType.RDRechargeReward]);
        this.redDotList.set(RedDotType.RDMaincity, redDot);
        //强化
        redDot = new RDForgingStrength();
        this.redDotList.set(RedDotType.RDForgingStrength, redDot);
        //精炼
        redDot = new RDForgingRefine();
        this.redDotList.set(RedDotType.RDForgingRefine, redDot);
        //启灵
        redDot = new RDForgingKailing();
        this.redDotList.set(RedDotType.RDForgingKailing, redDot);
        //宝石
        redDot = new RDForgingGem();
        this.redDotList.set(RedDotType.RDForgingGem, redDot);
        //锻造
        redDot = new RedDotParent([RedDotType.RDForgingStrength, RedDotType.RDForgingRefine, RedDotType.RDForgingKailing, RedDotType.RDForgingGem]);//锻造
        this.redDotList.set(RedDotType.RDForging, redDot);
        //宠物===================================================
        //宠物加点
        redDot = new RDPetAddPoint();
        this.redDotList.set(RedDotType.RDPetAddPoint, redDot);
        //宠物激活
        redDot = new RDPetCanActive();
        this.redDotList.set(RedDotType.RDPetCanActive, redDot);
        //宠物图鉴
        redDot = new RDPetTujian();
        this.redDotList.set(RedDotType.RDPetTujian, redDot);
        //宠物点化
        redDot = new RDPetDianhua();
        this.redDotList.set(RedDotType.RDPetDianhua, redDot);
        //宠物兽灵
        redDot = new RDPetShouling();
        this.redDotList.set(RedDotType.RDPetShouling, redDot);
        //宠物装备
        redDot = new RDPetEquip();
        this.redDotList.set(RedDotType.RDPetEquip, redDot);
        //宠物信息总览
        redDot = new RedDotParent([RedDotType.RDPetAddPoint, RedDotType.RDPetCanActive, RedDotType.RDPetTujian, RedDotType.RDPetDianhua, RedDotType.RDPetShouling, RedDotType.RDPetEquip]);
        this.redDotList.set(RedDotType.RDPetInfo, redDot);
        //宠物升级
        redDot = new RDPetLevel();
        this.redDotList.set(RedDotType.RDPetLevel, redDot);
        //宠物修炼
        redDot = new RDPetTrain();
        this.redDotList.set(RedDotType.RDPetTrain, redDot);
        //宠物炼化
        redDot = new RDPetRefine();
        this.redDotList.set(RedDotType.RDPetRefine, redDot);
        //宠物技能
        redDot = new RDPetSkill();
        this.redDotList.set(RedDotType.RDPetSkill, redDot);
        //宠物
        redDot = new RedDotParent([RedDotType.RDPetInfo, RedDotType.RDPetLevel, RedDotType.RDPetTrain, RedDotType.RDPetRefine, RedDotType.RDPetSkill]);//宠物
        this.redDotList.set(RedDotType.RDPet, redDot);
        //坐骑升级
        redDot = new RDMountLevel();
        this.redDotList.set(RedDotType.RDMountLevel, redDot);
        //坐骑变异
        redDot = new RDMountBianyi();
        this.redDotList.set(RedDotType.RDMountBianyi, redDot);
        //坐骑灵境
        redDot = new RDMountLingjing();
        this.redDotList.set(RedDotType.RDMountLingjing, redDot);
        //坐骑总览
        redDot = new RedDotParent([RedDotType.RDMountLevel, RedDotType.RDMountBianyi, RedDotType.RDMountLingjing]);
        this.redDotList.set(RedDotType.RDMountZonglan, redDot);
        //坐骑升星
        redDot = new RDMountStar();
        this.redDotList.set(RedDotType.RDMountStar, redDot);
        //坐骑飞升
        redDot = new RDMountFly();
        this.redDotList.set(RedDotType.RDMountFly, redDot);
        //坐骑
        redDot = new RedDotParent([RedDotType.RDMountZonglan, RedDotType.RDMountStar, RedDotType.RDMountFly]);//坐骑
        this.redDotList.set(RedDotType.RDMount, redDot);
    }

    //基本==================================================================
    constructor() {
        this.redDotList = new Laya.Dictionary;
        this.initList();
    }
    redDotList: Laya.Dictionary;//key为RedDotType ， value为红点实例; 
}

export enum RedDotType {
    //主界面上相关===========================================================
    //日常任务
    RDDayTask = "RDDayTask",
    //背包红点
    RDBag = "RDBag",
    //背包满红点
    RDBagFull = "RDBagFull",

    //人物相关===============================================================
    // 可以装备新的装备的
    RDRoleEquip = "RDRoleEquip",
    // 可以装备新的法宝
    RDFabao = "RDFabao",
    // 人物可以加点
    RDRoleAddpoint = "RDRoleAddpoint",
    // 人物总览红点
    RDRoleInfo = "RDRoleInfo",
    // 人物个人技能
    RDRoleBaseSkill = "RDRoleBaseSkill",
    // 人物帮派技能
    RDRoleGuildSkill = "RDRoleGuildSkill",
    // 人物技能
    RDRoleSkill = "RDRoleSkill",
    // 人物经脉
    RDRoleJinMai = "RDRoleJinMai",
    // 人物心法
    RDRoleXingFa = "RDRoleXingFa",

    RDRoleAchievement = "RDRoleAchievement",

    RDPetAchievement = "RDPetAchievement",

    RDRideAchievement = "RDRideAchievement",

    RDComateAchievement = "RDComateAchievement",

    RDOtherAchievement = "RDOtherAchievement",
    //人物总成就
    RDAchievements = "RDAchievements",

    // 人物总红点
    RDRole = "RDRole",

    //主城里面相关===========================================================
    // 竞技场
    RDJJC = "RDJJC",
    // 宠物秘境
    RDPetCopy = "RDPetCopy",
    // 材料副本
    RDMaterilCopy = "RDMaterilCopy",
    // 通天塔
    RDTTT = "RDTTT",
    // 主城-副本
    RDFB = "RDFB",
    // 主城-活动
    RDCityActive = "RDCityActive",
    // 主城-好友申请
    RDFriendApply = "RDFriendApply",
    // 主城-好友爱心
    RDFriendLove = "RDFriendLove",
    // 主城-好友
    RDFriend = "RDFriend",
    // 个人BOSS
    RDPersonBoss = "RDPersonBoss",
    // 世界BOSS
    RDWorldBoss = "RDWorldBoss",
    // 主城-BOSS
    RDCityBoss = "RDCityBoss",
    //伙伴相关----------------------------
    // 伙伴基础
    RDComateInfo = "RDComateInfo",
    // 伙伴缘分
    RDComateYuanfen = "RDComateYuanfen",
    // 伙伴突破
    RDComateTupo = "RDComateTupo",
    // 伙伴元神
    RDComateYuanshen = "RDComateYuanshen",
    // 伙伴装备
    RDComateEquip = "RDComateEquip",
    // 伙伴命格
    RDComateMingge = "RDComateMingge",
    // 伙伴总览
    RDComateZonglan = "RDComateZonglan",
    // 伙伴升级
    RDComateLv = "RDComateLv",
    // 伙伴升星
    RDComateStar = "RDComateStar",
    // 伙伴天赋
    RDComateTalent = "RDComateTalent",
    // 伙伴天赋兑换
    RDComateTalentChange = "RDComateTalentChange",
    // 伙伴天赋学习
    RDComateTalentLearn = "RDComateTalentLearn",
    // 主城-伙伴
    RDCityComate = "RDCityComate",
    // 主城-帮派BOSS
    RDGuildBoss = "RDGuildBoss",
    // 主城-帮派任务
    RDGuildTask = "RDGuildTask",
    // 主城-帮派总览
    RDGuildZonglan = "RDGuildZonglan",
    // 主城-帮派管理
    RDGuildManage = "RDGuildManage",
    // 主城-帮派贡献
    RDGuildContribute = "RDGuildContribute",
    // 主城-帮派
    RDGuild = "RDGuild",
    //福利中心---------------------
    // 主城-开服活动
    RDOSActivity = "RDOSActivity",
    // 主城-开服兑换活动
    RDOSChange = "RDOSChange",
    // 主城-消耗有礼
    RDOSCost = "RDOSCost",
    // 主城-福利中心
    RDFuli = "RDFuli",
    // 主城-等级奖励
    RDLvReward = "RDLvReward",
    // 主城-签到奖励
    RDSignInReward = "RDSignInReward",
    // 主城-七日登录
    RDSevenDayReward = "RDSevenDayReward",
    // 主城-月卡
    RDYueka = "RDYueka",
    // 主城-投资计划
    RDTouzijihua = "RDTouzijihua",
    // 主城-充值回馈
    RDRechargeReward = "RDRechargeReward",
    // 主城
    RDMaincity = "RDMaincity",
    //锻造
    RDForging = "RDForging",
    //强化
    RDForgingStrength = "RDForgingStrength",
    //精炼
    RDForgingRefine = "RDForgingRefine",
    //启灵
    RDForgingKailing = "RDForgingKailing",
    //宝石
    RDForgingGem = "RDForgingGem",
    //宠物
    RDPet = "RDPet",
    //宠物总览---------------------
    RDPetInfo = "RDPetInfo",
    //宠物图鉴
    RDPetTujian = "RDPetTujian",
    //宠物点化
    RDPetDianhua = "RDPetDianhua",
    //宠物兽灵
    RDPetShouling = "RDPetShouling",
    //宠物装备
    RDPetEquip = "RDPetEquip",
    //宠物加点
    RDPetAddPoint = "RDPetAddPoint",
    //宠物激活
    RDPetCanActive = "RDPetCanActive",
    //---------------------
    //宠物升级
    RDPetLevel = "RDPetLevel",
    //宠物修炼
    RDPetTrain = "RDPetTrain",
    //宠物炼化
    RDPetRefine = "RDPetRefine",
    //宠物技能
    RDPetSkill = "RDPetSkill",
    //坐骑
    RDMount = "RDMount",
    ///坐骑升级
    RDMountLevel = "RDMountLevel",
    ///坐骑变异
    RDMountBianyi = "RDMountBianyi",
    ///坐骑灵境
    RDMountLingjing = "RDMountLingjing",
    //坐骑总览
    RDMountZonglan = "RDMountZonglan",
    //坐骑升星
    RDMountStar = "RDMountStar",
    //坐骑飞升
    RDMountFly = "RDMountFly",

}
