import { FightComateView } from "../../../../battle/role/fight/FightComateView";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { BaseItem } from "../../../compent/BaseItem";
import { ProgressBar } from "../../../compent/ProgressBar";
import { MsgManager } from "../../../manager/MsgManager";
import { SComateData, SComateEvent } from "../data/SComateData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { ItemData } from "../../../compent/data/ItemData";
import { SBagData } from "../../../../../net/data/SBagData";
import { Comate_lvup_cfgVo } from "../../../../../db/sheet/vo/Comate_lvup_cfgVo";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class ComateLvUpPanel extends ui.main.ComateLvUpPanelUI {
    constructor() {
        super();
        this.sameLevelEliminate = false;
        this.isShowEffect = false;
        this.mResouce = [

            { url: "res/atlas/pet.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private item: BaseItem;//宠物点化消耗
    private expBar: ProgressBar;//点化经验条

    private loopTime: number; //自动点化的时间间隔；
    private costItemId: number;//升级消耗的道具;

    private FightComateObj: FightComateView;
    private starSImage = [];

    //特效
    private _uiEffLayer: UIeffectLayer;
    //是否正在播放特效
    private _isPlaying: boolean = false;

    public initComp() {
        super.initComp();
        this.combat.url = "res/atlas/number/fight.atlas";
        this.loopTime = ConstVo.get("AUTO_STR").val[8][1];
        this.costItemId = ConstVo.get("GAME_COMRADE_GOODS_TO_EXP").val[0];

        for (let i = 0; i < 5; i++) {
            const element = this.Stars.getChildByName(`star${i}`);
            this.starSImage.push(element);
        }
        this.FightComateObj = Laya.Pool.getItemByClass("FightComateView", FightComateView);
        this.FightComateObj.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.FightComateObj.x = 287;
        this.FightComateObj.y = 435;
        this.addChild(this.FightComateObj);
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.shengjiCostBox.addChild(this.item);
            this.item.x = 30;
            this.item.y = 12;
        }
        if (!this.expBar) {
            this.expBar = new ProgressBar();
            this.expBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_greenBar"), 370, 24);
            this.expBar.setLabel(1, 20, "#ffffff");
            this.expBar.x = 140;
            this.expBar.y = 600;
            this.addChild(this.expBar);
        }
    }
    public showUIEffect(): void {
        var nowLv = SComateData.instance.CurrentComate.getBaseAttributeValue(PropertyEnumCode.OI_CODE_lv) || 1;
        if(nowLv == this._lastLv||this._lastId != SComateData.instance.CurrentComate.Id)
        return;
        if (this._isPlaying) {
            return;
        }
        this._isPlaying = true;
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.addChild(this._uiEffLayer);
        }
        var eff = this._uiEffLayer.playEffect("ui_effect_10", 285, 360, false);
        var eff1 = this._uiEffLayer.playEffect("ui_effect_20", 323, 612, false);
        eff1.scaleX = 0.91;
        eff.once(Laya.Event.COMPLETE, this, () => {
            this._isPlaying = false;
        });
        this.FightComateObj && this.setChildIndex(this.FightComateObj,this.numChildren - 1); //有宠物的情况，把宠物挪到上面一层
    }
    

    private _lastLv: number;
    private _lastId: number;
    public open(...args): void {
        super.open();
        this.SelectUpdate();
    }

    public initEvent(): void {
        // this.GetText.on(Laya.Event.CLICK, this, this.onClickGet);
        this.shengjiBtn.on(Laya.Event.CLICK, this, this.shengjiBtnClick);
        this.btn_look.on(Laya.Event.CLICK, this, this.OpenComateAttr);
    }

    public removeEvent(): void {
        // this.GetText.off(Laya.Event.CLICK, this, this.onClickGet);
        this.shengjiBtn.off(Laya.Event.CLICK, this, this.shengjiBtnClick);
        this.btn_look.off(Laya.Event.CLICK, this, this.OpenComateAttr);
    }

    private shengjiBtnBtnClick(): void {
        if (SComateData.instance.CurrentComate.IsHave == false) {
            MsgManager.instance.showRollTipsMsg("未激活！");
            return;
        }
        this.event(SComateEvent.COMATE_REQUEST_LVUP);
    }
    

    public SelectUpdate(stopUping: boolean = false) {
        if (stopUping) {
            this.isShengjiIng = false;
        }
        this.updateBattle();
        this.updateStar();
        this.updateName();
        this.updateFightComate();
        this.updateCost();
        this.showRed();
        //升级进度条
        var nowLv = SComateData.instance.CurrentComate.getBaseAttributeValue(PropertyEnumCode.OI_CODE_lv) || 1;
        var nowExp = SComateData.instance.CurrentComate.getBaseAttributeValue(PropertyEnumCode.OI_CODE_EXP) || 0;
        var maxExp = Comate_lvup_cfgVo.get(nowLv).exp;
        this.expBar.setValue(nowExp, maxExp);
        this.shengjiLvLb.text = "Lv." + nowLv;
    }

    public showRed():void{
        this.shengjiBtn.refreshRed(SComateData.instance.CurrentComate.canLevel);
    }

    private OpenComateAttr(): void {
        if (SComateData.instance.CurrentComate == null)
            return;
        if (!SComateData.instance.CurrentComate.IsHave) {
            MsgManager.instance.showRollTipsMsg("伙伴还未激活！");
            return;
        }
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [SComateData.instance.CurrentComate]);
    }

    //刷新消耗
    public updateCost(): void {
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(this.costItemId);
        this.item.itemCode = this.costItemId;
        this.item.toolTipData = this.item.itemData;
        if (itemdata) {
            this.item.setAmountLabel("" + itemdata.Count, "#4e17cd");
        } else {
            this.item.setAmountLabel("0 ", "#ff0000");
        }
    }

    public updateName() {
        if (SComateData.instance.CurrentComate == null || this.comateNameLb == null)
            return;
        this.comateNameLb.text = SComateData.instance.CurrentComate.Sheet.name;
    }

    public updateFightComate() {
        if (SComateData.instance.CurrentComate == null || this.FightComateObj == null)
            return;
        if (this.FightComateObj.info == null) {
            this.FightComateObj.info = {};
        }
        this.FightComateObj.info.ParentPartnerNo = SComateData.instance.CurrentComate.No;
        this.FightComateObj.updateSkin();
        this.FightComateObj.scaleX = this.FightComateObj.scaleY = 1;
    }

    public updateStar() {
        if (SComateData.instance.CurrentComate == null || this.starSImage.length == 0)
            return;
        this.Stars.width = SComateData.instance.CurrentComate.StarLv * 21;
        for (let i = 0; i < this.starSImage.length; i++) {
            const star = this.starSImage[i];
            if (SComateData.instance.CurrentComate == null) {
                star.visible = false;
            }
            else {
                if (SComateData.instance.CurrentComate.StarLv > i)
                    star.visible = true;
                else
                    star.visible = false;
            }
        }
    }

    public updateBattle() {
        
        if (SComateData.instance.CurrentComate == null || this.combat == null)
        return;
        
        this.sp_combat.visible = SComateData.instance.CurrentComate.IsHave;
        this.addChild(this.pingfenLb);
        this.pingfenLb.text = "评分:" + SComateData.instance.CurrentComate.Sheet.battle.toString();
        
        var bat = SComateData.instance.CurrentComate.BaseAttribute.get(PropertyEnumCode.OI_CODE_BATTLE_POWER);
        if (bat != null && bat != 0)
            this.combat.text = bat.toString();
        else
            this.combat.text = SComateData.instance.CurrentComate.Sheet.battle.toString();
    }

    private isShengjiIng: boolean = false;
    //点击升级
    private shengjiBtnClick(): void {
        if (SComateData.instance.CurrentComate == null)
            return;
        if (!SComateData.instance.CurrentComate.IsHave) {
            MsgManager.instance.showRollTipsMsg("伙伴还未激活！");
            return;
        }
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(this.costItemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            var needNum =  1;
            GoodsUtils.CheckGotoShopByGoodsNo(this.costItemId,needNum);
            MsgManager.instance.showRollTipsMsg("道具不足，无法升级");
            return;
        }
        var nowLv = SComateData.instance.CurrentComate.getBaseAttributeValue(PropertyEnumCode.OI_CODE_lv) || 1;
        if ((SRoleData.instance.info.Lv + 0) <=  nowLv) {
            MsgManager.instance.showRollTipsMsg("伙伴已达到等级上限");
            return;
        }
        this.isShengjiIng = !this.isShengjiIng;
        if (this.isShengjiIng) {
            this.shengjiBtn.label = "停止升级";
            this.timer.loop(this.loopTime, this, this.shengjiLoop);
            this.shengjiLoop();
        } else {
            this.shengjiBtn.label = "自动升级";
            this.timer.clear(this, this.shengjiLoop);
        }
    }

    private shengjiLoop(): void {
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(this.costItemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            var needNum =  1;
            GoodsUtils.CheckGotoShopByGoodsNo(this.costItemId,needNum);
            MsgManager.instance.showRollTipsMsg("道具已用完，停止自动升级");
            this.isShengjiIng = false;
        }
        var nowLv = SComateData.instance.CurrentComate.getBaseAttributeValue(PropertyEnumCode.OI_CODE_lv) || 1;
        if ((SRoleData.instance.info.Lv + 0) <=  nowLv) {
            MsgManager.instance.showRollTipsMsg("伙伴已达到等级上限");
            this.isShengjiIng = false;
        }
        if (!this.isShengjiIng) {
            this.shengjiBtn.label = "自动升级";
            this.timer.clear(this, this.shengjiLoop);
            return;
        }
        this._lastLv = SComateData.instance.CurrentComate.getBaseAttributeValue(PropertyEnumCode.OI_CODE_lv) || 1;
        this._lastId = SComateData.instance.CurrentComate.Id;
        this.event(SComateEvent.COMATE_REQUEST_LVUP, SComateData.instance.CurrentComate.Id);
    }



    public close(): void {
        this.isShengjiIng = false;
        this.shengjiBtn.label = "自动升级";
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
            this._isPlaying = false;
        }
        this.timer.clear(this, this.shengjiLoop);
        super.close();
    }
}
