import { S20007 } from "../../../net/pt/pt_20";
import { RoleView } from "../role/RoleView";
import { Buff } from "../role/fight/Buff/FightBuff";
import { GameLayer } from './../../../GameLayer';
import { DataManager } from './../../../message/manager/DataManager';
import { FightInfo } from './../model/FightInfo';
import { FightView } from './../role/fight/FightView';
import { AttackSymbolLayer } from './layer/AttackSymbolLayer';
import { BloodLayer } from './layer/BloodLayer';
import { BuffDisplayer } from "./layer/BuffLayer";
import { DamageLayer } from './layer/DamageLayer';
import { EffectLayer } from './layer/EffectLayer';
import { NameLayer } from "./layer/NameLayer";
import { RoleLayer } from "./layer/RoleLayer";
import { SkillNameLayer } from './layer/SkillNameLayer';
import { TextLayer } from "./layer/TextLayer";
import { PlayReportMachine } from "../../machine/PlayReportMachine";
import { SNewBattleData, SNewBattleEvent } from "../../../net/data/SNewBattleData";
import { Aerocraft_starVo } from "../../../db/sheet/vo/Aerocraft_starVo";
import { BattleUtil } from "../BattleUtil";
import { SCopyData } from "../../../net/data/SCopyData";
import { CustomizeTexture } from "./comp/CustomizeTexture";
import { CommonLayer } from "./layer/CommonLayer";
import { AchieveVo } from "../../../db/sheet/vo/AchieveVo";
import { BubbleLayer } from "./layer/BubbleLayer";

export class FightScene extends Laya.Sprite {
    private nameLayer: NameLayer = null;
    private roleLayer: RoleLayer = null;
    private bloodLayer: BloodLayer = null;
    private buffDisplay: BuffDisplayer = null;
    public effectLayer: EffectLayer;
    private symbolLayer: AttackSymbolLayer;
    private commonLayer:CommonLayer;//通用层级在玩家上面
    public skillNameLayer: SkillNameLayer;
    private damLayer: DamageLayer;
    private roundLayer: TextLayer;
    public playReportMachine:PlayReportMachine;//战报播放器
    private bubbleLayer:BubbleLayer;//气泡
    public BgSprite:Laya.Sprite;//特殊战斗背景
    private Mask:Laya.Sprite;
    private shader:Laya.Shader;
    constructor() {
        super();
        this.nameLayer = new NameLayer();
        this.roleLayer = new RoleLayer();
        this.bloodLayer = new BloodLayer();
        this.buffDisplay = new BuffDisplayer();
        this.effectLayer = new EffectLayer();
        this.symbolLayer = new AttackSymbolLayer();
        this.skillNameLayer = new SkillNameLayer();
        this.damLayer = new DamageLayer();
        this.roundLayer = new TextLayer();
        this.bubbleLayer = new BubbleLayer();
        this.Mask = new Laya.Sprite();
        this.Mask.graphics.drawRect(0, 0, this.stage.width, this.stage.height, "#000000");
        this.Mask.alpha = 0.7;
        this.BgSprite = new Laya.Sprite();
        GameLayer.instacne.fightLayer.addChild(this.BgSprite);
        GameLayer.instacne.fightLayer.addChild(this.Mask);
        GameLayer.instacne.fightLayer.addChild(this);
        this.size(this.stage.width, this.stage.height);
        this.mouseEnabled = true;
        this.mouseThrough = false;
        this.addChild(this.buffDisplay.backLayer);
        this.addChild(this.nameLayer);
        this.addChild(this.roleLayer);
        this.commonLayer = new CommonLayer();
        this.addChild(this.commonLayer);
        this.addChild(this.bloodLayer);
        this.addChild(this.buffDisplay.forwardLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.symbolLayer);
        this.addChild(this.skillNameLayer);
        this.addChild(this.damLayer);
        this.addChild(this.roundLayer);
        this.addChild(this.bubbleLayer);
        this.roundLayer.scaleX =  this.roundLayer.scaleY = 0.7;
        this.playReportMachine = new PlayReportMachine();
    }

    public LoadSpecial(path:string , x:number = 0 , y:number = 0 , alpha:number = 1,needAutoSize = true)
    {
        /**
         * 2019/2/23 孝鹏非BG (2)底图的战斗都要取掉mask 
         */
        if("bg/BG (2).png" != path)
            this.Mask.visible = false;
        else
            this.Mask.visible = true;
        this.BgSprite.alpha = alpha;
        this.BgSprite.x = x;
        this.BgSprite.y = y;
        var t: Laya.Texture = Laya.Loader.getRes(path);
        var THIS = this;
        if(!t)
        {
            Laya.loader.load(path, Laya.Handler.create(this, function (): void {//加载获取资源 
                t = Laya.Loader.getRes(path);
                if(t)
                {
                    if(needAutoSize)
                    {
                        t.width = Laya.stage.width;
                        t.height = Laya.stage.height;
                    }
                    THIS.BgSprite.texture = t;
                }
                else
                {
                    THIS.Mask.visible = true;
                }
                
            }));
        }
        else
        {
            if(needAutoSize)
            {
                t.width = Laya.stage.width;
                t.height = Laya.stage.height;
            }
            this.BgSprite.texture = t;
        }
    }

    public initScene(): void {
        //if(GameLayer.instacne.sceneLayer.filters == null||(GameLayer.instacne.sceneLayer.filters&&GameLayer.instacne.sceneLayer.filters.length == 0))
        //{
        //    var blurFilter = new Laya.BlurFilter(5);
        //    GameLayer.instacne.sceneLayer.filters = [blurFilter];
        //}
        var s20007: S20007 = DataManager.instance.get(PROTOCOL.E20007);
        if(SCopyData.instance.isInCopy)
        {
            if(SCopyData.instance.curCopyInfo.isPetCopy)
            {
                this.showRound(1, s20007.MaxRound,20);
            }
            else
            {
                this.showRound(1, s20007.MaxRound,20);
            }
        }
        else
        {
            this.showRound(1, s20007.MaxRound,20);
        }
        this.buffDisplay.clear();
        Laya.timer.frameLoop(1, this, this.loop);
        this.x = this.y = 0;
    }

    private testShader()
    {
        var vs: string ="attribute vec2 aVertexPosition;attribute vec2 aTextureCoord;attribute vec2 aColor;uniform vec2 projectionVector;varying vec2 vTextureCoord;varying vec4 vColor;const vec2 center = vec2(-1.0, 1.0);void main(void) {gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);vTextureCoord = aTextureCoord;vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);2}";
        var ps: string = "precision lowp float;varying vec2 vTextureCoord;varying vec4 vColor;uniform sampler2D uSampler;uniform vec2 center;uniform vec3 params;uniform float time;void main(){vec2 uv = vTextureCoord.xy;vec2 texCoord = uv;float dist = distance(uv center);if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) ){float diff = (dist - time);float powDiff = 1.0 - pow(abs(diff*params.x) params.y);float diffTime = diff  * powDiff;vec2 diffUV = normalize(uv - center);texCoord = uv + (diffUV * diffTime);}gl_FragColor = texture2D(uSampler texCoord);}";
        this.shader = Laya.Shader.create(vs,ps,"testWave");
        this.graphics["setShader"](this.shader);
        //var shader:testwave = new testwave();
        //var fi = new Laya.FilterActionGL();
        //fi.setValue(shader);
        //var THIS = this;
        //Laya.Shader
        //this.shaderValue = new testwaveValue();
        //this.shaderValue.textureHost = this.texture;
        //this.customRender = function (context, x, y) {
        //    context.ctx.setIBVB(x, y, this.iBuffer, this.vBuffer, this.iNum, null, this.customeShader, this.shaderValue, 0, 0)
        //};
    }

    private updateBubble():void {
        for (let i = 0; i < SNewBattleData.instance.allBattleBo.keys.length; i++) {
            var key = SNewBattleData.instance.allBattleBo.keys[i];
            var role: FightView = SNewBattleData.instance.allBattleBo.get(key);
            var info: FightInfo = SNewBattleData.instance.allFightInfos.get(key);
            var monsterOffsetY = 0;
            if(info.objInfo.BoType != BOTYPE.PALYER&&info.objInfo.BoType != BOTYPE.PET&&info.objInfo.BoType != BOTYPE.COMATE)
            monsterOffsetY = BattleUtil.getFightMonsterViewOffsetY(info.objInfo.ParentObjId);
            else if(info.objInfo.BoType == BOTYPE.PALYER)
            {
                if(role.isFly)
                {
                    monsterOffsetY = 30; 
                }
            }
            this.bubbleLayer.updatePos(key,role.x, role.y-monsterOffsetY);
        }
    }

    public showBubble(boid:number,msg:string):void {
        var role: FightView = SNewBattleData.instance.allBattleBo.get(boid);
        var info: FightInfo = SNewBattleData.instance.allFightInfos.get(boid);
        var monsterOffsetY = 0;
        if(info.objInfo.BoType != BOTYPE.PALYER&&info.objInfo.BoType != BOTYPE.PET&&info.objInfo.BoType != BOTYPE.COMATE)
        monsterOffsetY = BattleUtil.getFightMonsterViewOffsetY(info.objInfo.ParentObjId);
        else if(info.objInfo.BoType == BOTYPE.PALYER)
        {
            if(role.isFly)
            {
                monsterOffsetY = 30; 
            }
        }
        this.bubbleLayer.showBubble(info.boid,msg, role.x, role.y-monsterOffsetY);
    }

    private updateBlood(): void {

        for (let i = 0; i < SNewBattleData.instance.allBattleBo.keys.length; i++) {
            var key = SNewBattleData.instance.allBattleBo.keys[i];
            var role: FightView = SNewBattleData.instance.allBattleBo.get(key);
            var info: FightInfo = SNewBattleData.instance.allFightInfos.get(key);
            //var bodyAni:Laya.Animation = role["mBody"];
            //if(!bodyAni)
            //continue;
            //if(!bodyAni.frames||bodyAni.frames.length == 0)
            //continue;
            //if(!info&&!role)
            //continue;
            //var oneTexture:Laya.GraphicsGL = bodyAni.frames[0];
            //if(!oneTexture)
            //continue;
            //var tex:Laya.Texture = oneTexture._one[0];
            //if(!tex)
            //continue;
            var monsterOffsetY = 0
            if(info.objInfo.BoType != BOTYPE.PALYER&&info.objInfo.BoType != BOTYPE.PET&&info.objInfo.BoType != BOTYPE.COMATE)
            monsterOffsetY = BattleUtil.getFightMonsterViewOffsetY(info.objInfo.ParentObjId);
            else if(info.objInfo.BoType == BOTYPE.PALYER)
            {
                if(role.isFly)
                {
                    monsterOffsetY = 30; 
                }
            }
            if(info.dead == DEAD_TYPE.NODEAD||info.dead == DEAD_TYPE.GHOST)
            this.bloodLayer.addBlood(info.boid, role.x, role.y-monsterOffsetY, info.isMain ? 1 : 2);
        }
    }
    public removeBlood(id: number)
    {
        this.bloodLayer.removeBlood(id);
    }

    public tweenBlood(id: number, hpLeft: number, mpLeft: number, angerLeft: number): void {
        var role: FightView = SNewBattleData.instance.allBattleBo.get(id);
        if (!role) return;
        var info: FightInfo = SNewBattleData.instance.allFightInfos.get(id);
        if (!role) return;
        if(info.dead == DEAD_TYPE.INVERTED)return;
        info.objInfo.Hp = hpLeft;
        info.objInfo.Mp = mpLeft;
        info.objInfo.Anger = angerLeft;
        if(hpLeft>info.objInfo.HpLim)
        {
            hpLeft = info.objInfo.HpLim;
        }
        this.bloodLayer.tweenBlood(id, hpLeft, info.objInfo.HpLim, true);
        //info.isMain && this.bloodLayer.tweenBlood(id, mpLeft, info.objInfo.MpLim, false);//ֻ�����ͶӲŸ���mp                                         
    }

    public UpdateRoleTitle()
    { 
        for (let i = 0; i < SNewBattleData.instance.allBattleBo.keys.length; i++) {
            var key = SNewBattleData.instance.allBattleBo.keys[i]; 
            var role: FightView = SNewBattleData.instance.allBattleBo.get(key);
            if (!role) return;
            var info: FightInfo = SNewBattleData.instance.allFightInfos.get(key);
            if (!role) return;
            if (info.objInfo.GraphTitle > 0) {
                var titleVo = AchieveVo.get(info.objInfo.GraphTitle);
                    if(!titleVo)return;
                    var type = titleVo.effect[0];
                    var url: string = titleVo.effect[1];
                    var offsetX = titleVo.effect[2];
                    var offsetY = (role.isFly ? -role.offsetY : 0) + titleVo.effect[3];
                    switch(type)
                    {
                        case 1:
                        {
                            this.commonLayer.ShowIcon(key+ GameConfig.TITLE_CONST, role.x + offsetX, role.y+offsetY+GameConfig.TITLE_Y_OFFSET-10, url);
                            break;
                        }
                        case 2:
                        {
                            this.commonLayer.ShowAnimation(key + GameConfig.TITLE_CONST, role.x + offsetX, role.y+offsetY+GameConfig.TITLE_Y_OFFSET-10, url, false);
                            break;
                        }
                    }
            }
        }
       
    }

    public showSymbol(id: number, type: number): void {
        var role: FightView = SNewBattleData.instance.allBattleBo.get(id);
        if (!role) return;
        var url: string = ResUtils.getSymbolIcon(type);
        this.symbolLayer.showSymbol(url, role.x, role.y);
    }

    public showDamTxt(id: number, hp: number, mp: number, anger: number, isCrit: boolean = false): void {
        var role: FightView = SNewBattleData.instance.allBattleBo.get(id);
        if (!role) return;
        this.showHp(hp, role.x, role.y, isCrit);
        var info:FightInfo = SNewBattleData.instance.allFightInfos.get(id);//发送战斗时扣血加血事件
        if(info)
        SNewBattleData.instance.event(SNewBattleEvent.BATTLE_DAM_EVENT,[info.objInfo.BoType , -hp])
        this.showMp(mp, role.x, role.y);
        this.showAngle(anger, role.x, role.y);
    }

    public Shake()
    {
        BattleUtil.ShakeScene(this);
    }

    public setRoleToTop(fightView:FightView)
    {
        this.roleLayer.setTop(fightView);
    }

    private showHp(value: number, x: number, y: number, isCrit: boolean): void {
        if (value == 0) return;
        if (value < 0) {
            this.damLayer.showDamage("lv", "+" + Math.abs(value), x, y);
        } else {
            if(isCrit)
            this.damLayer.showDamage("huang", value.toString(), x, y, true);
            else
            this.damLayer.showDamage("hong", value.toString(), x, y, false);
        }
    }

    private showMp(value: number, x: number, y: number): void {
        if (value == 0) return;
        if (value < 0) {
            this.damLayer.showDamage("lan", "+" + Math.abs(value), x, y);
        } else {
            this.damLayer.showDamage("hong",  value.toString() , x, y)
        }
    }

    //回合数
    public showRound(curRound: number, maxRound: number,offsetX: number = 0, OffsetY: number = 140): void {
        //if(SNewBattleData.instance.CurrentBattleType == BattleMainType.PVE&&SNewBattleData.instance.CurrentBattleSubType == PveBattleSubType.ThreeDungeon)
        //{
            this.roundLayer.showText(curRound + "-" + maxRound, ResUtils.huihe, "battle/huiheshu/",offsetX,OffsetY);
        //}
        //else
        //this.roundLayer.showText(curRound.toString(), ResUtils.huihe, "battle/huiheshu/",offsetX,OffsetY);
        this.showReady();
    }

    public showReady(): void {
        var boids =  SNewBattleData.instance.getTeam(true);//我方队伍单位
        for (let i = 0; i < boids.length; i++) {
            const boid = boids[i];
            var role: FightView = SNewBattleData.instance.allBattleBo.get(boid);
            var info: FightInfo = SNewBattleData.instance.allFightInfos.get(boid);
            if(!role||(info&&info.dead == DEAD_TYPE.DISAPPEAR)||(info&&info.objInfo.BoType == BOTYPE.COMATE))
            continue;
            this.effectLayer.addEffect(boid ,role.x, role.y, ResUtils.ready, false, false);
        }
    }

    public removeReady(): void {
        this.effectLayer.removeAnimation(ResUtils.ready);
    }

    public removeOneBoidReady(boid:number)
    {
        this.effectLayer.removeAnimation(ResUtils.ready,boid);
    }


    private showAngle(value: number, x: number, y: number): void {

    }

    private loop() {
        this.updateName();
        this.updateBlood();
        this.UpdateRoleTitle();
        this.updateBubble();
        //this.playReportMachine.update();
    }
    

    private updateName() {

        for (let i = 0; i < SNewBattleData.instance.allBattleBo.keys.length; i++) {
            var key = SNewBattleData.instance.allBattleBo.keys[i];
            var role: FightView = SNewBattleData.instance.allBattleBo.get(key);
            var info: FightInfo = SNewBattleData.instance.allFightInfos.get(key);
            if(!info&&!role)
            continue;
            if(info.dead == DEAD_TYPE.NODEAD)
            {
                var buffs = role.FightBuffs.AllBuff.values;
                for (let i = 0; i < buffs.length; i++) {
                    const buff: Buff = buffs[i];
                    if (buff.NeedShow)
                    {
                        this.buffDisplay.showBuff((key*GameConfig.BUFF_CONST) + buff.Id, buff, role.x, role.y);
                    } 
                }
            }
            
            if(info.objInfo.BoType == BOTYPE.PALYER||
                info.objInfo.BoType == BOTYPE.PET||info.objInfo.BoType == BOTYPE.COMATE)
            {
                this.nameLayer.showName(key, role.info.Name, role.x, role.y+ 163);
            }
            else if(info.objInfo.BoType != BOTYPE.MONSTER)
            {
                var boss_icon =  "art/anim/role_other/boss_head.png";
                var monsterOffsetY = BattleUtil.getFightMonsterViewOffsetY(info.objInfo.ParentObjId);
                this.buffDisplay.ShowIcon(key , role.x, role.y-monsterOffsetY+10, boss_icon)
            }

        }
    }

    public removeBuff(buffId:number , boId:number)
    {
        this.buffDisplay.removeBuff((boId*GameConfig.BUFF_CONST)+buffId , buffId);
    }

    public addOneRole(fightView:FightView , boid:number , name:string , fightInfo:FightInfo)
    {
        this.roleLayer.addChild(fightView);
        fightView.isFly = fightInfo.objInfo.AerocraftNo > 0?true:false;
        fightView.updateMount(fightInfo.objInfo.AerocraftNo);
        //策划原本想让坐骑固定在原地
        //if(fightInfo.objInfo.AerocraftNo > 0)
        //{
        //    var vo:Aerocraft_starVo = Aerocraft_starVo.get(fightInfo.objInfo.AerocraftNo);
        //    if(!vo) return;
        //    var obj:ObjView = Laya.Pool.getItemByClass("ObjView", ObjView);
        //    obj.zOrder = -1;
        //    obj.resPath = vo.body_anim;
        //    obj.info = {};
        //    this.roleLayer.addChild(obj);
        //    this.roleLayer.updateZOrder();
        //    obj.angle = fightView.angle;
        //    obj.x = fightView.x;
        //    obj.y = fightView.y;
        //}
    }

    public addRoles(): void {
        for (let i = 0; i < SNewBattleData.instance.allBattleBo.keys.length; i++) {
            const key = SNewBattleData.instance.allBattleBo.keys[i];
            var fightView = SNewBattleData.instance.allBattleBo.get(key);
            var fightInfo:FightInfo = SNewBattleData.instance.allFightInfos.get(key);
            this.addOneRole(fightView,key,fightView.info.Name , fightInfo);

            //this.buffDisplay.showBuff(roles[i].info.boid + data1[j].BuffNo, data1[j].BuffNo, fight.x, fight.y);
        }
    }

    public removeRole(boId:number):void {
        var fightView = SNewBattleData.instance.allBattleBo.get(boId);
        this.roleLayer.remove(fightView);
        this.nameLayer.removeName(boId);
        this.removeBlood(boId);
        this.commonLayer.removeAnimation(boId + GameConfig.TITLE_CONST);
        this.commonLayer.removeIcon(boId + GameConfig.TITLE_CONST);
    }

    public dispose(): void {
        //GameLayer.instacne.sceneLayer.filters = [];
        this.removeReady();
        this.playReportMachine.dispose();
        this.nameLayer.clear();
        this.buffDisplay.clear();
        this.damLayer.clear();
        this.bloodLayer.clear();
        this.roundLayer.clear();
        this.commonLayer.clear();
        this.bubbleLayer.clear();
        Laya.timer.clear(this, this.loop);
        while (this.roleLayer.numChildren) {
            var role: FightView = this.roleLayer.getChildAt(0) as FightView;
            this.nameLayer.removeName(1);
            role.dispose();
        }
    }
}