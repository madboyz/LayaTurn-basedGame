import { SBagData } from "../../../../../net/data/SBagData";
import { S15000, S15000_1 } from "../../../../../net/pt/pt_15";
import { ItemData } from "../../../compent/data/ItemData";
import { ComateInfo } from "../../comate/data/ComateInfo";

export class ComateEquipCache {
    public comateEquipList: Laya.Dictionary;//以宠物ID，S15000 为key，为值得字典

    constructor() {
        this.comateEquipList = new Laya.Dictionary;
    }

    public initData(data: S15000): void {
        this.comateEquipList.set(data.PartnerId, data);
    }

    public getPetEquip(comateInfo: ComateInfo, equipIndex: ComateEquipSubType): S15000_1 {
        var petEquipInfo = this.comateEquipList.get(comateInfo.Id) as S15000;
        if (!petEquipInfo) {
            return null;
        }
        var equipList = petEquipInfo.item_1;
        for (let i = 0; i < equipList.length; i++) {
            var ele: S15000_1 = equipList[i];
            if (ele.Slot == equipIndex) {
                return ele;
            }
        }
        return null;
    }

    public findOneCanEquip(comateInfo: ComateInfo, equipIndex: ComateEquipSubType): ItemData {
        var cellEquip = this.getPetEquip(comateInfo, equipIndex);
        var betterEquip: ItemData;
        if (cellEquip) {
            var checkId = cellEquip.GoodsId;
            betterEquip = new ItemData(cellEquip);
        }
        var allItem = SBagData.instance.equip.allItems;
        for (let i = 0; i < allItem.length; i++) {
            var oneItem = allItem[i];
            if (!oneItem || !oneItem.IsComateEquip || oneItem.clientInfo.subtype != equipIndex) {
                continue;
            }
            if (oneItem.serverInfo.BattlePower > (betterEquip ? betterEquip.serverInfo.BattlePower : 0) && comateInfo.BreakLv >= oneItem.clientInfo.lv) {
                betterEquip = oneItem;
            }
        }
        if (betterEquip && betterEquip.serverInfo.GoodsId != checkId) {
            return betterEquip;
        }
        return null;
    }

    public checkOneCanEquip(comateInfo: ComateInfo, equipIndex: ComateEquipSubType): boolean {
        var cellEquip = this.getPetEquip(comateInfo, equipIndex);
        var allItem = SBagData.instance.equip.allItems;
        for (let i = 0; i < allItem.length; i++) {
            var oneItem = allItem[i];
            if (!oneItem || !oneItem.IsComateEquip || oneItem.clientInfo.subtype != equipIndex) {
                continue;
            }
            if (oneItem.serverInfo.BattlePower > (cellEquip ? cellEquip.BattlePower : 0) && comateInfo.BreakLv >= oneItem.clientInfo.lv) {
                return true;
            }

        }
        return false;
    }

    public getItemDataByGoodId(GoodsId:number):S15000_1{
        var petsEquipList = this.comateEquipList.values;
        for (let i = 0; i < petsEquipList.length; i++) {
            var petEquip = petsEquipList[i].item_1 as S15000_1[];
            for (let j = 0; j < petEquip.length; j++) {
                var equip = petEquip[j] as S15000_1;
                if(equip.GoodsId == GoodsId){
                    return equip;
                }
            }
        }
        return null;
    }

    public getPartnerIdByGoodId(GoodsId:number):number{
        var petsEquipList:S15000[] = this.comateEquipList.values;
        for (let i = 0; i < petsEquipList.length; i++) {
            var petEquip = petsEquipList[i].item_1 as S15000_1[];
            for (let j = 0; j < petEquip.length; j++) {
                var equip = petEquip[j] as S15000_1;
                if(equip.GoodsId == GoodsId){
                    return petsEquipList[i].PartnerId;
                }
            }
        }
        return null;
    }


}