import { S15000, S15060, S15001, S15061 } from "../../../../../net/pt/pt_15";
import { ItemData } from "../../../compent/data/ItemData";
import { GoodsVo } from "../../../../../db/sheet/vo/GoodsVo";
import { CommonControl } from "../../../../common/control/CommonControl";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { Debug } from "../../../../../debug/Debug";

export class PackPosTypeCache {
    protected _sbag:S15000;
    protected _capacity:number = 0;
    protected _posType: number = 0;
    /**储存物品的位置,长度为容量大小,值为物品,值为null代表没物品**/
    protected _allItems: Array<ItemData> = [];   //所有物品(包括空的)

    /** 物品总数量**/
    protected _itemLength:number = 0;
    constructor() {
       
    }

    /** 
     * 初始化背包数据
     * @param value 背包数据
     * @param isAdd 在原有数据基础上加数据
     * 
     * **/
    public initBagData(value:S15000,isAdd:boolean = false) {
        if(!isAdd)
        {
            this._sbag = value;
            this.capacity = value.Capacity;
            this._posType = value.Location;
        }
        else
        {
            if(!this._sbag)
            {
                this._sbag = value;
                this._posType = value.Location;
                this._sbag.Capacity = value.Capacity;
                this._sbag.item_1 = value.item_1;
            }
            else
            {
                this._sbag.Capacity += value.Capacity;
                this._sbag.item_1 = this._sbag.item_1.concat(value.item_1);
            }
        }
        this.resetAllItems();
        this.sortItems();
    }

    /**
     * 背包类型
     */
    public get posType():number {
        return this._posType;
    }

    public get sbag():S15000
    {
        return this._sbag;
    }

    /**
     * 背包容量
     */
    public set capacity(value:number) {
        this._capacity = value;
    }

    public get capacity():number
    {
        return this._capacity;
    }

    /**重新写入物品数据 **/
    protected resetAllItems(): void {
        var len:number = this.sbag.item_1.length;
        var splayerItem:any;
        var itemData:ItemData;
        
        this._allItems = new Array();
        
        for (var i:number=0; i < len; i++)
        {
            splayerItem = this.sbag.item_1[i];
            if(splayerItem)
            {
                itemData = new ItemData(splayerItem);
                this._allItems[this._allItems.length] = itemData;
                this._itemLength++;
            }
        }
    }

    public updateCapacity():void
    {
        
    }

    /**排序算法 **/
    protected itemSort(a1: ItemData, a2: ItemData): number {
        if (a1 != null && a2 == null) {
            return -1;
        }
        else if (a1 == null && a2 != null) {
            return 1;
        }
        return 0;
    }

    /**
     * 背包重新排序 
     * 
     */
    public sortItems(): void {
        this._allItems.sort(this.itemSort);
    }

    /**
     * 当前物品数量 
     * @return 
     * 
     */
    public get itemLength(): number {
        return this._itemLength;
    }

    /**
     * 剩余背包空格数量
     * @readonly
     * @type {number}
     * @memberof PackPosTypeCache
     */
    public get leftBagCount():number
    {
        return this.capacity - this.itemLength;
    }

    public get allItems():Array<any>
    {
        //请求所有数据面的具体数据
        for (let i = 0; i < this._allItems.length; i++) {
            var ele:ItemData = this._allItems[i];
            if(ele && ele.IsBaotu && !ele.askedInfo && !ele.AllAttr){
                ele.askedInfo = true;
                CommonControl.instance.send15001(ele.serverInfo.GoodsId);
            }
        }
        return this._allItems;
    }

    public get splitItems():Array<any>
    {
        var len:number = this._allItems.length/5;
        var newArr:Array<ItemData> = [];
        var cow:number;
        var list:Array<any> = [];
        for (let index = 0; index < len; index++) {
            cow = index*5;
            const element = this._allItems[index];
            newArr = [this._allItems[cow],this._allItems[cow + 1],this._allItems[cow + 2],this._allItems[cow + 3],this._allItems[cow + 4]];
            list.push(newArr);
        }
        return list;
    }

    /**
     * 根据物品no获取物品 
     * @param code
     * @return 
     * 
     */		
    public getItemDataByGoodsNo(code:number):ItemData
    {
        if (!code)
        {
            return null;
        }
        var itemData:ItemData;
        switch(code) {
            case 2: {
                itemData = new ItemData(2);
                itemData.Count = SRoleData.instance.info.BindGameMoney;
                return itemData;
            }
            case 3: {
                itemData = new ItemData(3);
                itemData.Count = SRoleData.instance.info.Yuanbao;
                return itemData;
            }
            case 4: {
                itemData = new ItemData(4);
                itemData.Count = SRoleData.instance.info.BindYuanbao;
                return itemData;
            }
            case 31: {
                itemData = new ItemData(31);
                itemData.Count = SRoleData.instance.info.Love;
                return itemData;
            }
        }
        var items:Array<any> = this.allItems;
        for (var i:number=0; i < items.length; i++)
        {
            itemData = items[i] as ItemData;
            if (itemData && itemData.serverInfo.GoodsNo== code)
            {
                return items[i];
            }
        }
        return null;
    }

    /**
     * 通过唯一id获得itemdata
     * @param {number} uid  装备唯一id  只对装备有效
     * @returns {ItemData} 
     * @memberof PackPosTypeCache
     */
    public getItemDataByGoodId(uid:number):ItemData {
        if (!uid)
        {
            return null;
        }
        var itemData:ItemData;
        var items:Array<any> = this.allItems;
        for (var i:number=0; i < items.length; i++)
        {
            itemData = items[i] as ItemData;
            if (itemData && itemData.GoodsId == uid)
            {
                return itemData;
            }
        }
        return null;
    }

    /**
     * 通过唯一id获得物品数量
     * @param {number} uid  装备唯一id
     * @memberof PackPosTypeCache
     */
    public getItemCountByGoodId(uid:number):number
    {
        if (!uid)
        {
            return null;
        }
        var itemData:ItemData;
        var num:number=0;
        var items:Array<any> = this.allItems;
        for (var i:number=0; i < items.length; i++)
        {
            itemData = items[i] as ItemData;
            if (itemData && itemData.serverInfo.GoodsId == uid)
            {
                num += itemData.Count;
            }
        }
        return num;
    }

    /**
     * 更新背包数据
     */
    public updateBagData(element:any):void {
        this.updateSPlayerItem(element);
    }

    /**
     * 根据splayerItem更新物品状态
     * @param sitem
     * @return 
     * 
     */
    public updateSPlayerItem(sitem:any):void
    {
        var item:ItemData = this.getItemDataByGoodId(sitem.GoodsId);
        if(item)
        {
            item.data = sitem;
            item.UpdateAttr(sitem.item_1);
        }
    }

    /**
     * 增加一个物品
     */
    public addItemData(item:S15060):void {
        var data:ItemData = new ItemData(this.newItem(item));
        this.addNewItem(data);
    }


    private newItem(item:S15060):ItemData
    {
        var serverInfo:S15001 = new S15001();
        var itemData:ItemData;
        serverInfo.PartnerId = item.PartnerId;
        serverInfo.Location = item.Location;
        serverInfo.GoodsId = item.GoodsId;
        serverInfo.GoodsNo = item.GoodsNo;
        serverInfo.Slot = item.Slot;
        serverInfo.Count = item.Count;
        serverInfo.BindState = item.BindState;
        serverInfo.Quality = item.Quality;
        serverInfo.UsableTimes = item.UsableTimes;
        serverInfo.BattlePower = item.BattlePower;
        itemData = new ItemData(serverInfo);
        Debug.serverLog(`增加物品gid=${itemData.GoodsNo} 名字=${itemData.clientInfo.name}`);
        return itemData;
    }

    /**
     * 增加一个新的物品
     */
    public addNewItem(data:ItemData):void
    {
        this.allItems.push(data);
    }

    /**
     * 删除一个物品
     */
    public deleteItem(info:S15061):void {
        for (let index = 0; index < this.allItems.length; index++) {
            const element:ItemData = this.allItems[index];
            if(element.GoodsId == info.GoodsId)
            {
                this.allItems.splice(index,1);
                Debug.serverLog(`移除物品gid=${element.GoodsNo} 名字=${element.clientInfo.name}`);
                return;
            }
        }
    }
        
    /**
     * 根据物品的code返回背包内含有相同code的itemData数组 
     * @param code
     * 
     */		
    public getItemsByGoodsNo(code:number):Array<ItemData>
    {
        var items:Array<ItemData> = this.allItems;
        var len:number = items.length;
        var info:GoodsVo = GoodsVo.get(code);
        var itemArr:Array<ItemData> = [];
        var item:ItemData;
        for(var i:number ; i < len ; i++)
        {
            if(items[i])
            {
                item = items[i];
                if(item.clientInfo.no == code)
                {
                    itemArr.push(items[i]);
                }
            }
        }
        return itemArr;
    }
        
    /**
     * 根据itemData获取物品数量 
     * @param itemData
     * @return 
     * 
     */		
    public getItemCountByItemData(itemData:ItemData):number
    {
        var num:number=0;
        var itemList:Array<ItemData> = this.allItems;
        itemList.forEach(element => {
            if (element && (element.clientInfo.no == itemData.clientInfo.no))
            {
                num+=element.Count;
            }
            
        });
        return num;
    }

    /**
     * 根据itemCode获取数量 
     * @param code
     * @return 
     * 
     */		
    public getItemCountByGoodsNo(code:number):number
    {
        var num:number;
        num = 0;
        var items:Array<ItemData> = this.allItems;
        items.forEach(element => {
            if (element && (element.clientInfo.no == code))
            {   
                num+=element.Count;
            }
        });
        return num;
    }

}