import { PetInfo } from "../../../compent/data/PetInfo";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { Pet_cultivateVo } from "../../../../../db/sheet/vo/Pet_cultivateVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { SPetEvent } from "../../../../../net/data/SPetData";
import { ProgressBar } from "../../../compent/ProgressBar";
import { MsgManager } from "../../../manager/MsgManager";
import { PetRefineItem } from "../item/PetRefineItem";
import { Pet_refineVo } from "../../../../../db/sheet/vo/Pet_refineVo";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { GoodsUtils } from "../../../../utils/GoodsUtils";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class PetRefinePanel extends ui.main.PetRefinePanelUI {
    private selectVo: PetInfo;
    private item: BaseItem;
    private _curIndex: number = 0;
    public _isAuto: boolean;
    constructor() {
        super();
    }

    public initComp(): void {
        HtmlUtils.setHtml(this.txt_m.style, 6, 20, "center", "middle");
        this.initList();
        this.initItem();
        this.initEvent();
    }

    private initItem(): void {
        if (!this.item) {
            this.item = new BaseItem();
            this.item.setItemStyle(80);
            this.addChild(this.item);
            this.item.x = 123;
            this.item.y = 499;
        }
    }

    private initList(): void {
        this.barList.itemRender = PetRefineItem;
        this.barList.array = [PropertyEnumCode.OI_CODE_HP_LIM, PropertyEnumCode.OI_CODE_PHY_ATT, PropertyEnumCode.OI_CODE_MAG_ATT, PropertyEnumCode.OI_CODE_PHY_DEF, PropertyEnumCode.OI_CODE_MAG_DEF];
        this.barList.selectEnable = true;
        this.barList.selectHandler = Laya.Handler.create(this, this.onBarChange, null, false);
    }

    private initEvent(): void {
        this.btn_auto.on(Laya.Event.CLICK, this, this.onTen);
    }

    private removeEvent(): void {
        this.btn_auto.off(Laya.Event.CLICK, this, this.onTen);
    }

    public updatePetInfo(vo: PetInfo): void {
        if (vo.active) {
            if ((this.selectVo && this.selectVo.PartnerId != vo.PartnerId) || (!this.selectVo)) {
                this.selectVo = vo;
                this.isStarAuto = false;
                this.updateRefineData();
            }
        }
    }

    public updateData(): void {

    }

    private updateRed(): void {
        if (this.selectItem.goodsNo > 0) {
            if (this.allNum >= 1 && this.selectItem) {
                this.btn_auto.refreshRed(true);
            }
            else {
                this.btn_auto.refreshRed(false);
            }
        }
        else {
            this.btn_auto.refreshRed(false);
        }
    }

    private updateRefineData(): void {
        this.updateInfo();
        this.updateListData();
    }

    private updateListData(): void {
        this.barList.refresh();
        if (this.barList.selectedIndex != this._curIndex) {
            this.barList.selectedIndex = this._curIndex;
        }
        else {
            this.onBarChange();
        }
    }

    public updateInfo(): void {
        if (this.selectVo.active) {
            this.parent && this.parent["updateCombat"](this.selectVo.BattlePower);
        }
        else {
            this.parent && this.parent["updateCombat"](this.selectVo.vo.battle);
        }
        this.parent && this.parent["updateCombatPos"](166, true);
        this.txt_lv_and_floor.text = this.selectVo.vo.name + " Lv." + this.selectVo.Lv + (this.selectVo.layerName == "" ? "" : "   " + this.selectVo.layerName);
    }

    private allNum: number;
    public updateCost(): void {
        this.updateItemdata();
    }

    private updateItemdata() {
        if (this.selectItem) {
            if (this.selectItem.goodsNo > 0) {
                this.item.itemCode = this.selectItem.goodsNo;
                this.item.toolTipData = this.item.itemData;
                // this.txt_name.text = this.item.itemData.clientInfo.name;
                this.allNum = SBagData.instance.prop.getItemCountByGoodsNo(this.selectItem.goodsNo);
                if (this.allNum >= 1) {
                    this.txt_m.innerHTML = HtmlUtils.addColor(this.allNum.toString() + "/" + "1", "#04a30a", 20);
                }
                else {
                    this.txt_m.innerHTML = HtmlUtils.addColor(this.allNum.toString() + "/" + "1", "#ff0000", 20);
                }
            }
            else {
                this.item.itemData = null;
                this.txt_m.innerHTML = "";
                // this.txt_name.text = "";
            }
        }
        this.updateRed();
    }

    private changeSelect(): void {
        var i: number = 0, cells: Array<any> = this.barList.cells, len: number = cells.length, cell: any;
        for (i; i < len; i++) {
            cell = cells[i];
            cell && cell.checkSelect(this.oldItem);
        }
        this.updateItemdata();
    }

    private clearActiveItem(): void {
        if (this.item) {
            this.item.dispose();
            this.item.removeSelf();
            this.item = null;
        }
    }

    public onUpdateRefine(): void {
        this.updateRefineData();
        if (this.isStarAuto) {
            var delayTime = ConstVo.get("AUTO_STR").val[3][1];
            Laya.timer.once(delayTime, this, this.onSendRequestLevel);
        }
    }

    public stopAuto(): void {
        Laya.timer.clear(this, this.onSendRequestLevel);
    }

    public set isStarAuto(value: boolean) {
        if (value) {
            if (this._isAuto) {
                this._isAuto = false;
                this.btn_auto.label = "自动炼化";
                this.stopAuto();
            }
            else {
                this._isAuto = true;
                this.btn_auto.label = "停止";
                this.startAuto();
            }
        }
        else {
            this._isAuto = false;
            this.btn_auto.label = "自动炼化";
            this.stopAuto();
        }
    }

    public get isStarAuto(): boolean {
        return this._isAuto;
    }

    public startAuto(): void {
        this.onSendRequestLevel();
    }

    public onSendRequestLevel(): void {
        if (this.selectItem.goodsNo > 0) {
            if (this.allNum >= 1 && this.selectItem) {
                this.parent.event(SPetEvent.PET_REQUEST_REFINE, [[this.selectVo.PartnerId, this.selectItem.goodsNo, this.selectItem.atrrName, 1]]);
            }
            else {
                this.isStarAuto = false;

                var needNum = 1;
                GoodsUtils.CheckGotoShopByGoodsNo(this.item.itemData.GoodsNo, needNum);
                MsgManager.instance.showRollTipsMsg("您得材料不足！");
            }
        }
        else {
            this.isStarAuto = false;
            MsgManager.instance.showRollTipsMsg("您得属性已经炼化到最高级了！");
        }
    }

    private onTen(): void {
        if (!this.isStarAuto) {
            this.isStarAuto = true;
        }
        else {
            this.isStarAuto = false;
        }
    }

    private oldItem: Array<Pet_refineVo>;
    private selectItem: PetRefineItem;
    private onBarChange(): void {
        this.selectItem = this.barList.getCell(this.barList.selectedIndex) as PetRefineItem;
        this.oldItem = this.barList.selectedItem;
        this._curIndex = this.barList.selectedIndex;
        Laya.timer.callLater(this, this.changeSelect);
        // this.changeSelect();
    }

    private onSelectBar(): void {
        this.changeSelect();
    }

    public removeSelf(): any {
        this._isAuto = false;
        this._curIndex = 0;
        this.selectVo = null;
        this.clearActiveItem();

        Laya.timer.clear(this, this.onSendRequestLevel);
        Laya.timer.clear(this, this.changeSelect);
        this.removeEvent();
        super.removeSelf();
    }
}