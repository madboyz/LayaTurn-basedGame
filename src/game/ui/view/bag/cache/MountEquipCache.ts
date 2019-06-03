import { SBagData } from "../../../../../net/data/SBagData";
import { SMountData } from "../../../../../net/data/SmountData";
import { S15000, S15000_1 } from "../../../../../net/pt/pt_15";
import { ItemData } from "../../../compent/data/ItemData";

export class MountEquipCache {
    public mountEquip: S15000;

    constructor() {
    }

    public initData(data: S15000): void {
        this.mountEquip = data;
    }

    public getPetEquip(equipIndex: MountEquipSubType): S15000_1 {
        var mountEquipInfo = this.mountEquip;
        if (!mountEquipInfo) {
            return null;
        }
        var equipList = mountEquipInfo.item_1;
        for (let i = 0; i < equipList.length; i++) {
            var ele: S15000_1 = equipList[i];
            if (ele.Slot == equipIndex) {
                return ele;
            }
        }
        return null;
    }

    public findOneCanEquip(equipIndex: MountEquipSubType): ItemData {
        var mountInfo = SMountData.instance.curInfo;
        var cellEquip = this.getPetEquip(equipIndex);
        var betterEquip: ItemData;
        if (cellEquip) {
            var checkId = cellEquip.GoodsId;
            betterEquip = new ItemData(cellEquip);
        }
        var allItem = SBagData.instance.equip.allItems;
        for (let i = 0; i < allItem.length; i++) {
            var oneItem = allItem[i];
            if (!oneItem || !oneItem.IsMountEquip || oneItem.clientInfo.subtype != equipIndex) {
                continue;
            }
            if (oneItem.serverInfo.BattlePower > (betterEquip ? betterEquip.serverInfo.BattlePower : 0) && mountInfo.VariationLv >= oneItem.clientInfo.lv) {
                betterEquip = oneItem;
            }
        }
        if (betterEquip && betterEquip.serverInfo.GoodsId != checkId) {
            return betterEquip;
        }
        return null;
    }

    public checkOneCanEquip(equipIndex: MountEquipSubType): boolean {
        var mountInfo = SMountData.instance.curInfo;
        var cellEquip = this.getPetEquip(equipIndex);
        var allItem = SBagData.instance.equip.allItems;
        for (let i = 0; i < allItem.length; i++) {
            var oneItem = allItem[i];
            if (!oneItem || !oneItem.IsMountEquip || oneItem.clientInfo.subtype != equipIndex) {
                continue;
            }
            if (oneItem.serverInfo.BattlePower > (cellEquip ? cellEquip.BattlePower : 0) && mountInfo.VariationLv >= oneItem.clientInfo.lv) {
                return true;
            }

        }
        return false;
    }

    public getItemDataByGoodId(GoodsId: number): S15000_1 {
        var mountEquip = this.mountEquip;
        for (let j = 0; j < mountEquip.item_1.length; j++) {
            var equip = mountEquip.item_1[j] as S15000_1;
            if (equip.GoodsId == GoodsId) {
                return equip;
            }
        }
        return null;
    }

}