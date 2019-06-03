import { SBagData, SGoodsEvent } from "../../../../../net/data/SBagData";
import { ItemData } from "../../../compent/data/ItemData";
import { BaseItem } from "../../../compent/BaseItem";
import { CommonControl } from "../../../../common/control/CommonControl";
import { MsgManager } from "../../../manager/MsgManager";
import { SRoleData } from "../../../../../net/data/SRoleData";

export class EquipChangePanel extends ui.main.EquipChangePanelUI {
    public useVo: ItemData;
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
        this.initWindow(true, true, "装备替换", 486, 490, 210);
        super.open();
        this.useVo = args[0];
        this.clickIndex = -1;


        var posEquip = SBagData.instance.equip.allItems;
        this.equipDataList = [];
        for (let i = 0; i < posEquip.length; i++) {
            var element: ItemData = posEquip[i];
            if (!element) {
                continue;
            }
            if (element.clientInfo.subtype == this.useVo.clientInfo.subtype && element.isJobEquip && SRoleData.instance.info.Lv >= element.clientInfo.lv) {
                this.equipDataList.push(element);
            }
        }
        for (let i = this.equipDataList.length; i < 12; i++) {
            this.equipDataList.push(null);
        }
        this.equipDataList.sort((a: ItemData, b: ItemData): any => {
            if(!a){
                return 1;
            }
            if(!b){
                return -1;
            }
            return b.serverInfo.Quality - a.serverInfo.Quality;
        });

        this.equipList.array = this.equipDataList;

    }

    public initEvent(): void {
        this.changeBtn.on(Laya.Event.CLICK, this, this.changeBtnClick);
    }

    public removeEvent(): void {
        this.changeBtn.off(Laya.Event.CLICK, this, this.changeBtnClick);
    }

    private initList(): void {
        this.equipList.itemRender = EquipChangeItem;
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
        CommonControl.instance.onEquipInstall(changeData.GoodsId);
        this.close();
    }

    public close(): void {
        this.equipDataList = null;
        super.close();
    }

}


//竞技场对手的item
export class EquipChangeItem extends Laya.View {
    private _item: BaseItem;
    private _upImg: Laya.Image;

    constructor() {
        super();
        this.width = 100;
        this.height = 110;
        this._item = new BaseItem;
        this._item.x = 10;
        this._item.y = 10;
        this._item.setItemStyle(80);
        this.addChild(this._item);
        this._upImg = new Laya.Image;
        this._upImg.width = 12;
        this._upImg.height = 20;
        this._upImg.x = 75;
        this._upImg.y = 10;
        this._upImg.skin = "comp/img_arrowup_1.png";
        this._upImg.visible = false;
        this.addChild(this._upImg);

        this.on(Laya.Event.CLICK, this, this.thisClick);
    }

    private _mdata: ItemData;
    public set dataSource(data: ItemData) {
        this._mdata = data;
        if (!data) {
            this._upImg.visible = false;
            this._item.itemData = null;
            return;
        }
        var panel = this.parent.parent.parent as EquipChangePanel;
        var thisIndex = panel.equipDataList.indexOf(data);
        this._item.isSelect = (panel.clickIndex == thisIndex && thisIndex != -1);

        this._item.itemData = data;
        this._item.showName(data.clientInfo.lv + "级", 18, "#76420b");
        this._upImg.visible = data.serverInfo.BattlePower > panel.useVo.serverInfo.BattlePower;
    }

    public thisClick(): void {
        if (!this._mdata) {
            return;
        }
        (this.parent.parent.parent as EquipChangePanel).itemClick(this._mdata);
    }


    public destroy(): void {
        super.destroy();
    }

}