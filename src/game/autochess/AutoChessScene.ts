import { BaseScene } from "../battle/scene/BaseScene";
import { FightPlayerView } from "../battle/role/fight/FightPlayerView";
import { RoleLayer } from "../battle/scene/layer/RoleLayer";
import { RoleOtherLayer } from "../battle/scene/layer/RoleOtherLayer";
import { BloodLayer } from "../battle/scene/layer/BloodLayer";
import { NameLayer } from "../battle/scene/layer/NameLayer";
import { SkillNameLayer } from "../battle/scene/layer/SkillNameLayer";
import { AttackSymbolLayer } from "../battle/scene/layer/AttackSymbolLayer";
import { DamageLayer } from "../battle/scene/layer/DamageLayer";
import { EffectLayer } from "../battle/scene/layer/EffectLayer";
import { BuffDisplayer } from "../battle/scene/layer/BuffLayer";
import { CommonLayer } from "../battle/scene/layer/CommonLayer";
import { Delay } from "../../framework/utils/Delay";
import { SceneManager } from "../battle/scene/SceneManager";
import { GameLayer } from "../../GameLayer";
import { SPetData } from "../../net/data/SPetData";
import { S20007_1 } from "../../net/pt/pt_20";
import { FightInfo } from "../battle/model/FightInfo";
import { BattleUtil } from "../battle/BattleUtil";
import { AutoFightView } from "./AutoFightView";
import { PetVo } from "../../db/sheet/vo/PetVo";
import { Debug } from "../../debug/Debug";
import { AutoChessGrid, AutoChessAStar } from "./AutoChessAStar";

export class AutoChessScene extends BaseScene {
    public localPlayer: FightPlayerView;
    public localPets:Laya.Dictionary;
    public enemyPlayer: FightPlayerView;
    public enemyPets:Laya.Dictionary;
    private roleLayer: RoleLayer;
    private roleOtherLayer: RoleOtherLayer;
    public BgSprite:Laya.Sprite;//背景
    private bloodLayer: BloodLayer;
    private nameLayer: NameLayer;
    private girds:Array<Laya.Image>;
    public skillNameLayer: SkillNameLayer;
    private symbolLayer: AttackSymbolLayer;
    private damLayer: DamageLayer;
    public effectLayer: EffectLayer;
    private buffDisplay: BuffDisplayer;
    public view:ui.main.AutoChessUI;
    private commonLayer:CommonLayer;//通用层级在玩家上面
    private girdsY:Array<number>;
    private girdsInfo:Laya.Dictionary;
    private autoChessGrid:AutoChessGrid;
    private aStar:AutoChessAStar = new AutoChessAStar();
    private readonly GirdPivot = new Laya.Point(49,28);//寻路需要锚点 摆格子需要对应的方向
    constructor() {
        super();
        this.localPets = new Laya.Dictionary();
        this.enemyPets = new Laya.Dictionary();
        this.autoChessGrid = new AutoChessGrid(8,10);
        var path = "bg/grid_bg.png";
        var t: Laya.Texture = Laya.Loader.getRes(path);
        var THIS = this;
        if(!t)
        {
            Laya.loader.load(path, Laya.Handler.create(this, function (): void {//加载获取资源 
                t = Laya.Loader.getRes(path);
                if(t)
                {
                    t.width = Laya.stage.width;
                    t.height = Laya.stage.height;
                    THIS.BgSprite.texture = t;
                }
                
            }));
        }
        else
        {
            t.width = Laya.stage.width;
            t.height = Laya.stage.height;
            this.BgSprite.texture = t;
        }
    }

    protected initLayer(): void {
        super.initLayer();
        this.BgSprite = new Laya.Sprite();
        this.roleLayer = new RoleLayer();
        this.view = new ui.main.AutoChessUI();
        this.view.StartBtn.visible = false;
        this.addChild(this.BgSprite);
        this.view.width = Laya.stage.width;
        this.view.height = Laya.stage.height;
        this.addChild(this.view);
        this.bloodLayer = new BloodLayer();
        this.buffDisplay = new BuffDisplayer();
        this.effectLayer = new EffectLayer();
        this.symbolLayer = new AttackSymbolLayer();
        this.skillNameLayer = new SkillNameLayer();
        this.commonLayer = new CommonLayer();
        this.nameLayer = new NameLayer();
        this.roleOtherLayer = new RoleOtherLayer();
        this.view.box.addChild(this.roleOtherLayer);
        this.view.box.addChild(this.buffDisplay.backLayer);
        this.view.box.addChild(this.nameLayer);
        this.view.box.addChild(this.roleLayer);
        this.view.box.addChild(this.commonLayer);
        this.view.box.addChild(this.bloodLayer);
        this.view.box.addChild(this.buffDisplay.forwardLayer);
        this.view.box.addChild(this.effectLayer);
        this.view.box.addChild(this.symbolLayer);
        this.view.box.addChild(this.skillNameLayer);
        this.view.box.addChild(this.damLayer);
        this.girds = new Array<Laya.Image>();
        this.girdsInfo = new Laya.Dictionary();
        this.girdsY = new Array<number>();
        
        var path = [];
        path.push(0, 35);
        path.push(71, 0);
        path.push(139, 32);
        path.push(68, 67);
        for (let i = 1; i <= 80; i++) {
            const gird = this.view.box.getChildByName(`gird${i}`) as Laya.Image;
            gird.hitArea = new Laya.HitArea();
            this.girdsY.push(gird.y);
            this.girds.push(gird);  
            var graphics: Laya.Graphics = new Laya.Graphics();
            graphics.drawPoly(0, 0, path, "#00b007");
            gird.hitArea.hit = graphics;
            //gird.graphics = graphics;
            this.girdsInfo.set(i,null);
            gird.y = Laya.stage.height;
        }
        
        this.view.ScrollArea.hScrollBarSkin = "";
        this.view.ScrollArea.vScrollBarSkin = "";
        this.view.ScrollArea.hScrollBar.elasticBackTime = 50;
        this.view.ScrollArea.vScrollBar.elasticBackTime = 50;
        Laya.timer.once(2, this, () => {
            this.view.ScrollArea.hScrollBar.value = (this.view.box.width - Laya.stage.width)/2;
        });
    }

    protected initEvent(): void {
        super.initEvent();
        this.view.BackBtn.on(Laya.Event.CLICK,this,this.ExitScene);
        for (let i = 0; i < this.girds.length; i++) {
            const gird = this.girds[i];
            gird.on(Laya.Event.CLICK,this,this.onClickGrid,[i]);
        }
        this.view.StartBtn.on(Laya.Event.CLICK,this,this.onClickStart);
    }

    protected removeEvent(): void {
        super.removeEvent();
        this.view.BackBtn.off(Laya.Event.CLICK,this,this.ExitScene);
        this.view.StartBtn.off(Laya.Event.CLICK,this,this.onClickStart);
    }

    private onClickStart()
    {
        /*开始一回合*/
        //先这是a星不可走的点其实就是怪物所在位置
        //const key = this.localPets.keys[0];
        //const player = this.localPets.get(key); 
        //this.GetTargetRangeEmptyGird(player,this.enemyPets.values);
        this.RangeAttackTarget();
    }

    private ExitScene()
    {
        SceneManager.instance.ExitSpecialScene();
    }

    public async InitAuto()
    {
        for (let i = 0; i < this.girds.length; i++) {
            const gird = this.girds[i];
            var _y = this.girdsY[i];
            Laya.Tween.to(gird, {y:_y}, 300, Laya.Ease.backOut);
            await Delay.delay(20);
        }
        await Delay.delay(300);
        var pets = SPetData.instance.fightList;
        for (let i = 0; i < pets.length; i++) {
            const pet = pets[i];
            //**伪造数据 */
            var data:S20007_1 = new S20007_1();
            data.ParentObjId = pet.PartnerNo;
            data.ParentPartnerNo = pet.PartnerNo;
            data.BoType = 2;
            data.BoId = pet.PartnerNo;
            data.Name = pet.Name;
            data.Hp = pet.Hp;
            data.HpLim = pet.HpLim;
            var fight = Laya.Pool.getItemByClass("AutoFightView", AutoFightView) as AutoFightView;
            var fightInfo = Laya.Pool.getItemByClass("FightInfo", FightInfo) as FightInfo;
            fightInfo.isMain = true
            fightInfo.Side = 1;
            fightInfo.objInfo = data;
            var infoData = BattleUtil.getFightViewInfo(data.ParentObjId, data.Sex, data.Faction, data.Weapon, data.LookIdx, data.ParentPartnerNo, data.Name, data.Clothes);
            fight.info = infoData;
            fight.angle = -180;
            fight.action = Action.stand;
            fight.defaultSkin();
            this.localPets.set(data.BoId,fight);
            this.roleLayer.addChild(fight);
            var index = this.girds.length-1 - i;
            var grid = this.girds[index];
            infoData.Index = index;
            infoData.Target = null;//设置要攻击的主目标
            this.girdsInfo.set(index,{fight:fight,grid:grid});
            var pos = new Laya.Point (grid.x + this.GirdPivot.x , grid.y +this.GirdPivot.y);
            fight.x =fight.px =fight.OriginalX =  pos.x;
            fight.y =fight.py =fight.OriginalY =  pos.y;
        }
        this.TestEnemy();
        this.view.StartBtn.visible = true;
        
        for (let i = 0; i < this.enemyPets.keys.length; i++) {
            const key = this.enemyPets.keys[i];
            var _fight = this.enemyPets.get(key);
            var _index = _fight.info.Index;
            var point = this.GetGirdByIndex(_index);
            this.autoChessGrid.setWalkable(point.x , point.y , false);
        }
        this.mapReader();
    }
    //随机要攻击的目标并随机出目标附近的可移动的格子
    private RangeAttackTarget()
    {
        for (let i = 0; i < this.localPets.keys.length; i++) {
            const key = this.localPets.keys[i];
            const player = this.localPets.get(key); 
            //var randIndex = GMath.randRange(0,this.enemyPets.keys.length-1);
            //var randKey = this.enemyPets.keys[randIndex];
            //var target = this.enemyPets.get(randKey);
            this.GetTargetRangeEmptyGird(player,this.enemyPets.values)
        }

        //for (let i = 0; i < this.enemyPets.keys.length; i++) {
        //    const key = this.enemyPets.keys[i];
        //    const player = this.enemyPets.get(key); 
        //    var randIndex = GMath.randRange(0,this.localPets.keys.length-1);;
        //    var randKey = this.localPets.keys[randIndex];
        //    var target = this.localPets.get(randKey);
        //}
    }
    /**
     * 找出对象附近的空格子（可以移动到个格子）
     * @param fight 
     */
    private GetTargetRangeEmptyGird(self:AutoFightView,targets:Array<AutoFightView>)
    {
        var targetIndex = GMath.randRange(0,targets.length-1);
        var fight = targets[targetIndex];
        var TargetGird = this.GetFightViewInsideGrid(fight);
        if(TargetGird == -1)return;
        //判断8个方向是否有空位
        var up =  TargetGird - 8;
        var down = TargetGird + 8;
        var left = TargetGird - 1;
        var right = TargetGird + 1;
        //var lu = up - 1;
        //var ru = up + 1;
        //var ld = down - 1;
        //var rd = down - 1;
        //var directions = [up,down,left,right,lu,ru,ld,rd];
        var directions = [up,down,left,right];
        var finalIndex = -1;
        while(directions.length > 0)
        {
            var randIndex = GMath.randRange(0,directions.length-1);
            var index = directions[randIndex];
            if(index >= 0 && index <= this.girds.length)
            {
                var same = false;
                for (let i = 1; i < this.localPets.keys.length; i++) {
                    const key = this.localPets.keys[i];
                    const player = this.localPets.get(key); 
                    if(player.info.Index == index)
                    {
                        same = true;
                        break;
                    }
                }
                for (let i = 0; i < this.enemyPets.keys.length; i++) {
                    const key = this.enemyPets.keys[i];
                    const player = this.enemyPets.get(key); 
                    {
                        if(player.info.Index == index)
                        {
                            same = true;
                            break;
                        }
                    }
                }
                if(!same)
                {
                    finalIndex = index;
                    break;
                }
            }
            directions.splice(randIndex,1);
        }

        if(finalIndex != -1)
        {
            //this.onClickGrid(finalIndex);
            var endPos = this.GetGirdByIndex(finalIndex);
            this.autoChessGrid.setEndNode(endPos.x, endPos.y);
            //this.autoChessGrid.setWalkable(endPos.x , endPos.y , false);
            var startIndex = self.info.Index;
            var startPos = this.GetGirdByIndex(startIndex);
            fight.info.Index = finalIndex;
            //this.autoChessGrid.setWalkable(startPos.x , startPos.y , true);
            this.autoChessGrid.setStartNode(startPos.x, startPos.y);
            if(this.aStar.findPath(this.autoChessGrid))
            {
                var path = [];
                for (let i = 0; i < this.aStar.path.length; i++) {
                    const element = this.aStar.path[i];
                    var _index = element.y*8+element.x;
                    var grid = this.girds[_index];
                    var px = grid.x+this.GirdPivot.x;
                    var py = grid.y+this.GirdPivot.y;
                    path.push({x:px,y:py});
                }
                self.ptachTo(path);
            }
        }
    }

    private TestEnemy()
    {
        var petNos = [13,32,30,24,23,22];
        petNos = GMath.Shuffle(petNos);
        for (let i = 0; i < 5; i++) {
            var data:S20007_1 = new S20007_1();
            var PartnerNo = petNos[i];
            var petVo = PetVo.get(PartnerNo);
            data.ParentObjId = PartnerNo;
            data.ParentPartnerNo = PartnerNo;
            data.BoType = 2;
            data.BoId = PartnerNo*2000;
            data.Name = petVo.name;
            data.HpLim = GMath.randRange(3000,10000);
            data.Hp = data.HpLim;
            var fight = Laya.Pool.getItemByClass("AutoFightView", AutoFightView) as AutoFightView;
            var fightInfo = Laya.Pool.getItemByClass("FightInfo", FightInfo) as FightInfo;
            fightInfo.isMain = false;
            fightInfo.Side = 2;
            fightInfo.objInfo = data;
            var infoData = BattleUtil.getFightViewInfo(data.ParentObjId, data.Sex, data.Faction, data.Weapon, data.LookIdx, data.ParentPartnerNo, data.Name, data.Clothes);
            fight.info = infoData;
            fight.angle = 45;
            fight.action = Action.stand;
            fight.defaultSkin();
            //**设置初始所在格子 */
            infoData.Index = i;
            infoData.Target = null;//设置要攻击的主目标
            this.enemyPets.set(data.BoId,fight);
            this.roleLayer.addChild(fight);
            var grid = this.girds[i];
            this.girdsInfo.set(i,{fight:fight,grid:grid});
            var pos = new Laya.Point (grid.x + this.GirdPivot.x , grid.y +this.GirdPivot.y);
            fight.x =fight.px =fight.OriginalX =  pos.x;
            fight.y =fight.py =fight.OriginalY =  pos.y;
        }
    }

    protected loop(): void {
        super.loop();    
        if(this.nameLayer == null)return;
        for (let i = 0; i < this.localPets.keys.length; i++) {
            const key = this.localPets.keys[i];
            const player = this.localPets.get(key); 
            player.x = player.px;
            player.y = player.py;
            this.nameLayer.showName(key, player.info.Name, player.x, player.y + 165);
        }    
          
        for (let i = 0; i < this.enemyPets.keys.length; i++) {
            const key = this.enemyPets.keys[i];
            const player = this.enemyPets.get(key); 
            player.x = player.px;
            player.y = player.py;
            this.nameLayer.showName(key, player.info.Name, player.x, player.y + 165);
        }
        this.roleLayer.update();
    }

    private GetFightViewInsideGrid(fight:AutoFightView):number
    {
        var index = -1;
        if(!fight)return;
        for (let i = 0; i < this.girds.length; i++) {
            const gird = this.girds[i];
            var area:Laya.HitArea = gird.hitArea;
            var x = Math.abs(fight.x - gird.x);
            var y = Math.abs(fight.y - gird.y);
            var isInside = area.contains(x, y);
            if(isInside)
            {
                index = i;
                break;
            }
        }
        return index;
    }
    /**
     * 从一维转二维
     * @param index 
     */
    private GetGirdByIndex(index:number):Laya.Point
    {
        var x = index%8;
        var y = Math.floor(index/8);
        return new Laya.Point(x,y);
    }

    private onClickGrid(pos:number)
    {
        Debug.serverLog(`index = ${pos}`);
        var obj = this.girdsInfo.get(pos);
        if(obj&&obj.fight) return;
        //for (let i = 0; i < this.localPets.keys.length; i++) {
        //    const key = this.localPets.keys[i];
        //    var fight = this.localPets.get(key);
        //    var index = fight.info.Index;
        //    var point = this.GetGirdByIndex(index);
        //    if(i == 0)
        //    this.autoChessGrid.setWalkable(point.x , point.y , true);
        //    else
        //    this.autoChessGrid.setWalkable(point.x , point.y , false);
        //}

        //const key = this.localPets.keys[0];
        //var fight = this.localPets.get(key);


        //var endPos = this.GetGirdByIndex(pos);
        //this.autoChessGrid.setEndNode(endPos.x, endPos.y);
        ////this.autoChessGrid.setWalkable(endPos.x , endPos.y , false);
        //var startIndex = fight.info.Index;
        //var startPos = this.GetGirdByIndex(startIndex);
        //fight.info.Index = pos;
        ////this.autoChessGrid.setWalkable(startPos.x , startPos.y , true);
        //this.autoChessGrid.setStartNode(startPos.x, startPos.y);
        //var aStar:AutoChessAStar = new AutoChessAStar();
        //if(aStar.findPath(this.autoChessGrid))
        //{
        //    var path = [];
        //    for (let i = 0; i < aStar.path.length; i++) {
        //        const element = aStar.path[i];
        //        var index = element.y*8+element.x;
        //        var grid = this.girds[index];
        //        var px = grid.x+this.GirdPivot.x;
        //        var py = grid.y+this.GirdPivot.y;
        //        path.push({x:px,y:py});
        //    }
        //    fight.ptachTo(path);
        //}
    }

    protected mapReader() {
        super.mapReader();
        //this.localPlayer = new FightPlayerView();
        //this.roleLayer.add(this.localPlayer); 
        this.initEvent();
    }

    public dispose(): void {
        super.dispose();
        this.nameLayer.clear();
        this.roleOtherLayer.clear();
        this.commonLayer.clear();
        this.roleLayer.clear();
        this.localPets.clear();
        this.enemyPets.clear();
        GameLayer.instacne.sceneLayer.removeChild(this);
    }
}