import { PackPosTypeCache } from './PackPosTypeCache';
import { ItemData } from '../../../compent/data/ItemData';
import { S15061, S15000_1, S15060 } from '../../../../../net/pt/pt_15';
import { Debug } from '../../../../../debug/Debug';
export class PropPackCache extends PackPosTypeCache {
    constructor() {
        super();
    }

    protected resetAllItems():void
    {
        var len:number;
        if(this.sbag.item_1.length > 50)
        {
            var cow:number = this.sbag.item_1.length%5;
            if(cow!=0)
            {
                len = this.sbag.item_1.length + (5 - cow);
            }
            else
            {
                len = this.sbag.item_1.length;
            }
        }
        else
        {
            len = 50;
        }
        var splayerItem:any;
        var itemData:ItemData;
        
        this._allItems = new Array();
        
        for (var i:number=0; i < len; i++)
        {
            splayerItem = this.sbag.item_1[i];
            if(splayerItem)
            {
                itemData = new ItemData(splayerItem);
                this. _allItems[this._allItems.length] = itemData;
                this._itemLength++;
            }
            else
            {
                this. _allItems[this._allItems.length] = null;
            }
        }
    }

    /**
     * 增加一个物品
     */
    public addItemData(item:S15060):void {
        var data: ItemData = new ItemData(item);
        this.addNewItem(data);
        Debug.serverLog(`增加物品gid=${data.GoodsNo} 名字=${data.clientInfo.name}`);
    }

    /**
     * 增加一个新的物品
     */
    public addNewItem(data:ItemData):void
    {
        super.addNewItem(data);
        // this.sbag.item_1.push(data.serverInfo);
        // this.resetAllItems();
        this.allItems.sort(this.itemSort);
    }

    /**
     * 删除一个物品
     */
    public deleteItem(info:S15061):void {
        super.deleteItem(info);
        // for (let index = 0; index < this.sbag.item_1.length; index++) {
        //     const element:S15000_1 = this.sbag.item_1[index];
        //     if(element.GoodsId == info.GoodsId)
        //     {
        //         this.sbag.item_1.splice(index,1);
        //         this.resetAllItems();
        //         this.allItems.sort(this.itemSort);
        //         return;
        //     }
        // }
    }

    public get petSkillList():Array<ItemData>
    {
        var list:Array<ItemData> = [];
        for (let index = 0; index < this.allItems.length; index++) {
            var element:ItemData = this.allItems[index];
            if(element && element.IsPetSkill)
            {
                list.push(element);
            }
        }
        return list.sort(this.itemSort);
    }

    protected itemSort(a1:ItemData, a2:ItemData):number
    {
        if(a1 != null && a2 != null)
        {
            if (a1.serverInfo.Quality > a2.serverInfo.Quality) {
                return -1;
            }
            else if (a1.serverInfo.Quality < a2.serverInfo.Quality) {
                return 1;
            }
            else 
            {
                return -1;
            }
        }
        else if(a1 != null && a2 == null)
        {
            return -1;
        }
        else if(a1 == null && a2 != null)
        {
            return 1;
        }
        else 
        {
            return -1;
        }
    }
}