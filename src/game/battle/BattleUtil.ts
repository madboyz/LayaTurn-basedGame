import { S20007_1, S20062, S20041, S20042, S20043, S20044, S20015, S20015_1, S20016, S20016_1, S20021, S20017, S20017_1, S20018_1, S20019, S20019_1, S20063 } from "../../net/pt/pt_20";
import { FightView } from "../battle/role/fight/FightView";
import { FightPlayerView } from "../battle/role/fight/FightPlayerView";
import { FightPetView } from "../battle/role/fight/FightPetView";
import { FightNpcView } from "../battle/role/fight/FightNpcView";
import { FightMonsterView } from "../battle/role/fight/FightMonsterView";
import { FightInfo } from "../battle/model/FightInfo";
import { SRoleData } from "../../net/data/SRoleData";
import { ReportType } from "./report/NewBaseReport";
import { SNewBattleData } from "../../net/data/SNewBattleData";
import { FightComateView } from "./role/fight/FightComateView";
import { GameUtils } from "../utils/GameUtils";
import { Fighting_monsterVo } from "../../db/sheet/vo/Fighting_monsterVo";
import { GameLayer } from "../../GameLayer";
import { ConstVo } from "../../db/sheet/vo/ConstVo";

export enum BattleCommadEnum//战斗命令枚举
{
    CommadTimeEnd = 0,
}


export class BattleUtil
{
    public static getPos(index)
    {
        //var pos: any = {
        //    1:  { left: new Laya.Point(411,285),  right: GameUtils.getRightBottomScreenPos(470,440)},
        //    2:  { left: new Laya.Point(337,321),  right: GameUtils.getRightBottomScreenPos(396,481)},
        //    3:  { left: new Laya.Point(262,360),  right: GameUtils.getRightBottomScreenPos(321,521)},
        //    4:  { left: new Laya.Point(180,410),  right: GameUtils.getRightBottomScreenPos(246,558)},
        //    5:  { left: new Laya.Point(104,442),  right: GameUtils.getRightBottomScreenPos(165,598)},
        //    6:  { left: new Laya.Point(351,232),  right: GameUtils.getRightBottomScreenPos(552,483)},
        //    7:  { left: new Laya.Point(278,264),  right: GameUtils.getRightBottomScreenPos(480,522)},
        //    8:  { left: new Laya.Point(202,304),  right: GameUtils.getRightBottomScreenPos(410,574)},
        //    9:  { left: new Laya.Point(123,338),  right: GameUtils.getRightBottomScreenPos(323,603)},
        //    10: { left: new Laya.Point(47,376),   right: GameUtils.getRightBottomScreenPos(249,641)},
        //}

        var pos: any = {
            1:  { left: GameUtils.getCenterScreenPos(411,285),  right: GameUtils.getCenterScreenPos(470,440)},
            2:  { left: GameUtils.getCenterScreenPos(337,321),  right: GameUtils.getCenterScreenPos(396,481)},
            3:  { left: GameUtils.getCenterScreenPos(262,360),  right: GameUtils.getCenterScreenPos(321,521)},
            4:  { left: GameUtils.getCenterScreenPos(180,410),  right: GameUtils.getCenterScreenPos(246,558)},
            5:  { left: GameUtils.getCenterScreenPos(104,442),  right: GameUtils.getCenterScreenPos(165,598)},
            6:  { left: GameUtils.getCenterScreenPos(351,232),  right: GameUtils.getCenterScreenPos(552,483)},
            7:  { left: GameUtils.getCenterScreenPos(278,264),  right: GameUtils.getCenterScreenPos(480,522)},
            8:  { left: GameUtils.getCenterScreenPos(202,304),  right: GameUtils.getCenterScreenPos(410,574)},
            9:  { left: GameUtils.getCenterScreenPos(123,338),  right: GameUtils.getCenterScreenPos(323,603)},
            10: { left: GameUtils.getCenterScreenPos(47,376),   right: GameUtils.getCenterScreenPos(249,641)},
        }
        return pos[index];
    }

    public static SceneEffectPos() 
    {
        var pos: any =  {self:GameUtils.getCenterScreenPos(354,515) , enemy:GameUtils.getCenterScreenPos(246,326)}//战斗场景特效位置
        return pos;
    }
     
    /**
     * 摇晃
     * @param scene 
     * @param CallBack 
     */
    public static ShakeScene(scene:Laya.Sprite)
    {
        var shake_value = ConstVo.get("SHAKE_SCREEN_POS").val;
        var min = shake_value[0];
        var max = shake_value[1];
        var r: number = (GMath.random(min, max));
        Laya.Tween.to(scene,{ x: scene.x - r,y: scene.y - r},40,Laya.Ease.bounceOut,Laya.Handler.create(this, () => {
            Laya.Tween.to(scene,{ x: scene.x - r,y: scene.y + r },40,Laya.Ease.bounceIn,Laya.Handler.create(this, () => {
                    Laya.Tween.to(scene,{ x: scene.x + r,y: scene.y + r },40,Laya.Ease.bounceOut,Laya.Handler.create(this, () => {
                        Laya.Tween.to(scene,{ x: scene.x + r,y: scene.y - r },40,Laya.Ease.bounceIn,Laya.Handler.create(this,() => {
                            Laya.Tween.to(scene,{ x: scene.x - r,y: scene.y - r },40,Laya.Ease.bounceOut,Laya.Handler.create(this,() => {
                                Laya.Tween.to(scene,{ x: scene.x + r,y: scene.y + r },40,Laya.Ease.bounceIn,Laya.Handler.create(this, () => {
                                    if(scene)
                                    {
                                        scene.x = scene.y = 0;
                                        //scene.scaleX = scene.scaleY = 1;
                                    }
                                }));
                            }));
                        }));
                    }));
                }));
        }));
        
    }
    
    /**
     * 获得一个帧动画的长度
     * @param action 
     */
    public static GetFrameCount(url: string)
    {
        return new Promise((resolve, reject) => {
            Laya.loader.load(url, Laya.Handler.create(this, function (): void {
                if(BattleUtil.getFrames(url))
                    resolve(BattleUtil.getFrames(url).length);
                else
                resolve(0);
            }), null, Laya.Loader.ATLAS).once(Laya.Event.ERROR, this, () => {
                resolve(0);//加载失败
            });
        });
    }

    public static getFrames(url: string): Array<any> {
        var frames: Array<any> = Laya.Animation.framesMap[url];//先从缓存拿
        if (frames) return frames;
        return Laya.Animation.createFrames(url, url);//缓存拿不到，创建出来
    }
    //创建战斗单位
    public static createBattleRole(body: any, isSelf:boolean = true):FightView
    {
        var role: FightView = null;
        var role: FightView = this.fightType(body.BoType);
        role.action = Action.stand;
        var pos: number = body.Pos;
        var posData = this.getPos(pos);
        role.OriginalX = role.x = isSelf ? posData.right.x : posData.left.x;
        role.OriginalY = role.y = isSelf ? posData.right.y : posData.left.y;
        if(body.item_1&&body.item_1.length )
        {
            for (let i = 0; i < body.item_1.length; i++) {
                const element = body.item_1[i];
                if(!element.BuffNo)
                continue;
                role.FightBuffs.AddBuff(element.BuffNo, element);
            }
        }
        return role;
    }

    public static fightType(type): any {
        switch (type) {
            case BOTYPE.PALYER: return Laya.Pool.getItemByClass("FightPlayerView", FightPlayerView);
            case BOTYPE.PET: return Laya.Pool.getItemByClass("FightPetView", FightPetView);
            case BOTYPE.NPC: return Laya.Pool.getItemByClass("FightNpcView", FightNpcView);
            case BOTYPE.MONSTER: return Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
            case BOTYPE.BOSS: return Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
            case BOTYPE.EMPLOYMENT_PLAYER: return Laya.Pool.getItemByClass("FightPlayerView", FightPlayerView);
            case BOTYPE.WORLD_BOSS: return Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
            case BOTYPE.COMATE: return Laya.Pool.getItemByClass("FightComateView", FightComateView);
        }
        return null;
    }

    public static getFightViewInfo(ParentObjId:number,Sex:number,Faction:number ,Weapon:number , LookIdx:number ,ParentPartnerNo:number ,Name:string,Clothes:number):any
    {
        var info = {ParentObjId:ParentObjId , Faction:Faction , Weapon:Weapon ,Sex:Sex,LookIdx:LookIdx , ParentPartnerNo:ParentPartnerNo , Name:Name,Clothes:Clothes};
        return info;
    }

    public static sortBoids(arr: number[]): void {
        arr.sort((a: number, b: number): any => {
            if (a == SRoleData.instance.roleId) {
                return -1;
            }
            return 1;
        });
    }

    public static parse20019Defer(data:S20019_1):any
    {
        var DeferInfos:any = [];
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var ListItem:any = {};
            ListItem.Id  = item.TargetBoId;
            var info:FightInfo = SNewBattleData.instance.allFightInfos.get(item.TargetBoId);
            if(info)
            {
                ListItem.isMain = info.isMain;
            }
            else
            {
                ListItem.isMain = false;
            }
            ListItem.IsCannotBeHeal = item.IsCannotBeHeal;
            ListItem.HealVal = item.HealVal;
            ListItem.HpLeft = item.NewHp;
            ListItem.MpLeft = item.NewMp;
            ListItem.AngerLeft = item.NewAnger;
            ListItem.AddBuffs = item.item_1;
            ListItem.CutBuffs = item.item_2;
            DeferInfos.push(ListItem);
        }
        return DeferInfos;
    }
    /**
     * 医疗攻击者
     * @param data 
     */
    public static parse20019Attack(data:S20019_1):any
    {
        var AttackInfo:any = {};
        AttackInfo.Id = data.CasterId;
        AttackInfo.Result = data.CastResult;
        AttackInfo.HasReviveEff = data.HasReviveEff;
        AttackInfo.HealType = data.HealType;
        AttackInfo.HpLeft = data.HealerHpLeft;
        AttackInfo.MpLeft = data.HealerMpLeft;
        AttackInfo.AngerLeft = data.HealerAngerLeft;
        return AttackInfo;
    }
    /**
     * 医疗
     * @param data 
     */
    public static parse20019Action(data:S20019):any
    {
        var actions = [];
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var action:any = {};
            action.AttackInfo = this.parse20019Attack(item);
            action.DeferInfos = this.parse20019Defer(item);
            actions.push(action);
        }
        return actions;
    }

    /**
     * buff防御者
     * @param data 
     */
    public static parse20017Defer(data:S20017_1):any
    {
        var DeferInfos:any = [];
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var ListItem:any = {};
            ListItem.Id  = item.TargetBoId;
            ListItem.AddBuffs = item.item_1;
            ListItem.CutBuffs = item.item_2;
            ListItem.UpdateBuffs = item.item_3;
            DeferInfos.push(ListItem);
        }
        return DeferInfos;
    }
    /**
     * buff攻击者
     * @param data 
     */
    public static parse20017Attack(data:S20017_1):any
    {
        var AttackInfo:any = {};
        AttackInfo.Id = data.CasterId;
        AttackInfo.Result = data.CastResult;
        AttackInfo.NeedPerfCasting = data.NeedPerfCasting;
        AttackInfo.HpLeft = data.CasterHpLeft;
        AttackInfo.MpLeft = data.CasterMpLeft;
        AttackInfo.AngerLeft = data.CasterAngerLeft;
        return AttackInfo;
    }
    /**
     * 施加buff
     * @param data 
     */
    public static parse20017Action(data:S20017):any
    {
        var actions = [];
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var action:any = {};
            action.AttackInfo = this.parse20017Attack(item);
            action.DeferInfos = this.parse20017Defer(item);
            actions.push(action);
        }
        return actions;
    }

    /**
     * 召唤
     * @param data 
     */
    public static parse20021Action(data:S20021):any
    {
        var actions = [];
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            if(element.Result == 0)
            {
                actions.push(element.item_1);
            }
        }
        return actions;
    }
    
    public static parse20016Action(data:S20016):any
    {
        var actions = [];
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var action:any = {};
            action.AttSubType = item.IsComboAtt == 1?3:1;//法术连击是单独的字段所以需要转化
            action.AttackInfo = this.parse20016Attack(item);
            action.DeferInfos = this.parse20016Defer(item);
            action.SplashInfos = this.parse20016BeSplash(item);
            actions.push(action);
        }

        return actions;
    }

    public static parse20016Defer(data:S20016_1):any
    {
        var DeferInfos:any = [];
        for (let i = 0; i < data.item_3.length; i++) {
            const item = data.item_3[i];
            var ListItem:any = {};
            ListItem.Id = item.DeferId;
            ListItem.AttResult = item.AttResult;
            ListItem.DamToDefer = item.DamToDefer;
            ListItem.DamToDefer_Mp = item.DamToDefer_Mp;
            ListItem.DamToDefer_Anger = item.DamToDefer_Anger;
            ListItem.HpLeft = item.DeferHpLeft;
            ListItem.MpLeft = item.DeferMpLeft;
            ListItem.AngerLeft = item.DeferAngerLeft;
            ListItem.DieStatus = item.DeferDieStatus;
            ListItem.IsApplyReborn = item.IsDeferApplyReborn;
            ListItem.AddBuffs = item.item_3;
            ListItem.CutBuffs = item.item_4;
            ListItem.UpdateBuffs = item.item_5;
            DeferInfos.push(ListItem);
        }

        return DeferInfos;
    }

    public static parse20016BeSplash(data:S20016_1):any
    {
        var SplashInfos = [];
        for (let i = 0; i < data.item_4.length; i++) {
            const element = data.item_4[i];
            var SplashInfo:any = {};
            SplashInfo.Id = element.BeSplashBo_Id;
            SplashInfo.SplashDam_Hp = element.SplashDam_Hp;
            SplashInfo.SplashDam_Mp = element.SplashDam_Mp;
            SplashInfo.SplashDam_Anger = element.SplashDam_Anger;
            SplashInfo.HpLeft = element.BeSplashBo_HpLeft;
            SplashInfo.MpLeft = element.BeSplashBo_MpLeft;
            SplashInfo.AngerLeft = element.BeSplashBo_AngerLeft;
            SplashInfo.DieStatus = element.BeSplashBo_DieStatus;
            SplashInfo.IsApplyReborn = element.BeSplashBo_IsApplyReborn;
            SplashInfo.CutBuffs = element.item_1;
            SplashInfos.push(SplashInfo);
        }

        return SplashInfos;
    }


    public static parse20016Attack(data:S20016_1):any
    {
        var AttackInfo:any = {};
        AttackInfo.Id = data.AtterId;
        AttackInfo.AddBuffs = data.item_1;
        AttackInfo.CutBuffs = data.item_2;
        AttackInfo.HitAddBuffs = [];//命中后对攻击者的buff
        AttackInfo.HitCutBuffs = [];//命中后对攻击者移除buff
        AttackInfo.List = [];
        AttackInfo.RetDam = 0;
        //法术伤害是对多个目标的所以是个数组
        for (let i = 0; i < data.item_3.length; i++) {
            const item = data.item_3[i];
            var ListItem:any = {};
            AttackInfo.HpLeft = item.AtterHpLeft;
            AttackInfo.MpLeft = item.AtterMpLeft;
            AttackInfo.AngerLeft = item.AtterAngerLeft;
            AttackInfo.DieStatus = item.AtterDieStatus;
            AttackInfo.AbsorbedHp = item.AbsorbedHp;
            AttackInfo.IsApplyReborn = item.IsAtterApplyReborn;
            AttackInfo.RetDam += item.RetDam;
            for (let j = 0; j < item.item_1.length; j++) {
                const element = item.item_1[j];
                AttackInfo.HitAddBuffs.push(element);
            }
            for (let j = 0; j < item.item_2.length; j++) {
                const element = item.item_2[j];
                AttackInfo.HitCutBuffs.push(element);
            }
            AttackInfo.List.push(ListItem);
        }
        return AttackInfo;
    }


    /**
     * 解析20015数组
     * @param data 
     */
    public static parse20015Action(data:S20015):any
    {
        var actions = [];
        for (let i = 0; i < data.item_1.length; i++) {
            const item = data.item_1[i];
            var action:any = {};
            action.AttResult = item.AttResult;//攻击结果（1：命中，2：闪避，3：暴击）
            action.AttackInfo = this.parse20015Attack(item);//攻击子类型（0: 无意义，1: 普通攻击，2：反击， 3：连击， 4：追击）
            action.AttackInfo.AttSubType = item.AttSubType;
            action.DeferInfo = this.parse20015Defer(item);
            action.ProtectorInfo = this.parse20015Protector(item);
            action.SplashInfos = this.parse20015BeSplash(item);
            actions.push(action);
        }
        return actions
    }
    /**
     * 溅射
     * @param data 
     */
    public static parse20015BeSplash(data:S20015_1):any
    {
        var SplashInfos = [];
        for (let i = 0; i < data.item_8.length; i++) {
            const element = data.item_8[i];
            var SplashInfo:any = {};
            SplashInfo.Id = element.BeSplashBo_Id;
            SplashInfo.SplashDam_Hp = element.SplashDam_Hp;
            SplashInfo.SplashDam_Mp = element.SplashDam_Mp;
            SplashInfo.SplashDam_Anger = element.SplashDam_Anger;
            SplashInfo.HpLeft = element.BeSplashBo_HpLeft;
            SplashInfo.MpLeft = element.BeSplashBo_MpLeft;
            SplashInfo.AngerLeft = element.BeSplashBo_AngerLeft;
            SplashInfo.DieStatus = element.BeSplashBo_DieStatus;
            SplashInfo.IsApplyReborn = element.BeSplashBo_IsApplyReborn;
            SplashInfo.CutBuffs = element.item_1;
            SplashInfos.push(SplashInfo);
        }
        return SplashInfos;
    }

    public static parse20015Protector(data:S20015_1):any
    {
        var ProtectorInfo:any = {};
        ProtectorInfo.DamToProtector = data.DamToProtector;
        ProtectorInfo.DamToProtector_Anger = data.DamToProtector_Anger;
        ProtectorInfo.Id = data.ProtectorId;
        ProtectorInfo.AddBuffs = data.item_6;
        ProtectorInfo.CutBuffs = data.item_7;
        ProtectorInfo.HpLeft = data.ProtectorHpLeft;
        ProtectorInfo.AngerLeft = data.ProtectorAngerLeft;
        ProtectorInfo.DieStatus = data.ProtectorDieStatus;
        ProtectorInfo.IsApplyReborn = data.IsProtectorApplyReborn;
        return ProtectorInfo;
    }

    public static parse20015Defer(data:S20015_1):any
    {
        var DeferInfo:any = {};
        DeferInfo.Id = data.DeferId;
        DeferInfo.AddBuffs = data.item_3;
        DeferInfo.CutBuffs = data.item_4;
        DeferInfo.DamToDefer = data.DamToDefer;
        DeferInfo.DamToDefer_Mp = data.DamToDefer_Mp;
        DeferInfo.DamToDefer_Anger = data.DamToDefer_Anger;
        DeferInfo.UpdateBuffs = data.item_5;
        DeferInfo.HpLeft = data.DeferHpLeft;
        DeferInfo.MpLeft = data.DeferMpLeft;
        DeferInfo.AngerLeft = data.DeferAngerLeft;
        DeferInfo.DieStatus = data.DeferDieStatus;
        DeferInfo.IsApplyReborn = data.IsDeferApplyReborn;
        return DeferInfo;
    }

    //解析20015攻击者行为
    public static parse20015Attack(data:S20015_1):any
    {
        var AttackInfo:any = {};
        AttackInfo.AddBuffs = data.item_1;
        AttackInfo.CutBuffs = data.item_2;
        AttackInfo.Id = data.AtterId;
        AttackInfo.RetDam = data.RetDam;
        AttackInfo.RetDam_Anger = data.RetDam_Anger;
        AttackInfo.AbsorbedHp = data.AbsorbedHp;//攻击者吸血的数值（如果没有吸血，则返回0
        AttackInfo.HpLeft = data.AtterHpLeft;
        AttackInfo.MpLeft = data.AtterMpLeft;
        AttackInfo.AngerLeft = data.AtterAngerLeft;
        AttackInfo.DieStatus = data.AtterDieStatus;//攻击者的死亡状态（0：未死亡，1：死亡并且进入倒地状态，2：死亡并且进入鬼魂状态， 3：死亡并且直接消失）
        AttackInfo.IsApplyReborn = data.IsAtterApplyReborn;//攻击者是否应用了重生效果（1：是，0：否）
        return AttackInfo;
    }

    //#endregion


    /**
     * 通知客户端：自身的buff列表有改变（添加了某buff，或者移除了某buff，或者某buff的信息有更新）
     * @param data 
     * @param isRoundStart 
     */
    public static parse20041(data:S20041)
    {
        var table = {
            ReportType:ReportType.BUFF_UPDATE,
            Data:data
        };
        return table;
    }

    public static parse20042(data:S20042)
    {
        var table = {
            ReportType:ReportType.ATTR_UPDATE,
            Data:data
        };
        return table;
    }

    public static parse20043(data:S20043)
    {
        var table = {
            ReportType:ReportType.BO_DIE_UPDATE,
            Data:data
        };
        return table;
    }

    public static parse20063(data:S20063)
    {
        var table = {
            ReportType:ReportType.NEW_BOS_ADD,
            Data:data
        };
        return table;
    }

    public static parse20044(data:S20044)
    {
        var table = {
            ReportType:ReportType.BO_REVIVE_UPDATE,
            Data:data
        };
        return table;
    }


    /**
     * 协议新bo刷出的结构
     * @param data 
     */
    public static parse20062(data:S20062):any
    {
        var table = {
            ReportType:ReportType.BO_NEW_ADD,
            Data:data
        };
        return table
    }
    /**
     * 获得怪物头顶偏移值
     * @param no 
     */
    public static getFightMonsterViewOffsetY(no:number)
    {
        var offsetY = 0;
        var vo: Fighting_monsterVo = Fighting_monsterVo.get(no);
        if(vo&&vo.xuetiao!= null)
        {
            offsetY = vo.xuetiao;
        }
        return offsetY;
    }
}