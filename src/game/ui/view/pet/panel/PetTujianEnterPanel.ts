import { SPetData, SPetEvent } from "../../../../../net/data/SPetData";
import { PetInfo } from "../../../compent/data/PetInfo";
import { PetItem } from "../item/PetItem";
import { Pet_tujian_cfgVo } from "../../../../../db/sheet/vo/Pet_tujian_cfgVo";
import { SBagData } from "../../../../../net/data/SBagData";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { PetVo } from "../../../../../db/sheet/vo/PetVo";

export class PetTujianEnterPanel extends ui.main.PetTujianEnterPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.update();
    }

    private initList(): void {
        this.itemList.itemRender = PetTujianEnterItem;
        this.itemList.vScrollBarSkin = "";
    }

    public open(...args): void {
        this.initWindow(true, true, "宠物图鉴", 486, 500, 170);
        super.open();
    }

    public update(): void {
        this.itemList.array = SPetData.instance.allData;
    }

    public close(): void {
        super.close();
    }

}


//道具的奖励ITEM
export class PetTujianEnterItem extends Laya.View {
    private petItem: PetItem;

    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.thisClick);
        this.init();
    }

    init(): void {
        this.petItem = new PetItem();
        this.petItem.setItemStyle(80);
        this.petItem.x = 20;
        this.addChild(this.petItem);
        this.size(120, 100);
    }

    private _mdata: PetInfo;
    public set dataSource(data: PetInfo) {
        if (!data) {
            return;
        }
        this._mdata = data;
        this.petItem.info = data;
        this.petItem._bitmap.gray = !data.active;
        this.petItem._bg.gray = !data.active;
        var petCfg = data.vo;
        this.petItem.showName(petCfg.name, 18, "#b2660d");
        //显示道具
        if (this._mdata.active && this._mdata.PartnerNo > 0) {
            var cfg = Pet_tujian_cfgVo.getByLv(this._mdata.PartnerNo, 1);
            var haveNum = SBagData.instance.prop.getItemCountByGoodsNo(cfg.cost[0]);
            this.petItem.setAmountLabel("" + haveNum, haveNum > 0 ? "#4e17cd" : "#ff0000");
            this.petItem.showRed(haveNum > 0);
        } else {
            this.petItem.setAmountLabel("", "#4e17cd");
            this.petItem.showRed(false);
        }

    }

    private thisClick(): void {
        if (this._mdata.active) {
            UIManager.instance.openUI(UIID.SYS_PETTUJIAN_PANEL, [this._mdata]);
        } else {
            var mainPanel = this.parent.parent.parent as PetTujianEnterPanel;
            mainPanel.close();
            SPetData.instance.event(SPetEvent.PET_UPDATE_PANEL_SELECT, this._mdata);
        }
    }

}