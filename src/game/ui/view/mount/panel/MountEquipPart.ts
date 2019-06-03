import { SBagData } from "../../../../../net/data/SBagData";
import { S15000_1 } from "../../../../../net/pt/pt_15";
import { DisplayUtils } from "../../../../utils/DisplayUtils";
import { ItemData } from "../../../compent/data/ItemData";
import { PetInfo } from "../../../compent/data/PetInfo";
import { PetEquipItem } from "../../pet/item/PetEquipItem";
import { MountInfo } from "../../../compent/data/MountInfo";
import { SMountData } from "../../../../../net/data/SmountData";
import { CommonControl } from "../../../../common/control/CommonControl";

export class MountEquipPart extends Laya.Sprite {
    protected _equipmentList: Array<any>;
    protected _equipTypeList: Array<any>;
    protected _btn: component.ScaleButton;

    private mountInfo: MountInfo;

    constructor() {
        super();
        this.resetEquipListPos();
        this.creatBtn();
        this.createEquipList();
    }

    public resetEquipListPos(): void {
        this._equipTypeList = [];
        this._equipTypeList[EquipSubType.EQ_POS1] = { x: 0, y: 0, type: PetEquipSubType.PEQP_T_NECKLACE }; //项圈
        this._equipTypeList[EquipSubType.EQ_POS2] = { x: 95, y: 0, type: PetEquipSubType.PEQP_T_AMULET }; //护符
        this._equipTypeList[EquipSubType.EQ_POS3] = { x: 190, y: 0, type: PetEquipSubType.PEQP_T_ARMOR }; //护甲
    }

    public creatBtn(): void {
        if (!this._btn) {
            this._btn = new component.ScaleButton();
            this._btn.skin = ResUtils.getCompUIUrl("btn_common");
            this._btn.stateNum = 3;
            this._btn.labelSize = 16;
            this._btn.labelColors = "#8e5213,#04681c,#8d8071";
            this._btn.sizeGrid = "14,38,24,36";
            this._btn.labelPadding = "-3,0,0,0";
            this._btn.anchorX = 0.5;
            this._btn.anchorY = 0.5;
            this._btn.x = 310;
            this._btn.y = 40;
            this._btn.width = 80;
            this._btn.height = 40;
            this._btn.label = "一键装备";
            this._btn.refreshRed(true);
            this._btn.on(Laya.Event.CLICK, this, this.btnClick);
            this.addChild(this._btn);
        }
    }

    public createEquipList(): void {
        this._equipmentList = [];

        var len: number = this._equipTypeList.length;
        var equipItem: PetEquipItem;
        for (var i: number = 1; i < len; i++) {
            equipItem = new PetEquipItem();
            equipItem.setItemStyle(80);
            equipItem.x = this._equipTypeList[i].x;
            equipItem.y = this._equipTypeList[i].y;
            equipItem.type = this._equipTypeList[i].type;
            equipItem.isShowJob = false;
            this.addChild(equipItem);
            this._equipmentList.push(equipItem);
        }
    }

    //更新装备数据
    public updateAllEquip(): void {
        this.mountInfo = SMountData.instance.curInfo;
        for (let i = 1; i < this._equipTypeList.length; i++) {
            var type = this._equipTypeList[i].type;
            var equip: S15000_1 = SBagData.instance.mountEquip.getPetEquip(type);
            var hasBetterEquip = SBagData.instance.mountEquip.checkOneCanEquip(type);
            var item: PetEquipItem = this._equipmentList[i - 1];
            if (equip) {
                var itemdata = new ItemData(equip);
                item.itemData = itemdata;
                item.toolTipData = itemdata;
            } else {
                item.itemData = null;
                item.toolTipData = null;
            }
            item.showRed(hasBetterEquip);
        }
        this._btn.visible = false;
        for (let j = 1; j < this._equipTypeList.length; j++) {
            var type = this._equipTypeList[j].type;
            var showBtn = SBagData.instance.mountEquip.checkOneCanEquip(type);
            if (showBtn) {
                this._btn.visible = true;
                break;
            }
        }

    }

    public updateRed(): void {

    }

    public btnClick(): void {
        for (let j = 1; j < this._equipTypeList.length; j++) {
            var type = this._equipTypeList[j].type;
            var betterItem: ItemData = SBagData.instance.mountEquip.findOneCanEquip(type);
            if (betterItem) {
                CommonControl.instance.onEquipInstall(betterItem.GoodsId, 0, 3);
            }
        }
    }

    public dispose(): void {
        DisplayUtils.removeArray(this._equipmentList);
        DisplayUtils.removeArray(this._equipTypeList);
        this.removeSelf();
    }
}