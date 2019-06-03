import { GameLayer } from "../../../../../../../GameLayer";
import { SBagData } from "../../../../../../../net/data/SBagData";
import { SForgingData } from "../../../../../../../net/data/SForgingData";
import { DisplayUtils } from "../../../../../../utils/DisplayUtils";
import { ItemData } from "../../../../../compent/data/ItemData";
import { StrengthInfo } from "../../../../../compent/data/StrengthInfo";
import { ToolTipSmellEquip } from "../../../../../compent/ToolTipSmellEquip";
import { RolePackCache } from "../../../../bag/cache/RolePackCache";
import { StrengthEquipItem } from "../item/StrengthEquipItem";
import { UIeffectLayer } from "../../../../../../battle/scene/layer/UIeffectLayer";

export class StrengthEquipPart extends Laya.Sprite {
    protected _equipmentList: Array<any>;
    protected _equipTypeList: Array<any>;
    constructor() {
        super();
        this.resetEquipListPos();
        this.createEquipList();
    }

    public resetEquipListPos(): void {
        this._equipTypeList = [];
        this._equipTypeList[1] = { x: 0, y: 240, slot: EquipSubType.EQ_POS1, type: EquipSubType.EQ_POS1 }; //项链
        this._equipTypeList[2] = { x: 0, y: 119, slot: EquipSubType.EQ_POS2, type: EquipSubType.EQ_POS2 }; //头盔
        this._equipTypeList[3] = { x: 103, y: 0, slot: EquipSubType.EQ_POS3, type: EquipSubType.EQ_POS3 }; //武器
        this._equipTypeList[4] = { x: 282, y: 0, slot: EquipSubType.EQ_POS4, type: EquipSubType.EQ_POS4 }; //铠甲
        this._equipTypeList[5] = { x: 377, y: 119, slot: EquipSubType.EQ_POS5, type: EquipSubType.EQ_POS5 }; //腰带
        this._equipTypeList[6] = { x: 377, y: 240, slot: EquipSubType.EQ_POS6, type: EquipSubType.EQ_POS6 }; //鞋子
    }

    public createEquipList(): void {
        this._equipmentList = [];

        var len: number = this._equipTypeList.length;
        var equipItem: StrengthEquipItem;
        for (var i: number = 1; i < len; i++) {
            equipItem = new StrengthEquipItem();
            equipItem.setItemStyle(80);
            equipItem.x = this._equipTypeList[i].x;
            equipItem.y = this._equipTypeList[i].y;
            equipItem.type = this._equipTypeList[i].type;
            equipItem.slot = this._equipTypeList[i].slot;
            equipItem.isShowJob = false;
            this.addChild(equipItem);
            this._equipmentList.push(equipItem);
        }
        this.updateAllEquip();
    }

    //更新装备数据
    public updateAllEquip(): void {
        var len: number = this._equipmentList.length;
        var item: StrengthEquipItem;
        var goods: ItemData;
        var roleEquipdata: RolePackCache;
        var strengthInfo: StrengthInfo;
        roleEquipdata = SBagData.instance.role;
        for (var i: number = 0; i < len; i++)  //i代表类型
        {
            item = this._equipmentList[i];
            if (item) {
                strengthInfo = SForgingData.instance.getStrengthInfoByPos(item.slot);
                if (strengthInfo.StrLv >= 1) {
                    item.setStrengthLv("+" + strengthInfo.StrLv, "#4e17cd");
                }
                if (roleEquipdata) {
                    goods = roleEquipdata.getItemBySubType(item.type);
                    if (goods) {
                        if (goods.clientInfo) {
                            item.itemData = goods;
                            item.renderClass = ToolTipSmellEquip;
                            item.toolTipData = goods;
                        }
                        else {
                            item.itemData = null;
                            item.clearData();
                        }
                    }
                    else {
                        item.itemData = null;
                        item.clearData();
                    }
                }
                else {
                    item.itemData = null;
                    item.clearData();
                }
            }
        }
    }

    /**
     * 选中某个装备
     * @param {number} value 
     * @memberof GodEquipPart
     */
    public selectItem(value: number): void {
        this.updateSelect(value);
    }

    public updateSelect(value: number): void {
        var len: number = this._equipmentList.length;
        var oldItem: StrengthEquipItem;
        for (var i: number = 0; i < len; i++) {
            oldItem = this._equipmentList[i];
            if (oldItem.slot == value) {
                oldItem.isSelect = true;
            }
            else {
                oldItem.isSelect = false;
            }
        }
    }

    //特效
    private _uiEffLayer: UIeffectLayer;
    //升级成功的时候，播放升级成功的特效
    public showUIEffect(pos: number): void {
        var posPoint = this._equipTypeList[pos];
        if(!this._uiEffLayer){
            this._uiEffLayer = new UIeffectLayer;
            this.addChild(this._uiEffLayer);
        }
        this._uiEffLayer.playEffect("ui_effect_4", posPoint.x + 38, posPoint.y + 40, false);
    }

    public dispose(): void {
        DisplayUtils.removeArray(this._equipmentList);
        DisplayUtils.removeArray(this._equipTypeList);
        if (this._uiEffLayer) {
            this._uiEffLayer.destroy();
            this._uiEffLayer = null;
        }
        this.removeSelf();
    }
}