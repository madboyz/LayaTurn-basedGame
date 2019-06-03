import { PackPosTypeCache } from './PackPosTypeCache';
import { SGameData } from '../../../../../net/data/SGameData';
import { ItemData } from '../../../compent/data/ItemData';
import { S15060, S15061 } from '../../../../../net/pt/pt_15';
import { RolePackCache } from './RolePackCache';
import { SBagData } from '../../../../../net/data/SBagData';
import { ConstVo } from '../../../../../db/sheet/vo/ConstVo';
import { SRoleData } from '../../../../../net/data/SRoleData';
import { Debug } from '../../../../../debug/Debug';
import { ItemHelper } from '../../../compent/data/ItemHelper';
export class EquipPackCache extends PackPosTypeCache {
    private needEquips:Array<ItemData> = [];//人物当前需要的装备列表
    private needList: Array<ItemData> = [];//不推荐分解的装备列表
    private noNeedList: Array<ItemData> = [];//可以分解的装备列表
    private vo:ConstVo;
    constructor() {
        super();
    }
    protected itemSort(a1: ItemData, a2: ItemData): number {
        if(a1 != null && a2 != null)
        {
            if(a1.IsOtherEquip && !a2.IsOtherEquip){
                return 1;
            }else if (!a1.IsOtherEquip && a2.IsOtherEquip){
                return -1;
            }
            if (a1.serverInfo.Quality > a2.serverInfo.Quality) {
                return -1;
            }
            else if (a1.serverInfo.Quality < a2.serverInfo.Quality) {
                return 1;
            }
            else if(a1.serverInfo.Quality == a2.serverInfo.Quality)
            {
                if (a1.clientInfo.lv > a2.clientInfo.lv) {
                    return -1;
                }
                else if (a1.clientInfo.lv < a2.clientInfo.lv) {
                    return 1;
                }
                else 
                {
                    return -1;
                }
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
    
    //是否有相同可以装的装备
    public haveSameTypeEquip(subType: number): boolean {
        var goods: ItemData;
        for (var i: number = 0; i < this.allItems.length; i++) {
            goods = this.allItems[i];
            if(!goods){
                continue;
            }
            if (goods.clientInfo.subtype == subType && goods.isJobEquip && SRoleData.instance.info.Lv >= goods.clientInfo.lv ) {
                return true;
            }
        }
        return false;
    }

    protected resetAllItems(): void {
        var len: number = this.capacity;
        var splayerItem: any;
        var itemData: ItemData;
        this._allItems = new Array();
        this.vo = ConstVo.get("NOT_PROPOSAL_DECOMPOSE_QUALITY");
        this.rolePack = SBagData.instance.role;

        for (var i: number = 0; i < len; i++) {
            splayerItem = this.sbag.item_1[i];
            if (splayerItem) {
                itemData = new ItemData(splayerItem);
                this._allItems[this._allItems.length] = itemData;
                this._itemLength++;
            }
            else
            {
                this._allItems[this._allItems.length] = null;
            }
        }
        this.updateGroupData();
    }

    public updateGroupData():void
    {
        var time:number = Date.now();
        this.needEquips = [];
        this.needList = [];
        this.noNeedList = [];
        var len:number = this.allItems.length;
        for (let index = 0; index < len; index++) {
            const element = this.allItems[index];
            element && this.checkNeed(element);
        }
    }

    /**
     * 增加一个物品
     */
    public addItemData(item:S15060): void {
        var data: ItemData = new ItemData(item);
        this.addNewItem(data);
        this.allItems.sort(this.itemSort);
    }

    /**
     * 增加一个新的物品
     */
    public addNewItem(data: ItemData): void {
        for (let index = 0; index < this.allItems.length; index++) {
            const element = this.allItems[index];
            if(!element)
            {
                this.allItems[index] = data;
                this._itemLength++;
                break;
            }
        }
        this.updateGroupData();
    }

    /**
     * 删除一个物品
     */
    public deleteItem(info: S15061): void {
        for (let index = 0; index < this.allItems.length; index++) {
            const element: ItemData = this.allItems[index];
            if(element)
            {
                if (element.GoodsId == info.GoodsId) {
                    this.allItems[index] = null;
                    this._itemLength--;
                    this.allItems.sort(this.itemSort);
                    Debug.serverLog(`移除物品gid=${element.GoodsNo} 名字=${element.clientInfo.name}`);
                    return;
                }
            }
        }
        this.updateGroupData();
    }

    public updateCapacity():void
    {
        var len:number = this.capacity - this.allItems.length;
        for (let index = 0; index < len; index++) {
            this.allItems.push(null);
        }
    }

    private rolePack:RolePackCache;
    private roleEquipData:ItemData;
    private checkNeed(data:ItemData): void {
        if(this.rolePack)
        {
            if(data.IsOtherEquip){
                this.needList.push(data);//宠物装备默认保留
                return;
            }
            if(this.rolePack.hasBetterItemdata(data) == false || !data.isJobEquip/**装备不是自己用的，放进去分解 */)
            {
                if(data.isPushSmell)//比人物装备差并且推荐熔炼
                {
                    this.noNeedList.push(data);//推荐分解
                    return;
                }
                else
                {
                    this.checkInNeedList(data)//不推荐分解
                    return;
                }
            }
            else
            {
                this.checkInList(data);//检测放入那个数组
            }
        }
    }

    private checkInList(data:ItemData):void
    {
        if(this.checkInEquipList(data))//放入装备列表
        {
            this.checkInNeedList(data);
            return;
        }
        if(this.checkInNeedList(data))//放入需要列表
        {
            return;
        }
        this.checkInSmell(data);
    }

    private checkInNeedList(data:ItemData):boolean
    {
        var len:number = this.needList.length;
        if(len == 0)
        {
            this.needList.push(data);//不推荐分解
            return true;
        }
        if(!data.isPushSmell)//是否大于不推荐分解的品质
        {
            this.needList.push(data);//不推荐分解
            return true;
        }
        for (let index = 0; index < this.needList.length; index++) {
            var element = this.needList[index];
            if(data.equipPos == element.equipPos)
            {
                if(data.serverInfo.BattlePower > element.serverInfo.BattlePower)
                {
                    this.needList.push(data);
                    return true;
                }
            }
        }

        if(this.checkHasPosInList(data,this.needList) == false)
        {
            this.needList.push(data);
            return true;
        }
        return false;
    }

    private checkInEquipList(data:ItemData):boolean
    {
        var len:number = this.needEquips.length;
        //完全看不懂为什么直接把第一个放进去，有问题回退这里
        // if(len == 0 && data.isJobEquip)
        // {
        //     this.needEquips[0] = data;
        //     return true;
        // }
        for (let index = 0; index < len; index++) {
            const element = this.needEquips[index];
            if(data.equipPos == element.equipPos)
            {
                if(data.serverInfo.BattlePower > element.serverInfo.BattlePower && data.isJobEquip && SRoleData.instance.info.Lv >= data.clientInfo.lv)//大于对比的装备，需要
                {
                    this.needEquips[index] = data;
                    return true;
                }
            }
        }
        if(this.rolePack.hasBetterItemdata(data) && !this.checkHasPosInList(data,this.needEquips) && data.isJobEquip && SRoleData.instance.info.Lv >= data.clientInfo.lv)
        {
            this.needEquips.push(data);
            return true;
        }
        return false;
    }

    private checkInSmell(data:ItemData):void
    {
        if(data.isPushSmell)//比人物装备差并且推荐熔炼
        {
            this.noNeedList.push(data);//推荐分解
            return;
        }
        else
        {
            this.needList.push(data);//不推荐分解
            return;
        }
    }

    private checkHasPosInList(data:ItemData,arr:Array<ItemData>):boolean
    {
        var len:number = arr.length;
        for (let index = 0; index < len; index++) {
            const element = arr[index];
            if(element.equipPos == data.equipPos)
            {
                return true;
            }
        }
        return false;
    }

    /**
     * 一键装备
     * @returns {Array<ItemData>} 
     * @memberof equipPackCache
     */
    public get equipList(): Array<ItemData> {
        this.updateGroupData();
        return this.needEquips;
    }

    /**
     * 某个部位是否有更好的装备
     * @param {number} type
     * @returns {boolean}
     * @memberof EquipPackCache
     */
    public hasBatterEquipByType(type:number):boolean
    {
        for (let index = 0; index < this.needEquips.length; index++) {
            var element = this.needEquips[index];
            if(element.equipPos == type)
            {
                return true;
            }
        }
        return false;
    }

    private _smellList:Array<number>;
    /**
     * 获得可以熔炼的物品
     */
    private canSmellItems(): Array<number> {
        this.updateGroupData();
        this._smellList = [];
        this.noNeedList.sort(this.itemSort);
        for (let index = 0; index < this.noNeedList.length; index++) {
            var element: ItemData = this.noNeedList[index];
            this._smellList.push(element.GoodsId);
            if (this._smellList.length >= 12) {
                return this._smellList;
            }
        }
        if (this._smellList.length < 12) {
            var len: number = 12 - this._smellList.length;
            for (let i = 0; i < len; i++) {
                this._smellList.push(-1);
            }
        }
        return this._smellList;
    }

    public getSamePosEquip(pos:number):Array<ItemData>
    {
        var arr:Array<ItemData> = [];
        for (let index = 0; index < this.allItems.length; index++) {
            const element = this.allItems[index];
            if(element.equipPos == pos)
            {
                arr.push(element);
            }
        }
        arr.sort(this.itemSort);
        return arr;
    }

    public get smellList():Array<number>
    {
        if(!this._smellList || (this._smellList.length <= 0))
        {
            this.canSmellItems();
        }
        return this._smellList;
    }

    public get haveSmellEquip():boolean{
        var chekcList = this.smellList;
        for (let i = 0; i < chekcList.length; i++) {
            const element = chekcList[i];
            if(element != -1){
                return true;
            }
        }
        return false;
    }

    public get smellCount():number{
        var count = 0;
        var list = this.smellList;
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            if(element != -1){
                count++;
            }
        }
        return count;
    }

    /**
     * 是否再分解列表中
     * @param {number} id
     * @returns {boolean}
     * @memberof EquipPackCache
     */
    public isInSmellList(id:number):boolean
    {
        var arr:Array<number> =  this.smellList;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if(element == id)
            {
                return true;
            }
        }
        return false;
    }

    /**
     * 不推荐分解列表
     * @readonly
     * @type {Array<ItemData>}
     * @memberof EquipPackCache
     */
    public get selectSmellList():Array<ItemData>
    {
        this.updateGroupData();
        this.needList.sort(this.itemSort);
        return this.needList;
    }

    public clearSmellList():void
    {
        this._smellList && (this._smellList.length = 0);
    }

    public pushSmellList(id:number,select:boolean):void
    {
        if(select)
        {
            if(this._smellList.length <= 0)
            {   
                this._smellList.push(id);
            }
            else
            {
                for (let index = 0; index < this._smellList.length; index++) {
                    var element = this._smellList[index];
                    if(element <= 0)
                    {
                        this._smellList[index] = id;
                        return;
                    }
                }
            }
        }
        else
        {
            var idx:number = this._smellList.indexOf(id);
            idx >= 0 && (this._smellList[idx] = -1);
        }
    }

    public get allItems(): Array<ItemData> {
        return this._allItems;
    }
}