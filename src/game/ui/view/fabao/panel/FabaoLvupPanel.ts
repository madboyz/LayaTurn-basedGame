import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { Pet_dianhua_cfgVo } from "../../../../../db/sheet/vo/Pet_dianhua_cfgVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { UIeffectLayer } from "../../../../battle/scene/layer/UIeffectLayer";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { MsgManager } from "../../../manager/MsgManager";
import { SFabaoData } from "../data/SFabaoData";
import { CommonControl } from "../../../../common/control/CommonControl";
import { ToolTipsManager } from "../../../manager/ToolTipsManager";
import { DataManager } from "../../../../../message/manager/DataManager";
import { Fabao_lvup_cfgVo } from "../../../../../db/sheet/vo/Fabao_lvup_cfgVo";

export class FabaoLvupPanel extends ui.main.FabaoLvupPanelUI {
    public showListData: ItemData[] = [];
    public selectIndex: number = -1;
    private item: BaseItem;//升级消耗
    private selectItem: BaseItem;//选择道具
    private expBar: ProgressBar;//点化经验条

    private loopTime: number = 100; //自动点化的时间间隔；
    private goodsInfoDic = {};

    constructor() {
        super();
        this.initComp();
    }

    public initComp() {
        this.initEvent();
        this.initList();
        this.initExpBar();
        this.combat.url = "res/atlas/number/fight.atlas";
        this.open();
    }

    private initList(): void {
        this.itemList.itemRender = FabaoLvupItem
        this.itemList.vScrollBarSkin = "";
        this.attrList.renderHandler = new Laya.Handler(this, this.updateItem)
        this.attrList.vScrollBarSkin = "";
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.costItemBox.addChild(this.item);
        }
        if (!this.selectItem) {
            this.selectItem = new BaseItem();
            this.selectItem.setItemStyle(80);
            this.fabaoItemBox.addChild(this.selectItem);
        }
    }

    private initExpBar(): void {
        if (!this.expBar) {
            this.expBar = new ProgressBar();
            this.expBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_greenBar"), 230, 24);
            this.expBar.setLabel(1, 20, "#ffffff");
            this.expBar.setValue(0, 100);
            this.progressBarBox.addChild(this.expBar);
        }
    }


    public open(): void {
        //整理数据
        var roleAll = SBagData.instance.role.allItems;
        var equipList = [];
        for (let i = 0; i < roleAll.length; i++) {
            const element = roleAll[i];
            if (element.equipPos >= EquipSubType.EQ_JEWELRT_RING && element.equipPos <= EquipSubType.EQ_JEWELRT_PENDANT) {
                equipList.push(element);
            }
        }
        var hadList = [];
        var fabaoAll = SBagData.instance.fabao.allItems;
        for (let i = 0; i < fabaoAll.length; i++) {
            const element = fabaoAll[i];
            if (element) {
                hadList.push(element);
            }
        }
        this.showListData = [];
        this.showListData = this.showListData.concat(equipList);
        this.showListData = this.showListData.concat(hadList);

        if (this.showListData.length > 0) {
            this.selectIndex = 0;
        }
        this.updateData();
    }

    public initEvent(): void {
        this.btn_look.on(Laya.Event.CLICK, this, this.onLookProp);
        this.dianhuaBtn.on(Laya.Event.CLICK, this, this.dianhuaBtnClick);

        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.updateData);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.updateData);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.updateData);
    }
    public removeEvent(): void {
        this.btn_look.off(Laya.Event.CLICK, this, this.onLookProp);
        this.dianhuaBtn.off(Laya.Event.CLICK, this, this.dianhuaBtnClick);

        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE, this, this.updateData);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE, this, this.updateData);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD, this, this.updateData);
    }

    public updateData(): void {
        //战力
        this.combat.text = SRoleData.instance.info.BattlePower.toString();
        this.itemList.array = this.showListData;
        //显示相关
        var selectData = this.showListData[this.selectIndex];
        if (selectData) {
            if (!this.goodsInfoDic[selectData.serverInfo.GoodsId]) {
                this.goodsInfoDic[selectData.serverInfo.GoodsId] = true;
                CommonControl.instance.send15001(selectData.serverInfo.GoodsId);
                return;
            }
            if (selectData.serverInfo.AccessoryLv == null) {
                this.dianhuaBtn.gray = true;
                return;
            }
            this.selectItem.itemData = selectData;
            this.selectItem.toolTipData = selectData;
            this.lvLb.text = "淬炼等级:Lv." + selectData.serverInfo.AccessoryLv;

            var fabaoLvCfg = Fabao_lvup_cfgVo.get(selectData.serverInfo.AccessoryLv);
            this.expBar.setValue(this.showListData[this.selectIndex].serverInfo.AccessoryExp, fabaoLvCfg.exp_lim);
            this.attrList.array = fabaoLvCfg.attr;

            this.updateCost();

            this.dianhuaBtn.gray = false;

            //红点
            this.showRed();
            //特效
            if (this._lastLv && this.showListData[this.selectIndex].serverInfo.AccessoryLv > this._lastLv) {
                this.showUIEffect();
            }
            this._lastLv = this.showListData[this.selectIndex].serverInfo.AccessoryLv;
        } else {
            this.selectItem.itemData = null;
            this.lvLb.text = "";
            this.attrList.array = [];
            this.item.itemData = null;
            this.dianhuaBtn.gray = true;
        }
    }

    public showRed(): void {
    }

    public onLookProp(): void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [SRoleData.instance.info]);
    }

    public clickItem(data: ItemData): void {
        this.clear()
        this.selectIndex = this.showListData.indexOf(data);
        this.updateData();
    }

    public clear(): void {
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        this._lastLv = null;
        this._isPlaying = false;
        this.isDianhuaIng = false;
        this.dianhuaBtn.label = "自动淬炼";
        this.timer.clear(this, this.dianhuaLoop);
    }

    public destroy(): void {
        this.removeEvent();
        this.clear();
        this.goodsInfoDic = {};
        super.destroy();
    }

    //处理升级部分====================================================================
    //刷新消耗
    public updateCost(): void {
        var itemId = ConstVo.get("ACCESSORY_UPGRADE_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        this.item.itemCode = itemId;
        this.item.toolTipData = this.item.itemData;
        if (itemdata) {
            this.item.setAmountLabel("" + itemdata.Count, "#4e17cd");
        } else {
            this.item.setAmountLabel("0 ", "#ff0000");
        }
        //点化按钮红点
        var itemId = ConstVo.get("ACCESSORY_UPGRADE_GOODS_NO").val[0];
        var itemNum: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
        this.dianhuaBtn.refreshRed(itemNum > 0);
    }
    //属性列表
    private updateItem(cell: Laya.Box, index: number): void {
        var attrLb = (cell.getChildByName("attrLb") as Laya.Label);
        var cfgAtt = Fabao_lvup_cfgVo.get(this.showListData[this.selectIndex].serverInfo.AccessoryLv).attr[index];

        var preStr = PropertyVo.getByInfo(cfgAtt[0]).desc;
        var subStr = cfgAtt[2] > 0 ? (cfgAtt[2] * 100 + "%") : cfgAtt[1];
        attrLb.text = preStr + " + " + subStr;
    }


    private isDianhuaIng: boolean = false;
    //点击点化
    private dianhuaBtnClick(): void {
        var itemId = ConstVo.get("ACCESSORY_UPGRADE_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具不足，无法淬炼");
            return;
        }
        var selectData = this.showListData[this.selectIndex];
        var isMax: boolean = (selectData.serverInfo.AccessoryLv >= ConstVo.get("ACCESSORY_UPGRADE_LV_LIM").val);
        if (isMax) {
            MsgManager.instance.showRollTipsMsg("该淬炼等级已达到上限");
            return;
        }
        this.isDianhuaIng = !this.isDianhuaIng;
        if (this.isDianhuaIng) {
            this.dianhuaBtn.label = "停止淬炼";
            this.timer.loop(this.loopTime, this, this.dianhuaLoop);
            this.dianhuaLoop();
        } else {
            this.dianhuaBtn.label = "自动淬炼";
            this.timer.clear(this, this.dianhuaLoop);
        }
    }

    private dianhuaLoop(): void {
        var itemId = ConstVo.get("ACCESSORY_UPGRADE_GOODS_NO").val[0];
        var itemdata: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(itemId);
        var itemEnough: boolean = (itemdata && itemdata.Count > 0);
        if (!itemEnough) {
            GoodsUtils.CheckGotoShopByGoodsNo(itemId, 1);
            MsgManager.instance.showRollTipsMsg("道具已用完，停止自动淬炼");
            this.isDianhuaIng = false;
        }
        var selectData = this.showListData[this.selectIndex];
        var isMax: boolean = (selectData.serverInfo.AccessoryLv >= ConstVo.get("ACCESSORY_UPGRADE_LV_LIM").val);
        if (isMax) {
            MsgManager.instance.showRollTipsMsg("该淬炼等级已达到上限");
            this.isDianhuaIng = false;
        }
        if (!this.isDianhuaIng) {
            this.dianhuaBtn.label = "自动淬炼";
            this.timer.clear(this, this.dianhuaLoop);
            return;
        }
        SFabaoData.instance.protocol.send15175(this.showListData[this.selectIndex].serverInfo.GoodsId);
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
            this.progressBarBox.addChild(this._uiEffLayer);
        }
        var eff = this._uiEffLayer.playEffect("ui_effect_20", 115, 13, false);
        eff.scaleX = 0.58;
        eff.once(Laya.Event.COMPLETE, this, () => {
            this._isPlaying = false;
        });
    }


}



//道具的奖励ITEM
export class FabaoLvupItem extends ui.main.FabaoLvupItemUI {
    private _mData: ItemData;
    private item: BaseItem;//升级消耗

    constructor() {
        super();
        this.initComp();
        this.on(Laya.Event.CLICK, this, this.lookBtnClick);
    }

    private initComp(): void {
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.itemBox.addChild(this.item);
        }
    }

    public set dataSource(data: ItemData) {
        if (!data) return;
        this._mData = data;
        var panel = (this.parent.parent.parent as FabaoLvupPanel);
        var index = panel.showListData.indexOf(this._mData);
        this.selectImg.visible = panel.selectIndex == index;
        //道具
        this.item.itemData = data;
        this.item.toolTipData = data;

        this.nameLb.text = data.clientInfo.name
        this.typeLb.text = "类型:" + data.SubTypeDes;
        var isEquip: boolean = false;
        //整理数据
        var roleAll = SBagData.instance.role.allItems;
        for (let i = 0; i < roleAll.length; i++) {
            const element = roleAll[i];
            if (element == data) {
                isEquip = true;
                break;
            }
        }
        this.getImg.visible = isEquip;
    }

    public lookBtnClick(): void {
        (this.parent.parent.parent as FabaoLvupPanel).clickItem(this._mData);
    }

    public destroy(): void {
        super.destroy()
    }

}