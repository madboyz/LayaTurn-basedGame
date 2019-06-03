import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { Pet_shouling_cfgVo } from "../../../../../db/sheet/vo/Pet_shouling_cfgVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SPetEvent } from "../../../../../net/data/SPetData";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { MsgManager } from "../../../manager/MsgManager";
import { ComateInfo } from "../data/ComateInfo";
import { SComateData, SComateEvent } from "../data/SComateData";
import { Comate_tupo_cfgVo } from "../../../../../db/sheet/vo/Comate_tupo_cfgVo";

export class ComateTupoPanel extends ui.main.PetShouLingPanelUI {
    private selectVo: ComateInfo;//当前伙伴Vo
    private item: BaseItem;//宠物点化消耗
    private expBar: ProgressBar;//点化经验条

    private loopTime: number; //自动点化的时间间隔；

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.sameLevelEliminate = false;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
        this.btn_look.on(Laya.Event.CLICK, this, this.onLook);
        this.shengjiBtn.on(Laya.Event.CLICK, this, this.shengjiBtnClick);

        SComateData.instance.on(SComateEvent.COMATE_ATTR_UPDATE,this,this.update);
        
        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.update);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.update);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.update);
    }

    public removeEvent(): void {
        this.btn_look.off(Laya.Event.CLICK, this, this.onLook);
        this.shengjiBtn.off(Laya.Event.CLICK, this, this.shengjiBtnClick);

        SComateData.instance.off(SComateEvent.COMATE_ATTR_UPDATE,this,this.update);
        
        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE, this, this.update);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE, this, this.update);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD, this, this.update);
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.initItem();
        this.initExpBar();
        this.combat.url = "res/atlas/number/fight.atlas";
        this.loopTime = ConstVo.get("AUTO_STR").val[5][1];

        this.update();
    }

    private initList(): void {
        this.attrList.renderHandler = new Laya.Handler(this, this.updateItem)
        this.attrList.vScrollBarSkin = "";
        this.attrListNext.renderHandler = new Laya.Handler(this, this.updateItemNext)
        this.attrListNext.vScrollBarSkin = "";
    }

    private initItem(): void {
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.shengjiCostBox.addChild(this.item);
            this.item.x = 45;
            this.item.y = 20;
        }
    }

    private initExpBar(): void {
        if (!this.expBar) {
            this.expBar = new ProgressBar();
            this.expBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_greenBar"), 310, 24);
            this.expBar.setLabel(1, 20, "#ffffff");
            this.expBar.x = 180;
            this.expBar.y = 623;
            this.addChild(this.expBar);
        }
    }


    public open(...args): void {
        this.initWindow(true, true, "伙伴突破", 486, 557, 160);
        this.selectVo = args[0];
        if (!(this.selectVo instanceof ComateInfo)) {
            //没有的话，设置第一个出站的宠物
            var comateData = SComateData.instance.allData;
            for (let i = 0; i < comateData.length; i++) {
                var ele = comateData[i] as ComateInfo;
                if (ele.IsHave == true) {
                    this.selectVo = ele;
                    break;
                }
            }
        }
        super.open();

        this.subTitleLb.text = "突破属性";
    }

    public update(): void {
        if (this.selectVo.IsHave) {
            this.updateCombat(this.selectVo.BaseAttribute.get(PropertyEnumCode.OI_CODE_BATTLE_POWER));
        } else {
            this.updateCombat(this.selectVo.Sheet.battle.toString());
        }
        this.updateCost();
        //点化文本
        this.shengjiLvLb.text = "突破等级" + this.selectVo.BreakLv;
        //点化进度条
        var maxExp = Comate_tupo_cfgVo.get(this.selectVo.BreakLv).exp_lim;
        this.expBar.setValue(this.selectVo.BreakExp, maxExp);
        //属性列表
        this.attrList.array = Comate_tupo_cfgVo.get(this.selectVo.BreakLv).attr;
        this.attrListNext.array = Comate_tupo_cfgVo.get(this.selectVo.BreakLv + 1).attr || [];

        //特效
        if (this._lastLv && this.selectVo.BreakLv > this._lastLv) {
            this.showUIEffect();
        }
        this._lastLv = this.selectVo.BreakLv;
    }

    //刷新战力
    public updateCombat(value: number): void {
        this.combat.text = value.toString();
    }
    //刷新消耗
    public updateCost(): void {
        var itemId = ConstVo.get("COMRADE_BREAK_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        this.item.itemCode = itemId;
        this.item.toolTipData = this.item.itemData;
        if (itemdata) {
            this.item.setAmountLabel("" + itemdata.Count, "#4e17cd");
        } else {
            this.item.setAmountLabel("0 ", "#ff0000");
        }
    }
    //属性列表
    private updateItem(cell: Laya.Box, index: number): void {
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var cfgAtt = Comate_tupo_cfgVo.get(this.selectVo.BreakLv).attr[index];

        var preStr = PropertyVo.getByInfo(cfgAtt[0]).desc;
        var subStr = cfgAtt[2] > 0 ? (cfgAtt[2] * 100 + "%") : cfgAtt[1];
        attrLb.text = preStr + " + " + subStr;
    }
    //下一级属性列表
    private updateItemNext(cell: Laya.Box, index: number): void {
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var cfgAtt = Comate_tupo_cfgVo.get(this.selectVo.BreakLv + 1).attr[index];

        var preStr = PropertyVo.getByInfo(cfgAtt[0]).desc;
        var subStr = cfgAtt[2] > 0 ? (cfgAtt[2] * 100 + "%") : cfgAtt[1];
        attrLb.text = preStr + " + " + subStr;
    }

    private isShengjiIng: boolean = false;
    //点击点化
    private shengjiBtnClick(): void {
        var itemId = ConstVo.get("COMRADE_BREAK_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具不足，无法升级");
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
        var itemId = ConstVo.get("COMRADE_BREAK_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具已用完，停止自动升级");
            this.isShengjiIng = false;
        }
        if (!this.isShengjiIng) {
            this.shengjiBtn.label = "自动升级";
            this.timer.clear(this, this.shengjiLoop);
            return;
        }
        SComateData.instance.protocol.send37014(this.selectVo.Id);
    }

    //打开查看宠物属性
    private onLook(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [this.selectVo]);
    }

    private _lastLv: number;
    //特效
    private _uiEffLayer: UIeffectLayer;
    //是否正在播放特效
    private _isPlaying: boolean = false;
    //进入战斗场景的时候播特效
    public showUIEffect(): void {
        if (this._isPlaying) {
            return;
        }
        this._isPlaying = true;
        if (!this._uiEffLayer) {
            this._uiEffLayer = new UIeffectLayer;
            this.addChild(this._uiEffLayer);
        }
        var eff = this._uiEffLayer.playEffect("ui_effect_20", 335, 635, false);
        eff.scaleX = 0.78;
        eff.once(Laya.Event.COMPLETE, this, () => {
            this._isPlaying = false;
        });
    }


    public close(): void {
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        this._lastLv = null;
        this._isPlaying = false;
        this.isShengjiIng = false;
        this.shengjiBtn.label = "自动升级";
        this.timer.clear(this, this.shengjiLoop);
        super.close();
    }

}