import { ItemData } from "../../../compent/data/ItemData";
import { DisplayUtils } from "../../../../utils/DisplayUtils";
import { PetInfo } from "../../../compent/data/PetInfo";
import { SBagData } from "../../../../../net/data/SBagData";
import { S15000_1 } from "../../../../../net/pt/pt_15";
import { CommonControl } from "../../../../common/control/CommonControl";
import { PetEquipItem } from "../../pet/item/PetEquipItem";
import { ToolTipsOtherEquipment } from "./ToolTipsOtherEquipment";
import { S17028_5 } from "../../../../../net/pt/pt_17";

export class OtherPetEquipPart extends Laya.Sprite {
    protected _equipmentList: Array<any>;
    protected _equipTypeList: Array<any>;

    private selectVo: PetInfo;

    constructor() {
        super();
        this.resetEquipListPos();
        this.createEquipList();
    }

    public resetEquipListPos(): void {
        var leftX: number = 0;
        var rightX: number = 355;
        this._equipTypeList = [];
        this._equipTypeList[EquipSubType.EQ_POS1] = { x: leftX, y: 0, type: PetEquipSubType.PEQP_T_NECKLACE }; //项圈
        this._equipTypeList[EquipSubType.EQ_POS2] = { x: leftX, y: 85, type: PetEquipSubType.PEQP_T_AMULET }; //护符
        this._equipTypeList[EquipSubType.EQ_POS3] = { x: leftX, y: 170, type: PetEquipSubType.PEQP_T_ARMOR }; //护甲
    }

    public createEquipList(): void {
        this._equipmentList = [];

        var len: number = this._equipTypeList.length;
        var equipItem: PetEquipItem;
        for (var i: number = 1; i < len; i++) {
            equipItem = new PetEquipItem();
            equipItem.renderClass = ToolTipsOtherEquipment;
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
    public updateAllEquip(selectVo: PetInfo = null): void {
        this.selectVo = selectVo || this.selectVo;
        for (let i = 1; i < this._equipTypeList.length; i++) {
            var type = this._equipTypeList[i].type;
            var equip: S17028_5 = this.getPetEquip(selectVo , type);
            var item: PetEquipItem = this._equipmentList[i - 1];
            if (equip) {
                var itemdata = new ItemData(equip);
                item.itemData = itemdata;
                item.toolTipData = itemdata;
            } else {
                item.itemData = null;
                item.toolTipData = null;
            }
        }
    }


    public getPetEquip(petInfo: PetInfo, equipIndex: PetEquipSubType): S17028_5 {
        var equipList = petInfo.otherEquip;
        for (let i = 0; i < equipList.length; i++) {
            var ele: S17028_5 = equipList[i];
            if (ele.EquipPos == equipIndex) {
                return ele;
            }
        }
        return null;
    }


    public dispose(): void {
        DisplayUtils.removeArray(this._equipmentList);
        DisplayUtils.removeArray(this._equipTypeList);
        this.removeSelf();
    }
}