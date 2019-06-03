import { SBagData } from "../../../../../net/data/SBagData";
import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { MsgManager } from "../../../manager/MsgManager";

export class TejiQianghuaSelectPanel extends ui.main.EquipChangePanelUI {
    public equipDataList: Array<any>;
    public clickIndex = -1;

    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.update();
    }

    public update(): void {
    }

    public open(...args): void {
        this.initWindow(true, true, "选择装备", 486, 485, 230);
        super.open();
        this.clickIndex = -1;


        var posEquip = SBagData.instance.equip.allItems;
        var roleEquip = SBagData.instance.role.allItems;
        var checkList = posEquip.concat(roleEquip);
        this.equipDataList = [];
        for (let i = 0; i < checkList.length; i++) {
            var element: ItemData = checkList[i];
            if (!element) {
                continue;
            }
            if (element.serverInfo && element.serverInfo.Quality >= 6 && element.equipPos >= EquipSubType.EQ_POS1 && element.equipPos <= EquipSubType.EQ_POS6) {
                this.equipDataList.push(element);
            }
        }
        this.equipList.array = this.equipDataList;

    }

    public initEvent(): void {
        this.changeBtn.on(Laya.Event.CLICK, this, this.changeBtnClick);
    }

    public removeEvent(): void {
        this.changeBtn.off(Laya.Event.CLICK, this, this.changeBtnClick);
    }

    private initList(): void {
        this.equipList.itemRender = TejiQianghuaSelectItem;
        this.equipList.vScrollBarSkin = "";
    }

    public itemClick(itemData: ItemData): void {
        this.clickIndex = this.equipDataList.indexOf(itemData);
        this.equipList.refresh();
    }

    private changeBtnClick(): void {
        if (this.clickIndex < 0) {
            MsgManager.instance.showRollTipsMsg("请先选择一个装备");
            return;
        }
        var changeData = this.equipDataList[this.clickIndex];
        if (!changeData) {
            return;
        }
        UIManager.instance.openUI(UIID.TEJI_QIANGHUA_PANEL,[changeData]);
        this.close();
    }

    public close(): void {
        this.equipDataList = null;
        super.close();
    }

}


//竞技场对手的item
export class TejiQianghuaSelectItem extends Laya.View {
    private _item: BaseItem;

    constructor() {
        super();
        this.width = 100;
        this.height = 110;
        this._item = new BaseItem;
        this._item.x = 10;
        this._item.y = 10;
        this._item.setItemStyle(80);
        this.addChild(this._item);

        this.on(Laya.Event.CLICK, this, this.thisClick);
    }

    private _mdata: ItemData;
    public set dataSource(data: ItemData) {
        this._mdata = data;
        if (!data) {
            this._item.itemData = null;
            return;
        }
        var panel = this.parent.parent.parent as TejiQianghuaSelectPanel;
        var thisIndex = panel.equipDataList.indexOf(data);
        this._item.isSelect = (panel.clickIndex == thisIndex && thisIndex != -1);

        this._item.itemData = data;
        this._item.showName(data.clientInfo.lv + "级", 18, "#76420b");
    }

    public thisClick(): void {
        if (!this._mdata) {
            return;
        }
        (this.parent.parent.parent as TejiQianghuaSelectPanel).itemClick(this._mdata);
    }


    public destroy(): void {
        super.destroy();
    }

}