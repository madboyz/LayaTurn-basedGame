import { Comate_mingge_hole_cfgVo } from "../../../../../db/sheet/vo/Comate_mingge_hole_cfgVo";
import { Comate_lieming_cfgVo } from "../../../../../db/sheet/vo/Comate_lieming_cfgVo";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { SBagData } from "../../../../../net/data/SBagData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { SRechargeData } from "../../recharge/data/SRechargeData";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { MsgManager } from "../../../manager/MsgManager";
import { SComateData, SComateEvent } from "../data/SComateData";
import { MinggeItem } from "../data/MinggeItem";
import { MinggeInfo } from "../data/MinggeInfo";

export class ComateLiemingPanel extends ui.main.ComateLiemingPanelUI {
    private costItem1: BaseItem;
    private goldSelect: boolean = false;
    private loopTime: number = 250; //自动点化的时间间隔；
    private showIngList: MinggeInfo[];//现在显示的列表

    private flyingItems: ComateLiemingFlyItem[] = [];

    constructor() {
        super();
        this.mResouce = [
            { url: "res/atlas/comate.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.costItem1 = new BaseItem();
        this.costItem1._hideBg = true;
        this.costItem1.setItemStyle(50);
        this.itemIconBox1.addChild(this.costItem1);

        this.itemList.itemRender = ComateLiemingItem;
    }

    public open(...args): void {
        this.initWindow(true, true, "猎命", 550, 750, 50);
        super.open();
        SComateData.instance.protocol.send37029();
        this.goldSelect = false;
        this.showIngList = SComateData.instance.minggePoolList.concat();
        this.updateAll();
    }

    public updateAll(): void {
        this.updateData();
        this.updateList();
    }

    public updateData() {
        //道具消耗
        var cfg = Comate_lieming_cfgVo.get(1);
        var baseItem: ItemData = new ItemData(cfg.goods_list[0][0]);
        var godItem: ItemData = new ItemData(cfg.goods_list_2[0][0]);
        this.itemLb1.text = "x" + SBagData.instance.prop.getItemCountByGoodsNo(cfg.goods_list[0][0]);
        this.itemLb2.text = "x" + GMath.GetChineseNumber(SRoleData.instance.getMoneyByType(cfg.goods_list_2[0][0]));
        this.itemIcon1.skin = "";
        this.costItem1.itemData = baseItem;
        this.costItem1.toolTipData = baseItem;
        this.itemIcon2.skin = ResUtils.getItemIcon(godItem.clientInfo.icon);
        //消耗列表相关状态
        for (let i = 1; i <= 5; i++) {
            var costIcon = this["costIcon" + i] as Laya.Image;
            var headIcon = this["headIcon" + i] as Laya.Image;
            var costLb = this["costLb" + i] as Laya.Text;
            var nameLb = this["nameLb" + i] as Laya.Text;

            var useCfg = Comate_lieming_cfgVo.get(i);
            var useItemCfg = useCfg[this.goldSelect ? "goods_list_2" : "goods_list"][0];
            costIcon.skin = ResUtils.getItemIcon(this.goldSelect ? godItem.clientInfo.icon : baseItem.clientInfo.icon);
            headIcon.gray = !SComateData.instance.checkCanClickLieming(i);
            costLb.text = "x" + useItemCfg[1];
            nameLb.text = cfg.name;
        }

        //按钮相关状态
        this.goldSelectBtn.selected = this.goldSelect;
    }

    public updateList(addInfo: MinggeInfo = null): void {
        //列表
        if (addInfo) {
            this.showIngList.push(addInfo);
        }
        var tempList = this.showIngList.concat();
        tempList.length = 20;
        this.itemList.array = tempList;

    }


    public initEvent(): void {
        this.btn_addGold.on(Laya.Event.CLICK, this, this.addGoldClick);
        this.goldSelectBtn.on(Laya.Event.CLICK, this, this.goldSelectBtnClick);
        this.liemingBtn.on(Laya.Event.CLICK, this, this.liemingBtnClick);
        this.allGetBtn.on(Laya.Event.CLICK, this, this.allGetBtnClick);

        this.headIcon1.on(Laya.Event.CLICK, this, this.doLieming, [1]);
        this.headIcon2.on(Laya.Event.CLICK, this, this.doLieming, [2]);
        this.headIcon3.on(Laya.Event.CLICK, this, this.doLieming, [3]);
        this.headIcon4.on(Laya.Event.CLICK, this, this.doLieming, [4]);
        this.headIcon5.on(Laya.Event.CLICK, this, this.doLieming, [5]);

        SComateData.instance.on(SComateEvent.LIEMING_CAN_CLICK_CHANGE, this, this.updateData);
        SComateData.instance.on(SComateEvent.LIEMING_ITEM_INFO_BACK, this, this.liemingInfoBack);
        SComateData.instance.on(SComateEvent.LIEMING_POOL_CHANGE, this, this.resetAll);
    }

    public removeEvent(): void {
        this.btn_addGold.off(Laya.Event.CLICK, this, this.addGoldClick);
        this.goldSelectBtn.off(Laya.Event.CLICK, this, this.goldSelectBtnClick);
        this.liemingBtn.off(Laya.Event.CLICK, this, this.liemingBtnClick);
        this.allGetBtn.off(Laya.Event.CLICK, this, this.allGetBtnClick);

        this.headIcon1.off(Laya.Event.CLICK, this, this.doLieming);
        this.headIcon2.off(Laya.Event.CLICK, this, this.doLieming);
        this.headIcon3.off(Laya.Event.CLICK, this, this.doLieming);
        this.headIcon4.off(Laya.Event.CLICK, this, this.doLieming);
        this.headIcon5.off(Laya.Event.CLICK, this, this.doLieming);

        SComateData.instance.off(SComateEvent.LIEMING_CAN_CLICK_CHANGE, this, this.updateData);
        SComateData.instance.off(SComateEvent.LIEMING_ITEM_INFO_BACK, this, this.liemingInfoBack);
        SComateData.instance.off(SComateEvent.LIEMING_POOL_CHANGE, this, this.resetAll);
    }


    private ClickNpc: number = 0;
    public liemingInfoBack(liemingInfo: MinggeInfo): void {
        this.updateData();

        var item = new ComateLiemingFlyItem;
        this.addChild(item);
        this.flyingItems.push(item);
        item.dataSource = liemingInfo;
        item.x = 44 - 102 + this.ClickNpc * 102;
        item.y = 618;
        this.flyItems(item, liemingInfo);

        if (this.isDianhuaIng) {
            this.timer.once(this.loopTime, this, this.doLieming);
        }
    }

    public flyItems(item: ComateLiemingFlyItem, liemingInfo: MinggeInfo): void {
        var toIndex = SComateData.instance.minggePoolList.indexOf(liemingInfo);
        var toX = 53 + (toIndex % 5) * 93;
        var toY = 162 + Math.floor(toIndex / 5) * 115;
        Laya.Tween.to(item, { x: toX, y: toY }, 500, null, Laya.Handler.create(this, this.itemFlyOver, [item, liemingInfo]))
    }

    public itemFlyOver(item: ComateLiemingFlyItem, liemingInfo: MinggeInfo): void {
        var index = this.flyingItems.indexOf(item);
        this.flyingItems.splice(index, 1);
        item.destroy();
        this.updateList(liemingInfo);
    }

    // public liemingDataBack(): void {
    //     this.updateData();
    //     if (this.isDianhuaIng) {
    //         this.timer.once(this.loopTime, this, this.doLieming);
    //     }
    // }

    private allGetBtnClick(): void {
        this.isDianhuaIng = false;
        this.liemingBtn.label = "一键猎命";
        this.timer.clear(this, this.doLieming);
        SComateData.instance.protocol.send37028();
    }

    private addGoldClick(): void {
        SRechargeData.instance.checkOpenRecharge();
    }

    private goldSelectBtnClick(): void {
        this.isDianhuaIng = false;
        this.liemingBtn.label = "一键猎命";
        this.timer.clear(this, this.doLieming);
        this.goldSelect = !this.goldSelect;
        this.updateData();
    }

    //自动猎命------------
    private isDianhuaIng: boolean = false;
    //点击点化
    private liemingBtnClick(): void {
        if (this.goldSelect) {
            var cfg = Comate_lieming_cfgVo.get(1);
            var itemId = cfg.goods_list_2[0][0];
            var itemCount: number = SRoleData.instance.getMoneyByType(cfg.goods_list_2[0][0])
            var itemEnough: boolean = (itemCount >= cfg.goods_list_2[0][1]);
        } else {
            var cfg = Comate_lieming_cfgVo.get(1);
            var itemId = cfg.goods_list[0][0];
            var itemCount: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
            var itemEnough: boolean = (itemCount >= cfg.goods_list[0][1]);

        }
        if (!itemEnough) {
            MsgManager.instance.showRollTipsMsg("道具不足，无法猎命");
            return;
        }
        if (SComateData.instance.minggePoolList.length >= 20) {
            MsgManager.instance.showRollTipsMsg("猎命池已满，无法继续猎命");
            return;
        }
        this.isDianhuaIng = !this.isDianhuaIng;
        if (this.isDianhuaIng) {
            this.liemingBtn.label = "停止点化";
            this.doLieming();
        } else {
            this.liemingBtn.label = "一键猎命";
        }
    }

    private doLieming(index: number = -1): void {
        if (index < 0) {
            index = SComateData.instance.maxLiemingCanClick;
        }
        if (!SComateData.instance.checkCanClickLieming(index)) {
            return;
        }
        this.ClickNpc = index;
        if (this.goldSelect) {
            var cfg = Comate_lieming_cfgVo.get(1);
            var itemId = cfg.goods_list_2[0][0];
            var itemCount: number = SRoleData.instance.getMoneyByType(cfg.goods_list_2[0][0])
            var itemEnough: boolean = (itemCount >= cfg.goods_list_2[0][1]);
        } else {
            var cfg = Comate_lieming_cfgVo.get(1);
            var itemId = cfg.goods_list[0][0];
            var itemCount: number = SBagData.instance.prop.getItemCountByGoodsNo(itemId);
            var itemEnough: boolean = (itemCount >= cfg.goods_list[0][1]);
        }
        if (!itemEnough) {
            MsgManager.instance.showRollTipsMsg("道具不足，无法猎命");
            this.isDianhuaIng = false;
            this.liemingBtn.label = "一键猎命";
            return;
        }
        if (SComateData.instance.minggePoolList.length >= 20) {
            MsgManager.instance.showRollTipsMsg("猎命池已满，无法猎命");
            this.isDianhuaIng = false;
            this.liemingBtn.label = "一键猎命";
            return;
        }
        SComateData.instance.protocol.send37023(index, this.goldSelect ? 1 : 0);
    }

    public resetAll(): void {
        for (let i = 0; i < this.flyingItems.length; i++) {
            const element = this.flyingItems[i];
            element.destroy();
        }
        this.flyingItems = [];
        this.showIngList = SComateData.instance.minggePoolList.concat();
        this.updateAll();
    }


    public close(): void {
        this.isDianhuaIng = false;
        this.liemingBtn.label = "一键猎命";
        this.resetAll();
        super.close();
    }

}


export class ComateLiemingItem extends MinggeItem {
    public showBg: boolean = true;

    constructor() {
        super();
        this.isShowToolTip = true;
    }

}

export class ComateLiemingFlyItem extends MinggeItem {
    public hasLvLb: boolean = false;
    constructor() {
        super();
    }
}