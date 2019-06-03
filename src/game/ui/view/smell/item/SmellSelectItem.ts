import { BaseItem } from "../../../compent/BaseItem";
import { ItemData } from "../../../compent/data/ItemData";
import { ToolTipsEquipment } from "../../../compent/ToolTipsEquipment";
import { SBagData } from "../../../../../net/data/SBagData";
import { MsgManager } from "../../../manager/MsgManager";
import { ToolTipSmellEquip } from "../../../compent/ToolTipSmellEquip";
import { SmellSelectPanel } from "../panel/SmellSelectPanel";

export class SmellSelectItem extends Laya.View {
    public item: BaseItem;
    private box: Laya.CheckBox;
    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.item = new BaseItem();
        this.item.setItemStyle(80);
        this.addChild(this.item);

        this.box = new Laya.CheckBox();
        this.box.skin = ResUtils.getCompUIUrl("btn_select");
        this.box.stateNum = 2;
        this.addChild(this.box);
        this.box.x = this.width - this.box.width;
        this.box.selected = false;
        this.box.label = "";
        this.box.width = 30;
        this.box.height = 60;
        this.box.mouseThrough = false;
        this.box.selected = false;
        this.box.on(Laya.Event.CLICK, this, this.onChangeBox);

        this.size(90, 101);
    }

    private mData: ItemData;

    public set dataSource(data: ItemData) {
        if (!data) return;
        if (SBagData.instance.equip.isInSmellList(data.GoodsId)) {
            this.box.selected = true;
        }
        else {
            this.box.selected = false;
        }
        this.mData = data;
        this.item.itemData = this.mData;
        this.item.toolTipData = this.mData;
        // this.item.showName(this.mData.clientInfo.lv + (this.mData.IsPetEquip ? "阶" : "级"), 18, "#76420b");
        this.item.showName(this.mData.clientInfo.bag_show_lv, 18, "#76420b");
        this.item.renderClass = ToolTipSmellEquip;
        this.checkSelect();
    }

    private onChangeBox(): void {
        if (this.box.selected) {
            if (this.mData) {
                var selectedCount = SBagData.instance.equip.smellCount;
                var count = selectedCount + (this.parent.parent.parent as SmellSelectPanel).panelSelectList.length;
                if (count >= 12) {
                    this.box.selected = false;
                    MsgManager.instance.showRollTipsMsg("本次分解列表已满!");
                }
            }
            else {
                this.box.selected = false;
                MsgManager.instance.showRollTipsMsg("没有可选装备!");
            }
        }
        this.mData && (this.parent.parent.parent as SmellSelectPanel).pushSmellList(this.mData.GoodsId, this.box.selected);
    }

    public checkSelect(): void {
        if(!this.mData){
            this.box.selected = false;
            return;
        }
        var idx: number = (this.parent.parent.parent as SmellSelectPanel).panelSelectList.indexOf(this.mData.GoodsId);
        this.box.selected = idx >= 0;
    }

    public get dataSource(): ItemData {
        return this.mData;
    }
}