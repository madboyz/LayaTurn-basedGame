import { SRoleEvent } from './../../../../../net/data/SRoleData';
import { TabBar } from './../../../compent/TabBar';
import { FactionVo } from '../../../../../db/sheet/vo/FactionVo';
import { Debug } from '../../../../../debug/Debug';
import { FliterManager } from '../../../manager/FliterManager';
import { MsgManager } from '../../../manager/MsgManager';
import { Delay } from '../../../../../framework/utils/Delay';
import { BattleUtil } from '../../../../battle/BattleUtil';
import { FightPlayerView } from '../../../../battle/role/fight/FightPlayerView';
import { HtmlUtils } from '../../../../utils/HtmlUtils';
import { UIeffectLayer } from '../../../../battle/scene/layer/UIeffectLayer';
import { GameUtils } from '../../../../utils/GameUtils';

export class CreateRolePanel extends ui.main.CreateRoleUI {
    private mSexTab: TabBar;
    private mFactionTab: TabBar;
    private mRoleview1: FightPlayerView;
    private mRoleview2: FightPlayerView;
    //private readonly mRace = [1,1,2,2,3,3];//1人2魔3仙
    private readonly mImages = [["humen_men.png", "humen_women.png"], ["god_men.png", "god_women.png"]];

    private mCurrentName: string = "test";
    private mCurrentSex = 1;
    private mCurrentRace = 1;
    private mCurrentFaction = 1;
    constructor() {
        super();
        this.isFullScreen = true;
        this.mResouce = [
            //面板需要的ui资源
            //{ url: "res/atlas/createRole.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/createRole1.atlas", type: Laya.Loader.ATLAS },
        ];

    }

    public initComp() {
        super.initComp();
        this.showUIEffect();
        //TODO:第一次打开面板初始化面板信息/aa
        this.mouseThrough = true;
        this.mSexTab = new TabBar([this.manBtn, this.womanBtn]);
        this.mFactionTab = new TabBar([this.Role1, this.Role2]);
        this.mRoleview1 = this.CreatePlayerView(135, Laya.stage.height - 128, 1);
        this.mRoleview2 = this.CreatePlayerView(460, Laya.stage.height - 128, 2);
        this.mRoleview1.updateMount(5);
        this.mRoleview2.updateMount(5);
        this.updateRole(this.mRoleview1, 1);
        this.updateRole(this.mRoleview2, 2);
        this.CheckGary();
        this.mSexTab.select = 0;
        this.mFactionTab.select = 0;
        // this.Role1.label = FactionVo.get(1).introductions;
        // this.Role2.label = FactionVo.get(2).introductions;
        Laya.timer.frameOnce(2, this, () => {
            this.mRoleview1.x = this.Role1.x + this.Role1.width / 2;
            this.mRoleview2.x = this.Role2.x + this.Role2.width / 2;
            this.mRoleview1.y = this.Role1.y + this.Role1.height / 2 + 40;
            this.mRoleview2.y = this.Role2.y + this.Role2.height / 2 + 40;
        });
        Laya.timer.loop(1000, this, this.FalsePlayerEnter);
        this.OnNameBtn();
    }

    private CreatePlayerView(x: number, y: number, faction: number): FightPlayerView {
        var fight: FightPlayerView = Laya.Pool.getItemByClass("FightPlayerView", FightPlayerView);
        fight.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        var weapon = FactionVo.get(faction).weapon_anim;
        var infoData = BattleUtil.getFightViewInfo(1, this.mCurrentSex, faction, weapon, 1, 1, "", 0);
        fight.info = infoData;
        fight.Faction = faction;
        fight.x = x;
        fight.y = y;
        fight.scaleX = fight.scaleY = 0.7;
        fight.angle = 45;
        fight.action = Action.stand;
        fight.isFly = true;
        this.addChild(fight);
        return fight;
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
    }

    public open(...args): void {
        super.open();

    }

    public initEvent(): void {
        this.CreateBtn.on(Laya.Event.CLICK, this, this.OnClickCreateBtn);
        this.mSexTab.on(Laya.Event.CHANGE, this, this.onSexChange);
        this.mFactionTab.on(Laya.Event.CHANGE, this, this.onFactionChange);
        this.NameBtn.on(Laya.Event.CLICK, this, this.OnNameBtn);
        //TODO:初始化面板监听
    }

    private FalsePlayerEnter() {
        var show = GMath.randRange(1, 2) == 1 ? true : false;
        if (!show)
            return;
        var sex = GMath.randRange(1, 2) == 1 ? 1 : 2;
        var name = GameUtils.RandNameBySex(sex);
        var str = HtmlUtils.addColor("玩家&nbsp;", "#ffffff", 20) + HtmlUtils.addColor(name, "#00ff00", 20) + HtmlUtils.addColor("&nbsp;正在进入游戏", "#ffffff", 20);
        MsgManager.instance.showRollTipsMsg(str);
    }

    private OnNameBtn() {
        this.NameInput.text = GameUtils.RandNameBySex(this.mCurrentSex);
    }


    private updateRole(player: FightPlayerView, forceSex = 1) {
        player.info.Sex = forceSex;
        player.info.Weapon = FactionVo.get(player.info.Faction).weapon_anim;
        player.updateSkin();
    }

    private onSexChange(index: number, btn: Laya.Button) {
        this.mCurrentSex = index + 1;
        this.OnNameBtn();
        this.CheckRole();
        this.updateRole(this.mRoleview1, this.mCurrentSex);
        this.updateRole(this.mRoleview2, this.mCurrentSex);
    }

    private onFactionChange(index: number, btn: Laya.Button) {
        this.mCurrentFaction = index + 1;
        /**
         * 2018/11/29 10:27 孝鹏要求没有性别按钮只有两个职业跟对应的1个形象
         */
        this.mCurrentSex = index + 1;
        this.OnNameBtn();


        this.CheckGary();
        this.CheckRole();
    }

    private CheckGary() {
        if (this.mRoleview1 != null) {
            if (this.mCurrentFaction == 1) {
                this.mRoleview1.filters = [];
                this.wordImg1.gray = false;
            }
            else {
                var GrayFilter: Laya.ColorFilter = new Laya.ColorFilter(ResUtils.colorMatrix);
                this.mRoleview1.filters = [GrayFilter];
                this.wordImg1.gray = true;
            }
        }

        if (this.mRoleview2 != null) {
            if (this.mCurrentFaction == 2) {
                this.mRoleview2.filters = [];
                this.wordImg2.gray = false;
            }
            else {
                var GrayFilter: Laya.ColorFilter = new Laya.ColorFilter(ResUtils.colorMatrix);
                this.mRoleview2.filters = [GrayFilter];
                this.wordImg2.gray = true;
            }
        }

    }

    private CheckRole() {
        var name = "bg/" + this.mImages[this.mCurrentFaction - 1][this.mCurrentSex - 1];
        this.playerImage.skin = name;
    }

    private OnClickCreateBtn() {
        if (FliterManager.instance.isHaveFilterTxt(this.NameInput.text)) {
            MsgManager.instance.showRollTipsMsg("名字含有敏感词！");
            return;
        }
        this.mCurrentName = this.NameInput.text;
        this.event(SRoleEvent.ROLE_REQUEST_CREATEROLE, [[this.mCurrentRace, this.mCurrentSex, this.mCurrentFaction, this.mCurrentName, "ios"]]);//创建角色
    }

    public removeEvent(): void {
        this.mSexTab.off(Laya.Event.CHANGE, this, this.onSexChange);
        this.mFactionTab.off(Laya.Event.CHANGE, this, this.onFactionChange);
        this.CreateBtn.off(Laya.Event.CLICK, this, this.OnClickCreateBtn);
        this.NameBtn.off(Laya.Event.CLICK, this, this.OnNameBtn);
        //TODO:移除面板监听
    }

    public close(): void {
        Laya.timer.clear(this, this.FalsePlayerEnter);
        if (this.mRoleview1 != null) {
            this.removeChild(this.mRoleview1);
        }
        if (this.mRoleview2 != null) {
            this.removeChild(this.mRoleview2);
        }
        this.mRoleview1 = null;
        this.mRoleview2 = null;
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        super.close();
        // for (let i = 0; i < this.mResouce.length; i++) {
        //     Laya.loader.clearRes(this.mResouce[i]);
        // }
        //TODO:关闭面板处理
    }

    //特效
    private _uiEffLayer: UIeffectLayer;
    //进入战斗场景的时候播特效
    public showUIEffect(): void {
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.addChild(this._uiEffLayer);
        }
        this.timer.frameOnce(5,this,()=>{
            var eff = this._uiEffLayer.playEffect("ui_effect_25", 350, 650, true);
            eff.rotation = 15;
        })
        this._uiEffLayer.playEffect("ui_effect_25", 350, 250, true);
    }

}