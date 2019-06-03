import { ItemData } from './data/ItemData';
import { RewardBaseItem } from './RewardBaseItem';
import { AwardUtil } from '../../award/AwardUtil';
import { DisplayUtils } from '../../utils/DisplayUtils';
export class RewardList extends Laya.Sprite {
    private _items: Array<any>;
    private _hGap: number = 5;       //行间距
    private _vGap: number = 5;       //列间距
    private _rowCount: number = 2147483647; //每行个数
    private _showName: Boolean;
    private _showNameNum: Boolean = false;
    private _itemStyle: number;
    private _maxX: number;
    private _maxNum: number = 2147483647;//显示最大个数
    public _nameColor: string = "#ffaa5e";
    public _fontSize: number = 16;
    public layoutType: number = -1;//-1,默认分行列分布，0,都在原点
    constructor() {
        super();
        this.init();
    }

    public init(): void {
        this._hGap = 5;
        this._vGap = 5;
        this._rowCount = 2147483647;
        this._items = [];
    }

    public set maxNum(value: number) {
        this._maxNum = value;
    }

    public get hGap(): number {
        return this._hGap;
    }

    public set hGap(value: number) {
        this._hGap = value;
        this.updateLayout();
    }

    public get vGap(): number {
        return this._vGap;
    }

    public set vGap(value: number) {
        this._vGap = value;
        this.updateLayout();
    }

    public get rowCount(): number {
        return this._rowCount;
    }

    public set rowCount(value: number) {
        this._rowCount = value;
        this.updateLayout();
    }

    public set showName(value: Boolean) {
        this._showName = value;
    }

    public set showNameNum(value: Boolean) {
        this._showNameNum = value;
    }

    public get itemsLength(): number {

        return this._items ? this._items.length : 0;
    }
    public get items(): Array<any> {
        return this._items;
    }

    public setItemColor(size: number, color: string): void {
        this._fontSize = size;
        this._nameColor = color;
        for (let index = 0; index < this._items.length; index++) {
            var element = this._items[index];
            element.setItemColor(this._fontSize, this._nameColor);
        }
    }

    public set itemStyle(value: number) {
        this._itemStyle = value;
        for (let index = 0; index < this._items.length; index++) {
            var element = this._items[index];
            element.setItemStyle(value);
        }
    }

    /**
     * 奖励列表
     * @param {number} rewards 奖励包得no
     * @memberof RewardList
     */
    public updateRewardsByNum(rewards: number, onlyMyJob: boolean = false): void {
        rewards ? rewards : 0;
        this.updateRewards(AwardUtil.GetNormalGoodsList(rewards, true, onlyMyJob));
    }

    /**
     * 更新数据  只支持itemdata 可以扩展
     * @param arr [itemdata]
     * 
     */
    public updateRewards(arr: Array<ItemData>): void {
        if (!arr || arr.length == 0) return;
        var itemNum: number;
        itemNum = 0;
        for (var i: number = 0; i < arr.length; i++) {
            if (itemNum >= this._maxNum) {
                //大于最大显示个数就不显示其余的了
                break;
            }
            var reward: any;
            reward = arr[i];

            var item: RewardBaseItem;
            var itemdata: ItemData;
            itemdata = reward;
            item = this.getItem(itemNum);
            item.setData(itemdata, itemdata.Count);
            itemNum++;
        }

        DisplayUtils.delNotUse(this._items, itemNum);
        this.updateLayout();
    }

    /**
     * 显示的数量倍数 
     * @param rate
     * 
     */
    public updateNum(itemCode: number = -1, num: number = 0): void {
        for (let index = 0; index < this._items.length; index++) {
            var element = this._items[index];
            if (itemCode == -1 || element.itemData && element.itemData.itemCode == itemCode) {
                element.updateNum(num);
                if (itemCode != -1) {
                    break;
                }
            }
        }
    }

    public updateLayout(): void {
        this._maxX = 0;
        if (this.layoutType == -1) {
            for (var i: number = 0; i < this._items.length; i++) {
                var item: RewardBaseItem = this._items[i];
                var line: number = Math.floor(i / this.rowCount);
                item.y = line * (item.height + this.vGap);
                item.x = (i % this.rowCount) * (item.width + this.hGap);
                this._maxX = this._maxX < item.x ? item.x : this._maxX;
            }
        }
        else if (this.layoutType == 0) {
            for (i = 0; i < this._items.length; i++) {
                item = this._items[i];
                item.y = 0;
                item.x = 0;
            }
        }

    }

    private getName(value: string): string {
        if (value && this._showName) {
            return value;
        }
        return null;
    }

    private getItem(index: number): RewardBaseItem {
        var res: RewardBaseItem = this._items[index];
        if (res == null) {
            res = new RewardBaseItem();
            res.showNameNum = this._showNameNum;
            res.setItemStyle(this._itemStyle);
            res.setItemColor(this._fontSize, this._nameColor);
            this._items[index] = res;
        }
        this.addChild(res);
        return res;
    }

    public get width(): number {
        if (this._items) {
            var item: RewardBaseItem = this._items[0];
            if (item) {
                return this._maxX + item.width;
            }
        }
        return this._maxX;
    }

    public get height(): number {
        if (this._items) {
            var item: RewardBaseItem = this._items[0];
            if (item) {
                return item.height;
            }
        }
        return 0
    }

    public dispose(): void {
        DisplayUtils.delNotUse(this._items, 0);
        this._items.length = 0;
        this.layoutType = -1;
        this._showName = false;
        this._showNameNum = false;
        this._itemStyle = 0;
        this._maxNum = 2147483647;
    }
}