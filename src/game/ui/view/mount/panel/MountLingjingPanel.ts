import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { Mount_lingjing_cfgVo } from "../../../../../db/sheet/vo/Mount_lingjing_cfgVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SMountData, SMountEvent } from "../../../../../net/data/SmountData";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { MountInfo } from "../../../compent/data/MountInfo";
import { ProgressBar } from "../../../compent/ProgressBar";
import { MsgManager } from "../../../manager/MsgManager";
import { MountEquipPart } from "./MountEquipPart";

export class MountLingjingPanel extends ui.main.MountLingjingPanelUI {
    private equipPart: MountEquipPart;//坐骑装备
    private mountInfo: MountInfo;
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

        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.update);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.update);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.update);

        SMountData.instance.on(SMountEvent.MOUNT_EQUIP_REFRESH, this, this.update);//宠物装备更新
    }

    public removeEvent(): void {
        this.btn_look.off(Laya.Event.CLICK, this, this.onLook);
        this.shengjiBtn.off(Laya.Event.CLICK, this, this.shengjiBtnClick);

        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE, this, this.update);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE, this, this.update);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD, this, this.update);

        SMountData.instance.off(SMountEvent.MOUNT_EQUIP_REFRESH, this, this.update);//宠物装备更新
    }

    public initComp() {
        super.initComp();
        this.initEquip();
        this.initList();
        this.initItem();
        this.initExpBar();
        this.combat.url = "res/atlas/number/fight.atlas";
        this.loopTime = ConstVo.get("AUTO_STR").val[5][1];

        this.update();
    }

    private initEquip(): void {
        if (!this.equipPart) {
            this.equipPart = new MountEquipPart();
            this.equipBox.addChild(this.equipPart);
        }
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
            this.expBar.y = 658;
            this.addChild(this.expBar);
        }
    }


    public open(...args): void {
        this.initWindow(true, true, "坐骑灵境", 486, 657, 110);
        this.mountInfo = SMountData.instance.curInfo;
        super.open();
    }

    public update(): void {
        this.updateCost();
        //点化文本
        this.shengjiLvLb.text = "灵境等级" + this.mountInfo.SpiritLv;
        //点化进度条
        var maxExp = Mount_lingjing_cfgVo.get(this.mountInfo.SpiritLv).exp_lim;
        this.expBar.setValue(this.mountInfo.SpiritExp, maxExp);
        //属性列表
        this.attrList.array = Mount_lingjing_cfgVo.get(this.mountInfo.SpiritLv).attr;
        this.attrListNext.array = Mount_lingjing_cfgVo.get(this.mountInfo.SpiritLv + 1).attr || [];
        //战力
        this.combat.text = this.mountInfo.BattlePower.toString();
        //特效
        if (this._lastLv && this.mountInfo.SpiritLv > this._lastLv) {
            this.showUIEffect();
        }
        this._lastLv = this.mountInfo.SpiritLv;
        //更新装备
        this.updateEquip();
    }

    //更新装备
    public updateEquip(): void {
        this.equipPart.updateAllEquip();
    }
    //刷新消耗
    public updateCost(): void {
        var itemId = ConstVo.get("AEROCRAFT_SPIRIT_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        this.item.itemCode = itemId;
        this.item.toolTipData = this.item.itemData;
        if (itemdata) {
            this.item.setAmountLabel("" + itemdata.Count, "#4e17cd");
        } else {
            this.item.setAmountLabel("0 ", "#ff0000");
        }
        this.shengjiBtn.refreshRed(itemdata != null);
    }
    //属性列表
    private updateItem(cell: Laya.Box, index: number): void {
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var cfgAtt = Mount_lingjing_cfgVo.get(this.mountInfo.SpiritLv).attr[index];

        var preStr = PropertyVo.getByInfo(cfgAtt[0]).desc;
        var subStr = cfgAtt[2] > 0 ? (cfgAtt[2] * 100 + "%") : cfgAtt[1];
        attrLb.text = preStr + " + " + subStr;
    }
    //下一级属性列表
    private updateItemNext(cell: Laya.Box, index: number): void {
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var cfgAtt = Mount_lingjing_cfgVo.get(this.mountInfo.SpiritLv + 1).attr[index];

        var preStr = PropertyVo.getByInfo(cfgAtt[0]).desc;
        var subStr = cfgAtt[2] > 0 ? (cfgAtt[2] * 100 + "%") : cfgAtt[1];
        attrLb.text = preStr + " + " + subStr;
    }

    private isShengjiIng: boolean = false;
    //点击点化
    private shengjiBtnClick(): void {
        var itemId = ConstVo.get("AEROCRAFT_SPIRIT_GOODS_NO").val[0];
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
        var itemId = ConstVo.get("AEROCRAFT_SPIRIT_GOODS_NO").val[0];
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
        SMountData.instance.protocol.send60006();
    }

    //打开查看宠物属性
    private onLook(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [SMountData.instance.curInfo]);
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
        var eff = this._uiEffLayer.playEffect("ui_effect_20", 335, 670, false);
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