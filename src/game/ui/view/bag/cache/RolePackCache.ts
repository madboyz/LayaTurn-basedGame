import { PackPosTypeCache } from "./PackPosTypeCache";
import { ItemData } from "../../../compent/data/ItemData";
import { S15060, S15061 } from "../../../../../net/pt/pt_15";
import { Debug } from "../../../../../debug/Debug";

export class RolePackCache extends PackPosTypeCache {
    constructor() {
        super();
    }

    /**
     * 通过子类型获得装备
     * @param subType 装备子类型 查看 GoodsType
     */
    public getItemBySubType(subType: number): ItemData {
        var goods: ItemData;
        for (var i: number = 0; i < this.allItems.length; i++) {
            goods = this.allItems[i];
            if (goods.equipPos == subType) {
                return goods;
            }
        }
        return null;
    }
    
    /**
     * 通过配置表子类型获得装备
     * @param subType 装备子类型 查看 GoodsType
     */
    public getItemByCfgSubType(subType: number): ItemData {
        var goods: ItemData;
        for (var i: number = 0; i < this.allItems.length; i++) {
            goods = this.allItems[i];
            if (goods.clientInfo.subtype == subType) {
                return goods;
            }
        }
        return null;
    }

    /**
     * 通过slot获得装备
     * @param slot 装备slot
     */
    public getItemBySlot(slot: number): ItemData {
        var goods: ItemData;
        for (var i: number = 0; i < this.allItems.length; i++) {
            goods = this.allItems[i];
            if (goods.slot == slot) {
                return goods;
            }
        }
        return null;
    }

    /**
     * 增加一个物品
     */
    public addItemData(item: S15060): void {
        var data: ItemData = new ItemData(item);
        this.addNewItem(data);
        this.allItems.sort(this.itemSort);
    }

    /**
     * 增加一个新的物品
     */
    public addNewItem(data: ItemData): void {
        this.allItems[this._itemLength] = data;
        this._itemLength++;
    }

    /**
     * 删除一个物品
     */
    public deleteItem(info: S15061): void {
        for (let index = 0; index < this.allItems.length; index++) {
            const element: ItemData = this.allItems[index];
            if (element) {
                if (element.GoodsId == info.GoodsId) {
                    this.allItems.splice(index, 1);
                    this._itemLength--;
                    Debug.serverLog(`移除物品gid=${element.GoodsNo} 名字=${element.clientInfo.name}`);
                    return;
                }
            }
        }
    }

    /**
     * 是否有更好的装备
     * @private
     * @param {ItemData} data
     * @returns {boolean}
     * @memberof RolePackCache
     */
    public hasBetterItemdata(data: ItemData): boolean {
        var roleData: ItemData;
        roleData = this.getItemBySubType(data.equipPos);
        if (roleData) {
            if (roleData.serverInfo.BattlePower >= data.serverInfo.BattlePower && data.isJobEquip)//人物身上装备比当前装备好，不需要
            {
                return false;
            }
        }
        return true;
    }

}